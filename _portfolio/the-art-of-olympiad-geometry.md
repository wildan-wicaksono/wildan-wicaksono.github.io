---
title: "The Art of Olympiad Geometry"
excerpt: "Buku geometri olimpiade berbahasa Indonesia yang disusun bertahap dari konsep dasar menuju pemecahan masalah."
collection: portfolio
permalink: /portfolio/the-art-of-olympiad-geometry/
# Tautan formulir untuk akses Bab 1 dan Bab 6.
free_chapter_form_url: "https://forms.gle/VKCMBHfYQ3FP1FhC8"
# Tautan pemesanan buku melalui NEC.
order_url: "https://bit.ly/pesanbukuNEC"
# Tautan formulir penilaian pembaca.
rating_form_url: "https://docs.google.com/forms/d/e/1FAIpQLScFbnVA2ggSBfE6rx8Gs6uMcuDyvpYzDyaaAtsK9aA59U3lZA/viewform?usp=publish-editor"
# Endpoint publik yang hanya mengembalikan rata-rata dan jumlah penilaian.
rating_api_url: "https://script.google.com/macros/s/AKfycbxh_N2aBYahJVDlaH1irqZaOU0_M2MJXnCH-xlb0_LmtSnu0--IRF528c3lMVAOJDWa/exec"
#
published: true
author_profile: true
share: false
comments: false
header:
  teaser: /images/the-art-of-olympiad-geometry-cover.png
---

<style>
  .page {
    float: none !important;
    width: 100% !important;
    margin: 0 !important;
    padding: 0 !important;
    min-width: 0;
  }

  @media (min-width: 925px) {
    #main {
      display: grid;
      grid-template-columns: minmax(185px, 225px) minmax(0, 1fr);
      column-gap: clamp(1.5rem, 3vw, 2.5rem);
      align-items: start;
    }

    #main > .sidebar {
      position: sticky !important;
      top: 70px;
      float: none !important;
      grid-column: 1;
      width: 100% !important;
      max-width: 225px;
      height: calc(100vh - 70px);
      margin: 0;
      padding-top: 1rem !important;
      overflow-y: auto;
    }

    #main > .page {
      grid-column: 2;
      min-width: 0;
    }
  }

  .page__inner-wrap > header { display: none; }

  .book-page {
    --book-navy: #0b1a29;
    --book-navy-soft: #14283b;
    --book-cyan: #1edff2;
    --book-cyan-soft: #dffbff;
    --book-ink: #243342;
    --book-muted: #647586;
    --book-line: #dbe5eb;
    color: var(--book-ink);
  }

  .book-page * { box-sizing: border-box; }

  .book-page a { text-decoration: none; }
  .book-page h2 { padding-bottom: 0; border-bottom: 0; }

  .book-hero {
    display: grid;
    grid-template-columns: minmax(210px, 0.72fr) minmax(0, 1.45fr);
    gap: clamp(2rem, 6vw, 4.5rem);
    align-items: center;
    margin: 0.5rem 0 3.5rem;
    padding: clamp(1.4rem, 4vw, 3rem);
    color: #fff;
    background:
      radial-gradient(circle at 87% 12%, rgba(30, 223, 242, 0.22), transparent 26%),
      linear-gradient(145deg, var(--book-navy), var(--book-navy-soft));
    border-radius: 18px;
    overflow: hidden;
  }

  .book-cover {
    display: block;
    width: 100%;
    max-width: 310px;
    margin: 0 auto;
    border-radius: 5px;
    box-shadow: 0 20px 45px rgba(0, 0, 0, 0.42);
  }

  .book-kicker {
    margin: 0 0 0.7rem;
    color: var(--book-cyan);
    font-size: 0.76rem;
    font-weight: 800;
    letter-spacing: 0.11em;
    text-transform: uppercase;
  }

  .book-hero h2 {
    margin: 0 0 1rem;
    color: #fff;
    font-size: clamp(2rem, 5vw, 3.5rem);
    line-height: 1.04;
  }

  .book-subtitle {
    margin: 0 0 1.35rem;
    color: #d5e8f1;
    font-size: clamp(1rem, 2vw, 1.18rem);
    line-height: 1.7;
  }

  .book-badges {
    display: flex;
    flex-wrap: wrap;
    gap: 0.55rem;
    margin-bottom: 1.5rem;
  }

  .book-badge {
    padding: 0.4rem 0.7rem;
    color: #eafcff;
    background: rgba(255, 255, 255, 0.09);
    border: 1px solid rgba(255, 255, 255, 0.17);
    border-radius: 999px;
    font-size: 0.76rem;
    font-weight: 700;
  }

  .book-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
  }

  .book-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-height: 44px;
    padding: 0.72rem 1rem;
    color: var(--book-navy) !important;
    background: var(--book-cyan);
    border: 1px solid var(--book-cyan);
    border-radius: 8px;
    font-size: 0.86rem;
    font-weight: 800;
    transition: transform 0.18s ease, background 0.18s ease;
  }

  .book-button:hover {
    color: var(--book-navy) !important;
    background: #8df4ff;
    transform: translateY(-1px);
  }

  .book-button--secondary {
    color: #fff !important;
    background: transparent;
    border-color: rgba(255, 255, 255, 0.35);
  }

  .book-button--secondary:hover {
    color: #fff !important;
    background: rgba(255, 255, 255, 0.09);
  }

  .book-section { margin: 3.5rem 0; }

  .book-section-label {
    display: block;
    margin-bottom: 0.45rem;
    color: #008da0;
    font-size: 0.76rem;
    font-weight: 800;
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }

  .book-section h2 {
    margin: 0 0 1rem;
    color: var(--book-navy);
    font-size: clamp(1.55rem, 3vw, 2.1rem);
  }

  .book-lead {
    max-width: none;
    color: #435668;
    font-size: 1.02rem;
    line-height: 1.8;
  }

  .book-stats {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 0.8rem;
    margin: 2rem 0 0;
  }

  .book-stat {
    padding: 1.1rem;
    background: #f5fafc;
    border: 1px solid var(--book-line);
    border-radius: 10px;
  }

  .book-stat strong {
    display: block;
    margin-bottom: 0.2rem;
    color: var(--book-navy);
    font-size: 1.35rem;
  }

  .book-stat span {
    color: var(--book-muted);
    font-size: 0.8rem;
  }

  .book-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 1rem;
  }

  .book-card {
    padding: 1.35rem;
    background: #fff;
    border: 1px solid var(--book-line);
    border-radius: 12px;
  }

  .book-card h3 {
    margin: 0 0 0.75rem;
    color: var(--book-navy);
    font-size: 1rem;
  }

  .book-card p,
  .book-card li {
    color: #536576;
    font-size: 0.88rem;
    line-height: 1.65;
  }

  .book-card ol,
  .book-card ul {
    margin: 0;
    padding-left: 1.2rem;
  }

  .book-card li + li { margin-top: 0.35rem; }

  .book-chapter-stats-heading {
    margin: 1.75rem 0 0.85rem;
    color: var(--book-navy);
    font-size: 1rem;
  }

  .book-chapter-stats {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 0.65rem;
  }

  .book-chapter-stat {
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto;
    gap: 0.25rem 0.75rem;
    align-items: baseline;
    padding: 0.85rem 1rem;
    background: #f5fafc;
    border: 1px solid var(--book-line);
    border-radius: 9px;
  }

  .book-chapter-stat strong {
    color: var(--book-navy);
    font-size: 0.86rem;
  }

  .book-chapter-stat span {
    color: #008da0;
    font-size: 0.82rem;
    font-weight: 800;
    white-space: nowrap;
  }

  .book-chapter-stat small {
    grid-column: 1 / -1;
    color: var(--book-muted);
    font-size: 0.72rem;
  }

  .book-chapter-stats-note {
    margin: 0.75rem 0 0 !important;
    color: var(--book-muted);
    font-size: 0.76rem;
  }

  .book-toc-disclosure {
    margin-top: 1rem;
    background: #f5fafc;
    border: 1px solid var(--book-line);
    border-radius: 12px;
    overflow: hidden;
  }

  .book-toc-disclosure > summary {
    position: relative;
    padding: 1rem 3rem 1rem 1.2rem;
    color: var(--book-navy);
    cursor: pointer;
    font-weight: 800;
    list-style: none;
  }

  .book-toc-disclosure > summary::-webkit-details-marker,
  .book-chapter > summary::-webkit-details-marker { display: none; }

  .book-toc-disclosure > summary::after,
  .book-chapter > summary::after {
    content: "+";
    position: absolute;
    right: 1.1rem;
    color: #008da0;
    font-size: 1.15rem;
    line-height: 1;
  }

  .book-toc-disclosure[open] > summary::after,
  .book-chapter[open] > summary::after { content: "\2212"; }

  .book-toc-content {
    padding: 1.25rem 1.2rem 1.2rem;
    border-top: 1px solid var(--book-line);
  }

  .book-toc-note {
    margin: 0 0 1.25rem !important;
    color: var(--book-muted);
    font-size: 0.82rem;
  }

  .book-chapter-list {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 0.65rem;
    align-items: start;
  }

  .book-chapter-column {
    display: grid;
    gap: 0.65rem;
    align-content: start;
  }

  .book-chapter {
    background: #fff;
    border: 1px solid var(--book-line);
    border-radius: 8px;
  }

  .book-chapter > summary {
    position: relative;
    padding: 0.85rem 2.6rem 0.85rem 1rem;
    color: var(--book-navy);
    cursor: pointer;
    font-size: 0.86rem;
    font-weight: 800;
    line-height: 1.45;
    list-style: none;
  }

  .book-chapter > summary::after {
    right: 0.9rem;
    top: 1rem;
  }

  .book-chapter ol {
    margin: 0;
    padding: 0 1rem 1rem 2.25rem;
  }

  .book-chapter li {
    color: #536576;
    font-size: 0.8rem;
    line-height: 1.55;
  }

  .book-chapter li + li { margin-top: 0.28rem; }

  .book-chapter ul {
    margin: 0.3rem 0 0;
    padding-left: 1.05rem;
  }

  .book-features {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 0.85rem 1.4rem;
    margin-top: 1.5rem;
  }

  .book-feature {
    position: relative;
    margin: 0;
    padding: 0.95rem 1rem 0.95rem 2.7rem;
    color: #435668;
    background: var(--book-cyan-soft);
    border-radius: 9px;
    line-height: 1.55;
  }

  .book-feature::before {
    content: "\2713";
    position: absolute;
    left: 1rem;
    color: #007e8e;
    font-weight: 900;
  }

  .book-problems {
    padding: clamp(1.3rem, 4vw, 2.2rem);
    background: #fff;
    border: 1px solid var(--book-line);
    border-radius: 14px;
  }

  .book-problem-list {
    display: grid;
    gap: 0.7rem;
    margin-top: 1.4rem;
  }

  .book-problem {
    background: #f5fafc;
    border: 1px solid var(--book-line);
    border-radius: 9px;
    overflow: hidden;
  }

  .book-problem > summary {
    position: relative;
    display: flex;
    gap: 0.75rem;
    align-items: center;
    padding: 0.9rem 3rem 0.9rem 1rem;
    color: var(--book-navy);
    cursor: pointer;
    font-size: 0.9rem;
    font-weight: 800;
    line-height: 1.45;
    list-style: none;
  }

  .book-problem > summary::-webkit-details-marker { display: none; }

  .book-problem > summary::after {
    content: "+";
    position: absolute;
    right: 1rem;
    color: #008da0;
    font-size: 1.15rem;
    line-height: 1;
  }

  .book-problem[open] > summary::after { content: "\2212"; }

  .book-problem-number {
    display: inline-grid;
    flex: 0 0 1.75rem;
    width: 1.75rem;
    height: 1.75rem;
    place-items: center;
    color: var(--book-navy);
    background: var(--book-cyan);
    border-radius: 50%;
    font-size: 0.78rem;
  }

  .book-problem-body {
    padding: 1rem 1.15rem 1.15rem;
    border-top: 1px solid var(--book-line);
  }

  .book-problem-body p {
    margin: 0;
    color: #435668;
    line-height: 1.75;
  }

  .book-problem-body p + p { margin-top: 0.8rem; }

  .book-problem-equation {
    overflow-x: auto;
    padding: 0.2rem 0;
    color: var(--book-navy);
    text-align: center;
  }

  .book-samples {
    padding: clamp(1.3rem, 4vw, 2.2rem);
    background: #f5fafc;
    border: 1px solid var(--book-line);
    border-radius: 14px;
  }

  .book-sample-list {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 0.85rem;
    margin-top: 1.2rem;
  }

  .book-sample {
    display: block;
    padding: 1rem;
    color: #536576;
    background: #fff;
    border: 1px solid #b9c8d1;
    border-radius: 9px;
  }

  .book-sample strong {
    display: block;
    margin-bottom: 0.2rem;
    color: var(--book-navy);
  }

  .book-note {
    margin: 1rem 0 0;
    color: var(--book-muted);
    font-size: 0.78rem;
  }

  .book-usage {
    margin: 1rem 0 0;
    padding: 0.85rem 1rem;
    color: #435668;
    background: var(--book-cyan-soft);
    border-left: 4px solid #008da0;
    border-radius: 7px;
    font-size: 0.86rem;
    line-height: 1.6;
  }

  .book-usage strong { color: var(--book-navy); }

  .book-form-action {
    margin-top: 1.15rem;
  }

  .book-form-note {
    margin: 1.25rem 0 0 !important;
    color: var(--book-muted);
    font-size: 0.78rem;
    line-height: 1.55;
  }

  .book-button--disabled {
    color: #657785 !important;
    background: #dce8ed;
    border-color: #dce8ed;
    cursor: not-allowed;
    pointer-events: none;
  }

  .book-errata {
    padding: clamp(1.3rem, 4vw, 2.2rem);
    background: #fff;
    border: 1px solid var(--book-line);
    border-radius: 14px;
  }

  .book-errata-format {
    margin: 1.25rem 0;
    padding: 1rem 1.2rem;
    color: #536576;
    background: #f5fafc;
    border-radius: 9px;
  }

  .book-errata-format p { margin: 0 0 0.65rem; }
  .book-errata-format ul { margin: 0; }
  .book-errata-format code { color: var(--book-navy); }

  .book-errata .book-actions + .book-note {
    margin-top: 1.25rem !important;
  }

  .book-order,
  .book-rating {
    padding: clamp(1.3rem, 4vw, 2.2rem);
    background: #fff;
    border: 1px solid var(--book-line);
    border-radius: 14px;
  }

  .book-order-steps {
    display: grid;
    gap: 0.8rem;
    margin: 1.4rem 0 0;
    padding: 0;
    list-style: none;
    counter-reset: order-step;
  }

  .book-price-card {
    display: flex;
    gap: 1.5rem;
    align-items: center;
    justify-content: space-between;
    margin: 1.4rem 0 0;
    padding: clamp(1.1rem, 3vw, 1.5rem);
    color: #fff;
    background:
      radial-gradient(circle at 90% 10%, rgba(30, 223, 242, 0.18), transparent 38%),
      var(--book-navy);
    border-radius: 12px;
  }

  .book-price-label {
    display: block;
    margin-bottom: 0.35rem;
    color: var(--book-cyan);
    font-size: 0.7rem;
    font-weight: 800;
    letter-spacing: 0.09em;
    text-transform: uppercase;
  }

  .book-price-promo {
    margin: 0;
    color: #fff;
    font-size: clamp(1.75rem, 5vw, 2.5rem);
    font-weight: 900;
    line-height: 1.1;
  }

  .book-price-normal {
    margin: 0.45rem 0 0;
    color: #b9cad4;
    font-size: 0.82rem;
  }

  .book-price-normal del {
    color: #e1ebf0;
    text-decoration-thickness: 2px;
  }

  .book-price-period {
    max-width: none;
    margin: 0;
    color: #d4e4ec;
    font-size: clamp(0.72rem, 2vw, 0.86rem);
    line-height: 1.65;
    white-space: nowrap;
  }

  .book-price-period strong { color: #fff; }

  .book-order-steps li {
    position: relative;
    min-height: 3.1rem;
    padding: 0.85rem 1rem 0.85rem 3.75rem;
    color: #435668;
    background: #f5fafc;
    border-radius: 9px;
    line-height: 1.65;
    counter-increment: order-step;
  }

  .book-order-steps li::before {
    content: counter(order-step);
    position: absolute;
    top: 0.78rem;
    left: 1rem;
    display: grid;
    width: 2rem;
    height: 2rem;
    place-items: center;
    color: var(--book-navy);
    background: var(--book-cyan);
    border-radius: 50%;
    font-size: 0.8rem;
    font-weight: 800;
  }

  .book-order-contact {
    margin: 1.25rem 0 0;
    padding: 0.9rem 1rem;
    color: #435668;
    background: var(--book-cyan-soft);
    border-left: 4px solid #008da0;
    border-radius: 7px;
    line-height: 1.65;
  }

  .book-order .book-actions { margin-top: 1.25rem; }

  .book-rating {
    text-align: center;
    background: #f5fafc;
  }

  .book-rating .book-lead {
    margin-right: auto;
    margin-left: auto;
  }

  .book-rating-stars {
    margin: 1rem 0 1.25rem;
    color: #e3aa20;
    font-size: clamp(1.8rem, 5vw, 2.5rem);
    letter-spacing: 0.18rem;
    line-height: 1;
  }

  .book-rating-summary[hidden],
  .book-rating-prompt[hidden] {
    display: none;
  }

  .book-rating-summary {
    margin: 1rem 0 1.25rem;
  }

  .book-rating-average-stars {
    position: relative;
    display: inline-block;
    color: #d6dee3;
    font-size: clamp(1.8rem, 5vw, 2.5rem);
    letter-spacing: 0.18rem;
    line-height: 1;
  }

  .book-rating-average-fill {
    position: absolute;
    inset: 0 auto 0 0;
    width: 0;
    overflow: hidden;
    color: #e3aa20;
    white-space: nowrap;
  }

  .book-rating-score {
    margin: 0.75rem 0 0;
    color: var(--book-navy);
    font-size: 1rem;
  }

  .book-rating-count {
    margin: 0.2rem 0 0;
    color: var(--book-muted);
    font-size: 0.78rem;
  }

  .book-rating .book-actions { justify-content: center; }

  .book-info {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 0;
    margin: 1.5rem 0 0;
    border: 1px solid var(--book-line);
    border-radius: 12px;
    overflow: hidden;
  }

  .book-info div {
    padding: 0.9rem 1rem;
    border-bottom: 1px solid var(--book-line);
  }

  .book-info div:nth-child(odd) { border-right: 1px solid var(--book-line); }
  .book-info div:nth-last-child(-n + 2) { border-bottom: 0; }

  .book-info dt {
    margin-bottom: 0.2rem;
    color: var(--book-muted);
    font-size: 0.72rem;
    font-weight: 700;
    letter-spacing: 0.05em;
    text-transform: uppercase;
  }

  .book-info dd {
    margin: 0;
    color: var(--book-navy);
    font-size: 0.9rem;
    font-weight: 700;
  }

  .book-closing {
    margin-top: 3.5rem;
    padding: clamp(1.4rem, 4vw, 2.4rem);
    color: #fff;
    text-align: center;
    background: var(--book-navy);
    border-radius: 14px;
  }

  .book-closing h2 {
    margin: 0 0 0.7rem;
    color: #fff;
  }

  .book-closing p {
    max-width: 620px;
    margin: 0 auto;
    color: #c9dbe4;
    line-height: 1.7;
  }

  .book-closing .book-actions {
    justify-content: center;
    margin-top: 1.15rem;
  }

  @media (max-width: 760px) {
    .book-hero { grid-template-columns: 1fr; }
    .book-cover { max-width: 250px; }
    .book-stats { grid-template-columns: repeat(2, minmax(0, 1fr)); }
    .book-grid { grid-template-columns: 1fr; }
    .book-chapter-stats { grid-template-columns: 1fr; }
    .book-chapter-list { grid-template-columns: 1fr; }
    .book-features { grid-template-columns: 1fr; }
    .book-sample-list { grid-template-columns: 1fr; }
    .book-price-card { align-items: flex-start; flex-direction: column; }
  }

  @media (max-width: 460px) {
    .book-actions { flex-direction: column; }
    .book-button { width: 100%; }
    .book-info { grid-template-columns: 1fr; }
    .book-info div,
    .book-info div:nth-child(odd),
    .book-info div:nth-last-child(-n + 2) {
      border-right: 0;
      border-bottom: 1px solid var(--book-line);
    }
    .book-info div:last-child { border-bottom: 0; }
  }
</style>

<div class="book-page">
  <section class="book-hero" aria-labelledby="book-heading">
    <div>
      <img class="book-cover" src="{{ '/images/the-art-of-olympiad-geometry-cover.png' | relative_url }}" alt="Sampul buku The Art of Olympiad Geometry: Basic Level karya Wildan Bagus Wicaksono">
    </div>
    <div>
      <p class="book-kicker">Buku geometri olimpiade berbahasa Indonesia</p>
      <h2 id="book-heading">The Art of Olympiad Geometry</h2>
      <p class="book-subtitle">Panduan tingkat dasar yang mengajak pembaca memahami konsep, pembuktian, dan cara berpikir di balik penyelesaian soal geometri olimpiade.</p>
      <div class="book-badges" aria-label="Informasi singkat buku">
        <span class="book-badge">Tingkat dasar</span>
        <span class="book-badge">Pemesanan dibuka</span>
        <span class="book-badge">Promo Rp200.000</span>
        <span class="book-badge">Edisi pertama, 2026</span>
        <span class="book-badge">Bahasa Indonesia</span>
      </div>
      <div class="book-actions">
        <a class="book-button" href="#pemesanan">Pesan buku</a>
        <a class="book-button book-button--secondary" href="#cakupan-materi">Lihat cakupan materi</a>
        <a class="book-button book-button--secondary" href="#bab-gratis">Bab gratis</a>
      </div>
    </div>
  </section>

  <section class="book-section" id="tentang-buku">
    <span class="book-section-label">Tentang buku</span>
    <h2>Belajar geometri dengan memahami idenya</h2>
    <p class="book-lead">Buku ini disusun untuk pembaca yang ingin mulai mempelajari geometri olimpiade secara terarah. Materi bergerak dari fakta-fakta dasar menuju teknik pemecahan masalah, dengan perhatian khusus pada alasan di balik setiap langkah, bukan hanya pada jawaban akhir.</p>

    <div class="book-stats" aria-label="Ringkasan isi buku">
      <div class="book-stat"><strong>477</strong><span>halaman</span></div>
      <div class="book-stat"><strong>9</strong><span>bab utama</span></div>
      <div class="book-stat"><strong>2</strong><span>bagian materi</span></div>
      <div class="book-stat"><strong>3</strong><span>apendiks</span></div>
    </div>

    <div class="book-features">
      <p class="book-feature">Penjelasan konsep dan pembuktian yang disusun bertahap.</p>
      <p class="book-feature">Contoh soal yang menekankan proses menemukan ide.</p>
      <p class="book-feature">Latihan dan soal dengan tingkat kesulitan bervariasi.</p>
      <p class="book-feature">Diagram, petunjuk, serta solusi terpilih untuk belajar mandiri.</p>
    </div>
  </section>

  <section class="book-section" id="cakupan-materi">
    <span class="book-section-label">Daftar isi ringkas</span>
    <h2>Cakupan materi</h2>
    <div class="book-grid">
      <article class="book-card">
        <h3>Bagian I - Euclidean Geometry</h3>
        <ol>
          <li>Sudut di Poligon</li>
          <li>Panjang dan Luas di Poligon</li>
          <li>Sudut di Lingkaran</li>
          <li>Panjang dan Luas di Lingkaran</li>
          <li>Teorema Lanjutan di Lingkaran</li>
        </ol>
      </article>
      <article class="book-card">
        <h3>Bagian II - Computational Geometry</h3>
        <ol start="6">
          <li>Aturan Sinus dan Aturan Cosinus</li>
          <li>Masalah Rasio</li>
          <li>Teknik Analitik</li>
          <li>Trigonometri Lanjutan</li>
        </ol>
      </article>
      <article class="book-card">
        <h3>Bagian III - Apendiks</h3>
        <ul>
          <li>Kunci dan Petunjuk</li>
          <li>Solusi Terpilih</li>
          <li>Daftar Kompetisi</li>
          <li>Daftar Pustaka dan Indeks</li>
        </ul>
      </article>
    </div>

    <h3 class="book-chapter-stats-heading">Jumlah halaman tiap bab</h3>
    <div class="book-chapter-stats" aria-label="Jumlah halaman tiap bab">
      <div class="book-chapter-stat"><strong>Bab 1</strong><span>26 halaman</span><small>Halaman 3-28</small></div>
      <div class="book-chapter-stat"><strong>Bab 2</strong><span>38 halaman</span><small>Halaman 29-66</small></div>
      <div class="book-chapter-stat"><strong>Bab 3</strong><span>30 halaman</span><small>Halaman 67-96</small></div>
      <div class="book-chapter-stat"><strong>Bab 4</strong><span>36 halaman</span><small>Halaman 97-132</small></div>
      <div class="book-chapter-stat"><strong>Bab 5</strong><span>42 halaman</span><small>Halaman 133-174</small></div>
      <div class="book-chapter-stat"><strong>Bab 6</strong><span>34 halaman</span><small>Halaman 177-210</small></div>
      <div class="book-chapter-stat"><strong>Bab 7</strong><span>42 halaman</span><small>Halaman 211-252</small></div>
      <div class="book-chapter-stat"><strong>Bab 8</strong><span>48 halaman</span><small>Halaman 253-300</small></div>
      <div class="book-chapter-stat"><strong>Bab 9</strong><span>48 halaman</span><small>Halaman 301-348</small></div>
    </div>
    <p class="book-chapter-stats-note">Rentang mengikuti penomoran halaman pada edisi pertama. Halaman pembuka bagian tidak dihitung sebagai halaman bab.</p>

    <details class="book-toc-disclosure">
      <summary>Lihat daftar subbab lengkap</summary>
      <div class="book-toc-content">
        <p class="book-toc-note">Setiap bab juga dilengkapi latihan, contoh soal, dan soal akhir bab.</p>
        <div class="book-chapter-list">
          <div class="book-chapter-column">
          <details class="book-chapter">
            <summary>Bab 1 - Sudut di Poligon</summary>
            <ol>
              <li>Objek Dasar Geometri</li>
              <li>Bangun Datar Segitiga</li>
              <li>Segi Banyak (Poligon)</li>
            </ol>
          </details>
          <details class="book-chapter">
            <summary>Bab 2 - Panjang dan Luas di Poligon</summary>
            <ol>
              <li>Keliling dan Luas Poligon</li>
              <li>Teorema Pythagoras</li>
              <li>Kesebangunan Dua Segitiga</li>
              <li>Garis Bagi Dalam dan Garis Bagi Luar</li>
              <li>Kekongruenan Dua Segitiga</li>
              <li>Mengonstruksikan Titik Bantu</li>
              <li>Korespondensi pada Kesebangunan-Kekongruenan</li>
            </ol>
          </details>
          <details class="book-chapter">
            <summary>Bab 3 - Sudut di Lingkaran</summary>
            <ol>
              <li>Unsur-Unsur Lingkaran</li>
              <li>Hubungan antara Lingkaran dan Garis</li>
              <li>Sudut Pusat dan Sudut Keliling</li>
              <li>Segiempat Tali Busur</li>
            </ol>
          </details>
          <details class="book-chapter">
            <summary>Bab 4 - Panjang dan Luas di Lingkaran</summary>
            <ol>
              <li>Panjang Busur dan Luas</li>
              <li>Garis Singgung Persekutuan</li>
              <li>Lingkaran Bersinggungan</li>
              <li>Lingkaran Dalam dan Lingkaran Luar Segitiga</li>
            </ol>
          </details>
          <details class="book-chapter">
            <summary>Bab 5 - Teorema Lanjutan di Lingkaran</summary>
            <ol>
              <li>Power of Point</li>
              <li>Teorema Ptolemy</li>
              <li>Lingkaran Singgung Luar Segitiga</li>
              <li>Lingkaran Apollonius</li>
              <li>Konvers Segiempat Tali Busur
                <ul>
                  <li>Penerapan Sederhana</li>
                  <li>Segitiga dan Garis Tinggi</li>
                </ul>
              </li>
            </ol>
          </details>
          </div>
          <div class="book-chapter-column">
          <details class="book-chapter">
            <summary>Bab 6 - Aturan Sinus dan Aturan Cosinus</summary>
            <ol>
              <li>Fungsi Trigonometri</li>
              <li>Jumlahan Sudut pada Fungsi Trigonometri</li>
              <li>Kuadran dan Kesamaan Fungsi Trigonometri</li>
              <li>Penurunan Sifat Fungsi Trigonometri</li>
              <li>Luas Segitiga dengan Trigonometri</li>
              <li>Aturan Sinus dan Cosinus Segitiga</li>
              <li>Teorema Stewart</li>
            </ol>
          </details>
          <details class="book-chapter">
            <summary>Bab 7 - Masalah Rasio</summary>
            <ol>
              <li>Perbandingan Luas</li>
              <li>Teorema Ceva</li>
              <li>Teorema Menelaus</li>
              <li>Mass Point Method</li>
            </ol>
          </details>
          <details class="book-chapter">
            <summary>Bab 8 - Teknik Analitik</summary>
            <ol>
              <li>Koordinat Cartesius</li>
              <li>Persamaan Garis</li>
              <li>Jarak dan Luas</li>
              <li>Lingkaran di Koordinat Cartesius</li>
              <li>Transformasi Geometri
                <ul>
                  <li>Translasi</li>
                  <li>Refleksi</li>
                  <li>Dilatasi</li>
                  <li>Rotasi</li>
                </ul>
              </li>
              <li>Saran Saat Menggunakan Analitik</li>
            </ol>
          </details>
          <details class="book-chapter">
            <summary>Bab 9 - Trigonometri Lanjutan</summary>
            <ol>
              <li>Titik Tinggi dan Titik Pusat Lingkaran Luar Segitiga</li>
              <li>Titik Bagi Segitiga</li>
              <li>Formula Brahmagupta dan Parameshvara</li>
              <li>Identitas Trigonometri pada Sudut Segitiga</li>
              <li>Descartes' Circle Theorem</li>
            </ol>
          </details>
          </div>
        </div>
      </div>
    </details>
  </section>

  <section class="book-section">
    <span class="book-section-label">Untuk pembaca</span>
    <h2>Siapa yang dapat menggunakan buku ini?</h2>
    <p class="book-lead">Buku ini ditujukan bagi siswa yang ingin mempelajari cara menghadapi soal-soal isian singkat pada level OSK SMP hingga OSP SMA.</p>
    <div class="book-grid">
      <article class="book-card">
        <h3>Pelajar SMP dan SMA</h3>
        <p>Pembaca yang baru mengenal geometri olimpiade dan membutuhkan jalur belajar yang runtut.</p>
      </article>
      <article class="book-card">
        <h3>Peserta olimpiade</h3>
        <p>Peserta yang ingin memperkuat dasar sebelum beralih ke teknik geometri yang lebih lanjut.</p>
      </article>
      <article class="book-card">
        <h3>Guru dan pembina</h3>
        <p>Pendamping belajar yang mencari bahan penjelasan, contoh, latihan, dan soal untuk pembinaan.</p>
      </article>
    </div>
  </section>

  <section class="book-section book-problems" id="sampel-soal">
    <span class="book-section-label">Coba kemampuanmu</span>
    <h2>Sampel soal di luar bab gratis</h2>
    <p class="book-lead">Ketujuh soal berikut diambil dari bagian buku di luar Bab 1 dan Bab 6 yang tersedia sebagai bab gratis. Soal-soal tersebut berasal dari berbagai kompetisi, sedangkan beberapa lainnya merupakan kreasi penulis. Sampel ini memberikan gambaran tentang variasi soal isian singkat dan pendekatan yang dibahas dalam buku.</p>
    <div class="book-problem-list">
      <details class="book-problem">
        <summary><span class="book-problem-number">1</span><span>Segitiga dan lingkaran dalam</span></summary>
        <div class="book-problem-body">
          <p>Diberikan \(\triangle ABC\) dengan \(AB=99\), \(BC=100\), dan \(CA=101\). \(D\) adalah titik pada \(\overline{BC}\). Jika lingkaran dalam \(\triangle ABD\) dan \(\triangle ACD\) menyinggung \(AD\) di satu titik \(E\), tentukan \(AE-ED\).</p>
        </div>
      </details>
      <details class="book-problem">
        <summary><span class="book-problem-number">2</span><span>India PRMO 2018</span></summary>
        <div class="book-problem-body">
          <p>Diberikan segitiga \(ABC\) dan \(DEF\) yang memenuhi</p>
          <div class="book-problem-equation">\[\angle A=\angle D,\quad AB=DE=17,\quad BC=EF=10,\quad AC-DF=12.\]</div>
          <p>Tentukan \(AC+DF\).</p>
        </div>
      </details>
      <details class="book-problem">
        <summary><span class="book-problem-number">3</span><span>Setengah lingkaran dan rasio panjang</span></summary>
        <div class="book-problem-body">
          <p>Diberikan setengah lingkaran berdiameter \(\overline{AP}\). Titik \(B\) dan \(C\) terletak pada busur \(AP\) dalam urutan \(A\), \(B\), \(C\), \(P\), sedangkan \(M\) terletak pada \(\overline{AP}\) dan memenuhi \(CM\perp AP\) serta \(\angle MCB=\angle CBA=2\angle BAM\). Tentukan rasio \(\frac{AB}{CM}\).</p>
        </div>
      </details>
      <details class="book-problem">
        <summary><span class="book-problem-number">4</span><span>PEMNAS SMA 2024</span></summary>
        <div class="book-problem-body">
          <p>Diberikan segitiga \(ABC\) dan titik \(M\) terletak pada \(\overline{AC}\). Titik \(N\) merupakan bayangan pencerminan titik \(M\) terhadap garis \(BC\), dan \(AN\) memotong \(\overline{BC}\) di \(O\). Selain itu, \(A\), \(B\), \(M\), dan \(O\) terletak pada lingkaran yang sama. Jika \(\angle ABN=56^\circ\), tentukan besar \(\angle CMN\).</p>
        </div>
      </details>
      <details class="book-problem">
        <summary><span class="book-problem-number">5</span><span>Turkey 2012</span></summary>
        <div class="book-problem-body">
          <p>Titik \(D\) terletak di dalam segitiga \(ABC\) dan memenuhi</p>
          <div class="book-problem-equation">\[\angle BAD=20^\circ,\quad \angle DAC=80^\circ,\quad \angle ACD=20^\circ,\quad \angle DCB=20^\circ.\]</div>
          <p>Tentukan besar \(\angle ABD\).</p>
        </div>
      </details>
      <details class="book-problem">
        <summary><span class="book-problem-number">6</span><span>AMC 12 2020</span></summary>
        <div class="book-problem-body">
          <p>Segiempat \(ABCD\) memenuhi \(\angle ABC=\angle ACD=90^\circ\). Diagonal \(\overline{AC}\) dan \(\overline{BD}\) berpotongan di \(E\). Jika \(AC=20\), \(CD=30\), dan \(AE=5\), tentukan luas segiempat \(ABCD\).</p>
        </div>
      </details>
      <details class="book-problem">
        <summary><span class="book-problem-number">7</span><span>Titik tinggi segitiga lancip</span></summary>
        <div class="book-problem-body">
          <p>Misalkan \(H\) titik tinggi dari suatu segitiga lancip \(ABC\). Jika \(AH=2\), \(BH=12\), dan \(CH=9\), tentukan luas segitiga \(ABC\).</p>
        </div>
      </details>
    </div>
    <p class="book-note">Sampel ditampilkan tanpa petunjuk dan solusi.</p>
  </section>

  <section class="book-section book-samples" id="bab-gratis">
    <span class="book-section-label">Baca sebelum memilih</span>
    <h2>Bab gratis</h2>
    <p class="book-lead">Isi formulir singkat untuk memperoleh akses ke dua bab gratis mulai 14 Agustus 2026. Sampel ini membantu pembaca mengenal gaya penulisan dan penyajian buku sebelum melakukan pemesanan.</p>
    <div class="book-sample-list">
      <div class="book-sample">
        <strong>Bab 1 - Sudut di Poligon</strong>
        Termasuk dalam akses gratis.
      </div>
      <div class="book-sample">
        <strong>Bab 6 - Aturan Sinus dan Aturan Cosinus</strong>
        Termasuk dalam akses gratis.
      </div>
    </div>
    <div class="book-form-action">
      {% if page.free_chapter_form_url and page.free_chapter_form_url != "" %}
        <a class="book-button" href="{{ page.free_chapter_form_url }}" target="_blank" rel="noopener noreferrer">Isi formulir dan dapatkan bab gratis</a>
      {% else %}
        <span class="book-button book-button--disabled" aria-disabled="true">Formulir segera tersedia</span>
      {% endif %}
    </div>
    <p class="book-note">Sampel bab dapat memiliki perbedaan kecil dengan edisi cetak final.</p>
    <p class="book-usage"><strong>Ketentuan penggunaan.</strong> Buku dapat digunakan sebagai bahan mengajar dan boleh diperbanyak, namun dilarang untuk diperjualbelikan.</p>
  </section>

  <section class="book-section book-order" id="pemesanan">
    <span class="book-section-label">Pemesanan telah dibuka</span>
    <h2>Alur Pemesanan Buku NEC</h2>
    <p class="book-lead">Ikuti langkah berikut untuk memesan <em>The Art of Olympiad Geometry</em>.</p>
    <div class="book-price-card">
      <div>
        <span class="book-price-label">Promo Kemerdekaan</span>
        <p class="book-price-promo">Rp200.000,00</p>
        <p class="book-price-normal">Harga normal <del>Rp250.000,00</del></p>
      </div>
      <p class="book-price-period">Berlaku untuk pemesanan <strong>17&ndash;31 Agustus 2026</strong>.</p>
    </div>
    <ol class="book-order-steps">
      <li>Lengkapi data pemesanan melalui <a href="{{ page.order_url }}" target="_blank" rel="noopener noreferrer">bit.ly/pesanbukuNEC</a>.</li>
      <li>Admin akan menghubungi Anda melalui WhatsApp untuk mengirimkan invoice (tagihan) dan detail rekening pembayaran.</li>
      <li>Lakukan pembayaran dan kirimkan bukti transfer kepada admin.</li>
      <li>Buku Anda akan diproses dan dikirim. Resi pengiriman akan diberikan maksimal H+2 setelah pembayaran.</li>
    </ol>
    <p class="book-order-contact"><strong>Informasi lebih lanjut:</strong> <a href="https://wa.me/6289682017731" target="_blank" rel="noopener noreferrer">Admin NEC - 089682017731 (Aulia)</a></p>
    <div class="book-actions">
      <a class="book-button" href="{{ page.order_url }}" target="_blank" rel="noopener noreferrer">Pesan buku melalui NEC</a>
    </div>
  </section>

  <section class="book-section" id="informasi-buku">
    <span class="book-section-label">Informasi penerbitan</span>
    <h2>Informasi buku</h2>
    <dl class="book-info">
      <div><dt>Judul</dt><dd>The Art of Olympiad Geometry</dd></div>
      <div><dt>Subjudul</dt><dd>Basic Level</dd></div>
      <div><dt>Penulis</dt><dd>Wildan Bagus Wicaksono</dd></div>
      <div><dt>Edisi</dt><dd>Pertama, 2026</dd></div>
      <div><dt>Penyunting akhir</dt><dd>Abdul Mu&rsquo;in, S.Pd., M.Si.</dd></div>
      <div><dt>Desain sampul</dt><dd>Hendra Ahmad Hardiyana, S.Pd.</dd></div>
      <div><dt>Bahasa</dt><dd>Indonesia</dd></div>
      <div><dt>Status</dt><dd>Siap cetak</dd></div>
    </dl>
  </section>

  <section class="book-section book-rating" id="penilaian">
    <span class="book-section-label">Penilaian pembaca</span>
    <h2>Sudah membaca bukunya? Yuk, berikan penilaianmu!</h2>
    <p class="book-lead">Penilaianmu membantu penulis mengembangkan buku ini dan membantu calon pembaca mengenal AOG.</p>
    <div class="book-rating-prompt" id="aog-rating-prompt">
      <div class="book-rating-stars" aria-label="Belum ada penilaian buku cetak">&#9734;&#9734;&#9734;&#9734;&#9734;</div>
    </div>
    <div class="book-rating-summary" id="aog-rating-summary" hidden>
      <div class="book-rating-average-stars" aria-hidden="true">
        <span>&#9733;&#9733;&#9733;&#9733;&#9733;</span>
        <span class="book-rating-average-fill" id="aog-rating-fill">&#9733;&#9733;&#9733;&#9733;&#9733;</span>
      </div>
      <p class="book-rating-score"><strong id="aog-rating-average">-</strong> dari 5</p>
      <p class="book-rating-count">Berdasarkan <span id="aog-rating-count">0</span> penilaian pembaca</p>
    </div>
    <div class="book-actions">
      {% if page.rating_form_url and page.rating_form_url != "" %}
        <a class="book-button" href="{{ page.rating_form_url }}" target="_blank" rel="noopener noreferrer">Berikan penilaian</a>
      {% else %}
        <span class="book-button book-button--disabled" aria-disabled="true">Formulir penilaian segera tersedia</span>
      {% endif %}
    </div>
  </section>

  {% if page.rating_api_url and page.rating_api_url != "" %}
  <script>
    (function () {
      "use strict";

      var summary = document.getElementById("aog-rating-summary");
      var prompt = document.getElementById("aog-rating-prompt");
      var fill = document.getElementById("aog-rating-fill");
      var averageText = document.getElementById("aog-rating-average");
      var countText = document.getElementById("aog-rating-count");
      var request = document.createElement("script");
      var apiUrl = {{ page.rating_api_url | jsonify }};

      window.aogRatingCallback = function (data) {
        var average = Number(data && data.average);
        var count = Number(data && data.count);

        if (!Number.isFinite(average) || !Number.isFinite(count) || count < 1) {
          return;
        }

        average = Math.max(0, Math.min(5, average));
        fill.style.width = ((average / 5) * 100) + "%";
        averageText.textContent = average.toLocaleString("id-ID", {
          minimumFractionDigits: 1,
          maximumFractionDigits: 1
        });
        countText.textContent = Math.round(count).toLocaleString("id-ID");
        summary.setAttribute("aria-label", "Rating " + averageText.textContent + " dari 5 berdasarkan " + countText.textContent + " penilaian pembaca");
        summary.hidden = false;
        prompt.hidden = true;
      };

      request.src = apiUrl + (apiUrl.indexOf("?") === -1 ? "?" : "&") + "prefix=aogRatingCallback&_=" + Date.now();
      request.async = true;
      document.head.appendChild(request);
    }());
  </script>
  {% endif %}

  <section class="book-section book-errata" id="errata">
    <span class="book-section-label">Koreksi pembaca</span>
    <h2>Koreksi dan Errata</h2>
    <p class="book-lead">Walaupun buku ini telah melalui proses pemeriksaan, kekeliruan mungkin masih ditemukan. Jika menemukan kesalahan ketik, diagram, pernyataan, petunjuk, atau solusi, pembaca dapat mengirimkan laporan ke <a href="https://mail.google.com/mail/?view=cm&amp;fs=1&amp;to=wildan.b.wicaksono%40gmail.com&amp;su=%5BERRATA%20AOG%5D%20Bab%20...%20-%20Halaman%20...&amp;body=Jenis%20koreksi%3A%0ABab%3A%0AHalaman%3A%0ATeks%20atau%20bagian%20yang%20perlu%20dikoreksi%3A%0AUsulan%20perbaikan%3A%0APenjelasan%3A" target="_blank" rel="noopener noreferrer">wildan.b.wicaksono@gmail.com</a>.</p>
    <div class="book-errata-format">
      <p><strong>Subjek email:</strong> <code>[ERRATA AOG] Bab ... - Halaman ...</code></p>
      <p><strong>Mohon sertakan:</strong></p>
      <ul>
        <li>Jenis koreksi</li>
        <li>Bab dan halaman</li>
        <li>Teks atau bagian yang perlu dikoreksi</li>
        <li>Usulan perbaikan</li>
        <li>Penjelasan atau tangkapan layar, jika diperlukan</li>
      </ul>
    </div>
    <div class="book-actions">
      <a class="book-button" href="https://mail.google.com/mail/?view=cm&amp;fs=1&amp;to=wildan.b.wicaksono%40gmail.com&amp;su=%5BERRATA%20AOG%5D%20Bab%20...%20-%20Halaman%20...&amp;body=Jenis%20koreksi%3A%0ABab%3A%0AHalaman%3A%0ATeks%20atau%20bagian%20yang%20perlu%20dikoreksi%3A%0AUsulan%20perbaikan%3A%0APenjelasan%3A" target="_blank" rel="noopener noreferrer">Laporkan koreksi melalui Gmail</a>
    </div>
    <p class="book-note">Setiap laporan akan diperiksa dan koreksi yang telah dikonfirmasi akan dicantumkan pada halaman ini.</p>
  </section>

  <section class="book-closing">
    <h2>Pemesanan AOG telah dibuka</h2>
    <p>Lengkapi formulir pemesanan melalui NEC. Admin akan menghubungi Anda melalui WhatsApp untuk proses pembayaran dan pengiriman.</p>
    <div class="book-actions">
      <a class="book-button" href="{{ page.order_url }}" target="_blank" rel="noopener noreferrer">Pesan buku sekarang</a>
    </div>
  </section>
</div>
