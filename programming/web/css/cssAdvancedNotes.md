# CSS Advanced Notes

<!-- TOC -->

- [CSS Advanced Notes](#css-advanced-notes)
  - [Typography](#typography)
    - [font-size and spacing](#font-size-and-spacing)
      - [font-size](#font-size)
      - [spacing](#spacing)
      - [vertical rhythms](#vertical-rhythms)

<!-- /TOC -->

## Typography

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