---
layout: single
title: "Studio TikZ user guide"
permalink: /tools/studio-tikz/en/guide.html
comments: false
---

{% include studio-tikz-language.html language="en" id="/tools/studio-tikz/panduan.html" en="/tools/studio-tikz/en/guide.html" %}

[Open the editor](../index.html?lang=en) · [Jump to the illustrated tool catalogue](#tool-catalogue) · [See the worked diagrams](examples.html)

## Draw a first diagram

1. Open a new sheet. Choose the triangle tool and click three non-collinear positions to make $A$, $B$ and $C$.
2. In the points and lines menu, select the vector formula tool, enter `D = (A + 2B)/3` and create the point. Now $D$ sits on $AB$ with $AD:DB=2:1$.
3. Draw a segment by clicking $C$ and $D$. Select a dashed line style for $CD$. To add another segment, click its two endpoints while the tool is active.
4. Select the angle tool and click $A,C,B$ in that order. Choose an automatic angle label to show $\angle ACB$ in degrees. A custom label accepts LaTeX.
5. Switch to the move tool and drag $B$, then drag its letter to give it room. $D$ follows the segment, and the displayed angle updates. You can also [drag points in the interactive example](../contoh-vektor.html?lang=en).

## Geometry that follows its inputs

Click a segment or a circumference with the point tool to attach a point to it. That point can slide along the object. Click blank space for a free point. When drawing a three-point circle, click two points and move the pointer to preview the circle through the third position. A circle appears as soon as the three positions are non-collinear.

Select the **perpendicular bisector** tool and click a segment or both endpoints. Try moving one endpoint to see the bisector remain perpendicular and pass through the midpoint. For an **antiparallel**, choose $BC$ in triangle $ABC$ and a point $D$ on $AB$. Let the new line cut $AC$ at $E$. In a non-degenerate configuration, $B,C,E,D$ lie on a circle. [Explore the interactive diagram](../latihan-antiparalel.html?lang=en).

The triangle menu produces the circumcentre $O$, the intersection of the altitudes $H$, the incentre $I$ or the corresponding circles. Click the interior of a triangle, or choose its three vertices. For an excircle, click the vertex opposite the required circle after choosing the triangle. If you enter three separate points, start with the opposite vertex. Thus $I_A$ labels the centre of the excircle opposite $A$. The internal and external angle-bisector tools take three points with the vertex second.

### Choosing the source for a transformation

Choose a tool, then click the source. Click inside a polygon or sector to select the whole shape. Click a polygon edge to select one segment. When objects overlap, use the source-object list. In the **Sheet** menu, open the [shape transformation example](../index.html?lang=en#contoh/transformasi-bangun). Drag a vertex of the pentagon to see its reflection and inverse image update.

| Tool | After choosing the source |
| --- | --- |
| Translation | Click the tail and head of the translation vector. |
| Rotation | Enter an angle and select the centre. |
| Reflection | Click a point for central reflection or a line for the mirror. A segment used as a mirror represents its supporting line. |
| Dilation | Enter a scale factor and select the centre. |
| Inversion | Click the reference circumference. With **Radius or power**, enter the value or formula and select the centre. |

Select an image as the source of the next transformation to compose them. For example, reflect a pentagon in a line, then invert its reflection. Moving an original vertex updates both images. Press **Esc** to return to **Select / move**.

### Inverting edges, regions and annotations

In the [interactive inversion lesson](../index.html?lang=en#panduan/invert), $A$ and $B$ start on the reference circle and $M$ is the midpoint of $AB$. Play the animation, then expand the interactive example and drag $C$ or $O$. Follow the arc through $A'$, $M'$ and $B'$.

| Source object | Image under inversion with centre $O$ |
| --- | --- |
| Point $P$ | Its image $P'$ lies on ray $OP$ and satisfies $OP\cdot OP'=r^2$. The centre $O$ has no finite image. |
| Segment $AB$ on a line that misses $O$ | The arc from $A'$ to $B'$ that avoids $O$. To invert the entire supporting line, first draw **Line through two points**. |
| Segment collinear with $O$ | A segment when $O$ is outside the source segment. If $O$ is an endpoint, the rest maps to a ray. If $O$ is between the endpoints, the image consists of two rays. |
| Ray, arc or sector | The image follows the selected part of the curve. A sector boundary includes its two radii and its arc. |
| Polygon | Every edge maps individually. A triangle generally produces three arcs and a pentagon five. Move the centre into the polygon to make the fill extend outside the curved boundary. With the centre on an edge, the unbounded parts continue to the edge of the drawing. |
| Free label or angle mark | A label follows the image of its anchor and stays upright. The angle marker follows the tangent directions at the image vertex and keeps the angle measure. An anchor or vertex at $O$ has no finite image. |

Existing files retain their saved constructions. If a file uses the older inverse of the **supporting line**, create a new inversion of the segment to obtain just its image arc.

For an inversion with power $k=OA\cdot OB$, enter `OA * OB` after drawing both segments. Then $OP\cdot OP'=k$. You can also define the radius of a circle with a segment-length expression such as `(AB + CD)/2`.

## Selecting objects and styling labels

- Use the move tool and **Ctrl+click** or **⌘+click** to select several objects. Change their colour or opacity together, or hide them. Name and save the group to recall its members from the saved group list after reopening the project. To bring hidden objects back, show hidden objects in the list, select them and make them visible.
- To select a triangle inside a circle, click inside the triangle. Click the circumference to select the circle. You can also pick an object directly from the object list. Regular polygons appear with their shape and vertex names.
- Filled shapes share the outline palette. Change the fill opacity to see the lines underneath. To soften just the area behind a point label, an angle label or a free label, enable the translucent label background and adjust its opacity. The TikZ export preserves the treatment.
- Right-angle marks have an adjustable size. Select the mark and adjust its size until both short sides fit comfortably between the adjacent segments.
- The canvas grid and grid snapping are separate settings. Clear the grid visibility checkbox under the canvas to remove background dots. Focus the canvas to zoom with **+** and **−**, or select a zoom percentage. Canvas zoom is independent of the print scale.
- Choose the layout beside the sheet menu. Side by side places the code on the right, stacked places it below, and automatic follows the screen width. Your browser also remembers the selected interface language.

## Use the animation and interactive example

Click **?** beside a tool, or open the guide and search by name. Play the animation, pause on a click, or step backwards and forwards. Below a construction animation, open the interactive example and drag its defining points. Its drawing is independent of your sheet. The guide and examples are bundled with the offline editor.

## Copy to a LaTeX document

Copy the preamble shown for the current diagram and paste it before `\begin{document}`. Start a new document with

```latex
\documentclass{article}
\usepackage[dvipsnames]{xcolor}
\usepackage{tikz}
\begin{document}
% Paste the complete diagram here.
\end{document}
```

The complete diagram includes `center` and `tikzpicture`. Coordinates-only output goes inside your own `tikzpicture`. The `dvipsnames` option supplies names such as `PineGreen`; load `xcolor` before TikZ. If your class loads `xcolor` early, put `\PassOptionsToPackage{dvipsnames}{xcolor}` before `\documentclass`. Include `\usetikzlibrary{angles}` for a `\pic` angle and `\usetikzlibrary{calc}` for TikZ vector calculations. Studio lists libraries its output needs. Add packages or definitions for any custom label macros you introduce.

Set the TikZ scale to $2$ to double printed segment lengths. The generated point radius compensates for that scale to keep the printed dot at $1.5\,\mathrm{pt}$.

## Save projects and use them offline

Save each drawing as a separate `.stikz.json` file. Reopen it to keep construction dependencies, labels and styles. The browser remembers one current sheet, so save any work you want to keep before loading another example or starting a new sheet. Download the editor HTML for offline use. To update it, download a fresh copy and reopen your project file.

Open a `.ggb` file or drop it onto the canvas to import supported GeoGebra objects. Check the object list and the import message afterwards. Some points retain their saved positions without their original constraints. To keep a point on an object while editing, create a constrained point in Studio.

## Convert AoPS diagrams

[Open the Asymptote converter](../index.html?lang=en#asymptote), paste one source diagram, convert it and inspect the preview. The `[asy]` tags may be included. Copy the preamble and the resulting TikZ separately. To move a point in the converted diagram, edit its source and convert again. The converter reads a subset of two-dimensional Asymptote. An unsupported command gives a source location.

In the nested-squares example, change `n = 25` to `n = 5` to shorten the loop. In the four-circles example, changing `circle(O, 6/23)` to `circle(O, 1)` alters just the fourth radius.

Try the **Projection and reflection** example to see a point, its perpendicular foot and its image. The converter also recognises point arrays and indices, forms such as `2x` and `dir(60)`, separate paths linked by `^^`, segment or circle intersections, and transformations such as `rotate` and `reflect`. In a check of 78 distinct blocks from archived AMC/AIME problems and solutions spanning 1983–2024, 65 produced TikZ that compiled with pdfLaTeX. The other 13 contained features outside the supported subset, including 3D diagrams, splines, user-defined functions, clipping or shading. [AIME archive](https://huggingface.co/datasets/gneubig/aime-1983-2024/blob/8d5c803ed4bc31a551565a90d235d7e214bae43e/AIME_Dataset_with_images.csv) · [AMC sample archive](https://amcclub.org.cn/news/1830/)

To post a TikZ picture to AoPS, open the AoPS format dialog. Load the picture from the canvas or paste your own `tikzpicture`. Add definitions or libraries in the extra preamble field if needed, then copy the complete `[asy]` block. The resulting Asymptote block loads TikZ and places the picture in a LaTeX label. Copy the entire block, including the tags. Custom LaTeX macros in a label must also be available where the block is rendered.

## Shortcuts and troubleshooting

| Action | Shortcut or control |
| --- | --- |
| Finish using a tool or cancel an incomplete construction | **Esc** |
| Undo / redo | **Ctrl+Z** / **Ctrl+Shift+Z** |
| Add or remove one object from the selection | **Ctrl+click** with the move tool |
| Select all / delete selected objects | **Ctrl+A** / **Delete** |
| Zoom the canvas / fit the diagram | **+** and **−** / **Home** |
| Pan the canvas | Drag an empty area with the move tool, or scroll |

Use **⌘** in place of **Ctrl** on a Mac. Deleting an object also removes constructions that depend on it. If an object seems to disappear, fit the drawing and inspect the hidden-object list. A construction can also be undefined, for example a three-point circle whose points have become collinear. Move a point to restore it. If the browser blocks clipboard access, use **Ctrl+C** or **⌘C** in the selected code box.

## Tool catalogue

Choose a topic to open its illustrated steps and interactive construction directly.

| Points and lines | What to try |
| --- | --- |
| [Point](../index.html?lang=en#panduan/point) · [Point on object](../index.html?lang=en#panduan/on) | Place a free point, or attach it to a line or circle. |
| [Vector formula](../index.html?lang=en#panduan/pointFormula) · [Midpoint](../index.html?lang=en#panduan/mid) | Define $D=(A+2B)/3$ or bisect a segment. |
| [Intersection](../index.html?lang=en#panduan/cut) · [Perpendicular foot](../index.html?lang=en#panduan/foot) | Find where two objects meet, or project a point onto a line. |
| [Segment](../index.html?lang=en#panduan/segment) · [Line](../index.html?lang=en#panduan/line) · [Ray](../index.html?lang=en#panduan/ray) | Choose two defining points and compare the extent of each line. |
| [Parallel](../index.html?lang=en#panduan/parallel) · [Perpendicular](../index.html?lang=en#panduan/normal) · [Antiparallel](../index.html?lang=en#panduan/antiTriangle) | Place a line using an existing direction or the sides of an angle. |
| [Perpendicular bisector](../index.html?lang=en#panduan/perpendicularBisector) | Click the segment or both endpoints. |

| Circles | What to try |
| --- | --- |
| [Centre and point](../index.html?lang=en#panduan/circle2) · [Three points](../index.html?lang=en#panduan/circle3) · [Diameter](../index.html?lang=en#panduan/diameter) | Draw a circle using the data given in the problem. |
| [Fixed radius](../index.html?lang=en#panduan/circleRadius) · [Radius expression](../index.html?lang=en#panduan/circleFormula) · [Centre](../index.html?lang=en#panduan/center) | Enter a length, use segment arithmetic, or mark a circle's centre. |
| [Semicircle](../index.html?lang=en#panduan/semicircle) · [Arc](../index.html?lang=en#panduan/circleArc) · [Sector](../index.html?lang=en#panduan/sector) | Set the diameter or central angle and choose a direction. |
| [Tangent at a point](../index.html?lang=en#panduan/tangentAt) · [From a point](../index.html?lang=en#panduan/tangent) · [Common tangent](../index.html?lang=en#panduan/commonTangent) | Use a contact point, an exterior point or a pair of circles. |
| [Three constraints](../index.html?lang=en#panduan/circleConstraints) · [Fixed-radius tangent circle](../index.html?lang=en#panduan/circleFixedTangency) | Combine point and tangency conditions and inspect the candidate circles. |
| [Pole of a line](../index.html?lang=en#panduan/pole) · [Polar of a point](../index.html?lang=en#panduan/polar) | Start with a reference circle and observe the point–line correspondence. |

| Triangles and regions | What to try |
| --- | --- |
| [Circumcentre](../index.html?lang=en#panduan/circumcenter) · [Intersection of altitudes](../index.html?lang=en#panduan/orthocenter) | Mark $O$ or $H$ and drag a vertex. |
| [Incentre](../index.html?lang=en#panduan/incenter) · [Incircle](../index.html?lang=en#panduan/incircle) · [Excentre](../index.html?lang=en#panduan/excenter) · [Excircle](../index.html?lang=en#panduan/excircle) | Mark a centre equidistant from the side lines or draw its circle. |
| [Internal bisector](../index.html?lang=en#panduan/bisectInternal) · [External bisector](../index.html?lang=en#panduan/bisectExternal) | Choose three points with the vertex second. |
| [Triangle](../index.html?lang=en#panduan/triangle) · [Regular polygon](../index.html?lang=en#panduan/regularPolygon) · [Polygon](../index.html?lang=en#panduan/polygon) | Draw a region and edit its fill or boundary. |
| [Angle](../index.html?lang=en#panduan/angle) · [Right angle](../index.html?lang=en#panduan/right) · [Label](../index.html?lang=en#panduan/label) | Place an angle arc, square marker or LaTeX annotation. |

| Transformations | What to try |
| --- | --- |
| [Translation](../index.html?lang=en#panduan/translate) · [Rotation](../index.html?lang=en#panduan/rotate) · [Dilation](../index.html?lang=en#panduan/dilate) | Choose the source object and set a vector, angle or scale factor. |
| [Reflection](../index.html?lang=en#panduan/reflect) · [Reflect in a line](../index.html?lang=en#panduan/reflectLine) · [Reflect in a point](../index.html?lang=en#panduan/reflectPoint) | Compare the image after moving the mirror or centre. |
| [Inversion](../index.html?lang=en#panduan/invert) · [Inverse of a line](../index.html?lang=en#panduan/invertLine) · [Inverse of a circle](../index.html?lang=en#panduan/invertCircle) · [Radius or power](../index.html?lang=en#panduan/invertFormula) | Explore a triangle whose three edges map to arcs. Use an existing circle or specify the radius or power. |

| Editor and export | Illustrated topics |
| --- | --- |
| Selection and view | [Select / move](../index.html?lang=en#panduan/move) · [Multiple selection](../index.html?lang=en#panduan/editor-selection) · [Undo and delete](../index.html?lang=en#panduan/editor-undo) · [Pan](../index.html?lang=en#panduan/editor-pan) · [Zoom and snapping](../index.html?lang=en#panduan/editor-view) · [Theme and canvas](../index.html?lang=en#panduan/editor-theme) |
| Appearance | [Visibility](../index.html?lang=en#panduan/editor-visibility) · [Colours and opacity](../index.html?lang=en#panduan/editor-color) · [Line styles](../index.html?lang=en#panduan/editor-stroke) · [Fill a region](../index.html?lang=en#panduan/editor-fill) |
| Edit an object | [Point labels](../index.html?lang=en#panduan/editor-point-label) · [Free labels](../index.html?lang=en#panduan/editor-annotation) · [Angle style](../index.html?lang=en#panduan/editor-angle-style) · [Circle arcs](../index.html?lang=en#panduan/editor-arc) · [Edit formulas](../index.html?lang=en#panduan/editor-formulas) |
| Files and printing | [New sheets](../index.html?lang=en#panduan/editor-sheets) · [Save and open](../index.html?lang=en#panduan/editor-project) · [Import GeoGebra](../index.html?lang=en#panduan/editor-import) · [Copy TikZ](../index.html?lang=en#panduan/editor-export) · [Print scale](../index.html?lang=en#panduan/editor-scale) |
