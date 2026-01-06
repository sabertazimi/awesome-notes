---
sidebar_position: 4
author: Sabertazimi
authorTitle: Web Developer
authorURL: https://github.com/sabertazimi
authorImageURL: https://github.com/sabertazimi.png
tags: [Web, CSS]
---

# Interaction

## Link

### Styled Link

[Styling links](https://developer.mozilla.org/docs/Learn/CSS/Styling_text/Styling_links):

```css
a {
  padding: 2px 1px 0;
  text-decoration: none;
  outline: none;
}

a:link {
  color: #265301;
}

a:visited {
  color: #437a16;
}

a:focus {
  background: #bae498;
  border-bottom: 1px solid;
}

a:hover {
  background: #cdfeaa;
  border-bottom: 1px solid;
}

a:active {
  color: #cdfeaa;
  background: #265301;
}

a[href^='http'] {
  padding-right: 19px;
  background: url('external-link-52.png') no-repeat 100% 0;
  background-size: 16px 16px;
}
```

### Hidden Link

```css
a {
  text-decoration: none;
  pointer-events: none;
  cursor: default;
  opacity: 0;
}
```

### Animated Link

Change bottom border:

```css
a {
  position: relative;
  padding-bottom: 5px;
  color: #008080;
  text-decoration: none;
}

a::after {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 3px;
  content: '';
  background-color: #22313f;
  transform-origin: bottom center;
}

a:hover,
a:focus {
  color: #22313f;
}

a:hover::after,
a:focus::after {
  width: 100%;
}
```

### GitHub Link

<!-- markdownlint-disable line-length -->

```html
<a href="https://github.com/Trevald/WhatTheTag.com" class="github-corner" aria-label="View source on GitHub">
  <svg
    width="80"
    height="80"
    viewBox="0 0 250 250"
    style="position: absolute; top: 0; right: 0; color: #2d3748; border: 0; fill: #718096"
    aria-hidden="true"
  >
    <path d="M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z" />
    <path
      d="M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 C122.0,82.7 120.5,78.6 120.5,78.6 C119.2,72.0 123.4,76.3 123.4,76.3 C127.3,80.9 125.5,87.3 125.5,87.3 C122.9,97.6 130.6,101.9 134.4,103.2"
      fill="currentColor"
      style="transform-origin: 130px 106px"
      class="octo-arm"
    />
    <path
      d="M115.0,115.0 C114.9,115.1 118.7,116.5 119.8,115.4 L133.7,101.6 C136.9,99.2 139.9,98.4 142.2,98.6 C133.8,88.0 127.5,74.4 143.8,58.0 C148.5,53.4 154.0,51.2 159.7,51.0 C160.3,49.4 163.2,43.6 171.4,40.1 C171.4,40.1 176.1,42.5 178.8,56.2 C183.1,58.6 187.2,61.8 190.9,65.4 C194.5,69.0 197.7,73.2 200.1,77.6 C213.8,80.2 216.3,84.9 216.3,84.9 C212.7,93.1 206.9,96.0 205.4,96.6 C205.1,102.4 203.0,107.8 198.3,112.5 C181.9,128.9 168.3,122.5 157.7,114.1 C157.9,116.9 156.7,120.9 152.7,124.9 L141.0,136.5 C139.8,137.7 141.6,141.9 141.8,141.8 Z"
      fill="currentColor"
      class="octo-body"
    />
  </svg>
</a>
```

<!-- markdownlint-enable line-length -->

```css
.github-corner:focus .octo-arm,
.github-corner:hover .octo-arm {
  animation: none;
}

@media (prefers-reduced-motion: no-preference) {
  .github-corner:focus .octo-arm,
  .github-corner:hover .octo-arm {
    animation: octocat-wave 560ms ease-in-out;
  }
}

@keyframes octocat-wave {
  0%,
  100% {
    transform: rotate(0);
  }

  20%,
  60% {
    transform: rotate(-25deg);
  }

  40%,
  80% {
    transform: rotate(10deg);
  }
}
```

## Button

### Link Button

```css
a.btn-custom {
  padding: 10px 40px;
  line-height: 100px;
  text-align: center;
  background-color: #000;
  border-radius: 0;
}
```

### Gradient Button

#### Linear Gradient Button

```css
.btn {
  display: inline-block;
  padding: 5px;
  color: #333;
  text-decoration: none;
  background-image: linear-gradient(to top, #333 50%, #fff 50%);
  background-size: 100% 200%;
  transition: all 0.3s;
}

.btn:hover,
.btn:focus {
  color: #fff;
  background-position: 0 100%;
}
```

```css
.btn-1 {
  background-image: linear-gradient(to right, #f6d365 0%, #fda085 51%, #f6d365 100%);
}

.btn-2 {
  background-image: linear-gradient(to right, #fbc2eb 0%, #a6c1ee 51%, #fbc2eb 100%);
}

.btn-3 {
  background-image: linear-gradient(to right, #84fab0 0%, #8fd3f4 51%, #84fab0 100%);
}

.btn-4 {
  background-image: linear-gradient(to right, #a1c4fd 0%, #c2e9fb 51%, #a1c4fd 100%);
}

.btn-5 {
  background-image: linear-gradient(to right, #ffecd2 0%, #fcb69f 51%, #ffecd2 100%);
}

.btn:hover,
.btn:focus {
  background-position: right center; /* change the direction of the change here */
}
```

#### Radial Gradient Button

```css
.ripple-button {
  color: #fff;
  background-color: #2a80eb;
}

.ripple-button:active {
  /* stylelint-disable-next-line declaration-property-value-no-unknown */
  background-image: radial-gradient(160% 100% at 50% 0%, hsl(0deg 0% 100% / 30%) 50%, hsl(0deg 0% 100% / 0%) 52%);
}

.colorful-button {
  color: #fff;
  background-color: #2a80eb;
  background-image:
    radial-gradient(farthest-side at bottom left, rgb(255 0 255/ 50%), transparent),
    radial-gradient(farthest-corner at bottom right, rgb(255 255 50/ 50%), transparent);
}
```

### 3D Shadow Button

```css
.shadow-3d-button {
  width: 100px;
  height: 36px;
  background-color: #f0f3f9;
  border: 1px solid #a0b3d6;
  box-shadow:
    1px 1px #afc4ea,
    2px 2px #afc4ea,
    3px 3px #afc4ea;
}

.shadow-3d-button:active {
  box-shadow:
    1px 1px #afc4ea,
    2px 2px #afc4ea;
  transform: translate(1px, 1px);
}
```

### Button Reference

- 100 modern CSS [buttons](https://github.com/ui-buttons/core).

## Modal

### Overlay Modal

```css
.overlay {
  position: fixed;
  width: 100%;
  height: 100%;
  background: rgb(0 0 0 / 50%);
}
```

### Box Shadow Modal

```css
.modal {
  box-shadow: 0 0 0 50vmax rgb(0 0 0 / 80%);
}
```

### Dialog Modal

```html
<div class="container">
  <div class="dialog">
    <div class="content">内容占位</div>
  </div>
</div>
```

```css
.container {
  position: fixed;
  inset: 0;
  z-index: 99;
  text-align: center;
  white-space: nowrap;

  /* for IE8 */
  background: url('data:image/png;base64,iVB...g==');

  /* for IE9+ */
  /* stylelint-disable-next-line declaration-property-value-no-unknown */
  background: rgb(0 0 0 / 50%), none;
}

.container::after {
  display: inline-block;
  height: 100%;
  vertical-align: middle;
  content: '';
}

.dialog {
  display: inline-block;
  vertical-align: middle;
  text-align: left;
  white-space: normal;
  background-color: #fff;
  border-radius: 6px;
}
```

### Clip Modal

图片剪裁的矩形镂空效果:

```css
.crop {
  overflow: hidden;
}

.crop > .crop-area {
  width: 80px;
  height: 80px;
  cursor: move;
  outline: 256px solid rgb(0 0 0 / 50%);
}
```

## Tooltip

利用伪元素 (无法选中) 生成元素, 并设置 `pointer-events: none` (无法交互):

```css
.tooltip {
  position: relative;
  cursor: help;
}

/* 三角形 */
.tooltip::before {
  position: absolute;
  top: 12px;
  left: 20px;
  display: block;
  width: 0;
  height: 0;
  content: '';
  border: solid transparent 5px;
  border-bottom-color: rgb(0 0 0 / 80%);
  opacity: 0;
  transition:
    opacity 250ms,
    top 250ms;
}

/* 提示文字 */
.tooltip::after {
  position: absolute;
  top: 22px;
  left: 0;
  display: inline;
  width: 230px;
  padding: 0.5em 0.8em;
  font-size: 13px;
  font-weight: 700;
  line-height: 1.5em;
  color: #fff;
  pointer-events: none; /* This prevents the box from appearing when hovered. */
  content: attr(aria-label);
  background: rgb(0 0 0 / 80%);
  opacity: 0;
  transition:
    opacity 250ms,
    top 250ms;
}

/* Keeps the info boxes on top of other elements */
.tooltip:hover {
  z-index: 2;
}

.tooltip:hover::before,
.tooltip:hover::after {
  opacity: 1;
}

.tooltip:hover::before {
  top: 20px;
}

.tooltip:hover::after {
  top: 30px;
}
```
