---
sidebar_position: 2
tags: [Web, CSS]
---

# Navigation

## Float Navigation

[Styling lists](https://developer.mozilla.org/docs/Learn/CSS/Styling_text/Styling_lists):

- `list-style-type`: 改变 `ul`/`ol` 前标记类型.
- `list-style-image`: 改变 `ul`/`ol` 前标记类型.
- 设置 `<a href="#">` 样式.

```css
ul {
  /* 垂直菜单设置宽度, 水平菜单不设置宽度 */
  list-style: none;
}

/* 水平菜单 */
li {
  float: left;
}

a {
  display: inline-block;
  text-decoration: none;
  cursor: pointer;
}
```

## Inline Block Navigation

```css
ul {
  text-align: right;
}

li {
  display: inline-block;
}
```

## Dropdown Navigation

```css
.anchor {
  display: none;
}

.content {
  max-height: 0;
  overflow: hidden;
  opacity: 0;
  transition:
    max-height 0.3s,
    opacity 0.3s;
}

.anchor:target ~ .content {
  max-height: 100%;
  opacity: 1;
}
```

## Tab Navigation

```css
.tab > a {
  position: relative;
  display: inline-block;
  padding: 0.3em 1em 0;
}

.tab > a::before {
  position: absolute;
  inset: 0;
  z-index: -1;
  background: #ccc;
  background-image: linear-gradient(hsl(0deg 0% 100% / 60%), hsl(0deg 0% 100% / 0%));
  border: 1px solid rgb(0 0 0 / 40%);
  border-bottom: none;
  border-radius: 0.5em 0.5em 0 0;
  box-shadow: 0 0.15em white inset;
  transform: perspective(0.5em) rotateX(5deg);
  transform-origin: bottom;
}
```

## Footer

### Sticky Footer

- 如果页面内容不足够长时, 页脚固定在浏览器窗口的底部.
- 如果内容足够长时, 页脚固定在页面的最底部.

#### Negative Margin Sticky Footer

Negative bottom `margin` content-wrapper with **fixed `height`** footer:

```html
<body>
  <main class="wrapper">
    content
    <div class="push"></div>
  </main>
  <footer class="footer"></footer>
</body>

<style>
  html,
  body {
    height: 100%;
    margin: 0;
  }

  .wrapper {
    min-height: 100%;

    /* Equal to height of footer */

    /* But also accounting for potential margin-bottom of last child */
    margin-bottom: -50px;
  }

  .footer,
  .push {
    height: 50px;
  }
</style>
```

Negative top `margin` on **fixed `height`** footer:

```html
<body>
  <main class="content">
    <section class="content-inside">content</section>
  </main>
  <footer class="footer"></footer>
</body>

<style>
  html,
  body {
    height: 100%;
    margin: 0;
  }

  .content {
    min-height: 100%;
  }

  .content-inside {
    padding: 20px;
    padding-bottom: 50px;
  }

  .footer {
    height: 50px;
    margin-top: -50px;
  }
</style>
```

#### Calculation Sticky Footer

`calc` on **fixed height** footer:

```html
<body>
  <main class="content">content</main>
  <footer class="footer"></footer>
</body>

<style>
  .content {
    min-height: calc(100vh - 70px);
  }

  .footer {
    height: 50px;
  }
</style>
```

#### Flex Sticky Footer

Use `flex` on `body`:

```html
<body>
  <main class="content">content</main>
  <footer class="footer"></footer>
</body>

<style>
  html,
  body {
    height: 100%;
  }

  body {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }

  .content {
    flex: 1 0 auto;
  }

  .footer {
    flex-shrink: 0;
  }
</style>
```

#### Grid Sticky Footer

Use `grid` on `body`:

```html
<body>
  <main class="content">content</main>
  <footer class="footer"></footer>
</body>

<style>
  html {
    height: 100%;
  }

  body {
    display: grid;
    grid-template-rows: 1fr auto;
    min-height: 100%;
  }

  .footer {
    grid-row: 2 / 3;
  }
</style>
```

Use `gird` with `min-content`:

```html
<body>
  <div class="grid">
    <header>
      <!-- ... -->
    </header>
    <main>
      <!-- ... -->
    </main>
    <footer>
      <!-- ... -->
    </footer>
  </div>
</body>

<style>
  .grid {
    display: grid;
    grid-template-rows: min-content auto min-content;
    height: 100vh;
  }
</style>
```
