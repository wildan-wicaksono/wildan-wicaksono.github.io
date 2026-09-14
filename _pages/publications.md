---
layout: archive
title: "Publications"
permalink: /publications/
author_profile: true
---

{% if site.author.googlescholar %}
  <div class="wordwrap">You can also find my articles on <a href="{{site.author.googlescholar}}">my Google Scholar profile</a>.</div>
{% endif %}

{% include base_path %}

<p>This page brings together my undergraduate thesis, books, and research publications. Research papers will be added as they become available.</p>

{% assign publications_by_date = site.publications | sort: "date" | reverse %}
{% assign theses = publications_by_date | where: "publication_type", "thesis" %}
{% assign books = publications_by_date | where: "publication_type", "book" %}
{% assign papers = publications_by_date | where: "publication_type", "paper" %}

{% if theses.size > 0 %}
  <h2>Undergraduate thesis</h2>
  {% for post in theses %}
    {% include archive-single.html %}
  {% endfor %}
{% endif %}

{% if books.size > 0 %}
  <h2>Books</h2>
  {% for post in books %}
    {% include archive-single.html %}
  {% endfor %}
{% endif %}

{% if papers.size > 0 %}
  <h2>Research papers</h2>
  {% for post in papers %}
    {% include archive-single.html %}
  {% endfor %}
{% endif %}
