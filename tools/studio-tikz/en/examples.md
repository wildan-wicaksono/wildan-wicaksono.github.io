---
layout: single
title: "Three worked Studio TikZ diagrams"
permalink: /tools/studio-tikz/en/examples.html
comments: false
---

{% include studio-tikz-language.html language="en" id="/tools/studio-tikz/contoh-penggunaan.html" en="/tools/studio-tikz/en/examples.html" %}

By **Wildan Bagus Wicaksono** · [Homepage](https://wildan-wicaksono.github.io/)

Read each problem alongside its figure and TikZ. Use the links below the illustrations to drag the original points in Studio. The construction steps follow the gallery.

{% include studio-tikz-contoh.html language="en" %}

## Construct the reflection diagram

1. Create two free points $A$ and $B$. Make a counterclockwise $56^\circ$ arc centred at $B$, starting at $A$. Attach $T$ to the other endpoint and $M$ to the interior of the arc.
2. Mark the midpoint $H$ of $MT$. Draw $BH$ and $AM$, and call their intersection $C$. Construct triangle $ABC$. Since $BM=BT$, line $BC$ is the perpendicular bisector of $MT$.
3. Choose **Reflection**, click $M$, then click line $BC$ to obtain $N$, coincident with $T$. Intersect $AN$ with $BC$ at $O$. Draw a solid `PineGreen` circle through $A,B,M$ and a dotted `MidnightBlue` circle through $A,B,C$.
4. Add $BM,BN,CN$, a dashed `BrickRed` segment $MN$, and a heavier segment $MO$. Mark $\angle ABN$ with an automatic measure and $\angle CMN$ with a red arc. Hide the auxiliary arc, lines, $T$ and $H$. Drag $M$ along its arc and check that the measure at $B$ stays at $56^\circ$.

<p><a href="../contoh-penggunaan/01-refleksi.stikz.json" download="01-refleksi.stikz.json">Download the editable project</a> · <a href="../contoh-penggunaan/01-refleksi.tex" download="01-refleksi.tex">Download the TikZ</a></p>

## Construct the three circles on the medians

1. Draw $ABC$ and the midpoints $D,E,F$ of $BC,CA,AB$. Draw medians $AD,BE,CF$. Intersect the first two to obtain $G$.
2. Mark the midpoints $D_1,E_1,F_1$ of $AG,BG,CG$. Draw the three-point circles through $(D_1,E,F)$, $(D,E_1,F)$ and $(D,E,F_1)$.
3. The first two circles meet at $F$ and $H$. In the downloadable construction, $H$ is the reflection of $F$ across the line of their centres. This keeps the intended intersection as the triangle changes. Hide the centres and the mirror line.
4. Add $DE,EH,HD,D_1H,HF$. Move the labels a little where several lines cross. Try the translucent label background if space is tight. Drag $C$ and observe $H$ on the third circle.

<p><a href="../contoh-penggunaan/02-garis-berat.stikz.json" download="02-garis-berat.stikz.json">Download the editable project</a> · <a href="../contoh-penggunaan/02-garis-berat.tex" download="02-garis-berat.tex">Download the TikZ</a></p>

## Construct the tangent and the medians

1. Fill $ABC$ with `MidnightBlue` at 14% opacity, then draw its blue circumcircle. Construct the midpoints $D$ of $BC$ and $E$ of $CA$. Draw the full lines $AD$ and $BE$.
2. Construct the tangent $\ell$ at $C$. Intersect it with $AD$, $BE$ and $DE$ to obtain $A_1$, $B_1$ and $T$. Use a `BrickRed` segment from $B_1$ to $T$ to show the tangent.
3. Intersect $AB_1$ and $BA_1$ again with the circumcircle to find $X$ and $Y$. Use $AD$ and $BE$ similarly for their second intersections $P$ and $Q$.
4. Draw a dotted `PineGreen` circle through $D,E,P$ and a solid one through $C,D,E$. Draw $XT,TQ$ dashed and $QP$ thin. Mark $\angle EQP$, $\angle EDA$ and $\angle BAD$ in `RoyalPurple`.

Vary the triangle's fill opacity and inspect the corresponding `fill opacity=0.14` in the initial TikZ. In the object list, reveal the hidden circle through $D,E,X$. Move a triangle vertex and observe $Y$ on this circle. Fit the diagram to see its whole circumference.

<p><a href="../contoh-penggunaan/03-garis-singgung.stikz.json" download="03-garis-singgung.stikz.json">Download the editable project</a> · <a href="../contoh-penggunaan/03-garis-singgung.tex" download="03-garis-singgung.tex">Download the TikZ</a></p>

[Back to the user guide](guide.html)
