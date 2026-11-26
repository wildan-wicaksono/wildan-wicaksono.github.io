---
layout: single
title: "Studio TikZ user guide"
permalink: /tools/studio-tikz/en/guide.html
comments: false
---

{% include studio-tikz-language.html language="en" id="/tools/studio-tikz/panduan.html" en="/tools/studio-tikz/en/guide.html" %}

[Open the editor](../index.html?lang=en) · [Jump to the illustrated tool catalogue](#tool-catalogue) · [See the worked diagrams](examples.html)

## Draw a first diagram

1. Open a new sheet. Choose **Polygon** on the toolbar or in the **Regions** menu. Click three non-collinear positions for $A$, $B$ and $C$, then click $A$ again or press **Enter** to close the triangle.
2. In the **Points** menu, select the vector formula tool, enter `D = (A + 2B)/3` and create the point. Now $D$ sits on $AB$ with $AD:DB=2:1$.
3. Draw a segment by clicking $C$ and $D$. Select a dashed line style for $CD$. To add another segment, click its two endpoints while the tool is active.
4. Select **Angle** and click $A,C,B$ in that order to mark the angle at $C$. Choose an automatic angle label to show $\angle ACB$ in degrees. A custom label accepts LaTeX.
5. Switch to the move tool and drag $B$, then drag its letter to give it room. $D$ follows the segment, and the displayed angle updates. You can also [drag points in the interactive example](../contoh-vektor.html?lang=en).

## Geometry that follows its inputs

With **Point**, click blank space for a free point. This also works inside a filled shape, away from any boundaries or lines. Click a segment, arc or circle outline to attach a point to it. Switch to **Select / move** and drag the point along that object. To mark where two objects meet, click when the cross appears. The point follows both objects as the drawing changes. At a crossing, hold **Shift** and click the stroke you want to follow to make a point that can slide along that object. Clicking an existing dot selects that point.

When drawing a three-point circle, click two points and move the pointer to preview the circle through the third position. A circle appears as soon as the three positions are non-collinear.

In **Lines**, select the **perpendicular bisector** tool and click a segment or both endpoints. Try moving one endpoint to see the bisector remain perpendicular and pass through the midpoint. For an **antiparallel**, choose $BC$ in triangle $ABC$ and a point $D$ on $AB$. Let the new line cut $AC$ at $E$. In a non-degenerate configuration, $B,C,E,D$ lie on a circle. [Explore the interactive diagram](../latihan-antiparalel.html?lang=en).

The triangle menu produces the circumcentre $O$, the intersection of the altitudes $H$, the incentre $I$ or the corresponding circles. Click inside a closed three-vertex polygon, or select its three vertices individually. For an excircle, click the vertex opposite the required circle after choosing the triangle. If you enter three separate points, start with the opposite vertex. Thus $I_A$ labels the centre of the excircle opposite $A$. The internal and external angle-bisector tools take three points with the vertex second.

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

In the [interactive inversion lesson](../index.html?lang=en#panduan/invert), $A$ and $B$ start on the reference circle and $M$ is the midpoint of $AB$. Play the animation, then expand the interactive example and drag $C$ or $O$. Follow the images of $A$, $M$ and $B$ on the same arc.

| Source object | Image under inversion with centre $O$ |
| --- | --- |
| Point $P$ | Its image $P^{*}$ lies on ray $OP$ and satisfies $OP\cdot OP^{*}=r^2$. The centre $O$ has no finite image. |
| Segment $AB$ on a line that misses $O$ | The arc from $A^{*}$ to $B^{*}$ that avoids $O$. To invert the entire supporting line, first draw **Line through two points**. |
| Segment collinear with $O$ | A segment when $O$ is outside the source segment. If $O$ is an endpoint, the rest maps to a ray. If $O$ is between the endpoints, the image consists of two rays. |
| Ray, arc or sector | The image follows the selected part of the curve. A sector boundary includes its two radii and its arc. |
| Polygon | Every edge maps individually. A triangle generally produces three arcs and a pentagon five. Move the centre into the polygon to make the fill extend outside the curved boundary. With the centre on an edge, the unbounded parts continue to the edge of the drawing. |
| Free label or angle mark | A label follows the image of its anchor and stays upright. The angle marker follows the tangent directions at the image vertex and keeps the angle measure. An anchor or vertex at $O$ has no finite image. |

Existing files retain their saved constructions. If a file uses the older inverse of the **supporting line**, create a new inversion of the segment to obtain just its image arc.

For an inversion with power $k=OA\cdot OB$, enter `OA * OB` after drawing both segments. Then $OP\cdot OP^{*}=k$. You can also define the radius of a circle with a segment-length expression such as `(AB + CD)/2`.

## Selecting objects and styling labels

- Use the move tool and **Ctrl+click** or **⌘+click** to select several objects. Change their colour or opacity together, or hide them. Name and save the group to recall its members from the saved group list after reopening the project. To bring hidden objects back, show hidden objects in the list, select them and make them visible.
- To select a triangle inside a circle, click inside the triangle. Click the circumference to select the circle. You can also pick an object directly from the object list. Regular polygons appear with their shape and vertex names.
- To name a point $A^{*}$, click its dot and enter `A*` in **Name**. The forms `A^*` and `A^{*}` also work. Both the canvas and the TikZ label show the superscript star. Enter `A_1*` for $A_1^{*}$. A new inversion of $A$ automatically uses $A^{*}$, while older projects keep their saved names.
- Filled shapes share the outline palette. Change the fill opacity to see the lines underneath. To soften just the area behind a point label, an angle label or a free label, enable the translucent label background and adjust its opacity. The TikZ export preserves the treatment.
- An angle arc becomes a square when its arms are perpendicular and returns to an arc if you move a point so the angle changes. Right-angle marks have an adjustable size. Select the mark and adjust its size until both short sides fit comfortably between the adjacent segments.
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

Open a `.ggb` file or drop it onto the canvas to import supported GeoGebra objects. Check the object list and the import message afterwards. Some points retain their saved positions without their original constraints. To attach a point to an imported line or circle, choose **Point** and click its stroke.

### Crop the canvas and TikZ drawing

Next to the zoom controls, choose **Clip drawing → Rectangle**, then click two diagonally opposite corners. For a boundary that follows the geometry, choose **Existing shape** and pick a full circle, sector or polygon on the canvas or from the list. The boundary follows that object as it changes.

The canvas and the complete TikZ export show the same clipped drawing, including labels. The project stores the boundary and the original objects. Choose **Edit clip** to change the boundary or **Remove clip** to see the whole drawing. [Open the clipping animation](../index.html?lang=en#panduan/editor-clip).

## Convert AoPS diagrams

[Open the Asymptote converter](../index.html?lang=en#asymptote), paste one source diagram, convert it and inspect the preview. The `[asy]` tags may be included. Copy the preamble and the resulting TikZ separately. To move a point in the converted diagram, edit its source and convert again. The converter reads a subset of two-dimensional Asymptote. An unsupported command gives a source location.

In the nested-squares example, change `n = 25` to `n = 5` to shorten the loop. In the four-circles example, changing `circle(O, 6/23)` to `circle(O, 1)` alters just the fourth radius.

The source converter recognises point arrays, helper functions, loops, transparent fills and selected `olympiad` and `cse5` constructions. Try **Projection and reflection** to see a point and its perpendicular foot. Both `clip(path)` and `clip(currentpicture,path)` clip what has already been drawn. A subsequent drawing command can place an object outside that boundary.

Tests included AMC/AIME statements and solutions, AoPS teaching material, and forum diagrams for olympiads in Indonesia, Canada, Australia and other countries. Forum contributors often supply their own diagrams when discussing a solution. Source examples include the [2019 USA(J)MO Math Jam transcript](https://artofproblemsolving.com/school/mathjams-transcripts?id=491), [WOOT week-five worksheet](https://artofproblemsolving.com/texer/2021WOOTweek5HW) and [Project Numina’s archive of AoPS discussions](https://huggingface.co/datasets/project-numina/aops).

**When a command needs the Asymptote renderer**, open **Convert an SVG rendered by Asymptote**. This route can retain the appearance of splines, projections and geometry drawn by custom modules.

1. Download `diagram.asy`. With Asymptote and the source’s required modules installed, run `asy -f svg diagram.asy` in its folder.
2. Choose **Open the rendered SVG** and select `diagram.svg`. Inspect the preview and copy the TikZ and preamble. The output consists of static drawing paths. If letters were rendered as outlines, they become paths too. Edit the original source to change a formula or a construction point, then render again.
3. If the SVG viewport cuts off part of the drawing, run `asy -f pdf diagram.asy` followed by `pdftocairo -svg diagram.pdf diagram.svg` with Poppler installed. Open the resulting SVG as in step 2.
4. If the SVG contains a bitmap or an unsupported filter, run `asy -f pdf diagram.asy`. Put `diagram.pdf` beside your LaTeX document, add `\usepackage{graphicx}` to the preamble and include the figure with `\includegraphics{diagram.pdf}`.

To post a TikZ picture to AoPS, open the AoPS format dialog. Load the picture from the canvas or paste your own `tikzpicture`. Add definitions or libraries in the extra preamble field if needed, then copy the complete `[asy]` block. The resulting Asymptote block loads TikZ and places the picture in a LaTeX label. Copy the entire block, including the tags. If an Asymptote block solely wraps a TikZ picture in a label, pasting it into the converter recovers the original TikZ. Custom LaTeX macros in a label must also be available where the block is rendered.

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

The top toolbar includes **Label** for a free annotation and **Polygon** for a triangle or a many-sided shape. The **Points**, **Lines**, **Regions**, **Angles** and **Transformations** menus list their tools vertically. The **Circle** and **Triangle** menus group related constructions. Choose a topic below to open its animation.

| Points | What to try |
| --- | --- |
| [Point](../index.html?lang=en#panduan/point) | Click blank space for a free point, a stroke to attach the point, or a crossing to mark the intersection. |
| [Vector formula](../index.html?lang=en#panduan/pointFormula) · [Midpoint](../index.html?lang=en#panduan/mid) | Define $D=(A+2B)/3$ or bisect a segment. |
| [Intersection](../index.html?lang=en#panduan/cut) · [Perpendicular foot](../index.html?lang=en#panduan/foot) | Find where two objects meet, or project a point onto a line. |

| Lines | What to try |
| --- | --- |
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

| Triangles | What to try |
| --- | --- |
| [Circumcentre](../index.html?lang=en#panduan/circumcenter) · [Intersection of altitudes](../index.html?lang=en#panduan/orthocenter) | Mark $O$ or $H$ and drag a vertex. |
| [Incentre](../index.html?lang=en#panduan/incenter) · [Incircle](../index.html?lang=en#panduan/incircle) · [Excentre](../index.html?lang=en#panduan/excenter) · [Excircle](../index.html?lang=en#panduan/excircle) | Mark a centre equidistant from the side lines or draw its circle. |
| [Internal bisector](../index.html?lang=en#panduan/bisectInternal) · [External bisector](../index.html?lang=en#panduan/bisectExternal) | Choose three points with the vertex second. |

| Regions | What to try |
| --- | --- |
| [Polygon](../index.html?lang=en#panduan/polygon) | Click three vertices for a triangle, or continue placing vertices for a larger polygon. Click the first vertex or press **Enter** to close the shape. |
| [Regular polygon](../index.html?lang=en#panduan/regularPolygon) | Choose the number of vertices and one side to create a regular polygon. |

| Angles | What to try |
| --- | --- |
| [Angle](../index.html?lang=en#panduan/angle) | Click three points, with the vertex second. At $90^\circ$ the mark becomes a square. |
| [Internal bisector](../index.html?lang=en#panduan/bisectInternal) · [External bisector](../index.html?lang=en#panduan/bisectExternal) | Choose the angle to bisect. |

| Top toolbar | What to try |
| --- | --- |
| [Label](../index.html?lang=en#panduan/label) | Place a text or LaTeX annotation. |

| Transformations | What to try |
| --- | --- |
| [Translation](../index.html?lang=en#panduan/translate) · [Rotation](../index.html?lang=en#panduan/rotate) · [Dilation](../index.html?lang=en#panduan/dilate) | Choose the source object and set a vector, angle or scale factor. |
| [Reflection](../index.html?lang=en#panduan/reflect) · [Reflect in a line](../index.html?lang=en#panduan/reflectLine) · [Reflect in a point](../index.html?lang=en#panduan/reflectPoint) | Compare the image after moving the mirror or centre. |
| [Inversion](../index.html?lang=en#panduan/invert) · [Inverse of a line](../index.html?lang=en#panduan/invertLine) · [Inverse of a circle](../index.html?lang=en#panduan/invertCircle) · [Radius or power](../index.html?lang=en#panduan/invertFormula) | Explore a triangle whose three edges map to arcs. Use an existing circle or specify the radius or power. |

| Editor and export | Illustrated topics |
| --- | --- |
| Selection and view | [Select / move](../index.html?lang=en#panduan/move) · [Multiple selection](../index.html?lang=en#panduan/editor-selection) · [Undo and delete](../index.html?lang=en#panduan/editor-undo) · [Pan](../index.html?lang=en#panduan/editor-pan) · [Zoom and snapping](../index.html?lang=en#panduan/editor-view) · [Theme and canvas](../index.html?lang=en#panduan/editor-theme) · [Clip drawing](../index.html?lang=en#panduan/editor-clip) |
| Appearance | [Visibility](../index.html?lang=en#panduan/editor-visibility) · [Colours and opacity](../index.html?lang=en#panduan/editor-color) · [Line styles](../index.html?lang=en#panduan/editor-stroke) · [Fill a region](../index.html?lang=en#panduan/editor-fill) |
| Edit an object | [Point labels](../index.html?lang=en#panduan/editor-point-label) · [Free labels](../index.html?lang=en#panduan/editor-annotation) · [Angle style](../index.html?lang=en#panduan/editor-angle-style) · [Circle arcs](../index.html?lang=en#panduan/editor-arc) · [Edit formulas](../index.html?lang=en#panduan/editor-formulas) |
| Files and printing | [New sheets](../index.html?lang=en#panduan/editor-sheets) · [Save and open](../index.html?lang=en#panduan/editor-project) · [Import GeoGebra](../index.html?lang=en#panduan/editor-import) · [Copy TikZ](../index.html?lang=en#panduan/editor-export) · [Print scale](../index.html?lang=en#panduan/editor-scale) |
