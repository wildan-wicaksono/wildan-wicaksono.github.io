(() => {
  const key = 'studio-tikz-language';
  const isPreview = document.querySelector('[data-page]#proyek') !== null;
  const valid = lang => lang === 'en' || lang === 'id';
  const read = () => {
    try { return localStorage.getItem(key); } catch { return null; }
  };
  const navHere = () => [...document.querySelectorAll('.studio-reading-language')]
    .find(nav => !nav.closest('[data-page]')?.hidden);
  let preference = read();
  let activeLanguage = preference;
  const studioFrames = () => [...document.querySelectorAll('iframe')].filter(frame => {
    if (frame.matches('[data-practice], #live-editor')) return true;
    try {
      const url = new URL(frame.getAttribute('src'), location.href);
      return url.origin === location.origin && /\/(contoh-vektor|latihan-antiparalel)\.html$/.test(url.pathname);
    } catch { return false; }
  });
  const frameLanguage = (frame, language) => frame.contentWindow?.postMessage({type:'studio-tikz-language', language}, '*');

  function updatePreviewLabels(lang) {
    const en = lang === 'en';
    const frameBar = document.querySelector('.framebar');
    const docsLink = frameBar.querySelector('a:first-child');
    docsLink.textContent = en ? 'LaTeX documentation' : 'Dokumentasi LaTeX';
    docsLink.href = en ? '#project-en-paket-latex' : '#proyek-paket-latex';
    document.getElementById('return-page').textContent = en ? '← Back to reading' : '← Kembali ke bacaan';
    frameBar.querySelector('[data-download-editor]').textContent = en ? 'Download editor' : 'Unduh editor';
    frameBar.querySelector('nav').setAttribute('aria-label', en ? 'Editor navigation' : 'Navigasi editor');
    const card = document.querySelector('#projects .project-list-item');
    if (card) {
      card.querySelector('p').textContent = en
        ? 'Draw geometry in your browser and copy TikZ into your LaTeX handouts. Works offline.'
        : 'Editor geometri untuk menggambar di browser dan menyalin kode TikZ ke modul LaTeX. Bisa dipakai offline.';
      for (const a of card.querySelectorAll('a')) a.href = en ? '#project-en' : '#proyek';
    }
    document.getElementById('live-editor').title = en ? 'Studio TikZ geometry editor' : 'Editor geometri Studio TikZ';
  }

  function apply(language, navigate) {
    const nav = navHere();
    const lang = valid(language) ? language : nav?.dataset.studioLang || activeLanguage || 'id';
    activeLanguage = lang;
    if (navigate && nav && nav.dataset.studioLang !== lang) {
      const peer = nav.querySelector('[data-set-studio-lang="' + lang + '"]');
      if (peer) {
        if (isPreview) location.replace(peer.hash);
        else location.replace(peer.href);
        return;
      }
    }
    document.documentElement.lang = lang;
    if (isPreview) updatePreviewLabels(lang);
    for (const frame of studioFrames()) frameLanguage(frame, lang);
  }

  function choose(lang) {
    if (!valid(lang)) return;
    preference = lang;
    try { localStorage.setItem(key, lang); } catch {}
    apply(lang, false);
  }

  document.addEventListener('click', event => {
    const link = event.target.closest('[data-set-studio-lang]');
    if (link) choose(link.dataset.setStudioLang);
  });
  window.addEventListener('storage', event => {
    if (event.key === key && valid(event.newValue)) {
      preference = event.newValue;
      apply(preference, true);
    }
  });
  window.addEventListener('message', event => {
    const frame = studioFrames().find(item => item.contentWindow === event.source);
    if (frame && event.data?.type === 'studio-tikz-language' && valid(event.data.language)) {
      choose(event.data.language);
      if (navHere()) apply(event.data.language, true);
    }
  });
  for (const frame of studioFrames()) {
    frame.addEventListener('load', () => frameLanguage(frame, preference || navHere()?.dataset.studioLang || activeLanguage || 'id'));
  }
  function refresh() {
    apply(preference, true);
  }
  if (isPreview) window.addEventListener('hashchange', refresh);
  refresh();
})();
