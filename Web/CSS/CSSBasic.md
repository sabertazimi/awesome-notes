<!-- TOC depthFrom:1 depthTo:6 withLinks:1 updateOnSave:1 orderedList:0 -->

- [CSS 3 Basic Notes](#css-3-basic-notes)
	- [属性排序](#属性排序)
		- [概述](#概述)
			- [显示属性](#显示属性)
			- [自身属性](#自身属性)
			- [文本属性](#文本属性)
		- [详细](#详细)
			- [显示属性](#显示属性)
			- [自身属性](#自身属性)
			- [文本属性](#文本属性)
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
		- [layout](#layout)
			- [position](#position)
			- [z-index](#z-index)
			- [float](#float)
		- [box](#box)
			- [overflow/overflow-x/overflow-y](#overflowoverflow-xoverflow-y)
			- [text-overflow](#text-overflow)
			- [resize](#resize)
			- [box-sizing](#box-sizing)
			- [height](#height)
			- [column](#column)
			- [flex](#flex)
				- [父元素属性](#父元素属性)
				- [子元素属性](#子元素属性)
				- [Best Practice](#best-practice)
		- [list-style-type/image](#list-style-typeimage)
		- [custom style](#custom-style)
			- [custom methods](#custom-methods)
				- [transition+transform](#transitiontransform)
				- [直接使用animation](#直接使用animation)
			- [transition](#transition)
			- [transform](#transform)
			- [animation](#animation)
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
		- [font](#font)
			- [font-size](#font-size)
			- [font-style](#font-style)
			- [font-variant](#font-variant)
			- [font-size-adjust](#font-size-adjust)
			- [custom function - @font-face](#custom-function-font-face)
		- [filter](#filter)
	- [media query](#media-query)
		- [设备类型](#设备类型)
		- [设备特性](#设备特性)

<!-- /TOC -->

# CSS 3 Basic Notes

## 属性排序

### 概述

> 显示属性 -> 自身属性 -> 文本属性

#### 显示属性

-   display
-   list-style
-   position
-   float
-   clear

#### 自身属性

-   width
-   height
-   margin
-   padding
-   border
-   background

#### 文本属性

-   color
-   font
-   text-decoration
-   vertical-align
-   white-space
-   other text
-   content

### 详细

#### 显示属性

-   display
-   visibility
-   float
-   clear
-   position
-   top
-   right
-   bottom
-   left
-   z-index

#### 自身属性

-   width
-   min-width
-   max-width
-   height
-   min-height
-   max-height
-   overflow
-   margin
-   margin-top
-   margin-right
-   margin-bottom
-   margin-left
-   padding
-   padding-top
-   padding-right
-   padding-bottom
-   padding-left
-   border-width
-   border-top-width
-   border-right-width
-   border-bottom-width
-   border-left-width
-   border-style
-   border-top-style
-   border-right-style
-   border-bottom-style
-   border-left-style
-   border-color
-   border-top-color
-   border-right-color
-   border-bottom-color
-   border-left-color
-   outline
-   list-style
-   table-layout
-   caption-side
-   border-collapse
-   border-spacing
-   empty-cells

#### 文本属性

-   font
-   font-family
-   font-size
-   line-height
-   font-weight
-   text-align
-   text-indent
-   text-transform
-   text-decoration
-   letter-spacing
-   word-spacing
-   white-space
-   vertical-align
-   color
-   background
-   background-color
-   background-image
-   background-repeat
-   background-position
-   opacity
-   cursor
-   content
-   quotes

## 命名规范

### 页面结构

-   容器: container
-   页头：header
-   内容：content/container
-   页面主体：main
-   页尾：footer
-   导航：nav
-   侧栏：sidebar
-   栏目：column
-   页面外围控制整体佈局宽度：wrapper
-   左右中：left right center

### 导航

-   导航：nav
-   主导航：mainnav
-   子导航：subnav
-   顶导航：topnav
-   边导航：sidebar
-   左导航：leftsidebar
-   右导航：rightsidebar
-   菜单：menu
-   子菜单：submenu
-   标题: title
-   摘要: summary

### 功能

-   标志：logo
-   广告：banner
-   登陆：login
-   登录条：loginbar
-   注册：register
-   搜索：search
-   功能区：shop
-   标题：title
-   加入：joinus
-   状态：status
-   按钮：btn
-   滚动：scroll
-   标籤页：tab
-   文章列表：list
-   提示信息：msg
-   当前的: current
-   小技巧：tips
-   图标: icon
-   注释：note
-   指南：guild
-   服务：service
-   热点：hot
-   新闻：news
-   下载：download
-   投票：vote
-   合作伙伴：partner
-   友情链接：link
-   版权：copyright

### CSS Files

-   主要的 master.css
-   模块 module.css
-   基本共用 base.css
-   布局、版面 layout.css
-   主题 themes.css
-   专栏 columns.css
-   文字 font.css
-   表单 forms.css
-   补丁 mend.css
-   打印 print.css

## CSS Selector

![CSS 3 Selector](images/css3-selector-lest.png)

### pseudo-class-selector

#### 元素选择器

```css
p {
    line-height:1.5em;
    margin-bottom:1em;
}
```

#### 关系选择器

-   E F：所有后代选择器

```css
ul li {
    margin-bottom:0.5em;
}
```

E > F：直接子选择器

```css
ul > li {list-style:none;} //仅限ul的直接子元素li，忽略嵌套子元素
```

E + F：直接相邻兄弟选择器

```css
li + li {
    border-top:1px
    solid #ddd;
}
```

E ~ F：一般兄弟选择器

```css
//定位具有相同父元素的，h1标签之后的所有p标签
h1 ~ p {
    color:#f00;
}
```

#### 属性选择器

`E[attr]`

```css
input[required] {border:1px solid #f00;} //定位页面里所有具有必填属性"required"的input
```

`E[attr=val]`

```css
input[type=password] {border:1px solid #aaa;} //定位页面里的密码输入框
```

`E[attr|=val]`

```csss
p[class|=a] {color:#333;}
//定位页面里所有的P段落里具有class属性且属性值为a或是a-开始的，比如class="a"以及class="a-b"
```

`E[attr~=val]`

```css
div[title~=english] {color:#f88;} //定位页面里所有具有属性title且属性值里拥有完整单词english的div容器，比如title="english"以及title="a english"
```

`E[attr^=val]`

```css
div[class^=a] {color:#666;}
//定位页面里具有属性class且属性值以a开头的div容器，比如class="a"以及class="ab"
```

`E[attr$=val]`

```css
div[class$=a] {color:#f00;}
//定位页面里具有属性class且属性值以a结尾的div窗口，比如class="nba"以及class="cba"
```

`E[attr*=val]`

```css
a[title*=link] {text-decoration:underline;}
//定位所有title里具有link字符串的a链接
```

#### 伪类

-   :link：未访问的链接；
-   :visited：已访问的链接，不建议使用；
-   :hover：鼠标移动到容器，不仅限于链接，可用于页面中的任何元素；
-   :active：被激活时的状态，不仅限于链接，可用于任何具有tabindex属性的元素；
-   :focus：获得焦点时状态，不仅限于链接，可用于任何具有tabindex属性的无线：
-   :enabled：已启用的界面元素：`input`
-   :disabled：已禁用的界面元素：`input`
-   :target：该选择器定位当前活动页面内定位点的目标元素, #anchor-name `#info:target {font-size:24px;}`
-   :default：应用于一个或多个作为一组类似元素中的默认元素的UI元素；
-   :valid：应用于输入验证有效元素，基于input的type/pattern属性
-   :invalid：应用于输入验证无效元素，
-   :in-range：应用于具有范围限制的元素，其中该值位于限制内；比如具有min和max属性的number和range输入框；
-   :out-of-range：与:in-range选择相反，其中该值在限制范围外；
-   :required：应用于具有必填属性required的表单控件；
-   :optional：应用于没有必填属性required的所有表单控件
-   :read-only：应用于其内容无法供用户修改的元素；
-   :read-write：应用于其内容可供用户修改的元素，比如输入框；
-   :root：根元素，始终指html元素；
-   E F:nth-child(n)：该选择器定位元素E的第n个子元素的元素F,可省略E
-   E F:nth-last-child(n)：该选择器定位元素E的倒数第n个子元素的元素F,可省略E
-   E F:nth-of-type(n)：该选择器定位元素E的第n个指定类型子元素,可省略E
-   E F:nth-lash-of-type(n)：该选择器定位元素E的导数第n个指定类型子元素,可省略E
-   E F:first-child
-   E F:last-child
-   E F:first-of-type
-   E F:last-of-type
-   E F:only-child
-   E F:only-of-type
-   E:empty：没有子元素的元素，没有子元素包括文本节点；
-   E:lang(en)：具有使用双字母缩写(en)表示的语言的元素；
-   E:not(exception)：该选择器将选择与括号内的选择器不匹配的元素：

#### 伪元素

-   ::first-line：匹配文本首行；
-   ::first-letter：匹配文本首字母；
-   ::selection：匹配突出显示的文本：

```css
//定义选中的文本颜色与背景色
::selection {background:#444; color:#fff;}
```

-   ::before 与 ::after ：使用 contnet 属性生成额外的内容并插入在标记中：

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

## 常用属性

### 全局属性值

-   auto
-   inherit
-   initial 指定为默认值，用于消除样式
-   none

### layout

#### position

-   static(使top/bottom/left/right属性无效化)
-   relative
-   absolute
-   fixed(不受滑动条影响)

#### z-index

数值越大，处于可视的优先级越大

#### float

### box

#### overflow/overflow-x/overflow-y

visible,hidden,scroll,auto

#### text-overflow

-   clip     切除溢出部分
-   ellipsis 省略号标志

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

-   column-count
-   column-width
-   column-gap         分隔距离
-   column-rule(style) 分隔线

#### flex

##### 父元素属性

```css
display: flex;
flex-direction: row/column;
flex-wrap: nowrap/wrap/wrap-reverse;
justify-content: flex-start/flex-end/center/space-between/space-around;
align-content: flex-start/flex-end/center/space-between/space-around;
align-items: flex-start/flex-end/center/baseline/stretch;
```

##### 子元素属性

```css
flex: number;  /*宽/高度权重*/
order: number; /*显示顺序*/
flex-basis: number;
flex-shrink: number;
flex-grow: number;
align-self: auto/flex-start/flex-end/center/baseline/stretch;
```

##### Best Practice

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

### list-style-type/image

改变ul/ol前标记类型

### custom style

transition添加于普通类选择器
animation添加于普通类选择器或伪类选择器
transform添加于普通类选择器与伪类选择器

#### custom methods

##### transition+transform

```css
.div {
    transform: scaleX(0);
    transition: **transform** .5s ease;
}

.div:hover {
    transform: scaleX(1);
}
```

##### 直接使用animation

#### transition

-   transition-property: color;
-   transition-duration: 1s;
-   transition-timing-function: cubic-bezier(.42, 0, .58, 1);
-   transition-delay: .5s;

#### transform

-   matrix()/matrix3d();
-   rotateX/Y/Z();
-   scaleX/Y/Z();
-   skewX/Y/Z();
-   translateX/Y/Z();

#### animation

**Tip : fade in body style**

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

-   animation-iteration-count: 执行次数 infinite
-   animation-direction: 执行方向
	-   normal    0%->100%方向
	-   alternate/alternate-reverse 不断交替方向
	-   reverse   100%->0%方向

### align

#### text-align

justify(自适应，左右都无空格)

#### vertical-align

垂直对齐方式

### opacity

0 ~ 1, 渐进效果常用属性

### border

#### border-radius

```css
[ <length> | <percentage> ]{1,4} [ / [ <length> | <percentage> ]{1,4} ]?
```

#### border-image

```css
<'border-image-source'> || <'border-image-slice'> [ / <'border-image-width'> | / <'border-image-width'>? / <'border-image-outset'> ]? || <'border-image-repeat'>
```

### background

#### background-image

-   url()
-   linear-gradient()
-   radial-gradient()

#### (moz/webkit)background-clip

指定背景显示范围  content-box/padding-box/border-box

#### (moz/webkit)background-origin

指定背景绘制起点  content-box/padding-box/border-box

#### background-size

-   contain
-   cover

#### Best Practice

##### 单背景极简欢迎首页

```
.jumbotron {
	background-image: url("");
	background-size: cover;
	background-position: center center;
	background-repeat: no-repeat;

	height: 1px;
	width: 1px;
}
```

### font

#### font-size

**Best Practice**

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

-   使字体保持大小，不随字体类型改变而改变
-   不同字体有不同的值(x-height/字体尺寸)

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

## media query

```css
@media (not/only) 设备类型 and ( (not) 设备特性),
(not/only) 设备类型 and ( (not) 设备特性-1) and ( (not) 设备特性-2) {
    样式代码
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
|:---------------:|:--------------------:|
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
|:----------:|:-------:|:-----:|:---------------:|
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

### 常用组件

#### button

- padding

```css
.btn-custom {
	border-radius: 0;
	background-color: black;
	padding: 10px 40px;
	text-align: center;
	line-height: 100px;
}
```

#### footer

```css

```
