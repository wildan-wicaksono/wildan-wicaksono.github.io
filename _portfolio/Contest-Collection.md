---
title: "Contest Collections"
date: 2024-07-04
excerpt: "A curated archive of problem sets and solutions from Indonesian mathematics competitions, organized by level, organizer, and year."
collection: portfolio
author_profile: true
share: false
comments: false
---

<style>
  .page__inner-wrap > header,
  .page__share,
  .pagination {
    display: none;
  }

  .contest-collection {
    --cc-navy: #0b1a29;
    --cc-navy-soft: #18344c;
    --cc-cyan: #17c7dc;
    --cc-cyan-dark: #087f91;
    --cc-ink: #243342;
    --cc-muted: #647586;
    --cc-line: #dbe5eb;
    --cc-surface: #f5fafc;
    color: var(--cc-ink);
  }

  .contest-collection *,
  .contest-collection *::before,
  .contest-collection *::after {
    box-sizing: border-box;
  }

  .contest-collection a {
    text-decoration: none;
  }

  .contest-collection h1,
  .contest-collection h2,
  .contest-collection h3,
  .contest-collection p {
    margin-top: 0;
  }

  .contest-collection h2 {
    padding-bottom: 0;
    border-bottom: 0;
  }

  .cc-hero {
    position: relative;
    margin: 0.5rem 0 1.25rem;
    padding: clamp(1.5rem, 4vw, 2.8rem);
    color: #fff;
    background:
      radial-gradient(circle at 88% 8%, rgba(23, 199, 220, 0.26), transparent 28%),
      linear-gradient(145deg, var(--cc-navy), var(--cc-navy-soft));
    border-radius: 18px;
    overflow: hidden;
  }

  .cc-eyebrow,
  .cc-section-kicker {
    display: block;
    margin-bottom: 0.55rem;
    color: var(--cc-cyan);
    font-size: 0.74rem;
    font-weight: 800;
    letter-spacing: 0.11em;
    text-transform: uppercase;
  }

  .cc-hero h1 {
    margin-bottom: 0.9rem;
    color: #fff;
    font-size: clamp(2rem, 5vw, 3.35rem);
    line-height: 1.05;
  }

  .cc-hero-copy {
    max-width: 760px;
    margin-bottom: 1.25rem;
    color: #d7e8f0;
    font-size: clamp(0.98rem, 2vw, 1.12rem);
    line-height: 1.7;
  }

  .cc-hero-meta,
  .cc-jumps,
  .cc-files {
    display: flex;
    flex-wrap: wrap;
    gap: 0.55rem;
  }

  .cc-hero-meta {
    margin-bottom: 1.35rem;
  }

  .cc-hero-meta span {
    padding: 0.42rem 0.72rem;
    color: #ecfdff;
    background: rgba(255, 255, 255, 0.09);
    border: 1px solid rgba(255, 255, 255, 0.17);
    border-radius: 999px;
    font-size: 0.77rem;
    font-weight: 700;
  }

  .cc-jumps a {
    display: inline-flex;
    align-items: center;
    min-height: 39px;
    padding: 0.55rem 0.78rem;
    color: #fff !important;
    background: rgba(255, 255, 255, 0.08);
    border: 1px solid rgba(255, 255, 255, 0.25);
    border-radius: 8px;
    font-size: 0.78rem;
    font-weight: 700;
    transition: background 0.18s ease, border-color 0.18s ease, transform 0.18s ease;
  }

  .cc-jumps a:hover {
    color: #fff !important;
    background: rgba(255, 255, 255, 0.15);
    border-color: rgba(255, 255, 255, 0.45);
    transform: translateY(-1px);
  }

  .cc-notice {
    display: grid;
    grid-template-columns: auto minmax(0, 1fr);
    gap: 0.85rem;
    align-items: start;
    margin-bottom: 3.25rem;
    padding: 1rem 1.15rem;
    color: #3e5364;
    background: var(--cc-surface);
    border: 1px solid var(--cc-line);
    border-left: 4px solid var(--cc-cyan);
    border-radius: 10px;
    font-size: 0.86rem;
    line-height: 1.65;
  }

  .cc-notice strong {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 31px;
    height: 31px;
    color: var(--cc-navy);
    background: #dffbff;
    border-radius: 50%;
    font-size: 0.78rem;
  }

  .cc-section {
    margin: 0 0 3.6rem;
    scroll-margin-top: 90px;
  }

  .cc-section-heading {
    display: flex;
    gap: 1.25rem;
    align-items: end;
    justify-content: space-between;
    margin-bottom: 1.25rem;
  }

  .cc-section-heading h2 {
    margin-bottom: 0.5rem;
    color: var(--cc-navy);
    font-size: clamp(1.45rem, 3vw, 2rem);
  }

  .cc-section-heading p {
    max-width: 720px;
    margin-bottom: 0;
    color: var(--cc-muted);
    font-size: 0.9rem;
    line-height: 1.65;
  }

  .cc-count {
    flex: 0 0 auto;
    padding: 0.4rem 0.68rem;
    color: var(--cc-cyan-dark);
    background: #e7fbfd;
    border: 1px solid #bceff4;
    border-radius: 999px;
    font-size: 0.72rem;
    font-weight: 800;
    white-space: nowrap;
  }

  .cc-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1rem;
  }

  .cc-grid--three {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .cc-card,
  .cc-feature {
    background: #fff;
    border: 1px solid var(--cc-line);
    border-radius: 13px;
  }

  .cc-card {
    padding: 1.25rem;
    box-shadow: 0 8px 24px rgba(11, 26, 41, 0.045);
  }

  .cc-card--wide {
    grid-column: 1 / -1;
  }

  .cc-card-top {
    display: flex;
    gap: 0.9rem;
    align-items: start;
    justify-content: space-between;
    margin-bottom: 1rem;
  }

  .cc-card h3,
  .cc-feature h3 {
    margin-bottom: 0.25rem;
    color: var(--cc-navy);
    font-size: 1.02rem;
  }

  .cc-card-subtitle,
  .cc-organizer {
    margin-bottom: 0;
    color: var(--cc-muted);
    font-size: 0.78rem;
    line-height: 1.5;
  }

  .cc-badge {
    flex: 0 0 auto;
    padding: 0.32rem 0.55rem;
    color: #536576;
    background: var(--cc-surface);
    border: 1px solid var(--cc-line);
    border-radius: 999px;
    font-size: 0.67rem;
    font-weight: 800;
    white-space: nowrap;
  }

  .cc-resource-row {
    display: grid;
    grid-template-columns: minmax(82px, 0.22fr) minmax(0, 1fr);
    gap: 0.8rem;
    align-items: start;
    padding-top: 0.85rem;
    border-top: 1px solid #e8eef2;
  }

  .cc-resource-row + .cc-resource-row {
    margin-top: 0.85rem;
  }

  .cc-round {
    padding-top: 0.42rem;
    color: #405364;
    font-size: 0.76rem;
    font-weight: 800;
  }

  .cc-file {
    display: inline-flex;
    gap: 0.4rem;
    align-items: center;
    justify-content: center;
    min-height: 38px;
    padding: 0.5rem 0.68rem;
    color: var(--cc-cyan-dark) !important;
    background: #f2fcfd;
    border: 1px solid #cceff2;
    border-radius: 8px;
    font-size: 0.76rem;
    font-weight: 800;
    line-height: 1.2;
    transition: color 0.18s ease, background 0.18s ease, border-color 0.18s ease, transform 0.18s ease;
  }

  .cc-file::after {
    content: "↗";
    font-size: 0.72rem;
    opacity: 0.7;
  }

  .cc-file:hover {
    color: var(--cc-navy) !important;
    background: #dffbff;
    border-color: #8de2e9;
    transform: translateY(-1px);
  }

  .cc-file:focus-visible,
  .cc-jumps a:focus-visible {
    outline: 3px solid rgba(23, 199, 220, 0.35);
    outline-offset: 2px;
  }

  .cc-feature {
    margin-top: 1rem;
    padding: 1.25rem;
    background: linear-gradient(180deg, #fff, #fbfdfe);
  }

  .cc-feature-heading {
    display: flex;
    gap: 1rem;
    align-items: start;
    justify-content: space-between;
    margin-bottom: 1rem;
  }

  .cc-feature-heading p {
    max-width: 680px;
    margin-bottom: 0;
    color: var(--cc-muted);
    font-size: 0.82rem;
    line-height: 1.55;
  }

  .cc-level-card {
    padding: 1rem;
    background: var(--cc-surface);
    border: 1px solid var(--cc-line);
    border-radius: 10px;
  }

  .cc-level-card h3 {
    margin-bottom: 0.85rem;
    font-size: 0.92rem;
  }

  .cc-level-card .cc-resource-row {
    grid-template-columns: 1fr;
    gap: 0.38rem;
  }

  .cc-level-card .cc-round {
    padding-top: 0;
  }

  @media (max-width: 820px) {
    .cc-grid,
    .cc-grid--three {
      grid-template-columns: 1fr;
    }

    .cc-card--wide {
      grid-column: auto;
    }

    .cc-section-heading {
      align-items: start;
    }
  }

  @media (max-width: 540px) {
    .cc-hero {
      padding: 1.35rem;
      border-radius: 14px;
    }

    .cc-hero-meta,
    .cc-jumps {
      gap: 0.45rem;
    }

    .cc-jumps a {
      flex: 1 1 calc(50% - 0.45rem);
      justify-content: center;
      text-align: center;
    }

    .cc-notice {
      grid-template-columns: 1fr;
      margin-bottom: 2.6rem;
    }

    .cc-section {
      margin-bottom: 3rem;
    }

    .cc-section-heading {
      display: block;
    }

    .cc-count {
      display: inline-flex;
      margin-top: 0.8rem;
    }

    .cc-card,
    .cc-feature {
      padding: 1rem;
    }

    .cc-resource-row {
      grid-template-columns: 1fr;
      gap: 0.4rem;
    }

    .cc-round {
      padding-top: 0;
    }

    .cc-file {
      min-height: 42px;
    }
  }
</style>

<div class="contest-collection">
  <section class="cc-hero">
    <span class="cc-eyebrow">Competition archive</span>
    <h1>Contest Collections</h1>
    <p class="cc-hero-copy">A curated archive of mathematics problem sets and solutions from Indonesian competitions, organized by level, organizer, and year.</p>
    <div class="cc-hero-meta" aria-label="Collection summary">
      <span>46 PDF files</span>
      <span>2020–2026</span>
      <span>Bahasa Indonesia</span>
    </div>
    <nav class="cc-jumps" aria-label="Jump to a collection">
      <a href="#national-olympiad">National Olympiad</a>
      <a href="#university-hosted">University-hosted</a>
      <a href="#other-contests">Other contests</a>
      <a href="#undergraduate">Undergraduate</a>
    </nav>
  </section>

  <aside class="cc-notice">
    <strong>PDF</strong>
    <div>All materials are provided in Bahasa Indonesia and open in a new tab. If a file does not open correctly on mobile, try another browser or use a laptop or desktop computer.</div>
  </aside>

  <section class="cc-section" id="national-olympiad">
    <div class="cc-section-heading">
      <div>
        <span class="cc-section-kicker">Indonesian Mathematics Olympiad</span>
        <h2>OSK, OSP, and OSN</h2>
        <p>Problem sets and solutions from the city/regency, provincial, and national rounds.</p>
      </div>
      <span class="cc-count">12 files</span>
    </div>

    <div class="cc-grid">
      <article class="cc-card">
        <div class="cc-card-top">
          <div>
            <h3>Junior · SMP/MTs</h3>
            <p class="cc-card-subtitle">National round</p>
          </div>
          <span class="cc-badge">1 PDF</span>
        </div>
        <div class="cc-resource-row">
          <span class="cc-round">OSN</span>
          <div class="cc-files">
            <a class="cc-file" href="/files/Kompetisi%20Sains%20Nasional%202020%20-%20SMP%20MTs.pdf" target="_blank" rel="noopener noreferrer">2020</a>
          </div>
        </div>
      </article>

      <article class="cc-card">
        <div class="cc-card-top">
          <div>
            <h3>Senior · SMA/MA</h3>
            <p class="cc-card-subtitle">City/regency to national rounds</p>
          </div>
          <span class="cc-badge">11 PDFs</span>
        </div>
        <div class="cc-resource-row">
          <span class="cc-round">OSN</span>
          <div class="cc-files">
            <a class="cc-file" href="/files/KSN%202021%20Hari%20Pertama.pdf" target="_blank" rel="noopener noreferrer">2021 · Day 1</a>
            <a class="cc-file" href="/files/KSN%202021%20Hari%20Kedua.pdf" target="_blank" rel="noopener noreferrer">2021 · Day 2</a>
            <a class="cc-file" href="/files/Soal%20dan%20Solusi%20OSN%20SMA%202022%20Hari%20Pertama.pdf" target="_blank" rel="noopener noreferrer">2022 · Day 1</a>
            <a class="cc-file" href="/files/Soal%20dan%20Solusi%20OSN%20SMA%202022%20Hari%20Kedua.pdf" target="_blank" rel="noopener noreferrer">2022 · Day 2</a>
          </div>
        </div>
        <div class="cc-resource-row">
          <span class="cc-round">OSP</span>
          <div class="cc-files">
            <a class="cc-file" href="/files/OSP%20SMA%202024.pdf" target="_blank" rel="noopener noreferrer">2024</a>
            <a class="cc-file" href="/files/OSP%20SMA%202025.pdf" target="_blank" rel="noopener noreferrer">2025</a>
          </div>
        </div>
        <div class="cc-resource-row">
          <span class="cc-round">OSK</span>
          <div class="cc-files">
            <a class="cc-file" href="/files/Soal%20dan%20Pembahasan%20OSK%202022.pdf" target="_blank" rel="noopener noreferrer">2022</a>
            <a class="cc-file" href="/files/OSK%20SMA%202023.pdf" target="_blank" rel="noopener noreferrer">2023</a>
            <a class="cc-file" href="/files/OSK%20SMA%202024.pdf" target="_blank" rel="noopener noreferrer">2024</a>
            <a class="cc-file" href="/files/OSK%20SMA%202025.pdf" target="_blank" rel="noopener noreferrer">2025</a>
            <a class="cc-file" href="/files/OSK%20SMA%202026.pdf" target="_blank" rel="noopener noreferrer">2026</a>
          </div>
        </div>
      </article>
    </div>
  </section>

  <section class="cc-section" id="university-hosted">
    <div class="cc-section-heading">
      <div>
        <span class="cc-section-kicker">Campus competitions</span>
        <h2>University-hosted contests</h2>
        <p>Competition archives from mathematics student organizations at Indonesian universities.</p>
      </div>
      <span class="cc-count">21 files</span>
    </div>

    <div class="cc-feature">
      <div class="cc-feature-heading">
        <div>
          <h3>Pekan Matematika Nasional</h3>
          <p>Organized by HIMATIKA Universitas Brawijaya.</p>
        </div>
        <span class="cc-badge">18 PDFs</span>
      </div>

      <div class="cc-grid cc-grid--three">
        <article class="cc-level-card">
          <h3>Primary</h3>
          <div class="cc-resource-row">
            <span class="cc-round">Preliminaries</span>
            <div class="cc-files">
              <a class="cc-file" href="/files/2023-PEMNAS-Prelim-Primary.pdf" target="_blank" rel="noopener noreferrer">2023</a>
              <a class="cc-file" href="/files/2024-PEMNAS-Prelim-Primary.pdf" target="_blank" rel="noopener noreferrer">2024</a>
              <a class="cc-file" href="/files/2025-PEMNAS-Prelim-Primary.pdf" target="_blank" rel="noopener noreferrer">2025</a>
            </div>
          </div>
          <div class="cc-resource-row">
            <span class="cc-round">Semifinal</span>
            <div class="cc-files">
              <a class="cc-file" href="/files/2023-PEMNAS-Semifinal-Primary.pdf" target="_blank" rel="noopener noreferrer">2023</a>
              <a class="cc-file" href="/files/2024-PEMNAS-Semifinal-Primary.pdf" target="_blank" rel="noopener noreferrer">2024</a>
              <a class="cc-file" href="/files/2025-PEMNAS-Semifinal-Primary.pdf" target="_blank" rel="noopener noreferrer">2025</a>
            </div>
          </div>
        </article>

        <article class="cc-level-card">
          <h3>Junior</h3>
          <div class="cc-resource-row">
            <span class="cc-round">Preliminaries</span>
            <div class="cc-files">
              <a class="cc-file" href="/files/2023-PEMNAS-Prelim-Junior.pdf" target="_blank" rel="noopener noreferrer">2023</a>
              <a class="cc-file" href="/files/2024-PEMNAS-Prelim-Junior.pdf" target="_blank" rel="noopener noreferrer">2024</a>
              <a class="cc-file" href="/files/2025-PEMNAS-Prelim-Junior.pdf" target="_blank" rel="noopener noreferrer">2025</a>
            </div>
          </div>
          <div class="cc-resource-row">
            <span class="cc-round">Semifinal</span>
            <div class="cc-files">
              <a class="cc-file" href="/files/2023-PEMNAS-Semifinal-Junior.pdf" target="_blank" rel="noopener noreferrer">2023</a>
              <a class="cc-file" href="/files/2024-PEMNAS-Semifinal-Junior.pdf" target="_blank" rel="noopener noreferrer">2024</a>
              <a class="cc-file" href="/files/2025-PEMNAS-Semifinal-Junior.pdf" target="_blank" rel="noopener noreferrer">2025</a>
            </div>
          </div>
        </article>

        <article class="cc-level-card">
          <h3>Senior</h3>
          <div class="cc-resource-row">
            <span class="cc-round">Preliminaries</span>
            <div class="cc-files">
              <a class="cc-file" href="/files/2023-PEMNAS-Prelim-Senior.pdf" target="_blank" rel="noopener noreferrer">2023</a>
              <a class="cc-file" href="/files/2024-PEMNAS-Prelim-Senior.pdf" target="_blank" rel="noopener noreferrer">2024</a>
              <a class="cc-file" href="/files/2025-PEMNAS-Prelim-Senior.pdf" target="_blank" rel="noopener noreferrer">2025</a>
            </div>
          </div>
          <div class="cc-resource-row">
            <span class="cc-round">Semifinal</span>
            <div class="cc-files">
              <a class="cc-file" href="/files/2023-PEMNAS-Semifinal-Senior.pdf" target="_blank" rel="noopener noreferrer">2023</a>
              <a class="cc-file" href="/files/2024-PEMNAS-Semifinal-Senior.pdf" target="_blank" rel="noopener noreferrer">2024</a>
              <a class="cc-file" href="/files/2025-PEMNAS-Semifinal-Senior.pdf" target="_blank" rel="noopener noreferrer">2025</a>
            </div>
          </div>
        </article>
      </div>
    </div>

    <div class="cc-grid" style="margin-top: 1rem;">
      <article class="cc-card">
        <div class="cc-card-top">
          <div>
            <h3>MIC Logika UI</h3>
            <p class="cc-card-subtitle">HIMATIKA Universitas Indonesia</p>
          </div>
          <span class="cc-badge">2 PDFs</span>
        </div>
        <div class="cc-resource-row">
          <span class="cc-round">Semifinal</span>
          <div class="cc-files">
            <a class="cc-file" href="/files/MIC%202022_Semifinal%20Round%20Logika%20UI.pdf" target="_blank" rel="noopener noreferrer">2022</a>
          </div>
        </div>
        <div class="cc-resource-row">
          <span class="cc-round">Final</span>
          <div class="cc-files">
            <a class="cc-file" href="/files/MIC%202022_Final%20Round%20Logika%20UI.pdf" target="_blank" rel="noopener noreferrer">2022</a>
          </div>
        </div>
      </article>

      <article class="cc-card">
        <div class="cc-card-top">
          <div>
            <h3>UNDIP's Mathematics Competition</h3>
            <p class="cc-card-subtitle">HIMATIKA Universitas Diponegoro</p>
          </div>
          <span class="cc-badge">1 PDF</span>
        </div>
        <div class="cc-resource-row">
          <span class="cc-round">Final</span>
          <div class="cc-files">
            <a class="cc-file" href="/files/Final%20Round_UNDIP%202022.pdf" target="_blank" rel="noopener noreferrer">2022</a>
          </div>
        </div>
      </article>
    </div>
  </section>

  <section class="cc-section" id="other-contests">
    <div class="cc-section-heading">
      <div>
        <span class="cc-section-kicker">Additional archives</span>
        <h2>Other contests</h2>
        <p>Independent competition series and olympiad simulations with solutions.</p>
      </div>
      <span class="cc-count">11 files</span>
    </div>

    <div class="cc-grid">
      <article class="cc-card cc-card--wide">
        <div class="cc-card-top">
          <div>
            <h3>Penta Mathematics Competition</h3>
            <p class="cc-card-subtitle">Ten collections, from PMC I to PMC X</p>
          </div>
          <span class="cc-badge">10 PDFs</span>
        </div>
        <div class="cc-files">
          <a class="cc-file" href="/files/PMC%20I.pdf" target="_blank" rel="noopener noreferrer">PMC I</a>
          <a class="cc-file" href="/files/PMC%20II.pdf" target="_blank" rel="noopener noreferrer">PMC II</a>
          <a class="cc-file" href="/files/PMC%20III.pdf" target="_blank" rel="noopener noreferrer">PMC III</a>
          <a class="cc-file" href="/files/PMC%20IV.pdf" target="_blank" rel="noopener noreferrer">PMC IV</a>
          <a class="cc-file" href="/files/PMC%20V.pdf" target="_blank" rel="noopener noreferrer">PMC V</a>
          <a class="cc-file" href="/files/PMC%20VI.pdf" target="_blank" rel="noopener noreferrer">PMC VI</a>
          <a class="cc-file" href="/files/PMC%20VII.pdf" target="_blank" rel="noopener noreferrer">PMC VII</a>
          <a class="cc-file" href="/files/PMC%20VIII.pdf" target="_blank" rel="noopener noreferrer">PMC VIII</a>
          <a class="cc-file" href="/files/PMC%20IX.pdf" target="_blank" rel="noopener noreferrer">PMC IX</a>
          <a class="cc-file" href="/files/PMC%20X.pdf" target="_blank" rel="noopener noreferrer">PMC X</a>
        </div>
      </article>

      <article class="cc-card cc-card--wide">
        <div class="cc-card-top">
          <div>
            <h3>Simulasi OSK SMA 2023 · Lajur Open</h3>
            <p class="cc-card-subtitle">Senior olympiad simulation with problems and solutions</p>
          </div>
          <span class="cc-badge">1 PDF</span>
        </div>
        <div class="cc-files">
          <a class="cc-file" href="/files/Soal%20dan%20Solusi%20Simulasi%20OSK%20SMA%202023%20-%20Lajur%20Open%202023.pdf" target="_blank" rel="noopener noreferrer">Open PDF</a>
        </div>
      </article>
    </div>
  </section>

  <section class="cc-section" id="undergraduate">
    <div class="cc-section-heading">
      <div>
        <span class="cc-section-kicker">University level</span>
        <h2>Undergraduate contests</h2>
        <p>ONMIPA-PT problem sets from the regional and national selection rounds.</p>
      </div>
      <span class="cc-count">2 files</span>
    </div>

    <article class="cc-card">
      <div class="cc-card-top">
        <div>
          <h3>ONMIPA-PT</h3>
          <p class="cc-card-subtitle">Organized by Pusat Prestasi Nasional</p>
        </div>
        <span class="cc-badge">2 PDFs</span>
      </div>
      <div class="cc-resource-row">
        <span class="cc-round">Regional</span>
        <div class="cc-files">
          <a class="cc-file" href="/files/Olympiad/ONMIPA_Wil2024.pdf" target="_blank" rel="noopener noreferrer">2024</a>
        </div>
      </div>
      <div class="cc-resource-row">
        <span class="cc-round">National</span>
        <div class="cc-files">
          <a class="cc-file" href="/files/Olympiad/ONMIPA_Nas2024.pdf" target="_blank" rel="noopener noreferrer">2024</a>
        </div>
      </div>
    </article>
  </section>
</div>
