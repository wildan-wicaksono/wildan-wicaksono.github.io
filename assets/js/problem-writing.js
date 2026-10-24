/* Explain horizontal scrolling only for equations that actually overflow. */
(function () {
  "use strict";

  var content = document.querySelector(".page__content");
  if (!content) return;

  var pending = false;
  var nextId = 0;

  function updateEquations() {
    pending = false;

    content.querySelectorAll('.pw-box mjx-container[display="true"]').forEach(function (math) {
      var wrapper = math.parentElement;
      if (!wrapper.classList.contains("pw-math")) {
        wrapper = document.createElement("div");
        wrapper.className = "pw-math";
        math.before(wrapper);
        wrapper.appendChild(math);

        var hint = document.createElement("div");
        hint.className = "pw-math-hint";
        hint.id = "pw-math-hint-" + (++nextId);

        var icon = document.createElement("span");
        icon.className = "pw-math-hint__icon";
        icon.setAttribute("aria-hidden", "true");
        icon.textContent = "↔";
        hint.appendChild(icon);
        hint.appendChild(document.createTextNode("Geser rumus ke kiri/kanan untuk melihat seluruhnya."));
        wrapper.appendChild(hint);
      }

      var overflowing = math.scrollWidth > math.clientWidth + 1;
      wrapper.classList.toggle("pw-math--overflowing", overflowing);

      if (overflowing) {
        math.setAttribute("tabindex", "0");
        math.setAttribute("role", "region");
        math.setAttribute("aria-label", "Rumus matematika yang dapat digeser");
        math.setAttribute("aria-describedby", wrapper.lastElementChild.id);
        math.setAttribute("data-pw-scrollable", "");
      } else if (math.hasAttribute("data-pw-scrollable")) {
        ["tabindex", "role", "aria-label", "aria-describedby", "data-pw-scrollable"].forEach(function (name) {
          math.removeAttribute(name);
        });
      }
    });
  }

  function scheduleUpdate() {
    if (pending) return;
    pending = true;
    window.requestAnimationFrame(updateEquations);
  }

  // MathJax loads asynchronously, so also handle equations inserted after this script.
  if (window.MutationObserver) {
    new MutationObserver(scheduleUpdate).observe(content, { childList: true, subtree: true });
  }
  if (window.ResizeObserver) {
    new ResizeObserver(scheduleUpdate).observe(content);
  }
  window.addEventListener("resize", scheduleUpdate, { passive: true });
  if (document.fonts) {
    document.fonts.ready.then(scheduleUpdate);
    document.fonts.addEventListener("loadingdone", scheduleUpdate);
  }

  scheduleUpdate();
}());
