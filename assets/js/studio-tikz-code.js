(() => {
  'use strict';

  // Keep unmatched text, including whitespace, verbatim for selection and copying.
  const tokens = /\\(?:[a-zA-Z@]+|[^\n])|%[^\n]*|\$\$?|[\[\](){}]|(?:\b|(?=[.+-]))[+-]?(?:\d+(?:\.\d*)?|\.\d+)(?:pt|bp|cm|mm|in|em|ex|deg)?\b|[a-zA-Z][a-zA-Z0-9_]*|--|\+\+|[;=,]/g;
  const keywords = new Set(['at', 'circle', 'arc', 'cycle', 'node', 'in', 'controls', 'and', 'rectangle', 'grid', 'to', 'edge', 'coordinate', 'plot', 'veclen']);
  const namedArguments = new Set(['\\begin', '\\end', '\\usepackage', '\\documentclass', '\\usetikzlibrary']);

  function colorize(code, source) {
    const fragment = document.createDocumentFragment();
    let last = 0, options = 0, parentheses = 0, math = '', argument = '', inName = false;
    for (const match of source.matchAll(tokens)) {
      const word = match[0], gap = source.slice(last, match.index);
      if (gap) fragment.append(gap);
      let kind;
      if (word.startsWith('%')) {
        kind = 'comment';
      } else if (word === '$' || word === '$$') {
        if (!math) math = word;
        else if (math === word) math = '';
        kind = 'math';
      } else if (math) {
        kind = 'math';
      } else if (word.startsWith('\\')) {
        kind = 'command';
        if (!options) argument = namedArguments.has(word) ? word : '';
      } else if (word === '[' || word === ']') {
        options = Math.max(0, options + (word === '[' ? 1 : -1));
      } else if (word === '{' || word === '}') {
        inName = word === '{' && !!argument && !options;
        if (!options) argument = '';
      } else if (word === '(' || word === ')') {
        parentheses = Math.max(0, parentheses + (word === '(' ? 1 : -1));
      } else if (/^[a-zA-Z]/.test(word)) {
        if (options) kind = 'option';
        else if (inName) kind = 'name';
        else if (keywords.has(word)) kind = 'keyword';
        else if (parentheses) kind = 'name';
      } else if (/^[+.-]?\d|^[+-]?\.\d/.test(word)) {
        kind = 'number';
      }
      if (kind) {
        const span = document.createElement('span');
        span.className = 'tex-' + kind;
        span.textContent = word;
        fragment.append(span);
      } else fragment.append(word);
      last = match.index + word.length;
    }
    fragment.append(source.slice(last));
    code.replaceChildren(fragment);
  }

  function selectCode(code) {
    const selection = window.getSelection(), range = document.createRange();
    range.selectNodeContents(code);
    selection.removeAllRanges();
    selection.addRange(range);
  }

  function mount(code, english) {
    const pre = code.parentElement;
    if (pre.classList.contains('studio-latex-block')) return;
    const source = code.textContent;
    const isTikz = /\\(?:begin\{tikzpicture\}|coordinate\b|draw\b)/.test(source);
    const language = isTikz ? 'TikZ' : 'LaTeX';
    const panel = document.createElement('div'), toolbar = document.createElement('div');
    const label = document.createElement('span'), button = document.createElement('button');
    panel.className = 'studio-latex-panel';
    toolbar.className = 'studio-latex-toolbar';
    label.className = 'studio-latex-language';
    label.textContent = language;
    button.className = 'studio-latex-copy';
    button.type = 'button';
    const action = english ? 'Copy code' : 'Salin kode';
    button.textContent = action;
    button.setAttribute('aria-live', 'polite');
    let reset;
    button.addEventListener('click', async () => {
      let copied = false;
      try { await navigator.clipboard.writeText(source); copied = true; }
      catch {
        pre.focus({preventScroll:true});
        selectCode(code);
        try { copied = document.execCommand('copy'); } catch {}
      }
      clearTimeout(reset);
      button.textContent = copied ? (english ? 'Copied' : 'Tersalin') : (english ? 'Press Ctrl+C / ⌘C' : 'Tekan Ctrl+C / ⌘C');
      reset = setTimeout(() => { button.textContent = action; }, 2500);
    });
    const rouge = pre.parentElement;
    const plainRouge = rouge.matches('div.highlight') && rouge.childElementCount === 1 &&
      rouge.parentElement.matches('.language-latex.highlighter-rouge') && rouge.parentElement.childElementCount === 1;
    (plainRouge ? rouge.parentElement : pre).replaceWith(panel);
    pre.classList.remove('highlight');
    pre.classList.add('studio-latex-block');
    pre.tabIndex = 0;
    if (!pre.hasAttribute('aria-label')) pre.setAttribute('aria-label', (english ? 'Code in ' : 'Kode ') + language);
    toolbar.append(label, button);
    panel.append(toolbar, pre);
    colorize(code, source);
  }

  const selector = '.language-latex pre > code, pre.latex > code, pre > code.language-latex, .studio-contoh-paket pre > code';
  for (const nav of document.querySelectorAll('.studio-reading-language')) {
    const article = nav.closest('article');
    if (article) article.querySelectorAll(selector).forEach(code => mount(code, nav.dataset.studioLang === 'en'));
  }
})();
