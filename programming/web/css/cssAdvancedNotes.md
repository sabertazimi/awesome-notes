# CSS Advanced Notes

<!-- TOC -->

- [CSS Advanced Notes](#css-advanced-notes)
  - [Typography Principles](#typography-principles)
    - [font-size and spacing](#font-size-and-spacing)
      - [font-size](#font-size)
      - [spacing](#spacing)
      - [vertical rhythms](#vertical-rhythms)
    - [Table](#table)
  - [Grid System](#grid-system)
  - [Graceful Degration](#graceful-degration)
  - [CSS Houdini](#css-houdini)
  - [CSS Performance](#css-performance)
    - [CSS Selectors](#css-selectors)
    - [CSS Triggers](#css-triggers)
    - [reset.css](#resetcss)
    - [will-change](#will-change)
    - [contain](#contain)
    - [window.requestAnimationFrame](#windowrequestanimationframe)
    - [CSS Loading Tips](#css-loading-tips)
    - [Animation](#animation)
      - [Best Practice](#best-practice)
      - [Animation Internal](#animation-internal)
  - [CSS Hacks](#css-hacks)
  - [Custom Bootstrap Theme](#custom-bootstrap-theme)
    - [Webpack Setup](#webpack-setup)
    - [Useful CSS Presets](#useful-css-presets)
    - [Useful Custom Functions](#useful-custom-functions)
    - [Useful Custom Variables](#useful-custom-variables)
    - [Bootstrap Reboot Tips](#bootstrap-reboot-tips)
    - [Custom Navbar](#custom-navbar)
    - [Custom Spacing](#custom-spacing)

<!-- /TOC -->

content -> centering -> font family -> spacing -> color&contrast
-> balance(position) -> primary/secondary color -> custom font -> images/links

## Typography Principles

- The typeface (font-family)
- Type (modular) scale
- Responsiveness of the text (size unit and breakpoints)
- Spacing and vertical rhythm
- Colors (theming)

> refer to: font-family, font-size, spacing, color

- [reference](https://noti.st/rar/mz1rIY/golden-rules-of-typography-on-the-web)
- [Praticel Typography](https://practicaltypography.com)

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

keep vertical spaces between elements on a page
consistent (and relative) to each other:

- Set the vertical white space between elements to a multiple of base-size
- Set the line-height of all text elements to a multiple of base-size

### Table

- remove fills, gridlines, border and bolding
- left-align text, right-align numbers
  and align headings with data
- put white space to work to group and separate

## Grid System

- Must have different traits at different sizes
- Must be fluid between breakpoints
- Must have enough control to decide which columns will transform and at which point
- Classes should ideally still make sense at all breakpoints

## Graceful Degration

write old browser css code,
then write modern browser css code

```css
.grid {
  display: flex;
}

/* old browser dosen't support this rule */
/* old browser will ignore this rule */
.grid {
  display: grid;
}
```

## CSS Houdini

- [Draft](https://drafts.css-houdini.org)
- [Implementaion Status](https://ishoudinireadyyet.com/)

CSS Houdini bring many API:

- css properties and values api:
  custom properties (--var, var(--var)), custom function (--darken(--var))
- css layout api (layoutWorklet):
  layout below (display: flex/grid), layout above (css-sizing: min-content/max-content/fit-content)
- css paint api (paintWorklet):
  background, background-color, background-image
- css composite api (compositeWorklet)

to let developers enhance css without any browser updates

## CSS Performance

### CSS Selectors

减少选择器的复杂性，与构造样式本身的其他工作相比，
选择器复杂性可以占用计算元素样式所需时间的50%以上

### CSS Triggers

- [CSS Triggers](https://github.com/GoogleChromeLabs/css-triggers)
- [JS DOM API Triggers](https://gist.github.com/paulirish/5d52fb081b3570c81e3a)

avoid to frequently change css property
or call JS DOM API triggering layout stage (reflow)

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

contain 属性允许开发者声明当前元素和它的内容尽可能的独立于 DOM 树的其他部分。
这使得浏览器在重新计算布局、样式、绘图或它们的组合的时候，只会影响到有限的 DOM 区域，而不是整个页面

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

### CSS Loading Tips

- Lazyload any CSS not needed for Start Render:
  - This could be Critical CSS;
  - or splitting your CSS into Media Queries.
- Avoid @import:
  - In your HTML;
  - but in CSS especially;
  - and beware of oddities with the Preload Scanner.
- Be wary of synchronous CSS and JavaScript order:
  - JavaScript defined after CSS won’t run until CSSOM is completed;
  - so if your JavaScript doesn’t depend on your CSS;
    - load it before your CSS;
  - but if it does depend on your CSS:
    - load it after your CSS.
- Load CSS as the DOM needs it:
  - This unblocks Start Render and allows progressive rendering.

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

## CSS Hacks

- [Browser Hacks](https://github.com/4ae9b8/browserhacks)

```css
/* stylelint-disable */
/***** Selector Hacks ******/

/* IE6 and below */
* html #uno  { color: red }

/* IE7 */
*:first-child+html #dos { color: red }

/* IE7, FF, Saf, Opera  */
html>body #tres { color: red }

/* IE8, FF, Saf, Opera (Everything but IE 6,7) */
html>/**/body #cuatro { color: red }

/* Opera 9.27 and below, safari 2 */
html:first-child #cinco { color: red }

/* Safari 2-3 */
html[xmlns*=""] body:last-child #seis { color: red }

/* safari 3+, chrome 1+, opera9+, ff 3.5+ */
body:nth-of-type(1) #siete { color: red }

/* safari 3+, chrome 1+, opera9+, ff 3.5+ */
body:first-of-type #ocho {  color: red }

/* saf3+, chrome1+ */
@media screen and (-webkit-min-device-pixel-ratio:0) {
 #diez  { color: red  }
}

/* iPhone / mobile webkit */
@media screen and (max-device-width: 480px) {
 #veintiseis { color: red  }
}

/* Safari 2 - 3.1 */
html[xmlns*=""]:root #trece  { color: red  }

/* Safari 2 - 3.1, Opera 9.25 */
*|html[xmlns*=""] #catorce { color: red  }

/* Everything but IE6-8 */
:root *> #quince { color: red  }

/* IE7 */
*+html #dieciocho {  color: red }

/* Firefox only. 1+ */
#veinticuatro,  x:-moz-any-link  { color: red }

/* Firefox 3.0+ */
#veinticinco,  x:-moz-any-link, x:default  { color: red  }

/***** Attribute Hacks ******/

/* IE6 */
#once { _color: blue }

/* IE6, IE7 */
#doce { *color: blue; /* or #color: blue */ }

/* Everything but IE6 */
#diecisiete { color/**/: blue }

/* IE6, IE7, IE8 */
#diecinueve { color: blue\9; }

/* IE7, IE8 */
#veinte { color/*\**/: blue\9; }

/* IE6, IE7 -- acts as an !important */
#veintesiete { color: blue !ie; } /* string after ! can be anything */
/* stylelint-enable */
```

## Custom Bootstrap Theme

### Webpack Setup

```json
{
  "scripts": {
    "start": "npm run dev",
    "dev": "cross-env NODE_ENV=development \
      webpack-dev-server --port 2333 --mode development --open",
    "build": "cross-env NODE_ENV=production webpack --mode production",
    "lint": "stylelint ./src/**/*.scss ./src/**/*.css && \
      eslint --ext .js --ext .jsx ./src"
  },
  "devDependencies": {
    "@babel/cli": "^7.2.3",
    "@babel/core": "^7.3.3",
    "@babel/plugin-proposal-class-properties": "^7.3.3",
    "@babel/plugin-proposal-object-rest-spread": "^7.3.2",
    "@babel/preset-env": "^7.3.1",
    "autoprefixer": "^8.6.2",
    "babel-eslint": "^10.0.1",
    "babel-loader": "^8.0.5",
    "clean-webpack-plugin": "^0.1.19",
    "cross-env": "^5.2.0",
    "css-loader": "^0.28.11",
    "eslint": "^4.19.1",
    "eslint-config-airbnb": "^17.0.0",
    "eslint-loader": "^2.1.0",
    "eslint-plugin-import": "^2.13.0",
    "eslint-plugin-jsx-a11y": "^6.1.1",
    "eslint-plugin-react": "^7.10.0",
    "html-loader": "^0.5.5",
    "html-webpack-plugin": "^3.2.0",
    "mini-css-extract-plugin": "^0.4.0",
    "node-sass": "^4.11.0",
    "postcss-loader": "^2.1.5",
    "precss": "^4.0.0",
    "sass-loader": "^7.0.3",
    "style-loader": "^0.21.0",
    "stylelint": "^9.10.1",
    "stylelint-config-mass": "^1.0.2",
    "stylelint-webpack-plugin": "^0.10.5",
    "webpack": "^4.12.0",
    "webpack-cli": "^3.0.6",
    "webpack-dev-server": "^3.2.0"
  },
  "dependencies": {
    "bootstrap": "^4.3.1",
    "jquery": "^3.3.1",
    "popper.js": "^1.14.7"
  }
}
```

```js
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');

const packageJson = require('./package.json');

const devMode = process.env.NODE_ENV !== 'production';
const useSass = !!(packageJson.devDependencies['node-sass']);

const styleLoader = [
  devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
  {
    loader: 'css-loader',
    options: {
      minimize: !devMode,
    },
  },
  'postcss-loader',
];

if (useSass) {
  styleLoader.push('sass-loader');
}

module.exports = {
  entry: {
    main: './src/index.js',
  },
  output: {
    filename: '[name].[chunkhash].js',
    path: path.resolve(__dirname, 'build'),
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          'babel-loader',
          'eslint-loader',
        ],
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: {
              minimize: !devMode,
            },
          },
        ],
      },
      {
        test: /\.(css|scss)$/,
        use: [...styleLoader],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin('build'),
    new HtmlWebpackPlugin({
      hash: true,
      template: './src/index.html',
      filename: './index.html',
    }),
    new MiniCssExtractPlugin({
      filename: devMode ? '[name].css' : '[name].[hash].css',
      chunkFilename: devMode ? '[id].css' : '[id].[hash].css',
    }),
    new StyleLintPlugin(),
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  devtool: 'source-map',
};
```

- [Advanced Webpack Configuration](https://medium.com/@estherfalayi/setting-up-webpack-for-bootstrap-4-and-font-awesome-eb276e04aaeb)

### Useful CSS Presets

- `@import '~bootstrap/scss/reboot`;

### Useful Custom Functions

- `@import '~bootstrap/scss/functions';`
- `@import '~bootstrap/scss/mixins';`

```css
@function color($key: 'blue') {
  @return map-get($colors, $key);
}

@function theme-color($key: 'primary') {
  @return map-get($theme-colors, $key);
}

@function gray($key: '100') {
  @return map-get($grays, $key);
}

@function theme-color-level($color-name: 'primary', $level: 0) {
  $color: theme-color($color-name);
  $color-base: if($level > 0, #000, #fff);
  $level: abs($level);

  @return mix($color-base, $color, $level * $theme-color-interval);
}

/* color contrast: color-yiq(color) */
.custom-element {
  background-color: color-yiq(#000);
  color: color-yiq(theme-color('dark'));
}
```

### Useful Custom Variables

- `@import '~bootstrap/scss/variables';`

```css
$theme-colors: (
  'primary': #0074d9,
  'danger': #ff4136
  'secondary':#495057,
  'success': #37b24d,
  'info': #1c7ed6,
  'warning': #f59f00,
  'danger': #f03e3e,
);

$enable-caret: true !default;
$enable-rounded: true !default;
$enable-shadows: false !default;
$enable-gradients: false !default;
$enable-transitions: true !default;
$enable-prefers-reduced-motion-media-query: true !default;
$enable-grid-classes: true !default;
$enable-pointer-cursor-for-buttons: true !default;
$enable-print-styles: true !default;
$enable-responsive-font-sizes: false !default;
$enable-validation-icons: true !default;
$enable-deprecation-messages: true !default;

$colors: (
  'blue': $blue,
  'indigo': $indigo,
  'purple': $purple,
  'pink': $pink,
  'red': $red,
  'orange': $orange,
  'yellow': $yellow,
  'green': $green,
  'teal': $teal,
  'cyan': $cyan,
  'white': $white,
  'gray': $gray-600,
  'gray-dark': $gray-800
) !default;
```

### Bootstrap Reboot Tips

Some useful best practices:

- body `font-size: 1rem` for scalable component spacing.
- avoid `margin-top` as vertical margins collapse
  (only use `margin-bottom` for headings `h1/.../h6`,
  lists `ul/ol/dl/dd`, `<pre></pre>`)
- block use `rems` for `margin` for easier scaling across device sizes
- using inherit whenever possible for `font-` property
- `box-sizing: border-box` is globally set on every element
  including `*::before` and `*::after`
- body sets a global `font-family`, `line-height` and `text-align`
- body sets `background-color: #fff` for safety
- `legend`/`fieldset` have no borders/padding/margin
- `label` are set to `display: inline-block` to allow margin
- `textarea` are modified to only be resizable vertically `resize: vertical`
  as horizontal resizing often “breaks” page layout
- `summary` are set to `cursor: pointer`

### Custom Navbar

```css
$navbar-light-color: $violet-4;
$navbar-light-hover-color: $violet-6;
$navbar-light-active-color: $violet-9;
$navbar-light-toggler-border-color: $violet-2;
```

### Custom Spacing

key variable - `$spacer`:

- t - for classes that set margin-top or padding-top
- b - for classes that set margin-bottom or padding-bottom
- l - for classes that set margin-left or padding-left
- r - for classes that set margin-right or padding-right
- x - for classes that set both *-left and *-right
- y - for classes that set both *-top and *-bottom
- blank - for classes that set a margin or padding on all 4 sides of the element
- 0 - for classes that eliminate the margin or padding by setting it to 0
- 1 - (by default) for classes that set the margin or padding to $spacer * .25
- 2 - (by default) for classes that set the margin or padding to $spacer * .5
- 3 - (by default) for classes that set the margin or padding to $spacer
- 4 - (by default) for classes that set the margin or padding to $spacer * 1.5
- 5 - (by default) for classes that set the margin or padding to $spacer * 3
- auto - for classes that set the margin to auto

```css
.mt-0 {
  margin-top: 0 !important;
}

.ml-1 {
  margin-left: ($spacer * 0.25) !important;
}

.px-2 {
  padding-right: ($spacer * 0.5) !important;
  padding-left: ($spacer * 0.5) !important;
}

.p-3 {
  padding: $spacer !important;
}

.mt-n1 {
  margin-top: -0.25rem !important;
}
```
