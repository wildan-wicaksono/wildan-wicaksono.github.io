---
title: "Mathematics Exams at Universitas Brawijaya"
date: 2024-07-05
excerpt: "A categorized archive of midterm and final mathematics examinations from Universitas Brawijaya."
collection: portfolio
author_profile: true
share: false
comments: false
---

<link rel="stylesheet" href="/assets/css/resource-pages.css">

{% assign exam_groups = site.data.exam_ub %}

<div class="resource-page">
  <section class="rp-hero">
    <span class="rp-eyebrow">Past examination archive</span>
    <h1>Mathematics Exams at Universitas Brawijaya</h1>
    <p class="rp-hero-copy">A categorized collection of midterm and final examinations from mathematics courses at Universitas Brawijaya.</p>
    <div class="rp-stats" aria-label="Collection summary">
      <span>61 PDF files</span>
      <span>26 courses</span>
      <span>2017–2025</span>
      <span>Bahasa Indonesia</span>
    </div>
    <nav class="rp-jumps" aria-label="Jump to a subject area">
      {% for group in exam_groups %}
        <a href="#{{ group.id }}">{{ group.title }}</a>
      {% endfor %}
    </nav>
  </section>

  <aside class="rp-notice">
    <strong>PDF</strong>
    <div>All examination files are provided in Bahasa Indonesia and open in a new tab. If a file does not open correctly on mobile, try another browser or use a laptop or desktop computer.</div>
  </aside>

  {% for group in exam_groups %}
    <section class="rp-section" id="{{ group.id }}">
      <div class="rp-section-head">
        <div>
          <span class="rp-section-kicker">{{ group.kicker }}</span>
          <h2>{{ group.title }}</h2>
          <p>{{ group.description }}</p>
        </div>
        <span class="rp-count">{{ group.count }} files</span>
      </div>

      <div class="rp-grid">
        {% for course in group.courses %}
          <article class="rp-card">
            <div class="rp-card-top">
              <div>
                <h3>{{ course.title }}</h3>
                <p class="rp-card-subtitle">{{ course.subtitle }}</p>
              </div>
              <span class="rp-badge">{{ course.count }} PDF{% if course.count != 1 %}s{% endif %}</span>
            </div>

            {% for exam in course.exams %}
              <div class="rp-row">
                <span class="rp-row-label">{{ exam.type }}</span>
                <div class="rp-files">
                  {% for file in exam.files %}
                    <a class="rp-file" href="{{ file.path | relative_url }}" target="_blank" rel="noopener noreferrer">{{ file.year }}</a>
                  {% endfor %}
                </div>
              </div>
            {% endfor %}
          </article>
        {% endfor %}
      </div>
    </section>
  {% endfor %}
</div>
