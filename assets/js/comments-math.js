/* Scoped, serialized MathJax rendering for asynchronously loaded comments. */
let mathQueue = Promise.resolve();
let readiness = null;
const PROCESS_CLASS = 'nc-math-content';
const BODY_SELECTOR = '.nc-comment-body:not(.nc-placeholder)';

async function loadMathJax() {
  if (typeof window === 'undefined') return null;
  let math = window.MathJax;
  if (!math?.startup?.promise && typeof math?.typesetPromise !== 'function') {
    const script = document.getElementById('MathJax-script');
    if (!script) return null;
    const loaded = await new Promise(resolve => {
      let timeout;
      const finish = success => {
        window.clearTimeout(timeout);
        script.removeEventListener('load', onLoad);
        script.removeEventListener('error', onError);
        resolve(success);
      };
      const onLoad = () => finish(true);
      const onError = () => finish(false);
      script.addEventListener('load', onLoad, { once: true });
      script.addEventListener('error', onError, { once: true });
      // A blocked CDN must leave readable source text rather than a stuck queue.
      timeout = window.setTimeout(() => finish(false), 15000);
    });
    if (!loaded) return null;
    math = window.MathJax;
  }
  let startupTimeout;
  try {
    await Promise.race([
      Promise.resolve(math?.startup?.promise),
      new Promise((_, reject) => {
        startupTimeout = window.setTimeout(() => reject(new Error('MathJax startup timed out.')), 15000);
      })
    ]);
    return typeof math?.typesetPromise === 'function' ? math : null;
  } catch {
    // Startup includes ui/safe; do not typeset if its loading failed.
    return null;
  } finally {
    window.clearTimeout(startupTimeout);
  }
}

function readyMathJax() {
  if (typeof window === 'undefined') return Promise.resolve(null);
  const math = window.MathJax;
  const startup = math?.startup?.promise;
  if (!readiness || readiness.window !== window || readiness.math !== math || readiness.startup !== startup) {
    // Share a failed loader result too: queued bodies must not each wait for
    // the same unavailable CDN. A newly available runtime retries naturally.
    readiness = { window, math, startup, promise: loadMathJax() };
  }
  return readiness.promise;
}

function bodiesWithin(container) {
  const bodies = container.matches?.(BODY_SELECTOR) ? [container] : [];
  bodies.push(...container.querySelectorAll(BODY_SELECTOR));
  return bodies.filter(body => !body.closest('[hidden]'));
}

function clearMath(math, containers) {
  if (typeof math?.typesetClear !== 'function') return;
  try { math.typesetClear(containers); } catch { /* Plain text remains usable. */ }
}

export function createCommentMathRenderer() {
  const generations = new WeakMap();
  const tracked = new Set();
  let destroyed = false;

  function invalidate(container) {
    const generation = (generations.get(container) || 0) + 1;
    generations.set(container, generation);
    return generation;
  }

  function clear(container) {
    if (!container) return;
    invalidate(container);
    for (const candidate of tracked) {
      if (candidate === container || container.contains?.(candidate)) {
        if (candidate !== container) invalidate(candidate);
        tracked.delete(candidate);
      }
    }
    if (typeof window !== 'undefined') clearMath(window.MathJax, [container]);
  }

  function render(container) {
    if (destroyed || !container) return Promise.resolve();
    const generation = invalidate(container);
    const bodies = bodiesWithin(container);
    tracked.add(container);
    const current = () => !destroyed && container.isConnected && generations.get(container) === generation;
    const task = mathQueue.catch(() => {}).then(async () => {
      if (!current() || !bodies.length) return;
      const math = await readyMathJax();
      if (!math || !current()) return;
      const connectedBodies = bodies.filter(body => body.isConnected && !body.closest('[hidden]'));
      if (!connectedBodies.length) return;
      // The initial page scan ignores native-comments. Only comment bodies are
      // opted back in here, after MathJax and its safe extension are ready.
      connectedBodies.forEach(body => body.classList.add(PROCESS_CLASS));
      try {
        await math.typesetPromise(connectedBodies);
      } catch {
        // Invalid or unavailable math must not interrupt the comment UI.
      } finally {
        connectedBodies.forEach(body => body.classList.remove(PROCESS_CLASS));
        const retired = connectedBodies.filter(body => !current() || !body.isConnected || body.closest('[hidden]'));
        if (retired.length) clearMath(math, retired);
      }
    });
    mathQueue = task;
    return task;
  }

  function destroy() {
    if (destroyed) return;
    destroyed = true;
    for (const container of tracked) clear(container);
    tracked.clear();
  }

  return { clear, render, destroy };
}
