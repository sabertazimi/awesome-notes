<!-- TOC depthFrom:1 depthTo:6 withLinks:1 updateOnSave:1 orderedList:0 -->

- [JavaScript Basic Notes](#javascript-basic-notes)
	- [JavaScript Grammar Basic](#javascript-grammar-basic)
		- [变量](#变量)
			- [变量声明提升(Hoisting)](#变量声明提升hoisting)
			- [数组](#数组)
			- [类型转化](#类型转化)
		- [运算符](#运算符)
		- [函数](#函数)
			- [函数定义时](#函数定义时)
				- [全局变量](#全局变量)
				- [局部变量](#局部变量)
			- [匿名函数](#匿名函数)
			- [call/apply](#callapply)
			- [this/that](#thisthat)
			- [闭包(closure)](#闭包closure)
			- [hasOwnProperty](#hasownproperty)
			- [eval](#eval)
	- [JavaScript DOM Basic](#javascript-dom-basic)
		- [DOM - O](#dom-o)
		- [DOM-Core](#dom-core)
		- [document](#document)
		- [window](#window)
		- [normal dom element](#normal-dom-element)
		- [Events](#events)
			- [Mouse Events](#mouse-events)
			- [Key Events](#key-events)
			- [Frame Events](#frame-events)
			- [Input Events](#input-events)
	- [JQuery](#jquery)
		- [常用多态函数](#常用多态函数)
		- [window](#window)
		- [模板引擎：handlebars.js](#模板引擎handlebarsjs)
	- [Meteor](#meteor)
		- [特殊文件夹](#特殊文件夹)
		- [Basic Command](#basic-command)
			- [create and run](#create-and-run)
			- [list package](#list-package)
			- [add package](#add-package)
			- [android platform](#android-platform)
			- [发布](#发布)
		- [常用Package](#常用package)
			- [barbatus:stars-rating 1.0.7](#barbatusstars-rating-107)
			- [accounts-password 1.1.4](#accounts-password-114)
			- [accounts-ui 1.1.6](#accounts-ui-116)
			- [[iron:router](https://atmospherejs.com/iron/router)](#ironrouterhttpsatmospherejscomironrouter)
			- [twbs:bootstrap 3.3.6](#twbsbootstrap-336)
			- [ecmascript 0.1.6](#ecmascript-016)
			- [jquery 1.11.4](#jquery-1114)
			- [mongo 1.1.3](#mongo-113)
		- [传递数据](#传递数据)
		- [设置事件](#设置事件)
		- [Meteor.user()](#meteoruser)
		- [Session](#session)
		- [MongoDB](#mongodb)
		- [安全性](#安全性)
			- [package的安全性](#package的安全性)
			- [MongoDB/Collection的安全性](#mongodbcollection的安全性)

<!-- /TOC -->

# JavaScript Basic Notes

SEO searchbot graceful degradation

## JavaScript Grammar Basic

### 变量

#### 变量声明提升(Hoisting)

-   var 表达式和 function 声明都将会被提升到当前作用域(全局作用域/函数作用域)的顶部, 其余表达式顺序不变

#### 数组

-   关联数组：`arrayName[“string”]  = value;` 实际为Array对象添加属性`{string:value}`
-   `[]`数组，`{}`对象
-   缓存数组长度:`int l = list.length`(访问`length`造成运算)

#### 类型转化

-   字符串->整数：`+string`/`Number(string)`/`parseInt(string, arg1)`
-   any->`bool`：`!!any`

------

### 运算符

-   ==与===  !=与!==

------

### 函数

#### 函数定义时

##### 全局变量

定义在函数体外，在函数体内不使用var关键字引用

##### 局部变量

函数体内使用var关键字定义

-   不使用 var 声明变量将会导致隐式的全局变量
-   声明局部变量时绝对不要遗漏 var 关键字

#### 匿名函数

匿名函数自动执行(定义即执行)：匿名包装器

-   使得匿名函数内部的代码能够立即执行
-   创建命名空间，防止变量命名冲突
-   `function(argumentNmae) {}(argumentValue)`  Value用于给匿名函数传递参数
-   非匿名函数不自动执行(需显式传参调用执行)

#### call/apply

-   `Function.call(obj, arg1, arg2,...)`
-   `Function.apply(obj, [arg1, arg2, ...]/arguments)`

#### this/that

-   `var that=this; //用于获取外部对象`

e.g `foo(){ //this会指向全局对象(window对象)}`

#### 闭包(closure)

两个函数都维持着对外部作用域 Counter 的引用，因此总可以访问Counter作用域内定义的变量count(外部局部变量)

-   函数外部不可对函数内部进行赋值或引用
-   但函数中的闭包函数可对函数进行赋值或引用(函数对于闭包来说是外部，即内部引用外部)

#### hasOwnProperty

-   使用其它对象的`hasOwnProperty`，并将其上下文设置为`foo`

`({}).hasOwnProperty.call(foo, 'bar'); // true`

-   推荐总是使用`hasOwnProperty`进行`for in`循环

#### eval

-   不要使用`eval()`函数
-   不要使用字符串作`setTimeOut`/`setInterval`的第一个参数(会调用`eval`函数)

------

## JavaScript DOM Basic

### DOM - O
-   native object: JavaScript Native e.g. Array
-   host object: provided by Browser e.g. HTML5 API
-   user-defined object

<table >
<tr>
    <td align=center colspan=2>element node</td>
</tr>
<tr>
    <td>text node</td>
    <td>attribute node</td>
</tr>
</table>

### DOM-Core

```js
    document.createElement("nodeName");
    document.createTextNode("String");

    cloneNode()

    parentElement.appendChild(childElement);
    parentElement.insertBefore(newElement, targetElement);

    removeChild()

    replaceChild()

    setAttribute()
    getAttribute()

    getElementById()
    getElementsByTagName()
    hasChildNode()
```

#### dynamic creation

##### append

```javascript
var testdiv = document.getElementById("testdiv");

var para = document.createElement("p");
testdiv.appendChild(para);

var txt = document.createTextNode("Hello World");
para.appendChild(txt);
```

##### insert

```js
function insertAfter(newElement,targetElement) {
  var parent = targetElement.parentNode;
  if (parent.lastChild == targetElement) {
    parent.appendChild(newElement);
  } else {
    parent.insertBefore(newElement,targetElement.nextSibling);
  }
}
```

#### node

node除包括元素结点(tag)外，包括许多其它结点(甚至空格符视作一个结点),需借助nodeType找出目标结点

```js
node.nodeType
```

|nodeType|representation|
|:----------:|:---------------|
|1|元素结点|
|2|属性结点|
|3|文本结点|

```js
node.nodeName
node.nodeValue
```

```
```js
    node.childNodes
    node.firstChild
    node.lastChild
    node.nextSibling
    node.previousSibling
    node.parentNode
```

### HTML-DOM

```js
element.innerHTML
```

innerHTML: unconcrete,including all types of childNodes 

**div.innerHTML = <p>Test<em>test</em>Test.</p>**

```html
<div>
	<p>Test<em>test</em>Test.</p>
</div>
```

```js
document.body
element.alt = string;
element.classname = value;
```

**Tip**: bind class

```javascript
function addClass(element, value) {
	if (!element.className) {
		element.className = value;
	} else {
		newClassName = element.className;
		newClassName += " ";
		newClassName += value;
		element.className = newClassName;
	}
}
```

```javascript
element.event = function() {};
elemetn.onclick = function() {};
```

### CSS-DOM

```
element.style.*;
element.style.fontFamily;
element.style.marginTopWidth;
```

### document

```javascript
document.write();
document.URI;
document.title;
```

### window

```javascript
window.location(string);
window.innerWidth(number);
window.closed(boolean);
```

**Tip**: 实现jQuery中`$(document).ready(function(){});

```js
//initialize
window.onload = readyFunction;

function readyFunction() {
    function() {}
}
```

```js
//add more ready function
function addLoadEvent(func) {
  var oldonload = window.onload;
  if (typeof window.onload != 'function') {
    window.onload = func;
  } else {
    window.onload = function() {
      oldonload();
      func();
    }
  }
}
```

### Events

#### Mouse Events

```javascript
onclick
ondbclick
onmouse-down/move/enter/out/leave/over
```

#### Key Events

`onkeypress/up/down`

```javascript
document.onkeydown=function(event){
    var e = event || window.event || arguments.callee.caller.arguments[0];
      if(e && e.keyCode==13){ // enter 键
        //coding
       }
    };
```

#### Frame Events

```javascript
onresize/load/scroll/error
```

#### Input Events

```javascript
oninput/onchange
```

------

## JQuery

### 常用多态函数

```js
data、html、css
$(document).ready(function(){});
```

### window

```js
$(window).scroll(function(event) {});
$(document).height()           //返回整个网页的高度
$(window).height()               //返回窗口高度
$(window).scrollTop()		//返回滚动条距网页顶部距离
```

------

## 模板引擎：handlebars.js

将JSON通过模板转化为Html内容(分离结构与内容，达成结构固定内容变化)
Data——(Structure)——Content

```js
Handlebars.compile($(“#template_id”).html());  //一次编译，多次使用该模板
```

```html
{{#each array_name}}  {{subvariable}} {{ … }} < … > {{/each}}
{{#if @first}} … {{/if}}
{{@index}} 数组下标
```

------

## Ajax

```javascript
function getHTTPObject() {
	if (typeof XMLHttpRequest == "undefined")
		XMLHttpRequest = function () {
			try { 
				return new ActiveXObject("Msxml2.XMLHTTP.6.0");
			} catch (e) {}
			try {
				return new ActiveXObject("Msxml2.XMLHTTP.3.0");
			} catch (e) {}
			try {
				return new ActiveXObject("Msxml2.XMLHTTP");
			} catch (e) {}
			return false;
		}  // end of XMLHttpRequest = function() {}
    else return new XMLHttpRequest();
}
```

```javascript
var request = new XMLHttpRequest();
```

```javascript
// 3rd argument : async mode
request.open( "GET", "example.txt", true );

request.onreadystatechange = function() {
	//do something
	/*
	switch(request.readyState) {
		case 0: initalize
		case 1: loading
		case 2: loaded
		case 3: transaction
		case 4: complete
	}
	*/
	if (request.readyState == 4) {
		var para = document.createElement("p");
		var txt = document.createTextNode(request.responseText);
		para.appendChild(txt);
		document.getElementById('new').appendChild(para);
	}
};

request.send(null);        
```

------

## Meteor

### 特殊文件夹

public(存放assets)、client、server、lib

### Basic Command

#### create and run

```bash
meteor create app_folder_name
cd app_folder_name
meteor
```

#### list package

```bash
meteor search .或package_name
```

#### add package

```bash
meteor add package_name
```

#### android platform

```bash
meteor add-platform android
meteor install-sdk android  // ~/.meteor/android-bundle
meteor run android 或 meteor run android-device
 --mobile-server https://hostname:port  指定(http可不写schema)
```

#### 发布

```bash
meteor deploy domain/ip address
meteor deploy –delete domain/ip address
```

### 常用Package

#### barbatus:stars-rating 1.0.7

Stars rating control

```js
	{{>starsRating mutable=true class="js-rate-image" id=_id}
	 var rating = $(event.currentTarget).data("userrating");
 ```

#### accounts-password 1.1.4

Password support for accounts

#### accounts-ui 1.1.6

Simple templates to add login widgets to an app

```html
	 {{> loginButtons}}
 ```

#### [iron:router](https://atmospherejs.com/iron/router)

```js
Router.configure( {
    layoutTemplate: 'ParentTemplateName'    e.g'ApplicationLayout'
});
```

```html
<template name=”ApplicationLayout”>
    {{> yield “navbar”}}	//规定html区域
    {{> yield “main”}}	//规定html区域
</template>
```

```js
Router.route('/', function () {
  this.render('MyTemplate');
});

Router.route('/items', function () {
  this.render('Items');
});

Router.route('/items', function () {
  this.render('TemplateName'{
	to:”yieldFunctionArgument”    //规定html区域
}

Router.route('/items/_id', function () {
  this.render('TemplateName'{
	to:”yieldFunctionArgument”,    //规定html区域
	data:function() {    //传递Template中的特定数据
		return Collection.FindOne({_id: this.params._id});
	}
	});
});

Router.route('/items/:_id', function () {
  var item = Items.findOne({_id: this.params._id});
  this.render('ShowItem', {data: item});
});

Router.route('/files/:filename', function () {
  this.response.end('hi from the server\n');
}, {where: 'server'});

Router.route('/restful', {where: 'server'})
  .get(function () {
    this.response.end('get request\n');
  })
  .post(function () {
    this.response.end('post request\n');
  });
```

#### twbs:bootstrap 3.3.6

The most popular front-end framework for developing responsive, mobile first projects on the web.

#### ecmascript 0.1.6

Compiler plugin that supports ES2015+ in all .js files

#### jquery 1.11.4

Manipulate the DOM using CSS selectors

#### mongo 1.1.3

Adaptor for using MongoDB and Minimongo over DDP

### 传递数据

```js
//data_variable为对象
Template.html_templatetag_name.helpers(data_variable);
//data_variable为对象数组
Template.html_templateTag_name.helpers(
	{
		property_name:data_variable, e.g Collection.find()、数组名、函数
		prepertyn:data_variablen
	}
);    //传递一个匿名对象参数，它拥有一个对象数组字段/实例域

Template.body.helpers
```

html invoke:

```html
{{#each property_name}}  <img src=”{{img_src}}” alt=”{{img_alt}}”>  {{/each}}
{{#if property_name}} {{/if}}

{{property function_argument}}
```

### 设置事件

```js
//传递一个匿名对象参数，拥有一个函数字段/实例域
Template.templateTag_name.events({
	'click .inner_class_name/#inner_id_name' : function (event) {
		//TODO with coding
		//$(event.target) 选择产生事件的对象
		//$(event.currentTarget)
	},
	'submit jqueryid/jqueryclass' : function(event) {
		event.target.inputTag_name.value;
	}
});
```

### Meteor.user()

```js
Meteor.user()
Meteor.users.find()
Meteor.users.findOne(filter)j
Meteor.user().email[num].address
Meteor.user().username
Meteor.user()._id
```

```html
{{#if currentUser}}   {{/if}}
```

### Session

-   将对象的某一个属性设为过滤器

```js
Session.set(“userFilter”, Object.property_nmae);
```

-   通过get得到过滤器属性值(已设置过滤器为有效值，未设置过滤器为NULL)

```js
{ property_name: Session.get(“userFilter”) }
```

-   移除过滤器

```js
Session.set(“userFilter”, undefined);
```

### MongoDB

-   `Meteor.startup( function() {});`

当客户端启动应用时，运行isClient与isServer代码

作用：a.若数据库无数据，则预存一定量数据

-    `new Mongo.Collection(“name_string”);`

创建Mongo集合——

```js
find( {selector },                   //选择器 propername:filter_value
	{sort : { fieldname : -1 } }  , //从小至大排列的filter
	limit:number
)
```

count、insert(对象{})、remove(Mongo Filter)

update({键值对}、{$set	{键值对}})
	可通过update读入用户操作，更新数据库，可再次反馈给用户

allow（安全性）

### 安全性

#### package的安全性

meteor remove insecure

#### MongoDB/Collection的安全性
