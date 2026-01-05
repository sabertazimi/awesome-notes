---
author: Sabertazimi
authorTitle: Web Developer
authorURL: https://github.com/sabertazimi
authorImageURL: https://github.com/sabertazimi.png
tags: [Web, CSS]
---

# Values

## CSS Data Types

CSS [data types](https://developer.mozilla.org/docs/Web/CSS/CSS_Types)
define typical [values](https://github.com/frenic/csstype)
(including keywords and units)
accepted by CSS properties and functions:

- Textual data [types](https://developer.mozilla.org/docs/Web/CSS/CSS_Types#textual_data_types).
- Numeric data [types](https://developer.mozilla.org/docs/Web/CSS/CSS_Types#numeric_data_types).
- [Quantities](https://developer.mozilla.org/docs/Web/CSS/CSS_Types#quantities).
- Combinations of [types](https://developer.mozilla.org/docs/Web/CSS/CSS_Types#combinations_of_types).
- Color data [types](https://developer.mozilla.org/docs/Web/CSS/color_value).
- Image data [types](https://developer.mozilla.org/docs/Web/CSS/image).
- 2D [`<position>`](https://developer.mozilla.org/docs/Web/CSS/position_value).

CSS data types list:

- CSS [formal syntax](https://github.com/mdn/data/blob/main/css/syntaxes.json).
- CSS [values](https://www.zhangxinxu.com/wordpress/2019/11/css-value-type).
- CSS [units](https://developer.mozilla.org/docs/Web/CSS/CSS_Values_and_Units).
- CSS [functions](https://developer.mozilla.org/docs/Web/CSS/CSS_Functions).

## CSS Property Values

### Inherit Value

Inherit from parent.

### Initial Value

The initial value of a CSS property is its default value,
as listed in its **standard** definition table.

### Revert Value

Revert to **user agent** built in styles.

```css
@supports (-webkit-overflow-scrolling: touch) {
  progress {
    all: revert;
  }
}
```

### Unset Value

Reset to `inherit` or `initial` value.

```css
dialog {
  all: unset; /* Exclude `unicode-bidi`, `direction`, custom variables */
}
```

### Specified Value

The specified value of a CSS property is the value
it receives from the document's style sheet

### Computed Value

The computed value of a CSS property is the value that
is transferred from parent to child during inheritance.
It is calculated from the specified value by:

1. Handling the special values `inherit`, `initial`, `unset`, and `revert`
2. Doing the computation needed to reach the value described in the
   "Computed value" line in the property's definition table

```css
span {
  /* display computed to `block` */
  position: absolute;
}
```

### Used Value

The used value of a CSS property is its value after all calculations
have been performed on the computed value:

- The used values of dimensions (e.g., width, line-height) are in pixels
- The used values of shorthand properties (e.g., background)
  are consistent with those of their component properties
  (e.g., background-color or background-size) and with position and float

### Actual Value

The actual value of a CSS property is the used value of that property
after any necessary approximations have been applied

The user agent performs four steps to calculate a property's actual (final) value:

1. the specified value is determined based on the result of
   cascading, inheritance, or using the initial value.
2. the computed value is calculated according to the specification
   (for example, a span with position:
   absolute will have its computed display changed to block)
3. layout is calculated, resulting in the used value
4. the used value is transformed according to
   the limitations of the local environment,
   resulting in the actual value

:::tip[CSS Value Transform]

1. initial.
2. specified.
3. computed.
4. used.
5. actual value.

:::

## CSS Logical Properties and Values

### CSS Logical Basis

In `position`/`size`/`margin`/`padding`/`border`/`text alignment`:

- `block-start` for `top`.
- `block-end` for `bottom`.
- `block` for vertical.
- `inline-start` for `left`.
- `inline-end` for `right`.
- `inline` for horizontal.

```css
.logical {
  /* stylelint-disable shorthand-property-no-redundant-values */
  inset-block: 0 0;
  inset-inline: 0 0;
  inline-size: fit-content;
  min-inline-size: min-content;
  max-inline-size: max-content;
  block-size: fit-content;
  min-block-size: min-content;
  max-block-size: max-content;
  padding-block: 1rem 1rem;
  padding-inline: 1rem 1rem;
  margin-block: 1rem 1rem;
  margin-inline: 1rem 1rem;
  border-block-start: 1px solid blue;
  border-block-end: 1px solid blue;
  border-inline-start: 1px solid blue;
  border-inline-end: 1px solid blue;
  /* stylelint-enable shorthand-property-no-redundant-values */
}
```

[![Logical Properties](./figures/logical-properties.webp)](https://web.dev/learn/css/logical-properties)

### CSS Logical Reference

- W3C CSS logical [draft](https://drafts.csswg.org/css-logical).
- CSS logical properties [guide](https://css-tricks.com/css-logical-properties-and-values).

## CSS Variables

### Scope Variables

#### Inherited Variables

CSS Variables 本质上具有继承特性,
HTML 文档树中, 后代元素可以继承祖先元素的 CSS Variables:

```html
<div class="alert alert-info">
  <div class="alert-content">
    <h2 class="alert-title">Info</h2>
    <div class="alert-body">
      <p>Info Message.</p>
    </div>
  </div>
</div>
```

#### Contextual Styling Variables

[Contextual styling themes](https://simurai.com/blog/2018/04/01/contextual-styling):

```css
[data-theme='dark'] {
  --fg: hsl(0deg 10% 70%);
  --border: hsl(0deg 10% 10%);
  --bg: hsl(0deg 0% 20%);
  --button-bg: hsl(0deg 0% 25%);
  --input-bg: hsl(0deg 0% 15%);
}

[data-theme='hero'] {
  --fg: hsl(240deg 50% 90%);
  --border: hsl(240deg 50% 10%);
  --bg: hsl(240deg 33% 30%);
  --button-bg: hsl(240deg 33% 40%);
  --input-bg: hsl(240deg 33% 20%);
}
```

Contextual styling buttons:

```css
:root {
  --primary: hsl(260deg 95% 70%);
  --secondary: hsl(320deg 95% 60%);
}

.button {
  background-color: var(--button-background, transparent);
}

.button-primary {
  --button-background: var(--primary);
}

.button-secondary {
  --button-background: var(--secondary);
}
```

Contextual styling alerts:

```css
.alert {
  --primary: #777;
  --secondary: #ccc;

  background-color: var(--secondary);
  border: 1px solid var(--primary);
}

.alert::before {
  background-color: var(--primary);
}

.alert-title {
  color: var(--primary);
}

.alert-success {
  --primary: #40c057;
  --secondary: #d3f9d8;
}

.alert-info {
  --primary: #228be6;
  --secondary: #d0ebff;
}

.alert-warning {
  --primary: #fab005;
  --secondary: #fff3bf;
}

.alert-error {
  --primary: #fa5252;
  --secondary: #ffe3e3;
}
```

### Invalid and Empty Variables

- `--invalid-value: initial;` is `invalid` value
  leading to `var(--invalid-value)` called failed,
  `var(--invalid-value, backup-value)` get `backup-value`.
- `--empty-value: ;` is valid `empty` value
  leading to `var(--empty-value)` called succeeded,
  `var(--empty-value, backup-value)` get `unset` value
  (`inherit` or `initial` value).
- Use `invalid` and `empty` value to
  implement `if (true)` statement,
  you can see real world case on `tailwind.css`.

```css
:root {
  --on: initial;
  --off: ;
}

button {
  --is-raised: var(--off);

  border: 1px solid var(--is-raised, rgb(0 0 0 / 10%));
}

button:hover,
button:focus {
  --is-raised: var(--on);
}
```

```css
/**
 * css-media-vars
 * BSD 2-Clause License
 * Copyright (c) James0x57, PropJockey, 2020
 */

html {
  --media-print: initial;
  --media-screen: initial;
  --media-speech: initial;
  --media-xs: initial;
  --media-sm: initial;
  --media-md: initial;
  --media-lg: initial;
  --media-xl: initial;

  /* ... */
  --media-pointer-fine: initial;
  --media-pointer-none: initial;
}

/* 把当前变量变为空值 */
@media print {
  html {
    --media-print: ;
  }
}

@media screen {
  html {
    --media-screen: ;
  }
}

/* 把当前变量变为空值 */
@media (width <= 37.499em) {
  html {
    --media-xs: ;
    --media-lte-sm: ;
    --media-lte-md: ;
    --media-lte-lg: ;
  }
}

/** 移动优先的样式规则 */
.breakpoints-demo > * {
  /** 小于 37.5em, 宽度 100%  */
  --xs-width: var(--media-xs) 100%;

  /** 小于 56.249em, 宽度 49%  */
  --sm-width: var(--media-sm) 49%;
  --md-width: var(--media-md) 32%;
  --lg-width: var(--media-gte-lg) 24%;

  width: var(--xs-width, var(--sm-width, var(--md-width, var(--lg-width))));

  --sm-and-down-bg: var(--media-lte-sm) red;
  --md-and-up-bg: var(--media-gte-md) green;

  background: var(--sm-and-down-bg, var(--md-and-up-bg));
}
```

[Space toggle](https://projects.verou.me/talks/dynamic-css-secrets)
for progressive enhancement

```css
:root {
  --in-oklab: ;
}

@supports (background: linear-gradient(in oklab, red, tan)) {
  :root {
    --in-oklab: in oklab;
  }
}

/* Usage: */
.card {
  background: linear-gradient(var(--in-oklab) #f00, #0f0);
}
```

### Limit Variables

For some CSS values and units have limits (e.g. `<color>`),
use variables to implement `if else` statement.

```css
:root {
  --red: 44;
  --green: 135;
  --blue: 255;

  /**
   * 亮度算法:
   * lightness = (red * 0.2126 + green * 0.7152 + blue * 0.0722) / 255
   */
  --lightness: calc((var(--red) * 0.2126 + var(--green) * 0.7152 + var(--blue) * 0.0722) / 255);
}

.button {
  /* 文字颜色, 只可能是黑色或白色 */
  color: hsl(0% 0% calc((var(--lightness) - 0.5) * -999999%));

  /* 文字阴影, 黑色文字才会出现 */
  text-shadow: 1px 1px
    rgb(calc(var(--red) + 50) calc(var(--green) + 50) calc(var(--blue) + 50) / calc((var(--lightness) - 0.5) * 9999));

  /* 背景颜色 */
  background: rgb(var(--red) var(--green) var(--blue));

  /* 固定样式 */
  border: 0.2em solid;

  /* 边框样式, 亮度大于 0.8 才出现 */
  border-color: rgb(
    calc(var(--red) - 50) calc(var(--green) - 50) calc(var(--blue) - 50) / calc((var(--lightness) - 0.8) * 100)
  );
}
```

### Dark Mode Variables

```css
:root {
  /* Themes */
  --bg-light: #fff;
  --text-light: #000;
  --bg-dark: #000;
  --text-dark: #fff;

  /* Defaults */
  --bg: var(--bg-light);
  --text: var(--text-light);
}

@media (prefers-color-scheme: dark) {
  :root {
    --bg: var(--bg-dark);
    --text: var(--text-dark);
  }
}
```

### Variables API

```css
.element {
  height: 100vh; /* Fallback for browsers that do not support Custom Properties */
  height: calc(var(--vh, 1vh) * 100);
}
```

```ts
window.addEventListener('resize', () => {
  const vh = window.innerHeight * 0.01
  document.documentElement.style.setProperty('--vh', `${vh}px`)
})
```

```ts
const root = document.documentElement
const bgColor = getComputedStyle(root).getPropertyValue('--body-bg')
```

Change `--cursor-x` and `--cursor-y` via `JavaScript` API:

```css
:root::before {
  position: fixed;
  z-index: 1000;
  display: block;
  width: 100%;
  height: 100%;
  pointer-events: none;
  content: '';
  background: radial-gradient(
    circle 16vmax at var(--cursor-x) var(--cursor-y),
    rgb(0 0 0 / 0%) 0%,
    rgb(0 0 0 / 50%) 80%,
    rgb(0 0 0 / 80%) 100%
  );
}
```

Change `--percent` via `JavaScript` API:

```css
.bar {
  display: flex;
  height: 20px;
  background-color: #f5f5f5;
}

.bar::before {
  display: flex;
  justify-content: end;
  width: calc(var(--percent) * 1%);
  font-size: 12px;
  color: #fff;
  white-space: nowrap;
  content: counter(progress) '%\2002';
  counter-reset: progress var(--percent);
  background: #2486ff;
}
```

### Properties and Values API

[`@property`](https://developer.mozilla.org/docs/Web/CSS/@property):

```css
@property --property-name {
  syntax: '<color>';
  inherits: false;
  initial-value: #c0ffee;
}
```

[`CSS.registerProperty()`](https://developer.mozilla.org/docs/Web/API/CSS/RegisterProperty):

```ts
window.CSS.registerProperty({
  name: '--my-color',
  syntax: '<color>',
  inherits: false,
  initialValue: '#c0ffee',
})
```

CSS 不支持背景渐变色的直接过渡动画,
需要使用**两层**背景渐变 (`background` + `::before`/`::after` `background`)
[`opacity` 变化](https://codepen.io/chriscoyier/pen/eRbLWP)
实现渐变背景的过渡动画.

现在,
可以对 [CSS Houdini 自定义变量](https://juejin.cn/post/6951201528543707150)
设置 `transition`/`animation`,
快速实现渐变背景的过渡动画:

```css
@property --houdini-color-a {
  syntax: '<color>';
  inherits: false;
  initial-value: #fff;
}

@property --houdini-color-b {
  syntax: '<color>';
  inherits: false;
  initial-value: fuchsia;
}

.box {
  background: linear-gradient(45deg, var(--houdini-color-a), var(--houdini-color-b));

  /* stylelint-disable-next-line custom-property-no-missing-var-function */
  transition: 1s --houdini-color-a;
  animation: change 10s infinite linear;
}

.box:hover {
  --houdini-color-a: yellowgreen;
}

@keyframes change {
  20% {
    --houdini-color-b: red;
  }

  40% {
    --houdini-color-b: #ff3c41;
  }

  60% {
    --houdini-color-b: orange;
  }

  80% {
    --houdini-color-b: #ae63e4;
  }
}

@property --per {
  syntax: '<percentage>';
  inherits: false;
  initial-value: 25%;
}

.pie {
  background: conic-gradient(yellowgreen, yellowgreen var(--per), transparent var(--per), transparent 100%);

  /* stylelint-disable-next-line custom-property-no-missing-var-function */
  transition: --per 300ms linear;
}

.pie:hover {
  --per: 60%;
}
```

`@property` feature detection and fallback:

```css
@property --parent-em {
  syntax: '<length>';
  initial-value: 0;
  inherits: true;
}

@property --no-at-property-fallback {
  syntax: '*';
  inherits: false;
}

select {
  --parent-em: 1em;
  --no-at-property-fallback: 1em;
}

optgroup {
  /* Will only inherit if `@property` not supported */
  font-size: var(--no-at-property-fallback, 0);
}

optgroup > * {
  font-size: var(--parent-em);
}
```

## Reference

- MDN CSS value [formal syntax](https://developer.mozilla.org/docs/Web/CSS/Value_definition_syntax).
