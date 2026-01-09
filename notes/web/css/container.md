---
sidebar_position: 32
tags: [Web, CSS, Responsive, Container]
---

# Container Query

## Size

当组件出现在同一视口大小 (viewport) 页面下的不同地方时,
e.g. `.main > .button` vs `.sidebar > .button`,
此时 `@media` 无法有效实现响应式组件,
使用 `@container` 可以有效实现响应式组件:

```css
.sidebar {
  container-name: sidebar;
  container-type: inline-size;
}

@container sidebar (min-width: 400px) {
  .card {
    display: grid;
    grid-template-columns: 2fr 1fr;
  }
}
```

## Style

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

Use `@container` style query to
[implement `toggle()` function](https://kizu.dev/alternating-style-queries):

```css
:is(i, em, blockquote, code) {
  font-style: var(--font-style);

  --font-style: italic;

  @container style(--font-style: italic) {
    --font-style: normal;
  }
}
```

## References

- An interactive and comprehensive CSS container queries [guide](https://ishadeed.com/article/css-container-query-guide).
