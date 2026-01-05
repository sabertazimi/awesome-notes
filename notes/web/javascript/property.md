---
author: Sabertazimi
authorTitle: Web Developer
authorURL: https://github.com/sabertazimi
authorImageURL: https://github.com/sabertazimi.png
tags: [Web, JavaScript, ECMAScript, Object]
---

# Property

## Object Constructor

- 首字母大写.
- 所有函数 (包括构造函数) 有 `prototype` 属性.

### Object Literal Creation

对象字面量由 `Object` 构造函数隐式构造;

```ts
const obj = {
  name: 'sabertazimi',
}

console.log(obj[[proto]] === Object.prototype) // true
```

### Object New Constructor

`new` 构造函数作用原理如下:

- 形成原型链: 隐式原型指向构造函数的原型对象 `obj.__proto__ = constructor.prototype`
- 构造函数对象 (Constructor) 与原型对象 (Prototype) 之间形成闭环:
  - `Constructor.prototype = Prototype`.
  - `Prototype.constructor = Constructor`.

```ts
function newInstance(constructor, ...args) {
  // var this = Object.create(Person.prototype);
  // this.__proto__ = F.prototype
  // F.prototype = Person.prototype
  // 即 this.__proto__ = Person.prototype;
  const obj = {}
  obj[[proto]] = constructor.prototype
  constructor.apply(obj, args)
  return obj
}

// =>
const instance = new Constructor(arguments)
```

```ts
function Employee(name) {
  this.name = name
  this.getName = function () {
    return this.name
  }
}

const employee = newInstance(Employee, 'Jack')
// =>
const employee = new Employee('Jack')
```

`new.target`:

```ts
function Foo() {
  if (!new.target)
    throw new Error('Foo() must be called with new')
}
```

```ts
function Waffle() {
  // 当未使用 `new` 关键字时, `this` 指向全局对象
  if (!(this instanceof Waffle))
    return new Waffle()

  // 正常构造函数
  this.tastes = 'yummy'
}
```

### Object Create Constructor

- 原型式继承非常适合不需要单独创建构造函数, 但仍然需要在对象间共享信息的场合.
- 属性中包含的引用值始终会在相关对象间共享.

```ts
Object.create = function (o) {
  if (arguments.length > 1) {
    throw new Error(
      'Object.create implementation only accepts the first parameter.'
    )
  }

  function F() {}
  F.prototype = o
  return new F()
}
// 1. `F.prototype === o`.
// 2. `new F()` lead to `f.__proto__ === F.prototype`.
// Finally: `f.__proto__ === o`.
```

### Constructor Return Value

- 返回 `this` 或 user-defined literal object.
- 当返回值为**基本类型**时, 仍然可得到 `this` 指针指向的原有对象.

```ts
function ObjectMaker() {
  this.name = 'This is it'
  // user-defined literal object
  // 直接忽略 this.name.
  const that = {}
  that.name = 'And that\'s that'
  return that
}
```

```ts
function MyClass() {
  this.name = 'sven'
  return 'anne' // 返回 string.
}
const obj = new MyClass()
console.log(obj.name) // 输出: sven .
```

### Constructor Instance Detection

若在实例对象的原型链 (`__proto__`) 中能找到构造函数的 `prototype` 属性 (Prototype 对象),
则返回`true`, 否则返回`false`:

```ts
// true only if
// 1. Foo.__proto__ === Bar.prototype
// 2. Foo.__proto__......__proto__ === Bar.prototype
console.log(Foo instanceof Bar)
```

## Object Property Descriptor

### Property Descriptor Definition

对象的属性描述符:

- `Object.defineProperty(O, Prop, descriptor)`.
- `Object.defineProperties(O, descriptors)`.

数据描述符:

- `value`: 属性值, 默认 `undefined`.
- `writable`: 是否是只读 property, 默认 `false`.
- `enumerable`: 是否可以被枚举 (`for in`), 默认 `false`.
- `configurable`: 是否可以被删除与修改 descriptor, 默认 `false`.

存取描述符:

- `get`: 返回 property 值的方法, 默认 `undefined`.
- `set`: 为 property 设置值的方法, 默认 `undefined`.
- `enumerable`: 是否可以被枚举 (`for in`), 默认 `false`.
- `configurable`: 是否可以被删除与修改 descriptor, 默认 `false`.

```ts
interface DataPropertyDescriptor {
  value?: any
  writable?: boolean
  enumerable?: boolean
  configurable?: boolean
}

interface AccessorPropertyDescriptor {
  get?: (this: any) => any
  set?: (this: any, v: any) => void
  enumerable?: boolean
  configurable?: boolean
}

type PropertyDescriptor = DataPropertyDescriptor | AccessorPropertyDescriptor
```

```ts
Object.defineProperty(o, 'age', {
  value: 24,
  writable: true,
  enumerable: true,
  configurable: true,
})

Object.defineProperty(o, 'sex', {
  value: 'male',
  writable: false, //  不可赋值
  enumerable: false, //  不可遍历/枚举
  configurable: false,
})

Object.defineProperties(o, {
  age: {
    value: 24,
    writable: true,
    enumerable: true,
    configurable: true,
  },
  sex: {
    value: 'male',
    writable: false,
    enumerable: false,
    configurable: false,
  },
})

Object.defineProperties(o, {
  kind: {
    value: 'Plate 1x3',
    writable: true,
    enumerable: true,
    configurable: true,
  },
  color: {
    value: 'yellow',
    writable: true,
    enumerable: true,
    configurable: true,
  },
  description: {
    get() {
      return `${this.kind} (${this.color})`
    },
    enumerable: true,
    configurable: true,
  },
})
```

Object keys (excluding Symbols) are strings under the hood,
object keys are automatically converted into strings:

```ts
const obj = { 1: 'a', 2: 'b', 3: 'c' }
const set = new Set([1, 2, 3, 4, 5])
Object.hasOwn(obj, '1') // true
Object.hasOwn(obj, 1) // true
set.has('1') // false
set.has(1) // true

const a = {}
const b = { key: 'b' }
const c = { key: 'c' }
a[b] = 123
a[c] = 456
console.log(a[b]) // a["[object Object]"] = 456
```

Object keys 遍历顺序:

- 首先遍历所有数值键, 按照数值升序排列.
- 其次遍历所有字符串键, 按照加入时间升序排列.
- 最后遍历所有 `Symbol` 键, 按照加入时间升序排列.

### Property Descriptor Functions

- `Object.create(prototype[, descriptors])`.

```ts
const o = Object.create({
  say() {
    alert(this.name)
  },
  name: 'Byron',
})

const obj = Object.create(Object.prototype, {
  kind: {
    value: 'Plate 1x3',
    writable: true,
    enumerable: true,
    configurable: true,
  },
  color: {
    value: 'yellow',
    writable: true,
    enumerable: true,
    configurable: true,
  },
  description: {
    get() {
      return `${this.kind} (${this.color})`
    },
    enumerable: true,
    configurable: true,
  },
})
```

- `Object.getOwnPropertyDescriptor(object, property)`.
- `Object.getOwnPropertyDescriptors(object)`.

```ts
Object.defineProperties(target, Object.getOwnPropertyDescriptors(source))

const clone = Object.create(
  Object.getPrototypeOf(obj),
  Object.getOwnPropertyDescriptors(obj)
)
```

- `Object.hasOwn(object, property)`: Boolean.
- `in` operator: 检测实例及其原型链上所有属性名.

```ts
// Arrays
const trees = ['redwood', 'bay', 'cedar', 'oak', 'maple']
const truthy = 0 in trees
const truthy = 3 in trees
const falsy = 6 in trees
const falsy = 'bay' in trees
const truthy = 'length' in trees
const truthy = Symbol.iterator in trees

// Predefined objects
const truthy = 'PI' in Math

// Custom objects
const car = { make: 'Honda', model: 'Accord', year: 1998 }
const truthy = 'make' in car
const truthy = 'model' in car
```

- `for...in`: 获取实例及其原型链上所有可枚举属性名.
- `Object.getOwnPropertySymbols(object)`: 获取实例上 Symbol 属性名.
- `Object.getOwnPropertyNames(object)`: 获取实例上非 Symbol 属性名 (包括不可枚举属性名).
- `Object.keys(object)`: 获取实例上可枚举属性名.

```ts
const k1 = Symbol('k1')
const k2 = Symbol('k2')
const o = {
  1: 1,
  first: 'first',
  [k1]: 'sym2',
  second: 'second',
  0: 0,
}
o[k2] = 'sym2'
o[3] = 3
o.third = 'third'
o[2] = 2

console.log(Object.getOwnPropertyNames(o))
// ['0', '1', '2', '3', 'first', 'second', 'third']
console.log(Object.getOwnPropertySymbols(o))
// [Symbol(k1), Symbol(k2)]
```

```ts
function Person() {}
Person.prototype.name = 'Nicholas'
Person.prototype.age = 29
Person.prototype.job = 'Software Engineer'
Person.prototype.sayName = function () {
  console.log(this.name)
}

const keys = Object.keys(Person.prototype)
console.log(keys) // 'name, age, job, sayName'

const p1 = new Person()
p1.name = 'Rob'
p1.age = 31
const p1keys = Object.keys(p1)
console.log(p1keys) // '[name, age]'
```

- `Object.values(O)`:
  object own enumerable property values.
- `Object.entries(O)`:
  object own enumerable **string-keyed** property `[key, value]` pairs.
- `Object.fromEntries()`.

```ts
const score = {
  saber: 42,
  todd: 19,
  ken: 4,
  gan: 41,
}

Object.keys(score).map(k => score[k])
// => [ 42, 19, 4, 41 ]

Object.values(score)
// => [ 42, 19, 4, 41 ]

Object.entries(score)
/**
 * =>
 * [
 * [ 'saber', 42 ],
 * [ 'todd', 19 ],
 * [ 'ken', 4 ],
 * [ 'gan', 41 ],
 * ]
 */

function findKey(object, callback, thisValue) {
  for (const [key, value] of Object.entries(object)) {
    if (callback.call(thisValue, value, key, object))
      return key
  }

  return undefined
}
```

```ts
const object = { x: 42, y: 50, abc: 9001 }
const result = Object.fromEntries(
  Object.entries(object)
    .filter(([key, value]) => key.length === 1)
    .map(([key, value]) => [key, value * 2])
)

const map = new Map(Object.entries(object))
const objectCopy = Object.fromEntries(map)

function pick(object, ...keys) {
  const filteredEntries = Object.entries(object).filter(([key, _value]) =>
    keys.includes(key)
  )

  return Object.fromEntries(filteredEntries)
}

function invert(object) {
  const mappedEntries = Object.entries(object).map(([key, value]) => [
    value,
    key,
  ])

  return Object.fromEntries(mappedEntries)
}

function mapObject(object, callback, thisValue) {
  const mappedEntries = Object.entries(object).map(([key, value]) => {
    const mappedValue = callback.call(thisValue, value, key, object)
    return [key, mappedValue]
  })

  return Object.fromEntries(mappedEntries)
}
```

| Operation (**Only Enumerable**) | String Key | Symbol Key | Inherited |
| ------------------------------- | ---------- | ---------- | --------- |
| `Object.keys()`                 | ✔          | ✘          | ✘         |
| `Object.values()`               | ✔          | ✘          | ✘         |
| `Object.entries()`              | ✔          | ✘          | ✘         |
| `Object.assign()`               | ✔          | ✔          | ✘         |
| Spreading `{...x}`              | ✔          | ✔          | ✘         |
| `JSON.stringify()`              | ✔          | ✘          | ✘         |
| `for...in`                      | ✔          | ✘          | ✔         |

| Operation (**Include Non-enumerable**) | String Key | Symbol Key | Inherited |
| -------------------------------------- | ---------- | ---------- | --------- |
| `Object.getOwnPropertyNames()`         | ✔          | ✘          | ✘         |
| `Object.getOwnPropertySymbols()`       | ✘          | ✔          | ✘         |
| `Object.getOwnPropertyDescriptors()`   | ✔          | ✔          | ✘         |
| `Reflect.ownKeys()`                    | ✔          | ✔          | ✘         |

- `Object.preventExtensions(O)`/`Object.isExtensible(O)`:
  不可新增属性, 可删除/修改属性.
- `Object.seal(O)`/`Object.isSealed(O)`:
  设置 `configurable` 为 false (不可删除, 不可修改 descriptor), 可修改属性.
- `Object.freeze(O)`/`Object.isFrozen(O)`:
  不可新增/删除/修改属性 (Shallow).

```ts
const obj = Object.freeze({ foo: {} })

obj.bar = 123
// TypeError: Can't add property bar, object is not extensible

obj.foo = {}
// TypeError: Cannot assign to read only property 'foo' of #<Object>

obj.foo.qux = 'abc'
console.log(obj.foo.qux)
// 'abc'
```

## Private Property and Method

### Private Property

实现方式: 闭包

```ts
function Gadget() {
  // private member
  const name = 'iPod'
  // public function
  this.getName = function () {
    return name
  }
}
```

### Private Method

getter: 返回基本类型值/**引用**类型**深拷贝**(POLA 最低授权原则).

```ts
function Gadget() {
  // private member
  const pref = {}
  // public function
  this.getPref = function () {
    return pref.clone()
  }
}
```

**即使函数模式 + 揭示模式**:

- 实现私有属性与私有方法.
- 提供私有方法的公共(读/执行 not 写)接口,公共接口发生意外,私有方法仍安全.

```ts
// 匿名即时函数模式.
const obj = (function () {
  // private member
  const name = 'tazimi'
  // private method
  const getName = function getName() {
    return name
  }
  // 闭包
  return {
    // 公共接口 - 私有方法
    getName,
  }
})()
```

## Static Property and Method

### Static Property

实现方式: 闭包/原型代理

### Static Method

直接向构造函数添加方法

```ts
Object.isArray = function () {}
```

## Object Property and Method

### Object Property

编写函数时,一般用[]访问对象属性

### Object Method

为 prototype 添加方法,可以通过实现语法糖 method()简化代码(链模式)

```ts
if (typeof Function.prototype.method !== 'function') {
  Function.prototype.method = function (name, implementation) {
    this.prototype[name] = implementation
    return this
  }
}
```

```ts
const Person = function (name) {
  this.name = name
}
  .method('getName', function () {
    return this.name
  })
  .method('setName', function (name) {
    this.name = name
    return this
  })
```
