# CSS 3 Basic Notes

<!-- TOC -->

- [CSS 3 Basic Notes](#css-3-basic-notes)
  - [Cascading and Inheritance](#cascading-and-inheritance)
    - [Cascading Order](#cascading-order)
    - [Specificity](#specificity)
  - [Property Value](#property-value)
    - [Initial Value](#initial-value)
    - [Specified Value](#specified-value)
    - [Computed Value](#computed-value)
    - [Used Value](#used-value)
    - [Actual Value](#actual-value)
  - [Best Practice](#best-practice)
    - [Normalize](#normalize)
    - [gap](#gap)
    - [rem vs em](#rem-vs-em)
  - [属性排序](#属性排序)
    - [概述](#概述)
      - [显示属性](#显示属性)
      - [自身属性](#自身属性)
      - [文本属性](#文本属性)
    - [详细](#详细)
      - [显示属性 Detail](#显示属性-detail)
      - [自身属性 Detail](#自身属性-detail)
      - [文本属性 Detail](#文本属性-detail)
  - [命名规范](#命名规范)
    - [页面结构](#页面结构)
    - [导航](#导航)
    - [功能](#功能)
    - [CSS Files](#css-files)
  - [CSS Selector](#css-selector)
    - [pseudo-class-selector](#pseudo-class-selector)
      - [元素选择器](#元素选择器)
      - [关系选择器](#关系选择器)
      - [属性选择器](#属性选择器)
      - [伪类](#伪类)
      - [伪元素](#伪元素)
  - [常用属性](#常用属性)
    - [全局属性值](#全局属性值)
    - [Box Style](#box-style)
      - [width](#width)
      - [z-index](#z-index)
      - [overflow/overflow-x/overflow-y](#overflowoverflow-xoverflow-y)
      - [text-overflow](#text-overflow)
      - [resize](#resize)
      - [box-sizing](#box-sizing)
      - [height](#height)
      - [column](#column)
    - [Box Model](#box-model)
    - [Block Formatting Context](#block-formatting-context)
      - [Create BFC](#create-bfc)
      - [Margin Collapsing/Merging](#margin-collapsingmerging)
    - [Float Patterns](#float-patterns)
      - [fixed parent](#fixed-parent)
      - [清除浮动](#清除浮动)
      - [Float Best Practice](#float-best-practice)
    - [Stack Context](#stack-context)
    - [Position Patterns](#position-patterns)
      - [static](#static)
      - [relative](#relative)
      - [absolute](#absolute)
      - [fixed](#fixed)
    - [Flex Patterns](#flex-patterns)
      - [Under the Hood of `flex`](#under-the-hood-of-flex)
      - [Useful shorthand of `flex`](#useful-shorthand-of-flex)
      - [父元素属性](#父元素属性)
      - [子元素属性](#子元素属性)
      - [flexibity of `float`](#flexibity-of-float)
      - [fixed sidebar with flexbox](#fixed-sidebar-with-flexbox)
      - [Flexbox Best Practice](#flexbox-best-practice)
    - [Grid Patterns](#grid-patterns)
      - [Grid Attention Tips](#grid-attention-tips)
      - [Grid Alignment](#grid-alignment)
    - [分栏问题](#分栏问题)
      - [两栏布局](#两栏布局)
      - [三栏布局](#三栏布局)
        - [absolute to left/right + margin to middle](#absolute-to-leftright--margin-to-middle)
        - [float to left/right + margin to middle](#float-to-leftright--margin-to-middle)
        - [float + negative margin both to left/right](#float--negative-margin-both-to-leftright)
    - [居中问题](#居中问题)
      - [不定 block 元素水平居中](#不定-block-元素水平居中)
      - [垂直居中问题](#垂直居中问题)
      - [混合布局](#混合布局)
    - [list-style-type/image](#list-style-typeimage)
    - [align](#align)
      - [text-align](#text-align)
      - [vertical-align](#vertical-align)
    - [opacity](#opacity)
    - [border](#border)
      - [border-radius](#border-radius)
      - [border-image](#border-image)
    - [background](#background)
      - [background-image](#background-image)
      - [(moz/webkit)background-clip](#mozwebkitbackground-clip)
      - [(moz/webkit)background-origin](#mozwebkitbackground-origin)
      - [background-size](#background-size)
      - [background-attachment](#background-attachment)
      - [Background Best Practice](#background-best-practice)
        - [单背景极简欢迎首页](#单背景极简欢迎首页)
    - [text](#text)
      - [white-space](#white-space)
    - [font](#font)
      - [font-size](#font-size)
      - [font-style](#font-style)
      - [font-variant](#font-variant)
      - [font-size-adjust](#font-size-adjust)
      - [font-diplay](#font-diplay)
      - [custom function - @font-face](#custom-function---font-face)
      - [Font Best Practice](#font-best-practice)
    - [filter](#filter)
  - [Animation](#animation)
    - [animation property](#animation-property)
      - [transition+transform](#transitiontransform)
      - [animation+transform](#animationtransform)
    - [animation helper](#animation-helper)
    - [transition](#transition)
    - [transform](#transform)
      - [perspective](#perspective)
      - [transform-style](#transform-style)
      - [backface-visibility](#backface-visibility)
    - [animation](#animation)
      - [FLIP](#flip)
    - [Animation Examples](#animation-examples)
      - [Accordion Menu Animation](#accordion-menu-animation)
      - [Slides Animation](#slides-animation)
  - [Responsive Desgin](#responsive-desgin)
    - [responsive font](#responsive-font)
    - [responsive length](#responsive-length)
    - [responsive box](#responsive-box)
      - [responsive width/height](#responsive-widthheight)
      - [responsive inline-box](#responsive-inline-box)
    - [responsive image](#responsive-image)
    - [media query](#media-query)
    - [设备类型](#设备类型)
    - [设备特性](#设备特性)
      - [Style for Print PDF](#style-for-print-pdf)
  - [常用组件 (Awesome Demo)](#常用组件-awesome-demo)
    - [Flexiable Heading](#flexiable-heading)
    - [Table](#table)
    - [form](#form)
      - [select](#select)
    - [nav](#nav)
      - [基本原则](#基本原则)
      - [Hidden Link](#hidden-link)
      - [awesome style](#awesome-style)
    - [button](#button)
    - [footer](#footer)
    - [picture](#picture)
      - [圆形图片](#圆形图片)
    - [Animation Tips](#animation-tips)
    - [Resizable Component](#resizable-component)
    - [Slides](#slides)
    - [Layout](#layout)
      - [相同单元](#相同单元)
      - [元素定位](#元素定位)
  - [CSS Variables](#css-variables)
  - [UI Libraries && Components](#ui-libraries--components)
    - [Utils](#utils)
    - [Society](#society)
    - [Mouse Effect](#mouse-effect)
    - [Message](#message)
      - [Calendar](#calendar)
      - [Time](#time)
    - [Documentation](#documentation)
    - [Editor](#editor)
      - [Emoji](#emoji)
    - [Video](#video)
    - [Fonts](#fonts)
    - [Images](#images)
      - [Size](#size)
      - [Slide](#slide)
      - [Filter](#filter)
      - [Icons](#icons)
    - [Animation Component](#animation-component)
      - [Loading Spinner](#loading-spinner)
      - [Particles](#particles)
      - [Hover Component](#hover-component)
      - [Prompt](#prompt)
      - [Message UI](#message-ui)
    - [Content](#content)
      - [Card](#card)
      - [List](#list)
      - [Nav](#nav)
      - [Menu](#menu)
    - [Graph/Chart](#graphchart)
      - [Graph](#graph)
      - [Chart](#chart)
    - [Form](#form)
      - [Input](#input)
      - [Search Bar](#search-bar)
      - [Select](#select)
      - [Validate](#validate)
    - [Layout Component](#layout-component)
      - [Page](#page)
      - [Grid](#grid)
      - [Split](#split)
      - [Scroll](#scroll)
      - [Position](#position)
      - [Mail](#mail)
      - [Slide Component](#slide-component)
      - [Gallery](#gallery)
    - [Geometry](#geometry)
      - [Blocks](#blocks)
    - [Template](#template)
    - [Framework](#framework)
    - [Audio](#audio)
    - [Table Library](#table-library)
    - [File](#file)
      - [File Tree View](#file-tree-view)

<!-- /TOC -->

## Cascading and Inheritance

### Cascading Order

1. user agent normal
2. user normal
3. author normal
4. CSS Animations
5. author !important
6. user !important
7. user agent !important

### Specificity

specificiy has 4 bits - thousands, hundreds, tens, ones `0000`:

- thousands: inline-style
- hundreds: ID selector
- tens: class selector, attribute selector, pseudo-class(:)
- ones: element selector, pseudo-element(::)

> Universal selector (*), combinators (+, >, ~, ' ')
> negation pseudo-class (:not) have no effect on specificity,
> but selectors in it have effect on specificity

```scss
h1 {
  specificity: 0001;
}

#id {
  specificity: 0100;
}

h1 + p::first-letter {
  specificity: 0003;
}

li > a[href*="en-US"] > .inline-warning {
  specificity: 0022;
}

/* <h1 style="color: black">Hello</h1> */
inline-style {
  specificity: 1000;
}
```

```css
/* specificity: 0101 */
#outer a {
  background-color: red;
}

/* specificity: 0201 */
/* win */
#outer #inner a {
  background-color: blue;
}

/* specificity: 0104 */
#outer div ul li a {
  color: yellow;
}

/* specificity: 0113 */
/* win */
#outer div ul .nav a {
  color: white;
}

/* specificity: 0024 */
div div li:nth-child(2) a:hover {
  border: 10px solid black;
}

/* specificity: 0023 */
div li:nth-child(2) a:hover {
  border: 10px dashed black;
}

/* specificity: 0033 */
/* win */
div div .nav:nth-child(2) a:hover {
  border: 10px double black;
}
```

Styles for a directly targeted element will
always take precedence over inherited styles,
regardless of the specificity of the inherited rule

```css
#parent {
  color: green;
}

/* <h1> element will be purple */
h1 {
  color: purple;
}
```

## Property Value

### Initial Value

The initial value of a CSS property is its default value,
as listed in its definition table

### Specified Value

The specified value of a CSS property is the value
it receives from the document's style sheet

### Computed Value

The computed value of a CSS property is the value that
is transferred from parent to child during inheritance.
It is calculated from the specified value by:

1. Handling the special values `inherit`, `initial`, `unset`, and `revert`
2. Doing the computation needed to reach the value described in the
  "Computed value" line in the property's definition table

### Used Value

The used value of a CSS property is its value after all calculations
have been performed on the computed value:

- The used values of dimensions (e.g., width, line-height) are in pixels
- The used values of shorthand properties (e.g., background)
  are consistent with those of their component properties
  (e.g., background-color or background-size) and with position and float

### Actual Value

The actual value of a CSS property is the used value of that property
after any necessary approximations have been applied

The user agent performs four steps to calculate a property's actual (final) value:

1. the specified value is determined based on the result of
  cascading, inheritance, or using the initial value.
2. the computed value is calculated according to the specification
  (for example, a span with position:
  absolute will have its computed display changed to block)
3. layout is calculated, resulting in the used value
4. the used value is transformed according to
  the limitations of the local environment,
  resulting in the actual value

> initial -> specified -> computed -> used -> actual value

```css
span {
  position: absolute;
} /* display computed to `block` */
```

## Best Practice

### Normalize

```css
html {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-size: 100%;
}

*,
*::before,
*::after {
  box-sizing: inherit;
  margin: inherit;
  padding: inherit;
}

body {
  line-height: 1.5;
}
```

### gap

```css
* + * {
  margin-top: 1.5em;
}
```

### rem vs em

- Size in em if the property scales according to it’s font-size

```css
.container {
  margin-top: 1.2em;
}
```

Size in em if the font-size should be modular
(relative to it's context/parent): `Modular Font Size`

```css
.container {
  font-size: 1.2rem;
}

.container  p {
  font-size: 1em;
}

.container  small {
  font-size: 0.9em;
}
```

- Size everything else in rem (include media queries)

## 属性排序

### 概述

> 显示属性 -> 自身属性 -> 文本属性

#### 显示属性

- position
- display
- float
- clear

#### 自身属性

- width
- height
- margin
- padding
- border
- list-style
- background

#### 文本属性

- color
- font
- text-decoration
- text-align
- vertical-align
- white-space
- other text
- content

### 详细

#### 显示属性 Detail

- position
- z-index
- top
- right
- bottom
- left
- box-sizing
- display
- visibility
- float
- clear

#### 自身属性 Detail

- width
- min-width
- max-width
- height
- min-height
- max-height
- overflow
- margin
- margin-top
- margin-right
- margin-bottom
- margin-left
- padding
- padding-top
- padding-right
- padding-bottom
- padding-left
- border
- border-width
- border-top-width
- border-right-width
- border-bottom-width
- border-left-width
- border-style
- border-top-style
- border-right-style
- border-bottom-style
- border-left-style
- border-color
- border-top-color
- border-right-color
- border-bottom-color
- border-left-color
- outline
- list-style
- table-layout
- caption-side
- border-collapse
- border-spacing
- empty-cells
- background
- background-color
- background-image
- background-repeat
- background-position

#### 文本属性 Detail

- color
- font
- font-family
- font-size
- font-weight
- line-height
- text-align
- text-indent
- text-transform
- text-decoration
- letter-spacing
- word-spacing
- white-space
- vertical-align
- opacity
- cursor
- content
- quotes

## 命名规范

### 页面结构

- 容器: container
- 页头：header
- 内容：content/container
- 页面主体：main
- 页尾：footer
- 导航：nav
- 侧栏：sidebar
- 栏目：column
- 页面外围控制整体佈局宽度：wrapper
- 左右中：left right center

### 导航

- 导航：nav
- 主导航：mainnav
- 子导航：subnav
- 顶导航：topnav
- 边导航：sidebar
- 左导航：leftsidebar
- 右导航：rightsidebar
- 菜单：menu
- 子菜单：submenu
- 标题: title
- 摘要: summary

### 功能

- 标志：logo
- 广告：banner
- 登陆：login
- 登录条：loginbar
- 注册：register
- 搜索：search
- 功能区：shop
- 标题：title
- 加入：joinus
- 状态：status
- 按钮：btn
- 滚动：scroll
- 标籤页：tab
- 文章列表：list
- 提示信息：msg
- 当前的: current
- 小技巧：tips
- 图标: icon
- 注释：note
- 指南：guild
- 服务：service
- 热点：hot
- 新闻：news
- 下载：download
- 投票：vote
- 合作伙伴：partner
- 友情链接：link
- 版权：copyright

### CSS Files

- abstracts: $variables, @mixin function
- vendors: external libraries (font-awesome, bootstrap)
- base: normalize.css, reset.css, utils.css, font.css, base.css
  (margin-right, text-center, float-right)
- components: form.css, button.css, navbar.css, dropdown.css
- layout: columns.css, grid.css, header.css, footer.css, section.css, navigation.css
- pages: home.css, about.css
- themes: color.css, font.css
- main.css

## CSS Selector

![CSS 3 Selector](images/css3-selector-lest.png)

### pseudo-class-selector

#### 元素选择器

```css
p {
  margin-bottom: 1em;
  line-height: 1.5em;
}
```

#### 关系选择器

- E F：所有后代选择器

```css
ul li {
  margin-bottom: 0.5em;
}
```

E > F：直接子选择器

```css
ul > li {list-style: none;} /* 仅限ul的直接子元素li，忽略嵌套子元素 */
```

E + F：直接相邻兄弟选择器

```css
li + li {
  border-top: 1px solid #ddd;
}
```

E ~ F：一般兄弟选择器

```css
//定位具有相同父元素的，h1标签之后的所有p标签
h1 ~ p {
  color: #f00;
}
```

#### 属性选择器

`E[attr]`

```scss
input[required] {border: 1px solid #f00;} //定位页面里所有具有必填属性"required"的input
```

`E[attr=val]`

```scss
input[type=password] {border: 1px solid #aaa;} //定位页面里的密码输入框
```

`E[attr|=val]`

```scss
p[class|=a] {color: #333;} //定位页面里所有的P段落里具有class属性且属性值为a或是a-开始的，比如class="a"以及class="a-b"
```

`E[attr~=val]`

```scss
// 定位页面里所有具有属性title且属性值里拥有完整单词english的div容器
// 比如title="english"以及title="a english"
div[title~=english] {color: #f88;}
```

`E[attr^=val]`

```scss
div[class^=a] {color: #666;} //定位页面里具有属性class且属性值以a开头的div容器，比如class="a"以及class="ab"
```

`E[attr$=val]`

```scss
div[class$=a] {color: #f00;}
//定位页面里具有属性class且属性值以a结尾的div窗口，比如class="nba"以及class="cba"
```

`E[attr*=val]`

```scss
a[title*=link] {text-decoration: underline;}
//定位所有title里具有link字符串的a链接
```

#### 伪类

- :link：未访问的链接；
- :visited：已访问的链接，不建议使用；
- :hover：鼠标移动到容器，不仅限于链接，可用于页面中的任何元素；

> link - visited - hover order matters

- :active：被激活时的状态，不仅限于链接，可用于任何具有tabindex属性的元素；
- :focus：获得焦点时状态，不仅限于链接，可用于任何具有tabindex属性的元素：
- :enabled：已启用的界面元素：`input`
- :disabled：已禁用的界面元素：`input`
- :target：该选择器定位当前活动页面内定位点的目标元素, #anchor-name `#info:target {font-size:24px;}`
- :default：应用于一个或多个作为一组类似元素中的默认元素的UI元素；
- :valid：应用于输入验证有效元素，基于input的type/pattern属性
- :invalid：应用于输入验证无效元素，
- :in-range：应用于具有范围限制的元素，其中该值位于限制内；比如具有min和max属性的number和range输入框；
- :out-of-range：与:in-range选择相反，其中该值在限制范围外；
- :required：应用于具有必填属性required的表单控件；
- :optional：应用于没有必填属性required的所有表单控件
- :read-only：应用于其内容无法供用户修改的元素；
- :read-write：应用于其内容可供用户修改的元素，比如输入框；
- :root：根元素，始终指html元素；
- E :nth-child(n) 选择 E 的第 n 个孩子
- E F:nth-child(n)：该选择器定位元素E的第n个子元素的元素F,可省略E
- E F:nth-last-child(n)：该选择器定位元素E的倒数第n个子元素的元素F,可省略E
- E F:nth-of-type(n)：该选择器定位元素E的第n个指定类型子元素,可省略E
- E F:nth-lash-of-type(n)：该选择器定位元素E的导数第n个指定类型子元素,可省略E
- E F:first-child
- E F:last-child
- E F:first-of-type
- E F:last-of-type
- E F:only-child
- E F:only-of-type
- E:empty：没有子元素的元素，没有子元素包括文本节点；
- E:lang(en)：具有使用双字母缩写(en)表示的语言的元素；
- E:not(exception)：该选择器将选择与括号内的选择器不匹配的元素：

```html
<a href="#p1">p1</a>
<div id="p1">p1</div>
```

```css
div:target {
  background-color: purple;
}

#p1:target {
  background-color: purple;
}
```

#### 伪元素

- ::first-line：匹配文本首行；
- ::first-letter：匹配文本首字母；
- ::selection：匹配突出显示的文本：

```css
//定义选中的文本颜色与背景色
::selection {background:#444; color:#fff;}
```

- ::before 与 ::after ：使用 contnet 属性生成额外的内容并插入在标记中：

```css
a:after { content: "↗"; }
```

attr() – 调用当前元素的属性

```css
a:after { content:"(" attr(href) ")"; }
```

url() / uri() – 用于引用媒体文件

```css
h1::before { content: url(logo.png); }
```

counter() –  调用计数器，可以不使用列表元素实现序号功能,配合CSS3中`counter-increment`和`counter-reset`属性

```css
h2:before {
    counter-increment: chapter;
    content: "Chapter " counter(chapter);
}
```

- [利用伪类画额外图形](https://css-tricks.com/examples/ShapesOfCSS/)

```css
.first-details-intro::after {
     width: 0;
     height: 0;
     content: "";
     position: absolute;
     top: 50%;
     right: 0;
     border-top: 15px solid transparent;
     border-right: 25px solid #fff;
     border-bottom: 15px solid transparent;
}
```

## 常用属性

### 全局属性值

- auto
- inherit
- initial 指定为默认值，用于消除样式
- none

### Box Style

#### width

auto with `css-sizing`:
present for `fill-available/max-content/min-content/fit-content`

#### z-index

数值越大，处于可视的优先级越大

#### overflow/overflow-x/overflow-y

visible,hidden,scroll,auto

#### text-overflow

- clip     切除溢出部分
- ellipsis 省略号标志

```css
.truncation-article-container {
  width: 500px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
```

```css
.article-container {
  display: -webkit-box;
  word-break: break-all;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 4; /* 需要显示的行数 */
  overflow: hidden;
  text-overflow: ellipsis;
}
```

#### resize

前置属性:overflow

```css
/*允许用户修改元素尺寸*/
resize: none/both/horizontal/vertical/inherit;
```

#### box-sizing

content-box(default), padding-box, border-box

#### height

XXvh(viewport height)

直接计算宽度/高度

```js
cal(50% - 100px);
cal(10em + 3px);
```

#### column

```css
/*子元素分列*/
.three-column {
  padding: 1em;
  -moz-column-count: 3;
  -moz-column-gap: 1em;
  -webkit-column-count: 3;
  -webkit-column-gap: 1em;
  column-count: 3;
  column-gap: 1em;
}
```

- column-count
- column-width
- column-gap         分隔距离
- column-rule(style) 分隔线

### Box Model

- block-level box: display 属性为 block, list-item, table 的元素,
  会生成 block-level box，并且参与 block formatting context
- inline-level box: display 属性为 inline, inline-block, inline-table 的元素，
  会生成 inline-level box，并且参与 inline formatting context
- Flex Formatting Context(FFC)
- Grid Formatting Context(GFC)

### Block Formatting Context

- 一个BFC包含创建该上下文元素的所有子元素，但不包括创建了新BFC的子元素的内部元素
- BFC就是页面上的一个隔离的独立容器, 容器里面的子元素不会影响到外面的元素, 反之也如此
- 一个元素不能同时存在于两个BFC中: 可让处于BFC内部的元素与外部的元素相互隔离
- 内部的Box会在垂直方向，一个接一个地放置
- vertical margin collapsing
- 每个元素的margin box的左边, 与包含块border box的左边相接触
- BFC的区域不会与 float box 重叠: 自适应分栏布局, 清除外/内部浮动
- 计算BFC的高度时, 浮动元素也参与计算: 防止内边距塌陷 (margin-top collapse with margin-bottom)

#### Create BFC

- 根元素或其它包含它的元素
- overflow: not visible (i.e hidden)
- float: left/right
- position: absolute/fixed
- display: inline-block
- display: table-cell/table-caption/table-*h
- display: flow-root
- direct children of `display: flex/inline-flex`
- direct children of `display: grid/inline-grid`

#### Margin Collapsing/Merging

- closet sibling: 1's margin-bottom with 2's margin-top
- parent and it's first/last child: up with up (bottom with bottom)
- empty block: margin-top with margin-bottom

### Float Patterns

float make element specified value of `display`:

- `inline-table` computed to `table`
- `inline`/`inline-block`/`table-*` computed to `block`

#### fixed parent

> Floating wont work inside fixed or absolute divs unless specify widthh

```css
.parent {
    position: fixed;
    left: 0px;
    top: 5px;
    width: 100%;
}
```

#### 清除浮动

**Best Practice**: 为父容器添加 clearfix class
`display: table` 防止外边距塌陷, `clear: both` 清楚浮动

```css
.clearfix:before,
.clearfix:after {
  content: "";
  display: table;
}
.clearfix:after {
  clear: both;
}
.clearfix {
  *zoom: 1;
}
```

#### Float Best Practice

- 段中部分元素浮动(结合 margin/padding), 可实现内嵌效果
- 分栏布局

### Stack Context

The root element forms the root stacking context.
Other stacking contexts are generated by any positioned element
(including relatively positioned elements)
having a computed value of `z-index` other than `auto`.

Once apply a `position` property to a box,
can use the `z-index` property to adjust its stack level.

### Position Patterns

position

#### static

- top/left/width/right/z-index are invalid

#### relative

使元素相对于 static 布局, 可使用`top/bottom/left/right`属性进行平移

#### absolute

- 使元素相对于 浏览器窗口/父元素(`positoin: non-static`) 布局
  - 若 body 为 static, 则元素不会随着滚动条滚动, 其相对于初始窗口布局
- 可使用`top/bottom/left/right`属性进行定位
- `float: none`
- display: `inline-table` computed to `table`
- display: `inline`/`inline-block`/`table-*` computed to `block`

#### fixed

- 使元素想对于 浏览器窗口 布局, 但不受滑动条影响
- 可使用`top/bottom/left/right`属性进行定位
- `float: none`
- display: `inline-table` computed to `table`
- display: `inline`/`inline-block`/`table-*` computed to `block`

```css
/* 使子元素可以相对于父元素布局*/

.parent {
  position: relative;
}

.children {
  position: absolute;

  top: auto;
  left: 0;
}
```

### Flex Patterns

[Complete Guid to Flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)

#### Under the Hood of `flex`

当 flex-basis 设置为 auto 且 width（或者height）不为 auto 时，计算 used size 时会用到 width（或者height）的值

- when there is some free space left:
  true width = `flex-basis` (or `width`) + `flex-grow`/sum of `flex-grow`
- when there is not enough space:
  true width = `flex-basis` (or `width`) - `flex-shrink`/sum of `flex-shrink`
- text nodes and pseudo-elements can be flex children

#### Useful shorthand of `flex`

`flex: flex-grow flex-shrink flex-basis`

- `flex:auto`:

元素会根据自身的宽度与高度来确定尺寸，但是会自行伸长以吸收flex容器中额外的自由空间，
也会缩短至自身最小尺寸以适应容器 equal to`flex: 1 1 auto`

- `flex:initial`:

属性默认值， 元素会根据自身宽高设置尺寸。它会缩短自身以适应容器，
但不会伸长并吸收flex容器中的额外自由空间来适应容器 equal to `flex: 0 1 auto`

- `flex:none`:

元素会根据自身宽高来设置尺寸。它是完全非弹性的：既不会缩短，也不会伸长来适应flex容器 equal to `flex: 0 0 auto`

- `flex:<positive-number>`

元素会被赋予一个容器中自由空间的指定占比 equal to `flex: <positive-number> 1 0`

#### 父元素属性

```css
display: flex;
flex-direction: row/column;
flex-wrap: nowrap/wrap/wrap-reverse;
justify-content: flex-start/flex-end/center/space-between/space-around;
align-content: flex-start/flex-end/center/space-between/space-around;
align-items: flex-start/flex-end/center/baseline/stretch;
```

#### 子元素属性

```css
flex: number;  /*宽/高度权重*/
order: number; /*显示顺序*/
flex-basis: number;
flex-shrink: number;
flex-grow: number;
align-self: auto/flex-start/flex-end/center/baseline/stretch;
```

#### flexibity of `float`

```html
<div class="parent">
    <div class="child></div>
</div>
```

```css
.parent {
  display: flex;
}

.child {
  /* this will push child to the right of parent border */
  margin-left: auto;
}
```

#### fixed sidebar with flexbox

```html
<body>
  <aside></aside>
  <main></main>
</body>
```

```css
body {
  height: 100vh;
  margin: 0;
  display: flex;
}

aside {
  flex: 0 0 auto; /* inflexible */
}

main {
  flex: 1 1 auto; /* auto flexible */
  overflow: auto;
}
```

#### Flexbox Best Practice

```css
.container {
  display: -webkit-flex;
  display: flex;
}

.initial {
  /*width: 100px~200px*/
  -webkit-flex: initial;
          flex: initial;
  width: 200px;
  min-width: 100px;
}
.none {
  /*width: 200px*/
  -webkit-flex: none;
          flex: none;
  width: 200px;
}
.flex1 {
  /*width: left width * 1/3*/
  -webkit-flex: 1;
          flex: 1;
}
.flex2 {
  /*width: left width * 2/3*/
  -webkit-flex: 2;
          flex: 2;
}
```

```css
/*子元素全部居中对齐*/
.vertical-container {
  height: 300px;

  display: -webkit-flex;
  display:         flex;

  -webkit-align-items: center;
          align-items: center;
  -webkit-justify-content: center;
          justify-content: center;
}
```

```css
.layer {
    display: flex;
    margin: 5px;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    border: 1px solid #000;
    background-color: #fff;
    flex-grow: 1;
}
```

### Grid Patterns

[Complete Grid Guide](https://css-tricks.com/snippets/css/complete-guide-grid/)

```css
.container {
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-columns: repeat(3, 1fr);
  /*
   * grid-template-columns:
   *   repeat([auto-fit / auto-fill / numbers], minmax(60px, 1fr));
   */

  grid-template-rows: 1fr 1fr 1fr;
  grid-template-rows: minmax(90px, 1fr);

  grid-template-areas:
    "header header header"
    "advert content content"
    "footer footer footer";

  grid-gap: 10px;
  justify-items: center;
  align-items: end;
}

.item {
  grid-row: start / end; /* 2 / -1 */
  grid-column: start / end;
  grid-area: footer;
  /* grid-area: hstart / vstart / hend / vend */
  justify-self: center;
  align-self: end;
}
```

```css
.items {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
}
```

*named* rows and columns

```css
.main {
  display: grid;
  grid-column-gap: 2rem;
  grid-row-gap: 1rem;
  grid-template-rows: [header] 100px [body] auto;
  grid-template-columns:
    [left-gutter] 1fr [sidebar] 4fr [content] 8fr [right-gutter] 1fr;
}

.header {
  grid-row: header;
  grid-column: sidebar / right-gutter;
}

.sidebar {
  grid-row: body;
  grid-column: sidebar;
}

.content {
  grid-row: body;
  grid-column: content;
}
```

#### Grid Attention Tips

- `grid-column` will refactor template of grid (`grid-template-columns`)
- `grid-row` will refactor template of grid (`grid-template-rows`)

#### Grid Alignment

- `justify-content`/`align-content` content within element,
  attach to **parent** css selector
  (effectively adjusts `padding` of parent)
- `justify-items`/`align-items` inline items inside box,
  attach to **parent** css selector
  (controls `margin` of children )
- `justify-self`/`align-self` inline element within parent,
  attach to **chilren** css selector
  (effectively adjusts `margin` of children)

### 分栏问题

- float 左右元素 + margin 中间元素
- float 元素 + width: %

#### 两栏布局

利用父元素 relative 与 子元素 absolute 进行布局

- inline-block + inline-block
- float + float
- float + margin-left
  (block element ignore float element, inline element surround float element)
- absolute + margin-left (absolute element not in normal flow)
- float + BFC

```css
.div-1 {
    position:relative;
}

.div-1a {
    position:absolute;
    top:0;
    right:0;
    width:200px;
}

.div-1b {
    position:absolute;
    top:0;
    left:0;
    width:200px;
}
```

#### 三栏布局

##### absolute to left/right + margin to middle

position .left and .right with absolute, add margin-left and margin-right to .middle

##### float to left/right + margin to middle

```html
.left
.right
.middle
```

```css
.left {
  float: left;
}

.right {
  float: right;
}

.middle {
  margin: 0 right-width 0 left-width;
}
```

##### float + negative margin both to left/right

On a floated element, a negative margin opposite the float direction will decrease
the float area, causing adjacent elements to overlap the floated element. A negative
margin in the direction of the float will pull the floated element in that direction.

1. HTML: .middle first
2. padding-left and padding-right to .container,
  `min-width: 2 * (leftWidth + rightWidth)` to container
3. Float: `float: left` to .left/.middle/.right
4. Negative Margin: `margin-left: -100%` to .left,
  `margin-right: -rightWidth px` to .right
5. Move: `right: leftWidth px` to .left

```html
<div class="container">
  <div class="middle"></div>
  <div class="left"></div>
  <div class="right"></div>
</div>
```

```css
.container {
  padding: 0 200px 0 300px; /* padding-left = .left width, same to .right */
}

.container .middle {
  float: left;
  width: 100%;
  background-color: blueviolet;
}

.container .left {
  float: left;
  position: relative;
  right: 300px;
  width: 300px;
  margin-left: -100%;
  background-color: darkblue;
}

.container .right {
  float: left;
  position: relative;
  width: 200px;
  margin-right: -200px;
  background-color: darkred;
}
```

### 居中问题

[CSS Tricks - Centering CSS Complete Guide](https://css-tricks.com/centering-css-complete-guide/)

#### 不定 block 元素水平居中

- 将元素改为 inline 型

```css
.container{
    text-align: center;
}
.container ul{
    display: inline;
}
```

- 父元素 float, 父子元素 relative

```css
.container{
    float:left;
    position:relative;
    left:50%
}

.container ul{
    position:relative;
    left:-50%;
}
```

#### 垂直居中问题

```css
.container{
    height:100px;
    line-height:100px;
}
```

```css
.container{
    height:300px;
    display:table-cell;     /* IE8以上及Chrome、Firefox */
    vertical-align:middle;  /* IE8以上及Chrome、Firefox */
}
```

#### 混合布局

在子容器中在设置新元素即可

### list-style-type/image

改变ul/ol前标记类型

### align

#### text-align

justify(自适应，左右都无空格)

#### vertical-align

垂直对齐方式

```css
.form__item__label {
  display: flex;
  flex-direction: row;
  align-items: center;
}
```

### opacity

0 ~ 1, 渐进效果常用属性

### border

mix transparent with non-transparent border to make shapes (e.g. triangle).

#### border-radius

#### border-image

```css
border-image: source slice width outset repeat
```

### background

#### background-image

- url()
- linear-gradient()
- radial-gradient()

#### (moz/webkit)background-clip

指定背景显示范围  content-box/padding-box/border-box

```css
h1 {
  background-image: url(bg.jpg);
  background-clip: text;
}
```

#### (moz/webkit)background-origin

指定背景绘制起点  content-box/padding-box/border-box

#### background-size

- contain
- cover

#### background-attachment

- `scroll`: scrolls with the main view, but stays fixed inside the local view
- `local`: scrolls both with the main view and the local view
- `fixed`: stays fixed no matter what
- 对于可以滚动的元素 (设置为 `overflow: scroll` 的元素),
  当 `background-attachment` 设置为 `scroll` 时, 背景图不会随元素内容的滚动而滚动
- 对于可以滚动的元素 (设置为 `overflow: scroll` 的元素）,
  设置 `background-attachment: local`, 则背景会随内容的滚动而滚动
- parallax effect: `background-attachment: fixed`

```css
background-attachment: scroll; /* 背景图相对于元素固定，背景随页面滚动而移动，即背景和内容绑定 */
background-attachment: fixed; /* 背景图相对于元素内容固定 */
background-attachment: local; /* 背景图相对于视口固定，所以随页面滚动背景不动，相当于背景被设置在了 body 上 */
```

```css
/* parallax effect */
body {
  box-sizing: border-box;
  width: 100%;
  height: 100vh;
  margin: 0;
  padding: 0;
}

.parallax {
  min-height: 60%;               /* key */
  background-attachment: fixed;  /* key */
  background-image: url('./images/bg.jpg');
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
}
```

#### Background Best Practice

##### 单背景极简欢迎首页

```css
.jumbotron {
  background-image: url("");
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;

  height: 1px;
  width: 1px;
}
```

### text

```css
.text {
  text-align: center;
  text-decoration: underline/line-through;  /* 下划线与删除线 */
}

.paragraph {
  text-indent: 2em;     /* 段落缩进 */
  line-height: 1.5em;   /* 行间距  */
  word-spacing: 50px;   /* 词间距  */
  letter-spacing: 50px; /* 字间距  */
}
```

#### white-space

html 中, 普通标签内自动忽略空格符, 并将其与空白符转换成一个空格进行输出, 可用 white-spacing 改变这一行为

```css
p {
  /* 保留所有特殊符号 */
  white-space: pre;
}
```

### font

#### font-size

Best Practice

```css
html {
    /*浏览器默认size为16px，此时将html-size自动计算为10px*/
    font-size:62.5%;
}

small {
    /*11px*/
    font-size: 1.1rem;
}

strong {
    /*18px*/
    font-size: 1.8rem;
}
```

#### font-style

normal,italic,oblique

#### font-variant

normal,small-caps(小型大写字母)

#### font-size-adjust

- 使字体保持大小，不随字体类型改变而改变
- 不同字体有不同的值(x-height/字体尺寸)

#### font-diplay

The font display timeline:

- block period: font face is not loaded,
  render an **invisible** fallback font face
  (use normally when loaded in this period)
- swap period: font face is not loaded,
  render a fallback font face
  (use normally when loaded in this period)
- failure period: the user agent treats it as a failed load
  causing normal font fallback

`font-display` - how a font face is displayed based on
whether and when it is downloaded and ready to use:

- auto: font display strategy defined by the user agent
- block: a short block period and an infinite swap period
- swap: an extremely small block period and an infinite swap period
- fallback: an extremely small block period and a short swap period
- optional: an extremely small block period and no swap period

```css
@font-face {
  font-family: ExampleFont;
  src: url(/path/to/fonts/examplefont.woff) format('woff'),
       url(/path/to/fonts/examplefont.eot) format('eot');
  font-weight: 400;
  font-style: normal;
  font-display: fallback;
}
```

#### custom function - @font-face

使用户使用服务端提供的字体(bootstrap中有使用@font-face)

```css
@font-face {
    /*:call <SNR>105_SparkupNext()*/
    font-family:mySpecialFont;
    font-style/font-weight/font-variant:inherit;
    src:url(‘./Colleen.ttf’);
}

/*selector {*/
    /*:call <SNR>105_SparkupNext()*/
    /*font-family:mySpecialFont;*/
/*}*/
```

#### Font Best Practice

```css
  text-decoration: none;
  text-transform: uppercase;

    color: black;
  line-height: 100px;

    letter-spacing: 1.3px;
    font-family: sans-serif;
    font-size: 12px;
    font-weight: 400;
```

```css
小米米官网: {
  font-family: "Arial","Microsoft YaHei","黑体","宋体",sans-serif;
}

淘宝技术研发中心: {
  font: 12px/1.5 Tahoma,Helvetica,Arial,'宋体',sans-serif;
}

加网: {
    font: 14px/1.5 'Microsoft YaHei',arial,tahoma,\5b8b\4f53,sans-serif;
}

淘宝UED: {
    font: 12px/1 Tahoma,Helvetica,Arial,"\5b8b\4f53",sans-serif;
}

一淘UX: {
    font-family: Helvetica, 'Hiragino Sans GB',
      'Microsoft Yahei', '微软雅黑', Arial, sans-serif;
}

{
    font: 12px/1 Tahoma,Helvetica,Arial,"\5b8b\4f53",sans-serif;

}
```

```c
宋体 SimSun
黑体 SimHei
微软雅黑 Microsoft YaHei
微软正黑体 Microsoft JhengHei
新宋体 NSimSun
新细明体 PMingLiU
细明体 MingLiU
标楷体 DFKai-SB
仿宋 FangSong
楷体 KaiTi
仿宋_GB2312 FangSong_GB2312
楷体_GB2312 KaiTi_GB2312

宋体：SimSun

华文细黑：STHeiti Light [STXihei]
华文黑体：STHeiti
华文楷体：STKaiti
华文宋体：STSong
华文仿宋：STFangsong
儷黑 Pro：LiHei Pro Medium
儷宋 Pro：LiSong Pro Light
標楷體：BiauKai
蘋果儷中黑：Apple LiGothic Medium
蘋果儷細宋：Apple LiSung Light


新細明體：PMingLiU
細明體：MingLiU
標楷體：DFKai-SB
黑体：SimHei
新宋体：NSimSun
仿宋：FangSong
楷体：KaiTi
仿宋_GB2312：FangSong_GB2312
楷体_GB2312：KaiTi_GB2312
微軟正黑體：Microsoft JhengHei
微软雅黑体：Microsoft YaHei

隶书：LiSu
幼圆：YouYuan
华文细黑：STXihei
华文楷体：STKaiti
华文宋体：STSong
华文中宋：STZhongsong
华文仿宋：STFangsong
方正舒体：FZShuTi
方正姚体：FZYaoti
华文彩云：STCaiyun
华文琥珀：STHupo
华文隶书：STLiti
华文行楷：STXingkai
华文新魏：STXinwei
```

### filter

来源自SVG的滤镜特效

```css
filter: url(resources.svg);/*引用SVG filter元素*/
filter: blur(5px);         /*模糊*/
filter: brightness(0.4);   /*高光*/
filter: contrast(200%);    /*对比度*/
filter: drop-shadow(16px 16px 20px blue);  /*阴影*/
filter: grayscale(50%);    /*灰度*/
filter: hue-rotate(90deg); /*色相旋转*/
filter: invert(75%);       /*颜色翻转/反相*/
filter: opacity(25%);      /*透明度*/
filter: saturate(30%);     /*饱和度*/
filter: sepia(60%);        /*老照片*/

/* Apply multiple filters */
filter: contrast(175%) brightness(3%);

/* Global values */
filter: inherit;
filter: initial;
filter: unset;
```

## Animation

- [Animation 101 Tutorial](https://github.com/cssanimation/css-animation-101)

### animation property

#### transition+transform

```css
.div {
    transform: scaleX(0);
    transition: **transform** .5s ease;
}

.div:hover {
    transform: scaleX(1);
}
```

#### animation+transform

### animation helper

- opacity
- `overflow: hidden`
- pseudo elements (::before and ::after)
- pseudo elements with animation
  (opacity, scale, translate, width/height, margin, background-position)
- :hover/:foucs/:target + animation/transform/transition
- transform: scale/translate
- animation-delay
- width/height
- max-width/max-height
- margin
- border
- background
- background-position
- background with multiple gradient
- single box-shadow
- multiple box-shadow

```css
overflow: hidden;
z-index: -1;
```

Changing top/right/bottom/left of pseduo element
can change animation start point
(e.g bottom: 0, right: 0, change width/height from 0 to 100%,
size animation will start from bottom-right corner).

### transition

- transition-property: color;
- transition-duration: 1s;
- transition-timing-function: cubic-bezier(.42, 0, .58, 1);
- transition-delay: .5s;

```css
.element {
  transition: property durtation timing-function delay;
  transition: transform .5s ease-in-out .2s;
}
```

### transform

- scale/X/Y/Z/3d(): 0 - n
- translate/X/Y/Z/3d(): n px
- rotate/X/Y/Z/3d(): deg
- skew/X/Y(): deg
- matrix()/matrix3d()
- transform-orgin: change transform start point
  `top bottom center left right`
- perspective(): 为 **3D** 转换元素定义透视视图
- keep translate(-50%, -50%) in keyframe transform peoperty list
  when using it for alignment

一般需要在容器元素上加上以下样式:

```css
.transform-container {
  perspective: 1024px;
  transform-style: preserve-3d;
}

.front .back {
  backface-visibility: hidden;
}
```

> :hover should not add to transfromed elements
> :hover should add to parent element

#### perspective

translateZ 的功能就是让元素在自己的眼前或近或远

```css
.parent {
  perspective: 201px;
}
```

其子元素:

- 设置的 translateZ 值越小，则子元素大小越小（因为元素远去，我们眼睛看到的就会变小）；
- translateZ 值越大，该元素也会越来越大
- 当 translateZ 值非常接近 201 像素，但是不超过 201 像素的时候（如 200 像素）
  该元素的大小就会撑满整个屏幕（父辈元素没有 overflow:hidden 的限制）
- 当 translateZ 值再变大，超过 201 像素的时候，该元素看不见了

#### transform-style

transform-style 属性也是3D效果中经常使用的，
其两个参数，`flat|preserve-3d`.
前者flat为默认值，表示平面的；
后者preserve-3d表示3D透视

#### backface-visibility

```css
backface-visibility: hidden;
```

当元素 `rotateY(180deg)` 时，元素将被隐藏

### animation

- transform: scale, translate, rotate, skew
- animation bounce/cache: first -100, then, +5/+20, finally 0

```css
.element {
  animation: name duration timing-function delay iteration-count direction;
}
```

> Tip : fade in body style

```css
@keyframes body-fade-in {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}

body {
    animation-name: body-fade-in;
    animation-duration: 2.5s;
    animation-timing-function: ease;
    animation-iteration-count: 1;
}
```

```css
@keyframes name {
    0%/from {
        color: red;
    }
    50% {
        color: blue;
    }
    100%/to {
        color: green;
    }
}

/*直接动画*/
.div {
  animation-name: name;
  animation-duration: 1s;
  animation-timing-function: cubic-bezier(.42, 0, .58, 1);
  animation-delay: .5s;
}

/*hover后再播放动画，高级化transform+transition*/
.div:hover {
  animation-name: name;
  animation-duration: 1s;
  animation-timing-function: cubic-bezier(.42, 0, .58, 1);
  animation-delay: .5s;
}
```

- animation-iteration-count: 执行次数 infinite
- animation-direction: 执行方向
  - normal    0%->100%方向
  - alternate/alternate-reverse 不断交替方向
  - reverse   100%->0%方向
- animation-fill-mode: forwards
- animatino-play-state: `paused`/`running`
- DOM events:
  - animationiteration: triggered after each animation iteration
  - animationend: triggered after an animation completes
  - animationstart: triggered at the start of an animation

```css
div {
  animation-play-state: paused;
}

:checked ~ div {
  animation-play-state: running;
}
```

#### FLIP

- first: 初始状态
- last: 动画结束状态
- invert: last 至 first 的 `transform` 属性
- play: `transition: transform .2s linear`

```css
/* first: scale(1), last: scale(1.2) */
.scale-up {
  transform: scale(0.8);
  transition: transform .2s linear;
}

.scale-up:hover {
  transform: none;
}
```

### Animation Examples

#### Accordion Menu Animation

```css
.menu {
  overflow: hidden;
  max-height: 0;
  transition: max-height, 0.3s;
}

.container:hover .menu,
.menu:focus {
  max-height: 1em;
}
```

#### Slides Animation

```css
.slide {
  width: 500%;
  overflow: hidden;
}

@keyframes slide {
  0% {
    margin-left: 0;
  }
  10% {
    margin-left: 0;
  }
  12% {
    margin-left: -100%;
  }
  22% {
    margin-left: -100%;
  }
  24% {
    margin-left: -200%;
  }
  34% {
    margin-left: -200%;
  }
  36% {
    margin-left: -300%;
  }
  46% {
    margin-left: -300%;
  }
  48% {
    margin-left: -400%;
  }
  58% {
    margin-left: -400%;
  }
  60% {
    margin-left: -300%;
  }
  70% {
    margin-left: -300%;
  }
  72% {
    margin-left: -200%;
  }
  82% {
    margin-left: -200%;
  }
  84% {
    margin-left: -100%;
  }
  94% {
    margin-left: -100%;
  }
  96% {
    margin-left: 0;
  }
}
```

## Responsive Desgin

### responsive font

- `em`/`rem` font-size

### responsive length

- `vw`
- `vh`
- `vmin`
- `vmax`

### responsive box

#### responsive width/height

- `min-height`
- `max-height`
- `min-width`
- `max-width`

#### responsive inline-box

use `inline-box` with `width`

```css
.element {
  display: inline-box;
  width: 80%;
}
```

### responsive image

```css
.responsive-image {
  display: block;
  max-width: 100%;
  height: auto;
}
```

```html
<picture>
 <source srcset="mdn-logo-wide.png" media="(min-width: 600px)">
 <img src="mdn-logo-narrow.png" alt="MDN">
</picture>
```

### media query

- `only` for improving compatibility with older browsers
- definition order matters when media query with a different selector

```css
@media (not/only) 设备类型 and ( (not) 设备特性),
  (not/only) 设备类型 and ( (not) 设备特性-1) and ( (not) 设备特性-2) {
  /* 样式代码 */
}
```

```css
/*screen size : 500px ~ 1000px*/
@media screen and (min-width: 500px) and (max-width: 1000px) {
    .container {
        width: 750px;
    }
}
```

### 设备类型

|类型|解释|
|:---------------|:--------------------|
|all|所有设备|
|braille|盲文|
|embossed|盲文打印|
|handheld|手持设备|
|print|文档打印或打印预览模式|
|projection|项目演示，比如幻灯|
|screen|彩色电脑屏幕|
|speech|演讲|
|tty|固定字母间距的网格的媒体，比如电传打字机|
|tv|电视|

### 设备特性

|属性|值|Min/Max|描述|
|:----------|:-------|:-----|:---------------|
|aspect-ratio|整数/整数|yes|渲染界面的宽高比例|
|device-aspect-ratio|整数/整数|yes|设备屏幕的宽高比例|
|color|整数|yes|每种色彩的字节数|
|color-index|整数|yes|色彩表中的色彩数|
|height|length|yes|渲染界面的高度|
|width|length|yes|渲染界面的宽度|
|device-height|length|yes|设备屏幕的输出高度|
|device-width|length|yes|设备屏幕的输出宽度|
|grid|整数|no|是否是基于格栅的设备|
|monochrome|整数|yes|单色帧缓冲器中每像素字节|
|resolution|分辨率(“dpi/dpcm”)|yes|分辨率|
|scan|Progressive interlaced|no|tv媒体类型的扫描方式|
|orientation|Portrait/landscape|no|横屏或竖屏|

#### Style for Print PDF

- [Page Style Standard](https://developer.mozilla.org/en-US/docs/Web/CSS/@page)
- [PDF Style Tutorial](https://www.smashingmagazine.com/2015/01/designing-for-print-with-css/)

## 常用组件 (Awesome Demo)

### Flexiable Heading

```css
h1 {
  display: flex;
  width: 100%;
  align-items: center;
}

h1::before,
h1::after {
  content: "";
  background-color: gray;
  height: .1em;
  margin: .2em;
  flex: 1;
}
```

- **reset.css**

### Table

- `margin-left: auto` to align-left
- `border: 0` and `border-collapse: collapse` to remove border line
- `table-layout: fixed` to contain cells with same width
- implement filter or pagination with `display: none` applied to `<tr>`

### form

#### select

```css
.custom-select {
    width: 15%;
    height: 35px;
    margin-right: 20px;

    /* 消除默认箭头 */
    text-indent: 0.01px;
    text-overflow: "";

    /* 自定义边框 */
    border: 0;

    /* 将箭头图片移至右端 */
    background: url('../img/arrow.png') no-repeat;
    background-color: #fff;
    background-position: right;

    /* 消除默认样式 */
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
}

.custom-select:focus {
    border: 1px solid #e74f4d;
}

.custom-select option {
    width: 100%;
    height: 25px;
    padding-left: 30px;

    color: #323333;
    background-color: #fff;

    line-height: 25px;
}

.custom-select option:hover {
    color: #fff;
    background: url(../img/tick.png) no-repeat 8px center;
    background-color: #e74f4d;
}
```

### nav

#### 基本原则

对 a 标签进行样式设置

```css
ul {
    /* 垂直菜单设置宽度, 水平菜单不设置宽度*/
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

```css
ul {
  text-align: right;
}

li {
  display: inline-block;
}
```

#### Hidden Link

```css
a {
  opacity: 0;
  cursor: default;
  pointer-events: none;
  text-decoration: none;
}
```

#### awesome style

change bottom border

```css
a {
  position: relative;
  padding-bottom: 5px;
  color: #008080;
  text-decoration: none;
}

a::after {
  position: absolute;
  bottom: 0;
  left: 50%;
  width: 0;
  height: 3px;
  background-color: #22313f;
  content: "";
}

a:hover {
  color: #22313F;
}

a:hover::after {
  left: 0;
  width: 100%;
}
```

### button

- padding

```css
a.btn-custom {
  padding: 10px 40px;
  border-radius: 0;
  background-color: #000;
  line-height: 100px;
  text-align: center;
}
```

### footer

### picture

#### 圆形图片

```css
{
    border-radius: 50%;
    overflow: hidden;
}
```

### Animation Tips

切换动画时, 需要先把之前的动画清除
(防止出现闪烁 Bug )

### Resizable Component

[Codepen Demo](https://codepen.io/ZeroX-DG/pen/vjdoYe)

```js
bottom-right:
  new_width = element_original_width + (mouseX - original_mouseX)
  new_height = element_original_height + (mouseY - original_mouseY)
bottom-left:
  new_width = element_original_width - (mouseX - original_mouseX)
  new_height = element_original_height + (mouseY - original_mouseY)
  new_x = element_original_x - (mouseX - original_mouseX)
top-right:
  new_width = element_original_width + (mouseX - original_mouseX)
  new_height = element_original_height - (mouseY - original_mouseY)
  new_y = element_original_y + (mouseY - original_mouseY)
top-left:
  new_width = element_original_width - (mouseX - original_mouseX)
  new_height = element_original_height - (mouseY - original_mouseY)
  new_x = element_original_x + (mouseX - original_mouseX)
  new_y = element_original_y + (mouseY - original_mouseY)
```

### Slides

- `position: absolute` to stack slides up
- `id` + `:target` for style current slide (change z-index)
- add animation to slide change: (prev, current, next)
  `.slide`, `.slide:target`, `.slide:target ~ slide`
- add `overflow: hidden` to `body` when animation

```html
<main>
  <section class="slide" id="slide1">
    <a class="slide-link" href="#slide2">next</a>
  </section>
  <section class="slide" id="slide2">
    <a class="slide-link" href="#slide1">prev</a>
    <a class="slide-link" href="#slide3">next</a>
  </section>
  <section class="slide" id="slide3">
    <a class="slide-link" href="#slide2">prev</a>
    <a class="slide-link" href="#slide4">next</a>
  </section>
  <section class="slide" id="slide4">
    <a class="slide-link" href="#slide3">prev</a>
    <a class="slide-link" href="#slide5">next</a>
  </section>
  <section class="slide" id="slide5">
    <a class="slide-link" href="#slide4">prev</a>
  </section>
</main>
```

```css
body {
  overflow: hidden;   /* key 1 */
}

.slide {
  box-sizing: border-box;
  position: absolute; /* key 2 */
  width: 100%;
  height: 100vh;
  z-index: 0;         /* key 3 */
}

.slide:target {
  z-index: 1;         /* key 4 */
}
```

```css
/* Rotate Fade-In Animation */
.slide {
  z-index: 0;
  transform: rotate(90deg);
  transform-origin: 0 0;
  transition: transform 1s, opacity 0.8s;
}

.slide:target {
  z-index: 1;
  transform: rotate(0deg);
}

.slide:target ~ section {
  transform: rotate(-90deg);
  opacity: 0;
}
```

当两个 `width: 100%` slide 同时处于同一水平位置,
添加左进/右进动画, 当 slide 向右滑动时,
水平的 scrollX 会直接滑到最右边,
导致幻灯片浏览异常.
[解决办法](https://github.com/sabertazimi/hust-web/blob/master/css/target-slide/index.js)
如下:

```js
const resetScollX = () => {
  window.scrollTo(0, 0);
};
```

### Layout

#### 相同单元

- ul + li + float
- .container{text-align:center;} + .content{width: xx%;}

#### 元素定位

- align
- margin + padding
- position + top/bottom/left/right
- float
- flex

## CSS Variables

```css
.element {
  height: 100vh; /* Fallback for browsers that do not support Custom Properties */
  height: calc(var(--vh, 1vh) * 100);
}
```

```js
window.addEventListener('resize', () => {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
});
```

## UI Libraries && Components

- [micro js](http://microjs.com/)

### Utils

- [CSS Reset](https://github.com/necolas/normalize.css)
- [Feature/Browser Detection](https://github.com/Modernizr/Modernizr)
- [Box Shadows](https://madeas.github.io/box-shadows)

### Society

- [一键分享](https://github.com/overtrue/share.js)
- [sharing](https://github.com/mxstbr/sharing)

### Mouse Effect

- [p5.js](https://github.com/processing/p5.js)
- [nipple.js](https://github.com/yoannmoinet/nipplejs)

### Message

#### Calendar

- [GitHub Style Calendar](https://github.com/DKirwan/calendar-heatmap)

#### Time

- [bower install pickadate](https://github.com/amsul/pickadate.js)

### Documentation

- [intro.js](https://github.com/usablica/intro.js)

### Editor

- [Wang Editor - Rich Text Editor](https://github.com/wangfupeng1988/wangEditor)
- [React Built In Editor](https://github.com/facebook/draft-js)

#### Emoji

- [OwO Keyboard Emoji](https://github.com/DIYgod/OwO)
- [Emoji Panel](https://github.com/TimeToKnow/emoji-panel)

### Video

- [Video Landingpage](https://github.com/rishabhp/bideo.js)
- [HTML5 Video Player - video.js](https://github.com/videojs/video.js)
- [plyr](https://github.com/selz/plyr)

### Fonts

- [Fontmin](https://github.com/ecomfe/fontmin)

### Images

#### Size

- [Variant Size Pictures](https://github.com/imulus/retinajs)

#### Slide

- [placeholder.js](https://github.com/hustcc/placeholder.js)
- [Pictures Viewer Gallery](https://github.com/fengyuanchen/viewerjs)

#### Filter

- [Pictures Color Style Filter](https://github.com/we-are-next/cssco)
- [Rainyday Effect](https://github.com/maroslaw/rainyday.js)
- [Canvas Manipulation](https://github.com/meltingice/CamanJS/)
- [js-imagediff](https://github.com/HumbleSoftware/js-imagediff)

#### Icons

- [SVG Logos](https://github.com/gilbarbara/logos)
- [Pure CSS Icons](https://cssicon.space/#/)

### Animation Component

- [Airbnb After Effect Solution](https://github.com/airbnb/lottie-web)
- [Awesome Effect Library - Effeckt.css](https://github.com/h5bp/Effeckt.css)
- [animate.css](https://github.com/daneden/animate.css)
- [anime.js](https://github.com/juliangarnier/anime)
- [Velocity Animation](https://github.com/julianshapiro/velocity)
- [Ramjet](https://github.com/rich-harris/ramjet)
- [barba.js](https://github.com/luruke/barba.js)
- [Scroll Up Animation](https://github.com/michalsnik/aos)
- [Mottojs - animated words](https://github.com/jrainlau/motto)

#### Loading Spinner

- [Epic Spinners](https://github.com/epicmaxco/epic-spinners)
- [Loading IO](https://loading.io/)

#### Particles

- [html5 particles](https://github.com/MapleRecall/html5-particles)

#### Hover Component

- [Image Hover](http://imagehover.io/)
- [Hovering Button Effects](https://github.com/IanLunn/Hover)
- [Balloon Hovering Tooltips](https://github.com/kazzkiq/balloon.css)
- [Hint.css - Tooltips](https://github.com/chinchang/hint.css)

#### Prompt

- [GalGame ChatView](https://github.com/webcyou/MessageViewJS)
- [popper.js](https://github.com/FezVrasta/popper.js)
- [humane js](https://github.com/wavded/humane-js)
- [Desktop Notification](https://github.com/Nickersoft/push.js)
- [Nodejs Notification](https://github.com/mikaelbr/node-notifier)

#### Message UI

- [Awesome Prompt Messenger](https://github.com/HubSpot/messenger)
- [TheaterJS - Typing Effect](https://github.com/Zhouzi/TheaterJS)

### Content

#### Card

- [GitHub Information Card](https://github.com/lepture/github-cards)
- [bootcards](https://github.com/bootcards/bootcards)

#### List

- [Sortable](https://github.com/RubaXa/Sortable)

#### Nav

- [okay nav](https://github.com/VPenkov/okayNav)

#### Menu

- [Menu Icon Click Animation](https://github.com/jonsuh/hamburgers)

### Graph/Chart

#### Graph

- [Sigmajs - Graph Drawing](https://github.com/jacomyal/sigma.js)

#### Chart

- [HTML5 Chart](https://github.com/chartjs/Chart.js)

### Form

#### Input

- [Super Placeholder](https://github.com/chinchang/superplaceholder.js)

#### Search Bar

- [React Search Bar](https://github.com/searchkit/searchkit)

#### Select

- [Awesome Chosen](https://github.com/harvesthq/chosen)

#### Validate

- [jQuery Form Validator](https://github.com/victorjonsson/jQuery-Form-Validator)

### Layout Component

#### Page

- [Full Page Layout](https://github.com/alvarotrigo/fullPage.js)
- [One Page Layout](https://github.com/davist11/jQuery-One-Page-Nav)

#### Grid

- [Bricks Layout](https://github.com/callmecavs/bricks.js)
- [Brick Layer](https://github.com/ademilter/bricklayer)

#### Split

- [SplitJS](https://github.com/nathancahill/Split.js)

#### Scroll

- [视差滚动](https://github.com/Prinzhorn/skrollr)
- [Scroll Animation](https://michalsnik.github.io/aos/)

#### Position

- [定位元素 - tether](https://github.com/HubSpot/tether)

#### Mail

- [Mail Generator](https://github.com/eladnava/mailgen)

#### Slide Component

- [One Page Style Vertical-Silde](https://github.com/MopTym/doSlide)
- [Glider.js](https://github.com/NickPiscitelli/Glider.js)
- [Awesome Slide Gallery](https://github.com/kenwheeler/slick)
- [Awesome PPT/Prezi](https://github.com/impress/impress.js)

#### Gallery

- [Light Gallery](https://github.com/sachinchoolur/lightgallery.js/)
- [Photo Swipe](https://github.com/dimsemenov/PhotoSwipe)

### Geometry

#### Blocks

- [obelisk.js](https://github.com/nosir/obelisk.js)

### Template

- [Free Bootstrap 3 Admin Template](https://github.com/puikinsh/gentelella)

### Framework

- [HTML Presentation Framework](https://github.com/hakimel/reveal.js)
- [React Material UI](https://github.com/callemall/material-ui)

### Audio

- [Howler.js](https://github.com/goldfire/howler.js)

### Table Library

- [jQuery Plugin for Render Data](https://github.com/DataTables/DataTables)
- [Extended Bootstrap Table](https://github.com/wenzhixin/bootstrap-table)

### File

#### File Tree View

- [zTree v3](https://github.com/zTree/zTree_v3)
