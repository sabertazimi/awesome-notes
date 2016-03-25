<!-- TOC depthFrom:1 depthTo:6 withLinks:1 updateOnSave:1 orderedList:0 -->

- [JavaScript Basic Notes](#javascript-basic-notes)
	- [变量](#变量)
		- [全局变量](#全局变量)
		- [局部变量](#局部变量)
		- [变量声明提升(Hoisting)](#变量声明提升hoisting)
		- [数组](#数组)
			- [数组字面量](#数组字面量)
			- [常用方法](#常用方法)
				- [堆栈](#堆栈)
				- [分割/合并](#分割合并)
				- [替换](#替换)
				- [查询](#查询)
				- [遍历](#遍历)
				- [其他](#其他)
				- [Array Tips](#array-tips)
				- [高阶函数](#高阶函数)
		- [类型转化](#类型转化)
	- [运算符](#运算符)
	- [控制流程](#控制流程)
		- [switch/case](#switchcase)
	- [对象](#对象)
		- [对象三大特征](#对象三大特征)
		- [构造函数](#构造函数)
			- [new的实质](#new的实质)
				- [原生对象的new构造](#原生对象的new构造)
			- [返回值](#返回值)
			- [最佳实践](#最佳实践)
		- [全局对象](#全局对象)
		- [私有属性与特权方法](#私有属性与特权方法)
			- [私有属性](#私有属性)
			- [特权方法](#特权方法)
			- [Best Practice](#best-practice)
		- [静态属性与方法](#静态属性与方法)
			- [静态属性](#静态属性)
			- [静态方法](#静态方法)
		- [模块化对象](#模块化对象)
			- [Best Practice](#best-practice)
		- [普通属性](#普通属性)
		- [普通方法](#普通方法)
		- [Class式继承](#class式继承)
			- [设置原型与借用构造函数](#设置原型与借用构造函数)
				- [Best Practice](#best-practice)
			- [代理构造函数](#代理构造函数)
				- [Best Practice](#best-practice)
			- [kclass语法糖](#kclass语法糖)
		- [Prototype式继承](#prototype式继承)
			- [共享 - 原型代理/享元模式(new与Object.create)](#共享-原型代理享元模式new与objectcreate)
			- [独立 - 原型克隆](#独立-原型克隆)
				- [浅克隆](#浅克隆)
				- [深克隆](#深克隆)
				- [属性混入 - 多重继承](#属性混入-多重继承)
			- [封装 - 工厂方法(闭包)](#封装-工厂方法闭包)
		- [包装类对象](#包装类对象)
		- [错误对象](#错误对象)
	- [函数](#函数)
		- [函数式JavaScript](#函数式javascript)
			- [闭包(closure)](#闭包closure)
			- [偏函数应用](#偏函数应用)
			- [高阶函数](#高阶函数)
				- [`[]`.map](#map)
				- [`[]`.filter](#filter)
				- [`[]`.reduce](#reduce)
				- [`[]`.sort](#sort)
		- [函数表达式](#函数表达式)
		- [入参函数](#入参函数)
		- [回调函数](#回调函数)
		- [自定义函数(Self-Defining Function)/惰性函数定义(Lazy Function Definition)](#自定义函数self-defining-function惰性函数定义lazy-function-definition)
		- [即时函数](#即时函数)
			- [即时函数模式](#即时函数模式)
			- [模式作用](#模式作用)
			- [返回值](#返回值)
		- [call/apply](#callapply)
			- [通过call/apply实现bind函数](#通过callapply实现bind函数)
		- [this/that](#thisthat)
		- [多态方法](#多态方法)
		- [hasOwnProperty](#hasownproperty)
		- [eval](#eval)
		- [常用函数](#常用函数)
			- [类型判断](#类型判断)
			- [parseInt](#parseint)
			- [对象](#对象)
			- [数学函数](#数学函数)
		- [常用模式](#常用模式)
			- [API模式](#api模式)
				- [回调模式](#回调模式)
				- [配置对象](#配置对象)
				- [返回函数(闭包)](#返回函数闭包)
				- [Curry化](#curry化)
				- [链模式](#链模式)
			- [初始化模式](#初始化模式)
				- [即使函数](#即使函数)
				- [即使对象初始化](#即使对象初始化)
				- [初始化分支](#初始化分支)
	- [模块化](#模块化)
		- [命名空间](#命名空间)
			- [通用命名空间函数](#通用命名空间函数)
		- [沙盒模式](#沙盒模式)
			- [实现沙盒构造函数](#实现沙盒构造函数)
			- [沙盒使用方式](#沙盒使用方式)
	- [MVC](#mvc)
		- [View](#view)
	- [JavaScript DOM Basic](#javascript-dom-basic)
		- [DOM - O](#dom-o)
		- [DOM-Core](#dom-core)
			- [dynamic creation](#dynamic-creation)
				- [append](#append)
				- [insert](#insert)
			- [node](#node)
			- [Frag](#frag)
		- [DOM HTML](#dom-html)
		- [DOM Style](#dom-style)
		- [document](#document)
		- [window](#window)
		- [DOM Events](#dom-events)
			- [Mouse Events](#mouse-events)
			- [Key Events](#key-events)
			- [Frame Events](#frame-events)
			- [Input Events](#input-events)
			- [User-Defined Handler](#user-defined-handler)
	- [模板引擎：handlebars.js](#模板引擎handlebarsjs)
	- [Ajax](#ajax)
		- [基本用法](#基本用法)
		- [简单封装](#简单封装)
		- [跨域请求](#跨域请求)
	- [JSON](#json)
		- [jQuery](#jquery)
	- [正则表达式](#正则表达式)
		- [Flags](#flags)
		- [元字符](#元字符)
		- [相关函数](#相关函数)
			- [test](#test)
	- [Effective](#effective)
		- [缓存模式](#缓存模式)
		- [加载脚本](#加载脚本)
			- [延迟加载](#延迟加载)
			- [按需加载](#按需加载)
	- [Code Style](#code-style)
		- [命名规范](#命名规范)
		- [全局变量](#全局变量)
		- [初始化模式](#初始化模式)
		- [单一var模式](#单一var模式)
		- [条件表达式](#条件表达式)
		- [空格](#空格)
		- [Comments](#comments)

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

#### 常用方法

##### 堆栈

```javascript
arr.unshift(value); // 添加数组首元素
arr.push(value);    // 添加数组尾元素
arr.shift();        // 删除数组首元素
arr.pop();          // 删除数组尾元素
```

##### 分割/合并

```javascript
[].concat(otherArray);
[string].join("连接符");             // 将字符串数组连接成字符串o
string(charArray).split("割断点");   // 选择割断符,返回字符串数组
[].slice(start, end);               // [start] - [end - 1]
[].splice();                        // 功能强大的多态方法
```

##### 替换

```javascript
[].replace(oldSubStr, newStr);
```

##### 查询

```javascript
"".substr(start, end);
[].indexOf(char); // -1 or other
```

##### 遍历

```javascript
[]/obj.forEach(function (val) {});    // 遍历数组/对象所有元素(val为单个元素)
```

##### 其他

```javascript
[].reverse();
```

```javascript
// Tips
// 反转字符串
var reverseStr = normalizedStr.split('').reverse().join('');
```

##### Array Tips

-   对字符串每个元素进行单独操作 e.g map/filter

```javascript
str.split('').map(function(subStr) {
    return decode(subStr.charCodeAt(0));
}).join('');

str.split('').someOperator().join('');
```

-   实现contains方法

```javascript
arr.indexOf(item) === -1;
```

-   改变某一处字母

```javascript
after = after.charAt(0).toUpperCase() + after.slice(1);
```

-   删除只能指定元素

```javascript
arr.splice(index, 1);
```

##### 高阶函数

```javascript
[].map((item) => {});                            // map over
[].filter((item) => {});                         // list comprehension
[].reduce((previous, current [, currentIndex, arr]) => {}, initial);   // fold function
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

##### 原生对象的new构造

boolean string number 不用new表现不同

Tips: 构造boolean时，不要使用new

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

### 私有属性与特权方法

#### 私有属性

实现方式: 闭包

```javascript
function Gadget() {
	// private member
	var name = 'iPod';
	// public function
	this.getName = function () {
		return name;
	};
}
```

#### 特权方法

getter:返回基本类型值/**引用**类型**深拷贝**(POLA最低授权原则)

```javascript
function Gadget() {
	// private member
	var pref = {};
	// public function
	this.getPref = function () {
		return pref.clone();
	};
}
```

#### Best Practice

**即使函数模式 + 揭示模式**

-   实现私有属性与私有方法
-   提供私有方法的公共(读/执行 not 写)接口,公共接口发生意外,私有方法仍安全

```javascript
//匿名即时函数模式
var myobj = (function () {
	// private member
	var name = "tazimi";
    // private method
    var getName = function getName() {
    	return name;
    }
    // 闭包
    return {
        // 公共接口 - 私有方法
    	getName: getName;
    };
}());
```

### 静态属性与方法

#### 静态属性

实现方式: 闭包/原型代理

#### 静态方法

直接向构造函数添加方法

```javascript
Object.isArray = function () {};
```

### 模块化对象

命名空间+依赖模式+私有属性/特权方法+初始化模式+揭示模式(公共接口)+即时函数模式

package+import+private field/methods+constructor+public methods

#### Best Practice

```javascript
// 命名空间模式
MYAPP.namespace('MYAPP.utilities.array');

//形参: 导入全局变量
MYAPP.utilities.array = (function (app, global) {
// start of var declare

// 依赖模式
var uobj = MYAPP.utilities.object,
	ulang = MYAPP.utilities.lang,
// 私有属性
	arrStr = "[object Array]",
	toStr = Object.prototype.toString;
// 私有方法
	inArray = function (haystack, needle) {
		for (var i = 0, max = haystack.length; i < max; i += 1) {
			if (haystack[i] === needle) {
				return i;
			}
		}
		return −1;
	},
	isArray = function (a) {
		return toStr.call(a) === arrayString;
	};

// end of var declare

// 初始化模式
初始化代码,只执行一次

// 揭示公共接口
return {
	isArray: isArray,
	indexOf: inArray
};

}(MYAPP, this));
```
### 普通属性

*编写函数时,一般用[]访问对象属性*

### 普通方法

为prototype添加方法,可以通过实现语法糖method()简化代码(链模式)

```javascript
if (typeof Function.prototype.method !== "function") {
	Function.prototype.method = function (name, implementation) {
		this.prototype[name] = implementation;
		return this;
	};
}
```

```javascript
var Person = function (name) {
	this.name = name;
}
.method('getName', function () {
	return this.name;
})
.method('setName', function (name) {
	this.name = name;
	return this;
});
```

### Class式继承

#### 设置原型与借用构造函数

##### Best Practice

此模式会使得子类属性继承2次

```javascript
function Parent(name) {
	this.name = name || 'Adam';
}
// adding functionality to the prototype
Parent.prototype.say = function () {
	return this.name;
};

// child constructor
function Child(name) {
	Parent.apply(this, arguments);
}
Child.prototype = new Parent();
```

#### 代理构造函数

##### Best Practice

```javascript
var inherit = (function () {
	var F = function () {};
	return function (C, P) {
		F.prototype = P.prototype;
		C.prototype = new F();
		C.uber = P.prototype;
		C.prototype.constructor = C;
	};
}());
```

#### kclass语法糖

```javascript
var klass = function (Parent, props) {
	var Child, F, i;

	// 新的构造函数
	Child = function () {
		if (Child.uber && Child.uber.hasOwnProperty("_construct")) {
			Child.uber._construct.apply(this, arguments);
		}
		if (Child.prototype.hasOwnProperty("_construct")) {
			Child.prototype._construct.apply(this, arguments);
		}
	};

	// 类式继承
	Parent = Parent || Object;
	// 代理构造函数F
	F = function () {};
	F.prototype = Parent.prototype;
	Child.prototype = new F();
	Child.uber = Parent.prototype;
	Child.prototype.constructor = Child;

	// 添加属性与方法
	for (i in props) {
		if (props.hasOwnProperty(i)) {
			Child.prototype[i] = props[i];
		}
	}

	// return the "class"
	return Child;
};
```

```javascript
var SuperMan = klass(Man, {
	_construct: function (what) {
		console.log("SuperMan's constructor");
	},
	getName: function () {
		var name = SuperMan.uber.getName.call(this);
		return "I am " + name;
	}
});
```

### Prototype式继承

#### 共享 - 原型代理/享元模式(new与Object.create)

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

#### 独立 - 原型克隆

此时属性与方法不共享，实例对象各自拥有一份拷贝

##### 浅克隆

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

##### 深克隆

```javascript
function extendDeep(parent, child) {
	var i,
		toStr = Object.prototype.toString,
		astr = "[object Array]";
		child = child || {};

	for (i in parent) {
		if (parent.hasOwnProperty(i)) {
		    // 若属性为对象,则进行深克隆
			if (typeof parent[i] === "object") {
				child[i] = (toStr.call(parent[i]) === astr) ? [] : {};
				extendDeep(parent[i], child[i]);
			} else {
				child[i] = parent[i];
			}
		}
	}

	return child;
}
```

##### 属性混入 - 多重继承

```javascript
function mix() {
	var arg, prop, child = {};

	for (arg = 0; arg < arguments.length; arg += 1) {
		for (prop in arguments[arg]) {
			if (arguments[arg].hasOwnProperty(prop)) {
				child[prop] = arguments[arg][prop];
			}
		}
	}

	return child;
}
```

```javascript
var cake = mix(
	{eggs: 2, large: true},
	{butter: 1, salted: true},
	{flour: "3 cups"},
	{sugar: "sure!"}
);
```

#### 封装 - 工厂方法(闭包)

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

### 函数式JavaScript

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

#### 高阶函数

##### `[]`.map

相当于Haskell中的List Map

##### `[]`.filter

相当于Haskell中的List Filter

##### `[]`.reduce

相当于Haskell中的fold

##### `[]`.sort

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

#### 通过call/apply实现bind函数

```javascript
function bind(o, m) {
	return function () {
		return m.apply(o, [].slice.call(arguments));
	};
}
```

```javascript
var one = {
	name: "object",
	say: function (greet) {
		return greet + ", " + this.name;
	}
},
	two = {name: "another object"},
	twosay = bind(two, one.say);

twosay('yo'); // "yo, another object"
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

#### 类型判断

```javascript
Boolean(val);  // true
Array(val);    // Array[<3个空存储位置>]
```

#### parseInt

parseInt(val, 2/8/10);

#### 对象

```javascript
Object.keys(obj);   // 返回一个数组, 保存obj中所有可枚举属性的键值
```

#### 数学函数

```javascript
Math.floor(Math.random * arr.length);
Math.min/Math.max;  // 最小值/最大值
```

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

##### 链模式

```javascript
return this
```

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

```javascript
// global object
var MYAPP = {};
// constructors
MYAPP.Parent = function () {};
MYAPP.Child = function () {};
// a variable
MYAPP.some_var = 1;
// an object container
MYAPP.modules = {};
// nested objects
MYAPP.modules.module1 = {};
MYAPP.modules.module1.data = {a: 1, b: 2};
MYAPP.modules.module2 = {};
```

#### 通用命名空间函数

```javascript
MYAPP.namespace = function (namespaceString) {
	var parts = namespaceString.split('.'),
		parent = MYAPP,
		i;
	// strip redundant leading global
	if (parts[0] === "MYAPP") {
		// remove leading global
		parts = parts.slice(1);
	}
	for (i = 0; i < parts.length; i += 1) {
		// create a property if it doesn't exist
		if (typeof parent[parts[i]] === "undefined") {
			parent[parts[i]] = {};
		}
		//关键: 向内嵌套
		parent = parent[parts[i]];
	}
	// 返回最内层模块名
	return parent;
};
```

```javascript
// assign returned value to a local var
var module2 = MYAPP.namespace('MYAPP.modules.module2');
module2 === MYAPP.modules.module2; // true
// skip initial `MYAPP`
MYAPP.namespace('modules.module51');
// long namespace
MYAPP.namespace('once.upon.a.time.there.was.this.long.nested.property');
```

### 沙盒模式

#### 实现沙盒构造函数

-   私有属性绑定至this/prototype
-   特权方法绑定至modules/prototype

```javascript
function Sandbox() {
	// turning arguments into an array
	var args = Array.prototype.slice.call(arguments),
	// the last argument is the callback
		callback = args.pop(),
	// modules can be passed as an array or as individual parameters
		modules = (args[0] && typeof args[0] === "string") ? args : args[0],
		i;

	// make sure the function is called
	// as a constructor
	if (!(this instanceof Sandbox)) {
		return new Sandbox(modules, callback);
	}

	// add properties to `this` as needed:
	this.a = 1;
	this.b = 2;

	// now add modules to the core `this` object
	// no modules or "*" both mean "use all modules"
	if (!modules || modules === '*') {
		modules = [];
	for (i in Sandbox.modules) {
		if (Sandbox.modules.hasOwnProperty(i)) {
			modules.push(i);
		}
	}
}

	// initialize the required modules
	for (i = 0; i < modules.length; i += 1) {
		Sandbox.modules[modules[i]](this);
	}

	// call the callback
	callback(this);
}
```

```javascript
// any prototype properties as needed
Sandbox.prototype = {
	name: "My Application",
	version: "1.0",
	getName: function () {
		return this.name;
	}
};
```

静态属性 - 使用添加的方法/模块

```javascript
Sandbox.modules = {};
Sandbox.modules.dom = function (box) {
	box.getElement = function () {};
	box.getStyle = function () {};
	box.foo = "bar";
};
Sandbox.modules.event = function (box) {
	// access to the Sandbox prototype if needed:
	// box.constructor.prototype.m = "mmm";
	box.attachEvent = function () {};
	box.dettachEvent = function () {};
};
Sandbox.modules.ajax = function (box) {
	box.makeRequest = function () {};
	box.getResponse = function () {};
};
```

#### 沙盒使用方式

```javascript
Sandbox(['ajax', 'event'], function (box) {
	// console.log(box);
});

Sandbox('*', function (box) {
	// console.log(box);
});
Sandbox(function (box) {
	// console.log(box);
});

Sandbox('dom', 'event', function (box) {
	// work with dom and event
	Sandbox('ajax', function (box) {
		// another sandboxed "box" object
		// this "box" is not the same as
		// the "box" outside this function
		//...
		// done with Ajax
	});
	// no trace of Ajax module here
});
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

```js
    node.childNodes
    node.firstChild
    node.lastChild
    node.nextSibling
    node.previousSibling
    node.parentNode
	node.textContent
```

#### Frag

减少DOM操作次数,减少页面渲染次数

```javascript
var p, t, frag;

frag = document.createDocumentFragment();

p = document.createElement('p');
t = document.createTextNode('first paragraph');
p.appendChild(t);
frag.appendChild(p);

p = document.createElement('p');
t = document.createTextNode('second paragraph');
p.appendChild(t);
frag.appendChild(p);

// 只渲染一次HTML页面
document.body.appendChild(frag);
```

```javascript
var oldnode = document.getElementById('result'),
	clone = oldnode.cloneNode(true);
// work with the clone

// when you're done:
oldnode.parentNode.replaceChild(clone, oldnode);
```

### DOM HTML

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

```javascript
document.querySelector("cssSelector");
document.querySelectorAll("cssSelector");
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

### DOM Style

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

### DOM Events

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

#### User-Defined Handler

```javascript
function myHandler(e) {
	var src, parts;

	// get event and source element
	e = e || window.event;
	src = e.target || e.srcElement;

	// 事件授权
	if (src.nodeName.toLowerCase() !== "button") {
		return;
	}

	// actual work: update label
	parts = src.innerHTML.split(": ");
	parts[1] = parseInt(parts[1], 10) + 1;
	src.innerHTML = parts[0] + ": " + parts[1];
	// no bubble
	if (typeof e.stopPropagation === "function") {
		e.stopPropagation();
	}
	if (typeof e.cancelBubble !== "undefined") {
		e.cancelBubble = true;
	}
	// prevent default action
	if (typeof e.preventDefault === "function") {
		e.preventDefault();
	}
	if (typeof e.returnValue !== "undefined") {
		e.returnValue = false;
	}
}
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

### 基本用法

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

### 简单封装

```javascript
ajax({
	url: "./TestXHR.aspx",              //请求地址
	type: "POST",                       //请求方式
	data: { name: "super", age: 20 },   //请求参数
	dataType: "json",
	success: function (response, xml) {
		// 此处放成功后执行的代码
	},
	fail: function (status) {
		// 此处放失败后执行的代码
	}
});

function ajax(options) {

	options = options || {};
	options.type = (options.type || "GET").toUpperCase();
	options.dataType = options.dataType || "json";
	var params = formatParams(options.data);

	//创建 - 非IE6 - 第一步
	if (window.XMLHttpRequest) {
		var xhr = new XMLHttpRequest();
	} else { //IE6及其以下版本浏览器
		var xhr = new ActiveXObject('Microsoft.XMLHTTP');
	}

	//接收 - 第三步
	xhr.onreadystatechange = function () {
		if (xhr.readyState == 4) {
			var status = xhr.status;
			if (status >= 200 && status < 300) {
				options.success && options.success(xhr.responseText, xhr.responseXML);
			} else {
				options.fail && options.fail(status);
			}
		}
	}

	//连接 和 发送 - 第二步
	if (options.type == "GET") {
		xhr.open("GET", options.url + "?" + params, true);
		xhr.send(null);
	} else if (options.type == "POST") {
		xhr.open("POST", options.url, true);
		//设置表单提交时的内容类型
		xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		xhr.send(params);
	}
}
//格式化参数
function formatParams(data) {
	var arr = [];
	for (var name in data) {
		arr.push(encodeURIComponent(name) + "=" + encodeURIComponent(data[name]));
	}
	arr.push(("v=" + Math.random()).replace(".",""));
	return arr.join("&");
}
```

### 跨域请求

```html
<!-- HTML -->
<meta http-equiv="Access-Control-Allow-Origin" content="*">
```

```javascript
Response.Headers.Add("Access-Control-Allow-Origin", "*");
// JSON
{
 ‘Access-Control-Allow-Origin‘: ‘*‘,
}
```

```javascript
$.ajax({
    url:"http://map.oicqzone.com/gpsApi.php?lat=22.502412986242&lng=113.93832783228",
    type:‘GET‘,
    dataType:‘JSONP‘,  // 处理Ajax跨域问题
    success: function(data){
    $(‘body‘).append( "Name: " + data );
    }
});
```

------

## JSON

```javascript
var obj = JSON.parse(json);
var json = JSON.stringify(obj);
```

### jQuery

```javascript
$.getJSON("/json/cats.json", function(json) {
    $(".message").html(JSON.stringify(json));
});
```

------

## 正则表达式

不使用new RegExp(),使用正则表达式字面量

var re = /pattern/gmi;

### Flags

-   g 全局匹配
-   m 多行匹配
-   i 大小写敏感匹配

### 元字符

-   \d : 0~9
-   \s : 空白符(" " \n \r \t \f)
-   \S : 非空白符(alpha number)
-   + : 多个digits
-   ^ : 以xx开头
-   $ : 以xx结尾

### 相关函数

#### test

```javascript
/Reg/Flags.test(str); // 返回值为 Boolean

/[a-z|A-Z|0-9]/gmi.test(str);
```

### 常用正则表达式

#### 中英文

`/^[\u4e00-\u9fa5a-zA-Z]+$/i`

#### 数字

`/^[1-9]*$/i`

#### 空字符与空格字符

`/[(^\s+)(\s+$)]/g`

------

## Effective

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

------

## Code Style

### 命名规范

驼峰命名法

构造函数:首字母大写

_method: 表示私有化方法

### 全局变量

应只有模块名为全局变量;jsmin不会缩减全局变量与全局函数名

### 初始化模式

```javascript
var MYAPP = MYAPP || {};
```

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

### 条件表达式

```javascript
condition ? if-coding : else-coding;
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

## Security

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
