# CSS Advanced Notes

<!-- TOC -->

- [CSS Advanced Notes](#css-advanced-notes)
  - [Typography Principles](#typography-principles)
    - [font-size and spacing](#font-size-and-spacing)
      - [font-size](#font-size)
      - [spacing](#spacing)
      - [vertical rhythms](#vertical-rhythms)
  - [Grid System](#grid-system)
  - [Performance](#performance)
    - [CSS Triggers](#css-triggers)
    - [reset.css](#resetcss)
    - [will-change](#will-change)
    - [contain](#contain)
    - [window.requestAnimationFrame](#windowrequestanimationframe)
    - [Animation](#animation)
      - [Best Practice](#best-practice)
      - [Animation Internal](#animation-internal)

<!-- /TOC -->

## Typography Principles

- The typeface (font-family)
- Type (modular) scale
- Responsiveness of the text (size unit and breakpoints)
- Spacing and vertical rhythm
- Colors (theming)

> refer to: font-family, font-size, spacing, color

### font-size and spacing

- set a base-size
- multiples of base-size
- use rem for most font-size, use em for some spacing (needing responsive design)

```scss
$xs: $base / $ratio / $ratio;
$sm: $base / $ratio;
$md: $base;
$lg: $base * $ratio;
$xl: $base * $ratio *ratio;
```

#### font-size

- rem is better
- em for responsive layout (etc. layer2 font based-on layer1 font in dropdown menu)

#### spacing

- margin
- word-spacing
- letter-spacing

#### vertical rhythms

keep vertical spaces between elements on a page consistent (and relative) to each other:

- Set the vertical white space between elements to a multiple of base-size
- Set the line-height of all text elements to a multiple of base-size

## Grid System

- Must have different traits at different sizes
- Must be fluid between breakpoints
- Must have enough control to decide which columns will transform and at which point
- Classes should ideally still make sense at all breakpoints

## Performance

### CSS Triggers

- [CSS Property Triggers](https://github.com/GoogleChromeLabs/css-triggers)
- [JS DOM API Triggers](https://gist.github.com/paulirish/5d52fb081b3570c81e3a)

avoid to frequently change css property or call JS DOM API triggering layout stage (reflow)

### reset.css

- `*` selector has poor performance

### will-change

告知浏览器该元素会有哪些变化的方法，这样浏览器可以在元素属性真正发生变化之前提前做好对应的优化准备工作

```css
{
  will-change: auto;
  will-change: scroll-position;
  will-change: contents;
  will-change: transform;       /* Example of <custom-ident> */
  will-change: opacity;         /* Example of <custom-ident> */
  will-change: left, top;       /* Example of two <animateable-feature> */

  will-change: unset;
  will-change: initial;
  will-change: inherit;
}
```

### contain

[CSS Containment](https://developers.google.com/web/updates/2016/06/css-containment)

contain 属性允许开发者声明当前元素和它的内容尽可能的独立于 DOM 树的其他部分。这使得浏览器在重新计算布局、样式、绘图或它们的组合的时候，只会影响到有限的 DOM 区域，而不是整个页面

```css
/* 无布局包含*/
contain: none;

/* 布局包含 layout、style、paint 和 size*/
contain: strict;

/* 布局包含layout、style 和 paint */
contain: content;

/* 布局包含 size */
contain: size;

/* 布局包含 layout */
contain: layout;

/* 布局包含 style */
contain: style;

/* 布局包含 paint */
contain: paint;
```

- size: 声明这个元素的尺寸会变化，不需要去检查它依赖关系中的尺寸变化
- style: 声明那些同时会影响这个元素和其子孙元素的属性，都在这个元素的包含范围内
- layout: 声明没有外部元素可以影响它内部的布局，反之亦然
- paint: 声明这个元素的子孙节点不会在它边缘外显示。如果一个元素在视窗外或因其他原因导致不可见，则同样保证它的子孙节点不会被显示

### window.requestAnimationFrame

- reflow: `javascript -> style -> layout -> paint -> composite`
- repaint: `paint -> composite`

告诉浏览器希望执行动画并请求浏览器在下一次重绘之前调用指定的函数来更新动画。该方法使用一个回调函数作为参数，这个回调函数会在浏览器重绘之前调用

> 若想要在下次重绘时产生另一个动画画面，callback 必须调用 requestAnimationFrame

```js
const start = null;
const element = document.getElementById('SomeElementYouWantToAnimate');
element.style.position = 'absolute';

function step(timestamp) {
  if (!start) {
    start = timestamp;
  }

  const progress = timestamp - start;
  element.style.left = Math.min(progress / 10, 200) + 'px';

  if (progress < 2000) {
    window.requestAnimationFrame(step);
  }
}

window.requestAnimationFrame(step);
```

### Animation

#### Best Practice

[High Performance Tips](https://www.html5rocks.com/en/tutorials/speed/high-performance-animations)

- all animation: `keyframe` animation or `transitions` is best
- js-based animation: `requestAnimationFrame` is better than `setTimeout`/`setInterval`
- position animation:`transform: translate(npx, npx)` is better than `top`/`right`/`bottom`/`left`
- scale animation: `transform: scale(n)` better than `width`/`height`
- rotation animation: `transform: rotate(ndeg)` is better
- opacity/visibility animation: `opacity: 0...1` is better

#### Animation Internal

- `width`/`height`/`margin`/`left`/`top` in `Layout` stage
- `box-shadow`/`border-radius`/`background`/`outline`/`color` in `Paint` stage
- `cursor`/`z-index`/`transform`/`opacity` in `Composite Layers` stage
- `top`/`left` has very large time to `paint` each frame
