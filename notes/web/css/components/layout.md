---
author: Sabertazimi
authorTitle: Web Developer
authorURL: https://github.com/sabertazimi
authorImageURL: https://github.com/sabertazimi.png
tags: [Web, CSS]
---

# Layout

## Utilities

### Resizable Class

[Resizable `div`](https://codepen.io/ZeroX-DG/pen/vjdoYe):

```ts
// bottom-right:
new_width = element_original_width + (mouseX - original_mouseX)
new_height = element_original_height + (mouseY - original_mouseY)

// bottom-left:
new_width = element_original_width - (mouseX - original_mouseX)
new_height = element_original_height + (mouseY - original_mouseY)
new_x = element_original_x - (mouseX - original_mouseX)

// top-right:
new_width = element_original_width + (mouseX - original_mouseX)
new_height = element_original_height - (mouseY - original_mouseY)
new_y = element_original_y + (mouseY - original_mouseY)

// top-left:
new_width = element_original_width - (mouseX - original_mouseX)
new_height = element_original_height - (mouseY - original_mouseY)
new_x = element_original_x + (mouseX - original_mouseX)
new_y = element_original_y + (mouseY - original_mouseY)
```

### Hidden Class

- `display: none`: 元素不在 DOM 流.
- `visibility: hidden`: 元素在 DOM 流, 隐藏不可见, 不可触发事件.
- `opacity: 0`: 元素在 DOM 流, 透明度为 0, 可触发事件.

```css
.hidden-overflow {
  max-height: 0;
  overflow: hidden;
}

.hidden-opacity {
  position: absolute;
  opacity: 0;
  filter: opacity(0%);
}

.hidden-stacking {
  position: relative;
  z-index: -1;
}

.hidden-clip {
  position: absolute;
  clip-path: rect(0 0 0 0);
}

.hidden-visibility {
  position: absolute;
  visibility: hidden; /* visibility 具有继承性 */
}

.hidden-display {
  display: none;
}
```

## Typography

### Flexible Heading

```css
h1 {
  display: flex;
  align-items: center;
  width: 100%;
}

h1::before,
h1::after {
  flex: 1;
  height: 0.1em;
  margin: 0.2em;
  content: '';
  background-color: gray;
}
```

### Text Preset

```css
.text-primary {
  font-family: sans-serif;
  font-size: 12px;
  font-weight: 400;
  line-height: 100px;
  color: black;
  text-transform: uppercase;
  letter-spacing: 1.3px;
  text-decoration: none;
  font-display: swap;
}
```

## Landing Page

### Jumbotron Background Image

```css
h1 {
  background-image: url('bg.jpg');
  background-clip: text;
}

.jumbotron {
  min-height: 100%;
  background-image: url('');
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  opacity: 0.8;
}
```

### Muted Video

```css
.fullscreen-video {
  position: absolute;
  top: 0;
  left: 0;
  z-index: -100;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background-size: cover;
}

.fullscreen-video video {
  min-width: 100%;
  min-height: 100%;
}
```

### Search Light Effect

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

## CSS Components Reference

- CSS [tricks](https://github.com/l-hammer/You-need-to-know-css).
- CSS [inspiration](https://github.com/chokcoco/CSS-Inspiration).
