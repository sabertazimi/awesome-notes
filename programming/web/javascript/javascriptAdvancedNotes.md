
* [JavaScript Advanced Notes](#javascript-advanced-notes)
	* [JavaScript Idioms](#javascript-idioms)
		* [Literal](#literal)
		* [Closure and IIFE](#closure-and-iife)
		* [Check](#check)
		* [Other](#other)
	* [Project](#project)
		* [Principle](#principle)
			* [不修改他人对象](#不修改他人对象)
		* [Task Runner - Gulp](#task-runner---gulp)
			* [Gulp Plugins](#gulp-plugins)
			* [Gulpfile.js](#gulpfilejs)
		* [MV* Pattern](#mv-pattern)
		* [View](#view)
	* [Effective JavaScript](#effective-javascript)
		* [禁用特性](#禁用特性)
		* [局部变量/函数参数](#局部变量函数参数)
		* [字符串](#字符串)
		* [函数](#函数)
			* [作用域链](#作用域链)
		* [循环](#循环)
			* [**倒序**循环可提升性能](#倒序循环可提升性能)
			* [Duff's Device(达夫设备)](#duffs-device达夫设备)
		* [Exception](#exception)
			* [Call Stack Overflow](#call-stack-overflow)
		* [Event Delegate(事件委托)](#event-delegate事件委托)
		* [缓存模式](#缓存模式)
		* [加载脚本](#加载脚本)
			* [延迟加载](#延迟加载)
			* [动态加载](#动态加载)
		* [DOM](#dom)
			* [重排与重绘](#重排与重绘)
			* [批量修改 DOM](#批量修改-dom)
		* [CSS](#css)
		* [定时器(防止脚本阻塞)](#定时器防止脚本阻塞)
		* [计时器](#计时器)
		* [Web Worker](#web-worker)
			* [运行环境](#运行环境)
			* [worker 实例](#worker-实例)
		* [Ajax](#ajax)
			* [数据格式](#数据格式)
			* [Ajax 缓存](#ajax-缓存)
		* [避免重复工作](#避免重复工作)
		* [算数逻辑运算](#算数逻辑运算)
			* [位操作](#位操作)
			* [Math 对象](#math-对象)
	* [Code Style Guide](#code-style-guide)
		* [Style](#style)
			* [命名规范](#命名规范)
			* [全局变量](#全局变量)
			* [初始化模式](#初始化模式)
			* [单一var模式](#单一var模式)
			* [条件表达式](#条件表达式)
			* [换行](#换行)
			* [空格](#空格)
			* [注释](#注释)
				* [模块](#模块)
				* [对象](#对象)
				* [属性](#属性)
				* [方法/函数](#方法函数)
		* [Guide](#guide)
			* [函数(function)](#函数function)
				* [参数](#参数)
			* [解耦](#解耦)
				* [事件处理与UI逻辑](#事件处理与ui逻辑)
				* [配置文件](#配置文件)
	* [浏览器兼容性(Browser Compatibility)](#浏览器兼容性browser-compatibility)
		* [特性检测](#特性检测)
	* [Testing](#testing)
		* [Frameworks](#frameworks)
			* [Unit 测试](#unit-测试)
			* [UI 测试](#ui-测试)
		* [可测试代码](#可测试代码)
			* [范例](#范例)
		* [圈复杂度](#圈复杂度)
		* [函数复杂度](#函数复杂度)
			* [扇出(引用) **<7**](#扇出引用-7)
			* [扇入(被引用)](#扇入被引用)
		* [耦合度](#耦合度)
			* [内容耦合(5)](#内容耦合5)
			* [公共耦合(4)](#公共耦合4)
			* [控制耦合(3)](#控制耦合3)
			* [印记耦合(2)](#印记耦合2)
			* [数据耦合(1)](#数据耦合1)
			* [无耦合(0)](#无耦合0)
		* [单元测试](#单元测试)
			* [测试原则](#测试原则)
			* [隔离被测代码](#隔离被测代码)
			* [mock/stub/spy](#mockstubspy)
		* [console](#console)
	* [ECMAScript 2015](#ecmascript-2015)
		* [Babel](#babel)
			* [babel-node](#babel-node)
			* [babel-core](#babel-core)
		* [Variable](#variable)
			* [let](#let)
			* [const](#const)
		* [Destructuring(Pattern Matching)](#destructuringpattern-matching)
			* [默认值](#默认值)
			* [Sample](#sample)
				* [swap](#swap)
				* [简化函数的参数与返回值](#简化函数的参数与返回值)
				* [解析 JSON 对象](#解析-json-对象)
				* [遍历 map/list](#遍历-maplist)
				* [加载特定模块](#加载特定模块)
			* [Array Iterator Style Matching](#array-iterator-style-matching)
			* [Object Style Matching](#object-style-matching)
			* [String Style Matching](#string-style-matching)
			* [Number/Boolean Style Matching](#numberboolean-style-matching)
			* [Function Arguments Style Matching](#function-arguments-style-matching)
		* [String](#string)
			* [Methods](#methods)
			* [Template String](#template-string)
		* [RegExp](#regexp)
		* [Number](#number)
		* [Array](#array)
			* [Array.from](#arrayfrom)
			* [Array.copyWithin](#arraycopywithin)

# JavaScript Advanced Notes

## JavaScript Idioms

### Literal

-   不要使用 new Boolean()/new Number()/new String()
-   避免使用 new Object()/new Array()

### Closure and IIFE

### Check

-   `O || {} ` `O || (O = {})`
-   `if (O && O.property)`
-   `if (typeof v === " ")`
-   `toString. apply(var)`

### Other

!!result 转化成 Boolean

## Project

-   sacc
-   autoprefixer
-   github-css-remove-unused-class
-   Jslint
-   uglification
-   concatenation
-   minimal

```bash
npm install
bower install
npm install gulp --save-dev
```

### Principle

#### 不修改他人对象

不为 全局对象(DOM对象/BOM对象/类库全局对象) 与 原生对象 覆盖/新增/删除 属性或方法

### Task Runner - Gulp

#### Gulp Plugins

```bash
npm install jshint gulp-jshint jshint-stylish gulp-imagemin gulp-concat gulp-uglify gulp-minify-css gulp-usemin gulp-cache gulp-changed gulp-rev gulp-rename gulp-notify  browser-sync del --save-dev
```

#### Gulpfile.js

```js
ar gulp = require('gulp'),
    minifycss = require('gulp-minify-css'),
    jshint = require('gulp-jshint'),
    stylish = require('jshint-stylish'),
    uglify = require('gulp-uglify'),
    usemin = require('gulp-usemin'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    changed = require('gulp-changed'),
    rev = require('gulp-rev'),
    browserSync = require('browser-sync'),
    del = require('del');

gulp.task('jshint', function() {
  return gulp.src('app/scripts/**/*.js')
  .pipe(jshint())
  .pipe(jshint.reporter(stylish));
});

// Clean
gulp.task('clean', function() {
    return del(['dist']);
});

// Default task
gulp.task('default', ['clean'], function() {
    gulp.start('usemin', 'imagemin','copyfonts');
});

gulp.task('usemin',['jshint'], function () {
  return gulp.src('./app/menu.html')
      .pipe(usemin({
        css:[minifycss(),rev()],
        js: [uglify(),rev()]
      }))
      .pipe(gulp.dest('dist/'));
});

// Images
gulp.task('imagemin', function() {
  return del(['dist/images']), gulp.src('app/images/**/*')
    .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
    .pipe(gulp.dest('dist/images'))
    .pipe(notify({ message: 'Images task complete' }));
});

gulp.task('copyfonts', ['clean'], function() {
   gulp.src('./bower_components/font-awesome/fonts/**/*.{ttf,woff,eof,svg}*')
   .pipe(gulp.dest('./dist/fonts'));
   gulp.src('./bower_components/bootstrap/dist/fonts/**/*.{ttf,woff,eof,svg}*')
   .pipe(gulp.dest('./dist/fonts'));
});

// Watch
gulp.task('watch', ['browser-sync'], function() {
  // Watch .js files
  gulp.watch('{app/scripts/**/*.js,app/styles/**/*.css,app/**/*.html}', ['usemin']);
      // Watch image files
  gulp.watch('app/images/**/*', ['imagemin']);

});

gulp.task('browser-sync', ['default'], function () {
   var files = [
      'app/**/*.html',
      'app/styles/**/*.css',
      'app/images/**/*.png',
      'app/scripts/**/*.js',
      'dist/**/*'
   ];

   browserSync.init(files, {
      server: {
         baseDir: "dist",
         index: "menu.html"
      }
   });
        // Watch any files in dist/, reload on change
  gulp.watch(['dist/**']).on('change', browserSync.reload);
    });
```

### MV* Pattern

在MVC中，视图位于我们架构的顶部，其背后是控制器。模型在控制器后面，而因此我们的视图了解得到我们的控制器，而控制器了解得到模型。这里，我们的视图有对模型的直接访问。然而将整个模型完全暴露给视图可能会有安全和性能损失，这取决于我们应用程序的复杂性。MVVM则尝试去避免这些问题。

在MVP中，控制器的角色被代理器所取代，代理器和视图处于同样的地位，视图和模型的事件都被它侦听着并且接受它的调解。不同于MVVM，没有一个将视图绑定到视图模型的机制，因此我们转而依赖于每一个视图都实现一个允许代理器同视图去交互的接口。

MVVM进一步允许我们创建一个模型的特定视图子集，包含了状态和逻辑信息，避免了将模型完全暴露给视图的必要。不同于MVP的代理器，视图模型并不需要去引用一个视图。视图可以绑定到视图模型的属性上面，视图模型则去将包含在模型中的数据暴露给视图。像我们所提到过的，对视图的抽象意味着其背后的代码需要较少的逻辑。

### View

-   关注表现层逻辑
-   向相关模块(Model)派发事件

load()回调函数:

-   不加入过多的逻辑处理
-   不进行多余的DOM操作

## Effective JavaScript

### 禁用特性

-   with () {}
-   eval()
-   少用 new
-   少用 cotinue
-   少用 forEach()

### 局部变量/函数参数

-   局部变量引用全局变量/全局变量作为参数传入函数: 加快符号解析
-   局部变量缓存 DOM 元素
-   局部变量缓存布局信息
-   局部变量引用嵌套成员: 加快原型链查找
-   局部变量引用方法时，应注意会动态改变 this 指针

```js
var DOM = tazimi.util.Dom;

DOM.method.call( /* 关注 this 指针*/ );
```

### 字符串

```js
str = str + 'one' + 'two';
```

### 函数

#### 作用域链

由于作用域链的关系，标识符解析时，寻找局部变量速度远快于寻找全局变量速度.故应将全局变量作为参数传入函数进行调用，不但效率高，而且易于维护与测试.
即 利用局部变量引用全局变量，加快标识符解析

### 循环

#### **倒序**循环可提升性能

```js
for (var i = item.length; i--;) {
    process(items[i]);
}

var j = items.length;
while (j--) {
    process(items[i]);
}

var k = items.length;
do {
    process(items[k]);
} while (k--);
```

#### Duff's Device(达夫设备)

```js
var i = items.length % 8;

while (i) {
	process(items[i--]);
}

i = Math.floor(items.length / 8);

while (i) {
	process(items[i--]);
	process(items[i--]);
	process(items[i--]);
	process(items[i--]);
	process(items[i--]);
	process(items[i--]);
	process(items[i--]);
	process(items[i--]);
}
```

### Exception

#### Call Stack Overflow

调用栈尺寸限制异常，应立即定位在代码中的递归实例上

```js
try {
    recursion();
} catch (ex) {
    console.error('error info');
}
```

### Event Delegate(事件委托)

-   事件委托利用的是事件冒泡机制，只制定一事件处理程序，就可以管理某一类型的所有事件
-   使用事件委托，只需在 DOM 树中尽量最高的层次上添加一个事件处理程序

```js
window.onload = function(){
    var oUl = document.getElementById("ul"),
        aLi = oUl.getElementsByTagName("li");

    oUl.onmouseover = function (e) {
        var e = e || window.event,
            target = e.target || e.srcElement;

        //alert(target.innerHTML);

        if (target.nodeName.toLowerCase() == "li") {
            target.style.background = "red";
        }

		// 阻止默认行为并取消冒泡
		if (typeof e.preventDefault === 'function') {
			e.preventDefault();
			e.stopPropagation();
		} else {
			e.returnValue = false;
			e.cancelBubble = true;
		}
    }

    oUl.onmouseout = function(e) {
        var e = e || window.event,
            target = e.target || e.srcElement;

        //alert(target.innerHTML);

        if (target.nodeName.toLowerCase() == "li") {
            target.style.background = "";
        }

		// 阻止默认行为并取消冒泡
		if (typeof e.preventDefault === 'function') {
			e.preventDefault();
			e.stopPropagation();
		} else {
			e.returnValue = false;
			e.cancelBubble = true;
		}
    }
}
```

### 缓存模式

缓存对象属性与 DOM 对象

### 加载脚本

合并脚本后再进行高级加载技术

#### 延迟加载

```html
... The full body of the page ...
<script>
window.onload = function () {
	var script = document.createElement("script");
	script.src = "all_lazy_20100426.js";
	document.documentElement.firstChild.appendChild(script);
};
</script>
</body>
</html>
```

#### 动态加载

```javascript
function requireScript(file, callback) {
	var script = document.getElementsByTagName('script')[0],
		newjs = document.createElement('script');

	// IE
	newjs.onreadystatechange = function () {
		if (newjs.readyState === 'loaded' || newjs.readyState === 'complete') {
			newjs.onreadystatechange = null;
			callback();
		}
	};
	// others
	newjs.onload = function () {
		callback();
	};

	// 添加至html页面
	newjs.src = file;
	script.parentNode.insertBefore(newjs, script);
}

requireScript('the_rest.js', function() {
	Application.init();
});
```

### DOM

-   局部变量缓存 DOM 元素
-   局部变量缓存布局信息

```js
var btn = document.getElementById('btn');
```

-   HTML Collection 转化成数组再操作

```js
function toArray(coll) {
	for (var i = 0, a = [], len = coll.length; i < len; i++) {
		a[i] = coll[i];
	}

	return a;
}
```

-   children 优于 childNodes
-   childElementCount 优于 childNodes.length
-   firstElementChild 优于 firstChild
-   lastElementChild 优于 lastChild
-   nextElementSibling 优于 nextSibling 优于 `childNodes[next]`
-   previousElementSibling 优于 previousSibling

#### 重排与重绘

-   重排: 重新构造渲染树
-   重绘: 重新绘制受影响部分

**获取**或改变布局的操作会导致渲染树**变化队列**刷新,执行渲染队列中的"待处理变化",重排 DOM 元素

```js
offsetTop/Left/Width/Height
scrollTop/Left/Width/Height
clientTop/Left/Width/Height
getComputedStyle()
```

#### 批量修改 DOM

-   先 display="none", 修改完成后，display=""
-   使待修改 DOM 元素脱离标准文档流(改变布局／定位方式)，可减少其他元素的重绘次数
-   document.createDocumentFragment()

```js
var fragment = document.createDocumentFragment();
appendDataToElement(fragment, data);
document.getElementById('mylist').appendChild(fragment);
```

-   oldNode.cloneNode(true);

```js
var old = document.getElementById('mylist'),
	clone = old.cloneNode(true);

appendDataToElement(clone, data);
old.parentNode.replaceChild(clone, old);
```

### CSS

在 js 中(除定位属性) 外，不直接操作 element.style.attr/element.cssText:

```js
element.classList.add('className');
element.className += ' className';
```

### 定时器(防止脚本阻塞)

JavaScript　代码与 UI 共享线程

setTimeout()/setInterval()

-   第二个参数: 不是执行时间, 是加入执行队列时间
-   若其他位于执行队列中的函数执行时间超过延时，则用户感觉不到延时的存在
-   模拟有间隙的循环，使得 UI 更新得以进入浏览器线程的执行队列中

```js
var button = document.getElementById('myButton');

button.onclick = function() {

	oneMethod();

	setTimeout(function() {
		document.getElementById('notice').style.color = 'red';
	}, 250);
}
```

-   分解任务

```js
function saveDocument(id) {

	// 利用闭包封装待执行任务
	var tasks = [openDocument, writeText, closeDocument, updateUI];

	setTimeout(function() {

		// 执行下一个任务
		var task = tasks.shift();
		task(id);

		// 检查是否还有其他任务
		if (tasks.length > 0) {
			// 递归调用(每次参数不同)
			setTimeout(arguments.callee, 25);
		}
	}, 25);
}
```

```js
function processArray(items, process, callback) {
	// 克隆原数组
	var todo = items.concat();

	setTimeout(function() {

		process(todo.shift());

		if (todo.length > 0) {
			setTimeout(arguments.callee, 25);
		} else {
			callback(items);
		}
	}, 25);
}
```

-   批处理任务

```js
function timedProcessArray(items, process, callback) {
	// 克隆原始数组
	var todo = items.concat();

	setTimeout(function() {
		var start = +new Date();

		// 一次批处理任务持续 0.05s
		do {
			process(todo.shift());
		} while (todo.length < 0 && (+new Date() - start < 50));

		if (todo.length > 0) {
			setTimeout(arguments.callee, 25);
		} else {
			callback(items);
		}
	}, 25);
}
```

### 计时器

```js
/*
 * usage: start -> stop -> getTime
 */
var Timer = {
	_data: {},

	start: function(key) {
		Timer._data[key] = new Date();
	},
	stop: function(key) {
		var time = Timer._data[key];

		if (time) {
			Timer._data[key] = new Date() - time;
		}
	},
	getTime: function(key) {
		return Timer._data[key];
	};
}
```

### Web Worker

#### 运行环境

-   navigation 对象: appName, appVersion, userAgent, platform
-   location 对象: 所有属性只读
-   ECMAScript 对象: Object/Array/Date
-   XMLHttpRequest 方法
-   setTimeout/setInterval 方法
-   self 对象: 指向全局 worker 对象
-   importScripts 方法: 加载外部依赖
-   close 方法: 停止 worker

#### worker 实例

-   先 on ,后 post
-   main.js/worker.js 的 onmessage 与 postMessage 相互触发

```js
/*
 * jsonparser.js
 */
self.onmessage = function(event) {
	var jsonText = event.data,
		jsonData = JSON.parse(jsonText);

	self.postMessage(jsonData);
}
```

```js
/*
 * main.js
 */
var worker = new Worker('jsonparse.js';

worker.onmessage = function(event) {
	var jsonData = event.data;
	evaluateData(jsonData);
};

worker.postMessage(jsonText);
```

### Ajax

#### 数据格式

|Format|Size|Download time|Parse time|Total load time|
|:-----:|:-----:|:----------:|:----------:|:----------:|
|Verbose XML|582,960 bytes|999.4 ms|343.1 ms|1342.5 ms|
Verbose JSON-P|487,913 bytes|598.2 ms|0.0 ms|598.2 ms|
Simple XML|437,960 bytes|475.1 ms|83.1 ms|558.2 ms|
Verbose JSON|487,895 bytes|527.7 ms|26.7 ms|554.4 ms|
Simple JSON|392,895 bytes|498.7 ms|29.0 ms|527.7 ms|
Simple JSON-P|392,913 bytes|454.0 ms|3.1 ms|457.1 ms|
Array JSON|292,895 bytes|305.4 ms|18.6 ms|324.0 ms|
Array JSON-P|292,912 bytes|316.0 ms|3.4 ms|319.4 ms|
Custom Format (script insertion)|222,912 bytes|66.3 ms|11.7 ms|78.0 ms|
Custom Format (XHR)|222,892 bytes|63.1 ms|14.5 ms|77.6 ms|

#### Ajax 缓存

```js
var localCache = {};

function xhrRequest(url, callback) {
	// Check the local cache for this URL.
	if (localCache[url]) {
		callback.success(localCache[url]);
		return;
	}

	// If this URL wasn't found in the cache, make the request.
	var req = createXhrObject();

	req.onerror = function() {
		callback.error();
	};

	req.onreadystatechange = function() {
		if (req.readyState == 4) {
			if (req.responseText === '' || req.status == '404') {
				callback.error();
				return;
			}

			// Store the response on the local cache.
			localCache[url] = req.responseText;
			callback.success(req.responseText);
		};
	}
}

req.open("GET", url, true);
// req.set();
req.send(null);
```

### 避免重复工作

-   特性/浏览器检测代码只运行一次
-   惰性定义模式/自定义模式

### 算数逻辑运算

#### 位操作

-   i%2 => `i&0x1`
-   位掩码

```js
var OPTION_A = 1,
	OPTION_B = 2,
	OPTION_C = 4,
	OPTION_D = 8,
	OPTION_E = 16;

var options = OPTION_A|OPTION_C|OPTION_D;
```

#### Math 对象

```js
Math.E
Math.LN10
Math.LN2
Math.LOG2E
Math.LOG10E
Math.PI
Math.SQRT1_2
Math.SQRT2

Math.abs(num)
Math.exp(num)
Math.log(num)
Math.pow(num,power)
Math.sqrt(num)
Math.acos(x)
Math.asin(x)
Math.atan(x)
Math.atan2(y,x)
Math.cos(x)
Math.sin(x)
Math.tan(x)
```

## Code Style Guide

### Style

#### 命名规范

-    变量: 名词前缀
-    方法/函数: 动词前缀
-   _method: 表示私有化方法
-    普通函数: 驼峰命名法(Camel Case)
-    构造函数: 帕斯卡命名法(Pascal Case), 首字母大写

#### 全局变量

应只有模块名为全局变量;jsmin不会缩减全局变量与全局函数名

#### 初始化模式

```javascript
var MYAPP = MYAPP || {};
```

#### 单一var模式

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

#### 条件表达式

```javascript
condition ? if-coding : else-coding;
```

#### 换行

-    键入最后一个运算符后再换行, 运算符置于行尾可使 automatic semicolon insertion 机制失效
-    换行后保持 2 个缩进层次

#### 空格

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

#### 注释

-    上方插入空行
-    与下方语句统一缩进

```js
/*
 * comments
 * comments
 */
```

##### 模块

```js
/*
 * @module myapp
 * @namespace MYAPP
 */
```

##### 对象

```js
/*
 * @class mathStuff
 */
```

##### 属性

```js
/*
 * @property propertyName
 * @type Number/String
 */
```

##### 方法/函数

```js
/*
 * @constructor
 * @method sum
 * @param {Number}/{String} instructions
 * @return {Number}/{String} instructions
 */
```

### Guide

#### 函数(function)

##### 参数

-   函数不应依赖于全局变量，实现与执行全局环境的的解耦
-   全局变量应以函数参数/依赖的形式，注入函数内部

#### 解耦

##### 事件处理与UI逻辑

-   事件处理函数与应用逻辑函数分开成单独函数,提高代码重用率
-   应用逻辑函数不依赖于 event 对象，其属性值作为参数传入，易于解耦与测试

```js
var MyApp = {

    // 事件处理函数
    handleClick: function(event) {

        /* 将事件的属性作为参数，传递给应用逻辑函数
         * 使得应用逻辑函数不依赖于 event 对象，易于解耦与测试
         */
        this.showPopup(event.clientX, event.clientY);
    }

    // 应用逻辑函数
    showPopup: function(x, y) {
        var popup = document.getElementById('popup');
        popup.style.left = x + 'px';
        popup.style.top  = y + 'px';
        popup.className = 'reveal';
    }
}
```

##### 配置文件

配置文件以 JS(Object)/JSON/JSONP/XML/YML 格式单独存放，方便读取

## 浏览器兼容性(Browser Compatibility)

### 特性检测

**不使用特性/浏览器推断**，往往容易推断错误(且会随着浏览器更新产生新的错误)

```js
// 特性检测
if (document.getElementById) {
    element = document.getElementById(id);
}
```

## Testing

### Frameworks

#### Unit 测试

-   Jasmine
-   Mocha

#### UI 测试

-   用户行为: Karma/Selenium
-   功能测试: Phantomjs/Slimerjs/Karma

### 可测试代码

-   完整注释
-   最小复杂度 = (扇入 * 扇出) ^ 2
-   可隔离性: 最小依赖性 + 松耦合性

#### 范例

-   使用依赖注入，将外部对象移至函数参数处(不在函数内部调用构造器): 易于构造 mock/stub, 降低扇出(函数复杂度)

### 圈复杂度

V(G) = e - n + 2 **<10**

### 函数复杂度

函数复杂度 = (扇入 * 扇出) ^ 2

#### 扇出(引用) **<7**

-   所引用外部对象/方法之和
-   高扇出: 高复杂度/高依赖性/高耦合度

#### 扇入(被引用)

-   其他对象/方法引用此函数的次数之和
-   顶层抽象代码 与 不常用功能 应保持低扇入

### 耦合度

#### 内容耦合(5)

```js
O.property = 'tazimi';
O.method = function() {};
O.prototype.method = function() {};
```

#### 公共耦合(4)

共享全局变量

```js
var Global = 'global';

function A() {
	Global = 'A';
};
function B() {
	Global = 'B';
}
```

#### 控制耦合(3)

```js
var absFactory = new AbstractFactory({ env: 'TEST' });
```

#### 印记耦合(2)

```js
O.prototype.makeBread = function(args) {
	return new Bread(args.type, args.size);
}

O.makeBread({ type: wheat, size: 99, name: 'foo' });
```

#### 数据耦合(1)

#### 无耦合(0)

### 单元测试

#### 测试原则

-   代码覆盖率
-   非法值测试
-   边界测试
-   非边界测试

#### 隔离被测代码

-   编写代码时，保持最小复杂度(最小依赖，最低耦合)
-   利用 mock/stub 模拟外部依赖/测试数据

#### mock/stub/spy

-   mock: 模拟对象中的方法/接口
-   stub: 模拟对象中的返回值
-   spy: 在原有对象的基础上，增加监视用变量/方法 e.g assert/调用次数/参数限制

```js
var mockery = require('mockery');
mockery.enable();
describe("Sum suite File", function() {
beforeEach(function() {
mockery.registerAllowable('./mySumFS', true);
});
afterEach(function() {
mockery.deregisterAllowable('./mySumFS');
});
it("Adds Integers!", function() {
var filename = "numbers"
, fsMock = {
readFileSync: function (path, encoding) {
expect(path).toEqual(filename);
expect(encoding).toEqual('utf8');
return JSON.stringify({ a: 9, b: 3 });
}
}
;
mockery.registerMock('fs', fsMock);
var mySum = require('./mySumFS');
expect(mySum.sum(filename)).toEqual(12);
mockery.deregisterMock('fs');
});
```

### console

console.log/time/timeEnd/profile/profileEnd/trace/dir/dirxml/assert

## ECMAScript 2015

### Babel

```bash
babel example.js -o compiled.js
babel src -d lib -s
```

#### babel-node

A read-eval-print loop(REPL) can replace node REPL.

#### babel-core

提供 babel 转码 API

```bash
$ npm install babel-core --save
```

```js
var babel = require('babel-core');

// 字符串转码
babel.transform('code();', options);
// => { code, map, ast }

// 文件转码（异步）
babel.transformFile('filename.js', options, function(err, result) {
      result; // => { code, map, ast }
});

// 文件转码（同步）
babel.transformFileSync('filename.js', options);
// => { code, map, ast }

// Babel AST转码
babel.transformFromAst(ast, code, options);
// => { code, map, ast }
```

### Variable

-   一方面规定，var命令和function命令声明的全局变量，依旧是全局对象的属性
-   另一方面规定，let命令、const命令、class命令声明的全局变量，不属于全局对象的属性

#### let

-   不存在变量提升
-   块级作用域(Temporal Dead Zone)
-   块级作用域内定义的变量/函数，在块级作用域外 ReferenceError

#### const

-   const一旦声明变量，就必须立即初始化，不能留到以后赋值
-   块级作用域(Temporal Dead Zone)
-   引用一个引用变量时，只表示此变量地址不可变，但所引用变量的值/属性可变(* const)

### Destructuring(Pattern Matching)

-   **建议只要有可能，就不要在模式中放置圆括号**
-   赋值语句的非模式部分，可以使用圆括号

#### 默认值

-   ES6内部使用严格相等运算符（===），判断一个位置是否有值。若此位置无值，则使用默认值
-   如果一个数组成员不严格等于undefined，默认值不会生效

```js
var [x = 1] = [undefined];
x // 1

var [x = 1] = [null];
x // null
```

```js
let [x = 1, y = x] = [];     // x=1; y=1
let [x = 1, y = x] = [2];    // x=2; y=2
let [x = 1, y = x] = [1, 2]; // x=1; y=2
let [x = y, y = 1] = [];     // ReferenceError
```

#### Sample

##### swap

```js
[x, y] = [y, x];
```

##### 简化函数的参数与返回值

-   可用于工厂(factory)/设置(options)模式: 传参一般为 options 对象，具有固定的属性名
-   一次性定义多个参数
-   一次性定义多个参数的默认值

```js
// 参数是一组有次序的值
function f([x, y, z]) { ... }
f([1, 2, 3])

// 参数是一组无次序的值
function f({x, y, z}) { ... }
f({z: 3, y: 2, x: 1})

// 可省略 var foo = config.foo || 'default foo';
jQuery.ajax = function (url, {
  async = true,
  beforeSend = function () {},
  cache = true,
  complete = function () {},
  crossDomain = false,
  global = true,
  // ... more config
}) {
  // ... do stuff
};
```

```js
// 返回一个数组
function example() {
  return [1, 2, 3];
}
var [a, b, c] = example();

// 返回一个对象
function example() {
  return {
    foo: 1,
    bar: 2
  };
}
var { foo, bar } = example();
```

##### 解析 JSON 对象

```js
var jsonData = {
  id: 42,
  status: "OK",
  data: [867, 5309]
}

let { id, status, data: number } = jsonData;

console.log(id, status, number)
// 42, "OK", [867, 5309]
```

##### 遍历 map/list

```js
var map = new Map();
map.set('first', 'hello');
map.set('second', 'world');

for (let [key, value] of map) {
  console.log(key + " is " + value);
}
// first is hello
// second is world

// 获取键名
for (let [key] of map) {
  // ...
}

// 获取键值
for (let [,value] of map) {
  // ...
}
```

##### 加载特定模块

```js
const { SourceMapConsumer, SourceNode } = require("source-map");
```

#### Array Iterator Style Matching

等号右边必须为数组等实现了 Iterator 接口的对象,否则报错

-   Array
-   Set
-   Generator 函数

```js
let [foo, [[bar], baz]] = [1, [[2], 3]];
foo // 1
bar // 2
baz // 3

let [ , , third] = ["foo", "bar", "baz"];
third // "baz"

let [x, , y] = [1, 2, 3];
x // 1
y // 3

let [head, ...tail] = [1, 2, 3, 4];
head // 1
tail // [2, 3, 4]

let [x, y, ...z] = ['a'];
x // "a"
y // undefined
z // []

// Generator 函数
function* fibs() {
  var a = 0;
  var b = 1;
  while (true) {
    yield a;
    [a, b] = [b, a + b];
  }
}

var [first, second, third, fourth, fifth, sixth] = fibs();
sixth // 5
```

#### Object Style Matching

-   真正被赋值的是后者，而不是前者

```js
let {pattern: variable} = { key: value };
```

-   解构赋值的规则: 只要等号右边的值不是对象，就先将其转为对象
-   undefined/null 无法转化为对象

```js
let { prop: x } = undefined; // TypeError
let { prop: y } = null; // TypeError
```

```js
var { bar, foo } = { foo: "aaa", bar: "bbb" };
foo // "aaa"
bar // "bbb"

var { foo: foo, bar: bar } = { foo: "aaa", bar: "bbb" };

var { baz } = { foo: "aaa", bar: "bbb" };
baz // undefined
```

```js
var { foo: baz } = { foo: "aaa", bar: "bbb" };
baz // "aaa"

let obj = { first: 'hello', last: 'world' };
let { first: f, last: l } = obj;
f // 'hello'
l // 'world'
```

```js
let { log, sin, cos } = Math;
```

#### String Style Matching

```js
const [a, b, c, d, e] = 'hello';
a // "h"
b // "e"
c // "l"
d // "l"
e // "o"

let {length : len} = 'hello';
len // 5
```

#### Number/Boolean Style Matching

number/boolean 会转化成对象

```js
let {toString: s} = 123;
s === Number.prototype.toString // true

let {toString: s} = true;
s === Boolean.prototype.toString // true
```

#### Function Arguments Style Matching

```js
function add([x, y]){
  return x + y;
}
add([1, 2]) // 3

[[1, 2], [3, 4]].map(([a, b]) => a + b)
// [ 3, 7 ]

function move({x = 0, y = 0} = {}) {
  return [x, y];
}
move({x: 3, y: 8}); // [3, 8]
move({x: 3}); // [3, 0]
move({}); // [0, 0]
move(); // [0, 0]

// 严格为 undefined 时，触发默认值设置
[1, undefined, 3].map((x = 'yes') => x)
// [ 1, 'yes', 3 ]
```

### String

```js
'\z' === 'z'  // true
'\172' === 'z' // true
'\x7A' === 'z' // true
'\u007A' === 'z' // true
'\u{7A}' === 'z' // true
```

#### Methods

-    string.codePointAt(index): 正确处理 4 字节存储字符
-    string.fromCodePoint(codePoint)

```js
function is32Bit(c) {
  return c.codePointAt(0) > 0xFFFF;
}

String.fromCodePoint(0x78, 0x1f680, 0x79) === 'x\uD83D\uDE80y'
// true
```

-   string.includes(substr)/startsWith(substr)/endsWith(substr)
-   使用第二个参数n时，endsWith 针对前 n 个字符，其他两个方法针对从第 n 个位置直到字符串结束

```js
var s = 'Hello world!';

s.startsWith('world', 6) // true
s.endsWith('Hello', 5) // true
s.includes('Hello', 6) // false
```

-   repeat(times)

```js
'hello'.repeat(2) // "hellohello"
'na'.repeat(2.9) // "nana"

'na'.repeat(-0.9) // ""
'na'.repeat(-1) // RangeError

'na'.repeat(NaN) // ""
'na'.repeat(Infinity) // RangeError

'na'.repeat('na') // ""
'na'.repeat('3') // "nanana"
```

-    padStart/padEnd(len, paddingStr)

```js
'1'.padStart(10, '0') // "0000000001"
'12'.padStart(10, '0') // "0000000012"
'123456'.padStart(10, '0') // "0000123456"

'12'.padStart(10, 'YYYY-MM-DD') // "YYYY-MM-12"
'09-12'.padStart(10, 'YYYY-MM-DD') // "YYYY-09-12"
```

#### Template String

` str ` 表示模板字符串

```js
// 普通字符串
`In JavaScript '\n' is a line-feed.`
`\`Yo\` World!`

// 多行字符串
`In JavaScript this is
 not legal.`

// 引用变量
`${x} + ${y * 2} = ${x + y * 2}`
`${obj.x + obj.y}`

// 调用函数
`foo ${fn()} bar`
```

-   编译模板(小型模板引擎)

```js
function compile(template){
	  var evalExpr = /<%=(.+?)%>/g;
	  var expr = /<%([\s\S]+?)%>/g;

	  template = template
	    .replace(evalExpr, '`); \n  echo( $1 ); \n  echo(`')
	    .replace(expr, '`); \n $1 \n  echo(`');

	  template = 'echo(`' + template + '`);';

	  var script =
	  `(function parse(data){
	    var output = "";

	    function echo(html){
	      output += html;
	    }

	    ${ template }

	    return output;
	  })`;

	  return script;
}

var template = `
<ul>
  <% for(var i=0; i < data.supplies.length; i++) { %>
    <li><%= data.supplies[i] %></li>
  <% } %>
</ul>
`;
var parse = compile(template);
div.innerHTML = parse({ supplies: [ "broom", "mop", "cleaner" ] });
// => <ul>
// =>   <li>broom</li>
// =>   <li>mop</li>
// =>   <li>cleaner</li>
// => </ul>


// 下面的hashTemplate函数
// 是一个自定义的模板处理函数
var libraryHtml = hashTemplate`
  <ul>
    #for book in ${myBooks}
      <li><i>#{book.title}</i> by #{book.author}</li>
    #end
  </ul>
`;
```

-   国际化处理

```js
i18n`Welcome to ${siteName}, you are visitor number ${visitorNumber}!`
// "欢迎访问xxx，您是第xxxx位访问者！"
```

-   XSS 攻击

```js
var message =
  SaferHTML`<p>${sender} has sent you a message.</p>`;

function SaferHTML(templateData) {
  var s = templateData[0];
  for (var i = 1; i < arguments.length; i++) {
    var arg = String(arguments[i]);

    // Escape special characters in the substitution.
    s += arg.replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;");

    // Don't escape special characters in the template.
    s += templateData[i];
  }
  return s;
}
```

-   运行代码

```js
jsx`
  <div>
    <input
      ref='input'
      onChange='${this.handleChange}'
      defaultValue='${this.state.value}' />
      ${this.state.value}
   </div>
`

java`
class HelloWorldApp {
  public static void main(String[] args) {
    System.out.println(“Hello World!”); // Display the string.
  }
}
`
HelloWorldApp.main();
```

### RegExp

-   u 修饰符
-   y(粘连全局符) 修饰符号隐含了头部匹配的标志

```js
function codePointLength(text) {
      var result = text.match(/[\s\S]/gu);
        return result ? result.length : 0;
}

var s = '𠮷𠮷';

s.length // 4
codePointLength(s) // 2
```

### Number

-   0bxxx/0Bxxx
-   0oxxx/0Oxxx
-   Number.isFinite()/isNaN()/parseInt()/parseFloat()/isInteger()/isSafeInteger()
-   Number.EPSILON/`MAX_SAFE_INTEGER`/`MIN_SAFE_INTEGER`
-   ** 指数运算符

### Array

#### Array.from

强大的**函数式**方法

-   伪数组对象(array-like object)
-   可枚举对象(iterable object)
-   克隆数组
-   map 函数

```js
// Set
// Map

// NodeList对象
let ps = document.querySelectorAll('p');
Array.from(ps).forEach(function (p) {
  console.log(p);
});

// arguments对象
function foo() {
  var args = Array.from(arguments);
  // ...
}

Array.from('hello')
// => ['h', 'e', 'l', 'l', 'o']

let namesSet = new Set(['a', 'b'])
Array.from(namesSet) // ['a', 'b']

// 克隆数组
Array.from([1, 2, 3])
// => [1, 2, 3]

Array.from(arrayLike, x => x * x);
// =>
Array.from(arrayLike).map(x => x * x);

Array.from([1, 2, 3], x => x * x)
// [1, 4, 9]
```

#### Array.copyWithin

替换数组元素，修改原数组

```js
Array.prototype.copyWithin(target, start = 0, end = this.length)
```

```js
[1, 2, 3, 4, 5].copyWithin(0, 3)
// => [4, 5, 3, 4, 5]

// -2相当于3号位，-1相当于4号位
[1, 2, 3, 4, 5].copyWithin(0, -2, -1)
// => [4, 2, 3, 4, 5]

// 将2号位到数组结束，复制到0号位
var i32a = new Int32Array([1, 2, 3, 4, 5]);
i32a.copyWithin(0, 2);
// => Int32Array [3, 4, 5, 4, 5]
```

## Browser/Under the hood

### Variables Lifecycle

-   Declaration phase: 在作用域中注册变量
-   Initialization phase: 分配内存, 在作用域中绑定变量(undefined)
-   Assignment phase
