<!-- TOC depthFrom:1 depthTo:6 withLinks:1 updateOnSave:1 orderedList:0 -->

- [HTML5 Basic Notes](#html5-basic-notes)
	- [Emmet](#emmet)
		- [嵌套操作](#嵌套操作)
		- [属性操作](#属性操作)
		- [字符操作](#字符操作)
		- [缺省元素](#缺省元素)
	- [Structure](#structure)
		- [section](#section)
		- [header](#header)
		- [hgroup](#hgroup)
		- [nav](#nav)
		- [main](#main)
		- [address](#address)
		- [aside](#aside)
		- [footer](#footer)
	- [Form](#form)
		- [表单元素共有属性](#表单元素共有属性)
			- [form=form_name](#formformname)
			- [formaction=target_name](#formactiontargetname)
			- [formmethod=post/get](#formmethodpostget)
			- [formenctype](#formenctype)
			- [formtarget](#formtarget)
			- [autofocus](#autofocus)
			- [required](#required)
		- [labels](#labels)
			- [隐式control属性](#隐式control属性)
		- [input](#input)
			- [type](#type)
				- [text](#text)
				- [checkbox](#checkbox)
			- [`list` && `autocomplete`](#list-autocomplete)
			- [pattern](#pattern)
			- [indeterminate](#indeterminate)
		- [textarea](#textarea)
			- [maxlength](#maxlength)
			- [cols](#cols)
			- [wrap](#wrap)
		- [menu](#menu)
		- [dialog](#dialog)
		- [datalist](#datalist)
	- [Media](#media)
		- [figure](#figure)
		- [img](#img)
			- [src](#src)
			- [alt](#alt)
		- [a(anchor)](#aanchor)
			- [href](#href)
			- [id/name](#idname)
			- [target](#target)
		- [embed](#embed)
		- [command](#command)
		- [details > summary | datalist](#details-summary-datalist)
			- [datagrid](#datagrid)
			- [配合autocomplete属性](#配合autocomplete属性)
	- [Style](#style)
		- [small](#small)
		- [mark](#mark)
		- [wbr](#wbr)
	- [Information](#information)
		- [time](#time)
			- [pubdate](#pubdate)
			- [datetime](#datetime)
	- [Attributes](#attributes)
		- [Global Attributes](#global-attributes)
			- [contentEditable](#contenteditable)
			- [hidden](#hidden)
			- [spellcheck](#spellcheck)
			- [tabindex](#tabindex)

<!-- /TOC -->

# HTML5 Basic Notes

## Emmet

### 嵌套操作

孩子 : >

``` html
div>ul>li
<div>
    <ul>
        <li></li>
    </ul>
</div>
```

兄弟 : +

```html
div+ul>li
<div></div>
<ul>
    <li></li>
</ul>
```

上级：^

```html
ul>li^div
<ul>
    <li></li>
</ul>
<div></div>

ul>li>a^^div
<ul>
    <li><a href=""></a></li>
</ul>
<div></div>
```

重复：*

```html
ul>li*3
<ul>
    <li></li>
    <li></li>
    <li></li>
</ul>
```

分组：()

```html
div>(p>span)*2
<div>
    <p><span></span></p>
    <p><span></span></p>
</div>
```

### 属性操作

id:#  class:.

```html
div#header+div.main+div#footer
<div id="header"></div>
<div class="main"></div>
<div id="footer"></div>
```

属性值:[]

```html
a[title=test target=_self]
<a title="test" target="_self" href=""></a>
```

数列值：$

```html
p.item$*3
<p class="item1"></p>
<p class="item2"></p>
<p class="item3"></p>

p.item$$*3
<p class="item01"></p>
<p class="item02"></p>
<p class="item03"></p>
```

数列操作符：@

```html
p.item$@-*3   @- = -1
<p class="item3"></p>
<p class="item2"></p>
<p class="item1"></p>

p.item$@3*3  @3 = 从3开始3次
<p class="item3"></p>
<p class="item4"></p>
<p class="item5"></p>

p.item$@-3*3 @-3 = 3次后到3结束
<p class="item5"></p>
<p class="item4"></p>
<p class="item3"></p>
```

### 字符操作

字符操作：{}

```html
a{click}
<a href="">click</a>

a>{click}+span{me}
<a href="">click<span>me</span></a>
```

### 缺省元素

```html
.header+.footer
 = div.header+div.footer

ul>.item*3
= ul>li.item*3

table>.row*4>.cell*3
=  table>tr.row*4>td.cell*3
```

## Structure

### section

必须含有**hx**标题子标签

### header

### hgroup

### nav

-   传统导航条
-   侧边栏导航
-   页内跳转
-   翻页操作

### main

-   每个网页只有1个`main`元素
-   `main`不可为`article`、`aside`、`header`、`footer`、`nav`孩子

### address

联系信息 - QQ、住址、电子邮箱、主页链接

### aside

名词解释的附属部分/友情链接/广告

### footer

## Form

### 表单元素共有属性

#### form=form_name

使表单元素可放置于表单之外

#### formaction=target_name

使表单元素可提交到不同页面

#### formmethod=post/get

使表单元素以不同的方式提交

#### formenctype

-   默认值：application/x-www-form-urlencoded  提交前编码所有字符
-   multipart/form-data  不编码字符，**上传控件表单元素**必须使用改值
-   text/plain  表单元素数据中的空格->`+`

#### formtarget

定义表单提交后加载页面打开方式

-   blank     在新窗口中打开被链接文档
-   self      默认:在相同的框架中打开被链接文档
-   parent    在父框架集中打开被链接文档
-   top       在整个窗口中打开被链接文档
-   framename 在指定的框架中打开被链接文档

#### autofocus

#### required

### labels

指定表单元素的标签

```html
<label for="input_id">OS : </label>
```

#### 隐式control属性

javascript tips：通过control属性改变标签对应表单元素的值

```javascript
var textbox = $('#label_id').control;
textbox.value = '666666';   //  等同于 input.value = '666666';
```

### input

#### type

##### text

##### checkbox

#### `list` && `autocomplete`

为输入框指定智能提示数据

```html
<input list=datalist_id autocomplete=on >
```

#### pattern

通过正则表达式指定输入格式

```html
<input pattern="[0-9][A-Z]{3}">
```

#### indeterminate

javascript tips：检查type=checkbox的状态

```javascript
if (checkbox.indeterminate) {

} else {
    if (checkbox.checked) {

    } else {

    }
}
```

### textarea

#### maxlength

#### cols

每行可显示字符最大数

#### wrap

-   hard:换行时加入换行标志，**此时必须指定**`cols`属性
-   soft:不加入换行标志

### menu

### dialog

### datalist

```html
style="display: none";

<datalist id="register-prompt" style="display:none;">
    <option value="Windows">Windows</option>
    <option value="Mac OS">Mac OS</option>
    <option value="Linux">Linux</option>
</datalist>
```


## Media

### figure

流内容 如文件、图片、音频、视频

### img

**Attr** -

#### src

#### alt

(图片崩溃时文本)、title(提示信息)、class(CSS类选择器)

### a(anchor)

**Attr** -

#### href

超链接指向--超链接/#id/#name

#### id/name

当前锚点标识

#### target

定义被链接文档出现方式

-   blank     在新窗口中打开被链接文档
-   self      默认:在相同的框架中打开被链接文档
-   parent    在父框架集中打开被链接文档
-   top       在整个窗口中打开被链接文档
-   framename 在指定的框架中打开被链接文档

### embed

插入媒体流

### command

### details > summary | datalist

**Attr** -

#### datagrid

#### 配合autocomplete属性

## Style

### small

### mark

### wbr

软换行

## Information

### time

**Attr** -

#### pubdate

-   boolean 代表当前`<time>`表示整个网页的时间

#### datetime

```html
<time datetime="2010-11-13T20:00Z"></time>
<time datetime="2010-11-13T20:00+09:00"></time>
```

-   `T` 分隔日期与时间
-   `Z` 使用UTC标准时间
-   `+` 时差

## Attributes

### Global Attributes

#### contentEditable

-boolean

#### hidden

**boolean**

#### spellcheck

**boolean**

#### tabindex

**-1**
编程可获得焦点，tab键不可获得焦点
