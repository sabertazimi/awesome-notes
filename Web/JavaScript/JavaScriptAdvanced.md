<!-- TOC depthFrom:1 depthTo:6 withLinks:1 updateOnSave:1 orderedList:0 -->

- [JavaScript Advanced Notes](#javascript-advanced-notes)
	- [JavaScript Idioms](#javascript-idioms)
		- [Literal](#literal)
		- [Closure and IIFE](#closure-and-iife)
		- [Check](#check)
		- [Other](#other)
	- [Project](#project)
		- [Principle](#principle)
			- [不修改他人对象](#不修改他人对象)
		- [Task Runner - Gulp](#task-runner-gulp)
			- [Gulp Plugins](#gulp-plugins)
			- [Gulpfile.js](#gulpfilejs)
		- [MV* Pattern](#mv-pattern)
		- [View](#view)
	- [Effective](#effective)
		- [禁用特性](#禁用特性)
		- [循环](#循环)
		- [Exception](#exception)
			- [Call Stack Overflow](#call-stack-overflow)
		- [Event-Delegate](#event-delegate)
		- [缓存模式](#缓存模式)
		- [加载脚本](#加载脚本)
			- [延迟加载](#延迟加载)
			- [按需加载](#按需加载)
	- [Code Style Guide](#code-style-guide)
		- [Style](#style)
			- [命名规范](#命名规范)
			- [全局变量](#全局变量)
			- [初始化模式](#初始化模式)
			- [单一var模式](#单一var模式)
			- [条件表达式](#条件表达式)
			- [换行](#换行)
			- [空格](#空格)
			- [注释](#注释)
				- [模块](#模块)
				- [对象](#对象)
				- [属性](#属性)
				- [方法/函数](#方法函数)
		- [Guide](#guide)
			- [函数(function)](#函数function)
				- [参数](#参数)
			- [解耦](#解耦)
				- [事件处理与UI逻辑](#事件处理与ui逻辑)
				- [配置文件](#配置文件)
	- [浏览器兼容性(Browser Compatibility)](#浏览器兼容性browser-compatibility)
		- [特性检测](#特性检测)
	- [Web 安全(Security)](#web-安全security)
		- [Input check](#input-check)
			- [特殊字符](#特殊字符)
		- [XSS Attack](#xss-attack)

<!-- /TOC -->

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

```shell
npm install
bower install
npm install gulp --save-dev
```

### Principle

#### 不修改他人对象

不为 全局对象(DOM对象/BOM对象/类库全局对象) 与 原生对象 覆盖/新增/删除 属性或方法

### Task Runner - Gulp

#### Gulp Plugins

```shell
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

## Effective

### 禁用特性

-   with () {}
-   eval()
-   少用 new
-   少用 cotinue
-   少用 forEach()

### 循环

**倒序**循环可提升性能

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


### Event-Delegate

-   事件委托利用的是事件冒泡机制，只制定一事件处理程序，就可以管理某一类型的所有事件
-   使用事件委托，只需在DOM书中尽量最高的层次上添加一个事件处理程序

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
    }

    oUl.onmouseout = function(e) {
        var e = e || window.event,
            target = e.target || e.srcElement;

        //alert(target.innerHTML);

        if (target.nodeName.toLowerCase() == "li") {
            target.style.background = "";
        }
    }
}
```


### 缓存模式

缓存对象属性与DOM对象

### 加载脚本

#### 延迟加载

```html
... The full body of the page ...
<!-- end of chunk #2 -->
<script src="all_20100426.js"></script>
<script>
window.onload = function () {
	var script = document.createElement("script");
	script.src = "all_lazy_20100426.js";
	document.documentElement.firstChild.appendChild(script);
};
</script>
</body>
</html>
<!-- end of chunk #3 -->
```

#### 按需加载

```javascript
function require(file, callback) {
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

## Web 安全(Security)

### Input check

#### 特殊字符

-   null字符
-   空格字符
-   空输入(提示)

### XSS Attack

防御:

```js
Array.prototype.filter.call(input.value, function (item) {
	return item !== "<" && item !== ">";  // " " "\n" "\0" etc.
});
```

## ECMAScript 2015

### Babel

```bash
$ babel example.js -o compiled.js
$ babel src -d lib -s
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
