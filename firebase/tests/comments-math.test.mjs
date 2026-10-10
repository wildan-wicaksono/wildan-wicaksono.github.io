import test from 'node:test';
import assert from 'node:assert/strict';
import { setImmediate } from 'node:timers/promises';
import { createCommentMathRenderer } from '../../assets/js/comments-math.js';

function deferred() {
  let resolve, reject;
  const promise = new Promise((done, fail) => { resolve = done; reject = fail; });
  return { promise, resolve, reject };
}

function element({ body = false, placeholder = false, hidden = false, children = [] } = {}) {
  const classes = new Set();
  const node = {
    isConnected: true,
    classes,
    contains: other => node === other || children.some(child => child.contains(other)),
    classList: { add: name => classes.add(name), remove: name => classes.delete(name) },
    matches: () => body && !placeholder,
    querySelectorAll: () => children.flatMap(child => [
      ...(child.matches() ? [child] : []), ...child.querySelectorAll()
    ]),
    closest: () => hidden ? node : null
  };
  return node;
}

function environment(math, script = null) {
  globalThis.window = { MathJax: math, setTimeout, clearTimeout };
  globalThis.document = { getElementById: () => script };
}

test('renders only visible comment bodies and serializes work across renderers', async () => {
  const first = element({ body: true });
  const hidden = element({ body: true, hidden: true });
  const placeholder = element({ body: true, placeholder: true });
  const container = element({ children: [first, hidden, placeholder] });
  const second = element({ body: true });
  const pending = deferred();
  const calls = [];
  environment({
    startup: { promise: Promise.resolve() },
    async typesetPromise(nodes) {
      calls.push(nodes);
      assert.ok(nodes.every(node => node.classes.has('nc-math-content')));
      if (nodes.includes(first)) await pending.promise;
    },
    typesetClear() {}
  });
  const a = createCommentMathRenderer();
  const b = createCommentMathRenderer();
  const firstTask = a.render(container);
  const secondTask = b.render(second);
  await setImmediate();
  assert.deepEqual(calls, [[first]]);
  pending.resolve();
  await Promise.all([firstTask, secondTask]);
  assert.deepEqual(calls, [[first], [second]]);
  assert.equal(first.classes.has('nc-math-content'), false);
  assert.equal(second.classes.has('nc-math-content'), false);
  a.destroy(); b.destroy();
});

test('waits for an async script and startup before rendering', async () => {
  const listeners = new Map();
  const script = {
    addEventListener: (name, listener) => listeners.set(name, listener),
    removeEventListener: name => listeners.delete(name)
  };
  const startup = deferred();
  const calls = [];
  environment({}, script);
  const renderer = createCommentMathRenderer();
  const body = element({ body: true });
  const task = renderer.render(body);
  await setImmediate();
  assert.ok(listeners.has('load'));
  window.MathJax = {
    startup: { promise: startup.promise },
    typesetPromise: async nodes => { calls.push(nodes); },
    typesetClear() {}
  };
  listeners.get('load')();
  await setImmediate();
  assert.equal(calls.length, 0);
  startup.resolve();
  await task;
  assert.deepEqual(calls, [[body]]);
  assert.equal(listeners.size, 0);
  renderer.destroy();
});

test('clear invalidates pending work without canceling another container', async () => {
  const startup = deferred();
  const calls = [];
  const clears = [];
  environment({
    startup: { promise: startup.promise },
    typesetPromise: async nodes => { calls.push(nodes); },
    typesetClear: nodes => { clears.push(nodes); }
  });
  const renderer = createCommentMathRenderer();
  const outdated = element({ body: true });
  const current = element({ body: true });
  const oldTask = renderer.render(outdated);
  const newTask = renderer.render(current);
  await setImmediate();
  renderer.clear(outdated);
  startup.resolve();
  await Promise.all([oldTask, newTask]);
  assert.deepEqual(calls, [[current]]);
  assert.deepEqual(clears, [[outdated]]);
  renderer.destroy();
});

test('clearing a parent invalidates and releases tracked preview descendants', async () => {
  const startup = deferred();
  const calls = [];
  const clears = [];
  environment({
    startup: { promise: startup.promise },
    typesetPromise: async nodes => { calls.push(nodes); },
    typesetClear: nodes => { clears.push(nodes); }
  });
  const renderer = createCommentMathRenderer();
  const preview = element({ body: true });
  const form = element({ children: [preview] });
  const task = renderer.render(preview);
  await setImmediate();
  renderer.clear(form);
  startup.resolve();
  await task;
  renderer.destroy();
  assert.deepEqual(calls, []);
  assert.deepEqual(clears, [[form]]);
});

test('cleans retired bodies if DOM replacement happens during typesetting', async () => {
  const pending = deferred();
  const body = element({ body: true });
  const container = element({ children: [body] });
  const clears = [];
  environment({
    startup: { promise: Promise.resolve() },
    typesetPromise: () => pending.promise,
    typesetClear: nodes => { clears.push(nodes); }
  });
  const renderer = createCommentMathRenderer();
  const task = renderer.render(container);
  await setImmediate();
  renderer.clear(container);
  body.isConnected = false;
  pending.resolve();
  await task;
  assert.deepEqual(clears, [[container], [body]]);
  assert.equal(body.classes.has('nc-math-content'), false);
  renderer.destroy();
});

test('destroy and disconnected containers cannot typeset later', async () => {
  const startup = deferred();
  const calls = [];
  environment({
    startup: { promise: startup.promise },
    typesetPromise: async nodes => { calls.push(nodes); },
    typesetClear() {}
  });
  const renderer = createCommentMathRenderer();
  const body = element({ body: true });
  const task = renderer.render(body);
  await setImmediate();
  renderer.destroy();
  startup.resolve();
  await task;
  await renderer.render(body);
  const other = createCommentMathRenderer();
  body.isConnected = false;
  await other.render(body);
  assert.deepEqual(calls, []);
  other.destroy();
});

test('a failed safe-extension startup leaves source text untouched', async () => {
  const calls = [];
  const startup = deferred();
  environment({
    startup: { promise: startup.promise },
    typesetPromise: async nodes => { calls.push(nodes); },
    typesetClear() {}
  });
  const renderer = createCommentMathRenderer();
  const body = element({ body: true });
  const task = renderer.render(body);
  await setImmediate();
  startup.reject(new Error('ui/safe unavailable'));
  await task;
  assert.deepEqual(calls, []);
  assert.equal(body.classes.size, 0);
  renderer.destroy();
});

test('one failed script load serves all pending containers without repeat waits', async () => {
  const listeners = new Map();
  let listenerCount = 0;
  const script = {
    addEventListener(name, listener) { listenerCount += 1; listeners.set(name, listener); },
    removeEventListener: name => listeners.delete(name)
  };
  environment({}, script);
  const renderer = createCommentMathRenderer();
  const first = renderer.render(element({ body: true }));
  const second = renderer.render(element({ body: true }));
  await setImmediate();
  listeners.get('error')();
  await Promise.all([first, second]);
  assert.equal(listenerCount, 2);
  assert.equal(listeners.size, 0);
  renderer.destroy();
});
