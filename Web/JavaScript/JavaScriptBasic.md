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

## 变量

**反模式**:

-   隐式全局变量(未使用var声明便使用变量)

实质:隐式全局变量不是真正的变量，而是全局对象(在浏览器环境中为window对象)的属性;可以**```delete```**删除隐式全局量

```javascript
//函数外隐式全局变量
global = 1;
//函数内隐式全局变量
function () {
	global = 1;
}
//链式赋值
function () {
	//b为隐式全局变量
	var a = b = 1;
}
```


### 全局变量

定义在函数体外，在函数体内不使用var关键字引用

### 局部变量

函数体内使用var关键字定义

-   不使用 var 声明变量将会导致隐式的全局变量
-   声明局部变量时绝对不要遗漏 var 关键字

### 变量声明提升(Hoisting)

-   var 表达式和 function 声明都将会被提升到当前作用域(全局作用域/函数作用域)的顶部, 其余表达式顺序不变

### 数组

-   关联数组：`arrayName[“string”]  = value;` 实际为Array对象添加属性`{string:value}`
-   `[]`数组，`{}`对象
-   缓存数组长度:`int l = list.length`(访问`length`造成运算)

#### 数组字面量

不使用构造函数,使用数组字面量创建数组

```javascript
new Array(3);     // 数组长度
new Array(3.14);  // RangeError
```

```javascript
if (typeof Array.isArray === "undefined") {
	Array.isArray = function (arg) {
		// 其余对象返回值 [object Object/Number/String/Boolean]
		return Object.prototype.toString.call(arg) === "[object Array]";
	}
}
```

### 类型转化

-   字符串->整数：`+string`/`Number(string)`/`parseInt(string, arg1)`
-   any->`bool`：`!!any`

------

## 运算符

-   ==与===  
-   !=与!==

------

## 控制流程

### switch/case

用方法查询代替switch/case语句

```javascript
function doAction(action) {
  var actions = {
    'hack': function () {
      return 'hack';
    },

    'slash': function () {
      return 'slash';
    },

    'run': function () {
      return 'run';
    }
  };

  if (typeof actions[action] !== 'function') {
    throw new Error('Invalid action.');
  }

  //闭包方法集
  return actions[action]();
}
```

------

## 对象

### 对象三大特征

-   原型代理(享元模式): 利用享元模式共享公有属性与通用方法
-   实例状态(原型克隆): 利用原型克隆拥有各自属性值
-   封装性(闭包式继承): 利用闭包方法实现属性私有化

共用方法,单独属性,封装细节

### 构造函数

首字母大写

#### new的实质

不加new使用构造函数时

-   隐式this指针指向全局对象
-   返回值为undefined

```javascript
var Person = function (name) {
	//var this = Object.create(Person.prototype);
	//即 this.prototype = Person.prototype;
	
	this.name = name;
	this.say = function () {
		return "I am " + this.name;
	}

	//return this
};
```

#### 返回值

this/user-defined literal object

```javascript
var ObjectMaker = function () {
	this.name = "This is it";
	//user-defined literal object
	//直接忽略this.name
	var that = {};
	that.name = "And that's that";
	return that;	
};
```

#### 最佳实践

```javascript
function Waffle() {

	//当未使用new关键字时,this指向全局对象
	//此时进入if语句
	if (!(this instanceof Waffle)) {
		return new Waffle();
	}

	//正常构造函数
	this.tastes = "yummy";
}
```

### 全局对象

```javascript
//立即函数模式: 
//此时返回值不是函数本身,而是函数执行后的return语句返回值
var global = (function () {
    //返回全局对象
	return this;	
}());
```

### 共享 - 原型代理/享元模式(new与Object.create)

构造函数的原型对象被设置为新实例的原型引用

```javascript
f.prototype = o;
```

```javascript
if (!Object.create) {
  Object.create = function (o) {
    if (arguments.length > 1) {
      throw new Error('Object.create implementation'
      + ' only accepts the first parameter.');
    }
    function F() {}
    F.prototype = o;
    return new F();
  };
}
```

```javascript
var switchProto = {
    isOn: function isOn() {
      return this.state;
    },

    toggle: function toggle() {
      this.state = !this.state;
      return this;
    },

    state: false
 };

 var switchInstance = Object.create(switchProto);
```

此时属性与方法均共享: 若子属性值被新对象替换，则不影响原型；否则子属性值被直接修改，会影响原型.

需改变属性值时，**尽量替换，防止直接修改**.

### 独立 - 原型克隆

```javascript
_.extend = function(obj) {
  each(slice.call(arguments, 1), function(source) {
    for (var prop in source) {
      obj[prop] = source[prop];
    }
  });
  return obj;
};
```

此时属性与方法不共享，实例对象各自拥有一份拷贝

### 封装 - 工厂方法(闭包)

```js
function factory() {
  var highlander = {
      name: 'MacLeod'
    };
    
  //利用闭包，返回私有对象，实现工厂方法
  return {
    get: function get() {
      return highlander;
    }
  };
}
```

### 包装类对象

基本变量只会临时转变为包装类对象,若需添加额外属性/方法:

-   new Number/String/Boolean();
-   改变内置原型

```javascript
// primitive string
var greet = "Hello there";
// primitive is converted to an object
// in order to use the split() method
greet.split(' ')[0]; // "Hello"
// attemting to augment a primitive is not an error
greet.smile = true;
// but it doesn't actually work
typeof greet.smile; // "undefined"
```

不使用new关键字,包装类构造函数返回值为基本类型

```javascript
typeof Number(1);            // "number"
typeof Number("1");          // "number"
typeof Number(new Number()); // "number"
typeof String(1);            // "string"
typeof Boolean(1);           // "boolean"
```

### 错误对象

```javascript
{
name: "XXError"
message: "something wrong"
extra: "This was rather embarrassing"
remedy: genericErrorHandler //处理错误的函数名
}

catch (e) {
	console.log(e.message);
	e.remedy();  // genericErrorHandler
}
```

------

## 函数

-   函数是对象
-   函数提供局部作用域

### Lambda Calculus

-   函数是一等公民
-   函数可作为入参，可作为返回值(即可作为一般数据)

#### 闭包(closure)

两个函数都维持着对外部作用域 Counter 的引用，因此总可以访问Counter作用域内定义的变量count(外部局部变量)

-   函数外部不可对函数内部进行赋值或引用
-   但函数中的闭包函数可对函数进行赋值或引用(函数对于闭包来说是外部，即内部引用外部)
-   特权性质: 从外部通过闭包方法访问内部(函数作用域)局部变量

#### 偏函数应用

运用闭包可封装函数

```js
function joinWords(a, b) {
	return [a,b].join(' ');
}
function prefixer(word) {
	return function(b) {
		return joinWords(word, b);
	}
}

//封装函数joinWords(a, b)
var prefixerWithHate = prefixer('Hate');
//得到封装后的函数prefixerWithHate(parameter);

//调用封装后的函数
//相当于调用joinWords('Hate', ' Java')
console.log(prefixerWithHate('Java'));
```

通用化curry化

```javascript
function schonfinkelize(fn) {
	var slice = Array.prototype.slice,
	stored_args = slice.call(arguments, 1);

	return function () {
		var new_args = slice.call(arguments),
		args = stored_args.concat(new_args);
		return fn.apply(null, args);
	};
}

var addOne = schonfinkelize(add, 1);
// addOne(3) === 4;
var addFive = schonfinkelize(addOne, 1, 3);
// addFive(4) === 9;
```

### 函数表达式

函数表达式的foo只可在函数体内访问，其它地方需使用fooFunc

```javascript
//函数声明
function foo() {
	
}

//函数表达式
var foo = function foo() {
	
};
var obj = {
	say : function say() {

	}
};
foo(function me() {
	
});

//变量提升
var foo;
foo = function foo() {
	
};

console.log(foo.name);
```

### 入参函数

注意是否需要拷贝传入对象,使原有对象不受函数影响,并返回新对象

```javascript
//坏习惯: 除非必要,否则不改变原有对象
var obj = {
	value: 2
};

function setValue(obj, val) {
	obj.value = val;
	return obj;
}
```

```javascript
//好习惯: 改变新对象,返回新对象
var obj = {
	value: 2
};

function setValue(obj, val) {
	var instance = extend({}, obj, {value: val});
	return instance;
}
```

### 回调函数

```javascript
// check if callback is callable
if (typeof callback !== "function") {
	callback = false;
}

// now callback:
if (callback) {
	callback();
}
```

```javascript
var findNodes = function (callback) {
	var i = 100000,
	nodes = [],
	found;

	// check if callback is callable
	if (typeof callback !== "function") {
		callback = false;
	}

	while (i) {
		i -= 1;

		// now callback:
		if (callback) {
		callback(found);
		}

	nodes.push(found);
	}

	return nodes;
};
```

当回调函数为对象方法时(特别时方法中使用this指针),需同时传入对象参数

```javascript
var findNodes = function (callbackObj, callback) {
	if (typeof callback === "function") {
		callback.call(callbackObj, found);
	}
};


var findNodes = function (callbackObj, callback) {
	if (typeof callback === "string") {
		callback = callbackObj[callback];
	}
	if (typeof callback === "function") {
		callback.call(callbackObj, found);
	}
};
```

### 自定义函数(Self-Defining Function)/惰性函数定义(Lazy Function Definition)

第一次执行时,进行初始化并重新定义函数变量
第二次执行时,不再进行初始化(函数被重定义至真正函数)

```javascript
//definition
var foo = function () {
	initialize code;

	foo = function () {
		console.log("test");
	};
};

//first run
foo();
//second run
foo();  // log: test
```

但如果通过函数表达式重新将foo赋给其他变量,每次执行时foo指针都指向含初始化代码的函数.

### 即时函数

即时函数自动执行(定义即执行)：匿名包装器

#### 即时函数模式

-   函数表达式 
-   末尾添加括号(传参),使函数立即执行
-   将整个函数置于括号内   

```javascript
(function () {
	console.log("watch out");
}());
```

#### 模式作用

-   使得匿名函数内部的代码能够立即执行
-   不泄漏只使用一次的局部变量与方法
-   创建命名空间，防止变量命名冲突

#### 返回值

var foo = (function () {}());

foo不被赋予function值,而被赋予函数执行后的返回值;
此返回值可设为函数可产生闭包。

```javascript
var getResult = (function () {
	var res = 2 + 2;
	return function () {
		return res;
	}	
}());
```

### call/apply

-   `Function.call(contextObj, arg1, arg2,...)`
-   `Function.apply(contextArray, [arg1, arg2, ...]/arguments)`

```js
function.call/apply();
window.function.call/apply();
//js解释器临时将数组/字符串包装成对象原型
[].arrayStaticFunction.call/apply();
Array.prototype.arrayStaticFunction.call/apply();
"".stringStaticFunction.call/apply();
String.prototype.stringStaticFunction.call/apply();
```

相当于 - 

```javascript
context.function(arguments);
```

### this/that

-   `var that=this; //用于获取外部对象`

e.g `foo(){ //this会指向全局对象(window对象)}`

### 多态方法

```js
var greet = function greet(options) {
	//运用slice方法与arguments隐参,得到参数对象/数组
	//运用if/switch方法分情况调用函数,实现多态方法
	var args = [].slice.call(arguments, 0);
	//方法集中含有此方法
	if (typeof options === 'string'
	&& typeof methods[options] === 'function') {
		action = options;
		//取第2个参数开始为真正的参数
		args.shift();
	}
	//调用对应方法,入参为args,返回调用值
	return methods[action](args);
}
```

### hasOwnProperty

-   使用其它对象的`hasOwnProperty`，并将其上下文设置为`foo`

`({}).hasOwnProperty.call(foo, 'bar'); // true`

-   推荐总是使用`hasOwnProperty`进行`for in`循环

### eval

-   不要使用`eval()`函数
-   不要使用字符串作参数 new Function();(会调用`eval`函数)
-   不要使用字符串作`setTimeOut`/`setInterval`的第一个参数(会调用`eval`函数)

```javascript
// anti-pattern
var property = "name";
alert(eval("obj." + property));
// preferred
var property = "name";
alert(obj[property]);

// anti-pattern
setTimeout("myFunc()", 1000);
setTimeout("myFunc(1, 2, 3)", 1000);
// preferred
setTimeout(myFunc, 1000);
setTimeout(function () {
myFunc(1, 2, 3);
}, 1000);
```

### 常用函数

#### parseInt

parseInt(val, 2/8/10);

### 常用模式

#### API模式

##### 回调模式

##### 配置对象

```javascript
var conf = {
    name: "tazimi",
    e-mail: "test@gmail.com"
};

addPerson(conf);
```

##### 返回函数(闭包)

一个函数的返回值设为另一个函数

##### Curry化

#### 初始化模式

##### 即使函数

##### 即使对象初始化

obj.init();

##### 初始化分支

浏览器探嗅:执行此功能的if/else语句只执行一次

检测浏览器对H5/CSS3/ES5/ES2016的支持情况,不足则自行编写函数补充功能.

```javascript
if(typeof target === "undefined") {
	
}
```

------

## 模块化

### 命名空间

通过传参匿名函数,创建命名空间,进行模块包裹

```javascript
var app = {};

(function (exports) {

  (function (exports) {
    var api = {
        moduleExists: function test() {
          return true;
        }
      };
    //闭包式继承,扩展exports对象为api对象
    $.extend(exports, api);
  }((typeof exports === 'undefined') ?
      window : exports));
//将api对象绑定至app对象上
}(app));
```

------

## MVC

### View

-   关注表现层逻辑
-   向相关模块(Model)派发事件

load()回调函数:

-   不加入过多的逻辑处理
-   不进行多余的DOM操作

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
documents.images
documents.links
documents.forms
documents.forms[0].elements  //第一个表单内的所有字段
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

## JSON

```javascript
var obj = JSON.parse(json);
var json = JSON.stringofy(obj);
```

------

## 正则表达式

不使用new RegExp(),使用正则表达式字面量

var re = /pattern/gmi;

-   g 全局匹配
-   m 多行匹配
-   i 大小写敏感匹配

------

## Code Style

### 命名规范

驼峰命名法

构造函数:首字母大写

_method: 表示私有化方法

### 单一var模式

一个作用域内仅出现一个var关键字,且为所有变量赋初值:

-   简洁代码
-   提示变量类型

```javascript
var a = 1,        // int
    b = 2,        // int
    sum = a + b,  // int
    obj = {},     // object
    i = 1.0,      // float
    j = false;    // boolean
```

### 空格

Good places to use a white space include:
-   ,/; 后
-   +,-,*,/,<,>,= 前后
-   function () {}
-   function foo() {}
-   } if/for/while () {}   
-   } else {}

```javascript
var d = 0,
a = b + 1;

if (a && b && c) {
	d = a % c;
	a += d;
}

// antipattern
// missing or inconsistent spaces
// make the code confusing
var d= 0,
a =b+1;

if (a&& b&&c) {
	d=a %c;
	a+= d;
}
```

### Comments

-   模块

@module myapp
@namespace MYAPP

-   对象

@class mathStuff

-   函数/方法

@constructor
@method sum
@param {Number}/{String} instructions
@return {Number}/{String} instructions 

-    属性

@property propertyName
@type Number/String