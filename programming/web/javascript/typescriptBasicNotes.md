# TypeScript Basic Notes

<!-- TOC -->

- [TypeScript Basic Notes](#typescript-basic-notes)
  - [Installation](#installation)
    - [Config](#config)
  - [Modules](#modules)
    - [globals.d.ts](#globalsdts)
    - [lib.d.ts](#libdts)
  - [Basic Types](#basic-types)
  - [Enum Types](#enum-types)
    - [Number Enum](#number-enum)
    - [String Enum](#string-enum)
    - [Enum with Functions](#enum-with-functions)
    - [Enum as Flags](#enum-as-flags)
    - [Internal of Enum](#internal-of-enum)
  - [Function](#function)
    - [Weak Overload](#weak-overload)
  - [Class](#class)
    - [Access Modifiers](#access-modifiers)
  - [Alias Types](#alias-types)
  - [Interface](#interface)
    - [Extends Interface](#extends-interface)
    - [Implements Interface](#implements-interface)
  - [Generic Types](#generic-types)
  - [Union Types](#union-types)
  - [Intersection Types](#intersection-types)
  - [Reference](#reference)

<!-- /TOC -->

## Installation

### Config

- [Types Defination](https://github.com/DefinitelyTyped/DefinitelyTyped)

```json
{
  "compilerOptions": {

    /* 基本选项 */
    "target": "es5",       // 'ES3', 'ES5', 'ES2015', 'ES2016', 'ES2017', or 'ESNEXT'
    "module": "commonjs",  // 指定使用模块: 'commonjs', 'amd', 'system', 'umd' or 'es2015'
    "lib": [],             // 指定要包含在编译中的库文件
    "allowJs": true,       // 允许编译 javascript 文件
    "checkJs": true,       // 报告 javascript 文件中的错误
    "jsx": "preserve",     // 'preserve', 'react-native', or 'react'
    "declaration": true,   // 生成相应的 '.d.ts' 文件
    "sourceMap": true,     // 生成相应的 '.map' 文件
    "outFile": "./",       // 将输出文件合并为一个文件
    "outDir": "./",        // 指定输出目录
    "rootDir": "./",       // 用来控制输出目录结构 --outDir.
    "removeComments": true,  // 删除编译后的所有的注释
    "noEmit": true,          // 不生成输出文件
    "importHelpers": true,   // 从 tslib 导入辅助工具函数
    "isolatedModules": true, // 将每个文件做为单独的模块 （与 'ts.transpileModule' 类似）

    /* 严格的类型检查选项 */
    "strict": true,                        // 启用所有严格类型检查选项
    "noImplicitAny": true,                 // 在表达式和声明上有隐含的 any类型时报错
    "strictNullChecks": true,              // 启用严格的 null 检查
    "noImplicitThis": true,                // 当 this 表达式值为 any 类型的时候，生成一个错误
    "alwaysStrict": true,                  // 以严格模式检查每个模块，并在每个文件里加入 'use strict'

    /* 额外的检查 */
    "noUnusedLocals": true,                // 有未使用的变量时，抛出错误
    "noUnusedParameters": true,            // 有未使用的参数时，抛出错误
    "noImplicitReturns": true,             // 并不是所有函数里的代码都有返回值时，抛出错误
    "noFallthroughCasesInSwitch": true,    // 报告 switch 语句的 fallthrough 错误

    /* 模块解析选项 */
    "moduleResolution": "node",  // 选择模块解析策略： 'node' (Node.js) or 'classic'
    "baseUrl": "./",                       // 用于解析非相对模块名称的基目录
    "paths": {},                           // 模块名到基于 baseUrl 的路径映射的列表
    "rootDirs": [],                        // 根文件夹列表，其组合内容表示项目运行时的结构内容
    "typeRoots": [],                       // 包含类型声明的文件列表
    "types": [],                           // 需要包含的类型声明文件名列表
    "allowSyntheticDefaultImports": true,  // 允许从没有设置默认导出的模块中默认导入。

    /* Source Map Options */
    "sourceRoot": "./",      // 指定调试器应该找到 TypeScript 文件而不是源文件的位置
    "mapRoot": "./",         // 指定调试器应该找到映射文件而不是生成文件的位置
    "inlineSourceMap": true, // 生成单个 soucemaps 文件，而不是将 sourcemaps 生成不同的文件
    "inlineSources": true,   // 将代码与 sourcemaps 生成到一个文件中

    /* 其他选项 */
    "experimentalDecorators": true,        // 启用装饰器
    "emitDecoratorMetadata": true          // 为装饰器提供元数据的支持
  }
}
```

## Modules

### globals.d.ts

```js
declare module '*.css';
// import * as foo from './some/file.css';
```

```bash
npm install @types/jquery --save-dev
```

### lib.d.ts

```json
"compilerOptions": {
  "target": "es5",
  "lib": ["es6", "dom"]
}
```

```bash
tsc --target es5 --lib dom,es6
```

## Basic Types

```js
let num: number;
let str: string;
let bool: boolean;
let boolArray: boolean[];
let tuple: [string, number];
let power: any;

// 赋值任意类型
power = '123';
power = 123;

// 它也兼容任何类型
power = num;
num = power;

function log(message: string): void {
  console.log(message);
}
```

## Enum Types

### Number Enum

```js
enum CardSuit {
  Clubs = 1,
  Diamonds, // 2
  Hearts,   // 3
  Spades    // 4
}

// 简单的使用枚举类型
let Card = CardSuit.Clubs;

// 类型安全
Card = 'not a member of card suit'; // Error: string 不能赋值给 `CardSuit` 类型
```

### String Enum

```js
export enum EvidenceTypeEnum {
  UNKNOWN = '',
  PASSPORT_VISA = 'passport_visa',
  PASSPORT = 'passport',
  SIGHTED_STUDENT_CARD = 'sighted_tertiary_edu_id',
  SIGHTED_KEYPASS_CARD = 'sighted_keypass_card',
  SIGHTED_PROOF_OF_AGE_CARD = 'sighted_proof_of_age_card'
}
```

### Enum with Functions

```js
enum Weekday {
  Monday,
  Tuseday,
  Wednesday,
  Thursday,
  Friday,
  Saturday,
  Sunday
}

namespace Weekday {
  export function isBusinessDay(day: Weekday) {
    switch (day) {
      case Weekday.Saturday:
      case Weekday.Sunday:
        return false;
      default:
        return true;
    }
  }
}

const mon = Weekday.Monday;
const sun = Weekday.Sunday;

console.log(Weekday.isBusinessDay(mon)); // true
console.log(Weekday.isBusinessDay(sun));
```

### Enum as Flags

```js
enum AnimalFlags {
  None        = 0,
  HasClaws    = 1 << 0,
  CanFly      = 1 << 1,
  EatsFish    = 1 << 2,
  Endangered  = 1 << 3,
  EndangeredFlyingClawedFishEating = HasClaws | CanFly | EatsFish | Endangered
}

interface Animal {
  flags: AnimalFlags;
  [key: string]: any;
}

function printAnimalAbilities(animal: Animal) {
  var animalFlags = animal.flags;
  if (animalFlags & AnimalFlags.HasClaws) {
    console.log('animal has claws');
  }
  if (animalFlags & AnimalFlags.CanFly) {
    console.log('animal can fly');
  }
  if (animalFlags == AnimalFlags.None) {
    console.log('nothing');
  }
}

const animal = { flags: AnimalFlags.None };
printAnimalAbilities(animal); // nothing
animal.flags |= AnimalFlags.HasClaws;
printAnimalAbilities(animal); // animal has claws
animal.flags &= ~AnimalFlags.HasClaws;
printAnimalAbilities(animal); // nothing
animal.flags |= AnimalFlags.HasClaws | AnimalFlags.CanFly;
printAnimalAbilities(animal); // animal has claws, animal can fly
```

### Internal of Enum

```js
enum Tristate {
  False,
  True,
  Unknown
};

// compiles to
var Tristate;
(function(Tristate) {
  Tristate[(Tristate['False'] = 0)] = 'False';
  Tristate[(Tristate['True'] = 1)] = 'True';
  Tristate[(Tristate['Unknown'] = 2)] = 'Unknown';
})(Tristate || (Tristate = {}));

console.log(Tristate[0]); // 'False'
console.log(Tristate['False']); // 0
console.log(Tristate[Tristate.False]); // 'False' because `Tristate.False == 0`
```

## Function

### Weak Overload

```js
// 重载
function padding(all: number);
function padding(topAndBottom: number, leftAndRight: number);
function padding(top: number, right: number, bottom: number, left: number);
function padding(a: number, b?: number, c?: number, d?: number) {
  if (b === undefined && c === undefined && d === undefined) {
    b = c = d = a;
  } else if (c === undefined && d === undefined) {
    c = a;
    d = b;
  }
  return {
    top: a,
    right: b,
    bottom: c,
    left: d
  };
}

padding(1); // Okay: all
padding(1, 1); // Okay: topAndBottom, leftAndRight
padding(1, 1, 1, 1); // Okay: top, right, bottom, left
padding(1, 1, 1); // Error: Not a part of the available overloads
```

## Class

### Access Modifiers

## Alias Types

```js
type Text = string | { text: string };
type Coordinates = [number, number];
type Callback = (data: string) => void;
```

## Interface

```js
interface Name {
  first: string;
  second: string;
}

let name: Name;
name = {
  first: 'John',
  second: 'Doe'
};

name = {
  // Error: 'Second is missing'
  first: 'John'
};

name = {
  // Error: 'Second is the wrong type'
  first: 'John',
  second: 1337
};
```

### Extends Interface

```js
// Lib a.d.ts
interface Point {
  x: number,
  y: number
}
declare const myPoint: Point

// Lib b.d.ts
interface Point {
  z: number
}

// Your code
let myPoint.z // Allowed!
```

### Implements Interface

```js
interface Crazy {
  new (): {
    hello: number;
  };
}

class CrazyClass implements Crazy {
  constructor() {
    return { hello: 123 };
  }
}

// Because
const crazy = new CrazyClass(); // crazy would be { hello:123 }
```

## Generic Types

```js
function reverse<T>(items: T[]): T[] {
  const toreturn = [];
  for (let i = items.length - 1; i >= 0; i--) {
    toreturn.push(items[i]);
  }
  return toreturn;
}
```

## Union Types

多种类型之一

```js
function formatCommandline(command: string[] | string) {
  let line = '';
  if (typeof command === 'string') {
    line = command.trim();
  } else {
    line = command.join(' ').trim();
  }

  // Do stuff with line: string
}
```

## Intersection Types

extend 是一种非常常见的模式

```js
function extend<T, U>(first: T, second: U): T & U {
  const result = <T & U>{};
  for (let id in first) {
    (<T>result)[id] = first[id];
  }
  for (let id in second) {
    if (!result.hasOwnProperty(id)) {
      (<U>result)[id] = second[id];
    }
  }

  return result;
}

const x = extend({ a: 'hello' }, { b: 42 });

// 现在 x 拥有了 a 属性与 b 属性
const a = x.a;
const b = x.b;
```

## Reference

- [TypeScript Cookbook](https://github.com/jkchao/typescript-book-chinese)
