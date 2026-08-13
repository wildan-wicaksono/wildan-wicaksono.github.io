---
title: "The Art of Olympiad Geometry"
excerpt: "Buku geometri olimpiade berbahasa Indonesia yang disusun bertahap dari konsep dasar menuju pemecahan masalah."
collection: portfolio
permalink: /portfolio/the-art-of-olympiad-geometry/
# Tautan formulir untuk akses Bab 1 dan Bab 6.
free_chapter_form_url: "https://forms.gle/VKCMBHfYQ3FP1FhC8"
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

  @media (max-width: 760px) {
    .book-hero { grid-template-columns: 1fr; }
    .book-cover { max-width: 250px; }
    .book-stats { grid-template-columns: repeat(2, minmax(0, 1fr)); }
    .book-grid { grid-template-columns: 1fr; }
    .book-chapter-list { grid-template-columns: 1fr; }
    .book-features { grid-template-columns: 1fr; }
    .book-sample-list { grid-template-columns: 1fr; }
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
        <span class="book-badge">Siap cetak</span>
        <span class="book-badge">Edisi pertama, 2026</span>
        <span class="book-badge">Bahasa Indonesia</span>
      </div>
      <div class="book-actions">
        <a class="book-button" href="#cakupan-materi">Lihat cakupan materi</a>
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

  <section class="book-section book-samples" id="bab-gratis">
    <span class="book-section-label">Baca sebelum memilih</span>
    <h2>Bab gratis</h2>
    <p class="book-lead">Isi formulir singkat untuk memperoleh akses ke dua bab gratis mulai 14 Agustus 2026. Sampel ini membantu pembaca mengenal gaya penulisan dan penyajian buku sebelum masa pre-order dibuka.</p>
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
    <p class="book-form-note">Setelah formulir dikirim, tautan akses bab gratis akan ditampilkan. Data yang diberikan membantu kami mengenal profil pembaca. Persetujuan untuk menerima kabar buku atau informasi promosi bersifat opsional.</p>
    <p class="book-note">Sampel bab dapat memiliki perbedaan kecil dengan edisi cetak final.</p>
    <p class="book-usage"><strong>Ketentuan penggunaan.</strong> Buku dapat digunakan sebagai bahan mengajar dan boleh diperbanyak, namun dilarang untuk diperjualbelikan.</p>
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

  <section class="book-section book-errata" id="errata">
    <span class="book-section-label">Koreksi pembaca</span>
    <h2>Koreksi dan Errata</h2>
    <p class="book-lead">Walaupun buku ini telah melalui proses pemeriksaan, kekeliruan mungkin masih ditemukan. Jika menemukan kesalahan ketik, diagram, pernyataan, petunjuk, atau solusi, pembaca dapat mengirimkan laporan ke <a href="https://mail.google.com/mail/?view=cm&amp;fs=1&amp;to=wildan.b.wicaksono%40gmail.com&amp;su=%5BERRATA%20TAOG%5D%20Bab%20...%20-%20Halaman%20...&amp;body=Jenis%20koreksi%3A%0ABab%3A%0AHalaman%3A%0ATeks%20atau%20bagian%20yang%20perlu%20dikoreksi%3A%0AUsulan%20perbaikan%3A%0APenjelasan%3A" target="_blank" rel="noopener noreferrer">wildan.b.wicaksono@gmail.com</a>.</p>
    <div class="book-errata-format">
      <p><strong>Subjek email:</strong> <code>[ERRATA TAOG] Bab ... - Halaman ...</code></p>
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
      <a class="book-button" href="https://mail.google.com/mail/?view=cm&amp;fs=1&amp;to=wildan.b.wicaksono%40gmail.com&amp;su=%5BERRATA%20TAOG%5D%20Bab%20...%20-%20Halaman%20...&amp;body=Jenis%20koreksi%3A%0ABab%3A%0AHalaman%3A%0ATeks%20atau%20bagian%20yang%20perlu%20dikoreksi%3A%0AUsulan%20perbaikan%3A%0APenjelasan%3A" target="_blank" rel="noopener noreferrer">Laporkan koreksi melalui Gmail</a>
    </div>
    <p class="book-note">Setiap laporan akan diperiksa dan koreksi yang telah dikonfirmasi akan dicantumkan pada halaman ini.</p>
  </section>

  <section class="book-closing">
    <h2>Pre-order dibuka 17 Agustus 2026</h2>
    <p>Buku telah siap cetak. Informasi pemesanan akan ditambahkan di halaman ini saat masa pre-order dibuka.</p>
  </section>
</div>
