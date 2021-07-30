# TypeScript Basic Notes

[TOC]

## TypeScript Configuration

### TypeScript Installation

```bash
npm i -D typescript
npm i -D react react-dom @types/node @types/react @types/react-dom
```

### TypeScript Config File

```bash
npm i -D @tsconfig/create-react-app
npx tsc --init
```

Basic [tsconfig](https://www.typescriptlang.org/tsconfig):

- [extends](https://github.com/tsconfig/bases):
  - `@tsconfig/recommended/tsconfig.json`
  - `@tsconfig/create-react-app/tsconfig.json`
  - `@tsconfig/node16/tsconfig.json`
  - `@tsconfig/deno/tsconfig.json`
- include
- exclude
- buildOptions
- compilerOptions
- watchOptions
- tsNode

```json
{
  "include": ["./src/**/*"],
  "exclude": ["node_modules", "build", "dist", "coverage"],
  "compilerOptions": {
    /* 基本选项 */
    "target": "es5", // 'ES3', 'ES5', 'ES2015', 'ES2016', 'ES2017', or 'ESNEXT'
    "module": "es2015", // 指定使用模块: 'commonjs', 'amd', 'system', 'umd' or 'es2015'
    "lib": ["es6", "dom"], // 指定要包含在编译中的库文件
    "allowJs": true, // 允许编译 javascript 文件
    "checkJs": true, // 报告 javascript 文件中的错误
    "jsx": "react", // 'preserve', 'react-native', or 'react'
    "declaration": true, // 生成相应的 '.d.ts' 文件
    "sourceMap": true, // 生成相应的 '.map' 文件
    "outFile": "./", // 将输出文件合并为一个文件
    "outDir": "./build/", // 指定输出目录
    "rootDir": "./", // 用来控制输出目录结构 --outDir.
    "removeComments": true, // 删除编译后的所有的注释
    "noEmit": true, // 不生成输出文件
    "importHelpers": true, // 从 tslib 导入辅助工具函数
    "isolatedModules": true, // 将每个文件做为单独的模块 （与 'ts.transpileModule' 类似）

    /* 严格的类型检查选项 */
    "strict": true, // 启用所有严格类型检查选项
    "noImplicitAny": true, // 在表达式和声明上有隐含的 any类型时报错
    "strictNullChecks": true, // 启用严格的 null 检查
    "noImplicitThis": true, // 当 this 表达式值为 any 类型的时候，生成一个错误
    "alwaysStrict": true, // 以严格模式检查每个模块，并在每个文件里加入 'use strict'

    /* 额外的检查 */
    "noUnusedLocals": true, // 有未使用的变量时，抛出错误
    "noUnusedParameters": true, // 有未使用的参数时，抛出错误
    "noImplicitReturns": true, // 并不是所有函数里的代码都有返回值时，抛出错误
    "noFallthroughCasesInSwitch": true, // 报告 switch 语句的 fallthrough 错误

    /* 模块解析选项 */
    "moduleResolution": "node", // 选择模块解析策略： 'node' (Node.js) or 'classic'
    "baseUrl": "./", // 用于解析非相对模块名称的基目录
    "paths": {}, // 模块名到基于 baseUrl 的路径映射的列表
    "rootDirs": [], // 根文件夹列表，其组合内容表示项目运行时的结构内容
    "typeRoots": [], // 包含类型声明的文件列表
    "types": [], // 需要包含的类型声明文件名列表
    "allowSyntheticDefaultImports": true, // 允许从没有设置默认导出的模块中默认导入。

    /* Source Map Options */
    "sourceRoot": "./", // 指定调试器应该找到 TypeScript 文件而不是源文件的位置
    "mapRoot": "./", // 指定调试器应该找到映射文件而不是生成文件的位置
    "inlineSourceMap": true, // 生成单个 sourcemap 文件，而不是将 sourcemaps 生成不同的文件
    "inlineSources": true, // 将代码与 sourcemap 生成到一个文件中

    /* 其他选项 */
    "experimentalDecorators": true, // 启用装饰器
    "emitDecoratorMetadata": true // 为装饰器提供元数据的支持
  }
}
```

### Webpack for TypeScript

```bash
npm i -D typescript ts-loader source-map-loader
```

```ts
const path = require('path');

module.exports = {
  entry: './src/index.tsx',
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.js', '.json', '.ts', '.tsx'],
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        loader: 'ts-loader',
      },
      { enforce: 'pre', test: /\.js$/, loader: 'source-map-loader' },
    ],
  },
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
  },
};
```

### Lint Tools

#### ESLint

- [ESLint for TypeScript](https://github.com/typescript-eslint/typescript-eslint)

```bash
npx eslint --init
```

#### TSLint

- [TSLint Config Airbnb](https://github.com/progre/tslint-config-airbnb)

### Defined Types Tools

- [Types Definition](https://github.com/DefinitelyTyped/DefinitelyTyped)
- [DTSGen: Creates starter TypeScript definition files for any module or library](https://github.com/Microsoft/dts-gen)
- [DTSLint: A utility built on TSLint for linting TypeScript declaration files](https://github.com/microsoft/dtslint)

## Modules

- [Types Search](https://microsoft.github.io/TypeSearch)

### Globals Definition

globals.d.ts:

```ts
declare module '*.css';
// import * as foo from './some/file.css';
```

```ts
declare global {
  namespace JSX {
    interface Element extends React.ReactElement<any, any> {}
    interface ElementClass extends React.Component<any> {
      render(): React.ReactNode;
    }
  }
}
```

```bash
npm i -D @types/react @types/react-dom
```

### Library Definition

lib.d.ts:

```json
"compilerOptions": {
  "target": "es5",
  "lib": ["es6", "dom"]
}
```

```bash
tsc --target es5 --lib dom,es6
```

### Namespace

Namespace aliases:

```ts
namespace Shapes {
  export namespace Polygons {
    export class Triangle {}
    export class Square {}
  }
}

import polygons = Shapes.Polygons;
let sq = new polygons.Square(); // Same as 'new Shapes.Polygons.Square()'
```

Library namespace declaration:

```ts
export = React;
export as namespace React;

declare namespace React {
  type ElementType<P = any> =
    | {
        [K in keyof JSX.IntrinsicElements]: P extends JSX.IntrinsicElements[K]
          ? K
          : never;
      }[keyof JSX.IntrinsicElements]
    | ComponentType<P>;
}
```

## Basic Types

```ts
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

```ts
enum CardSuit {
  Clubs = 1,
  Diamonds, // 2
  Hearts, // 3
  Spades, // 4
}

// 简单的使用枚举类型
let Card = CardSuit.Clubs;

// 类型安全
Card = 'not a member of card suit'; // Error: string 不能赋值给 `CardSuit` 类型
```

### String Enum

```ts
enum EvidenceTypeEnum {
  UNKNOWN = '',
  PASSPORT_VISA = 'passport_visa',
  PASSPORT = 'passport',
  SIGHTED_STUDENT_CARD = 'sighted_tertiary_edu_id',
  SIGHTED_KEYPASS_CARD = 'sighted_keypass_card',
  SIGHTED_PROOF_OF_AGE_CARD = 'sighted_proof_of_age_card',
}
```

### Enum with Functions

```ts
enum Weekday {
  Monday,
  Tuesday,
  Wednesday,
  Thursday,
  Friday,
  Saturday,
  Sunday,
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

```ts
enum AnimalFlags {
  None = 0,
  HasClaws = 1 << 0,
  CanFly = 1 << 1,
  EatsFish = 1 << 2,
  Endangered = 1 << 3,
  EndangeredFlyingClawedFishEating = HasClaws | CanFly | EatsFish | Endangered,
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

```ts
enum Tristate {
  False,
  True,
  Unknown,
}

// compiles to
var Tristate;
(function (Tristate) {
  Tristate[(Tristate['False'] = 0)] = 'False';
  Tristate[(Tristate['True'] = 1)] = 'True';
  Tristate[(Tristate['Unknown'] = 2)] = 'Unknown';
})(Tristate || (Tristate = {}));

console.log(Tristate[0]); // 'False'
console.log(Tristate['False']); // 0
console.log(Tristate[Tristate.False]); // 'False' because `Tristate.False == 0`
```

## Function

### Function Interface

```ts
interface ReturnString {
  (): string;
}

declare const foo: ReturnString;

const bar = foo(); // bar 被推断为一个字符串
```

```ts
interface Complex {
  (foo: string, bar?: number, ...others: boolean[]): number;
}
```

```ts
interface Overloaded {
  (foo: string): string;
  (foo: number): number;
}

// 实现接口的一个例子：
function stringOrNumber(foo: number): number;
function stringOrNumber(foo: string): string;
function stringOrNumber(foo: any): any {
  if (typeof foo === 'number') {
    return foo * foo;
  } else if (typeof foo === 'string') {
    return `hello ${foo}`;
  }
}

const overloaded: Overloaded = stringOrNumber;

// 使用
const str = overloaded(''); // str 被推断为 'string'
const num = overloaded(123); // num 被推断为 'number'
```

### Arrow Function

在一个以 number 类型为参数，以 string 类型为返回值的函数中:

```ts
const simple: (foo: number) => string = (foo) => foo.toString();
```

### Weak Overload

```ts
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
    left: d,
  };
}

padding(1); // Okay: all
padding(1, 1); // Okay: topAndBottom, leftAndRight
padding(1, 1, 1, 1); // Okay: top, right, bottom, left
padding(1, 1, 1); // Error: Not a part of the available overloads
```

## Interface

```ts
interface Name {
  first: string;
  second: string;
}

let name: Name;
name = {
  first: 'John',
  second: 'Doe',
};

name = {
  // Error: 'Second is missing'
  first: 'John',
};

name = {
  // Error: 'Second is the wrong type'
  first: 'John',
  second: 1337,
};
```

### Extends Interface

```ts
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

```ts
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

### Interface vs Type Alias

- Type aliases may not participate in declaration merging, but interfaces can.
- Interfaces may only be used to declare the shapes of object, not re-name primitives.
- The key distinction is that a type cannot be re-opened to add new properties,
  an interface which is always extendable.

```ts
type Window = {
  title: string;
};

type Window = {
  ts: TypeScriptAPI;
};

// Error: Duplicate identifier 'Window'.
```

```ts
interface Window {
  title: string;
}

interface Window {
  ts: TypeScriptAPI;
}

const src = 'const a = "Hello World"';
window.ts.transpileModule(src, {});
```

## Access Modifiers

### Member Access Modifiers

Public, Protected and Private:

```ts
class Singleton {
  private static instance: Singleton;
  private constructor() {
    // ..
  }

  public static getInstance() {
    if (!Singleton.instance) {
      Singleton.instance = new Singleton();
    }

    return Singleton.instance;
  }

  someMethod() {}
}

let someThing = new Singleton(); // Error: constructor of 'singleton' is private

let instance = Singleton.getInstance(); // do some thing with the instance
```

### Readonly Types

Readonly type

```ts
type Foo = {
  readonly bar: number;
  readonly bas: number;
};

// 初始化
const foo: Foo = { bar: 123, bas: 456 };

// 不能被改变
foo.bar = 456; // Error: foo.bar 为仅读属性
```

Readonly indexable signature

```ts
interface Foo {
  readonly [x: number]: number;
}

// 使用

const foo: Foo = { 0: 123, 2: 345 };
console.log(foo[0]); // ok（读取）
foo[0] = 456; // Error: 属性只读
```

Readonly properties of class

```ts
class Foo {
  readonly bar = 1; // OK
  readonly baz: string;
  constructor() {
    this.baz = 'hello'; // OK
  }
}
```

Readonly generic type

```ts
type Foo = {
  bar: number;
  bas: number;
};

type FooReadonly = Readonly<Foo>;

const foo: Foo = { bar: 123, bas: 456 };
const fooReadonly: FooReadonly = { bar: 123, bas: 456 };

foo.bar = 456; // ok
fooReadonly.bar = 456; // Error: bar 属性只读
```

In React

```ts
class Something extends React.Component<{ foo: number }, { baz: number }> {
  someMethod() {
    this.props.foo = 123; // Error: props 是不可变的
    this.state.baz = 456; // Error: 你应该使用 this.setState()
  }
}
```

## Index Signature

```ts
let x: { foo: number; [x: string]: any };

x = { foo: 1, baz: 2 }; // ok, 'baz' 属性匹配于索引签名
```

当你声明一个索引签名时，所有明确的成员都必须符合索引签名

```ts
// ok
interface Foo {
  [key: string]: number;
  x: number;
  y: number;
}

// Error
interface Bar {
  [key: string]: number;
  x: number;
  y: string; // Error: y 属性必须为 number 类型
}
```

使用交叉类型可以解决上述问题

```ts
type FieldState = {
  value: string;
};

type FormState = { isValid: boolean } & { [fieldName: string]: FieldState };
```

### Select Index Types

```ts
type Index = 'a' | 'b' | 'c';
type FromIndex = { [k in Index]?: number };

const good: FromIndex = { b: 1, c: 2 };

// Error:
// `{ b: 1, c: 2, d: 3 }` 不能分配给 'FromIndex'
// 对象字面量只能指定已知类型，'d' 不存在 'FromIndex' 类型上
const bad: FromIndex = { b: 1, c: 2, d: 3 };
```

```ts
type FromSomeIndex<K extends string> = { [key in K]: number };
```

### Indexed Access Types

```ts
const MyArray = [
  { name: 'Alice', age: 15 },
  { name: 'Bob', age: 23 },
  { name: 'Eve', age: 38 },
];

type Person = typeof MyArray[number];
// type Person = {
//   name: string;
//   age: number;
// }

type Age = typeof MyArray[number]['age'];
// type Age = number

type Age2 = Person['age'];
// type Age2 = number
```

`{ [K in keyof T]: ... }[keyof T]`: 返回键名 (键名组成的联合类型)

```ts
type PickByValueType<T, ValueType> = Pick<
  T,
  { [Key in keyof T]-?: T[Key] extends ValueType ? Key : never }[keyof T]
>;

type OmitByValueType<T, ValueType> = Pick<
  T,
  { [Key in keyof T]-?: T[Key] extends ValueType ? never : Key }[keyof T]
>;

type RequiredKeys<T> = {
  [K in keyof T]-?: {} extends Pick<T, K> ? never : K;
}[keyof T];

type OptionalKeys<T> = {
  [K in keyof T]-?: {} extends Pick<T, K> ? K : never;
}[keyof T];

type FunctionTypeKeys<T extends object> = {
  [K in keyof T]-?: T[K] extends Function ? K : never;
}[keyof T];
```

## Literal Types

```ts
type CardinalDirection = 'North' | 'East' | 'South' | 'West';

function move(distance: number, direction: CardinalDirection) {
  // ...
}

move(1, 'North'); // ok
move(1, 'Nurth'); // Error

type OneToFive = 1 | 2 | 3 | 4 | 5;
type Bools = true | false;
```

```ts
interface Options {
  width: number;
}

function configure(x: Options | 'auto') {
  // ...
}

configure({ width: 100 });
configure('auto');
configure('automatic');
// ERROR:
// Argument of type '"automatic"' is not assignable
// to parameter of type 'Options | "auto"'.
```

## Template Literal Types

- Based on literal types.
- 4 intrinsic String Manipulation Types:
  - `Uppercase<StringType>`
  - `Lowercase<StringType>`
  - `Capitalize<StringType>`
  - `Uncapitalize<StringType>`

```ts
type PropEventSource<Type> = {
  on<Key extends string & keyof Type>(
    eventName: `${Key}Changed`,
    callback: (newValue: Type[Key]) => void
  ): void;
};

// Create a "watched object" with an 'on' method
// so that you can watch for changes to properties.
declare function makeWatchedObject<Type>(
  obj: Type
): Type & PropEventSource<Type>;

const person = makeWatchedObject({
  firstName: 'Yi',
  lastName: 'Long',
  age: 26,
});

person.on('firstNameChanged', (newName) => {
  // (parameter) newName: string
  console.log(`new name is ${newName.toUpperCase()}`);
});

person.on('ageChanged', (newAge) => {
  // (parameter) newAge: number
  if (newAge < 0) {
    console.warn('warning! negative age');
  }
});

// It's typo-resistent
person.on('firstName', () => {});
// Argument of type '"firstName"' is not assignable to
// parameter of type '"firstNameChanged" | "lastNameChanged" | "ageChanged"'.

person.on('fstNameChanged', () => {});
// Argument of type '"fstNameChanged"' is not assignable to
// parameter of type '"firstNameChanged" | "lastNameChanged" | "ageChanged"'.
```

## Moving Types

```ts
// 捕获字符串的类型与值
const foo = 'Hello World';

// 使用一个捕获的类型
let bar: typeof foo;

// bar 仅能被赋值 'Hello World'
bar = 'Hello World'; // ok
bar = 'anything else'; // Error
```

### Keyof Types

`keyof foo` get literal types of `foo` keys (`Object.keys`):

```ts
const colors = {
  red: 'red',
  blue: 'blue',
};

type Colors = keyof typeof colors;

let color: Colors; // color 的类型是 'red' | 'blue' (literal types)
color = 'red'; // ok
color = 'blue'; // ok
color = 'anythingElse'; // Error
```

## Generic Types

### Generic Function

```ts
function reverse<T>(items: T[]): T[] {
  const toReturn = [];
  for (let i = items.length - 1; i >= 0; i--) {
    toReturn.push(items[i]);
  }
  return toReturn;
}
```

### Generic Class

```ts
// 创建一个泛型类
class Queue<T> {
  private data = [];
  push = (item: T) => this.data.push(item);
  pop = (): T => this.data.shift();
}

// 简单的使用
const queue = new Queue<number>();
queue.push(0);
queue.push('1'); // Error：不能推入一个 `string`，只有 number 类型被允许
```

```ts
interface Listener<T> {
  (event: T): any;
}

interface Disposable {
  dispose(): any;
}

class TypedEvent<T> {
  private listeners: Listener<T>[] = [];
  private listenersOncer: Listener<T>[] = [];

  public on = (listener: Listener<T>): Disposable => {
    this.listeners.push(listener);

    return {
      dispose: () => this.off(listener),
    };
  };

  public once = (listener: Listener<T>): void => {
    this.listenersOncer.push(listener);
  };

  public off = (listener: Listener<T>) => {
    const callbackIndex = this.listeners.indexOf(listener);
    if (callbackIndex > -1) this.listeners.splice(callbackIndex, 1);
  };

  public emit = (event: T) => {
    this.listeners.forEach((listener) => listener(event));

    this.listenersOncer.forEach((listener) => listener(event));

    this.listenersOncer = [];
  };

  public pipe = (te: TypedEvent<T>): Disposable => {
    return this.on((e) => te.emit(e));
  };
}
```

### Specific Instances from Generic Types

```ts
class Foo<T> {
  foo: T;
}

const FooNumber = Foo as { new (): Foo<number> }; // ref 1

function id<T>(x: T) {
  return x;
}

const idNum = id as { (x: number): number };
```

### Generic Types for Types Programming

- 在类型编程里, 泛型就是变量.

```ts
function pick<T extends object, U extends keyof T>(obj: T, keys: U[]): T[U][] {
  return keys.map((key) => obj[key]);
}
```

## Union Types

多种类型之一

```ts
function formatCommandLine(command: string[] | string) {
  let line = '';
  if (typeof command === 'string') {
    line = command.trim();
  } else {
    line = command.join(' ').trim();
  }

  // Do stuff with line: string
}
```

```ts
interface Square {
  kind: 'square';
  size: number;
}

interface Rectangle {
  kind: 'rectangle';
  width: number;
  height: number;
}

// 有人仅仅是添加了 `Circle` 类型
// 我们可能希望 TypeScript 能在任何被需要的地方抛出错误
interface Circle {
  kind: 'circle';
  radius: number;
}

type Shape = Square | Rectangle | Circle;

function area(s: Shape) {
  switch (s.kind) {
    case 'square':
      return s.size * s.size;
    case 'rectangle':
      return s.width * s.height;
    case 'circle':
      return Math.PI * s.radius ** 2;
    default:
      const _exhaustiveCheck: never = s;
  }
}
```

## Intersection Types

extend 是一种非常常见的模式,
intersection type 具有所有类型的功能

```ts
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

`connect` in React

```ts
import * as React from 'react'
import * as Redux from 'redux'

import { MyReduxState } from './my-root-reducer.ts'

export interface OwnProps {
  propFromParent: number
}

interface StateProps {
  propFromReduxStore: string
}

interface DispatchProps {
  onSomeEvent: () => void
}

type Props = StateProps & DispatchProps & OwnProps

interface State {
  internalComponentStateField: string
}

class MyComponent extends React.Component<Props, State> {
  ...
}

function mapStateToProps(state: MyReduxState, ownProps: OwnProps): StateProps {
  ...
}

function mapDispatchToProps(
  dispatch: Redux.Dispatch<any>,
  ownProps: OwnProps
): DispatchProps {
  ...
}

export default connect<StateProps, DispatchProps, OwnProps>
  (mapStateToProps, mapDispatchToProps)(MyComponent)
```

## Conditional Types

- Basic conditional types
  just like `if else` statement.
- Nested conditional types
  just like `switch case` statement.
- Distributive conditional types
  just like `map` statement (`loop` statement) on `union` type.
- COnditional types make TypeScript become real programing type system.

### Basic Conditional Types

```ts
interface Animal {
  live(): void;
}
interface Dog extends Animal {
  woof(): void;
}

type Example1 = Dog extends Animal ? number : string;
// => type Example1 = number

type Example2 = RegExp extends Animal ? number : string;
// => type Example2 = string
```

### Nested Conditional Types

- Conditional types can be nested.
- 通过嵌套条件类型, 可以将类型约束收拢到精确范围.

```ts
type TypeName<T> = T extends string
  ? 'string'
  : T extends number
  ? 'number'
  : T extends boolean
  ? 'boolean'
  : T extends undefined
  ? 'undefined'
  : T extends Function
  ? 'function'
  : 'object';
```

### Distributive Conditional Types

- Conditional types in which checked type is `naked type parameter` are called DCT.
- DCT are automatically distributed over union types during instantiation.
- When conditional types act on a generic type,
  they become distributive when given a union type.
- `( A | B | C ) extends T ? X : Y` 相当于
  `(A extends T ? X : Y) | (B extends T ? X : Y) | (B extends T ? X : Y)`
- 没有被额外包装的联合类型参数, 在条件类型进行判定时会将联合类型分发, 分别进行判断.

```ts
// "string" | "function"
type T1 = TypeName<string | (() => void)>;

// "string" | "object"
type T2 = TypeName<string | string[]>;

// "object"
type T3 = TypeName<string[] | number[]>;
```

```ts
type Naked<T> = T extends boolean ? 'Y' : 'N';
type Wrapped<T> = [T] extends [boolean] ? 'Y' : 'N';

/*
 * 先分发到 Naked<number> | Naked<boolean>
 * 结果是 "N" | "Y"
 */
type Distributed = Naked<number | boolean>;

/*
 * 不会分发 直接是 [number | boolean] extends [boolean]
 * 结果是 "N"
 */
type NotDistributed = Wrapped<number | boolean>;
```

## Mapped Types

### Basic Mapped Types

```ts
type Readonly<T> = { readonly [P in keyof T]: T[P] };
type Partial<T> = { [P in keyof T]?: T[P] };
type ReadonlyPartial<T> = { readonly [P in keyof T]?: T[P] };
type Required<T> = { [P in keyof T]-?: T[P] };
type Nullable<T> = { [P in keyof T]: T[P] | null };
type NonNullable<T> = T extends null | undefined ? never : T;
type Clone<T> = { [P in keyof T]: T[P] };
type Stringify<T> = { [P in keyof T]: string };
```

### Union Mapped Types

With distributive conditional type:

```ts
type Extract<T, U> = T extends U ? T : never;
type Exclude<T, U> = T extends U ? never : T;
```

### Key Mapped Types

```ts
type Pick<T, K extends keyof T> = { [P in K]: T[P] };
type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;
type Record<K extends keyof any, T> = { [P in K]: T };
```

### Function Mapped Types

```ts
type Parameters<T extends (...args: any) => any> = T extends (
  ...args: infer P
) => any
  ? P
  : never;

type ConstructorParameters<T extends new (...args: any) => any> =
  T extends new (...args: infer P) => any ? P : never;

type ReturnType<T extends (...args: any) => any> = T extends (
  ...args: any[]
) => infer R
  ? R
  : any;

type InstanceType<T extends new (...args: any) => any> = T extends new (
  ...args: any
) => infer R
  ? R
  : any;
```

### Custom Mapped Types

Combine with:

- `in keyof`
- `readonly`
- `?`
- `-`
- `as`
- Template literal types.
- Conditional types.
- Built-in types.
- Other mapped types.
- Other custom types.
- etc.

```ts
// Removes 'readonly' attributes from a type's properties
type Mutable<Type> = {
  -readonly [Property in keyof Type]: Type[Property];
};

type LockedAccount = {
  readonly id: string;
  readonly name: string;
};

type UnlockedAccount = Mutable<LockedAccount>;
// type UnlockedAccount = {
//   id: string;
//   name: string;
// };
```

```ts
// Mapped types via `as` type
type Getters<Type> = {
  [Property in keyof Type as `get${Capitalize<
    string & Property
  >}`]: () => Type[Property];
};

interface Person {
  name: string;
  age: number;
  location: string;
}

type LazyPerson = Getters<Person>;
// type LazyPerson = {
//   getName: () => string;
//   getAge: () => number;
//   getLocation: () => string;
// }
```

```ts
// Remove the 'kind' property
type RemoveKindField<Type> = {
  [Property in keyof Type as Exclude<Property, 'kind'>]: Type[Property];
};

interface Circle {
  kind: 'circle';
  radius: number;
}

type KindlessCircle = RemoveKindField<Circle>;
// type KindlessCircle = {
//   radius: number;
// }
```

```ts
// Mapped type via conditional type
type ExtractPII<Type> = {
  [Property in keyof Type]: Type[Property] extends { pii: true } ? true : false;
};

type DBFields = {
  id: { format: 'incrementing' };
  name: { type: string; pii: true };
};

type ObjectsNeedingGDPRDeletion = ExtractPII<DBFields>;
// type ObjectsNeedingGDPRDeletion = {
//   id: false;
//   name: true;
// }
```

## Utility Types

### Null Type

```ts
type Nullish = null | undefined;
type Nullable<T> = T | null;
type NonUndefinedable<A> = A extends undefined ? never : A;
type NonNullable<T> = T extends null | undefined ? never : T;
```

### Boolean Type

```ts
type Falsy = false | '' | 0 | null | undefined;
const isFalsy = (val: unknown): val is Falsy => !val;
```

### Primitive

```ts
type Primitive = string | number | boolean | bigint | symbol | null | undefined;

const isPrimitive = (val: unknown): val is Primitive => {
  if (val === null || val === undefined) {
    return true;
  }

  const typeDef = typeof val;

  const primitiveNonNullishTypes = [
    'string',
    'number',
    'bigint',
    'boolean',
    'symbol',
  ];

  return primitiveNonNullishTypes.indexOf(typeDef) !== -1;
};
```

### Promise Types

```ts
// Get naked Promise<T> type
type PromiseType<T extends Promise<any>> = T extends Promise<infer U>
  ? U
  : never;
```

### Proxy Types

```ts
type Proxy<T> = {
  get(): T;
  set(value: T): void;
};

type Proxify<T> = { [P in keyof T]: Proxy<T[P]> };
```

### Recursive Types

```ts
type DeepReadonly<T> = {
  +readonly [P in keyof T]: T[P] extends object ? DeepReadonly<T[P]> : T[P];
};

type DeepMutable<T> = {
  -readonly [P in keyof T]: T[P] extends object ? DeepMutable<T[P]> : T[P];
};

type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

type DeepRequired<T> = {
  [P in keyof T]-?: T[P] extends object | undefined ? DeepRequired<T[P]> : T[P];
};
```

- [`PathOf<Form>` complex recursive types](https://mp.weixin.qq.com/s/KJdUdwbLN4g4M7xy34m-fA)

### Lodash Types

```ts
type Flatten<Type> = Type extends Array<infer Item> ? Item : Type;
```

## Type Inference

- 类型系统在获得足够的信息后,
  能将 infer 后跟随的类型参数推导出来,
  最后返回这个推导结果

```ts
type Parameters<T extends (...args: any) => any> = T extends (
  ...args: infer P
) => any
  ? P
  : never;

type ConstructorParameters<T extends new (...args: any) => any> =
  T extends new (...args: infer P) => any ? P : never;

type ReturnType<T extends (...args: any) => any> = T extends (
  ...args: any[]
) => infer R
  ? R
  : any;

type InstanceType<T extends new (...args: any) => any> = T extends new (
  ...args: any
) => infer R
  ? R
  : any;
```

```ts
const foo = (): string => {
  return 'sabertaz';
};

// string
type FooReturnType = ReturnType<typeof foo>;
```

## Type Guards

### Type Predicates

- `is` keyword for type predicate.

```ts
type Falsy = false | '' | 0 | null | undefined;
const isFalsy = (val: unknown): val is Falsy => !val;
```

### In Type Guard

```ts
type Fish = { swim: () => void };
type Bird = { fly: () => void };

function move(animal: Fish | Bird) {
  if ('swim' in animal) {
    return animal.swim();
  }

  return animal.fly();
}
```

### Instance Type Guard

```ts
function logValue(x: Date | string) {
  if (x instanceof Date) {
    console.log(x.toUTCString());
  } else {
    console.log(x.toUpperCase());
  }
}
```

### Never Type

- The `never` type is assignable to every type.
- No type is assignable to `never` (except `never` itself).

```ts
interface Triangle {
  kind: "triangle";
  sideLength: number;
}

type Shape = Circle | Square | Triangle;

function getArea(shape: Shape) {
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius ** 2;
    case "square":
      return shape.sideLength ** 2;
    default:
      const _exhaustiveCheck: never = shape;
Type 'Triangle' is not assignable to type 'never'.
      return _exhaustiveCheck;
  }
}
```

## Type Assertion

- `<type>`
- `as type`

> `as` is better in `.jsx`

```ts
let foo: any;
let bar = <string>foo; // 现在 bar 的类型是 'string'
```

```ts
function handler(event: Event) {
  const mouseEvent = event as MouseEvent;
}
```

## Mixins

```ts
// 所有 mixins 都需要
type Constructor<T = {}> = new (...args: any[]) => T;

/////////////
// mixins 例子
////////////

// 添加属性的混合例子
function TimesTamped<TBase extends Constructor>(Base: TBase) {
  return class extends Base {
    timestamp = Date.now();
  };
}

// 添加属性和方法的混合例子
function ActiveTable<TBase extends Constructor>(Base: TBase) {
  return class extends Base {
    isActivated = false;

    activate() {
      this.isActivated = true;
    }

    deactivate() {
      this.isActivated = false;
    }
  };
}

///////////
// 组合类
///////////

// 简答的类
class User {
  name = '';
}

// 添加 TimesTamped 的 User
const TimestampedUser = TimesTamped(User);

// Tina TimesTamped 和 ActiveTable 的类
const TimestampedActiveTableUser = TimesTamped(ActiveTable(User));

//////////
// 使用组合类
//////////

const timestampedUserExample = new TimestampedUser();
console.log(timestampedUserExample.timestamp);

const timestampedActiveTableUserExample = new TimestampedActiveTableUser();
console.log(timestampedActiveTableUserExample.timestamp);
console.log(timestampedActiveTableUserExample.isActivated);
```

## Closure

```ts
const { called } = new (class {
  count = 0;
  called = () => {
    this.count++;
    console.log(`Called : ${this.count}`);
  };
})();

called(); // Called : 1
called(); // Called : 2
```

## Decorators

- Attaching to a class:
  access to the class prototype and its member properties.
- Attaching to a class property:
  access to the name and value of that property,
  along with its class prototype `target`.
- Attaching to a class method parameter:
  access to that parameter’s index, name and value.
- Attaching to a class method:
  access to the method’s parameters, the metadata associated with the method object,
  along with its class prototype `target`.

```ts
// class definitions
@decorator
class MyComponent extends React.Component<Props, State> {
  // class properties
  @decorator
  private static api_version: string;

  // class method parameters
  private handleFormSubmit(@decorator myParam: string) {}

  // class methods
  @decorator
  private handleFormSubmit() {}

  // accessors
  @decorator
  public myAccessor() {
    return this.privateProperty;
  }
}
```

### Class Decorators

```ts
function classDecorator(options: any[]) {
  return target => {
    ...
  }
}

@classDecorator
class ...
```

```ts
function inject(options: { api_version: string }) {
  // returns the class decorator implementation
  return (target) => {
    // `target` will give us access to the entire class prototype
    target.apiVersion = options.api_version;
  };
}

function deprecated(target) {
  console.log(`
    this class is deprecated and will be removed
    in a future version of the app
  `);
  console.log(`@: ${target}`);
}

@inject({
  api_version: '0.3.4',
})
@deprecated
class MyComponent extends React.Component<Props> {
  static apiVersion: string;
}
```

### Class Properties Decorators

first parameter `target` will be
`class prototype` for normal properties
and `class constructor` for static properties.

```ts
function prop(target, name) {
  ...
}

function staticProp(constructor, name) {
  ...
}

class MyComponent extends React.Component<Props> {
  @prop
  public member: string

  @staticProp
  public static apiVersion: string;
}
```

### Method Parameters Decorators

`@uppercase`/`@lowercase` for string parameters,
`@rounded` for number parameters.

```ts
function decorator(
  class,
  name: string,
  index: int,
) {
  ...
}
class MyComponent extends React.Component<Props> {
  private handleMethod(@decorator param1: string) {
    ...
  }
}
```

### Methods Decorators

- `target` parameter will class prototype
- `propertyKey` will be a string containing the name of the method.
- `propertyDescriptor` will provide with standard metadata associated with the object:
  configurable, enumerable, value and writable,
  as well as get and set.

```ts
function methodDecorator(options: any[]) {
  return (
    target: MyComponent,
    propertyKey: string,
    propertyDescriptor: PropertyDescriptor
  ) => {
    ...
  }
}

class MyComponent extends React.Component {
  @methodDecorator
  handleSomething() {
    ...
  }
}
```

```ts
function enumerable(enumerable: boolean) {
  return (
    target: MyComponent,
    propertyKey: string,
    propertyDescriptor: PropertyDescriptor
  ) => {
    propertyDescriptor.enumerable = enumerable;
  }
}

class MyComponent extends React.Component {
  @enumerable(false)
  handleSomething() {
    ...
  }
}
```

### TypeScript Decorator Utils

#### IOC and DI Utils

- [InversifyJS: Powerful and lightweight inversion of control container](https://github.com/inversify/InversifyJS)

## React with TypeScript

- [React TypeScript CheatSheet](https://github.com/typescript-cheatsheets/react)

### Props Types

```ts
export declare interface AppProps {
  children: React.ReactNode; // best
  style?: React.CSSProperties; // for style
  onChange?: (e: React.FormEvent<HTMLInputElement>) => void; // form events!
  props: Props & React.HTMLProps<HTMLButtonElement>;
}
```

### React Refs Types

```ts
class CssThemeProvider extends React.PureComponent<Props> {
  private rootRef: React.RefObject<HTMLDivElement> = React.createRef();

  render() {
    return <div ref={this.rootRef}>{this.props.children}</div>;
  }
}
```

### Functional Component

```ts
type Props = {
  foo: string;
};

const myComponent: React.FunctionComponent<Props> = (props) => {
  return <span>{props.foo}</span>;
};

<MyComponent foo="bar" />;
```

```ts
import React, { MouseEvent, SFC } from 'react';

type Props = { onClick(e: MouseEvent<HTMLElement>): void };

const Button: SFC<Props> = ({ onClick: handleClick, children }) => (
  <button onClick={handleClick}>{children}</button>
);
```

### Class Component

read only state

```ts
import React from 'react';
import Button from './Button';

const initialState = { clicksCount: 0 };
type State = Readonly<typeof initialState>;

class ButtonCounter extends React.Component<Props, State> {
  readonly state: State = initialState;

  render() {
    ...
  }
}
```

props and state types with `React.Component<>`

```ts
type Props = {
  foo: string;
};

class MyComponent extends React.Component<Props, {}> {
  render() {
    return <span>{this.props.foo}</span>;
  }
}

<MyComponent foo="bar" />;
```

```ts
class FocusingInput extends React.Component<
  {
    value: string;
    onChange: (value: string) => any;
  },
  {}
> {
  input: HTMLInputElement | null = null;

  render() {
    return (
      <input
        ref={(input) => (this.input = input)}
        value={this.props.value}
        onChange={(e) => {
          this.props.onChange(e.target.value);
        }}
      />
    );
  }
  focus() {
    if (this.input != null) {
      this.input.focus();
    }
  }
}
```

### Generic Component

```ts
// 一个泛型组件
type SelectProps<T> = { items: T[] };
class Select<T> extends React.Component<SelectProps<T>, any> {}

// 使用
const Form = () => <Select<string> items={['a', 'b']} />;
```

In `.tsx` file, `<T>` maybe considered `JSX.Element`,
use `extends {}` to avoid it:

```tsx
const foo = <T extends {}>(arg: T) => arg;
```

### Component Return Type

- `JSX.Element`: return value of `React.createElement`.
- `React.ReactNode`: return value of a component.

### React Redux

```typescript
const initialState = {
  name: '',
  points: 0,
  likesGames: true,
};

type State = typeof initialState;
```

```typescript
export function updateName(name: string) {
  return <const>{
    type: 'UPDATE_NAME',
    name,
  };
}

export function addPoints(points: number) {
  return <const>{
    type: 'ADD_POINTS',
    points,
  };
}

export function setLikesGames(value: boolean) {
  return <const>{
    type: 'SET_LIKES_GAMES',
    value,
  };
}

type Action = ReturnType<
  typeof updateName | typeof addPoints | typeof setLikesGames
>;

// =>
// type Action = {
//   readonly type: 'UPDATE_NAME';
//   readonly name: string;
// } | {
//   readonly type: 'ADD_POINTS';
//   readonly points: number;
// } | {
//   readonly type: 'SET_LIKES_GAMES';
//   readonly value: boolean;
// }
```

```ts
const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'UPDATE_NAME':
      return { ...state, name: action.name };
    case 'ADD_POINTS':
      return { ...state, points: action.points };
    case 'SET_LIKES_GAMES':
      return { ...state, likesGames: action.value };
    default:
      return state;
  }
};
```

### React Hooks

- `Dispatch`
- `SetStateAction`

```ts
import { Dispatch, SetStateAction, useState } from 'react';

interface ReturnType {
  value: boolean;
  setValue: Dispatch<SetStateAction<boolean>>;
  setTrue: () => void;
  setFalse: () => void;
  toggle: () => void;
}

function useBoolean(defaultValue?: boolean): ReturnType {
  const [value, setValue] = useState(!!defaultValue);

  const setTrue = () => setValue(true);
  const setFalse = () => setValue(false);
  const toggle = () => setValue((x) => !x);

  return { value, setValue, setTrue, setFalse, toggle };
}

export default useBoolean;
```

## Monorepo

- [TypeScript Monorepo](https://2ality.com/2021/07/simple-monorepos.html 'TypeScript Monorepo')

## TypeScript Tools

- [TS Config](https://github.com/tsconfig/bases)
- [TS Node](https://github.com/TypeStrong/ts-node)
- [TS Jest](https://github.com/kulshekhar/ts-jest)

```bash
npm i -D jest typescript ts-jest @types/jest
npx ts-jest config:init
npx jest
```

## Reference

- [TypeScript Deep Dive](https://github.com/basarat/typescript-book)
- [Clean TypeScript Code](https://github.com/labs42io/clean-code-typescript)
- [Effective TypeScript](https://github.com/danvk/effective-typescript)
