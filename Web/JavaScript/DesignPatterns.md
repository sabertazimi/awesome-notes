<!-- TOC depthFrom:1 depthTo:6 withLinks:1 updateOnSave:1 orderedList:0 -->

- [Design Patterns Notes](#design-patterns-notes)
	- [Singleton](#singleton)
	- [Factory](#factory)
	- [Decorator](#decorator)
		- [实现(关键 - 实现传递方式)](#实现关键-实现传递方式)
			- [return this.uber.function()](#return-thisuberfunction)
			- [Decorators List](#decorators-list)

<!-- /TOC -->

# Design Patterns Notes

## Singleton

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

## Factory

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

## Decorator

关键: 将每次装饰后的结果向后传递,以达到叠加装饰效果

### 实现(关键 - 实现传递方式)

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
