---
permalink: /
title: "Home"
author_profile: true
share: false
comments: false
redirect_from:
  - /about/
  - /about.html
---

<link rel="stylesheet" href="{{ '/assets/css/homepage.css' | relative_url }}">

<div class="home-page">
  <section class="home-hero" aria-labelledby="home-heading">
    <span class="home-eyebrow">Mathematics · Olympiad Education</span>
    <h1 id="home-heading">Wildan Bagus Wicaksono</h1>
    <p class="home-role">Mathematics undergraduate, olympiad coach, and author.</p>
    <p class="home-intro">My interests lie in number theory, Euclidean geometry, and mathematical olympiad education. I am currently completing my undergraduate thesis at Universitas Brawijaya, coaching olympiad students, and developing mathematical learning resources.</p>
    <div class="home-actions" aria-label="Explore this website">
      <a class="home-button" href="{{ '/publications/' | relative_url }}">View publications</a>
      <a class="home-button home-button--secondary" href="{{ '/teaching/' | relative_url }}">Teaching &amp; coaching</a>
      <a class="home-button home-button--secondary" href="{{ '/projects/' | relative_url }}">Explore projects</a>
    </div>
  </section>

  <section class="home-section" aria-labelledby="selected-work-heading">
    <div class="home-section-heading">
      <span class="home-section-label">Selected work</span>
      <h2 id="selected-work-heading">Mathematics, writing, and education</h2>
      <p>A selection of the work that best represents what I am currently building and contributing to.</p>
    </div>

    <article class="home-book-card">
      <div class="home-book-visual">
        <img src="{{ '/images/the-art-of-olympiad-geometry-cover.png' | relative_url }}" alt="Cover of The Art of Olympiad Geometry by Wildan Bagus Wicaksono">
      </div>
      <div class="home-book-copy">
        <span class="home-card-label">Book · 2026</span>
        <h3>The Art of Olympiad Geometry</h3>
        <p>An Indonesian-language book that develops olympiad geometry from foundational ideas to advanced Euclidean techniques. It is written for students who want to understand the reasoning behind a solution, not only its final steps.</p>
        <a class="home-text-link" href="{{ '/portfolio/the-art-of-olympiad-geometry/' | relative_url }}">Explore the book <span aria-hidden="true">→</span></a>
      </div>
    </article>

    <div class="home-work-grid">
      <article class="home-card">
        <span class="home-card-label">Teaching</span>
        <h3>Olympiad coaching</h3>
        <p>I teach olympiad mathematics across different school levels and have contributed to Indonesia's national International Mathematical Olympiad training program.</p>
        <a class="home-text-link" href="{{ '/teaching/' | relative_url }}">View teaching experience <span aria-hidden="true">→</span></a>
      </article>

      <article class="home-card">
        <span class="home-card-label">Resources</span>
        <h3>Problems and collections</h3>
        <p>Contest collections, past examinations, handouts, and reading materials created or curated for olympiad students and instructors.</p>
        <a class="home-text-link" href="{{ '/projects/' | relative_url }}">Browse the resources <span aria-hidden="true">→</span></a>
      </article>
    </div>
  </section>

  <section class="home-section" aria-labelledby="focus-heading">
    <div class="home-section-heading">
      <span class="home-section-label">Current focus</span>
      <h2 id="focus-heading">What I am working on</h2>
    </div>

    <div class="home-focus-grid">
      <article class="home-focus-card">
        <span class="home-focus-number">01</span>
        <h3>Set-valued analysis</h3>
        <p>My undergraduate research compares algebraic and metric approaches to differentiability for set-valued functions.</p>
      </article>

      <article class="home-focus-card">
        <span class="home-focus-number">02</span>
        <h3>Algebraic counting</h3>
        <p>I also study counting problems for integer matrices, including matrices in centralizers and their asymptotic behaviour.</p>
      </article>

      <article class="home-focus-card">
        <span class="home-focus-number">03</span>
        <h3>Olympiad geometry</h3>
        <p>I continue to explore Euclidean methods, write problems, and develop materials for mathematical olympiad training.</p>
      </article>
    </div>
  </section>

  <section class="home-section" aria-labelledby="highlights-heading">
    <div class="home-section-heading">
      <span class="home-section-label">Selected highlights</span>
      <h2 id="highlights-heading">A few milestones</h2>
    </div>

    <div class="home-highlights">
      <div class="home-highlight">
        <strong>Gold Medalist</strong>
        <span>ONMIPA-PT · 2023</span>
      </div>
      <div class="home-highlight">
        <strong>IMO Training Instructor</strong>
        <span>National program · 2024–2026</span>
      </div>
      <div class="home-highlight">
        <strong>Problem Writer</strong>
        <span>OSN and PEMNAS · 2023–2025</span>
      </div>
    </div>
  </section>

  <section class="home-story" aria-labelledby="story-heading">
    <div class="home-story-copy">
      <span class="home-section-label">A personal note</span>
      <h2 id="story-heading">Why geometry?</h2>
      <p>Geometry was the first area of mathematics that genuinely fascinated me. I discovered olympiad geometry in junior high school, and its combination of visual intuition, elegant transformations, and surprising structure has stayed with me ever since.</p>
      <p>What began as curiosity eventually grew into years of learning, teaching, problem writing, and writing <em>The Art of Olympiad Geometry</em>.</p>
    </div>
    <figure class="home-story-figure">
      <img src="{{ '/images/IMG_2165.JPG' | relative_url }}" alt="Participants and organizers at OSN 2023 in Bogor" loading="lazy">
      <figcaption>OSN 2023 · Bogor, Indonesia</figcaption>
    </figure>
  </section>

  <section class="home-closing" aria-labelledby="contact-heading">
    <span class="home-eyebrow">Get in touch</span>
    <h2 id="contact-heading">Let's talk mathematics.</h2>
    <p>I am always happy to discuss mathematics, olympiad education, teaching opportunities, or possible collaborations.</p>
    <div class="home-actions home-actions--centered">
      <a class="home-button" href="mailto:wildan.b.wicaksono@gmail.com">Email me</a>
      <a class="home-button home-button--secondary" href="{{ '/cv/' | relative_url }}">View my CV</a>
    </div>
  </section>
</div>
