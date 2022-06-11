---
author: Sabertazimi
authorTitle: Web Developer
authorURL: https://github.com/sabertazimi
authorImageURL: https://github.com/sabertazimi.png
tags: [Web, CSS, Design]
---

# CSS Design Notes

## CSS Framework Key Points

- Design [tokens](https://blog.maximeheckel.com/posts/building-a-design-system-from-scratch).
- Content.
- Centering.
- Spacing.
- Color and contrast.
- Balance (position).
- Primary and secondary color.
- Custom text (font).
- Font family.
- Images and links.

## Typography Principles

- The typeface (font-family).
- Type (modular) scale.
- Responsiveness of the text (size unit and breakpoints).
- Spacing and vertical rhythm.
- Colors (theming).

> Refer to: font-family, font-size, spacing, color.

### Typography Properties

[![Typography Properties](./figures/TypographyProperties.png)](https://material.io/design/typography/understanding-typography.html#type-properties)

### Font Size

- Set a base-size.
- Multiples of base-size.
- Use `rem` for most font-size, use `em` for some spacing (needing responsive design).
- `rem` is better.
- `em` for responsive layout (etc. layer2 font based-on layer1 font in dropdown menu).
- Make text legible: at least `16px`.

```scss
$xs: $base / $ratio / $ratio;
$sm: $base / $ratio;
$md: $base;
$lg: $base * $ratio;
$xl: $base * $ratio * ratio;
```

### Spacing

Make text breathe:

- `margin/padding`: at least `15px`.
- `line-height`: `1.4`.
- `word-spacing`.
- `letter-spacing`.
- 60-100 characters per line.

### Vertical Rhythms

Keep vertical spaces between elements on a page
consistent (and relative) to each other:

- Set the vertical white space between elements to a multiple of base-size.
- Set the line-height of all text elements to a multiple of base-size.
- Set `margin-top` and `margin-bottom` to `<h1>` ~ `<h6>`/`<hr>` elements
  set `margin-bottom` to normal elements.

### Line Length

The optimal line length for body text is `50`–`75` characters:

- Shorter or longer line lengths can hurt readability.

```css
.line-length {
  margin-top: 2em;
  line-height: 1.5em;
  letter-spacing: 0.12em;
  word-spacing: 0.16em;
}
```

### Table Typography

- Remove fills, grid lines, border and bolding.
- Left-align text, right-align numbers
  and align headings with data.
- Put white space to work to group and separate.

### Typography Reference

- Understanding typography [guide](https://material.io/design/typography/understanding-typography).
- Practical typography [guide](https://practicaltypography.com).
- Golden rules of web typography [reference](https://noti.st/rar/mz1rIY/golden-rules-of-typography-on-the-web).
- Typeface [font matrix](https://pimpmytype.com/font-matrix/).

## Grid System

- Must have different traits at different sizes
- Must be fluid between breakpoints
- Must have enough control to decide which columns will transform and at which point
- Classes should ideally still make sense at all breakpoints

## Graceful Degradation

Write old browser css code,
then write modern browser css code:

```css
.grid {
  display: flex;

  /* old browser will ignore this rule */
  display: grid;
}
```

## HomePage User Experience

[UX research](https://baymard.com/blog/2021-current-state-of-ecommerce-homepage-ux)
point out that:

- Feature a Broad Range of Product Types (6% Don’t).
- Avoid Overly Aggressive and Distracting Ads (59% Don’t).
- Implement Carousels Carefully (75% Don’t).
- Assist the Selection of a Well-Defined Scope (62% Don’t).
- Invest in Bespoke Imagery and Design (19% Don’t).
- Make the Search Field Immediately Obvious (22% Don’t).
- Implement Country & Language Selection Carefully (35% Don’t).
- Ensure Visual Hit Areas Match the Actual Hit Areas (43% Don’t).

## Components Design Principles

- [Components Checklist](https://www.smashingmagazine.com/ebooks/checklist-cards-digital)
- [Accordion](https://www.smashingmagazine.com/2017/06/designing-perfect-accordion-checklist)
- [Responsive Configurator](https://www.smashingmagazine.com/2018/02/designing-a-perfect-responsive-configurator)
- [DateTime Picker](https://www.smashingmagazine.com/2017/07/designing-perfect-date-time-picker)
- [Feature Comparison Table](https://www.smashingmagazine.com/2017/08/designing-perfect-feature-comparison-table)
- [Slider](https://www.smashingmagazine.com/2017/07/designing-perfect-slider)
- [Birthday Picker](https://www.smashingmagazine.com/2021/05/frustrating-design-patterns-birthday-picker)
- [Mega Dropdown](https://www.smashingmagazine.com/2021/05/frustrating-design-patterns-mega-dropdown-hover-menus)
- [Frozen Filter](https://www.smashingmagazine.com/2021/07/frustrating-design-patterns-broken-frozen-filters)
- [Disabled Button](https://www.smashingmagazine.com/2021/08/frustrating-design-patterns-disabled-buttons)
- [Infinite Scroll](https://www.smashingmagazine.com/2022/03/designing-better-infinite-scroll)
- [Breadcrumbs](https://www.smashingmagazine.com/2022/04/designing-better-breadcrumbs)
- [Push Notification](https://www.smashingmagazine.com/2022/04/guide-push-notifications-developers)
- [Carousel](https://www.smashingmagazine.com/2022/04/designing-better-carousel-ux)
- [Navigation](https://www.smashingmagazine.com/2022/04/designing-better-navigation-ux-queries)
- [Language Selector](https://www.smashingmagazine.com/2022/05/designing-better-language-selector)

### Form Design Principles

- Form design [blog](https://adamsilver.io/articles/form-design-from-zero-to-hero-all-in-one-blog-post).
- Form design [book](https://www.smashingmagazine.com/printed-books/form-design-patterns).

#### Buttons Placement Principles

[Principles](https://adamsilver.io/articles/where-to-put-buttons-in-forms):

- Align the primary button to the left edge of the inputs.
- Put the back button above the form.
- Put tangentially related actions above the form.
- Place extra buttons based on what they do.
- In some single field forms put the button next to the input (e.g `search` button).
- Put buttons on multi select forms above the form.

## Responsive Design

[Responsive web design](https://alistapart.com/article/responsive-web-design):

- Fluid grid.
- Flexible image.
- Media query.
- [Mobile first](https://alistapart.com/article/mobile-first-css-is-it-time-for-a-rethink):
  `@media only screen and (min-width: 768px)`.

### Responsive Font

- `rem`/`em` font size.

### Responsive Length

- `vw`.
- `vh`.
- `vmin`.
- `vmax`.

### Responsive Size

- Size in `em` if the property scales according to it's `font-size`:
  e.g button `padding`.
- **Modular font size**:
  Size in `em` if the `font-size` should be modular
  (relative to it's context/parent).
- Size **everything else** in `rem` (include `@media` queries).

```css
/* scales to self font-size */
.container {
  margin-top: 1.2em;
}
```

```css
/* modular font size */
.container {
  font-size: 1.2rem;
}

.container p {
  font-size: 1em;
}

.container small {
  font-size: 0.9em;
}
```

### Responsive Box

#### Responsive Width and Height

- `min-height`.
- `max-height`.
- `min-width`.
- `max-width`.

```css
/* responsive images */
img {
  display: block;
  max-width: 100%;
}
```

:::caution Image Display

Image `display` set to `inline` default.

:::

#### Responsive Inline Box

use `inline-box` with `width`

```css
.element {
  display: inline-box;
  width: 80%;
}
```

#### Responsive Flex Box

```css
.box {
  display: flex;
  flex-wrap: wrap;
}

.box > .item {
  flex: 1;
}
```

#### Responsive Grid Box

```css
.box {
  display: grid;
  grid-template-areas:
    'hd'
    'st1'
    '.'
    'st2'
    '.';
  grid-template-columns: 1fr;
}

@media only screen and (min-width: 768px) {
  .box {
    grid-template-areas:
      'hd hd'
      'st1 .'
      '. st2';
    grid-template-columns: 1fr 1fr;
  }
}

@media only screen and (min-width: 1280px) {
  .box {
    grid-template-areas:
      'hd hd hd'
      'st1 . st2'
      'st1 . st2';
    grid-template-columns: 1fr 1fr 1fr;
  }
}

@media only screen and (min-width: 1536px) {
  .box {
    grid-template-areas:
      'hd st1 . st2'
      'hd st1 . st2';
    grid-template-columns: 20% 1fr 1fr 1fr;
  }
}
```

### Responsive Image

```css
.responsive-image {
  display: block;
  max-width: 100%;
  height: auto;
}
```

```html
<picture>
  <source srcset="mdn-logo-wide.png" media="(min-width: 600px)" />
  <img src="mdn-logo-narrow.png" alt="MDN" />
</picture>

<img src="x-small.png" srcset="x-small.png 300w, small.png 400w, medium.png
600w, large.png 800w, x-large.png 1200w" sizes="(min-width: 70em) 12.6875em,
(min-width: 50em) calc(25vw * 0.95 - 2.75em), (min-width: 35em) calc(95vw / 2 -
4.125em), calc(95vw - 1.375em)" " alt="Dummy Image" />
```

## Design Principles

### 费茨定律

人机交互和人体工程学中人类活动的模型,
它预测了从任意位置快速移动到一个目标位置所需的时间,
由 2 个位置的距离（D）和目标大小（S）有关, 正比于 D, 反比于 S:

- 关联性强的 UI 放置在一起.
- 大拇指点击热区.
- 屏幕边界视为无限大 (容易到达).
- 关机滑动距离长.

### 米勒定律

人的短时记忆能力广度为 7±2 个信息块:

- 手机号/银行卡号/超大数字分段放置, 信息分层 e.g `134 9999 9999`, `999, 999, 999`.
- 文章布局时增大段落间 margin, 改变部分文字的粗细/字体/颜色.
- 导航/选项卡不超过 9 个 (超过 9 个可使用 dropdown/subMenu).

### 席克定律

用户所面临的选择数量越多,
做出选择所花费的时间就越长,
在人机交互的界面中选项越多,
意味着用户做出决策的时间越长:

- 减少选项并提供默认值.
- 分类分层.
- 分步分页 (大部分手机应用注册界面).

### 泰斯勒定律

泰斯勒定律又称复杂性守恒定律,
该定律认为每一个过程都有其固有的复杂性,
这个复杂性存在一个临界点,
超过了这个点就不能再简化了,
你只能将固有的复杂性从一个地方移动到另外一个地方:

- 智能手机: 按键的复杂度转为手机操作系统的复杂度.
- 智能推荐: 用户自己选择筛选条件的复杂度转为人工智能算法的复杂度.
