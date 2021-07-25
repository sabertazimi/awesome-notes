# Sass Basic Notes

[TOC]

## Sass Basis

### Variable

#### Normal Variable

- start with `$`

```scss
$heading-color: green;

h1 {
  color: $heading-color;
}
```

#### String Variable

- `#{$var}`: combine with string

#### Nesting Variable

refer to parent-selector, only use it on:

- pseudo selectors and pseudo elements

```scss
.button {
  &:hover {
    color: $color-button-hover;
  }

  &::after {
  }
}
```

- relationship selectors

```scss
.button {
  .sidebar & {
    font-size: 0.9rem;
  }
}
```

#### List

- length(\$list)
- nth($list, $n)
- set-nth($list, $n, \$value)
- index($list, $value)
- list-separator(\$list)
- append($list, $value, [$separator])

#### Map

- map-get($map, $key)
- map-merge($map, $map)
- map-remove($map, $keys)
- map-keys(\$map)
- map-values(\$map)
- map-has-key($map, $key)

```scss
$colors: (
  color1: blue,
  color2: red,
  color3: green,
);

@each $key, $color in $colors {
  .#{$color}-text {
    color: $color;
  }
}
```

#### arguments list

```scss
@mixin dummy($a, $b, $c) {
  // …
}

// Yep
@include dummy(true, 42, 'kittens');

// Yep but nope
$params: (true, 42, 'kittens');
$value: dummy(nth($params, 1), nth($params, 2), nth($params, 3));

// Yep
$params: (true, 42, 'kittens');
@include dummy($params...);

// Yep
$params: (
  'c': 'kittens',
  'a': true,
  'b': 42,
);
@include dummy($params...);
```

#### `!default` flag

only assign when variables hadn't been assigned

### Directive

#### Mixin and Include Directive

```scss
@mixin box-shadow($x, $y, $blur, $c) {
  -webkit-box-shadow: $x, $y, $blur, $c;
  -moz-box-shadow: $x, $y, $blur, $c;
  -ms-box-shadow: $x, $y, $blur, $c;
  box-shadow: $x, $y, $blur, $c;
}

div {
  @include box-shadow(0px, 0px, 4px, #fff);
}
```

#### If Else Directive

```scss
@mixin border-stroke($val) {
  @if $val == light {
    border: 1px solid black;
  } @else if $val == medium {
    border: 3px solid black;
  } @else if $val == heavy {
    border: 6px solid black;
  } @else {
    border: none;
  }
}
```

```scss
// Good
@if not index($list, $item) {
  // …
}

// Bad
@if index($list, $item) == null {
  // …
}
```

#### for loop

```scss
@for $i from 1 through 12 {
  .col-#{$i} {
    width: 100% / 12 * $i;
  }
}
```

#### while loop

```scss
$x: 1;
@while $x < 13 {
  .col-#{$x} {
    width: 100% / 12 * $x;
  }
  $x: $x + 1;
}
```

#### each

```scss
@each $color in blue, red, green {
  .#{$color}-text {
    color: $color;
  }
}
```

#### import

```scss
// import _variables.scss in main.scss
@import 'variables';
```

`~` to import scss from `node_modules`

```scss
@import '~bootstrap/scss/bootstrap';
```

#### extend

`@extend` is basically about moving selectors around:

- can't extend complex selector
- can't extend cross media query
- avoid extending from nested selectors
- avoid chaining `@extend` directives

```scss
// This CSS won't print because %equal-heights is never extended.
%equal-heights {
  display: flex;
  flex-wrap: wrap;
}

// This CSS will print because %message-shared is extended.
%message-shared {
  border: 1px solid #ccc;
  padding: 10px;
  color: #333;
}

.message {
  @extend %message-shared;
}

.success {
  @extend %message-shared;
  border-color: green;
}

.error {
  @extend %message-shared;
  border-color: red;
}

.warning {
  @extend %message-shared;
  border-color: yellow;
}
```

```scss
.panel {
  background-color: red;
  height: 70px;
  border: 2px solid green;
}

.big-panel {
  @extend .panel;
  width: 150px;
  font-size: 2em;
}
```

##### Media Queries with extend

```scss
%foo {
  content: 'foo';
}

// Wrong
@media print {
  .bar {
    // This doesn't work. Worse: it crashes.
    @extend %foo;
  }
}

// Right
@media print {
  .bar {
    @at-root (without: media) {
      @extend %foo;
    }
  }
}

// Right
%foo {
  content: 'foo';

  &-print {
    @media print {
      content: 'foo print';
    }
  }
}

@media print {
  .bar {
    @extend %foo-print;
  }
}
```

### Built-in Functions

[Official Documentation](https://sass-lang.com/documentation/Sass/Script/Functions.html)

#### Color

- `mix` is better than `lighten`/`darken`

```scss
@function tint($color, $percentage) {
  @return mix(white, $color, $percentage);
}

@function shade($color, $percentage) {
  @return mix(black, $color, $percentage);
}
```

#### Math

- round(\$number)
- ceil(\$number)
- floor(\$number)
- abs(\$number)
- max
- min

```scss
$value: 13.37;
$length: $value * 1em;

whatever {
  padding-top: round($length); // 13em
}
```

#### type and unit

- unit(\$length)
- unitless(\$length)
- type-of(\$var)
- is-type-of($var, $type)

## Error Handle

- type-of
- is-type-of
- unit
- unitless
- @warn/@error

### function error handle

```scss
@function add-10($number) {
  @if type-of($number) != 'number' {
    @warn "`#{$number}` is not a number of `add-10`.";
    @return false;
  }

  @return $number + 10;
}
```

### mixin error handle

```scss
@mixin module($name) {
  // Initialize a validity checker boolean
  $everything-okay: true;

  // Check for argument validity
  @if type-of($name) != 'string' {
    @warn '"#{$name}" is not a string for "module".';
    $everything-okay: false;
  }

  // If everything's still okay, dump mixin content
  @if $everything-okay {
    @content;
  }
}
```

### Lists Check

```scss
@if length($value) > 1 and type-of($value) != map {
  // It is a list of multiple values
}
```

## Project Structure

- [Complete Guide for Sass Directory Structure](https://vanseodesign.com/css/sass-directory-structures)
- [Difference between Sass Directory Architectures](https://www.sitepoint.com/look-different-sass-architectures)

```c
sass/
|– abstracts/
|   |– _variables.scss   # Sass Variables
|   |– _functions.scss   # Sass Functions
|   |– _mixins.scss      # Sass Mixins
|   |– _helpers.scss     # Class & placeholders helpers
|   ...                  # Etc…
|
|– vendors/
|   |– _bootstrap.scss   # Bootstrap
|   |– _jquery-ui.scss   # jQuery UI
|   ...                  # Etc…
|
|– base/
|   |– _reset.scss       # Reset/normalize
|   |– _typography.scss  # Typography rules
|   ...                  # Etc…
|
|– components/
|   |– _buttons.scss     # Buttons
|   |– _carousel.scss    # Carousel
|   |– _cover.scss       # Cover
|   |– _dropdown.scss    # Dropdown
|   |– _navigation.scss  # Navigation
|   ...                  # Etc…
|
|– layout/
|   |– _grid.scss        # Grid system
|   |– _header.scss      # Header
|   |– _footer.scss      # Footer
|   |– _sidebar.scss     # Sidebar
|   |– _forms.scss       # Forms
|   ...                  # Etc…
|
|– pages/
|   |– _home.scss        # Home specific styles
|   |– _contact.scss     # Contact specific styles
|   ...                  # Etc…
|
|– themes/
|   |– _theme.scss       # Default theme
|   |– _admin.scss       # Admin theme
|   ...                  # Etc…
|
|– main.scss             # primary Sass file
```

in `main.scss` file:

1. `@charset 'utf-8';`
2. import `abstracts`
3. import `vendors`
4. import `base`
5. import `layout`
6. import `components`
7. import `themes` (or `pages` when it's not `partial` directory)

When working on a very large project with a lot of abstract utilities,
it might be interesting to group them by topic rather than type,
for instance typography (\_typography.scss), theming (\_theming.scss), etc.
Each file contains all the related helpers: variables, functions, mixins and placeholders.

## Best Practice

### Performance

- mixin better than extend

### Children Selector

```scss
// Good
%button {
  display: inline-block;
  // … button styles

  // Relationship: a %button that is a child of a %modal
  %modal > & {
    display: block;
  }
}

.button {
  @extend %button;
}

// Bad Style
.modal {
  @extend %modal;

  > .button {
    @extend %button;
  }
}
```

## Tools

### Framework

- [Compass](http://compass-style.org)
- [Bourbon](https://www.bourbon.io)

### Sprite Builder

- [GruntIcon](https://github.com/filamentgroup/grunticon)
- [GrumpIcon](http://grumpicon.com)

### Grid System

- [Susy](http://susy.oddbird.net)
- [Singularity](https://github.com/at-import/Singularity)
- [CSSWizardry Grids](https://github.com/csswizardry/csswizardry-grids)

### Media Query

- [Sass MQ](https://github.com/sass-mq/sass-mq)
- [Breakpoint Sass](http://breakpoint-sass.com)
- [Include Media](https://github.com/eduardoboucas/include-media)
