---
layout: archive
title: "Curriculum Vitae"
permalink: /cv/
author_profile: true
redirect_from:
  - /resume
share: false
comments: false
---

<link rel="stylesheet" href="{{ '/assets/css/cv.css' | relative_url }}">

<div class="cv-page">
  <header class="cv-hero">
    <span class="cv-eyebrow">Academic profile</span>
    <h1>Curriculum Vitae</h1>
    <p>Mathematics undergraduate, olympiad coach, and author.</p>
  </header>

  <section class="cv-section" aria-labelledby="cv-education">
    <h2 id="cv-education">Education</h2>
    <div class="cv-entry-list">
      <article class="cv-entry">
        <div class="cv-entry-period">Expected 2026</div>
        <div class="cv-entry-content">
          <h3>Bachelor of Science in Mathematics (S.Si.)</h3>
          <p class="cv-entry-meta">Universitas Brawijaya · Malang, Indonesia</p>
        </div>
      </article>
    </div>
  </section>

  <section class="cv-section" aria-labelledby="cv-publications">
    <h2 id="cv-publications">Publications &amp; Books</h2>
    <div class="cv-entry-list">
      {% assign cv_publications = site.publications | sort: "date" | reverse %}
      {% for post in cv_publications %}
        <article class="cv-entry">
          <div class="cv-entry-period">{{ post.date | date: "%Y" }}</div>
          <div class="cv-entry-content">
            <h3><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h3>
            <p class="cv-entry-meta">
              {% if post.publication_type == "book" %}
                Book{% if post.edition %} · {{ post.edition }}{% endif %}
              {% elsif post.publication_type == "thesis" %}
                Undergraduate thesis{% if post.venue %} · {{ post.venue }}{% endif %}
              {% else %}
                {{ post.type | default: "Publication" }}
              {% endif %}
            </p>
            {% if post.excerpt %}<p>{{ post.excerpt | strip_html }}</p>{% endif %}
          </div>
        </article>
      {% endfor %}
    </div>
  </section>

  <section class="cv-section" aria-labelledby="cv-teaching">
    <h2 id="cv-teaching">Teaching &amp; Coaching</h2>
    <div class="cv-entry-list">
      <article class="cv-entry">
        <div class="cv-entry-period">2024–present</div>
        <div class="cv-entry-content">
          <h3><a href="{{ '/teaching/IMO-2024-preparation' | relative_url }}">Geometry Instructor, Indonesian National Training Program for the International Mathematical Olympiad</a></h3>
          <p>Teach olympiad geometry in the national training program through theory sessions, guided problem solving, and competition preparation.</p>
        </div>
      </article>

      <article class="cv-entry">
        <div class="cv-entry-period">2022–present</div>
        <div class="cv-entry-content">
          <h3><a href="{{ '/teaching/teach-at-school' | relative_url }}">Mathematical Olympiad Instructor</a></h3>
          <p>Teach mathematics olympiad programs for students at schools across Indonesia, both online and on site.</p>
        </div>
      </article>

      <article class="cv-entry">
        <div class="cv-entry-period">2023–2024</div>
        <div class="cv-entry-content">
          <h3><a href="{{ '/teaching/assistant-peer-tutor' | relative_url }}">Lecturer’s Assistant and Peer Tutor</a></h3>
          <p class="cv-entry-meta">Department of Mathematics, Universitas Brawijaya</p>
          <p>Supported undergraduate courses including Calculus and Abstract Algebra through supplementary problem-solving sessions and guided discussions.</p>
        </div>
      </article>

      <article class="cv-entry">
        <div class="cv-entry-period">2022</div>
        <div class="cv-entry-content">
          <h3><a href="{{ '/teaching/2022-teaching-1' | relative_url }}">Mathematical Olympiad Workshop Instructor</a></h3>
          <p class="cv-entry-meta">Yayasan Fatimah Az Zahra · Lampung, Indonesia</p>
          <p>Introduced olympiad mathematics and taught selected geometry, combinatorics, algebra, and number theory topics to junior- and senior-high-school teachers.</p>
        </div>
      </article>
    </div>
  </section>

  <section class="cv-section" aria-labelledby="cv-service">
    <h2 id="cv-service">Service &amp; Leadership</h2>
    <div class="cv-entry-list">
      <article class="cv-entry">
        <div class="cv-entry-period">2023–present</div>
        <div class="cv-entry-content">
          <h3>General Manager</h3>
          <p class="cv-entry-meta"><a href="https://ktom-tomi.or.id/">Kontes Terbuka Olimpiade Matematika (KTOM)</a></p>
        </div>
      </article>

      <article class="cv-entry">
        <div class="cv-entry-period">2024–2025</div>
        <div class="cv-entry-content">
          <h3>Problem Proposer, Olimpiade Sains Nasional</h3>
          <p class="cv-entry-meta">Pusat Prestasi Nasional · Senior high school level</p>
        </div>
      </article>

      <article class="cv-entry">
        <div class="cv-entry-period">2023–2025</div>
        <div class="cv-entry-content">
          <h3>Problem Writer, Setter, and Quality-Control Reviewer</h3>
          <p class="cv-entry-meta">Pekan Matematika Nasional · Universitas Brawijaya</p>
        </div>
      </article>

      <article class="cv-entry">
        <div class="cv-entry-period">2023–2024</div>
        <div class="cv-entry-content">
          <h3>Jury Assistant, Olimpiade Sains Nasional</h3>
          <p class="cv-entry-meta">Pusat Prestasi Nasional · Senior high school level</p>
        </div>
      </article>

      <article class="cv-entry">
        <div class="cv-entry-period">2023</div>
        <div class="cv-entry-content">
          <h3>Author and Final Editor, KTOM-A Book</h3>
        </div>
      </article>

      <article class="cv-entry">
        <div class="cv-entry-period">2021–2023</div>
        <div class="cv-entry-content">
          <h3>Mathematics Competition Problem Writer</h3>
          <p class="cv-entry-meta">KTOM and MaQC, SMA Negeri Unggulan MH Thamrin Jakarta</p>
        </div>
      </article>
    </div>
  </section>

  <section class="cv-section" aria-labelledby="cv-awards">
    <h2 id="cv-awards">Selected Honors &amp; Awards</h2>
    <div class="cv-award-grid">
      <div class="cv-award">
        <time datetime="2024">2024</time>
        <div>
          <strong>Gold Medal, Individual Category</strong>
          <span>Mathematical Analysis and Geometry Day XV, Institut Teknologi Bandung</span>
        </div>
      </div>

      <div class="cv-award">
        <time datetime="2023">2023</time>
        <div>
          <strong>Gold Medal</strong>
          <span>Olimpiade Nasional Matematika dan Ilmu Pengetahuan Alam (ONMIPA)</span>
        </div>
      </div>

      <div class="cv-award">
        <time datetime="2023">2023</time>
        <div>
          <strong>Second Place</strong>
          <span>Mathematics ITS Calculus Competition 7.0, Institut Teknologi Sepuluh Nopember</span>
        </div>
      </div>

      <div class="cv-award">
        <time datetime="2023">2023</time>
        <div>
          <strong>Silver Medal</strong>
          <span>Mathematical Analysis and Geometry Day XIV, Institut Teknologi Bandung</span>
        </div>
      </div>

      <div class="cv-award">
        <time datetime="2022">2022</time>
        <div>
          <strong>Beasiswa Indonesia Maju Awardee</strong>
          <span>Batch 1</span>
        </div>
      </div>

      <div class="cv-award">
        <time datetime="2022">2022</time>
        <div>
          <strong>Third Place</strong>
          <span>Sanata Dharma Calculus League, Universitas Sanata Dharma</span>
        </div>
      </div>

      <div class="cv-award">
        <time datetime="2021">2021</time>
        <div>
          <strong>Finalist</strong>
          <span>Olimpiade Sains Nasional, senior high school level</span>
        </div>
      </div>
    </div>

    <details class="cv-additional-awards">
      <summary>View additional earlier awards</summary>
      <ul>
        <li><strong>2022:</strong> Third Place, World Mathematics Tournament.</li>
        <li><strong>2021:</strong> First Place, OPTIKA 21.</li>
        <li><strong>2021:</strong> Second Place (team) and Second Place (individual), Kompetisi Matematika Vektor Nasional.</li>
        <li><strong>2021:</strong> First Place, Kompetisi Matematika Detik MSC 25.</li>
        <li><strong>2021:</strong> First Place, Lomba dan Seminar Nasional Pendidikan Matematika.</li>
        <li><strong>2021:</strong> Silver Medal, International Eduversal Mathematical Olympiad.</li>
        <li><strong>2021:</strong> Third Place, STEI Mathematics, Physics, and Informatics Competition.</li>
      </ul>
    </details>
  </section>
</div>
