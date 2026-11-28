---
layout: archive
title: "Daftar Riwayat Hidup"
permalink: /id/cv/
lang: id
author_profile: true
share: false
comments: false
---

<link rel="stylesheet" href="{{ '/assets/css/cv.css' | relative_url }}">

<div class="cv-page">
  <header class="cv-hero">
    <span class="cv-eyebrow">Profil akademik</span>
    <h1>Daftar Riwayat Hidup</h1>
    <p>Lulusan matematika, pengajar olimpiade, dan penulis.</p>
  </header>

  <section class="cv-section" aria-labelledby="cv-education">
    <h2 id="cv-education">Pendidikan</h2>
    <div class="cv-entry-list">
      <article class="cv-entry">
        <div class="cv-entry-period">2026</div>
        <div class="cv-entry-content">
          <h3>Sarjana Matematika (S.Mat.)</h3>
          <p class="cv-entry-meta">Universitas Brawijaya · Malang, Indonesia</p>
        </div>
      </article>
    </div>
  </section>

  <section class="cv-section" aria-labelledby="cv-publications">
    <h2 id="cv-publications">Publikasi dan Buku</h2>
    <div class="cv-entry-list">
      {% assign cv_publications = site.publications | sort: "date" | reverse %}
      {% for post in cv_publications %}
        {% assign id_url = post.url | prepend: '/id' %}
        {% assign translation = site.pages | where: "url", id_url | first %}
        <article class="cv-entry">
          <div class="cv-entry-period">{{ post.date | date: "%Y" }}</div>
          <div class="cv-entry-content">
            <h3><a href="{{ translation.url | default: post.url | relative_url }}">{{ translation.title | default: post.title }}</a></h3>
            <p class="cv-entry-meta">
              {% if post.publication_type == "book" %}
                Buku{% if translation.edition %} · {{ translation.edition }}{% endif %}
              {% elsif post.publication_type == "thesis" %}
                Skripsi{% if post.venue %} · {{ post.venue }}{% endif %}
              {% elsif post.publication_status == "preprint" %}
                Prapublikasi
              {% else %}
                Publikasi
              {% endif %}
            </p>
            {% if translation.excerpt %}<p>{{ translation.excerpt | strip_html }}</p>{% endif %}
          </div>
        </article>
      {% endfor %}
    </div>
  </section>

  <section class="cv-section" aria-labelledby="cv-teaching">
    <h2 id="cv-teaching">Pengajaran dan Pelatihan</h2>
    <div class="cv-entry-list">
      <article class="cv-entry">
        <div class="cv-entry-period">2024–sekarang</div>
        <div class="cv-entry-content">
          <h3><a href="{{ '/id/teaching/IMO-2024-preparation' | relative_url }}">Pengajar geometri, Pelatnas International Mathematical Olympiad (IMO)</a></h3>
          <p>Mengajar geometri pada pemusatan latihan nasional (Pelatnas) IMO melalui sesi teori dan pembahasan soal untuk mempersiapkan peserta menghadapi kompetisi.</p>
        </div>
      </article>

      <article class="cv-entry">
        <div class="cv-entry-period">2022–sekarang</div>
        <div class="cv-entry-content">
          <h3><a href="{{ '/id/teaching/teach-at-school' | relative_url }}">Pengajar olimpiade matematika</a></h3>
          <p>Mengajar kelas olimpiade matematika bagi siswa di berbagai sekolah di Indonesia, baik secara daring maupun tatap muka.</p>
        </div>
      </article>

      <article class="cv-entry">
        <div class="cv-entry-period">2023–2024</div>
        <div class="cv-entry-content">
          <h3><a href="{{ '/id/teaching/assistant-peer-tutor' | relative_url }}">Asisten dosen dan tutor sebaya</a></h3>
          <p class="cv-entry-meta">Departemen Matematika, Universitas Brawijaya</p>
          <p>Mendampingi mahasiswa dalam sesi latihan soal dan diskusi untuk beberapa mata kuliah S1, termasuk Kalkulus dan Aljabar Abstrak.</p>
        </div>
      </article>

      <article class="cv-entry">
        <div class="cv-entry-period">2022</div>
        <div class="cv-entry-content">
          <h3><a href="{{ '/id/teaching/2022-teaching-1' | relative_url }}">Pemateri lokakarya olimpiade matematika</a></h3>
          <p class="cv-entry-meta">Yayasan Fatimah Az Zahra · Lampung, Indonesia</p>
          <p>Memperkenalkan matematika olimpiade kepada guru SMP dan SMA serta membahas topik pilihan dalam geometri, kombinatorika, aljabar, dan teori bilangan.</p>
        </div>
      </article>
    </div>
  </section>

  <section class="cv-section" aria-labelledby="cv-service">
    <h2 id="cv-service">Kepanitiaan dan Kepemimpinan</h2>
    <div class="cv-entry-list">
      <article class="cv-entry">
        <div class="cv-entry-period">2023–sekarang</div>
        <div class="cv-entry-content">
          <h3>General Manager</h3>
          <p class="cv-entry-meta"><a href="https://ktom-tomi.or.id/">Kontes Terbuka Olimpiade Matematika (KTOM)</a></p>
        </div>
      </article>

      <article class="cv-entry">
        <div class="cv-entry-period">2024–2025</div>
        <div class="cv-entry-content">
          <h3>Pengusul soal Olimpiade Sains Nasional</h3>
          <p class="cv-entry-meta">Pusat Prestasi Nasional · Jenjang SMA</p>
        </div>
      </article>

      <article class="cv-entry">
        <div class="cv-entry-period">2023–2025</div>
        <div class="cv-entry-content">
          <h3>Penulis, penyusun, dan penelaah soal</h3>
          <p class="cv-entry-meta">Pekan Matematika Nasional · Universitas Brawijaya</p>
        </div>
      </article>

      <article class="cv-entry">
        <div class="cv-entry-period">2023–2024</div>
        <div class="cv-entry-content">
          <h3>Asisten juri Olimpiade Sains Nasional</h3>
          <p class="cv-entry-meta">Pusat Prestasi Nasional · Jenjang SMA</p>
        </div>
      </article>

      <article class="cv-entry">
        <div class="cv-entry-period">2023</div>
        <div class="cv-entry-content">
          <h3>Penulis dan penyunting akhir buku KTOM-A</h3>
        </div>
      </article>

      <article class="cv-entry">
        <div class="cv-entry-period">2021–2023</div>
        <div class="cv-entry-content">
          <h3>Penulis soal kompetisi matematika</h3>
          <p class="cv-entry-meta">KTOM dan MaQC, SMA Negeri Unggulan MH Thamrin Jakarta</p>
        </div>
      </article>
    </div>
  </section>

  <section class="cv-section" aria-labelledby="cv-awards">
    <h2 id="cv-awards">Prestasi dan Penghargaan Pilihan</h2>
    <div class="cv-award-grid">
      <div class="cv-award">
        <time datetime="2024">2024</time>
        <div>
          <strong>Medali emas kategori individu</strong>
          <span>Mathematical Analysis and Geometry Day XV, Institut Teknologi Bandung</span>
        </div>
      </div>

      <div class="cv-award">
        <time datetime="2023">2023</time>
        <div>
          <strong>Medali emas</strong>
          <span>Olimpiade Nasional Matematika dan Ilmu Pengetahuan Alam (ONMIPA)</span>
        </div>
      </div>

      <div class="cv-award">
        <time datetime="2023">2023</time>
        <div>
          <strong>Juara 2</strong>
          <span>Mathematics ITS Calculus Competition 7.0, Institut Teknologi Sepuluh Nopember</span>
        </div>
      </div>

      <div class="cv-award">
        <time datetime="2023">2023</time>
        <div>
          <strong>Medali perak</strong>
          <span>Mathematical Analysis and Geometry Day XIV, Institut Teknologi Bandung</span>
        </div>
      </div>

      <div class="cv-award">
        <time datetime="2022">2022</time>
        <div>
          <strong>Penerima Beasiswa Indonesia Maju</strong>
          <span>Angkatan pertama</span>
        </div>
      </div>

      <div class="cv-award">
        <time datetime="2022">2022</time>
        <div>
          <strong>Juara 3</strong>
          <span>Sanata Dharma Calculus League, Universitas Sanata Dharma</span>
        </div>
      </div>

      <div class="cv-award">
        <time datetime="2021">2021</time>
        <div>
          <strong>Finalis</strong>
          <span>Olimpiade Sains Nasional jenjang SMA</span>
        </div>
      </div>
    </div>

    <details class="cv-additional-awards">
      <summary>Lihat penghargaan lainnya</summary>
      <ul>
        <li><strong>2022:</strong> Juara 3, World Mathematics Tournament.</li>
        <li><strong>2021:</strong> Juara 1, OPTIKA 21.</li>
        <li><strong>2021:</strong> Juara 2 kategori beregu dan individu, Kompetisi Matematika Vektor Nasional.</li>
        <li><strong>2021:</strong> Juara 1, Kompetisi Matematika Detik MSC 25.</li>
        <li><strong>2021:</strong> Juara 1, Lomba dan Seminar Nasional Pendidikan Matematika.</li>
        <li><strong>2021:</strong> Medali perak, International Eduversal Mathematical Olympiad.</li>
        <li><strong>2021:</strong> Juara 3, STEI Mathematics, Physics, and Informatics Competition.</li>
      </ul>
    </details>
  </section>
</div>
