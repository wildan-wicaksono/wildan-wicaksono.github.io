---
layout: single
title: "Studio TikZ"
permalink: /tools/studio-tikz/en/project.html
comments: true
---

{% include studio-tikz-language.html language="en" id="/portfolio/studio-tikz/" en="/tools/studio-tikz/en/project.html" %}

<p><a class="btn btn--primary" href="../index.html?lang=en">Open Studio TikZ</a> <a class="btn" href="#contoh-studio-tikz">Examples and LaTeX code</a> <a class="btn" href="../index.html" download="Studio-TikZ.html">Download the offline editor</a></p>

By **Wildan Bagus Wicaksono** · [Homepage](https://wildan-wicaksono.github.io/)

When I prepare an olympiad handout, I usually move points around in GeoGebra until the diagram reads well, take the coordinates and type the TikZ by hand. GeoGebra provides its own TikZ export. I kept rewriting it because I have my own conventions for naming points, placing labels, colouring circles and marking angles.

I made **Studio TikZ** to see a construction alongside the code that goes into my handout. Draw a segment $AB$, select it and watch the corresponding line of code. Change the line to dashed and compare the two versions. I hope these small experiments make my TikZ style easier to learn.

Choose the side-by-side layout to inspect the code while drawing, or stack the panels for a wider canvas. The browser remembers the layout and your Indonesian or English language preference. Focus the canvas before pressing **+** or **−** to zoom. The canvas zoom percentage and the printed TikZ scale can be adjusted independently.

{% include studio-tikz-contoh.html language="en" %}

## Construction and presentation

To bisect $AB$ perpendicularly, select **Perpendicular bisector**, then click the segment or its two endpoints. Drag $A$ and check that the line still passes through the midpoint. For an inversion, select the source point, line or circle and then click the reference circle. Reflection follows a similar sequence. Select the source object and then the mirror point or line. The diagrams and step-by-step examples in the [tool guide](guide.html) cover these and the other constructions.

In a crowded diagram, select a point label, angle label or free label and switch on its translucent background. Lower the background opacity if a nearby line needs to remain prominent. A right-angle mark has its own size control. Select several objects using **Ctrl+click** (or **⌘+click**) to change their colour or hide them together. Name and save the group to select the same objects again later. The same palette is available for outlines and fills.

## Try a construction

In triangle $ABC$, place $D$ on $AB$ so that $AD=2\cdot DB$. Use the vector formula tool and enter `D = (A + 2B)/3`. Drag $B$ and observe how both the diagram and the coordinates change. The relevant line in the TikZ export is

```latex
\coordinate[label={[text=PineGreen]below:$D$}] (D) at (${1/3}*(A) + {2/3}*(B)$);
```

<details><summary>Play the construction animation</summary><img src="/assets/studio-tikz-demo.gif" alt="Drawing triangle ABC and defining D using a vector formula." width="800" loading="lazy"></details>

<iframe src="../contoh-vektor.html?lang=en" title="Interactive division of segment AB" loading="lazy" width="800" height="365" style="display:block;width:100%;height:365px;border:0"></iframe>

Drag $A$, $B$ or $C$ above. The point $D$ stays two-thirds of the way from $A$ to $B$. Open the [antiparallel-line animation](../index.html?lang=en#panduan/antiTriangle) for another example, then drag $D$ or segment $DE$ in the interactive construction.

<iframe src="../latihan-antiparalel.html?lang=en" title="Interactive antiparallel line in a triangle" loading="lazy" width="800" height="465" style="display:block;width:100%;height:465px;border:0"></iframe>

## Taking the diagram to LaTeX or AoPS

Copy the preamble from the code panel before pasting the figure into your document. Load `xcolor` with its `dvipsnames` option before TikZ. Studio adds the TikZ libraries used by the current figure, such as `angles` and `calc`. The examples above include the code for inspection.

For an AoPS source diagram, [open the Asymptote converter](../index.html?lang=en#asymptote), paste the `[asy]` block and inspect the preview before copying the TikZ. The projection-and-reflection example demonstrates how the converter handles a common olympiad construction. In the other direction, the AoPS export wraps a TikZ picture in an Asymptote label. You can still change the geometry or labels by editing the TikZ in that block.

## Strengths and limits

- Dependencies follow the original points. For example, changing a triangle updates its incircle, tangent lines and inverse images.
- The complete HTML runs offline. Save each construction in its own `.stikz.json` file to keep a collection or move it between computers. The browser remembers one current sheet.
- The editor focuses on olympiad geometry. General graphs and conics such as $y=x^2$ are outside its drawing tools.
- GeoGebra imports use stored coordinates for some points. The Asymptote converter handles a subset of two-dimensional diagrams. Inspect both results before printing.
- To update the offline copy, download the new editor and open your saved project in it.

[Read the user guide](guide.html) · [Follow the three worked diagrams](examples.html)
