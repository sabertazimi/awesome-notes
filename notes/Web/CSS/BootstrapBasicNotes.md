---
author: Sabertazimi
authorTitle: Web Developer
authorURL: https://github.com/sabertazimi
authorImageURL: https://github.com/sabertazimi.png
tags: [Web, CSS, Bootstrap]
---

# Bootstrap Basic Notes

## Custom Bootstrap Theme

- [Bootstrap CMS Theme](https://github.com/sabertazimi/hust-web/tree/main/css/bootstrap-cms)
- [Advanced Webpack Configuration](https://medium.com/@estherfalayi/setting-up-webpack-for-bootstrap-4-and-font-awesome-eb276e04aaeb)

### Bootstrap Reboot Tips

- `@import '~bootstrap/scss/reboot`;

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

### Useful Custom Functions

- `@import '~bootstrap/scss/functions';`
- `@import '~bootstrap/scss/mixins';`

```sass
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
  /* stylelint-disable-next-line function-no-unknown */
  $color: theme-color($color-name);
  /* stylelint-disable-next-line function-no-unknown */
  $color-base: if($level > 0, #000, #fff);
  $level: abs($level);

  @return mix($color-base, $color, $level * $theme-color-interval);
}

/* color contrast: color-yiq(color) */
.custom-element {
  /* stylelint-disable-next-line function-no-unknown */
  color: color-yiq(theme-color('dark'));
  /* stylelint-disable-next-line function-no-unknown */
  background-color: color-yiq(#000);
}
```

### Custom Colors

- `@import '~bootstrap/scss/variables';`

```css
$theme-colors: (
  'primary': #0074d9,
  'danger': #ff4136 'secondary': #495057,
  'success': #37b24d,
  'info': #1c7ed6,
  'warning': #f59f00,
  'danger': #f03e3e
);

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
);
```

### Custom Spacing

key variable - `$spacer`:

- t - for classes that set margin-top or padding-top
- b - for classes that set margin-bottom or padding-bottom
- l - for classes that set margin-left or padding-left
- r - for classes that set margin-right or padding-right
- x - for classes that set both `xxx`-left and `xxx`-right
- y - for classes that set both `xxx`-top and `xxx`-bottom
- blank - for classes that set a margin or padding on all 4 sides of the element
- 0 - for classes that eliminate the margin or padding by setting it to 0
- 1 - (by default) for classes that set the margin or padding to `$spacer * .25`.
- 2 - (by default) for classes that set the margin or padding to `$spacer * .5`.
- 3 - (by default) for classes that set the margin or padding to `$spacer`
- 4 - (by default) for classes that set the margin or padding to `$spacer * 1.5`.
- 5 - (by default) for classes that set the margin or padding to `$spacer * 3`.
- auto - for classes that set the margin to auto

```sass
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

### Custom Layout

```css
$grid-columns: 12;
$grid-gutter-width: 30px;
```

### Custom Borders

```css
$border-width: 1px;
$border-color: $gray-300;
$border-radius: 0.25rem;
$border-radius-lg: 0.3rem;
$border-radius-sm: 0.2rem;
```

### Custom Navbar and Navigation

```css
/* $nav-link-padding-x: 1.5rem; */
$navbar-nav-link-padding-x: 1.5rem;
$nav-link-padding-y: 1rem;

$navbar-light-color: $violet-4;
$navbar-light-hover-color: $violet-6;
$navbar-light-active-color: $violet-9;
$navbar-light-toggler-border-color: $violet-2;

$navbar-dark-color: $violet-3;
$navbar-dark-hover-color: $violet-5;
$navbar-dark-active-color: $violet-1;
$navbar-dark-toggler-border-color: $violet-1;

$nav-tabs-border-color: $primary;
$nav-tabs-link-hover-border-color: $violet-5;
$nav-tabs-link-active-color: $violet-9;
$nav-tabs-link-active-bg: $violet-3;
$nav-tabs-link-active-border-color: $violet-1;

$nav-pills-link-active-color: $white;
$nav-pills-link-active-bg: $primary;
```

### Custom Dropdown

custom `$dropdown-` variables

```css
$dropdown-padding-y: 1rem;
$dropdown-spacer: 0.5rem;
$dropdown-bg: $white;
$dropdown-border-color: $primary;
$dropdown-border-width: $border-width * 3;
$dropdown-link-color: $primary;
$dropdown-item-padding-y: 0.5rem;
$dropdown-item-padding-x: 3rem;
```

### Custom List Group

```css
$list-group-border-color: $primary;
```

### Custom Card

```css
$card-border-color: $primary;
$card-color: $primary;
$card-bg: $violet-0;
```

### Custom Breadcrumb

```css
$breadcrumb-bg: $violet-0;
$breadcrumb-divider-color: $gray-600;
$breadcrumb-active-color: $violet-3;
/* stylelint-disable-next-line function-no-unknown */
$breadcrumb-divider: quote('>');
```

### Custom Form

```css
$input-btn-padding-y: 0.75rem;
$input-btn-padding-x: 1.5rem;
$input-btn-focus-width: 0; /* remove focus box-shadow */
$custom-control-indicator-checked-color: $primary;
```

## Reference

- [BootStrap 5 CheatSheet](https://github.com/themeselection/bootstrap-cheatsheet)
