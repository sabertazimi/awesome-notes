# Sass Basic Notes

<!-- TOC -->

- [Sass Basic Notes](#sass-basic-notes)
  - [Basis](#basis)
    - [Variable](#variable)
      - [`$` normal variable](#-normal-variable)
      - [`#` string variable](#-string-variable)
      - [`&` nesting varilable](#-nesting-varilable)
      - [map](#map)
    - [Directive](#directive)
      - [Mixin/Include](#mixininclude)
      - [if-else](#if-else)
      - [for loop](#for-loop)
      - [while loop](#while-loop)
      - [each](#each)
      - [import](#import)
      - [extend](#extend)
    - [Built-in Functions](#built-in-functions)
  - [Project Structure](#project-structure)

<!-- /TOC -->

## Basis

### Variable

#### `$` normal variable

- start with `$`

```scss
$heading-color: green;

h1 {
  color: $heading-color;
}
```

#### `#` string variable

- `#{$var}`: combine with string

#### `&` nesting varilable

parent-selector

#### map

```scss
$colors: (
  color1: blue,
  color2: red,
  color3: green
);

@each $key, $color in $colors {
  .#{$color}-text {
    color: $color;
  }
}
```

### Directive

#### Mixin/Include

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

#### if-else

```scss
@mixin border-stroke($val) {
  @if $val == light {
    border: 1px solid black;
  }
  @else if $val == medium {
    border: 3px solid black;
  }
  @else if $val == heavy {
    border: 6px solid black;
  }
  @else {
    border: none;
  }
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

#### extend

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

.big-panel{
  @extend .panel;
  width: 150px;
  font-size: 2em;
}
```

### Built-in Functions

[Offical Documentation](https://sass-lang.com/documentation/Sass/Script/Functions.html) or [Devdocs Guide](http://devdocs.io/sass-functions)

## Project Structure

[Complete Guide for Sass Directory Structure](https://vanseodesign.com/css/sass-directory-structures)
[Difference between Sass Directory Architectures](https://www.sitepoint.com/look-different-sass-architectures)

```
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

When working on a very large project with a lot of abstract utilities, it might be interesting to group them by topic rather than type, for instance typography (_typography.scss), theming (_theming.scss), etc. Each file contains all the related helpers: variables, functions, mixins and placeholders.