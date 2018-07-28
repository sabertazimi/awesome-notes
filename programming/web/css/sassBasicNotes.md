# Sass Basic Notes

<!-- TOC -->

- [Sass Basic Notes](#sass-basic-notes)
  - [Variable](#variable)
  - [Mixin](#mixin)

<!-- /TOC -->


## Variable

start with `$`

```sass
$heading-color: green;

h1 {
  color: $heading-color;
}
```

## Mixin

```sass
@mixin box-shadow($x, $y, $blur, $c){ 
  -webkit-box-shadow: $x, $y, $blur, $c;
  -moz-box-shadow: $x, $y, $blur, $c;
  -ms-box-shadow: $x, $y, $blur, $c;
  box-shadow: $x, $y, $blur, $c;
}

div {
  @include box-shadow(0px, 0px, 4px, #fff);
}
```
