# JavaScript Advanced Notes

<!-- TOC -->

- [JavaScript Advanced Notes](#javascript-advanced-notes)
  - [JavaScript Idioms](#javascript-idioms)
    - [Literal](#literal)
    - [Closure and IIFE](#closure-and-iife)
    - [Check](#check)
    - [Other](#other)
  - [JavaScript Engine Internal](#javascript-engine-internal)
    - [Variables Lifecycle](#variables-lifecycle)
    - [Exection Context](#exection-context)
      - [Global Exection Context](#global-exection-context)
      - [Function Exection Context](#function-exection-context)
    - [Event Loop](#event-loop)
  - [Project](#project)
    - [Principle](#principle)
      - [不修改他人对象](#不修改他人对象)
    - [Task Runner - Gulp](#task-runner---gulp)
      - [Gulp Plugins](#gulp-plugins)
      - [Gulpfile.js](#gulpfilejs)
    - [MV* Pattern](#mv-pattern)
    - [View](#view)
  - [Effective JavaScript](#effective-javascript)
    - [Memory Leak](#memory-leak)
    - [禁用特性](#禁用特性)
    - [局部变量/函数参数](#局部变量函数参数)
    - [字符串](#字符串)
    - [函数](#函数)
      - [作用域链](#作用域链)
    - [循环](#循环)
      - [**倒序**循环可提升性能](#倒序循环可提升性能)
      - [Duff's Device(达夫设备)](#duffs-device达夫设备)
    - [Exception](#exception)
      - [Call Stack Overflow](#call-stack-overflow)
    - [Event Delegate(事件委托)](#event-delegate事件委托)
    - [缓存模式](#缓存模式)
    - [加载脚本](#加载脚本)
      - [延迟加载](#延迟加载)
      - [动态加载](#动态加载)
    - [DOM](#dom)
      - [重排与重绘](#重排与重绘)
      - [批量修改 DOM](#批量修改-dom)
    - [CSS](#css)
    - [定时器(防止脚本阻塞)](#定时器防止脚本阻塞)
    - [计时器](#计时器)
    - [Web Worker](#web-worker)
      - [运行环境](#运行环境)
      - [worker 实例](#worker-实例)
    - [Ajax](#ajax)
      - [数据格式](#数据格式)
      - [Ajax 缓存](#ajax-缓存)
    - [避免重复工作](#避免重复工作)
    - [First Paint Time](#first-paint-time)
    - [算数逻辑运算](#算数逻辑运算)
      - [位操作](#位操作)
      - [Math 对象](#math-对象)
  - [Functional JavaScript](#functional-javascript)
    - [Pros](#pros)
    - [Cons](#cons)
    - [闭包(closure)](#闭包closure)
      - [闭包函数的结构](#闭包函数的结构)
    - [Partial Application](#partial-application)
    - [Currying](#currying)
    - [API](#api)
      - [`[]`.map](#map)
      - [`[]`.filter](#filter)
      - [`[]`.reduce](#reduce)
      - [`[]`.sort](#sort)
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
  - [Testing and Debugging](#testing-and-debugging)
    - [Log](#log)
    - [Frameworks](#frameworks)
      - [Unit 测试](#unit-测试)
      - [UI 测试](#ui-测试)
    - [可测试代码](#可测试代码)
      - [范例](#范例)
    - [圈复杂度](#圈复杂度)
    - [函数复杂度](#函数复杂度)
      - [扇出(引用) **<7**](#扇出引用-7)
      - [扇入(被引用)](#扇入被引用)
    - [耦合度](#耦合度)
      - [内容耦合(5)](#内容耦合5)
      - [公共耦合(4)](#公共耦合4)
      - [控制耦合(3)](#控制耦合3)
      - [印记耦合(2)](#印记耦合2)
      - [数据耦合(1)](#数据耦合1)
      - [无耦合(0)](#无耦合0)
    - [单元测试](#单元测试)
      - [测试原则](#测试原则)
      - [隔离被测代码](#隔离被测代码)
      - [mock/stub/spy](#mockstubspy)
    - [Tools API](#tools-api)
      - [console API](#console-api)
      - [JS API](#js-api)
        - [Trace Property (Vue Internal)](#trace-property-vue-internal)
      - [Node API](#node-api)
  - [ECMAScript 2015+](#ecmascript-2015)
    - [TC39](#tc39)
    - [Babel](#babel)
      - [babel-node](#babel-node)
      - [babel-core](#babel-core)
    - [Variable](#variable)
      - [let](#let)
      - [const](#const)
    - [Destructuring(Pattern Matching)](#destructuringpattern-matching)
      - [默认值](#默认值)
      - [Sample](#sample)
        - [swap](#swap)
        - [简化函数的参数与返回值](#简化函数的参数与返回值)
        - [解析 JSON 对象](#解析-json-对象)
        - [遍历 map/list](#遍历-maplist)
        - [加载特定模块](#加载特定模块)
      - [Array Iterator Style Matching](#array-iterator-style-matching)
      - [Object Style Matching](#object-style-matching)
      - [String Style Matching](#string-style-matching)
      - [Number/Boolean Style Matching](#numberboolean-style-matching)
      - [Function Arguments Style Matching](#function-arguments-style-matching)
    - [String](#string)
      - [Methods](#methods)
      - [Template String](#template-string)
      - [Tagged Templates](#tagged-templates)
    - [RegExp](#regexp)
    - [Number](#number)
    - [Array](#array)
      - [Array.from](#arrayfrom)
      - [Array.copyWithin](#arraycopywithin)
    - [Arrow Function](#arrow-function)
    - [Modules](#modules)
    - [Class 语法糖](#class-语法糖)
    - [Symbol](#symbol)
    - [Proxy and Reflect](#proxy-and-reflect)
  - [Performance](#performance)
    - [Web Browser Speed](#web-browser-speed)
      - [Speed Tools](#speed-tools)
    - [Data Format and Size](#data-format-and-size)
      - [Images Format](#images-format)
      - [Images Compression](#images-compression)
      - [Images Sizing](#images-sizing)
    - [Data Loading](#data-loading)
      - [Data Preloading](#data-preloading)
      - [Images Lazy Loading](#images-lazy-loading)
      - [JavaScript Lazy Loading](#javascript-lazy-loading)
      - [Babel Config for JavaScript](#babel-config-for-javascript)
    - [CSS API](#css-api)
    - [V8 Good Parts](#v8-good-parts)
      - [Object Shape](#object-shape)
      - [Inline Cache](#inline-cache)
      - [V8 Perf Tools](#v8-perf-tools)
    - [Monkey Patch](#monkey-patch)
    - [Performance Best Practice](#performance-best-practice)
    - [Awesome Performance Tutorial](#awesome-performance-tutorial)
    - [Perf and Analysis Tools](#perf-and-analysis-tools)
  - [PWA](#pwa)
  - [Chrome Dev Tools](#chrome-dev-tools)
    - [Elements Panel](#elements-panel)
    - [Source Panel](#source-panel)
    - [capture default eventListener](#capture-default-eventlistener)
    - [More Tools](#more-tools)

<!-- /TOC -->

## JavaScript Idioms

### Literal

- 不要使用 new Boolean()/new Number()/new String()
- 避免使用 new Object()/new Array()

### Closure and IIFE

### Check

- `O || {}` `O || (O = {})`
- `if (O && O.property)`
- `if (typeof v === " ")`
- `toString. apply(var)`

### Other

!!result 转化成 Boolean

## JavaScript Engine Internal

Under the hood

### Variables Lifecycle

- Creation phase (**Hoisting**)
  - Declaration phase: 在作用域中注册变量
  - Initialization phase: 分配内存, 在作用域中绑定变量 (`undefined`)
- Execution phase/Assignment phase

### Exection Context

#### Global Exection Context

- create global object (`window`)
- create `this` object(refer to `window`)
- declare and initialize variable(`undefined`)/function, store them into memory

#### Function Exection Context

- create arguments object
- create `this` object
- declare and initialize variable(`undefined`)/function, store them into memory

如果 JavaScript 引擎在函数执行上下文中找不到变量,
它会在最近的父级执行上下文中查找该变量.
这个查找链将会一直持续, 直到引擎查找到全局执行上下文.
这种情况下, 如果全局执行上下文也没有该变量, 那么将会抛出引用错误 (Reference Error).
子函数“包含”它父级函数的变量环境，把这个概念称为**闭包(Closure)**,
即使父级函数执行环境已经从执行栈弹出了, 子函数还是可以访问父级函数变量 x (通过作用域链).

### Event Loop

The job of the **event loop** is to look into the call stack
and determine if the call stack is empty or not.
If the **call stack** is empty,
it looks into the **ES6 job queue** and **message queue** to see
if there’s any pending call back waiting to be executed:

- ES6 job queue: used by `Promises` (higher priority)
- message queue: used by `setTimeout`, `DOM events`

```js
const bar = () => {
  console.log('bar');
};

const baz = () => {
  console.log('baz');
};

const foo = () => {
  console.log('foo');
  setTimeout(bar, 0);
  new Promise((resolve, reject) => {
    resolve('Promise resolved');
  }).then(res => console.log(res))
    .catch(err => console.log(err));
  baz();
};

foo();

// foo
// baz
// Promised resolved
// bar
```

As above code, using `setTimeout` with `0` seconds timer
helps to defer execution of `Promise` and `bar` until the **stack** is **empty**.

## Project

- sass
- autoprefixer
- github-css-remove-unused-class
- Jslint
- uglification
- concatenation
- minimal

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
npm install jshint gulp-jshint jshint-stylish --save-dev
npm install gulp-imagemin gulp-concat gulp-uglify gulp-minify-css --save-dev
npm install gulp-usemin gulp-cache gulp-changed gulp-rev --save-dev
npm install gulp-rename gulp-notify  browser-sync del --save-dev
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
    .pipe(cache(imagemin({
      optimizationLevel: 3,
      progressive: true,
      interlaced: true
    })))
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

- 关注表现层逻辑
- 向相关模块(Model)派发事件

load()回调函数:

- 不加入过多的逻辑处理
- 不进行多余的DOM操作

## Effective JavaScript

### Memory Leak

- not used global vars (bind to window or document)
- not used setInterval or other callback functions
- not used DOM reference
- closure

### 禁用特性

- with () {}
- eval()
- 少用 new
- 少用 cotinue
- 少用 forEach()

### 局部变量/函数参数

- 局部变量引用全局变量/全局变量作为参数传入函数: 加快符号解析
- 局部变量缓存 DOM 元素
- 局部变量缓存布局信息
- 局部变量引用嵌套成员: 加快原型链查找
- 局部变量引用方法时，应注意会动态改变 this 指针

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

- 事件委托利用的是事件冒泡机制，只制定一事件处理程序，就可以管理某一类型的所有事件
- 使用事件委托，只需在 DOM 树中尽量最高的层次上添加一个事件处理程序

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

- 局部变量缓存 DOM 元素
- 局部变量缓存布局信息

```js
var btn = document.getElementById('btn');
```

- HTML Collection 转化成数组再操作

```js
function toArray(coll) {
  for (var i = 0, a = [], len = coll.length; i < len; i++) {
    a[i] = coll[i];
  }

  return a;
}
```

- children 优于 childNodes
- childElementCount 优于 childNodes.length
- firstElementChild 优于 firstChild
- lastElementChild 优于 lastChild
- nextElementSibling 优于 nextSibling 优于 `childNodes[next]`
- previousElementSibling 优于 previousSibling

#### 重排与重绘

- 重排: 重新构造渲染树
- 重绘: 重新绘制受影响部分

**获取**或改变布局的操作会导致渲染树**变化队列**刷新,执行渲染队列中的"待处理变化",重排 DOM 元素

```js
offsetTop/Left/Width/Height
scrollTop/Left/Width/Height
clientTop/Left/Width/Height
getComputedStyle()
```

#### 批量修改 DOM

- 先 display="none", 修改完成后，display=""
- 使待修改 DOM 元素脱离标准文档流(改变布局／定位方式)，可减少其他元素的重绘次数
- document.createDocumentFragment()

```js
var fragment = document.createDocumentFragment();
appendDataToElement(fragment, data);
document.getElementById('mylist').appendChild(fragment);
```

- oldNode.cloneNode(true);

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

- 第二个参数: 不是执行时间, 是加入执行队列时间
- 若其他位于执行队列中的函数执行时间超过延时，则用户感觉不到延时的存在
- 模拟有间隙的循环，使得 UI 更新得以进入浏览器线程的执行队列中

```js
var button = document.getElementById('myButton');

button.onclick = function() {

  oneMethod();

  setTimeout(function() {
    document.getElementById('notice').style.color = 'red';
  }, 250);
}
```

- 分解任务

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

- 批处理任务

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

- navigation 对象: appName, appVersion, userAgent, platform
- location 对象: 所有属性只读
- ECMAScript 对象: Object/Array/Date
- XMLHttpRequest 方法
- setTimeout/setInterval 方法
- self 对象: 指向全局 worker 对象
- importScripts 方法: 加载外部依赖
- close 方法: 停止 worker

#### worker 实例

- 先 on ,后 post
- main.js/worker.js 的 onmessage 与 postMessage 相互触发

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

|Format|Size (bytes)|Download time (ms)|Parse time (ms)|Total load time (ms)|
|:-----|-----:|----------:|----------:|----------:|
|Verbose XML|582,960|999.4|343.1|1342.5|
|Verbose JSON-P|487,913|598.2|0.0|598.2|
|Simple XML|437,960|475.1|83.1|558.2|
|Verbose JSON|487,895|527.7|26.7|554.4|
|Simple JSON|392,895|498.7|29.0|527.7|
|Simple JSON-P|392,913|454.0|3.1|457.1|
|Array JSON|292,895|305.4|18.6|324.0|
|Array JSON-P|292,912|316.0|3.4|319.4|
|Custom Format (script insertion)|222,912|66.3|11.7|78.0|
|Custom Format (XHR)|222,892|63.1|14.5|77.6|

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

- 特性/浏览器检测代码只运行一次
- 惰性定义模式/自定义模式

### First Paint Time

```js
document.addEventListener('DOMContentLoaded', function() {
  console.log("DOM 挂载时间: ", Date.now() - timerStart);
  // 性能日志上报
});

window.addEventListener('load', function() {
  console.log("所有资源加载完成时间: ", Date.now()-timerStart);
  // 性能日志上报
});
```

```js
// 计算加载时间
function getPerformanceTiming() {
  var performance = window.performance;
  if (!performance) {
    // 当前浏览器不支持
    console.log('你的浏览器不支持 performance 接口');
    return;
  }

  var t = performance.timing;
  var times = {};
  //【重要】页面加载完成的时间
  //【原因】这几乎代表了用户等待页面可用的时间
  times.loadPage = t.loadEventEnd - t.navigationStart;
  //【重要】解析 DOM 树结构的时间
  //【原因】反省下你的 DOM 树嵌套是不是太多了！
  times.domReady = t.domComplete - t.responseEnd;
  //【重要】重定向的时间
  //【原因】拒绝重定向！比如，http://example.com/ 就不该写成 http://example.com
  times.redirect = t.redirectEnd - t.redirectStart;
  //【重要】DNS 查询时间
  //【原因】DNS 预加载做了么？页面内是不是使用了太多不同的域名导致域名查询的时间太长？
  // 可使用 HTML5 Prefetch 预查询 DNS ，见：[HTML5 prefetch](http://segmentfault.com/a/1190000000633364)
  times.lookupDomain = t.domainLookupEnd - t.domainLookupStart;
  //【重要】读取页面第一个字节的时间
  //【原因】这可以理解为用户拿到你的资源占用的时间，加异地机房了么，加CDN 处理了么？加带宽了么？加 CPU 运算速度了么？
  // TTFB 即 Time To First Byte 的意思
  // 维基百科：https://en.wikipedia.org/wiki/Time_To_First_Byte
  times.ttfb = t.responseStart - t.navigationStart;
  //【重要】内容加载完成的时间
  //【原因】页面内容经过 gzip 压缩了么，静态资源 css/js 等压缩了么？
  times.request = t.responseEnd - t.requestStart;
  //【重要】执行 onload 回调函数的时间
  //【原因】是否太多不必要的操作都放到 onload 回调函数里执行了，考虑过延迟加载、按需加载的策略么？
  times.loadEvent = t.loadEventEnd - t.loadEventStart;
  // DNS 缓存时间
  times.appcache = t.domainLookupStart - t.fetchStart;
  // 卸载页面的时间
  times.unloadEvent = t.unloadEventEnd - t.unloadEventStart;
  // TCP 建立连接完成握手的时间
  times.connect = t.connectEnd - t.connectStart;
  return times;
}
```

### 算数逻辑运算

#### 位操作

- i%2 => `i&0x1`
- 位掩码

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

## Functional JavaScript

- predictable (pure and immutable)
- safe (pure and immutable)
- transparent (pure and immutable)
- modular (composite)

### Pros

- type safe and state safe
- explicit flow of data
- concurrency safety

### Cons

- verbose
- more object creation
- more garbage collection
- more memory usage

With help of `immutable.js`,
object creation/garbage collection/memory usage can be alleviated.

For example, in vanilla.js, `map2 === map1` become `false`,
but in immutable.js `map2 === map1` become `true`
(copy free due to immutable data).

```js
const map1 = { 'b': 2 };
const map2 = map1.set{ 'b': 2 };
```

### 闭包(closure)

两个函数都维持着对外部作用域 Counter 的引用，因此总可以访问Counter作用域内定义的变量count(外部局部变量)

- 函数外部不可对函数内部进行赋值或引用
- 但函数中的闭包函数可对函数进行赋值或引用(函数对于闭包来说是外部，即内部引用外部)
- 特权性质: 从外部通过闭包方法访问内部(函数作用域)局部变量

#### 闭包函数的结构

优先级: this > 局部变量 > 形参 > arguments > 函数名

### Partial Application

```js
const partialFromBind = (fn, ...args) => {
  return fn.bind(null, ...args);
}

const partial = (fn, ...args) => {
  return (...rest) => {
    return fn(...args, ...rest);
  }
}
```

### Currying

chain of multiple single argument functions

```js
const add = x => y => x + y
```

```javascript
function schonfinkelize(fn) {
  const slice = Array.prototype.slice,
  stored_args = slice.call(arguments, 1);

  return function () {
    const new_args = slice.call(arguments),
    args = stored_args.concat(new_args);
    return fn.apply(null, args);
  };
}

const addOne = schonfinkelize(add, 1);
// addOne(3) === 4;
const addFive = schonfinkelize(addOne, 1, 3);
// addFive(4) === 9;
```

### API

#### `[]`.map

相当于 Haskell 中的 List Map

#### `[]`.filter

相当于 Haskell 中的 List Filter

#### `[]`.reduce

相当于 Haskell 中的 fold

#### `[]`.sort

## Code Style Guide

### Style

#### 命名规范

- 变量: 名词前缀
- 方法/函数: 动词前缀
- _method: 表示私有化方法
- 普通函数: 驼峰命名法(Camel Case)
- 构造函数: 帕斯卡命名法(Pascal Case), 首字母大写

#### 全局变量

应只有模块名为全局变量;jsmin不会缩减全局变量与全局函数名

#### 初始化模式

```javascript
var MYAPP = MYAPP || {};
```

#### 单一var模式

一个作用域内仅出现一个var关键字,且为所有变量赋初值:

- 简洁代码
- 提示变量类型

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

- 键入最后一个运算符后再换行, 运算符置于行尾可使 automatic semicolon insertion 机制失效
- 换行后保持 2 个缩进层次

#### 空格

Good places to use a white space include:

- ,/; 后
- +,-,*,/,<,>,= 前后
- function () {}
- function foo() {}
- } if/for/while () {}
- } else {}

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

- 上方插入空行
- 与下方语句统一缩进

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

- 函数不应依赖于全局变量，实现与执行全局环境的的解耦
- 全局变量应以函数参数/依赖的形式，注入函数内部

#### 解耦

##### 事件处理与UI逻辑

- 事件处理函数与应用逻辑函数分开成单独函数,提高代码重用率
- 应用逻辑函数不依赖于 event 对象，其属性值作为参数传入，易于解耦与测试

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

## Testing and Debugging

### Log

- 时间，包含时区信息和毫秒
- 日志级别
- 会话标识
- 功能标识
- 精炼的内容: 场景信息（谁，什么功能等），状态信息(开始，中断，结束)以及重要参数
- 其他信息：版本号，线程号

### Frameworks

#### Unit 测试

- Jasmine
- Mocha

#### UI 测试

- 用户行为: Karma/Selenium
- 功能测试: Phantomjs/Slimerjs/Karma

### 可测试代码

- 完整注释
- 最小复杂度 = (扇入 * 扇出) ^ 2
- 可隔离性: 最小依赖性 + 松耦合性

#### 范例

- 使用依赖注入，将外部对象移至函数参数处(不在函数内部调用构造器): 易于构造 mock/stub, 降低扇出(函数复杂度)

### 圈复杂度

V(G) = e - n + 2 **<10**

### 函数复杂度

函数复杂度 = (扇入 * 扇出) ^ 2

#### 扇出(引用) **<7**

- 所引用外部对象/方法之和
- 高扇出: 高复杂度/高依赖性/高耦合度

#### 扇入(被引用)

- 其他对象/方法引用此函数的次数之和
- 顶层抽象代码 与 不常用功能 应保持低扇入

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

- 代码覆盖率
- 非法值测试
- 边界测试
- 非边界测试

#### 隔离被测代码

- 编写代码时，保持最小复杂度(最小依赖，最低耦合)
- 利用 mock/stub 模拟外部依赖/测试数据

#### mock/stub/spy

- mock: 模拟对象中的方法/接口
- stub: 模拟对象中的返回值
- spy: 在原有对象的基础上，增加监视用变量/方法 e.g assert/调用次数/参数限制

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
        const filename = "numbers";
        const fsMock = {
            readFileSync: function (path, encoding) {
                expect(path).toEqual(filename);
                expect(encoding).toEqual('utf8');
                return JSON.stringify({ a: 9, b: 3 });
            }
        };

        mockery.registerMock('fs', fsMock);
        const mySum = require('./mySumFS');
        expect(mySum.sum(filename)).toEqual(12);
        mockery.deregisterMock('fs');
    });
});
```

### Tools API

#### console API

```js
console.log/info/warn/error
console.dir/dirxml/table; // different output style
console.assert;
console.group/groupEnd
console.time/timeEnd;
console.profile/profileEnd;
console.count
console.trace;
```

`console.log`

```js
// `sprinf` style log
console.log('%d %o %s', integer, object, string);
console.log('%c ...', 'css style');
```

`console.table`

```js
// display array of object (tabular data)
const transactions = [{
  id: "7cb1-e041b126-f3b8",
  seller: "WAL0412",
  buyer: "WAL3023",
  price: 203450,
  time: 1539688433
},
{
  id: "1d4c-31f8f14b-1571",
  seller: "WAL0452",
  buyer: "WAL3023",
  price: 348299,
  time: 1539688433
},
{
  id: "b12c-b3adf58f-809f",
  seller: "WAL0012",
  buyer: "WAL2025",
  price: 59240,
  time: 1539688433
}];

console.table(data, ['id', 'price']);
```

#### JS API

```js
debugger;
```

```js
copy(obj) // to clipborad
```

```js
window.onerror = function(errorMessage, scriptURI, lineNo, columnNo, error) {
  console.log('errorMessage: ' + errorMessage); // 异常信息
  console.log('scriptURI: ' + scriptURI); // 异常文件路径
  console.log('lineNo: ' + lineNo); // 异常行号
  console.log('columnNo: ' + columnNo); // 异常列号
  console.log('error: ' + error); // 异常堆栈信息
  // ...
  // 异常上报
};

window.addEventListener('error', function() {
  console.log(error);
  // ...
  // 异常上报
});
```

##### Trace Property (Vue Internal)

```js
const traceProperty = (object, property) => {
  let value = object[property];
  Object.defineProperty(object, property, {
    get () {
      console.trace(`${property} requested`);
      return value;
    },
    set (newValue) {
      console.trace(`setting ${property} to `, newValue);
      value = newValue;
    },
  })
};
```

#### Node API

- node --inspect
- [ndb](https://github.com/GoogleChromeLabs/ndb)

```bash
node --inspect
ndb index.js
```

## ECMAScript 2015+

### TC39

- [New Feature Process](http://tc39.github.io/process-document)

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
npm install babel-core --save
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

- 一方面规定，var命令和function命令声明的全局变量，依旧是全局对象的属性
- 另一方面规定，let命令、const命令、class命令声明的全局变量，不属于全局对象的属性

#### let

- 不存在变量提升
- 块级作用域(Temporal Dead Zone)
- 块级作用域内定义的变量/函数，在块级作用域外 ReferenceError

#### const

- const一旦声明变量，就必须立即初始化，不能留到以后赋值
- 块级作用域(Temporal Dead Zone)
- 引用一个引用变量时，只表示此变量地址不可变，但所引用变量的值/属性可变(* const)

### Destructuring(Pattern Matching)

- **建议只要有可能，就不要在模式中放置圆括号**
- 赋值语句的非模式部分，可以使用圆括号

#### 默认值

- ES6内部使用严格相等运算符（===），判断一个位置是否有值。若此位置无值，则使用默认值
- 如果一个数组成员不严格等于undefined，默认值不会生效

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

- 可用于工厂(factory)/设置(options)模式: 传参一般为 options 对象，具有固定的属性名
- 一次性定义多个参数
- 一次性定义多个参数的默认值

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

- Array
- Set
- Generator 函数

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

- 真正被赋值的是后者，而不是前者

```js
let {pattern: variable} = { key: value };
```

- 解构赋值的规则: 只要等号右边的值不是对象，就先将其转为对象
- undefined/null 无法转化为对象

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

- string.codePointAt(index): 正确处理 4 字节存储字符
- string.fromCodePoint(codePoint)

```js
function is32Bit(c) {
  return c.codePointAt(0) > 0xFFFF;
}

String.fromCodePoint(0x78, 0x1f680, 0x79) === 'x\uD83D\uDE80y'
// true
```

- string.includes(substr)/startsWith(substr)/endsWith(substr)
- 使用第二个参数n时，endsWith 针对前 n 个字符，其他两个方法针对从第 n 个位置直到字符串结束

```js
var s = 'Hello world!';

s.startsWith('world', 6) // true
s.endsWith('Hello', 5) // true
s.includes('Hello', 6) // false
```

- repeat(times)

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

- padStart/padEnd(len, paddingStr)

```js
'1'.padStart(10, '0') // "0000000001"
'12'.padStart(10, '0') // "0000000012"
'123456'.padStart(10, '0') // "0000123456"

'12'.padStart(10, 'YYYY-MM-DD') // "YYYY-MM-12"
'09-12'.padStart(10, 'YYYY-MM-DD') // "YYYY-09-12"
```

#### Template String

`str` 表示模板字符串

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

#### Tagged Templates

```js
function template(strings, ...keys) {
  return (function(...values) {
    var dict = values[values.length - 1] || {};
    var result = [strings[0]];
    keys.forEach(function(key, i) {
      var value = Number.isInteger(key) ? values[key] : dict[key];
      result.push(value, strings[i + 1]);
    });
    return result.join('');
  });
}

var t1Closure = template`${0}${1}${0}!`;
t1Closure('Y', 'A');  // "YAY!"
var t2Closure = template`${0} ${'foo'}!`;
t2Closure('Hello', {foo: 'World'});  // "Hello World!"
```

- 编译模板(小型模板引擎)

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

- 国际化处理

```js
i18n`Welcome to ${siteName}, you are visitor number ${visitorNumber}!`
// "欢迎访问xxx，您是第xxxx位访问者！"
```

- XSS 攻击

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

- 运行代码

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

- u 修饰符
- y(粘连全局符) 修饰符号隐含了头部匹配的标志

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

- 0bxxx/0Bxxx
- 0oxxx/0Oxxx
- Number.isFinite()/isNaN()/parseInt()/parseFloat()/isInteger()/isSafeInteger()
- Number.EPSILON/`MAX_SAFE_INTEGER`/`MIN_SAFE_INTEGER`
- ** 指数运算符
- BigInt

```js
const a = 2172141653;
const b = 15346349309;
a * b
// => 33334444555566670000
BigInt(a) * BigInt(b)
// => 33334444555566667777n
```

### Array

#### Array.from

强大的**函数式**方法

- 伪数组对象(array-like object)
- 可枚举对象(iterable object)
- 克隆数组
- map 函数

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

### Arrow Function

- no thisArgs binding
- no arguments binding
- no prototype binding
- no suited for `New` constructor
- not suited as methods of plain object
  (`this` in arrow function would be refer to `window`)

### Modules

import and export

```js
import { lastName as surname } from './profile.js';
```

```js
export const firstName = 'Michael';
export const lastName = 'Jackson';
export const year = 1958;
```

```js
// profile.js
const firstName = 'Michael';
const lastName = 'Jackson';
const year = 1958;

export {firstName, lastName, year};
```

```js
// 接口改名
export { foo as myFoo } from 'my_module';

// 整体输出
export * from 'my_module';
```

- CommonJS 模块输出的是一个值的拷贝，ES6 模块输出的是值的引用
- CommonJS 模块是运行时加载，ES6 模块是编译时输出接口

### Class 语法糖

```js
class A {
  constructor(value) {
    this.val = value;
  }
}

class B extends A {
  constructor(value) {
    super(value);
  }
}

const b = new B(6);

console.log(B.__proto__ === A);
console.log(B.prototype.constructor === B);
console.log(B.prototype.__proto__ === A.prototype);
console.log(b.__proto__ === B.prototype);

function AA(value) {
  this.val = value;
}

function BB(value) {
  AA.call(this, value);
}

BB.prototype = Object.create(AA.prototype);
BB.prototype.constructor = BB;

const bb = new BB(6);

console.log(BB.__proto__ === Function.prototype); // not consistence with class syntax
console.log(BB.prototype.constructor === BB);
console.log(BB.prototype.__proto__ === AA.prototype);
console.log(bb.__proto__ === BB.prototype);
```

禁止对复合对象字面量进行导出操作 (array literal, object literal)

### Symbol

implement iterator with `Symbol.iterator`

```js
function methodsIterator() {  
  let index = 0;
  let methods = Object.keys(this).filter((key) => {
    return typeof this[key] === 'function';
  }).map(key => this[key]);
  return {
    next: () => ({ // Conform to Iterator protocol
      done : index >= methods.length,
      value: methods[index++]
    })
  };
}
let myMethods = {  
  toString: function() {
    return '[object myMethods]';
  },
  sumNumbers: function(a, b) {
    return a + b;
  },
  numbers: [1, 5, 6],
  [Symbol.iterator]: methodsIterator // Conform to Iterable Protocol
};
for (let method of myMethods) {  
  console.log(method); // logs methods `toString` and `sumNumbers`
}
```

### Proxy and Reflect

modify default object behavior with `Proxy` and `Reflect`

```js
Proxy(target, {
  set: function(target, name, value, receiver) {
    var success = Reflect.set(target,name, value, receiver);
    if (success) {
      log('property ' + name + ' on ' + target + ' set to ' + value);
    }
    return success;
  }
});
```

## Performance

### Web Browser Speed

- First Contentful Paint
- First Ipnut Delay
- Time to Interactive

#### Speed Tools

- [Speedup Tools](https://developers.google.com/web/fundamentals/performance/speed-tools/)
- [FID Tracking](https://github.com/GoogleChromeLabs/first-input-delay)
- [PageSpeed Insights](https://developers.google.com/speed/pagespeed/insights/)
- [Lighthouse (`audit` tab)](https://github.com/GoogleChrome/lighthouse)

### Data Format and Size

#### Images Format

mp4 smaller than gif

```html
<!-- ffmpeg -i dog.gif dog.mp4 -->
<video autoplay loop muted playsinline>
  <source src="dog.mp4" type="video/mp4">
</video>
```

WebP 25-35% smaller than jpg/png

```html
<picture>
  <source type="image/webp" srcset="flower.webp">
  <source type="image/jpeg" srcset="flower.jpg">
  <img src="flower.jpg">
</picture>
```

#### Images Compression

- [Imagemin](https://github.com/Klathmon/imagemin-webpack-plugin)

#### Images Sizing

provide 3~5 different sizes
reduce image transfer sizes by average of ~20%

- [Sharp](https://github.com/lovell/sharp)
- [Jimp](https://github.com/oliver-moran/jimp)

```html
<img srcset="flower-small.jpg 480w, flower-large.jpg 1080w"
  sizes="50vw"
  src="flower-large.jpg"
>
```

### Data Loading

#### Data Preloading

```js
<link rel="preload" as="script" href="critical.js">
<link rel="modulepreload" href="critical-module.mjs">

<link rel="preload" as="image" href="...">
<link rel="preload" as="font" href="..." crossorigin>
<link rel="preload" as="fetch" href="..." crossorigin>
```

#### Images Lazy Loading

- Lazy Loading Polyfill

```html
<img data-src="flower.jpg" class="lazyload">
```

```js
window.addEventListener('scroll', function(event) {
  Array.from(document.querySelectorAll('.lazyload')).forEach((image) => {
    if (image.slideIntoView(event.getBoundingClientRect())) {
      image.setAttribute('src', image.dataset.src);
    }
  })
});
```

- Native Lazy Loading

```html
<img src="flower.jpg" lazyload="auto">
<img src="flower.jpg" lazyload="on">
<img src="flower.jpg" lazyload="off">
```

#### JavaScript Lazy Loading

```jsx
const DetailsComponent = lazy(() => import('./details'));
const PageComponent = () => {
  <Suspense fallback={<div>Loading...</div>}>
    <DetailsComponent />
  </Suspense>
}
```

#### Babel Config for JavaScript

```json
{
  "presets": [
    [
      "@babel/preset-env",
      {
        "targets": {
          "esmodules": true,
          "node": ">= 8",
          "browsers": "> 0.25%",
        },
        "useBuiltIns": "usage"
      }
    ]
  ]
}
```

```js
<script type="module" src="main.mjs"></script>
<script nomodule src="legacy.js"></script>
```

### CSS API

```js
script -> style -> layout -> paint -> composite
```

Make `script` stage become: read then write.
Interleaved read and write will triger multiple times
of relayout/repaint/recomposite.

```js
// bad
read css -> write css (re-layout/paint/composite)
-> read css -> write css (re-layout/paint/composite)
-> read css -> write css (re-layout/paint/composite)

// good
read css -> write css (only re-layout/paint/composite once)
```

### V8 Good Parts

- source code (parser) AST (interpreter) bytecode
- send profilling data from bytecode to optimizing compiler, generate optimized code
- **Ignition** interpreter
- **TurboFan** optimizing compiler (2 for SpiderMonkey/Edge, 3 for Safari)

#### Object Shape

```js
// o1 and o2 have the same shape
// JSObject(1, 2) => Shape('x', 'y')
// JSObject(3, 4) => Shape('x', 'y')
// 'x' => 0 Offset, Writable, Enumerable, Configurable
// 'y' => 1 Offset, Writable, Enumerable, Configurable
const o1 = { x: 1, y: 2 };
const o2 = { x: 3, y: 4 };
```

Shape Transform

```js
// Shape chain: Shape(empty) => Shape(x) => Shape(x, y)
const o = {};
o.x = 1;
o.y = 2;

// Shape chain: Shape(empty) => Shape(y) => Shape(y, x)
const o = {};
o.y = 2;
o.x = 1;

// Shape chain: Shape(x)
const o = { x: 1};
```

array shape: Shape('length'), 'length' => 0 Offset, Writable

#### Inline Cache

V8 use ICs to memorize information (same shape) where to find properties on objects:

- always initialize objects in the same way (generate the same shape)
- don't mess with property attributes of array elements

#### V8 Perf Tools

- [deoptigate](https://github.com/thlorenz/deoptigate)
- [turbolizer](https://github.com/thlorenz/turbolizer)
- [v8 map processor](https://github.com/thlorenz/v8-map-processor)

### Monkey Patch

```js
let _wr = function (type) {
    let orig = window.history[type];

    return function () {
        let rv = orig.apply(this, arguments);
        let e = new Event(type.toLowerCase());
        e.arguments = arguments;
        window.dispatchEvent(e);
        return rv;
    };
};

window.history.pushState = _wr('pushState');
window.history.replaceState = _wr('replaceState');

window.addEventListener('pushstate', function (event) {
    // doing something
});

window.addEventListener('replacestate', function (event) {
    // doing something
});
```

### Performance Best Practice

- use monomorphic objects due to shape and inline caches
- use monomorphic fucntion in hot code paths

### Awesome Performance Tutorial

- [v8 perf](https://github.com/thlorenz/v8-perf)

### Perf and Analysis Tools

- [Chrome DevTools](https://developers.google.com/web/tools/chrome-devtools/evaluate-performance/reference)
- [Chrome UX Report](https://developers.google.com/web/tools/chrome-user-experience-report/)

## PWA

Progressive Web Apps:

- served over `HTTPS`
- provide a manifest
- register a ServiceWorker
  (web cache for offline and performance)

## Chrome Dev Tools

### Elements Panel

- break on elements

### Source Panel

- multiple breakpoints: source, XHR/fetch, DOM, global/event listeners

### capture default eventListener

> $0: the reference to the currently selected element in the Elements panel

```js
const listener = getEventListeners($0).click[0].listener;
$0.removeEventListener('click', listener);
$0.addEventListener('click', (e) => {
  // do something
  // ...

  // then
  listener(e);
});
```

### More Tools

- rendering
- layers
- animations
- coverage
