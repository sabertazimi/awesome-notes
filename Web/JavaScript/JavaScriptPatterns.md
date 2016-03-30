<!-- TOC depthFrom:1 depthTo:6 withLinks:1 updateOnSave:1 orderedList:0 -->

- [Design Patterns Notes](#design-patterns-notes)
	- [Common Design Patterns](#common-design-patterns)
		- [Classification](#classification)
			- [创建者模式](#创建者模式)
			- [结构设计模式](#结构设计模式)
			- [行为设计模式](#行为设计模式)
		- [Singleton](#singleton)
		- [Factory](#factory)
		- [Decorator](#decorator)
			- [实现(关键 - 实现传递方式)](#实现关键-实现传递方式)
			- [return this.uber.function()](#return-thisuberfunction)
			- [Decorators List](#decorators-list)

<!-- /TOC -->

# Design Patterns Notes

## Modular Patterns

### Object Literal

通过对象字面量创建命名空间

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
	// 返回最内层模块
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

## Common Design Patterns

### Classification

|Creational|Class|
|:---------------:|:-------------------------------------------------------------:|
|Factory Method(工厂方法)|通过将数据和事件接口化来构建若干个子类。|
|Abstract Factory(抽象工厂)|建立若干族类的一个实例，这个实例不需要具体类的细节信息。（抽象类）|
|Builder (建造者)|将对象的构建方法和其表现形式分离开来，总是构建相同类型的对象。|
|Prototype(原型)|一个完全初始化的实例，用于拷贝或者克隆。|
|Singleton(单例)|一个类只有唯一的一个实例，这个实例在整个程序中有一个全局的访问点。|


|Structural|Class|
|:---------------:|:-----------------------------------------------------:|
|Adapter(适配器)|将不同类的接口进行匹配，调整，这样尽管内部接口不兼容但是不同的类还是可以协同工作的。|
|Bridge(桥接模式)|将对象的接口从其实现中分离出来，这样对象的实现和接口可以独立的变化。|
|Composite(组合模式)|通过将简单可组合的对象组合起来，构成一个完整的对象，这个对象的能力将会超过这些组成部分的能力的总和，即会有新的能力产生。|
|Decorator(装饰器)|动态给对象增加一些可替换的处理流程。|
|Facada(外观模式)|一个类隐藏了内部子系统的复杂度，只暴露出一些简单的接口。|
|Flyweight(享元模式)|一个细粒度对象，用于将包含在其它地方的信息 在不同对象之间高效地共享。|
|Proxy(代理模式)|一个充当占位符的对象用来代表一个真实的对象。|

|Behavioral|Class|
|:---------------:|:-----------------------------------------------------:|
|Interpreter(解释器)|将语言元素包含在一个应用中的一种方式，用于匹配目标语言的语法。|
|Template Method(模板方法)|在一个方法中为某个算法建立一层外壳，将算法的具体步骤交付给子类去做。|
|Chain of Responsibility(响应链)|一种将请求在一串对象中传递的方式，寻找可以处理这个请求的对象。|
|Command(命令)|封装命令请求为一个对象，从而使记录日志，队列缓存请求，未处理请求进行错误处理 这些功能称为可能。|
|Iterator(迭代器)|在不需要直到集合内部工作原理的情况下，顺序访问一个集合里面的元素。|
|Mediator(中介者模式)|在类之间定义简化的通信方式，用于避免类之间显式的持有彼此的引用。|
|Observer(观察者模式)|用于将变化通知给多个类的方式，可以保证类之间的一致性。|
|State(状态)|当对象状态改变时，改变对象的行为。|
|Strategy(策略)|将算法封装到类中，将选择和实现分离开来。|
|Visitor(访问者)|为类增加新的操作而不改变类本身。|

#### 创建者模式

-   构造器模式(Constructor)
-   工厂模式(Factory)
-   抽象工厂模式(Abstract)
-   原型模式(Prototype)
-   单例模式(Singleton)
-   建造者模式(Builder)

#### 结构设计模式

-   装饰模式
-   外观模式
-   享元模式
-   适配器模式
-   代理模式

#### 行为设计模式

-   迭代模式
-   中介者模式
-   观察者模式
-   访问者模式

### Singleton

原型与构造函数指针运作正常

```javascript
function Universe() {
	// 缓存实例
	var instance;

	// anti-Self-Defined Function Pattern
	// 反-自定义函数模式: 先重写,再初始化
	Universe = function Universe() {
		return instance;
	};

	// 保存原型,使其一直保持于同一位置
	// (this指针指向不重要)
	Universe.prototype = this;

	instance = new Universe();
	// 重定向constructor指针
	instance.constructor = Universe;
	// 功能代码
	instance.start_time = 0;
	instance.bang = "Big";

	return instance;
}
```

### Factory

```javascript
// 父构造函数
function CarMaker() {}

// 父类方法: 将被具体子类继承
CarMaker.prototype.drive = function () {
	return "Vroom, I have " + this.doors + " doors";
};

// 静态工厂方法
CarMaker.factory = function (type) {
	var constr = type,
		newcar;
	// defined check
	if (typeof CarMaker[constr] !== "function") {
		throw {
			name: "Error",
			message: constr + " doesn't exist"
		};
	}
	// 继承父类(只运行一次,增强代码健壮性)
	if (typeof CarMaker[constr].prototype.drive !== "function") {
		CarMaker[constr].prototype = new CarMaker();
	}
	// 创建新实例
	newcar = new CarMaker[constr]();
	// coding for 公有属性/方法

	// return
	return newcar;
};

// 定义特定工厂方法
CarMaker.Compact = function () {
	this.doors = 4;
};
CarMaker.Convertible = function () {
	this.doors = 2;
};
CarMaker.SUV = function () {
	this.doors = 24;
};
```

### Decorator

关键: 将每次装饰后的结果向后传递,以达到叠加装饰效果

#### 实现(关键 - 实现传递方式)

两种方式:

-   uber属性获得每次装饰后结果
-   循环叠加每次装饰后结果

#### return this.uber.function()

```javascript
// 构造函数
function Sale(price) {
	this.price = price || 100;
}
Sale.prototype.getPrice = function () {
	return this.price;
};

// 定义具体装饰器
// 通过uber属性获得上一次装饰后的结果
Sale.decorators = {};
Sale.decorators.fedtax = {
	getPrice: function () {
		var price = this.uber.getPrice();
		price += price * 5 / 100;
		return price;
	}
};
Sale.decorators.quebec = {
	getPrice: function () {
		var price = this.uber.getPrice();
		price += price * 7.5 / 100;
		return price;
	}
};
Sale.decorators.money = {
	getPrice: function () {
		return "$" + this.uber.getPrice().toFixed(2);
	}
};
Sale.decorators.cdn = {
	getPrice: function () {
		return "CDN$ " + this.uber.getPrice().toFixed(2);
	}
};

Sale.prototype.decorate = function (decorator) {
	var F = function () {},
		overrides = this.constructor.decorators[decorator],
		i,
		newobj;

	// 临时代理构造函数
	F.prototype = this;
	newobj = new F();
	// 传递实现的关键
	// 通过uber属性获得上一次装饰后的结果
	newobj.uber = F.prototype;

	for (i in overrides) {
		if (overrides.hasOwnProperty(i)) {
			newobj[i] = overrides[i];
		}
	}

	return newobj;
};
```

#### Decorators List

```javascript
// 构造函数
function Sale(price) {
	this.price = (price > 0) || 100;
	this.decorators_list = [];
}
Sale.prototype.getPrice = function () {
	return this.price;
};

// 定义具体装饰器
Sale.decorators = {};
Sale.decorators.fedtax = {
	getPrice: function (price) {
		return price + price * 5 / 100;
	}
};
Sale.decorators.quebec = {
	getPrice: function (price) {
		return price + price * 7.5 / 100;
	}
};
Sale.decorators.money = {
	getPrice: function (price) {
		return "$" + price.toFixed(2);
	}
};


Sale.prototype.decorate = function (decorator) {
	this.decorators_list.push(decorator);
};
Sale.prototype.getPrice = function () {
	var price = this.price,
		i,
		max = this.decorators_list.length,
		name;

	for (i = 0; i < max; i += 1) {
		name = this.decorators_list[i];
		// 传递实现的关键
		// 通过循环叠加上一次装饰后的结果
		price = Sale.decorators[name].getPrice(price);
	}

	return price;
};
```
