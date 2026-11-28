---
layout: archive
title: "Publikasi"
permalink: /id/publications/
lang: id
author_profile: true
---

{% if site.author.googlescholar %}
  <div class="wordwrap">Artikel saya juga dapat ditemukan di <a href="{{ site.author.googlescholar }}">profil Google Scholar saya</a>.</div>
{% endif %}

<p>Di sini saya menghimpun skripsi, buku, dan makalah penelitian saya, termasuk prapublikasi.</p>

{% assign publications_by_date = site.publications | sort: "date" | reverse %}
{% assign types = "thesis,book,paper" | split: "," %}
{% for type in types %}
  {% assign entries = publications_by_date | where: "publication_type", type %}
  {% if entries.size > 0 %}
    {% case type %}
      {% when "thesis" %}<h2>Skripsi</h2>
      {% when "book" %}<h2>Buku</h2>
      {% when "paper" %}<h2>Makalah penelitian</h2>
    {% endcase %}
    {% for original in entries %}
      {% assign translated_url = original.url | prepend: "/id" %}
      {% assign post = site.pages | where: "url", translated_url | first | default: original %}
      {% include archive-single.html %}
    {% endfor %}
  {% endif %}
{% endfor %}
