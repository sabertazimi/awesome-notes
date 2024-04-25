---
author: Sabertazimi
authorTitle: Web Developer
authorURL: https://github.com/sabertazimi
authorImageURL: https://github.com/sabertazimi.png
tags: [Web, CSS]
---

# CSS Advanced Notes

## CSS Border

### Border Radius

[`border-radius`](https://developer.mozilla.org/docs/Web/CSS/border-radius):

- 不支持负值.
- 圆角以外的区域不可点击, 无法响应 `click` 事件.
- 没有继承性:
  因此父元素设置 `border-radius`, 子元素依然是直角效果.
  可以给父元素设置 `overflow:hidden` 让子元素视觉上表现为圆角.
- 支持 `border-collapse` 设置为 `separate` 的
  `table`/`inline-table`/`table-cell` 元素.
- 每角都支持单独设置 `水平半径` `/` `垂直半径`:
  `<length-percentage>{1, 4} [/ <length-percentage>{1,4}]?`.

```css
.box {
  /* 左上 右上+左下 右下 / 左上 右上+左下 右下 */
  border-radius: 10px 5px 2em / 20px 25px 30%;

  /* 左上+右下 右上+左下 / 左上 右上 右下 左下 */
  border-radius: 10px 5% / 20px 25em 30px 35em;

  /* 水平半径 垂直半径 */
  border-top-left-radius: 30px 50%;

  /* 水平半径 垂直半径 */
  border-bottom-left-radius: 20% 15px;
}
```

![Border Radius](./figures/BorderRadius.png 'Border Radius')

[圆角曲线重叠时](http://w3.org/TR/css3-background/#corner-overlap),
所有圆角半径都缩小至 $f$ 倍:

$$
f =
\min\left(
  \frac{\text{Length}_{\text{horizontal}}}{\sum^{\text{horizontal}}_{\text{radius}}},
  \frac{\text{Length}_{\text{vertical}}}{\sum^{\text{vertical}}_{\text{radius}}}
\right)
$$

```css
.w-150px-h-100px {
  /* f = min(0.50, 0.50) = 0.50 */
  border-radius: 100%;
  border-radius: 75px / 50px;

  /* f = min(0.50, 0.33) = 0.33 */
  border-radius: 150px;
  border-radius: 50px;
}
```

### Border Color

#### Alpha Border

半透明边框:

```css
.box {
  background: white;
  background-clip: padding-box;
  border: 10px solid hsl(0deg 0% 100% / 50%);
}
```

#### Transparent Border

利用透明边框扩大元素点击区域,
并利用 `background-clip: padding-box` 隐藏边框:

```css
.icon-clear {
  width: 16px;
  height: 16px;
  background-clip: padding-box;
  border: 11px solid transparent;
}
```

### Border Style

利用 `solid` border 模拟链接下划线:

```css
.link {
  padding-bottom: 5px;
  text-decoration: none;
  border-bottom: 1px solid;
}
```

### Border Image

[`border-image`](https://developer.mozilla.org/docs/Web/CSS/border-image):

- 以九宫格为基本模式, `content-box` 为九宫格中间格子.
- 可以结合 `clip-path` 裁剪边框.
- 可用于实现自定义边框: 渐变边框, 条纹边框, 虚线边框.
- `<'border-image-source'>`
  || `<'border-image-slice'> / <'border-image- width'> / <'border-image-outset'>`
  || `<'border-image-repeat'>`.

```css
.box {
  border-image: url('./grid-nine.svg') 54 33.33% 33.33% 54 / 10px 20px 30px 1 /
    1 30px 20px 10px round space;
}
```

```css
.border-linear-gradient {
  clip-path: inset(0 round 10px);
  border-style: solid;
  border-image: linear-gradient(deepskyblue, deeppink) 20 / 10px;
}

.border-radial-gradient {
  clip-path: inset(0 round 10px);
  border-style: solid;
  border-image: radial-gradient(deepskyblue, deeppink) 20 / 10px;
}

.border-stripe {
  border: 12px solid;
  border-image: repeating-linear-gradient(
      -45deg,
      red,
      red 5px,
      transparent 5px,
      transparent 10px
    )
    12;
}

.border-dashed {
  border: 1px dashed deepskyblue;
  border-image: repeating-linear-gradient(
      135deg,
      deepskyblue,
      deepskyblue 5px,
      transparent 5px,
      transparent 10px
    )
    1;
}
```

### Border Collapse

```css
table,
tr,
td {
  border: 1px solid #666;
}

table {
  border-collapse: collapse;
}
```

### Box Decoration Break

[`box-decoration-break`](https://developer.mozilla.org/docs/Web/CSS/box-decoration-break):

- Control `background`/`border`/`border-image`/`box-shadow`/`clip-path`/`margin`/`padding`
  styles when lines break.
- `slice`: initial value, 断开部分样式直接切割.
- `clone`: 断开部分样式独立渲染.

### Multiple Border

[Multiple border](https://css-tricks.com/animating-border):

- `border`.
- `outline`.
- `background` gradient:
  - `linear-gradient` [border](https://codepen.io/Chokcoco/pen/YzGdEMZ).
  - `conic-gradient` [border](https://codepen.io/Chokcoco/pen/dypaobm).
- `box-shadow`.
- `clip-path`.
- Pseudo element.
- SVG [`stroke-dasharray`](https://codepen.io/Chokcoco/pen/gOOKYmV).

## CSS Outline

[`outline`](https://developer.mozilla.org/docs/Web/CSS/outline):

- `initial` value: `medium none currentcolor`.
- `outline` do not take up space,
  it overlap margins and surrounding elements.
- `outline` do not change element `size` and `position`.
- `outline` is same on all sides.

```css
.input {
  outline: none;
}

.input:focus {
  border-color: var(--highlight);
}

.button:focus-visible {
  outline: 1px solid #000;
  outline-offset: 3px;
}

.button:focus:not(:focus-visible) {
  outline: none;
}

.image:active {
  outline: 50px solid rgb(0 0 0 / 10%);
  outline-offset: -50px;
}
```

## CSS Shadow

### Text Shadow

[`text-shadow](https://developer.mozilla.org/docs/Web/CSS/text-shadow):

- `none`.
- `<shadow-text>#`: `<length>{2,3} && <color>?`.
  - 支持多重阴影.
  - 不支持内阴影.
  - `<length>{2,3}`: 不支持扩展阴影 `offset-x offset-y blur-radius`.
  - `<color>?`: default `revert` (user agent color).

```css
:root {
  --colo: #c0c0c0;
  --br-shadow: -6px 6px 15px rgb(0 0 0 / 50%);
  --tl-shadow: 6px -6px 15px rgb(255 255 255/ 80%);
}

body {
  background: var(--color);
}

/* 新拟物文字 */
.neumorphic-text {
  color: var(--color);
  text-shadow: var(--br-shadow), var(--tl-shadow);
}

/* 印刷文字 */
.press-text {
  color: hsl(210deg 13% 75%);
  text-shadow: 0 -1px 1px black;
  background: hsl(210deg 13% 40%);
}

/* 描边文字 */
.stroked-text {
  color: white;
  text-shadow:
    1px 1px black,
    -1px -1px black,
    1px -1px black,
    -1px 1px black;
}

/* 发光文字 */
.glow-text {
  color: #ffc;
  text-shadow:
    0 0 0.1em,
    0 0 0.3em;
  background: #203;
}

/* 凸起文字 */
.extruded-text {
  color: white;
  text-shadow:
    0 1px hsl(0deg 0% 85%),
    0 2px hsl(0deg 0% 80%),
    0 3px hsl(0deg 0% 75%),
    0 4px hsl(0deg 0% 70%),
    0 5px hsl(0deg 0% 65%),
    0 5px 10px black;
  background: #58a;
}

/* 复古文字 */
.retro-text {
  color: white;
  text-shadow:
    1px 1px black,
    2px 2px black,
    3px 3px black,
    4px 4px black,
    5px 5px black,
    6px 6px black,
    7px 7px black,
    8px 8px black;
  background: hsl(0deg 50% 45%);
}
```

### Box Shadow

[`box-shadow`](https://developer.mozilla.org/docs/Web/CSS/box-shadow):

- `none`.
- `<shadow>#`: `inset? && <length>{2,4} && <color>?`.
  - 支持多重阴影.
  - `inset?`: 支持内阴影.
  - `<length>{2,4}`: 支持扩展阴影 `offset-x offset-y blur-radius spread-radius`.
  - `<color>?`: default `currentcolor` (text computed color).

#### Basic Box Shadow

```css
.box {
  /* offset-x | offset-y | blur-radius | color */
  box-shadow: 10px 5px 5px black;

  /* offset-x | offset-y | blur-radius | spread-radius | color */
  box-shadow: 2px 2px 2px 1px rgb(0 0 0 / 20%);
}
```

#### Side Box Shadow

Bottom side box shadow:

```css
.box {
  box-shadow: 0 5px 4px -4px black;
}
```

Right and bottom sides box shadow:

```css
.box {
  box-shadow: 3px 3px 6px -3px black;
}
```

Two opposite sides box shadow:

```css
.box {
  box-shadow:
    5px 0 5px -5px black,
    -5px 0 5px -5px black;
}
```

#### Inset Box Shadow

模拟边框:

```css
.button-ghost {
  background-color: #fff;

  /* 模拟边框: 左 右 上 下 */
  box-shadow:
    inset 1px 0 #a2a9b6,
    inset -1px 0 #a2a9b6,
    inset 0 1px #a2a9b6,
    inset 0 -1px #a2a9b6;
}
```

模拟背景:

```css
.button:active {
  box-shadow: inset 0 0 0 999px rgb(0 0 0 / 10%);
}
```

#### Neumorphic Box Shadow

[Neumorphic box shadow](https://codepen.io/myacode/pen/PoqQQNM):

```css
.neumorphic {
  box-shadow:
    -10px -10px 15px rgb(255 255 255 / 50%),
    10px 10px 15px rgb(70 70 70 / 12%);
}

.neumorphic:active {
  box-shadow:
    inset -10px -10px 15px rgb(255 255 255 / 50%),
    inset 10px 10px 15px rgb(70 70 70 / 12%);
}
```

## CSS Background

### Background Color

[`background-color`](https://developer.mozilla.org/docs/Web/CSS/background-color):

- [`<color>`](https://developer.mozilla.org/docs/Web/CSS/color_value):
  `initial` value `transparent`.
- [`background`](https://developer.mozilla.org/docs/Web/CSS/background)
  shorthand property:
  `background-color` value only be included in **last layer** specified.

### Background Image

[`background-image`](https://developer.mozilla.org/docs/Web/CSS/background-image):

- `url()`.
- `image-set([<image> <resolution>]#)`.
- `linear-gradient()`.
- `radial-gradient()`.
- `conic-gradient()`.
- 语法越靠后的背景图像的层叠等级越低:
  `background` 一般设置为 `background-image# background-color`.

![Multiple Background Image](./figures/BackgroundImage.png 'Multiple Background Image')

```css
.image-set {
  width: 128px;
  height: 96px;
  background: url('fallback.jpg');
  background: image-set(
    url('w128px.jpg') 1x,
    url('w256px.jpg') 2x,
    url('w512px.jpg') 3x
  );
  background-size: cover;
}
```

### Background Repeat

```css
.background-repeat {
  /* Keyword values */
  background-repeat: repeat-x;
  background-repeat: repeat-y;
  background-repeat: repeat;
  background-repeat: space;
  background-repeat: round;
  background-repeat: no-repeat;

  /* Two-value syntax: horizontal | vertical */
  background-repeat: repeat space;
  background-repeat: repeat repeat;
  background-repeat: round space;
  background-repeat: no-repeat round;
}
```

### Background Position

Percentage background position (`<position> type`):

- X offset value = `(container width - image width) * (position x%)`.
- Y offset value = `(container height - image height) * (position y%)`.

```css
/* Keyword values */
background-position: top;
background-position: bottom;
background-position: left;
background-position: right;
background-position: center;

/* <percentage> values */
background-position: 25% 75%;

/* <length> values */
background-position: 0 0;
background-position: 1cm 2cm;
background-position: 10ch 8em;

/* Multiple images */
background-position:
  0 0,
  center;

/* Edge offsets values */
background-position: bottom 10px right 20px;
background-position: right 3em bottom 10px;
background-position: bottom 10px right;
background-position: top right 10px;
```

[![Background Position](./figures/BackgroundPosition.png)](https://developer.mozilla.org/docs/Web/CSS/background-position)

### Background Clip

指定背景显示范围:

- `border-box`.
- `padding-box`:
  虽然 `border` 层叠等级高于 `background`,
  但是透明边框在视觉上仍会被有色背景覆盖 (背景会延伸至边框下方).
  设置 `background-clip: padding-box`
  可用于保证 `border-color: transparent` 不被 `background-color: white` 视觉覆盖.
- `content-box`.
- `text`:
  可用于实现`渐变文字`/`镂空文字`/`背景蒙版文字`.

```css
@property --offset {
  syntax: '<length>';
  inherits: false;
  initial-value: 5px;
}

@keyframes move {
  to {
    --offset: 15px;
  }
}

p {
  color: #000;
}

/* 同心圆外扩动画 */
p:hover {
  color: transparent;
  background: repeating-radial-gradient(
    circle at 0 0,
    #000 calc(var(--offset) - 5px),
    #000 var(--offset),
    #fff var(--offset),
    #fff calc(var(--offset) + 5px)
  );
  background-clip: text; /* -webkit-background-clip: text; */
  animation: move 0.5s infinite linear;
}
```

可以利用多重背景实现 `border-image`:

`background: linear-gradient(white, white) padding-box, var(--repeating-stripe-gradient)`,
语法靠前的 `padding-box` 白色背景处于高层, 遮住大部分条纹背景,
导致条纹背景只显示在 `border` 区域, 从而模拟实现 `border-image` 效果.

```css
.stripe-border {
  padding: 1em;
  background:
    linear-gradient(white, white) padding-box,
    repeating-linear-gradient(
        -45deg,
        red 0,
        red 12.5%,
        transparent 0,
        transparent 25%,
        #58a 0,
        #58a 37.5%,
        transparent 0,
        transparent 50%
      )
      0 / 5em 5em;
  border: 1em solid transparent;
}
```

### Background Origin

指定背景绘制起点:

- `padding-box`.
- `border-box`.
- `content-box`.
- 影响 `background-size: <percentage>` 大小.
- 影响 `background-position` 定位.
- 影响**起点两侧**背景样式细节.

### Background Size

[`background-size`](https://developer.mozilla.org/docs/Web/CSS/background-size):

- `auto{1,2}`:
  - 具有 intrinsic size 的背景 (e.g 位图),
    computed to `[intrinsic size, intrinsic size]`.
  - 具有一个方向 intrinsic size, 具有 intrinsic ratio 的背景 (e.g 矢量图),
    computed to `[intrinsic size, intrinsic size * intrinsic ratio]`.
  - 具有一个方向 intrinsic size, 不具有 intrinsic ratio 的背景 (e.g 矢量图),
    computed to `[intrinsic size, extrinsic size]`.
  - 不具有 intrinsic size, 具有 intrinsic ratio 的背景 (e.g 矢量图),
    computed to `contain` (等比例缩放).
  - 不具有 intrinsic size, 不具有 intrinsic ratio 的背景 (e.g CSS gradient),
    computed to `[extrinsic size, extrinsic size]`.
- `cover`: 等比例裁剪, 部分图像会裁剪.
- `contain`: 等比例缩放, 部分区域会留白.
- `<length-percentage>{1,2}`:
  - `<percentage>`: calculate by extrinsic size and `background-origin` box.

```css
.background-size {
  background-size: cover;
  background-size: contain;
  background-size: 100%;
  background-size: 20px;
  background-size: auto 100%;
  background-size: auto 20px;
  background-size: 100% 100%;
  background-size: 20px 20px;
}

.video {
  min-width: 100%;
  min-height: 100%;
  overflow: hidden;
  background-size: cover;
}
```

### Background Attachment

[`background-attachment`](https://developer.mozilla.org/docs/Web/CSS/background-attachment):

- `scroll`: scrolls with main view, but stays fixed inside local view.
- `local`: scrolls both with main view and local view.
- `fixed`: stays fixed no matter what.

#### Background Scroll View

对于可以滚动的元素 (`overflow: scroll`):

- 当 `background-attachment: scroll` 时,
  背景图不会随元素内容的滚动而滚动 (fixed inside local view).
- 当 `background-attachment: local` 时,
  背景图会随元素内容的滚动而滚动 (scroll with local view).

[滚动阴影](https://codepen.io/Chokcoco/pen/abmqMJQ):

```css
/**
 * 纯白渐变背景随列表滚动而滚动, 灰度渐变背景不随列表滚动而滚动.
 * 列表滚动时, 纯白渐变背景移出视口, 露出灰度渐变背景.
 */
.scrollable-list {
  background: linear-gradient(#fff 30%, transparent),
    radial-gradient(at 50% 0, rgb(0 0 0 / 20%), transparent 70%);
  background-repeat: no-repeat;
  background-attachment: local, scroll;
  background-size:
    100% 50px,
    100% 15px;
}
```

#### Background Parallax Effect

Implement scroll parallax effect `background-attachment: fixed`:

```css
/* parallax effect */
body {
  box-sizing: border-box;
  width: 100%;
  height: 100vh;
  padding: 0;
  margin: 0;
}

.parallax {
  min-height: 60%; /* key */
  background-image: url('./images/bg.jpg');
  background-repeat: no-repeat;
  background-attachment: fixed; /* key */
  background-position: center;
  background-size: cover;
}
```

## CSS Gradient

### Color Stop List

`<color-stop-list>`,
`[<linear-color-stop> [, <linear-color-hint>]?]#, <linear-color-stop>`:

- `<linear-color-stop>`: `<color> <length-percentage>{1,2}?`.
- `<linear-color-hint>`: `<length-percentage>`, 改变颜色的转换点位置.
- `<length-percentage>`: `<length> | <percentage>`.

`<angular-color-stop-list>`,
`[<angular-color-stop> [, <angular-color-hint>]?]#, <angular-color-stop>`:

- `<angular-color-stop>`: `<color> && <angle-percentage>{1,2}?`.
- `<angular-color-hint>`: `<angle-percentage>`, 改变颜色的转换点位置.
- `<angle-percentage>`: `<angle> | <percentage>`.

:::tip Color Stop Position

若后一个色标的位置值为 `0`,
则它的位置总是会被浏览器调整为前一个色标的位置值:

```css
/* 条纹形状 */
.stripe {
  background: linear-gradient(yellow 30%, blue 0);
  background: linear-gradient(yellow 33.3%, blue 0 66.6%, yellowgreen 0);
  background-size: 100% 45px;
}
```

:::

### Linear Gradient

[Linear gradient](https://developer.mozilla.org/docs/Web/CSS/gradient/linear-gradient):

- `[<angle> | to <side-or-corner>]?, <color-stop-list>`.
- Default angle: `to bottom`.
- `0deg` angle: `to top`.
- `90deg` angle: `to right`.
- `-90deg` angle: `to left`.

```css
.linear-gradient {
  width: 300px;
  height: 150px;
  background-image: linear-gradient(
    45deg,
    white 100px,
    skyblue 100px 200px,
    white 200px
  );
  border: solid deepskyblue;
}
```

[![Linear Gradient](./figures/LinearGradient.png)](https://developer.mozilla.org/docs/Web/CSS/gradient/linear-gradient#composition_of_a_linear_gradient)

### Radial Gradient

[Radial gradient](https://developer.mozilla.org/docs/Web/CSS/gradient/radial-gradient):

- `[<ending-shape> || <size>]? [at <position>]?, <color-stop-list>`.
- `<ending-shape>`:
  - `ellipse` (initial value).
  - `circle`.
- `<size>`.
  - `closest-side`.
  - `farthest-side`.
  - `closest-corner`.
  - `farthest-corner`.
  - `<length>`: 单独一个值不能为 `<percentage>`.
  - `<length-percentage>{2}`.

[![Radial Gradient Size](./figures/RadialGradientSize.png)](https://developer.mozilla.org/docs/Web/CSS/gradient/radial-gradient#size)

```css
.radial-gradient {
  background-image: radial-gradient(50px, white, deepskyblue);
  background-image: radial-gradient(50px 50%, white, deepskyblue);
  background-image: radial-gradient(50% 50%, white, deepskyblue);
  background-image: radial-gradient(100px at 0 0, white, deepskyblue);
  background-image: radial-gradient(100px at left top, white, deepskyblue);
  background-image: radial-gradient(
    100px at right 100px bottom 100px,
    white,
    deepskyblue
  );
  background-image: radial-gradient(
    farthest-corner circle at right 100px bottom 100px,
    white,
    deepskyblue
  );
}
```

[![Radial Gradient](./figures/RadialGradient.png)](https://developer.mozilla.org/docs/Web/CSS/gradient/radial-gradient#composition_of_a_radial_gradient)

### Conic Gradient

[Conic gradient](https://developer.mozilla.org/docs/Web/CSS/gradient/conic-gradient):

- `[from <angle>]? [at <position>]?, <angular-color-stop-list>`.
- Default angle: `0deg`.

```css
.pie {
  width: 150px;
  height: 150px;
  background: conic-gradient(yellowgreen 40%, gold 0deg 75%, deepskyblue 0deg);
  border-radius: 50%;
}

.color-picker-wheel {
  width: 150px;
  height: 150px;
  background: radial-gradient(closest-side circle, gray, transparent),
    conic-gradient(red, magenta, blue, aqua, lime, yellow, red);
  border-radius: 50%;
}
```

[![Conic Gradient](./figures/ConicGradient.png)](https://developer.mozilla.org/docs/Web/CSS/gradient/conic-gradient#composition_of_a_conic_gradient)

### Gradient Reference

- Background gradient [loading spinner](https://css-tricks.com/single-element-loaders-the-spinner).
- Background gradient [shapes](https://css-tricks.com/drawing-images-with-css-gradients).

## CSS Object

### Object Fit

[`object-fit`](https://developer.mozilla.org/docs/Web/CSS/object-fit)
只对替换元素
([`replaced element`](https://developer.mozilla.org/docs/Web/CSS/Replaced_element))
有作用:

- `input`.
- `select`.
- `textarea`.
- `img`.
- `video`.
- `iframe`.
- `embed`.
- `object`.

[`object-fit`](https://developer.mozilla.org/docs/Web/CSS/object-fit)
是作用于 `replaced element` 的 `background-size`,
可以处理图片拉伸变形与 `Cumulative Layout Shift` 问题:

- `fill`.
- `contain`.
- `cover`.
- `none`.
- `scale-down`.

```css
.image-container {
  position: relative;
  padding-bottom: calc(2 / 3) * 100%; /* (height / width) ratio */
  overflow: hidden;
}

.image-container > img {
  position: absolute;
  width: 100%;
  max-width: 100%;
  height: 100%;
  object-fit: cover;
}

.image-container > .aspect-ratio {
  width: 100%;
  aspect-ratio: 16 / 9;
  object-fit: cover;
}

.flexbox-container {
  display: flex;
  gap: var(--space-gutter-s);
  align-items: flex-start;
  font-size: var(--text-size-meta);
}

.flexbox-container img.aspect-ratio {
  flex-shrink: 0;
  width: clamp(4rem, 30%, 6rem);
  aspect-ratio: 1 / 1;
  object-fit: cover;
  border-radius: 50%;
}
```

### Object Position

[`object-position`](https://developer.mozilla.org/docs/Web/CSS/object-position)
是作用于 `replaced element` 的 `background-position`:

```css
img {
  /* <percentage> values */
  object-position: 25% 75%;

  /* Keyword values */
  object-position: top;
  object-position: bottom;
  object-position: left;
  object-position: right;
  object-position: center;

  /* <length> values */
  object-position: 0 0;
  object-position: 1cm 2cm;
  object-position: 10ch 8em;

  /* Edge offsets values */
  object-position: bottom 10px right 20px;
  object-position: right 3em bottom 10px;
  object-position: top 0 right 10px;
}
```

### Replaced Media Size

Replaced media size [normalize style](#css-normalize):

```css
input,
textarea,
img,
video,
object {
  box-sizing: border-box;
  max-width: 100%;
  height: auto;
}
```

### Embed Object Container

```html
<div class="embed-container">
  <iframe
    src="http://www.youtube.com/embed/B1_N28DA3gY"
    frameborder="0"
    allowfullscreen
  ></iframe>
</div>

<style>
  .embed-container {
    position: relative;
    max-width: 100%;
    height: 0;
    height: auto;
    padding-bottom: 56.25%;
    overflow: hidden;
  }

  .embed-container iframe,
  .embed-container object,
  .embed-container embed {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
</style>
```

## CSS Shape

[CSS shapes](https://css-tricks.com/the-shapes-of-css):

- `aspect-ratio`.
- `border`.
- `box-shadow` (inset).
- Background:
  `position`/`size`/`color`/`image`/[`gradient`](https://css-tricks.com/drawing-images-with-css-gradients).
  In modern browsers,
  background shapes with `transition`/`transform` are better than pseudo elements.
- [`clip-path`](https://css-tricks.com/using-css-clip-path-create-interactive-effects).
- `mask`
- `filter`.
- SVG:
  - SVG icon.
  - SVG filter.
  - SVG clip-path.
  - SVG mask.
- [Pseudo elements](https://css-tricks.com/pseudo-element-roundup).

### Shape Outside

[`shape-outside`](https://developer.mozilla.org/docs/Web/CSS/shape-outside)
provides a way to customize wrapping effect for `float` element,
combined with
[`shape-margin`](https://developer.mozilla.org/docs/Web/CSS/shape-margin)
[`shape-image-threshold](https://developer.mozilla.org/docs/Web/CSS/shape-image-threshold)
making it possible to wrap text around complex objects rather than simple boxes:

```css
.shape {
  float: left;
  shape-outside: polygon(50% 0, 100% 50%, 50% 100%, 0 50%);
  shape-margin: 20px;
  shape-image-threshold: 20%;
}
```

### Clip

[`clip`](https://developer.mozilla.org/docs/Web/CSS/clip)
属性只对 `absolute` 与 `fixed` 元素起作用,
是对 `overflow` 属性的有力补充
(`overflow` 对于上述两种元素的裁剪作用有限):

- `auto`.
- `rect(<top-length>, <right-length>, <bottom-length>, <left-length>)`.
- `clip` 元素 `clientWidth`, `clientHeight`, `computedStyle` 保持不变:
  仅视觉上裁剪, 元素尺寸仍为原本尺寸, 原始布局仍然保留.
- `clip` 元素非可见部分无法响应点击事件.

```css
.fixed-clip {
  position: fixed;
  clip: rect(30px 200px 200px 20px);
}
```

### Clip Path

[`clip-path`](https://developer.mozilla.org/docs/Web/CSS/clip-path):

- `none`.
- `<url>`.
- `<geometry-box> || <basic-shape>`:
  - `<geometry-box>`:
    - `border-box`.
    - `padding-box`.
    - `content-box`.
    - `margin-box`.
    - `fill-box`.
    - `stroke-box`.
    - `view-box`.
  - [`<basic-shape>`](https://developer.mozilla.org/docs/Web/CSS/basic-shape):
    - [`inset(<length-percentage>{1,4} [round <'border-radius'>]?)`](https://developer.mozilla.org/docs/Web/CSS/basic-shape/inset).
    - [`circle([<shape-radius>]? [at <position>]?)`](https://developer.mozilla.org/docs/Web/CSS/basic-shape/circle).
    - [`ellipse([<shape-radius>{2}]? [at <position>]?)`](https://developer.mozilla.org/docs/Web/CSS/basic-shape/ellipse).
    - [`polygon([<fill-rule>,]? [<length-percentage> <length-percentage>]#)`](https://developer.mozilla.org/docs/Web/CSS/basic-shape/polygon).
    - [`path([<fill-rule>,]? <string>)`](https://developer.mozilla.org/docs/Web/CSS/path).
- `clip-path` 元素 `clientWidth`, `clientHeight`, `computedStyle` 保持不变:
  仅视觉上裁剪, 元素尺寸仍为原本尺寸, 原始布局仍然保留.
- `clip-path` 元素非可见部分无法响应点击事件.
- [`<fill-rule>`](https://developer.mozilla.org/docs/Web/SVG/Attribute/fill-rule)
  用于确定复杂路径构成的图形的内部与外部, 内部填充, 外部透明.

![NonZero Fill Rule](./figures/FillRuleNonZero.png 'NonZero Fill Rule')

![EvenOdd Fill Rule](./figures/FillRuleEvenOdd.png 'EvenOdd Fill Rule')

```css
.clip-path {
  clip-path: inset(10% 20% 30% 40%);
  clip-path: circle(50% at 50% 50%);
  clip-path: ellipse(50% 25% at 50% 50%);
  clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
  clip-path: path('M 0 0 L 100 0 L 100 100 L 0 100 Z');
}
```

### Mask

[`mask`](https://developer.mozilla.org/docs/Web/CSS/mask):

- 元素应用 `mask` 属性遮罩效果后, 透明部分仍然可以响应点击事件.

#### Mask Image

[`mask-image`](https://developer.mozilla.org/docs/Web/CSS/mask-image):

- `none`.
- `<url>#`.
- `<gradient>#`.
- `<image()>`.
- `<image-set()>`.
- `<paint()>`.
- `<element()>`.
- `<cross-fade()>`.

#### Mask Mode

[`mask-mode`](https://developer.mozilla.org/docs/Web/CSS/mask-mode):

- `match-source`:
  根据 `mask-image` 类型自动选择模式,
  SVG `<mask>` 元素 (`url(#mask-id)`) 为 `luminance` 模式,
  其余场景 (包括 `url('mask.svg')`) 为 `alpha` 模式.
- `alpha`:
  基于透明度进行遮罩,
  `alpha(100%)` for show,
  `transparent` for hidden.
- `luminance`:
  基于亮度进行遮罩,
  `alpha(100%)` 且为亮色 for show,
  `alpha(100%)` 且为暗色 for hidden,
  `transparent` for hidden.

[![Alpha SVG Mask](./figures/AlphaSVGMask.webp)](https://css-tricks.com/almanac/properties/m/mask-mode/#aa-alpha-masks)

[![Luminance SVG Mask](./figures/LuminanceSVGMask.webp)](https://css-tricks.com/almanac/properties/m/mask-mode/#aa-luminance-masks)

```css
img.alpha-mask {
  mask-image: linear-gradient(black, transparent);
  mask-mode: alpha;
}
```

[![Alpha Gradient Mask](./figures/AlphaGradientMask.webp)](https://css-tricks.com/almanac/properties/m/mask-mode/#aa-alpha-masks)

[![Luminance Gradient Mask](./figures/LuminanceGradientMask.webp)](https://css-tricks.com/almanac/properties/m/mask-mode/#aa-luminance-masks)

#### Mask Type

[`mask-type`](https://developer.mozilla.org/docs/Web/CSS/mask-type),
用于设置 SVG `<mask>` 元素的遮罩模式:

- `luminance`.
- `mask`.

#### Mask Repeat

[`mask-repeat`](https://developer.mozilla.org/docs/Web/CSS/mask-repeat):

| Single Value | Two Value Equivalent  |
| ------------ | --------------------- |
| `no-repeat`  | `no-repeat no-repeat` |
| `repeat-x`   | `repeat no-repeat`    |
| `repeat-y`   | `no-repeat repeat`    |
| `repeat`     | `repeat repeat`       |
| `space`      | `space space`         |
| `round`      | `round round`         |

#### Mask Position

[`mask-position`](https://developer.mozilla.org/docs/Web/CSS/mask-position):

```css
.mask-position {
  /* Keyword values */
  mask-position: center;
  mask-position: top right;
  mask-position: bottom left;

  /* <length-percentage> values */
  mask-position: 25% 75%;
  mask-position: 0 0;
  mask-position: 10% 8em;
}
```

#### Mask Clip

[`mask-clip`](https://developer.mozilla.org/docs/Web/CSS/mask-clip):

- `border-box`.
- `padding-box`.
- `content-box`.
- `margin-box`.
- `fill-box`.
- `stroke-box`.
- `view-box`.
- `no-clip`.

#### Mask Origin

[`mask-origin`](https://developer.mozilla.org/docs/Web/CSS/mask-origin):

- `border-box`.
- `padding-box`.
- `content-box`.
- `margin-box`.
- `fill-box`.
- `stroke-box`.
- `view-box`.

#### Mask Size

[`mask-size`](https://developer.mozilla.org/docs/Web/CSS/mask-size)

- `auto{1,2}`.
- `cover`.
- `contain`.
- `<length-percentage>{12}`.

#### Mask Composite

[`mask-composite`](https://developer.mozilla.org/docs/Web/CSS/mask-composite):

- `add`:
  所有遮罩图片直接合成一个完整的遮罩.
- `subtract`:
  顶层遮罩图片中, 与底层遮罩图片重合的区域不显示遮罩.
- `intersect`:
  顶层遮罩图片中, 与底层遮罩图片重合的区域才显示遮罩.
- `exclude`:
  遮罩图片重合的区域被当作透明区域 (`transparent`),
  其余区域直接合成一个完整的遮罩 (`add`).
- `mask-image` 中语法越靠后的遮罩图片层叠等级越低.

```css
.masked {
  width: 100px;
  height: 100px;
  background-color: #8cffa0;
  mask-image: url('https://mdn.mozillademos.org/files/12668/MDN.svg'),
    url('https://mdn.mozillademos.org/files/12676/star.svg');
  mask-size: 100% 100%;
  mask-composite: add;
}
```

## CSS Filter and Blend

### Filter

[`filter`](https://developer.mozilla.org/docs/Web/CSS/filter):

```css
.filter {
  filter: blur(5px); /* 模糊 */
  filter: brightness(240%); /* 亮度 */
  filter: contrast(200%); /* 对比度 */
  filter: drop-shadow(16px 16px 20px blue); /* 投影 */
  filter: grayscale(50%); /* 灰度 */
  filter: hue-rotate(90deg); /* 色相旋转 */
  filter: invert(75%); /* 反相 (颜色翻转) */
  filter: opacity(25%); /* 透明度 */
  filter: saturate(30%); /* 饱和度 */
  filter: sepia(60%); /* 褐色 (老照片) */
  filter: url('resources.svg'); /* 引用 SVG filter 元素 */

  /* Apply multiple filters */
  filter: contrast(175%) brightness(3%);
}
```

:::tip Drop Shadow

`filter: drop-shadow()`:

- 不支持多重阴影.
- 不支持内阴影.
- 不支持扩展阴影.
- 阴影会**自动贴合形状**:
  - 伪元素.
  - 自定义边框.
  - 背景渐变.
  - SVG 元素.

:::

### Backdrop Filter

[`backdrop-filter`](https://developer.mozilla.org/docs/Web/CSS/backdrop-filter):

让当前元素所在区域后面的内容应用滤镜效果.

```css
.dropdown-list {
  background: hsl(0deg 0% 100% / 75%);
  backdrop-filter: blur(5px);
}
```

若当前浏览器不支持 `backdrop-filter`,
可使用 pseudo element + `filter` 进行模拟:

```css
/* 设置两张重合图片 */
body,
main::before {
  background: url('tiger.jpg') 0 / cover fixed;
}

main {
  position: relative;
  overflow: hidden;
  background: hsl(0deg 0% 100% / 30%);
}

/* 模糊文字背景图片 */
main::before {
  position: absolute;
  inset: 0;
  margin: -30px;
  content: '';
  filter: blur(20px);
}
```

### Blend Mode

[`<blend-mode>`](https://developer.mozilla.org/docs/Web/CSS/blend-mode):

- `multiply`:
  - 正片叠底: $C=\frac{A \cdot B}{255}$.
  - 混合黑色变黑色.
  - 混合白色不变色.
  - 混合后颜色变暗.
- `screen`:
  - 滤色: $C=255-\frac{(255-A)(255-B)}{255}$.
  - 混合黑色不变色.
  - 混合白色变白色.
  - 混合后颜色变亮.
- `darken`/`lighten`:
  - 变暗: $C=\min(A, B)$.
  - 变亮: $C=\max(A, B)$.
  - 可用于实现渐变文字.
- `color-dodge`:
  - 颜色变淡: $C=A+\frac{A \cdot B}{255-B}$.
  - 可用于保护底图的高光, 适合处理高光下的人物照片:
    通过将照片和特定颜色混合, 可以改变整个照片的色调 (暖色调或是冷色调),
    同时不会影响人物高光区域的细节.
- `color-burn`:
  - 颜色加深: $C=A-\frac{(255-A)(255-B)}{B}$.
  - 可用于保护底图的阴影, 适合处理阴影丰富的照片:
    通过将照片和特定颜色混合, 可以营造更加幽深的氛围.
- `overlay`:
  - 叠加 ($A$ 为底图的色值):
    - $A\leqslant128$: $C=\frac{A \cdot B}{128}$.
    - $A\gt128$: $C=255-\frac{(255-A)(255-B)}{128}$.
  - 底图的阴影 (黑色)和高光 (白色) 的颜色会被保留,
    其他颜色的饱和度和对比度提高, 混合后的图像会更加鲜亮.
- `hard-light`:
  - 强光 ($A$ 为底图的色值):
    - $B\leqslant128$: $C=\frac{A \cdot B}{128}$.
    - $B\gt128$: $C=255-\frac{(255-A)(255-B)}{128}$.
  - 图像亮的地方更亮, 暗的地方更暗.
- `soft-light`:
  - 柔光 ($A$ 为底图的色值):
    - $B\leqslant128$: $C=\frac{A \cdot B}{128}+(\frac{A}{255})^2(255-2\cdot B)$.
    - $B\gt128$: $C=255-\frac{(255-A)(255-B)}{128}$.
  - 图像亮的地方轻微变亮, 暗的地方轻微变暗.
- `difference`:
  - 差值: $C=|A-B|$.
  - 若上层元素为 `white`, 则最终混合的颜色是底层元素颜色的反色.
- `exclusion`:
  - 排除: $C=A+B-\frac{A \cdot B}{128}$.
- `hue`:
  - 色相混合.
  - 混合后的颜色保留底图的饱和度和亮度, 使用顶图的色相.
  - 将照片和渐变色进行色相混合, 可让照片呈现出丰富多彩的色调效果.
- `saturation`:
  - 饱和度混合.
  - 混合后的颜色保留底图的色相和亮度, 使用顶图的饱和度.
- `luminosity`:
  - 亮度混合.
  - 混合后的颜色保留底图的色相和饱和度, 使用顶图的亮度.
  - 当底图是渐变图像或纯色图像, 上层元素是复杂图像时, 适合使用亮度混合模式.
- `color`:
  - 颜色混合.
  - 混合后的颜色保留底图的亮度, 使用顶图的色相和饱和度.
  - 通过使用 CSS 渐变让照片的色调变得丰富.

### Mix Blend Mode

[`mix-blend-mode`](https://developer.mozilla.org/docs/Web/CSS/mix-blend-mode):

- Used for multiple elements, e.g text styles.
- 通常把混合模式设置在顶层元素上:
  当元素应用了混合模式时,
  该元素会混合 `z` 轴上所有层叠顺序比其低的层叠元素.
- `multiply`: `black` is cutout (keep `black`).
- `screen`: `white` is cutout (keep `white`).

```html
<div class="background">
  <h1>Even More CSS Secrets</h1>
</div>

<style>
  .background {
    background-image: url('bg.png');
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
  }

  .background h1 {
    color: white; /* keep white */
    background-color: black; /* mix with background */
    mix-blend-mode: screen; /* screen or multiply  */
  }
</style>
```

### Background Blend Mode

[`background-blend-mode`](https://developer.mozilla.org/docs/Web/CSS/background-blend-mode)

- Used for multiple `background-image`.

```css
.box {
  background: url('pic1.png'), url('pic2.png');
  background-size: cover;
  background-blend-mode: lighten; /* lighten, lighten */
}

.gradient-icon {
  background: linear-gradient(deepskyblue, deeppink), url('icon.png'), white;
  background-blend-mode: lighten, normal;
}
```

### Filter and Blend Reference

- Instagram [filters](https://github.com/una/CSSgram).
- Image [effects](https://github.com/bennettfeely/image-effects).
- PhotoShop blending modes [ultimate guide](https://www.slrlounge.com/photoshop-blending-modes).

## SVG

### SVG Size

Shape will zoom to fill size of SVG `width` and `height`:

```html
<!-- viewBox = <min-x> <min-y> <width> <height> -->
<svg width="198px" height="188px" viewBox="0 0 99 94"></svg>
```

### SVG Fill

```html
<svg
  width="100px"
  height="100px"
  viewBox="0 0 100 100"
  version="1.1"
  xmlns="..."
>
  <title>My Awesome SVG</title>
  <circle class="circle" cx="50" cy="50" r="50" fill="#FFFF00" />
</svg>

<style>
  .circle {
    fill: currentcolor;
    fill-opacity: 0.5;
    fill-rule: nonzero;
  }
</style>
```

### SVG Stroke

```css
circle {
  stroke: blue;
  stroke-dasharray: 14px 4px 4px 4px; /* 实色长度 透明长度 实色长度 透明长度 ... */
  stroke-dashoffset: 0;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-opacity: 0.5;
  stroke-width: 2px;
  paint-order: stroke;
  vector-effect: non-scaling-stroke;
}
```

[![Stroke Linecap](./figures/StrokeLinecap.png)](https://developer.mozilla.org/docs/Web/SVG/Attribute/stroke-linecap)

[![Stroke Linejoin](./figures/StrokeLinejoin.png)](https://developer.mozilla.org/docs/Web/SVG/Attribute/stroke-linejoin)

[![Stroke Dasharray](./figures/StrokeDasharray.png)](https://developer.mozilla.org/docs/Web/SVG/Attribute/stroke-dasharray)

利用 `stroke-dasharray` 与 `stroke-dashoffset` 实现[动画线条](https://codepen.io/Chokcoco/pen/gOOKYmV):

```html
<a class="container">
  <svg height="100%" width="100%" xmlns="http://www.w3.org/2000/svg">
    <rect class="outline" height="100%" width="100%" />
    <div class="text">SVG Animations</div>
  </svg>
</a>

<style>
  .container .outline {
    stroke-dasharray: 25 25;
    stroke-dashoffset: -588;
  }

  .container:hover .outline {
    stroke-dasharray: 50 50;
    stroke-dashoffset: -275;
  }
</style>
```

### SVG Marker

[`<marker>`](https://developer.mozilla.org/docs/Web/SVG/Element/marker):

```css
polyline {
  marker-start: url('#marker-circle');
  marker-mid: url('#marker-circle');
  marker-end: url('#marker-arrow');
}
```

### SVG Shape

- Rectangles and squares: `<rect>`.
- Circles: `<circle>`.
- Ellipse: `<ellipse>`.
- Line: `<line>`.
- Polyline: `<polyline>`.
- Polygon: `<polygon>`.
- Path: `<path>`.

### SVG Text

The text tag `<text>` is used to create **selectable** and **accessible** text:

```css
text {
  /* SVG text vertical alignment */
  dominant-baseline: auto;
  dominant-baseline: middle;
  dominant-baseline: central;
  dominant-baseline: text-top;
  dominant-baseline: text-bottom;
  dominant-baseline: alphabetic;
  dominant-baseline: hanging;
  dominant-baseline: ideographic;
  dominant-baseline: mathematical;

  /* SVG text horizontal alignment */
  text-anchor: start;
  text-anchor: middle;
  text-anchor: end;
}
```

### SVG Title

The title `<title>` and description `<desc>` tags
are specifically for providing accessibility content.

### SVG Group

The group tag `<g>` is used to group elements together
to add class names and apply animations, filters, patterns and effects
to a group of elements.

### SVG Defs

The defs tag `<defs>` is used to define elements for later reuse.
This is where you create
**marker**, **patterns**, **filters**, **masks**
to be reused later.
This is also used to create **icon systems**.

```html
<svg width="0" height="0" style="position: absolute">
  <defs>
    <marker
      id="marker-circle"
      markerWidth="8"
      markerHeight="8"
      refX="4"
      refY="4"
    >
      <circle cx="4" cy="4" r="2.5" />
    </marker>
    <marker
      id="marker-arrow"
      markerWidth="12"
      markerHeight="12"
      refX="2"
      refY="6"
      orient="auto"
    >
      <path d="M2,3 L2,10 L8,6 L2,3" />
    </marker>
  </defs>
  <defs>
    <filter id="blur">
      <feGaussianBlur in="SourceGraphic" stdDeviation="5" />
    </filter>
  </defs>
</svg>
```

### SVG Path

[SVG path text](https://codepen.io/Chokcoco/pen/NEpqMK):

```html
<div class="circle-word">
  <svg
    width="400px"
    height="300px"
    viewBox="0 0 400 200"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <path
        id="textCircle"
        d="M 20 100 A 80 80 0 0 0 180 100 A 80 80 0 0 0 20 100"
        fill="none"
        stroke="#333"
      ></path>
    </defs>
    <text class="textCircle" fill="yellowgreen">
      <textPath
        xmlns:xlink="http://www.w3.org/1999/xlink"
        xlink:href="#textCircle"
      >
        这是一段随着 path 路径绘制的文字
      </textPath>
    </text>
  </svg>
</div>
```

### SVG Clip Path

<!-- markdownlint-disable line-length -->

```html
<svg class="svg">
  <clipPath id="circle" clipPathUnits="objectBoundingBox">
    <path
      d="M0.5,0 C0.776,0,1,0.224,1,0.5 C1,0.603,0.969,0.7,0.915,0.779 C0.897,0.767,0.876,0.76,0.853,0.76 C0.794,0.76,0.747,0.808,0.747,0.867 C0.747,0.888,0.753,0.908,0.764,0.925 C0.687,0.972,0.597,1,0.5,1 C0.224,1,0,0.776,0,0.5 C0,0.224,0.224,0,0.5,0"
    />
  </clipPath>
</svg>
```

<!-- markdownlint-enable line-length -->

```css
.item {
  clip-path: url('#circle');
}
```

### SVG Mask

Avatar with circle status indicator:

```html
<svg role="none">
  <mask id="circle">
    <circle fill="white" cx="100" cy="100" r="100"></circle>
    <circle fill="black" cx="86%" cy="86%" r="18"></circle>
  </mask>
  <g mask="url(#circle)">
    <image
      x="0"
      y="0"
      width="100%"
      height="100%"
      xlink:href="avatar.jpg"
    ></image>
    <circle
      fill="none"
      cx="100"
      cy="100"
      r="100"
      stroke="rgb(0 0 0 / 10%)"
      stroke-width="2"
    ></circle>
  </g>
</svg>
```

### SVG Filter

内投影滤镜:

```html
<svg
  width="300"
  height="300"
  viewBox="0 0 20 20"
  style="position: absolute; left: -999px"
>
  <filter id="inset-shadow">
    <!-- 投影偏移 -->
    <feOffset dx="0" dy="0" />
    <!-- 投影模糊 -->
    <feGaussianBlur stdDeviation="6" result="offset-blur" />
    <!-- 反转投影使其变成内投影 -->
    <feComposite
      operator="out"
      in="SourceGraphic"
      in2="offset-blur"
      result="inverse"
    />
    <!-- 内投影附加黑色 -->
    <feFlood flood-color="black" flood-opacity=".95" result="color" />
    <feComposite operator="in" in="color" in2="inverse" result="shadow" />
    <!-- 把内投影显示在图像上 -->
    <feComposite operator="over" in="shadow" in2="SourceGraphic" />
  </filter>
</svg>
```

毛玻璃滤镜:

```html
<svg width="0" height="0" style="position: absolute">
  <filter id="blur" color-interpolation-filters="sRGB">
    <feGaussianBlur stdDeviation="6" edgeMode="duplicate" />
    <feComponentTransfer>
      <feFuncA type="discrete" tableValues="0 1" />
    </feComponentTransfer>
  </filter>
</svg>
```

SVG
[glitch](https://github.com/chokcoco/iCSS/issues/78)
[filter](https://github.com/chokcoco/cnblogsArticle/issues/27):

```html
<svg>
  <defs>
    <filter id="fe1">
      <feTurbulence
        id="animation"
        type="fractalNoise"
        baseFrequency="0.00001 9.9999999"
        numOctaves="1"
        result="warp"
      >
        <animate
          attributeName="baseFrequency"
          from="0.00001 9.9999"
          to="0.00001 0.001"
          dur="2s"
          repeatCount="indefinite"
        />
      </feTurbulence>
      <feOffset dx="-90" dy="-90" result="warpOffset"></feOffset>
      <feDisplacementMap
        xChannelSelector="R"
        yChannelSelector="G"
        scale="30"
        in="SourceGraphic"
        in2="warpOffset"
      ></feDisplacementMap>
    </filter>
    <filter id="fe2">
      <feTurbulence
        id="animation"
        type="fractalNoise"
        baseFrequency="9.9999999 0.00001"
        numOctaves="1"
        result="warp"
      >
        <animate
          attributeName="baseFrequency"
          from="9.9999999 0.00001"
          to="0.009 0.00001"
          dur="2s"
          repeatCount="indefinite"
        />
      </feTurbulence>
      <feOffset dx="-90" dy="-90" result="warpOffset"></feOffset>
      <feDisplacementMap
        xChannelSelector="R"
        yChannelSelector="G"
        scale="30"
        in="SourceGraphic"
        in2="warpOffset"
      ></feDisplacementMap>
    </filter>
  </defs>
</svg>
```

### SVG Animation

#### SVG CSS Animation

CSS animation on SVG properties:

```css
circle {
  animation: zoom-in-out 1s infinite alternate;
}

@keyframes zoom-in-out {
  from {
    r: 60px;
  }

  to {
    r: 75px;
  }
}
```

#### SVG SMIL Animation

SVG [SMIL animation](https://css-tricks.com/guide-svg-animations-smil):

```html
<svg width="360" height="200" xmlns="http://www.w3.org/2000/svg">
  <text font-family="microsoft yahei" font-size="40" x="0" y="0" fill="#cd0000">
    马
    <animateMotion
      path="M10,80 q100,120 120,20 q140,-50 160,0"
      begin="0s"
      dur="3s"
      rotate="auto"
      repeatCount="indefinite"
    />
  </text>
  <path
    d="M10,80 q100,120 120,20 q140,-50 160,0"
    stroke="#cd0000"
    stroke-width="2"
    fill="none"
  />
</svg>
```

### SVG API

```ts
const svgElement = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
const svgRectElement = document.createElementNS(
  'http://www.w3.org/2000/svg',
  'rect'
)
```

### SVG Reference

- SVG filter complete [guide](https://blog.logrocket.com/complete-guide-using-css-filters-svgs).

## Media Query

- Logical operators + media types + media features.
- Only for improving compatibility with older browsers.
- Definition order matters when media query with a different selector.
- JavaScript API: `window.matchMedia()`.

```css
/* screen size : 500px ~ 1000px */
@media only screen and (width >= 500px) and (width <= 1000px) {
  .container {
    width: 750px;
  }
}
```

### Media Logical Query

[Logical operators](https://developer.mozilla.org/docs/Web/CSS/@media#logical_operators)

- `only`: only specific media type.
- `not`: negate entire media query.
- `and`: all.
- `,`: any.

[CSS Media Queries Level 4](https://developer.mozilla.org/docs/Web/CSS/Media_Queries/Using_media_queries#syntax_improvements_in_level_4):

```css
@media (height > 600px) {
  body {
    line-height: 1.4;
  }
}

@media (400px <= width <= 700px) {
  body {
    line-height: 1.4;
  }
}
```

### Media Type Query

[Media types](https://developer.mozilla.org/docs/Web/CSS/@media#media_types):

| Type                 | Query                                    |
| :------------------- | :--------------------------------------- |
| all                  | 所有设备                                 |
| print                | 文档打印或打印预览模式                   |
| screen               | 彩色电脑屏幕                             |
| **Deprecated Query** |                                          |
| braille              | 盲文                                     |
| embossed             | 盲文打印                                 |
| handheld             | 手持设备                                 |
| projection           | 项目演示, 比如幻灯                       |
| speech               | 演讲                                     |
| tty                  | 固定字母间距的网格的媒体, 比如电传打字机 |
| tv                   | 电视                                     |

### Media Feature Query

[Media features](https://developer.mozilla.org/docs/Web/CSS/@media#media_features):

| Feature             | Value                   | Min/Max | Query              |
| :------------------ | :---------------------- | :------ | :----------------- |
| grid                | `<integer>`             | no      | 是否基于格栅的设备 |
| orientation         | `portrait`/`landscape`  | no      | 横屏或竖屏         |
| aspect-ratio        | `<integer>`/`<integer>` | yes     | 渲染界面宽高比例   |
| device-aspect-ratio | `<integer>`/`<integer>` | yes     | 设备屏幕宽高比例   |
| monochrome          | `<integer>`             | yes     | 缓冲器中每像素字节 |
| resolution          | `<resolution>`          | yes     | 分辨率             |
| width               | `<length>`              | yes     | 渲染界面的宽度     |
| height              | `<length>`              | yes     | 渲染界面的高度     |
| device-width        | `<length>`              | yes     | 设备屏幕的输出宽度 |
| device-height       | `<length>`              | yes     | 设备屏幕的输出高度 |
| color               | `<integer>`             | yes     | 每种色彩的字节数   |
| color-index         | `<integer>`             | yes     | 色彩表中的色彩数   |

### Print Device Query

```css
@media print {
  header,
  footer {
    display: none;
  }

  table {
    color-adjust: exact;
  }

  h2 {
    break-before: page;
  }
}
```

- Page style standard [specification](https://developer.mozilla.org/docs/Web/CSS/@page).
- PDF style [tutorial](https://www.smashingmagazine.com/2015/01/designing-for-print-with-css).

### Hover and Pointer Device Query

| Hover Query | Pointer Query | Device                                 |
| ----------- | ------------- | -------------------------------------- |
| none        | coarse        | smartphones, touch screens             |
| none        | fine          | stylus-based screens                   |
| hover       | coarse        | smart TVs, video game consoles         |
| hover       | fine          | desktop computers, laptops, touch pads |

#### Hover Device Query

`hover`/`any-hover`:

- `none`.
- `hover`.

```html
<a href="#">Try hovering over me!</a>

<style>
  @media (hover: hover) {
    a:hover {
      background: yellow;
    }
  }

  @media (any-hover: hover) {
    a:hover {
      background: yellow;
    }
  }
</style>
```

#### Pointer Device Query

`pointer`/`any-pointer`:

- `none`: no pointer device (e.g phones).
- `coarse`: limited accuracy pointer device (e.g smart TV, video game consoles).
- `fine`: accurate pointer device (e.g mouse, touch pads, stylus).

```html
<input id="test" type="checkbox" /> <label for="test">Look at me!</label>

<style>
  input[type='checkbox'] {
    margin: 0;
    appearance: none;
    border: solid;
  }

  input[type='checkbox']:checked {
    background: gray;
  }

  @media (pointer: fine) {
    input[type='checkbox'] {
      width: 15px;
      height: 15px;
      border-color: blue;
      border-width: 1px;
    }
  }

  @media (pointer: coarse) {
    input[type='checkbox'] {
      width: 30px;
      height: 30px;
      border-color: red;
      border-width: 2px;
    }
  }

  @media (any-pointer: fine) {
    input[type='checkbox'] {
      width: 15px;
      height: 15px;
      appearance: none;
      border: 1px solid blue;
    }
  }

  @media (any-pointer: coarse) {
    input[type='checkbox'] {
      width: 30px;
      height: 30px;
      appearance: none;
      border: 2px solid red;
    }
  }
</style>
```

### Foldable Device Query

[`viewport-segments`](https://github.com/MicrosoftEdge/MSEdgeExplainers/blob/main/Foldables/explainer.md):

<!-- markdownlint-disable MD013 -->

```css
/* stylelint-disable-next-line media-feature-name-no-unknown */
@media (horizontal-viewport-segments <= 2) and (vertical-viewport-segments <= 1) {
  main article {
    flex: 1 1 env(viewport-segment-width 0 0);
  }

  main aside {
    flex: 1;
  }
}
```

<!-- markdownlint-enable MD013 -->

### Display Mode Query

[`display-mode`](https://developer.mozilla.org/docs/Web/CSS/@media/display-mode):

- `fullscreen`.
- `standalone`.
- `minimal-ui`.
- `browser`.

```css
@media all and (display-mode: fullscreen) {
  body {
    margin: 0;
    border: 5px solid black;
  }
}
```

### Resolution Query

[`<resolution>`](https://developer.mozilla.org/docs/Web/CSS/resolution):

- `<number>dpi`.
- `<number>dpcm`.
- `<number>x`/`<number>dppx`: `1dppx` = `96dpi`.

```css
/* Exact resolution */
@media (resolution <= 150dpi) {
  p {
    color: red;
  }
}

/* Minimum resolution */
@media (resolution >= 72dpi) {
  p {
    text-decoration: underline;
  }
}

/* Maximum resolution */
@media (resolution <= 300dpi) {
  p {
    background: yellow;
  }
}
```

### Contrast Query

`prefers-contrast`:

- `less`.
- `more`.

```css
@media (prefers-contrast: no-preference) {
  html {
    color: #333;
    background-color: #eee;
  }
}

@media (prefers-contrast: more) {
  html {
    color: #000;
    background-color: white;
  }
}

@media (prefers-contrast: less) {
  html {
    color: #555;
    background: conic-gradient(from 90deg at 50% -10%, #bbb, 50%, #999, #bbb);
  }
}
```

### Color Scheme Query

`prefers-color-scheme`:

- `no-preference`.
- `light`.
- `dark`.

```css
html {
  color-scheme: light dark; /* This site supports both light and dark mode */
}

:root {
  /* light styles */
  color-scheme: var(--color-scheme, light);

  --primary-color: black;
  --primary-background: white;

  /* page preference is "dark" */
  &:has(#color-scheme option[value='dark']:checked) {
    --color-scheme: dark;

    /* any additional dark styles */
    --primary-color: white;
    --primary-background: black;
  }

  /* page preference is "system", and system preference is "dark" */
  @media (prefers-color-scheme: dark) {
    &:has(#color-scheme option[value='system']:checked) {
      --color-scheme: dark;

      /* any additional dark styles, again */
      --primary-color: white;
      --primary-background: black;
    }
  }
}

body {
  color: var(--primary-color);
  background: var(--primary-background);
}
```

```ts
const ColorSchemeStorageItemName = 'preferredColorScheme'

/*
 * If a color scheme preference was previously stored,
 * select the corresponding option in the color scheme preference UI
 * unless it is already selected.
 */
function restoreColorSchemePreference() {
  const colorScheme = localStorage.getItem(ColorSchemeStorageItemName)

  if (!colorScheme) {
    // There is no stored preference to restore
    return
  }

  const option = colorSchemeSelectorEl.querySelector(`[value=${colorScheme}]`)

  if (!option) {
    // The stored preference has no corresponding option in the UI.
    localStorage.removeItem(ColorSchemeStorageItemName)
    return
  }

  if (option.selected) {
    // The stored preference's corresponding menu option is already selected
    return
  }

  option.selected = true
}

/*
 * Store an event target's value in localStorage under ColorSchemeStorageItemName
 */
function storeColorSchemePreference({ target }) {
  const colorScheme = target.querySelector(':checked').value
  localStorage.setItem(ColorSchemeStorageItemName, colorScheme)
}

function main() {
  const colorSchemeSelectorEl = document.querySelector('#color-scheme')

  if (colorSchemeSelectorEl) {
    restoreColorSchemePreference()
    colorSchemeSelectorEl.addEventListener('input', storeColorSchemePreference)
  }
}
```

3 mode switch:

```html
<select name="color-scheme-">
  <option value="system">System</option>
  <option value="light">Forced Light</option>
  <option value="dark">Forced Dark</option>
</select>

<script>
  document.querySelector('color-scheme').addEventListener('change', (e) => {
    document.documentElement.setAttribute(
      'data-force-color-mode',
      e.target.value,
    )
    localStorage.setItem('preferredColorScheme', e.target.value)
  })

  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
  mediaQuery.addListener(() => {
    // Make sure the dropdown is up-to-date based on mediaQuery.matches
  })
</script>

<style>
  :root,
  :root[data-force-color-mode='light'] {
    /* Default Light Mode colors + Forced Light Mode */
    --primary-color: black;
    --primary-background: white;
  }

  /* Dark Color Scheme (System Preference) */
  @media (prefers-color-scheme: dark) {
    :root {
      --primary-color: white;
      --primary-background: black;
    }
  }

  /* Dark Color Scheme (Override) */
  :root[data-force-color-mode='dark'] {
    --primary-color: white;
    --primary-background: black;
  }
</style>
```

### Reduced Motion Query

`prefers-reduced-motion`:

- `no-preference`.
- `reduce`.

```css
@media (prefers-reduced-motion: reduce) {
  .animated {
    animation: none;
  }
}

@media (prefers-reduced-motion: reduce) {
  *,
  ::before,
  ::after {
    background-attachment: initial !important;
    transition-delay: 0s !important;
    transition-duration: 0s !important;
    animation-duration: 1ms !important;
    animation-delay: -1ms !important;
    animation-iteration-count: 1 !important;
    scroll-behavior: auto !important;
  }
}
```

### Scripting Query

[`scripting`](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/scripting):

```css
@media (scripting: enabled) {
  .my-element {
    /* enhanced styles if JS is available */
  }
}

@media (scripting: none) {
  .my-element {
    /* fallback styles when JS is not supported */
  }
}

@media (scripting: enabled) and (prefers-reduced-motion: no-preference) {
  /* JS available and motion OK */
}

@media (scripting: none), (prefers-reduced-motion) {
  /* JS disabled or reduced motion enabled */
}
```

### Media Query Support Detection

Detecting media query support in CSS:

```css
/* stylelint-disable-next-line media-feature-name-no-unknown */
@media not all and (prefers-reduced-data), (prefers-reduced-data) {
  color: blue;
}
```

- No support:
  not all and (prefers-reduced-data): false,
  (prefers-reduced-data): false,
  Combined: false.
- Support, but off:
  not all and (prefers-reduced-data): true,
  (prefers-reduced-data): false,
  Combined: true.
- Support, and on:
  not all and (prefers-reduced-data): false,
  (prefers-reduced-data): true,
  Combined: true.

Detecting media query support in JavaScript:

```ts
const query = '(prefers-reduced-data)'

// window.matchMedia(query).media return 'not all' or original query string
const resolvedMediaQuery = window.matchMedia(query).media

const isSupported = query === resolvedMediaQuery
```

### Media Query API

Media query [`matchMedia`](https://developer.mozilla.org/docs/Web/API/Window/matchMedia):

```ts
// https://developer.mozilla.org/docs/Web/API/MediaQueryList
const mql = window.matchMedia(mediaQueryString)
```

```ts
if (window.matchMedia('(min-width: 400px)').matches) {
  /* the view port is at least 400 pixels wide */
} else {
  /* the view port is less than 400 pixels wide */
}
```

[Respond to media query changes](https://polypane.app/blog/the-complete-guide-to-css-media-queries/#using-media-queries-in-javascript):

```ts
const match = window.matchMedia('(min-width: 400px)')

match.addEventListener('change', (e) => {
  if (e.matches) {
    /* do a thing */
  } else {
    /* do another thing */
  }
})
```

## Container Query

### Container Size Query

当组件出现在同一视口大小 (viewport) 页面下的不同地方时,
e.g `.main > .button` vs `.sidebar > .button`,
此时 `@media` 无法有效实现响应式组件,
使用 `@container` 可以有效实现响应式组件:

```css
.sidebar {
  container-type: inline-size;
  container-name: sidebar;
}

@container sidebar (min-width: 400px) {
  .card {
    display: grid;
    grid-template-columns: 2fr 1fr;
  }
}
```

### Container Style Query

`@container` [style query](https://una.im/style-queries) direct parent:

```css
@container style(color: hotpink) {
  .card {
    background: white;
  }
}

@container style(font-style: italic) {
  span,
  i,
  .etc {
    background: lavender;
  }
}

@container style(border-color: lightblue) {
  button {
    border-color: royalblue;
  }
}

@container style(--theme: dark) {
  .card {
    color: white;
    background: royalblue;
    border-color: navy;
  }

  .card button {
    color: white;
    background-color: dodgerblue;
    border-color: navy;
  }
}

/* Update the theme on hover */
.card:hover,
.card:focus {
  --theme: dark-hover;
}

/* Apply darkHover theme styles */
@container style(--theme: dark-hover) {
  .card {
    background: dodgerblue;
    border-color: navy;
  }

  .card button {
    background-color: royalblue;
    border-color: lightblue;
  }
}

@container (min-width: 420px) and style(--highlight: true) {
  /* Styles for only highlight components at a minimum width of 420px */
  .title {
    color: var(--highlight-color);
  }
}
```

`@container` style query non-direct parent:

```html
<ul class="card-list">
  <li class="card-container">
    <div class="card"></div>
  </li>
</ul>

<style>
  .card-list {
    container-name: cards;
  }

  @container cards style(--theme: warm) {
    .card {
      background-color: wheat;
    }
  }
</style>
```

### Container Query Reference

- An interactive and comprehensive CSS container queries [guide](https://ishadeed.com/article/css-container-query-guide).

## Feature Query

### Supports At Rule

[`@supports`](https://developer.mozilla.org/docs/Web/CSS/@supports):

```css
@supports (transform-origin: 5% 5%) {
  font-size: 1rem;
}

@supports selector(A > B) {
  font-size: 1rem;
}

@supports not (not (transform-origin: 2px)) {
  font-size: 1rem;
}

@supports (display: grid) and (not (display: inline-grid)) {
  font-size: 1rem;
}

@supports (display: table-cell) and (display: flex) and (display: contents) {
  font-size: 1rem;
}

@supports (transform-style: preserve) or (-moz-transform-style: preserve) or
  (-o-transform-style: preserve) or (-webkit-transform-style: preserve) {
  font-size: 1rem;
}
```

### Supports API

[`CSS.supports()`](https://developer.mozilla.org/docs/Web/API/CSS/supports):

```ts
const result = CSS.supports('text-decoration-style', 'blink')
const result = CSS.supports('display: flex')
const result = CSS.supports('(--foo: red)')
const result = CSS.supports(`
  (transform-style: preserve) or (-moz-transform-style: preserve) or
  (-o-transform-style: preserve) or (-webkit-transform-style: preserve)
`)
```

## CSS Accessibility

### Screen Reader Only

```css
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  clip-path: polygon(0 0, 0 0, 0 0);
  white-space: nowrap;
  border-width: 0;
}

.not-sr-only {
  position: static;
  width: auto;
  height: auto;
  padding: 0;
  margin: 0;
  overflow: visible;
  clip: auto;
  clip-path: none;
  white-space: normal;
}
```

### Focusable Areas

Focusable areas:

- Elements whose `tabindex` value is not null.
- The shapes of area elements in an image map.
- The sub-widgets of elements: e.g video controls.
- The scrollable regions of elements.
- The viewport of a `Document`.
- User agent focusable area.

### Keyboard Styles

添加键盘访问样式:

- `outline`.
- `:focus-visible`.
- `:focus`.

:::tip HTML Order vs CSS Order

[HTML source order vs CSS display order](https://adrianroselli.com/2015/10/html-source-order-vs-css-display-order):

`float`/`absolute`/`flex`/`grid` CSS display order
can't change HTML source `tab` order.

:::

### Graceful Degradation

Write old browser css code,
then write modern browser css code:

```css
.grid {
  display: flex;

  /* old browser will ignore this rule */
  display: grid;
}
```

### ARIA

- W3C official ARIA [examples](https://github.com/w3c/aria-practices).

### DPR

Device pixel ratio (DPR):

一般情况下,
PC 屏幕 DPR 为 1,
1 个逻辑像素 = 1 个物理像素,
移动端 DPR 为 2 或 3,
1 个逻辑像素 = 2 或 3 个物理像素,
由此产生
`移动端/Retina 屏幕 1px 边框 (pixel border)`
问题:

- 伪元素 + `scale` 变换.
- `border-image`.
- `background-image`.
- `background` gradient.
- `box-shadow`.
- `viewport` + `rem`.

```css
.scale-1px {
  position: relative;
  border: none;
}

.scale-1px::after {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 1px;
  content: '';
  background: #000;
  transform: scaleY(0.5);
  transform-origin: 0 0;
}

.border-image-1px {
  border-width: 0 0 1px;
  border-bottom: none;
  border-image: url('../img/line.png') 0 0 2 0 stretch;
}

.background-image-1px {
  background: url('../img/line.png') repeat-x left bottom;
  background-size: 100% 1px;
}

.background-gradient-1px {
  background:
    linear-gradient(#000, #000 100%, transparent 100%) left / 1px 100% no-repeat,
    linear-gradient(#000, #000 100%, transparent 100%) right / 1px 100%
      no-repeat,
    linear-gradient(#000, #000 100%, transparent 100%) top / 100% 1px no-repeat,
    linear-gradient(#000, #000 100%, transparent 100%) bottom / 100% 1px
      no-repeat;
}

.box-shadow-1px {
  box-shadow: inset 0 -1px 1px -1px #c8c7cc;
}
```

```ts
// Change viewport scale
const scale = 1 / window.devicePixelRatio
const viewport = document.querySelector('meta[name="viewport"]')
viewport.setAttribute(
  'content',
  `width=device-width,user-scalable=no,initial-scale=${scale},maximum-scale=${scale},minimum-scale=${scale}`
)

// Set root font size
const docEl = document.documentElement
const fontsize = `${10 * (docEl.clientWidth / 320)}px`
docEl.style.fontSize = fontsize
```

## CSS Performance

### Will Change

告知浏览器该元素会有哪些变化的方法,
浏览器可在元素属性真正发生变化之前提前做好对应的优化准备工作:

```css
.will-change-parent:hover .will-change {
  will-change: auto;
  will-change: scroll-position;
  will-change: contents;

  /* <custom-ident> */
  will-change: transform;
  will-change: opacity;
  will-change: left, top;
}
```

### Contain

[CSS containment](https://developer.chrome.com/blog/css-containment):

- `contain` 属性允许开发者声明当前元素和它的内容尽可能的独立于 DOM 树的其他部分.
  这使得浏览器在重新计算布局/样式/绘图或它们的组合的时候, 只会影响到有限的 DOM 区域, 而不是整个页面:
  `none | strict | content | [ size || layout || style || paint ]`.
- `size` containment:
  声明这个元素的尺寸会变化, 不需要去检查它依赖关系中的尺寸变化.
- `layout` containment:
  声明没有外部元素可以影响它内部的布局, 反之亦然.
- `style` containment:
  声明那些同时会影响这个元素和其子孙元素的属性, 都在这个元素的包含范围内.
- `paint` containment:
  声明这个元素的子孙节点不会在它边缘外显示.
  如果一个元素在视窗外或因其他原因导致不可见, 则同样保证它的子孙节点不会被显示.

```css
.box {
  /* 无布局包含 */
  contain: none;

  /* 布局包含 size/layout/style/paint */
  contain: strict;

  /* 布局包含 layout/style/paint */
  contain: content;

  /* 布局包含 size */
  contain: size;

  /* 布局包含 layout */
  contain: layout;

  /* 布局包含 style */
  contain: style;

  /* 布局包含 paint */
  contain: paint;
}
```

### Content Visibility

[`content-visibility`](https://developer.mozilla.org/docs/Web/CSS/content-visibility):

- `visible`:
  element contents are laid out and rendered as normal.
- `hidden`:
  hide element while **preserving its rendering state**,
  if there are any changes that need to happen,
  they only happen when the element is shown again
  (i.e. `content-visibility: hidden` property is removed).
  `display: none` destroys element rendering state,
  `visibility: hidden` doesn't truly remove element.
- `auto`:
  element turns on `layout`, `style` and `paint` containment,
  可用于实现 **lazy loading**, **virtualized list**.

```css
.content {
  /* Keyword values */
  content-visibility: visible;
  content-visibility: hidden;
  content-visibility: auto;

  /* <length> values */
  contain-intrinsic-size: 1000px;
  contain-intrinsic-size: 10rem;

  /* <percentage> value */
  contain-intrinsic-size: 10%;
}

.p {
  content-visibility: auto;
  contain-intrinsic-size: 320px; /* 预设高度, 防止滚动条频繁抖动 */
}
```

[Prevent jittery scrollbar](https://infrequently.org/2020/12/resize-resilient-deferred-rendering):

```ts
const observer = new ResizeObserver((entries) => {
  for (const entry of entries) {
    if (entry.target.getBoundingClientRect().height > 0) {
      observer.unobserve(entry.target)
      entry.target.classList.remove('content-visibility-auto')
    }
  }
})

for (const element of document.querySelectorAll('.content-visibility-auto'))
  observer.observe(element)
```

### CSS Selectors Performance

减少选择器的复杂性, 与构造样式本身的其他工作相比,
选择器复杂性可以占用计算元素样式所需时间的 50%以上:

- 避免使用统配选择器:
  `*`.
- 避免使用后代选择器 (开销较高):
  `.anchor .link` -> `.anchor-link`.
- 避免使用标签子代选择器:
  `.list > li` -> `.list > .item` (better) -> `.list-item` (best).

### CSS Triggers Performance

- CSS triggers [list](https://github.com/GoogleChromeLabs/css-triggers).
- JavaScript triggers [list](https://gist.github.com/paulirish/5d52fb081b3570c81e3a).

Avoid to frequently change CSS property
and call JavaScript API triggering layout stage (`reflow`):

- `Layout` stage triggers:
  - `display`.
  - `position`.
  - `float`.
  - `top`/`bottom`/`left`/`right`.
  - `width`.
  - `height`.
  - `min-height`.
  - `margin`.
  - `padding`.
  - `border`/`border-width`.
  - `overflow`/`overflow-y`.
  - `font-family`
  - `font-size`.
  - `font-weight`.
  - `white-space`.
  - `line-height`.
  - `vertical-align`.
  - `text-align`.
  - `clear`.
- `Paint` stage triggers:
  - `background`/`background-image`/`background-repeat`/`background-position`/`background-size`
  - `border-radius`/`border-style`.
  - `box-shadow`.
  - `outline`/`outline-width`/`outline-style`/`outline-color`.
  - `color`.
  - `text-decoration`.
  - `visibility`.
- `Composite` stage triggers:
  - `cursor`.
  - `opacity`.
  - `transform`.
  - `z-index`.

### CSS Loading Performance

- Avoid `@import`:
  - In HTML.
  - In CSS especially;
  - Beware of oddities with the `PreLoad Scanner`.
- Be wary of synchronous CSS and JavaScript order:
  - JavaScript defined after CSS won't run until CSSOM is completed.
  - If JavaScript doesn't depend on CSS: load it before CSS.
  - If JavaScript does depend on CSS: load it after CSS.
- Load CSS as the DOM needs it:
  - Unblocks `Start Render` and allows progressive rendering.
  - Avoid **flash of un-styled content**.
  - Avoid **re-rendering and repaint** for initial page:
    put `Critical CSS` in HTML footer will lead to
    entire DOM re-rendering and repaint.
- Lazyload any CSS not needed for `Start Render`:
  - Only load `Critical CSS` in `<head>`.
  - Splitting CSS into `Media Queries`.

```html
<!-- Doesn't block rendering -->
<link rel="preload" href="/path/to/split.css" as="style" />

<!-- Loading media query -->
<link
  rel="stylesheet"
  href="/path/to/split.css"
  media="print"
  onload="this.media='all'"
/>
```

### Animation Performance

[High performance animations](https://www.html5rocks.com/en/tutorials/speed/high-performance-animations):

- CSS 高性能动画三要素:
  - `absolute` position: 脱离文档流, 不会导致其他元素重排或重绘.
  - `opacity`: high performance trigger.
  - `transform`: high performance trigger.
- All animation: `keyframe` animation or `transitions` is best.
- JS-based animation: `requestAnimationFrame` is better than `setTimeout`/`setInterval`.
- Position animation: `transform: translate(npx, npx)` is better than `top`/`right`/`bottom`/`left`.
- Scale animation: `transform: scale(n)` better than `width`/`height`.
- Rotation animation: `transform: rotate(deg)` is better.
- Opacity/visibility animation: `opacity: 0...1` is better.

#### Animation Frame

`window.requestAnimationFrame`:

- Reflow: `JavaScript -> Style -> Layout -> Paint -> Composite`.
- Repaint: `Paint -> Composite`.

告诉浏览器希望执行动画并请求浏览器在下一次重绘之前调用指定的函数来更新动画.
该方法使用一个回调函数作为参数, 这个回调函数会在浏览器重绘之前调用.

> 若想要在下次重绘时产生另一个动画画面, callback 必须调用 requestAnimationFrame.

```ts
let start = null
const element = document.getElementById('SomeElementYouWantToAnimate')
element.style.position = 'absolute'

function step(timestamp) {
  if (!start)
    start = timestamp

  const progress = timestamp - start
  element.style.left = `${Math.min(progress / 10, 200)}px`

  if (progress < 2000)
    window.requestAnimationFrame(step)
}

window.requestAnimationFrame(step)
```

#### Animation DevTools

- [DevTools for Animation Performance](https://calibreapp.com/blog/investigate-animation-performance-with-devtools).
- Slower CPU simulation in `performance` panel.
- Enable paint instrumentation in `performance` panel.
- FPS meter in `rendering` panel.
- Paint flashing in `rendering` panel.
- `layers` panel.

### CSS Imports Performance

`link` is parallel, `@import` isn't parallel.

### CSS Performance Reference

- CSS optimization [guide](https://kinsta.com/blog/optimize-css).

## CSS Hacks

### Property Hacks

利用低版本浏览器无法识别新的属性值:

```css
.loading {
  background: url('/images/loading.gif');
  background: url('/images/loading.png'),
    linear-gradient(transparent, transparent);
}

.shadow {
  border: 1px solid #ddd;
  border: 1px solid rgb(0 0 0 / 0%);
  box-shadow: 2px 2px;
}
```

### Selector Hacks

利用低版本浏览器无法识别新的选择器 (`,`):

```css
/* Webkit */
:-webkit-any(tag-not-found),
.class {
  font-size: 1rem;
}

/* Firefox */
tag-not-found::-moz-progress-bar,
.class {
  font-size: 1rem;
}

/* Chromium Edge */
tag-not-found::-ms-any,
.class {
  font-size: 1rem;
}

/* IE9+ */
:checked,
:disabled,
tag-not-found::before,
tag-not-found::after,
tag-not-found::selection,
.class {
  font-size: 1rem;
}

/* IE10+ */
:valid,
:invalid,
:required,
:optional,
.class {
  font-size: 1rem;
}

/* IE11+ */
tag-not-found::backdrop,
.class {
  font-size: 1rem;
}
```

### CSS Hacks Reference

- Browser [hacks](https://github.com/4ae9b8/browserhacks).

## CSS Tools

### PostCSS

- [PostCSS Preset Env](https://github.com/csstools/postcss-plugins)
- [PostCSS Flexbox Bug Checker](https://github.com/luisrudge/postcss-flexbugs-fixes)

#### CSS Vendor Prefix

CSS vendor prefix order:

- `-moz-` rule.
- `-ms-` rule.
- `-o-` rule.
- `-webkit-` rule.
- Standard rule.

#### CSS Normalize

[Modern normalize](https://github.com/sindresorhus/modern-normalize):

```css
html,
body {
  box-sizing: border-box;
  height: 100%;
  padding: 0;
  margin: 0;
  font-size: 100%;
}

body {
  min-height: 100vh;
  line-height: 1.5;
}

body,
h1,
h2,
h3,
h4,
p,
figure,
blockquote,
dl,
dd {
  margin: 0;
}

input,
textarea,
img,
video,
object {
  box-sizing: border-box;
  max-inline-size: 100%;
  max-width: 100%;
  block-size: auto;
  height: auto;
  aspect-ratio: 16/9;
  object-fit: cover;
}

button,
input,
textarea,
select {
  font: inherit;
}

button {
  padding: 0;
  font: inherit;
  color: inherit;
  text-align: inherit;
  appearance: none;
  cursor: pointer;
  background: none;
  border: none;
  border-radius: 0;
  box-shadow: none;
}

@media (prefers-reduced-motion: reduce) {
  html:focus-within {
    scroll-behavior: auto;
  }

  *,
  *::before,
  *::after {
    transition-duration: 0.01ms !important;
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    scroll-behavior: auto !important;
  }
}
```

#### CSS Feature Detection

```html
<script>
  if (window.CSSPropertyRule) {
    const root = document.documentElement
    root.classList.add('supports-at-property')
  }
</script>

<style>
  .supports-at-property optgroup {
    font-size: 0;
  }
</style>
```

### StyleLint

`stylelint-config-mass` plugin `index.js`:

```ts
module.exports = {
  extends: ['stylelint-config-sass-guidelines'],
  rules: {
    'order/properties-order': [
      'position',
      'z-index',
      'top',
      'right',
      'bottom',
      'left',
      'box-sizing',
      'display',
      'visibility',
      'opacity',
      'mix-blend-mode',
      'isolation',
      'float',
      'clear',
      'flex',
      'flex-basis',
      'flex-direction',
      'flex-flow',
      'flex-grow',
      'flex-shrink',
      'flex-wrap',
      'grid',
      'grid-template',
      'grid-template-areas',
      'grid-template-rows',
      'grid-template-columns',
      'grid-area',
      'grid-row',
      'grid-row-start',
      'grid-row-end',
      'grid-column',
      'grid-column-start',
      'grid-column-end',
      'grid-auto-rows',
      'grid-auto-columns',
      'grid-auto-flow',
      'gap',
      'row-gap',
      'column-gap',
      'place-content',
      'place-items',
      'place-self',
      'align-content',
      'align-items',
      'align-self',
      'justify-content',
      'justify-items',
      'justify-self',
      'order',
      'columns',
      'column-gap',
      'column-fill',
      'column-rule',
      'column-rule-width',
      'column-rule-style',
      'column-rule-color',
      'column-span',
      'column-count',
      'column-width',
      'backface-visibility',
      'perspective',
      'perspective-origin',
      'transform',
      'transform-origin',
      'transform-style',
      'transition',
      'transition-delay',
      'transition-duration',
      'transition-property',
      'transition-timing-function',
      'width',
      'min-width',
      'max-width',
      'height',
      'min-height',
      'max-height',
      'overflow',
      'overflow-x',
      'overflow-y',
      'resize',
      'margin',
      'margin-top',
      'margin-right',
      'margin-bottom',
      'margin-left',
      'padding',
      'padding-top',
      'padding-right',
      'padding-bottom',
      'padding-left',
      'border',
      'border-top',
      'border-right',
      'border-bottom',
      'border-left',
      'border-width',
      'border-top-width',
      'border-right-width',
      'border-bottom-width',
      'border-left-width',
      'border-style',
      'border-top-style',
      'border-right-style',
      'border-bottom-style',
      'border-left-style',
      'border-radius',
      'border-top-left-radius',
      'border-top-right-radius',
      'border-bottom-left-radius',
      'border-bottom-right-radius',
      'border-color',
      'border-top-color',
      'border-right-color',
      'border-bottom-color',
      'border-left-color',
      'outline',
      'outline-offset',
      'outline-width',
      'outline-style',
      'outline-color',
      'box-shadow',
      'list-style',
      'list-style-type',
      'list-style-position',
      'list-style-image',
      'table-layout',
      'caption-side',
      'border-collapse',
      'border-spacing',
      'empty-cells',
      'animation',
      'animation-name',
      'animation-duration',
      'animation-timing-function',
      'animation-delay',
      'animation-iteration-count',
      'animation-direction',
      'animation-fill-mode',
      'animation-play-state',
      'background',
      'background-attachment',
      'background-clip',
      'background-color',
      'background-image',
      'background-origin',
      'background-position',
      'background-repeat',
      'background-size',
      'background-blend-mode',
      'cursor',
      'color',
      'font',
      'font-family',
      'font-kerning',
      'font-size',
      'font-size-adjust',
      'font-stretch',
      'font-weight',
      'font-smoothing',
      'osx-font-smoothing',
      'font-variant',
      'font-style',
      'tab-size',
      'text-align',
      'text-align-last',
      'text-justify',
      'text-indent',
      'text-transform',
      'text-decoration',
      'text-decoration-color',
      'text-decoration-line',
      'text-decoration-style',
      'text-decoration-thickness',
      'text-rendering',
      'text-shadow',
      'text-overflow',
      'line-height',
      'word-spacing',
      'letter-spacing',
      'white-space',
      'word-break',
      'word-wrap',
      'vertical-align',
      'content',
      'quotes',
      'counter-reset',
      'counter-increment',
      'page-break-before',
      'page-break-after',
      'page-break-inside',
      'pointer-events',
      'will-change',
    ],
    'order/properties-alphabetical-order': null,
    'selector-class-pattern': [
      '^[a-z0-9\\-\\_]+$',
      {
        message:
          'Selector should be written in lowercase with hyphens (selector-class-pattern)',
      },
    ],
  },
}
```

`StyleLint` plugins:

- Ignored invalid properties [checker](https://github.com/kristerkari/stylelint-declaration-block-no-ignored-properties).
- CSS syntax [validator](https://github.com/csstree/stylelint-validator).

### Tailwind

#### Tailwind Configuration

:::danger JIT Mode

Missing `.html`/`.tsx`/`.vue` directory
will lead to class purged.

:::

#### Tailwind Directives

```css
@layer base {
  h1 {
    @apply text-3xl;
  }
}

@layer components {
  .primary-btn {
    @apply bg-yellow-600 hover:bg-yellow-800 text-black font-bold py-4 px-6 shadow-md;
  }
}

@layer utilities {
  @variants hover {
    .padding-large {
      padding: 30px;
    }
  }

  @variants focus hover {
    .border-small {
      border: 1px solid #30485e;
    }

    .border-medium-dashed {
      border: 7px dashed #30485e;
    }
  }

  @responsive {
    /* generate for all breakpoints */
    .border-solid {
      border: 10px solid #30485e;
    }
  }

  @screen sm {
    /* generate for small screen breakpoint */
    .border-solid {
      border: 10px solid #30485e;
    }
  }
}
```

## CSS Style Guide

### CSS Property Order

> 显示属性 -> 自身属性 -> 文本属性.

#### Display Property Order

- position.
- z-index.
- top.
- right.
- bottom.
- left.
- box-sizing.
- display.
- visibility.
- float.
- clear.

#### Self Property Order

- width.
- min-width.
- max-width.
- height.
- min-height.
- max-height.
- overflow.
- padding.
- padding-top.
- padding-right.
- padding-bottom.
- padding-left.
- margin.
- margin-top.
- margin-right.
- margin-bottom.
- margin-left.
- border.
- border-width.
- border-top-width.
- border-right-width.
- border-bottom-width.
- border-left-width.
- border-style.
- border-top-style.
- border-right-style.
- border-bottom-style.
- border-left-style.
- border-color.
- border-top-color.
- border-right-color.
- border-bottom-color.
- border-left-color.
- border-collapse.
- border-spacing.
- outline.
- list-style.
- table-layout.
- caption-side.
- empty-cells.
- background.
- background-color.
- background-image.
- background-repeat.
- background-position.

#### Text Property Order

- color.
- font.
- font-family.
- font-size.
- font-weight.
- line-height.
- text-align.
- text-indent.
- text-transform.
- text-decoration.
- letter-spacing.
- word-spacing.
- white-space.
- vertical-align.
- opacity.
- cursor.
- content.
- quotes.

### CSS Naming Convention

#### Layout Structure Naming Convention

- 容器: container.
- 页头: header.
- 内容: content.
- 页面主体: main.
- 页尾: footer.
- 导航: nav.
- 侧栏: sidebar.
- 栏目: column.
- 页面外围控制整体佈局宽度: wrapper.
- 左右中: left right center.

#### Navigation Naming Convention

- 导航: nav.
- 主导航: main-nav.
- 子导航: sub-nav.
- 顶导航: top-nav.
- 边导航: sidebar.
- 左导航: left-sidebar.
- 右导航: right-sidebar.
- 菜单: menu.
- 子菜单: sub-menu.
- 标题: title.
- 摘要: summary.

#### Functional Component Naming Convention

- 标志: logo.
- 广告: banner.
- 登陆: login.
- 登录条: login-bar.
- 注册: register.
- 搜索: search.
- 功能区: shop.
- 标题: title.
- 加入: join us.
- 状态: status.
- 按钮: btn.
- 滚动: scroll.
- 标籤页: tab.
- 文章列表: list.
- 提示信息: msg.
- 当前的: current.
- 小技巧: tips.
- 图标: icon.
- 注释: note.
- 指南: guide.
- 服务: service.
- 热点: hot.
- 新闻: news.
- 下载: download.
- 投票: vote.
- 合作伙伴: partner.
- 友情链接: link.
- 版权: copyright.

#### CSS Files Naming Convention

- `abstracts`: `$variables`, `@mixin` function.
- `vendors`: external libraries (font-awesome, bootstrap).
- `base`: `normalize.css`, `reset.css`, `utils.css`, `font.css`, `base.css`.
  (margin-right, text-center, float-right).
- `components`: `form.css`, `button.css`, `navbar.css`, `dropdown.css`.
- `layout`:
  `columns.css`, `grid.css`, `header.css`, `footer.css`, `section.css`, `navigation.css`.
- `pages`: `home.css`, `about.css`.
- `themes`: `color.css`, `font.css`.
- `main.css`/`app.css`.

### CSS Naming System and Architecture

- BEM: [blocks, elements and modifiers](https://www.smashingmagazine.com/2018/06/bem-for-beginners).
- OOCSS: [object oriented CSS](https://www.smashingmagazine.com/2011/12/an-introduction-to-object-oriented-css-oocss).
- SMACSS: [scalable and modular CSS architecture](https://www.toptal.com/css/smacss-scalable-modular-architecture-css).
- ITCSS: [inverted triangle CSS layers](https://www.xfive.co/blog/itcss-scalable-maintainable-css-architecture).
- A source of inspiration for [class naming](https://github.com/paulrobertlloyd/classnames).
