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

[Complete Guide](https://sass-lang.com/documentation/Sass/Script/Functions.html)