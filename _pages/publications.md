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

<p>This page brings together my books and research publications. It currently contains my olympiad geometry book; research papers will be added as they become available.</p>

{% assign publications_by_date = site.publications | sort: "date" | reverse %}
{% assign books = publications_by_date | where: "publication_type", "book" %}
{% assign papers = publications_by_date | where: "publication_type", "paper" %}

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
