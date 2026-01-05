---
author: Sabertazimi
authorTitle: Web Developer
authorURL: https://github.com/sabertazimi
authorImageURL: https://github.com/sabertazimi.png
tags: [Web, JavaScript, ECMAScript, Object]
---

# Prototype

## OOP Features

共用方法, 单独属性, 封装细节:

- 原型代理 (享元模式): 利用享元模式共享公有属性与通用方法.
- 实例状态 (原型克隆): 利用原型克隆拥有各自属性值.
- 封装性 (闭包式继承): 利用闭包方法实现属性私有化.

## Prototype Chain

![原型链](./figures/prototype.png '原型链')

- 实例化对象仅有属性`__proto__`, 没有属性`prototype`, 函数才具有属性 `prototype` (指向引擎为其自动创建的原型对象):
  `Instance.__proto__ === Constructor.prototype`.
- 所有引用类型 (包括对象/数组/函数/构造函数) 都有属性`__proto__`(隐式原型).
- 所有函数/构造函数的 `__proto__` 都指向 `Function.prototype`.
- 除`Object.prototype.__proto__`指向 null 外, 其余函数/构造函数的原型对象的`__proto__` 都指向 `Object.prototype`.
- 除`Object.create()`外, 所新建对象的 `__proto__` 指向构造该对象的构造函数的`原型对象(prototype)`.
- 除`typeof Function.prototype` 为 'function' 外, 其余函数/构造函数的原型对象都为 '对象'(`typeof` 为 'object').
- 先有`Object.prototype`(原型链顶端),
  `Function.prototype` 继承`Object.prototype`而产生,
  最后`Object/Function/Array/其它构造函数`继承`Function.prototype`而产生.

```ts
// True because of `Object` is `function Object()` and inherited from `Function.prototype`
// Object has its own `prototype` property refer to `Object.prototype`
const truthy = Object[[proto]] === Function.prototype

// True because of `Array` is `function Array()` and inherited from `Function.prototype`
// Array has its own `prototype` property refer to `Array.prototype`
const truthy = Array[[proto]] === Function.prototype

// True because of Function is `function Function()` and inherited from `Function.prototype`
// Function has its own `prototype` property refer to `Function.prototype`
const truthy = Function[[proto]] === Function.prototype

// True because of Object.prototype is the top of inheritance chains (null is Object.prototype.__proto__)
// all `object/function/array instance`.__proto__......__proto__ refer to Object.prototype
const truthy = Function[[proto]][[proto]] === Object.prototype

// True:
const truthy = Object instanceof Function
const truthy = Function instanceof Object
```

:::tip[Prototype Chain]

- `Object.__proto__` -> `Function.prototype`.
- `Function.prototype.__proto__` -> `Object.prototype`.
- `Object.prototype.__proto__` -> `null`.

:::

`__proto__`:

- `[[proto]]` getter is `Object.getPrototypeOf(object)`.
- `[[proto]]` setter is `Object.setPrototypeOf(object, prototype)`.

```ts
function Foo(value) {
  this.val = value
}

// Auto create FooPrototype
// Foo.prototype -> FooPrototype
// FooPrototype.constructor -> [function Foo]
// foo.__proto__ -> FooPrototype
const foo = new Foo(2)
```

```ts
function Person() {}
const person1 = new Person()
const person2 = new Person()

console.log(person1 !== Person) // true
console.log(person1 !== Person.prototype) // true
console.log(Person.prototype !== Person) // true

console.log(person1.__proto__ === Person.prototype) // true
console.log(person1.__proto__.constructor === Person) // true
console.log(person1.__proto__ === person2.__proto__) // true

console.log(Person.prototype.isPrototypeOf(person1)) // true
console.log(Person.prototype.isPrototypeOf(person2)) // true
console.log(Object.getPrototypeOf(person1) === Person.prototype) // true

console.log(person1 instanceof Person) // true
console.log(person1 instanceof Object) // true
console.log(Person.prototype instanceof Object) // true
```

下面五种操作 (方法/属性/运算符) 可以触发 JS 引擎读取一个对象的原型,
可以触发 `getPrototypeOf()` 代理方法的运行:

```ts
const obj = {}
const p = new Proxy(obj, {
  getPrototypeOf(target) {
    return Array.prototype
  },
})

console.log(
  Object.getPrototypeOf(p) === Array.prototype, // true
  Reflect.getPrototypeOf(p) === Array.prototype, // true
  Array.prototype.isPrototypeOf(p), // true
  p.__proto__ === Array.prototype, // true
  p instanceof Array // true
)
```

Set the inherited property will **create own property**
(**overrides** value of inherited property):

```ts
const proto = {
  protoProp: 'a',
}

const obj = {
  __proto__: proto,
  objProp: 'b',
}

// In the beginning, obj has one own property:
assert.deepEqual(Object.keys(obj), ['objProp'])

obj.protoProp = 'x'

// Created a new own property:
assert.deepEqual(Object.keys(obj), ['objProp', 'protoProp'])

// The inherited property itself is unchanged:
assert.equal(proto.protoProp, 'a')

// The own property overrides the inherited property:
assert.equal(obj.protoProp, 'x')
```

## Object Conversion

对象转换为布尔值:

- 直接转换为 true (包装类型也一样), 不调用 valueOf 和 toString.

对象转换为数字:

- 如果对象具有 valueOf 方法 (返回原始值),
  则将该原始值转换为数字 (转换失败会返回 NaN), 并返回这个数字.
- 如果对象具有 toString 方法 (返回原始值),
  则将该原始值转换为数字 (转换失败会返回 NaN), 并返回这个数字.
- 转换失败, 抛出 `TypeError`.

对象转换为字符串:

- 如果对象具有 toString 方法 (返回原始值),
  则将该原始值转换为字符串, 并返回该字符串.
- 如果对象具有 valueOf 方法 (返回原始值),
  则将该原始值转换为字符串, 并返回该字符串.
- 转换失败, 抛出 `TypeError`.

| `x`         | `Object(x)`                                      |
| ----------- | ------------------------------------------------ |
| `undefined` | `{}`                                             |
| `null`      | `{}`                                             |
| `boolean`   | `new Boolean(x)`                                 |
| `number`    | `new Number(x)`                                  |
| `bigint`    | An instance of BigInt (`new` throws `TypeError`) |
| `string`    | `new String(x)`                                  |
| `symbol`    | An instance of Symbol (`new` throws `TypeError`) |
| `object`    | `x`                                              |

```ts
// 保存原始的valueOf
const valueOf = Object.prototype.valueOf
const toString = Object.prototype.toString

// 添加valueOf日志
Object.prototype.valueOf = function () {
  console.log('valueOf')
  return valueOf.call(this)
}

// 添加toString日志
Object.prototype.toString = function () {
  console.log('toString')
  return toString.call(this)
}

const a = {}
const b = new Boolean(false)

if (a) {
  console.log(1)
}

if (b) {
  console.log(2)
}

// output:
// 1
// 2
// 未调用valueOf和toString, 符合 [对象到布尔值] 的转换规则
```

```ts
// 保存原始的valueOf
const valueOf = Object.prototype.valueOf
const toString = Object.prototype.toString

// 添加valueOf日志
Object.prototype.valueOf = function () {
  console.log('valueOf')
  return valueOf.call(this)
}

// 添加toString日志
Object.prototype.toString = function () {
  console.log('toString')
  return toString.call(this)
}

let a = {}
console.log(++a)

// output:
// valueOf
// toString
// NaN
// 1. valueOf方法返回的是对象本身, 不是原始值, 继续执行
// 2. toString方法返回的是”[object Object]”, 是原始值(字符串), 将字符串转换为数字NaN
```

```ts
// 保存原始的valueOf
const valueOf = Object.prototype.valueOf
const toString = Object.prototype.toString

// 添加valueOf日志
Object.prototype.valueOf = function () {
  console.log('valueOf')
  return '1' // 强制返回原始值
}

// 添加toString日志
Object.prototype.toString = function () {
  console.log('toString')
  return toString.call(this)
}

let a = {}
console.log(++a)

// output:
// valueOf
// 2
// valueOf 返回原始值(字符串), 直接将该字符串转换为数字, 得到 1
```

```ts
// 保存原始的valueOf
const valueOf = Object.prototype.valueOf
const toString = Object.prototype.toString

// 添加valueOf日志
Object.prototype.valueOf = function () {
  console.log('valueOf')
  return valueOf.call(this)
}

// 添加toString日志
Object.prototype.toString = function () {
  console.log('toString')
  return toString.call(this)
}

const a = {}
alert(a)

// output:
// toString
// 弹出 "[object Object]"
// 调用toString方法, 返回了字符串”[object Object]”, 对象最终转换为该字符串
```

```ts
// 保存原始的valueOf
const valueOf = Object.prototype.valueOf
const toString = Object.prototype.toString

// 添加valueOf日志
Object.prototype.valueOf = function () {
  console.log('valueOf')
  return valueOf.call(this)
}

// 添加toString日志
Object.prototype.toString = function () {
  console.log('toString')
  return this
}

const a = {}
alert(a)

// output:
// toString
// valueOf
// Uncaught TypeError: Cannot convert object to primitive value
// 调用toString方法, 返回的不是 primitive value, 继续执行
// 调用valueOf方法, 返回的不是 primitive value, 继续执行
// 抛出 TypeError
```
