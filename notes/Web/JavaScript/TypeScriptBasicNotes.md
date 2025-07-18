---
author: Sabertazimi
authorTitle: Web Developer
authorURL: https://github.com/sabertazimi
authorImageURL: https://github.com/sabertazimi.png
tags: [Web, JavaScript, TypeScript]
---

# TypeScript Basic Notes

## TypeScript Toolchain

### TypeScript Installation

```bash
npm i -D typescript
npm i -D react react-dom @types/node @types/react @types/react-dom
```

### TypeScript Configuration

```bash
npx tsconfig.json
npx tsc --init
```

```bash
npm i -D @tsconfig/create-react-app
```

Basic [`tsconfig.json`](https://www.typescriptlang.org/tsconfig):

- [`extends`](https://github.com/tsconfig/bases):
  - `@tsconfig/recommended/tsconfig.json`.
  - `@tsconfig/create-react-app/tsconfig.json`.
  - `@tsconfig/node16/tsconfig.json`.
  - `@tsconfig/deno/tsconfig.json`.
- `include`.
- `exclude`.
- `buildOptions`.
- `compilerOptions`.
- `watchOptions`.
- `tsNode`.

```json
{
  "include": ["./src/**/*"],
  "exclude": ["node_modules", "build", "dist", "coverage"],
  "compilerOptions": {
    /* 基本选项 */
    "target": "ES2022", // 'ES3', 'ES5', 'ES2015', 'ES2016', 'ES2017', or 'ESNEXT'
    "module": "NodeNext", // 指定使用模块: 'commonjs', 'amd', 'system', 'umd' or 'es2015'
    "lib": ["ES2022"], // 指定要包含在编译中的库文件
    "allowJs": true, // 允许编译 JavaScript 文件
    "checkJs": true, // 报告 JavaScript 文件中的错误
    "jsx": "react", // 'preserve', 'react-native', or 'react'
    "declaration": true, // 生成相应的 '.d.ts' 文件
    "rootDir": "./src/", // 用于解析包含文件的基目录
    "outDir": "./dist/", // 指定输出目录
    "outFile": "./", // 将输出文件合并为一个文件
    "removeComments": true, // 删除编译后的所有的注释
    "noEmit": true, // 不生成输出文件
    "importHelpers": true, // 从 tslib 导入辅助工具函数
    "forceConsistentCasingInFileNames": true, // Prevents case-sensitive import issues for better cross-platform compatibility
    "isolatedModules": true, // 将每个文件做为单独的模块 (与 'ts.transpileModule' 类似)
    "resolveJsonModule": true,

    /* 严格的类型检查选项 */
    "strict": true, // 启用所有严格类型检查选项
    "noImplicitAny": true, // 在表达式和声明上有隐含的 any 类型时报错
    "strictNullChecks": true, // 启用严格的 null 检查
    "noImplicitThis": true, // 当 this 表达式值为 any 类型的时候, 生成一个错误
    "alwaysStrict": true, // 以严格模式检查每个模块, 并在每个文件里加入 'use strict'
    "skipLibCheck": true,

    /* 额外的检查 */
    "noUnusedLocals": true, // 有未使用的变量时, 抛出错误
    "noUnusedParameters": true, // 有未使用的参数时, 抛出错误
    "noImplicitReturns": true, // 并不是所有函数里的代码都有返回值时, 抛出错误
    "noFallthroughCasesInSwitch": true, // 报告 switch 语句的 fallthrough 错误
    "noUncheckedIndexedAccess": true,

    /* 模块解析选项 */
    "moduleResolution": "NodeNext", // 选择模块解析策略: 'node' (Node.js) or 'classic'
    "moduleDetection": "force",
    "esModuleInterop": true,
    "baseUrl": "./", // 用于解析非相对模块名称的基目录
    "paths": {
      "@components": ["src/components"],
      "@components/*": ["src/components/*"],
      "@config": ["src/config"],
      "@config/*": ["src/config/*"],
      "@hooks": ["src/hooks"],
      "@hooks/*": ["src/hooks/*"],
      "@images": ["src/images"],
      "@images/*": ["src/images/*"],
      "@layouts": ["src/layouts"],
      "@layouts/*": ["src/layouts/*"],
      "@pages": ["src/pages"],
      "@pages/*": ["src/pages/*"],
      "@styles": ["src/styles"],
      "@styles/*": ["src/styles/*"],
      "@templates": ["src/templates"],
      "@templates/*": ["src/templates/*"],
      "@types": ["src/types"],
      "@types/*": ["src/types/*"]
    }, // 模块名到基于 baseUrl 的路径映射的列表
    "rootDirs": [], // 根文件夹列表, 其组合内容表示项目运行时的结构内容
    "typeRoots": [], // 包含类型声明的文件列表
    "types": [], // 需要包含的类型声明文件名列表
    "allowSyntheticDefaultImports": true, // 允许从没有设置默认导出的模块中默认导入

    /* Source Map Options */
    "sourceMap": true,
    "sourceRoot": "./", // 指定调试器应该找到 TypeScript 文件而不是源文件的位置
    "mapRoot": "./", // 指定调试器应该找到映射文件而不是生成文件的位置
    "inlineSourceMap": true, // 生成单个 source map 文件, 而不是将 source maps 生成不同的文件
    "inlineSources": true // 将代码与 source map 生成到一个文件中
  }
}
```

### Webpack Configuration

```bash
npm i -D typescript ts-loader source-map-loader
```

```ts
const path = require('node:path')

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
    'react': 'React',
    'react-dom': 'ReactDOM',
  },
}
```

### ESLint Configuration

[ESLint for TypeScript](https://github.com/typescript-eslint/typescript-eslint):

```bash
npx eslint --init
```

### Jest Configuration

```bash
npm i -D jest typescript ts-jest @types/jest
npx ts-jest config:init
npx jest
```

### TypeScript DefinitelyTyped

- Library (`npm` package):
  `@types/*` should be `dependencies`,
  consumers can bring in type definitions used within.
- Application:
  `@types/*` should be `devDependencies`,
  type definitions are just development-time tool.

### TypeScript Compiler Performance

- Faster tools: `swc`/`rome`.
- Multithread: `ts-loader` + `fork-ts-checker-plugin`.
- Project references (`tsc -b` build mode):
  - Find `tsconfig` referenced projects.
  - Detect if they are up-to-date.
  - Build out-of-date projects in correct order.
  - Build provided `tsconfig` if itself or any dependencies have changed.
- Skip type checking (sometimes).
- Load `@types/` by need (`include`/`exclude`/`compilerOptions.types`).
- `tsc --listFiles` 列出编译时包含文件列表,
  `tsc --traceResolution` 列出编译时包含文件原因.

### TypeScript Project Reference

[Project Reference](https://www.typescriptlang.org/docs/handbook/project-references.html)
for `TypeScript` compile and build [Speed](https://github.com/typescript-cheatsheets/speed).

### TypeScript Monorepo Configuration

[TypeScript Monorepo](https://2ality.com/2021/07/simple-monorepos.html):

- NPM workspaces.
- `TypeScript` references.

## Modules

[Module types search](https://microsoft.github.io/TypeSearch):

| Declaration Type | Namespace | Type | Value |
| :--------------- | :-------- | :--- | :---- |
| Namespace        | X         |      | X     |
| Class            |           | X    | X     |
| Enum             |           | X    | X     |
| Interface        |           | X    |       |
| Type Alias       |           | X    |       |
| Function         |           |      | X     |
| Variable         |           |      | X     |

> **Value** means truly output JavaScript.

### Globals Definition

```json
{
  "include": ["./src/**/*", "globals.d.ts", "index.d.ts"]
}
```

```ts
declare module '*.css'
// => import * as foo from './some/file.css';

declare module '*.png' {
  const value: unknown
  export = value
}
// => import logo from './logo.png';
// <img src={logo as string} />

declare module '*.jpg' {
  const value: unknown
  export = value
}
```

`globals.d.ts`:

```ts
// npm i -D @types/react @types/react-dom
declare global {
  namespace JSX {
    interface Element extends React.ReactElement<any, any> {}
    interface ElementClass extends React.Component<any> {
      render: () => React.ReactNode
    }
  }
}
```

### Library Definition

`lib.d.ts`:

```json
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["es6", "dom"]
  }
}
```

### Namespace

Namespace aliases:

```ts
import polygons = Shapes.Polygons

namespace Shapes {
  export namespace Polygons {
    export class Triangle {}
    export class Square {}
  }
}

const sq = new polygons.Square() // Same as 'new Shapes.Polygons.Square()'
```

Library namespace declaration
with [declaration merging](https://www.typescriptlang.org/docs/handbook/declaration-merging.html#merging-namespaces-with-classes-functions-and-enums):

```ts
export = React
export as namespace React

declare namespace React {
  type ElementType<P = any> =
    | {
      [K in keyof JSX.IntrinsicElements]: P extends JSX.IntrinsicElements[K]
        ? K
        : never
    }[keyof JSX.IntrinsicElements]
    | ComponentType<P>
}
```

`namespace` compiles to `IIFE` pattern:

```ts
namespace Utility {
  export function log(msg) {
    console.log(msg)
  }
  export function error(msg) {
    console.log(msg)
  }
}

;(function (Utility) {
  Utility.log = log
  Utility.log = error
})(Utility || (Utility = {}))
```

:::caution No Namespace

Unless authoring DefinitelyTyped type definitions for existing package,
**do not use namespaces**.

Namespaces do not match up to modern JavaScript module semantics,
their automatic member assignments can make code confusing to read.

:::

### Module Resolution

#### Classic Module Resolution

`import { a } from './module'`:

- `/root/src/folder/module.ts`.
- `/root/src/folder/module.d.ts`.

`import { a } from 'module'`:

- `/root/src/folder/module.ts`.
- `/root/src/folder/module.d.ts`.
- `/root/src/module.ts`.
- `/root/src/module.d.ts`.
- `/root/module.ts`.
- `/root/module.d.ts`.
- `/module.ts`.
- `/module.d.ts`.

#### Node Module Resolution

`const x = require('./module')`:

- `/root/src/module.ts`.
- `/root/src/module.tsx`.
- `/root/src/module.d.ts`.
- `/root/src/module/package.json` + `{ "types": "lib/mainModule.ts" }`
  = `/root/src/module/lib/mainModule.ts`.
- `/root/src/module/index.ts`.
- `/root/src/module/index.tsx`.
- `/root/src/module/index.d.ts`.

`const x = require('module')`:

- `/root/src/node_modules/module.ts`.
- `/root/src/node_modules/module.tsx`.
- `/root/src/node_modules/module.d.ts`.
- `/root/src/node_modules/module/package.json` (if it specifies a `types` property).
- `/root/src/node_modules/@types/module.d.ts`.
- `/root/src/node_modules/module/index.ts`.
- `/root/src/node_modules/module/index.tsx`.
- `/root/src/node_modules/module/index.d.ts`.
- `/root/node_modules/module.ts`.
- `/root/node_modules/module.tsx`.
- `/root/node_modules/module.d.ts`.
- `/root/node_modules/module/package.json` (if it specifies a `types` property).
- `/root/node_modules/@types/module.d.ts`.
- `/root/node_modules/module/index.ts`.
- `/root/node_modules/module/index.tsx`.
- `/root/node_modules/module/index.d.ts`.
- `/node_modules/module.ts`.
- `/node_modules/module.tsx`.
- `/node_modules/module.d.ts`.
- `/node_modules/module/package.json` (if it specifies a `types` property).
- `/node_modules/@types/module.d.ts`.
- `/node_modules/module/index.ts`.
- `/node_modules/module/index.tsx`.
- `/node_modules/module/index.d.ts`.

## Basic Types

- `boolean`.
- `number`.
- `string`.
- `array`.
- `tuple`:
  - **Fixed number** of elements whose types are known.
  - Variable length `array` types aren’t assignable to `tuple` types.
- `enum`.
- `null`.
- `undefined`.
- `void`.
- `any`.
- `unknown`: 任何类型都能分配给 `unknown`, 但 `unknown` 不能分配给其他基本类型.
- `never`:
  - `switch` default case guard (exhaustiveness check).
  - Reduce `never` intersection type.
  - Ignored in union type:
    - mapped conditional type.
    - distributive conditional type.

```ts
let num: number
let str: string
let bool: boolean
let boolArray: boolean[]
let tuple: [string, number]
let power: any

// 赋值任意类型
power = '123'
power = 123

// 它也兼容任何类型
power = num
num = power

function log(message: string): void {
  console.log(message)
}
```

```ts
function unknownColor(x: never): never {
  throw new Error('unknown color')
}

type Color = 'red' | 'green' | 'blue'

function getColorName(c: Color): string {
  switch (c) {
    case 'red':
      return 'is red'
    case 'green':
      return 'is green'
    default:
      return unknownColor(c)
  }
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
let Card = CardSuit.Clubs

// 类型安全
Card = 'not a member of card suit' // Error: string 不能赋值给 `CardSuit` 类型
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

### Enum Parameters

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
        return false
      default:
        return true
    }
  }
}

const mon = Weekday.Monday
const sun = Weekday.Sunday

console.log(Weekday.isBusinessDay(mon)) // true
console.log(Weekday.isBusinessDay(sun))
```

### Enum Flags

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
  flags: AnimalFlags
  [key: string]: any
}

function printAnimalAbilities(animal: Animal) {
  const animalFlags = animal.flags
  if (animalFlags & AnimalFlags.HasClaws)
    console.log('animal has claws')

  if (animalFlags & AnimalFlags.CanFly)
    console.log('animal can fly')

  if (animalFlags === AnimalFlags.None)
    console.log('nothing')
}

const animal = { flags: AnimalFlags.None }
printAnimalAbilities(animal) // nothing
animal.flags |= AnimalFlags.HasClaws
printAnimalAbilities(animal) // animal has claws
animal.flags &= ~AnimalFlags.HasClaws
printAnimalAbilities(animal) // nothing
animal.flags |= AnimalFlags.HasClaws | AnimalFlags.CanFly
printAnimalAbilities(animal) // animal has claws, animal can fly
```

### Enum Index Signature

`keyof typeof EnumType`:

```ts
enum ColorPalette {
  red = '#f03e3e',
  pink = '#d7336c',
  grape = '#ae3ec9',
  violet = '#7048e8',
  indigo = '#4263eb',
  blue = '#1890ff',
  cyan = '#1098ad',
  teal = '#0ca678',
  green = '#37b24d',
  lime = '#74b816',
  yellow = '#f59f00',
  orange = '#f76707',
}

function hashString(name = '') {
  return name.length
}

function getColorByName(name = ''): string {
  const palette = Object.keys(ColorPalette)
  const colorIdx = hashString(name) % palette.length
  const paletteIdx = palette[colorIdx] as keyof typeof ColorPalette
  return ColorPalette[paletteIdx]
}
```

### Enum Internals

`const` enums don’t have representation at runtime,
its member values are used directly.

```ts
// Source code:
const enum NoYes {
  No,
  Yes,
}

function toGerman(value: NoYes) {
  switch (value) {
    case NoYes.No:
      return 'Neither'
    case NoYes.Yes:
      return 'Ja'
  }
}

// Compiles to:
function toGerman(value) {
  switch (value) {
    case 'No' /* No */:
      return 'Neither'
    case 'Yes' /* Yes */:
      return 'Ja'
  }
}
```

Non-const enums are objects:

```ts
// Source code:
enum Tristate {
  False,
  True,
  Unknown,
}

// Compiles to:
let Tristate
;(function (Tristate) {
  Tristate[(Tristate.False = 0)] = 'False'
  Tristate[(Tristate.True = 1)] = 'True'
  Tristate[(Tristate.Unknown = 2)] = 'Unknown'
})(Tristate || (Tristate = {}))

console.log(Tristate[0]) // 'False'
console.log(Tristate.False) // 0
console.log(Tristate[Tristate.False]) // 'False' because `Tristate.False == 0`
```

```ts
enum NoYes {
  No = 'NO!',
  Yes = 'YES!',
}

let NoYes
;(function (NoYes) {
  NoYes.No = 'NO!'
  NoYes.Yes = 'YES!'
})(NoYes || (NoYes = {}))
```

## Function

### Function Interface

```ts
interface ReturnString {
  (): string
}

declare const foo: ReturnString

const bar = foo() // bar 被推断为一个字符串
```

```ts
interface Complex {
  (foo: string, bar?: number, ...others: boolean[]): number
}
```

```ts
interface Overloaded {
  (foo: string): string
  (foo: number): number
}

// 实现接口的一个例子：
function stringOrNumber(foo: number): number
function stringOrNumber(foo: string): string
function stringOrNumber(foo: any): any {
  if (typeof foo === 'number')
    return foo * foo
  else if (typeof foo === 'string')
    return `hello ${foo}`
}

const overloaded: Overloaded = stringOrNumber

// 使用
const str = overloaded('') // str 被推断为 'string'
const num = overloaded(123) // num 被推断为 'number'
```

WangCai `extends` Dog `extends` Animal.
Animal => WangCai 是 Dog => Dog 的子类型:

- 函数参数的类型兼容是反向的, 称之为逆变.
- 返回值的类型兼容是正向的, 称之为协变.

### Arrow Function

在一个以 number 类型为参数，以 string 类型为返回值的函数中:

```ts
const simple: (foo: number) => string = foo => foo.toString()
```

### Function Overload

函数签名的类型重载:

- 多个重载签名和一个实现签名.
- 定义了重载签名, 则实现签名**对外不可见**.
- 实现签名必须兼容重载签名.

```ts
// 重载
function padding(all: number)
function padding(topAndBottom: number, leftAndRight: number)
function padding(top: number, right: number, bottom: number, left: number)
function padding(a: number, b?: number, c?: number, d?: number) {
  if (b === undefined && c === undefined && d === undefined) {
    b = c = d = a
  } else if (c === undefined && d === undefined) {
    c = a
    d = b
  }
  return {
    top: a,
    right: b,
    bottom: c,
    left: d,
  }
}

padding(1) // Okay: all
padding(1, 1) // Okay: topAndBottom, leftAndRight
padding(1, 1, 1, 1) // Okay: top, right, bottom, left
padding(1, 1, 1) // Error: Not a part of the available overloads
```

:::tip Function Overload

`TypeScript` 中的函数重载没有任何运行时开销.
它只允许你记录希望调用函数的方式,
并且编译器会检查其余代码.

:::

### Rest Parameters

```ts
type Arr = readonly unknown[]
function partialCall<T extends Arr, U extends Arr, R>(
  f: (...args: [...T, ...U]) => R,
  ...headArgs: T
) {
  return (...tailArgs: U) => f(...headArgs, ...tailArgs)
}

function foo(x: string, y: number, z: boolean) {}
const f1 = partialCall(foo, 100)
const f2 = partialCall(foo, 'hello', 100, true, 'oops')
const f3 = partialCall(foo, 'hello')

f3(123, true)
f3()
f3(123, 'hello')
```

### Function Types Design

- Input types tend to be **broader** than output types.
- **Optional** properties and **union** types are more common in parameter types.
- To reuse types between parameters and return types,
  introduce a canonical form (for return types) and a looser form (for parameters).

```ts
interface LngLat {
  lng: number
  lat: number
}

type LngLatLike = LngLat | { lon: number, lat: number } | [number, number]

interface Camera {
  center: LngLat
  zoom: number
  bearing: number
  pitch: number
}

interface CameraOptions extends Omit<Partial<Camera>, 'center'> {
  center?: LngLatLike
}

function createCamera(options: CameraOptions): Camera {
  return CameraFactory.create(options)
}
```

## Interface

```ts
interface Name {
  first: string
  second: string
}

let name: Name
name = {
  first: 'John',
  second: 'Doe',
}

name = {
  // Error: 'Second is missing'
  first: 'John',
}

name = {
  // Error: 'Second is the wrong type'
  first: 'John',
  second: 1337,
}
```

### Interface Function

- Use a method function for class instances (`this` binding to function).
- Use a property function otherwise.

```ts
interface HasBothFunctionTypes {
  method: () => string
  property: () => string
}
```

### Interface Implementation

Implementing interface is purely safety check,
does not copy any interface members onto class definition:

```ts
interface Crazy {
  new (): {
    hello: number
  }
}

class CrazyClass implements Crazy {
  constructor() {
    return { hello: 123 }
  }
}

// Because
const crazy = new CrazyClass() // crazy would be { hello:123 }
```

### Interface Extension

#### Overridden Properties

Overridden property must be assignable to its base property
(ensure derived interface assignable to base interface):

```ts
interface WithNullableName {
  name: string | null
}

interface WithNonNullableName extends WithNullableName {
  name: string
}

interface WithNumericName extends WithNullableName {
  name: number | string
}
// Error: Interface 'WithNumericName' incorrectly
// extends interface 'WithNullableName'.
//   Types of property 'name' are incompatible.
//     Type 'string | number' is not assignable to type 'string | null'.
//       Type 'number' is not assignable to type 'string'.
```

#### Interface Merging

Interface merging isn’t used often in day-to-day `TypeScript` development,
but useful for augmenting interfaces from
external 3rd-party packages (e.g `Cypress`) or built-in global interfaces (e.g `Window`):

```ts
// Lib a.d.ts
interface Point {
  x: number
  y: number
}
declare const myPoint: Point

// Lib b.d.ts
interface Point {
  z: number
}

// Your code
const z = myPoint.z // Allowed!
```

Extend 3rd-party module interface:

```ts
declare module '3rd-party-module' {
  export interface Interface {
    foo: { title: string }
  }
}
```

### Interface and Type Alias

- Type aliases may not participate in declaration merging, but interfaces can.
- Interfaces may only be used to declare the shapes of object, not re-name primitives.
- The key distinction is that a type cannot be re-opened to add new properties,
  an interface which is always extendable.

```ts
interface Window {
  title: string
}

interface Window {
  ts: TypeScriptAPI
}

const src = 'const a = "Hello World"'
window.ts.transpileModule(src, {})
```

## Type Modifiers

### Member Access Modifiers

`public`, `protected` and `private`:

```ts
class Singleton {
  private static instance: Singleton
  private constructor() {
    // ..
  }

  public static getInstance() {
    if (!Singleton.instance)
      Singleton.instance = new Singleton()

    return Singleton.instance
  }

  someMethod() {}
}

const someThing = new Singleton() // Error: constructor of 'singleton' is private

const instance = Singleton.getInstance() // do some thing with the instance
```

### Readonly Type Modifier

`readonly`:

```ts
interface Foo {
  readonly bar: number
  readonly bas: number
}

// 初始化
const foo: Foo = { bar: 123, bas: 456 }

// 不能被改变
foo.bar = 456 // Error: foo.bar 为仅读属性
```

`readonly` indexable signature:

```ts
type Foo = Readonly<Record<number, number>>

// 使用

const foo: Foo = { 0: 123, 2: 345 }
console.log(foo[0]) // ok (读取)
foo[0] = 456 // Error: 属性只读
```

`readonly` class properties:

```ts
class Foo {
  readonly bar = 1 // OK
  readonly baz: string
  constructor() {
    this.baz = 'hello' // OK
  }
}
```

`readonly` generic type:

```ts
interface Foo {
  bar: number
  bas: number
}

type FooReadonly = Readonly<Foo>

const foo: Foo = { bar: 123, bas: 456 }
const fooReadonly: FooReadonly = { bar: 123, bas: 456 }

foo.bar = 456 // ok
fooReadonly.bar = 456 // Error: bar 属性只读
```

`readonly` `React` props:

```ts
class Something extends React.Component<{ foo: number }, { baz: number }> {
  someMethod() {
    this.props.foo = 123 // Error: props 是不可变的
    this.state.baz = 456 // Error: 你应该使用 this.setState()
  }
}
```

`readonly` is shallow:

```ts
const dates: readonly Date[] = [new Date()]
dates.push(new Date()) // Error
dates[0].setFullYear(2037) // OK
```

## Call Signature

### Call Signature Type

Call signature looks similar to a function type,
but with a `:` colon instead of an `=>` arrow:

```ts
type FunctionAlias = (input: string) => number

interface CallSignature {
  (input: string): number
}

// Type: (input: string) => number
const typedFunctionAlias: FunctionAlias = input => input.length // Ok

// Type: (input: string) => number
const typedCallSignature: CallSignature = input => input.length // Ok
```

### Call Signature Property

Call signatures can be used to describe functions
that have some **additional user-defined property** on them:

```ts
interface FunctionWithCount {
  count: number
  (): void
}

let hasCallCount: FunctionWithCount

function keepsTrackOfCalls() {
  keepsTrackOfCalls.count += 1
  console.log(`I've been called ${keepsTrackOfCalls.count} times!`)
}

keepsTrackOfCalls.count = 0

hasCallCount = keepsTrackOfCalls // Ok

function doesNotHaveCount() {
  console.log('No idea!')
}

hasCallCount = doesNotHaveCount
// Error: Property 'count' is missing in type
// '() => void' but required in type 'FunctionWithCalls'
```

## Index Signature

For `JavaScript`,
implicitly calls `toString` on any object index signature:

```ts
const obj = {
  toString() {
    console.log('toString called')
    return 'Hello'
  },
}

const foo: any = {}
foo[obj] = 'World' // toString called
console.log(foo[obj]) // toString called, World
console.log(foo.Hello) // World
```

`TypeScript` will give an error to prevent beginners from doing such things,
throw **index signature error**:

```bash
Element implicitly has an 'any' type
because expression of type 'string' can't be used to index type XXX.
```

Can fixed with:

- `Record<string, T>`.
- `K extends keyof T`: explicit Constrained key type.

```ts
// propertyName should be extends keyof T
function getProperty<T, K extends keyof T>(o: T, propertyName: K): T[K] {
  return o[propertyName] // o[propertyName] is of type T[K]
}
```

### Index Signature Type Check

```ts
const x: { foo: number, [x: string]: any }
x = { foo: 1, baz: 2 } // ok, 'baz' 属性匹配于索引签名
```

当你声明一个索引签名时，所有明确的成员都必须符合索引签名:

```ts
// ok
interface Foo {
  [key: string]: number
  x: number
  y: number
}

// Error
interface Bar {
  [key: string]: number
  x: number
  y: string // Error: y 属性必须为 number 类型
}
```

使用交叉类型可以解决上述问题:

```ts
interface FieldState {
  value: string
}

type FormState = { isValid: boolean } & Record<string, FieldState>
```

### Select Index Types

```ts
type Index = 'a' | 'b' | 'c'
type FromIndex = { [k in Index]?: number }

const good: FromIndex = { b: 1, c: 2 }

// Error:
// `{ b: 1, c: 2, d: 3 }` 不能分配给 'FromIndex'
// 对象字面量只能指定已知类型，'d' 不存在 'FromIndex' 类型上
const bad: FromIndex = { b: 1, c: 2, d: 3 }
```

```ts
type FromSomeIndex<K extends string> = { [key in K]: number }
```

### Symbol Index Types

Since [typescript v4.4.0](https://github.com/microsoft/TypeScript/pull/44512):

```ts
type SymbolMap<T> = Record<symbol, T>
```

```ts
interface PropertyMap {
  [key: string]: string
  [key: number]: string
  [key: symbol]: string
}
```

```ts
type Colors = Record<symbol, number>

const red = Symbol('red')
const green = Symbol('green')
const blue = Symbol('blue')

const colors: Colors = {}

colors[red] = 255 // Assignment of a number is allowed
const redVal = colors[red] // 'redVal' has the type 'number'

colors[blue] = 'da ba dee' // Error: Type 'string' is not assignable to type 'number'.
```

### Template Literal Index Types

Since [typescript v4.4.0](https://github.com/microsoft/TypeScript/pull/44512):

```ts
type DataProps = Record<`data-${string}`, string>

interface OptionsWithDataProps extends Options {
  // Permit any property starting with 'data-'.
  [optName: `data-${string}`]: unknown
}

const b: OptionsWithDataProps = {
  'width': 100,
  'height': 100,
  'data-blah': true, // Works!
  'unknown-property': true, // Error! 'unknown-property' wasn't declared in 'OptionsWithDataProps'.
}
```

```ts
type Thing<T> = Record<'a' | `foo${T}` | symbol, string>

type StringThing = Thing<string>
// => { [a: string, [x: `foo${string}`]: string, [x: symbol]: string }
type BarThing = Thing<'bar'>
// => { [a: string, foobar: string, [x: symbol]: string }
```

### Indexed Access Types

```ts
const MyArray = [
  { name: 'Alice', age: 15 },
  { name: 'Bob', age: 23 },
  { name: 'Eve', age: 38 },
]

type Person = (typeof MyArray)[number]
// type Person = {
//   name: string;
//   age: number;
// }

type Age = (typeof MyArray)[number]['age']
// type Age = number

type Age2 = Person['age']
// type Age2 = number

interface UserRoleConfig {
  visitor: ['up']
  user: ['view', 'create', 'update']
  admin: ['view', 'create', 'update', 'delete']
}

type Role = UserRoleConfig[keyof UserRoleConfig][number]
// type Role = 'up' | 'view' | 'create' | 'update' | "delete"
```

`{ [K in keyof T]: indexedType }[keyof T]` 返回键名 (键名组成的联合类型):

```ts
type PickByValueType<T, ValueType> = Pick<
  T,
  { [K in keyof T]-?: T[K] extends ValueType ? K : never }[keyof T]
>

type OmitByValueType<T, ValueType> = Pick<
  T,
  { [K in keyof T]-?: T[K] extends ValueType ? never : K }[keyof T]
>

type RequiredKeys<T> = {
  [K in keyof T]-?: object extends Pick<T, K> ? never : K
}[keyof T]

type OptionalKeys<T> = {
  [K in keyof T]-?: object extends Pick<T, K> ? K : never
}[keyof T]

type FunctionTypeKeys<T extends object> = {
  [K in keyof T]-?: T[K] extends Function ? K : never
}[keyof T]

type Filter<T extends object, ValueType> = {
  [K in keyof T as ValueType extends T[K] ? K : never]: T[K]
} // Filter<{name: string; id: number;}, string> => {name: string;}

type FuncName<T> = {
  [K in keyof T]: T[K] extends Function ? K : never
}[keyof T]
```

## Literal Types

```ts
type CardinalDirection = 'North' | 'East' | 'South' | 'West'

function move(distance: number, direction: CardinalDirection) {
  // ...
}

move(1, 'North') // ok
move(1, 'Nurth') // Error

type OneToFive = 1 | 2 | 3 | 4 | 5
type Bools = true | false
```

```ts
interface Options {
  width: number
}

function configure(x: Options | 'auto') {
  // ...
}

configure({ width: 100 })
configure('auto')
configure('automatic')
// ERROR:
// Argument of type '"automatic"' is not assignable
// to parameter of type 'Options | "auto"'.
```

## Template Literal Types

### Basic Template Literal Types

Based on literal types:

```ts
type Brightness = 'dark' | 'light'
type Color = 'blue' | 'red'
type BrightnessAndColor = `${Brightness}-${Color}`
// Equivalent to: "dark-red" | "light-red" | "dark-blue" | "light-blue"

const colorOk: BrightnessAndColor = 'dark-blue' // Ok
const colorWrongStart: BrightnessAndColor = 'medium-blue'
//  ~~~~~~~~~~~~~~~
// Error: Type '"medium-blue"' is not assignable to type
// '"dark-blue" | "dark-red" | "light-blue" | "light-red"'.
const colorWrongEnd: BrightnessAndColor = 'light-green'
//  ~~~~~~~~~~~~~
// Error: Type '"light-green"' is not assignable to type
// '"dark-blue" | "dark-red" | "light-blue" | "light-red"'.
```

### Intrinsic Template Literal Types

4 intrinsic string manipulation types:

- `Uppercase<StringType>`.
- `Lowercase<StringType>`.
- `Capitalize<StringType>`.
- `Uncapitalize<StringType>`.

### Advanced Template Literal Types

Combined with other types:

```ts
type Greeting = `Hello${string}`
const matches: Greeting = 'Hello, world!' // Ok
const outOfOrder: Greeting = 'World! Hello!'
//  ~~~~~~~~~~
// Error: Type '"World! Hello!"' is not assignable to type '`Hello ${string}`'.
const missingAltogether: Greeting = 'hi'
//  ~~~~~~~~~~~~~~~~~
// Error: Type '"hi"' is not assignable to type '`Hello ${string}`'.

type ExtolNumber = `much ${number} wow`
function extol(extolArg: ExtolNumber) {
  /* ... */
}
extol('much 0 wow') // Ok
extol('much -7 wow') // Ok
extol('much 9.001 wow') // Ok
extol('much false wow')
//    ~~~~~~~~~~~~~~~~
// Error: Argument of type '"much false wow"' is not
// assignable to parameter of type '`much ${number} wow`'.
```

```ts
interface PropEventSource<Type> {
  on: <Key extends string & keyof Type>(
    eventName: `${Key}Changed`,
    callback: (newValue: Type[Key]) => void
  ) => void
}

// Create a "watched object" with an 'on' method
// so that you can watch for changes to properties.
declare function makeWatchedObject<Type>(
  obj: Type
): Type & PropEventSource<Type>

const person = makeWatchedObject({
  firstName: 'Yi',
  lastName: 'Long',
  age: 26,
})

person.on('firstNameChanged', (newName) => {
  // (parameter) newName: string
  console.log(`new name is ${newName.toUpperCase()}`)
})

person.on('ageChanged', (newAge) => {
  // (parameter) newAge: number
  if (newAge < 0)
    console.warn('warning! negative age')
})

// It's typo-resistant
person.on('firstName', () => {})
// Argument of type '"firstName"' is not assignable to
// parameter of type '"firstNameChanged" | "lastNameChanged" | "ageChanged"'.

person.on('fstNameChanged', () => {})
// Argument of type '"fstNameChanged"' is not assignable to
// parameter of type '"firstNameChanged" | "lastNameChanged" | "ageChanged"'.
```

### Mapped Template Literal Types

#### Template Literal Keys

```ts
type DataKey = 'location' | 'name' | 'year'

type ExistenceChecks = {
  [K in `check${Capitalize<DataKey>}`]: () => boolean
}
// Equivalent to:
// {
//   checkLocation: () => boolean;
//   checkName: () => boolean;
//   checkYear: () => boolean;
// }

function checkExistence(checks: ExistenceChecks) {
  checks.checkLocation() // Type: boolean
  checks.checkName() // Type: boolean
  checks.checkWrong()
  //     ~~~~~~~~~~
  // Error: Property 'checkWrong' does not exist on type 'ExistenceChecks'.
}
```

#### Remapping Mapped Type Keys

```ts
const config = {
  location: 'unknown',
  name: 'anonymous',
  year: 0,
}

type LazyValues = {
  [K in keyof typeof config as `${string & K}Lazy`]: () => Promise<
    (typeof config)[K]
  >
}
// Equivalent to:
// {
//   locationLazy: Promise<string>;
//   nameLazy: Promise<string>;
//   yearLazy: Promise<number>;
// }

async function withLazyValues(configGetter: LazyValues) {
  await configGetter.locationLazy // Resultant type: string
  await configGetter.missingLazy()
  //                 ~~~~~~~~~~~
  // Error: Property 'missingLazy' does not exist on type 'LazyValues'.
}
```

## Union Types

### Basic Union

```ts
function formatCommandLine(command: string[] | string) {
  let line = ''

  if (typeof command === 'string')
    line = command.trim()
  else
    line = command.join(' ').trim()

  // Do stuff with line: string
}
```

### Discriminated Union

```ts
interface Square {
  kind: 'square'
  size: number
}

interface Rectangle {
  kind: 'rectangle'
  width: number
  height: number
}

interface Circle {
  kind: 'circle'
  radius: number
}

type Shape = Square | Rectangle | Circle

function area(s: Shape) {
  switch (s.kind) {
    case 'square':
      return s.size * s.size
    case 'rectangle':
      return s.width * s.height
    case 'circle':
      return Math.PI * s.radius ** 2
    default: {
      const _exhaustiveCheck: never = s
      return _exhaustiveCheck
    }
  }
}
```

`IteratorResult` discriminated union:

```ts
interface IteratorYieldResult<TYield> {
  done?: false // boolean literal type
  value: TYield
}

interface IteratorReturnResult<TReturn> {
  done: true // boolean literal type
  value: TReturn
}

type IteratorResult<T, TReturn = any> =
  | IteratorYieldResult<T>
  | IteratorReturnResult<TReturn>
```

Rust-style discriminated union:

```ts
type Option<T> = Some<T> | None
interface Some<T> {
  kind: 'Some'
  value: T
}
interface None {
  kind: 'None'
}

type Result<TResult, TError> = Success<TResult> | Failure<TError>
interface Success<T> {
  kind: 'Success'
  value: T
}
interface Failure<T> {
  kind: 'Failure'
  error: T
}
```

Prefer `Unions of Interfaces` to `Interfaces of Unions`:

```ts
// BAD design.
interface BadLayer {
  layout: FillLayout | LineLayout | PointLayout
  paint: FillPaint | LinePaint | PointPaint
}

// GOOD design.
interface FillLayer {
  type: 'fill'
  layout: FillLayout
  paint: FillPaint
}

interface LineLayer {
  type: 'line'
  layout: LineLayout
  paint: LinePaint
}

interface PointLayer {
  type: 'point'
  layout: PointLayout
  paint: PointPaint
}

type GoodLayer = FillLayer | LineLayer | PointLayer
```

## Intersection Types

`intersection` type 具有所有类型的功能:

```ts
function extend<T, U>(first: T, second: U): T & U {
  const result = {} as T & U
  for (const id in first) {
    ;(result as T)[id] = first[id]
  }
  for (const id in second) {
    if (!Object.prototype.hasOwnProperty.call(result, id)) {
      ;(result as U)[id] = second[id]
    }
  }

  return result
}

const x = extend({ a: 'hello' }, { b: 42 })

// 现在 x 拥有了 a 属性与 b 属性
const a = x.a
const b = x.b
```

## Generic Types

### Generic Function

```ts
function reverse<T>(items: T[]): T[] {
  const toReturn = []
  for (let i = items.length - 1; i >= 0; i--)
    toReturn.push(items[i])

  return toReturn
}
```

### Generic Parameters

```ts
type Event =
  | {
    type: 'LogIn'
    payload: {
      userId: string
    }
  }
  | {
    type: 'SignOut'
  }

function sendEvent<Type extends Event['type']>(
  ...args: Extract<Event, { type: Type }> extends { payload: infer Payload }
    ? [type: Type, payload: Payload]
    : [type: Type]
) {
  // Send event ...
}
```

### Generic Class

```ts
// 创建一个泛型类
class Queue<T> {
  private data = []
  push = (item: T) => this.data.push(item)
  pop = (): T => this.data.shift()
}

// 简单的使用
const queue = new Queue<number>()
queue.push(0)
queue.push('1') // Error：不能推入一个 `string`，只有 number 类型被允许
```

```ts
interface Listener<T> {
  (event: T): any
}

interface Disposable {
  dispose: () => any
}

class TypedEvent<T> {
  private listeners: Listener<T>[] = []
  private listenersOnce: Listener<T>[] = []

  public on = (listener: Listener<T>): Disposable => {
    this.listeners.push(listener)

    return {
      dispose: () => this.off(listener),
    }
  }

  public once = (listener: Listener<T>): void => {
    this.listenersOnce.push(listener)
  }

  public off = (listener: Listener<T>) => {
    const callbackIndex = this.listeners.indexOf(listener)
    if (callbackIndex > -1)
      this.listeners.splice(callbackIndex, 1)
  }

  public emit = (event: T) => {
    this.listeners.forEach(listener => listener(event))

    this.listenersOnce.forEach(listener => listener(event))
    this.listenersOnce = []
  }

  public pipe = (te: TypedEvent<T>): Disposable => {
    return this.on(e => te.emit(e))
  }
}
```

### Generic Type Alias

```ts
type CreatesValue<Input, Output> = (input: Input) => Output

// Type: (input: string) => number
let creator: CreatesValue<string, number>

creator = text => text.length // Ok

creator = text => text.toUpperCase()
//                ~~~~~~~~~~~~~~~~~~
// Error: Type 'string' is not assignable to type 'number'.
```

### Generic Discriminated Union

```ts
type Result<Data> = FailureResult | SuccessfulResult<Data>

interface FailureResult {
  error: Error
  succeeded: false
}

interface SuccessfulResult<Data> {
  data: Data
  succeeded: true
}

function handleResult(result: Result<string>) {
  if (result.succeeded) {
    // Type of result: SuccessfulResult<string>
    console.log(`We did it! ${result.data}`)
  } else {
    // Type of result: FailureResult
    console.error(`Em... ${result.error}`)
  }

  console.log(result.data)
  //                 ~~~~
  // Error: Property 'data' does not exist on type 'Result<string>'.
  //   Property 'data' does not exist on type 'FailureResult'.
}
```

### Explicit Generic Types

```ts
class Foo<T> {
  foo: T
}

const FooNumber = Foo as { new (): Foo<number> } // ref 1

function id<T>(x: T) {
  return x
}

const idNum = id as { (x: number): number }
```

### Default Generic Types

```ts
interface Quote<T = string> {
  value: T
}

const explicit: Quote<number> = { value: 123 }
const implicit: Quote = {
  value: 'Be yourself. The world worships the original.',
}
const mismatch: Quote = { value: 123 }
//                                     ~~~
// Error: Type 'number' is not assignable to type 'string'.

interface KeyValuePair<Key, Value = Key> {
  key: Key
  value: Value
}

// Type: KeyValuePair<string, number>
const allExplicit: KeyValuePair<string, number> = {
  key: 'rating',
  value: 10,
}

// Type: KeyValuePair<string>
const oneDefaulting: KeyValuePair<string> = {
  key: 'rating',
  value: 'ten',
}

const firstMissing: KeyValuePair = {
  //            ~~~~~~~~~~~~
  // Error: Generic type 'KeyValuePair<Key, Value>'
  // requires between 1 and 2 type arguments.
  key: 'rating',
  value: 10,
}
```

### Constrained Generic Types

Constrained union types:

```ts
interface Lengthwise {
  length: number
}

function createList<T extends number | Lengthwise>(): T[] {
  return [] as T[]
}

const numberList = createList<number>() // ok
const stringList = createList<string>() // ok
const arrayList = createList<any[]>() // ok
const boolList = createList<boolean>() // error
```

Constrained template literal types:

```ts
type RemoveMapsHelper<T> = T extends `maps:${infer U}` ? U : T
type RemoveMaps<T> = {
  [K in keyof T as RemoveMapsHelper<K>]: T[K]
}

interface Data {
  'maps:longitude': string
  'maps:latitude': string
  'awesome': boolean
}
type ShapedData = RemoveMaps<Data>
// type ShapedData = {
//   longitude: string;
//   latitude: string;
//   awesome: boolean;
// }
```

Constrained index types:

```ts
function getValue<T, Key extends keyof T>(container: T, key: Key) {
  return container[key]
}

const roles = {
  favorite: 'Fargo',
  others: ['Almost Famous', 'Burn After Reading', 'NorthLand'],
}

const favorite = getValue(roles, 'favorite') // Type: string
const others = getValue(roles, 'others') // Type: string[]
const missing = getValue(roles, 'extras')
//                         ~~~~~~~~
// Error: Argument of type '"extras"' is not assignable
// to parameter of type '"favorite" | "others"'.

function getDeepValue<
  T,
  FirstKey extends keyof T,
  SecondKey extends keyof T[FirstKey],
>(target: T, firstKey: FirstKey, secondKey: SecondKey): T[FirstKey][SecondKey] {
  return target[firstKey][secondKey]
}

const target = {
  foo: {
    a: true,
    b: 2,
  },
  bar: {
    c: 'cool',
    d: 2,
  },
}

const result1 = getDeepValue(target, 'foo', 'a') // boolean
const result2 = getDeepValue(target, 'bar', 'c') // string
```

Constrained default types:

```ts
interface Props {
  a1: 'Foo'
  a2: 'Bar'
  a3: 'FooBar'
  b1: 'b1'
  b2: 'b2'
  b3: 'b3'
}

type ExtractValues<T, Keys extends keyof T = Extract<keyof T, `a${string}`>> = {
  [K in Keys]: T[K]
}[Keys]

type Values = ExtractValues<Props>
// type Values = 'Foo' | 'Bar' | 'FooBar'
```

### Generic Types Programming

在类型编程里, 泛型就是变量:

```ts
function pick<T extends object, U extends keyof T>(obj: T, keys: U[]): T[U][] {
  return keys.map(key => obj[key])
}
```

:::tip Generic Golden Rule

[Type `T` parameters should appear twice](https://effectivetypescript.com/2020/08/12/generics-golden-rule):

If a type parameter only appears in one location,
strongly **reconsider** if actually need it.

:::

## Conditional Types

- Basic conditional types
  just like `if else` statement.
- Nested conditional types
  just like `switch case` statement.
- Distributive conditional types
  just like `map` statement (`loop` statement) on `union` type.
- Conditional types make `TypeScript` become real programming type system:
  `TypeScript` type system is [Turing Complete](https://github.com/microsoft/TypeScript/issues/14833).

### Basic Conditional Types

```ts
interface Animal {
  live: () => void
}
interface Dog extends Animal {
  woof: () => void
}

type Example1 = Dog extends Animal ? number : string
// => type Example1 = number

type Example2 = RegExp extends Animal ? number : string
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
          : 'object'
```

### Index Conditional Types

Conditional types are able to access members of provided types:

```ts
interface QueryOptions {
  throwIfNotFound: boolean
}

type QueryResult<Options extends QueryOptions> =
  Options['throwIfNotFound'] extends true ? string : string | undefined

declare function retrieve<Options extends QueryOptions>(
  key: string,
  options?: Options
): Promise<QueryResult<Options>>

// Returned type: string | undefined
await retrieve('1')

// Returned type: string | undefined
await retrieve('2', { throwIfNotFound: Math.random() > 0.5 })

// Returned type: string
await retrieve('3', { throwIfNotFound: true })
```

### Mapped Conditional Types

```ts
type MakeAllMembersFunctions<T> = {
  [K in keyof T]: T[K] extends (...args: any[]) => any ? T[K] : () => T[K]
}

type MemberFunctions = MakeAllMembersFunctions<{
  alreadyFunction: () => string
  notYetFunction: number
}>
// Type:
// {
//   alreadyFunction: () => string,
//   notYetFunction: () => number,
// }
```

### Distributive Conditional Types

Type distributivity:

- Conditional types in which checked type is `naked type parameter` are called DCT.
- DCT are automatically distributed over union types during instantiation.
- When conditional types act on a generic type,
  they become distributive when given a union type.
- `( A | B | C ) extends T ? X : Y` 相当于
  `(A extends T ? X : Y) | (B extends T ? X : Y) | (B extends T ? X : Y)`.
- 没有被额外包装的联合类型参数, 在条件类型进行判定时会将联合类型分发, 分别进行判断.

```ts
// "string" | "function"
type T1 = TypeName<string | (() => void)>

// "string" | "object"
type T2 = TypeName<string | string[]>

// "object"
type T3 = TypeName<string[] | number[]>
```

```ts
type Naked<T> = T extends boolean ? 'Y' : 'N'
type Wrapped<T> = [T] extends [boolean] ? 'Y' : 'N'

/*
 * 先分发到 Naked<number> | Naked<boolean>
 * 结果是 "N" | "Y"
 */
type Distributed = Naked<number | boolean>

/*
 * 不会分发 直接是 [number | boolean] extends [boolean]
 * 结果是 "N"
 */
type NotDistributed = Wrapped<number | boolean>
```

## Moving Types

### Typeof Types

```ts
// 捕获字符串的类型与值
const foo = 'Hello World'

// 使用一个捕获的类型
let bar: typeof foo

// bar 仅能被赋值 'Hello World'
bar = 'Hello World' // ok
bar = 'anything else' // Error
```

### Keyof Types

`keyof foo` get literal types of `foo` keys (`Object.keys`):

```ts
const colors = {
  red: 'red',
  blue: 'blue',
}

type Colors = keyof typeof colors

let color: Colors // color 的类型是 'red' | 'blue' (literal types)
color = 'red' // ok
color = 'blue' // ok
color = 'anythingElse' // Error
```

## Mapped Types

### Builtin Mapped Types

- [Builtin mapped types](https://github.com/microsoft/TypeScript/blob/7d60dc1f5db04cc01cba2e1def292432fa41a7ee/src/lib/es5.d.ts#L1468-L1612).

### Basic Mapped Types

```ts
type Readonly<T> = { readonly [P in keyof T]: T[P] }
type Partial<T> = { [P in keyof T]?: T[P] }
type ReadonlyPartial<T> = { readonly [P in keyof T]?: T[P] }
type Required<T> = { [P in keyof T]-?: T[P] }
type Nullable<T> = { [P in keyof T]: T[P] | null }
type NonNullable<T> = T extends null | undefined ? never : T
type Clone<T> = { [P in keyof T]: T[P] }
type Stringify<T> = { [P in keyof T]: string }
```

### Union Mapped Types

With distributive conditional type:

```ts
type Extract<T, U> = T extends U ? T : never
type Exclude<T, U> = T extends U ? never : T
```

### Key Mapped Types

```ts
type Pick<T, K extends keyof T> = { [P in K]: T[P] }
type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>
type Record<K extends keyof any, T> = { [P in K]: T }
```

### Function Mapped Types

```ts
type Parameters<T extends (...args: any) => any> = T extends (
  ...args: infer P
) => any
  ? P
  : never

type ConstructorParameters<T extends new (...args: any) => any> =
  T extends new (...args: infer P) => any ? P : never

type ReturnType<T extends (...args: any) => any> = T extends (
  ...args: any[]
) => infer R
  ? R
  : any

type InstanceType<T extends new (...args: any) => any> = T extends new (
  ...args: any
) => infer R
  ? R
  : any

type ThisParameterType<T> = T extends (this: infer U, ...args: any[]) => any
  ? U
  : unknown
```

### Custom Mapped Types

Combine with:

- `in keyof`.
- `readonly`.
- `?`.
- `-`.
- `as`.
- Template literal types.
- Conditional types.
- Builtin types.
- Other mapped types.
- Other custom types.

```ts
// Removes 'readonly' attributes from a type's properties
type Mutable<T> = {
  -readonly [K in keyof T]: T[K]
}

type DeepImmutable<T> = {
  readonly [K in keyof T]: keyof T[K] extends undefined ? T[K] : Immutable<T[K]>
}

interface LockedAccount {
  readonly id: string
  readonly name: string
}

type UnlockedAccount = Mutable<LockedAccount>
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
  >}`]: () => Type[Property]
}

interface Person {
  name: string
  age: number
  location: string
}

type LazyPerson = Getters<Person>
// type LazyPerson = {
//   getName: () => string;
//   getAge: () => number;
//   getLocation: () => string;
// }
```

```ts
// Remove the 'kind' property
type RemoveKindField<Type> = {
  [Property in keyof Type as Exclude<Property, 'kind'>]: Type[Property]
}

interface Circle {
  kind: 'circle'
  radius: number
}

type KindlessCircle = RemoveKindField<Circle>
// type KindlessCircle = {
//   radius: number;
// }
```

```ts
// Mapped type via conditional type
type ExtractPII<Type> = {
  [Property in keyof Type]: Type[Property] extends { pii: true } ? true : false
}

interface DBFields {
  id: { format: 'incrementing' }
  name: { type: string, pii: true }
}

type ObjectsNeedingGDPRDeletion = ExtractPII<DBFields>
// type ObjectsNeedingGDPRDeletion = {
//   id: false;
//   name: true;
// }
```

## Utility Types

### Null Types

```ts
type Nullish = null | undefined
type Nullable<T> = T | null
type NonUndefinedable<A> = A extends undefined ? never : A
type NonNullable<T> = T extends null | undefined ? never : T
```

### Boolean Types

```ts
type Falsy = false | '' | 0 | null | undefined
const isFalsy = (val: unknown): val is Falsy => !val
```

### Primitive Types

```ts
type Primitive = string | number | boolean | bigint | symbol | null | undefined

function isPrimitive(val: unknown): val is Primitive {
  if (val === null || val === undefined)
    return true

  const typeDef = typeof val

  const primitiveNonNullishTypes = [
    'string',
    'number',
    'bigint',
    'boolean',
    'symbol',
  ]

  return primitiveNonNullishTypes.includes(typeDef)
}
```

### Promise Types

```ts
// TypeScript 4.5.
// Get naked Promise<T> type.
type Awaited<T> = T extends Promise<infer U> ? Awaited<U> : T

// A = string.
type A = Awaited<Promise<string>>

// B = number.
type B = Awaited<Promise<Promise<number>>>

// C = boolean | number.
type C = Awaited<boolean | Promise<number>>
```

```ts
type Sync<T> = {
  [K in keyof T]: T[K] extends (...args: any[]) => Promise<infer Result>
    ? (...args: Parameters<T[K]>) => Result
    : T[K]
}

interface AsyncInterface {
  compute: (arg: number) => Promise<boolean>
  createString: () => Promise<string>
}

type SyncInterface = Sync<AsyncInterface>
// type SyncInterface = {
//     compute: (arg: number) => boolean;
//     createString: () => String;
// }
```

Better types for [`Promise.all()`](https://spin.atomicobject.com/better-promise-all):

```ts
type ShallowPromisify<T> =
  T extends Array<infer V>
    ? Array<Promise<V>>
    : T extends object
      ? { [K in keyof T]: Promise<T[K]> }
      : Promise<T>

type ShallowSettled<T> =
  T extends Array<infer V>
    ? Array<PromiseSettledResult<V>>
    : T extends object
      ? { [K in keyof T]: PromiseSettledResult<T[K]> }
      : PromiseSettledResult<T>

type DeepAwaited<T> =
  T extends Promise<infer U>
    ? DeepAwaited<U>
    : T extends Array<infer V>
      ? Array<DeepAwaited<V>>
      : T extends object
        ? { [K in keyof T]: DeepAwaited<T[K]> }
        : T

type DeepSettled<T> =
  T extends Promise<infer U>
    ? PromiseSettledResult<DeepSettled<U>>
    : T extends Array<infer V>
      ? Array<DeepSettled<V>>
      : T extends object
        ? { [K in keyof T]: DeepSettled<T[K]> }
        : T
```

### Proxy Types

```ts
interface Proxy<T> {
  get: () => T
  set: (value: T) => void
}

type Proxify<T> = { [P in keyof T]: Proxy<T[P]> }
```

### Recursive Types

```ts
type DeepReadonly<T> = {
  +readonly [P in keyof T]: T[P] extends object ? DeepReadonly<T[P]> : T[P]
}

type DeepMutable<T> = {
  -readonly [P in keyof T]: T[P] extends object ? DeepMutable<T[P]> : T[P]
}

type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P]
}

type DeepRequired<T> = {
  [P in keyof T]-?: T[P] extends object | undefined ? DeepRequired<T[P]> : T[P]
}
```

### Nominal Brand Types

[Nominal type system](https://github.com/microsoft/TypeScript/issues/202):

```ts
interface FooId extends string {
  _fooIdBrand: string
}

interface BarId extends string {
  _barIdBrand: string
}

let fooId: FooId
let barId: BarId

// 类型安全
fooId = barId // error
barId = fooId // error
fooId = barId as FooId // error
barId = fooId as BarId // error
```

```ts
const typeSym = Symbol('type')
const valueSym = Symbol('value')

type Brand<B extends string, T> = T extends
| undefined
| null
| number
| boolean
| bigint
  ? { [typeSym]: B, [valueSym]: T }
  : T & { [typeSym]: B }

type Flavor<F extends string, T> = T & {
  [typeSym]?: F
}
```

### Lodash Types

```ts
type Flatten<Type> = Type extends Array<infer Item> ? Item : Type
```

## Type Inference

类型系统在获得足够的信息后,
能将 [`infer`](https://github.com/microsoft/TypeScript/pull/21496) 后跟随的类型参数推导出来,
最后返回这个推导结果:

```ts
type Parameters<T extends (...args: any) => any> = T extends (
  ...args: infer P
) => any
  ? P
  : never

type ConstructorParameters<T extends new (...args: any) => any> =
  T extends new (...args: infer P) => any ? P : never

type ReturnType<T extends (...args: any) => any> = T extends (
  ...args: any[]
) => infer R
  ? R
  : any

type InstanceType<T extends new (...args: any) => any> = T extends new (
  ...args: any
) => infer R
  ? R
  : any
```

在协变位置上, 若同一个类型变量存在多个候选者, 则最终的类型将被推断为联合类型:

```ts
type PropertyType<T> = T extends { id: infer U, name: infer U } ? U : never

type InferType = PropertyType<{
  id: number
  name: string
}>
// string | number
```

在逆变位置上, 若同一个类型变量存在多个候选者, 则最终的类型将被推断为交叉类型:

```ts
type PropertyType<T> = T extends {
  a: (x: infer U) => void
  b: (x: infer U) => void
}
  ? U
  : never

type InferType = PropertyType<{
  a: (x: string) => void
  b: (x: number) => void
}>
// string & number

type UnionToIntersection<U> = (
  U extends any ? (arg: U) => void : never
) extends (arg: infer R) => void
  ? R
  : never

type UnionType = { a: 'a' } | { b: 'b' }
type IntersectionType = UnionToIntersection<UnionType>
// { a: 'a' } & { b: 'b' }
```

## Type Guard

### In Type Guard

```ts
interface Fish {
  swim: () => void
}
interface Bird {
  fly: () => void
}

function move(animal: Fish | Bird) {
  if ('swim' in animal)
    return animal.swim()

  return animal.fly()
}
```

### Instance Type Guard

```ts
function logValue(x: Date | string) {
  if (x instanceof Date)
    console.log(x.toUTCString())
  else
    console.log(x.toUpperCase())
}
```

### TypeOf Type Guard

```ts
function fn(x: string | number) {
  if (typeof x === 'string')
    return x.length
  else
    return x + 1
}
```

```ts
function getScore(value: number | string): number {
  switch (typeof value) {
    case 'number':
      // %inferred-type: number
      return value + 1
    case 'string':
      // %inferred-type: string
      return value.length
    default:
      throw new Error(`Unsupported value: ${value}`)
  }
}
```

```ts
function contains(text: string, terms: string | string[]) {
  const termList = Array.isArray(terms) ? terms : [terms]
  console.log(termList) // string[]
}
```

### Discriminated Union Type Guard

```ts
interface Teacher {
  kind: 'Teacher'
  teacherId: string
}

interface Student {
  kind: 'Student'
  studentId: string
}

type Attendee = Teacher | Student

function getId(attendee: Attendee) {
  switch (attendee.kind) {
    case 'Teacher':
      // %inferred-type: { kind: "Teacher"; teacherId: string; }
      return attendee.teacherId
    case 'Student':
      // %inferred-type: { kind: "Student"; studentId: string; }
      return attendee.studentId
    default:
      throw new Error('Unsupported type')
  }
}
```

### Never Type Guard

- The `never` type is assignable to every type.
- No type is assignable to `never` (except `never` itself).

```ts
interface Triangle {
  kind: 'triangle'
  sideLength: number
}

type Shape = Circle | Square | Triangle

function getArea(shape: Shape) {
  switch (shape.kind) {
    case 'circle':
      return Math.PI * shape.radius ** 2
    case 'square':
      return shape.sideLength ** 2
    default: {
      // Type 'Triangle' is not assignable to type 'never'.
      const _exhaustiveCheck: never = shape
      return _exhaustiveCheck
    }
  }
}
```

:::tip Never and Void

- 当一个函数返回空值时, 它的返回值为 `void` 类型.
- 当一个函数**永不返回**时 (或者总是抛出错误), 它的返回值为 `never` 类型.
- 在 `strictNullChecking` 为 `false` 时, `void` 类型可以被赋值.
- 除了 `never` 本身以外, 其他任何类型不能赋值给 `never`.

```ts
function fail(message: string): never {
  throw new Error(`Invariant failure: ${message}.`)
}

function workWithUnsafeParam(param: unknown) {
  if (typeof param !== 'string')
    fail(`Param should be a string, not ${typeof param}`)

  // Here, param is known to be type string
  param.toUpperCase() // Ok
}
```

:::

### Exhaustiveness Check

Exhaustiveness check using `never` in `switch` statement:

```ts
class UnsupportedValueError extends Error {
  constructor(value: never) {
    super(`Unsupported value: ${value}`)
  }
}

function toGerman4(value: NoYesStrings): string {
  switch (value) {
    case 'Yes':
      return 'Ja'
    default:
      // @ts-expect-error: Argument of type '"No"'
      // is not assignable to parameter of type 'never'. (2345)
      throw new UnsupportedValueError(value)
  }
}
```

### Excess Property Check

Excess property check:
types check on assigning object literal to variable/function parameter.

```ts
interface Room {
  numDoors: number
  ceilingHeightFt: number
}

const r: Room = {
  numDoors: 1,
  ceilingHeightFt: 10,
  elephant: 'present',
  // Excess property check:
  // Object literal may only specify known properties,
  // and 'elephant' does not exist in type 'Room'.
}

enterRoom({
  numDoors: 1,
  ceilingHeightFt: 10,
  elephant: 'present',
})
// Excess property check:
// Object literal may only specify known properties,
// and 'elephant' does not exist in type 'Room'.

// Normal structural types check
const obj = {
  numDoors: 1,
  ceilingHeightFt: 10,
  elephant: 'present',
}

// OK
const r: Room = obj
```

### Type Predicate Signature

`is` keyword for `value` type predicate:

```ts
type Falsy = false | '' | 0 | null | undefined

const isFalsy = (val: unknown): val is Falsy => !val

const isDefined = <T>(x: T | undefined): x is T => x !== undefined
```

```ts
function isNotNullish<T>(value: T): value is NonNullable<T> {
  return value !== undefined && value !== null
}

// %inferred-type: (number | null | undefined)[]
const mixedValues = [1, undefined, 2, null]

// %inferred-type: number[]
const numbers = mixedValues.filter(isNotNullish)
```

```ts
/**
 * A partial implementation of the `typeof` operator.
 */
function isTypeof(value: any, typeString: 'boolean'): value is boolean
function isTypeof(value: any, typeString: 'number'): value is number
function isTypeof(value: any, typeString: 'string'): value is string

const value: unknown = {}

if (isTypeof(value, 'boolean')) {
  // %inferred-type: boolean
  console.log(value)
}
```

## Type Assertion

### As Assertion

```ts
let foo: any
const bar = foo as string // 现在 bar 的类型是 'string'

function handler(event: Event) {
  const mouseEvent = event as MouseEvent
}
```

### Const Assertion

```ts
const v1 = {
  x: 1,
  y: 2,
} // { x: number; y: number; }

const v2 = {
  x: 1 as const,
  y: 2,
} // { x: 1; y: number; }

const v3 = {
  x: 1,
  y: 2,
} as const // { readonly x: 1; readonly y: 2; }

const a1 = [1, 2, 3] // number[]

const a2 = [1, 2, 3] as const // readonly [1, 2, 3]
```

Const assertion `readonly` tuples are convenient for function returns
(returned tuples are often destructured immediately):

```ts
// Return type: readonly [string, number]
function firstCharAndSizeAsConst(input: string) {
  return [input[0], input.length] as const
}

// firstChar type: string
// size type: number
const [firstChar, size] = firstCharAndSizeAsConst('Sabertaz')
```

### Assertion Signature

Boolean assertion signature

```ts
function assert(condition: any, msg?: string): asserts condition {
  if (!condition)
    throw new AssertionError(msg)
}

function yell(str) {
  assert(typeof str === 'string')
  return str.toUppercase()
  //         ~~~~~~~~~~~
  // error: Property 'toUppercase' does not exist on type 'string'.
  //        Did you mean 'toUpperCase'?
}
```

String assertion signature

```ts
function assertIsString(val: any): asserts val is string {
  if (typeof val !== 'string')
    throw new AssertionError('Not a string!')
}

function yell(str: any) {
  assertIsString(str)
  // Now TypeScript knows that 'str' is a 'string'.
  return str.toUppercase()
  //         ~~~~~~~~~~~
  // error: Property 'toUppercase' does not exist on type 'string'.
  //        Did you mean 'toUpperCase'?
}
```

Generics assertion signature

```ts
function assertIsDefined<T>(val: T): asserts val is NonNullable<T> {
  if (val === undefined || val === null) {
    throw new AssertionError(
      `Expected 'val' to be defined, but received ${val}`
    )
  }
}
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
  private static api_version: string

  // class method parameters
  private handleFormSubmit1(@decorator myParam: string) {}

  // class methods
  @decorator
  private handleFormSubmit2() {}

  // accessors
  @decorator
  public myAccessor() {
    return this.privateProperty
  }
}
```

### Decorators Pros

- 实现 Open-closed 原则.
- 分离辅助性功能逻辑 (Before/After 钩子, Trace, Log, Report, Debounce/Throttle)
  与业务逻辑.
- 抽象公有功能函数.
- 装饰器模式是 Class 继承的一个替代模式.
  (类似于组合模式)

### Legacy Stage 2 Decorators

#### Class Decorators

```ts
function classDecorator(options: any[]) {
  return (target) => {
    // ...
  }
}

@classDecorator
class Component {}
```

```ts
function inject(options: { api_version: string }) {
  // returns the class decorator implementation
  return (target) => {
    // `target` will give us access to the entire class prototype
    target.apiVersion = options.api_version
  }
}

function deprecated(target) {
  console.log(`
    this class is deprecated and will be removed
    in a future version of the app
  `)
  console.log(`@: ${target}`)
}

@inject({
  api_version: '0.3.4',
})
@deprecated
class MyComponent extends React.Component<Props> {
  static apiVersion: string
}
```

#### Class Properties Decorators

first parameter `target` will be
`class prototype` for normal properties
and `class constructor` for static properties.

```ts
function prop(target, name) {
  // ...
}

function staticProp(constructor, name) {
  // ...
}

class MyComponent extends React.Component<Props> {
  @prop
  public member: string

  @staticProp
  public static apiVersion: string
}
```

#### Method Parameters Decorators

`@uppercase`/`@lowercase` for string parameters,
`@rounded` for number parameters.

```ts
function decorator<T>(classPrototype: T, name: string, index: int) {
  // ...
}

class MyComponent extends React.Component<Props> {
  private handleMethod(@decorator param1: string) {
    // ...
  }
}
```

#### Methods Decorators

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
    // ...
  }
}

class MyComponent extends React.Component {
  @methodDecorator
  handleSomething() {
    // ...
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
    propertyDescriptor.enumerable = enumerable
  }
}

class MyComponent extends React.Component {
  @enumerable(false)
  handleSomething() {
    // ...
  }
}
```

### Modern Stage 3 Decorators

```ts
type Decorator = (value: Input, context: {
  kind: string
  name: string | symbol
  access: {
    get?: () => unknown
    set?: (value: unknown) => void
  }
  private?: boolean
  static?: boolean
  addInitializer: (initializer: () => void) => void
}) => Output | void

type ClassDecorator = (value: Function, context: {
  kind: 'class'
  name: string | undefined
  addInitializer: (initializer: () => void) => void
}) => Function | void

type ClassMethodDecorator = (value: Function, context: {
  kind: 'method'
  name: string | symbol
  access: { get: () => unknown }
  static: boolean
  private: boolean
  addInitializer: (initializer: () => void) => void
}) => Function | void

type ClassGetterDecorator = (value: Function, context: {
  kind: 'getter'
  name: string | symbol
  access: { get: () => unknown }
  static: boolean
  private: boolean
  addInitializer: (initializer: () => void) => void
}) => Function | void

type ClassSetterDecorator = (value: Function, context: {
  kind: 'setter'
  name: string | symbol
  access: { set: (value: unknown) => void }
  static: boolean
  private: boolean
  addInitializer: (initializer: () => void) => void
}) => Function | void

type ClassFieldDecorator = (value: undefined, context: {
  kind: 'field'
  name: string | symbol
  access: { get: () => unknown, set: (value: unknown) => void }
  static: boolean
  private: boolean
  addInitializer: (initializer: () => void) => void
}) => (initialValue: unknown) => unknown | void

type ClassAutoAccessorDecorator = (
  value: {
    get: () => unknown
    set: (value: unknown) => void
  },
  context: {
    kind: 'accessor'
    name: string | symbol
    access: { get: () => unknown, set: (value: unknown) => void }
    static: boolean
    private: boolean
    addInitializer: (initializer: () => void) => void
  }
) => {
  get?: () => unknown
  set?: (value: unknown) => void
  init?: (initialValue: unknown) => unknown
} | void
```

### Decorators Execution Order

- 不同级装饰器:
  1. 实例成员: (参数 > 方法) -> 访问器 -> 属性 装饰器 (按顺序).
  2. 静态成员: (参数 > 方法) -> 访问器 -> 属性 装饰器 (按顺序).
  3. 构造器: 参数装饰器.
  4. 类装饰器.
- 同级装饰器: 先从外到内进入，然后由内向外执行.

```ts
function f(key: string): any {
  return function () {
    console.log('执行: ', key)
  }
}

@f('8. 类')
class C {
  @f('4. 静态属性')
  static prop?: number

  @f('5. 静态方法')
  static method(@f('6. 静态方法参数') foo) {}

  constructor(@f('7. 构造器参数') foo) {
    super(foo)
  }

  @f('2. 实例方法')
  method(@f('1. 实例方法参数') foo) {}

  @f('3. 实例属性')
  prop?: number
}

// "执行: ",  "1. 实例方法参数"
// "执行: ",  "2. 实例方法"
// "执行: ",  "3. 实例属性"
// "执行: ",  "4. 静态属性"
// "执行: ",  "6. 静态方法参数"
// "执行: ",  "5. 静态方法"
// "执行: ",  "7. 构造器参数"
// "执行: ",  "8. 类"
```

```ts
function dec(id) {
  console.log('装饰器初始化', id)

  return function (target, property, descriptor) {
    console.log('装饰器执行', id)
  }
}

class Example {
  @dec(1)
  @dec(2)
  method() {}
}

// 装饰器初始化 1
// 装饰器初始化 2
// 装饰器执行 2
// 装饰器执行 1
```

### Reflect Metadata

IoC and DI implementation:

```ts
const INJECTIONS = new WeakMap()

function createInjections() {
  const injections = []

  function injectable(Class) {
    INJECTIONS.set(Class, injections)
  }

  function inject(injectionKey) {
    return function applyInjection(v, context) {
      injections.push({ injectionKey, set: context.access.set })
    }
  }

  return { injectable, inject }
}

class Container {
  registry = new Map()

  register(injectionKey, value) {
    this.registry.set(injectionKey, value)
  }

  lookup(injectionKey) {
    this.registry.get(injectionKey)
  }

  create(Class) {
    const instance = new Class()

    for (const { injectionKey, set } of INJECTIONS.get(Class) || [])
      set.call(instance, this.lookup(injectionKey))

    return instance
  }
}

class Store {}

const { injectable, inject } = createInjections()

@injectable
class C {
  @inject('store') store
}

const container = new Container()
const store = new Store()

container.register('store', store)

const c = container.create(C)

c.store === store // true
```

AOP programming:

```ts
const PATH_METADATA = 'path'
const METHOD_METADATA = 'method'

function Controller(path: string): ClassDecorator {
  return (target) => {
    Reflect.defineMetadata(PATH_METADATA, path, target)
  }
}

function createMappingDecorator(method: string) {
  return (path: string): MethodDecorator => {
    return (target, key, descriptor) => {
      Reflect.defineMetadata(PATH_METADATA, path, descriptor.value)
      Reflect.defineMetadata(METHOD_METADATA, method, descriptor.value)
    }
  }
}

const Get = createMappingDecorator('GET')
const Post = createMappingDecorator('POST')

function mapRoute(instance: object) {
  const prototype = Object.getPrototypeOf(instance)

  // 筛选出类的 methodName
  const methodsNames = Object.getOwnPropertyNames(prototype).filter(
    item => !isConstructor(item) && isFunction(prototype[item])
  )
  return methodsNames.map((methodName) => {
    const fn = prototype[methodName]

    // 取出定义的 metadata
    const route = Reflect.getMetadata(PATH_METADATA, fn)
    const method = Reflect.getMetadata(METHOD_METADATA, fn)

    return {
      route,
      method,
      fn,
      methodName,
    }
  })
}

@Controller('/test')
class SomeClass {
  @Get('/a')
  someGetMethod() {
    return 'hello world'
  }

  @Post('/b')
  somePostMethod() {}
}

Reflect.getMetadata(PATH_METADATA, SomeClass) // '/test'

mapRoute(new SomeClass())
/**
 * [{
 *    route: '/a',
 *    method: 'GET',
 *    fn: someGetMethod() { ... },
 *    methodName: 'someGetMethod'
 *  },{
 *    route: '/b',
 *    method: 'POST',
 *    fn: somePostMethod() { ... },
 *    methodName: 'somePostMethod'
 * }]
 *
 */
```

## Type System

`TypeScript` type system:

- Structural type system: type checking focuses on shape (`Duck Typing`).
- [Turing complete](https://github.com/microsoft/TypeScript/issues/14833) type system.
- `TypeScript` type system models `JavaScript` runtime behavior
  and spot out runtime exception.

### Covariant

Covariant (协变性):

Type `T` is **covariant** if having `S <: P`,
then `T<S> <: T<P>`.

```ts
type IsSubtype<S, P> = S extends P ? true : false

type T1 = IsSubtype<Admin, User>
// type T1 = true

type T2 = IsSubtype<Promise<Admin>, Promise<User>>
// type T2 = true

type T3 = IsSubtype<'Hello', string>
// type T3 = true

type T4 = IsSubtype<Capitalize<'Hello'>, Capitalize<string>>
// type T4 = true
```

### Contravariant

Contravariant (逆变性):

Type `T` is **contravariant** if having `S <: P`,
then `T<P> <: T<S>`.

```ts
type IsSubtype<S, P> = S extends P ? true : false

type Func<Param> = (param: Param) => void

type T1 = IsSubtype<Admin, User>
// type T1 = true

type T2 = IsSubtype<Func<Admin>, Func<User>>
// type T2 = false

type T3 = IsSubtype<Func<User>, Func<Admin>>
// type T3 = true
```

```ts
const logAdmin: Func<Admin> = (admin: Admin): void => {
  console.log(`Name: ${admin.userName}`)
  console.log(`Is super admin: ${admin.isSuperAdmin.toString()}`)
}

const logUser: Func<User> = (user: User): void => {
  console.log(`Name: ${user.userName}`)
}

const admin = new Admin('admin1', true)

let logger: Func<Admin>

logger = logUser
logger(admin) // OK

logger = logAdmin
logger(admin) // OK

const user = new User('user1')

let logger: Func<User>

logger = logUser
logger(user) // OK

logger = logAdmin
// Type 'Func<Admin>' is not assignable to type 'Func<User>'.
//   Property 'isSuperAdmin' is missing in type 'User' but required in type 'Admin'.
logger(user) // Oops! `user.isSuperAdmin` is undefined.
```

:::tip Function Types

函数类型中:

- 参数类型为逆变.
- 返回值类型为协变.

:::

:::tip Array Types

- 允许不变的列表 (`Immutable`) 在它的参数类型上是协变的:
  `ConstList<Dog>` 为 `ConstList<Animal>` 的子类型.
- 对于可变的列表 (`Mutable`), 其参数类型则必须是不变的 (`Invariant`):
  既不是协变也不是逆变, 才能保证类型安全.

:::

### Type Gymnastics

#### Type Gymnastics Programming

[Type programming](https://exploringjs.com/tackling-ts/ch_computing-with-types-overview.html):

| Level         | Environment  | Operands       | Operations    |
| ------------- | ------------ | -------------- | ------------- |
| Program level | Runtime      | Values         | Functions     |
| Type level    | Compile time | Specific types | Generic types |

| `TypeScript` Term         | Set Term                 |
| ------------------------- | ------------------------ |
| `never`                   | `∅` (Empty set)          |
| Literal type              | Single element set       |
| `Value` assignable to `T` | `Value ∈ T` (Member)     |
| `T1` assignable to `T2`   | `T1 ⊆ T2` (Subset)       |
| `T1 extends T2`           | `T1 ⊆ T2` (Subset)       |
| `T1 \| T2`                | `T1 ∪ T2` (Union)        |
| `T1 & T2`                 | `T1 ∩ T2` (Intersection) |
| `unknown`                 | Universal set            |

#### Type Gymnastics Tools

- [Template literal types](#template-literal-types).
- [Index signature](#index-signature).
- [Mapped types](#mapped-types).
- [Conditional types](#conditional-types):
  - [Nested conditional types](#nested-conditional-types).
  - [Index conditional types](#index-conditional-types).
  - [Mapped conditional types](#mapped-conditional-types).
  - [Distributive conditional types](#distributive-conditional-types).
- `infer` [inference types](#type-inference).
- `...` [rest types](#rest-parameters): `Items extends [infer Head, ...infer Tail]`.
- [Recursive types](#recursive-types).

#### Type Gymnastics Examples

- `PathOf<Form>` complex recursive [types](https://mp.weixin.qq.com/s/KJdUdwbLN4g4M7xy34m-fA).
- Type-safe React router advanced [types](https://speakerdeck.com/zoontek/advanced-typescript-how-we-made-our-router-typesafe).

```tsx
type PathSegments<Path extends string> =
  Path extends `${infer SegmentA}/${infer SegmentB}`
    ? ParamOnly<SegmentA> | PathSegments<SegmentB>
    : ParamOnly<Path>
type ParamOnly<Segment extends string> = Segment extends `:${infer Param}`
  ? Param
  : never
type RouteParams<Path extends string> = {
  [Key in PathSegments<Path>]: string
}

interface RouteProps<Path extends string> {
  path: Path
  render: (routeProps: { match: { params: RouteParams<Path> } }) => void
}

export default function App() {
  return (
    <Route
      path="/user/:username"
      render={(routeProps) => {
        const params = routeProps.match.params
      }}
    />
  )
}
```

#### Type Gymnastics Reference

- Type [challenges](https://github.com/type-challenges/type-challenges).
- Type [gymnastics](https://github.com/g-plane/type-gymnastics).
- Type [trident](https://github.com/anuraghazra/type-trident).

## TypeScript Internals

### TypeScript Compiler

[Compiler](https://github.com/Microsoft/TypeScript/tree/main/src/compiler):

- Scanner 扫描器 (`scanner.ts`)
- Parser 解析器 (`parser.ts`).
- Binder 绑定器 (`binder.ts`).
- Checker 检查器 (`checker.ts`).
- Emitter 发射器 (`emitter.ts`).

```bash
Source Code ~~Scanner~~> Tokens
Tokens ~~Parser~~> AST
AST ~~Binder~~> Symbols
AST + Symbols ~~Checker~~> Type Validation
AST + Checker ~~Emitter~~> JavaScript
```

#### TypeScript Scanner

```ts
// 单例扫描器
const scanner = ts.createScanner(ts.ScriptTarget.Latest, /* 忽略杂项 */ true)

// 此函数与初始化使用的 `initializeState` 函数相似
function initializeState(text: string) {
  scanner.setText(text)
  scanner.setOnError((message: ts.DiagnosticMessage, length: number) => {
    console.error(message)
  })
  scanner.setScriptTarget(ts.ScriptTarget.ES5)
  scanner.setLanguageVariant(ts.LanguageVariant.Standard)
}

// 使用示例
initializeState(`const foo = 123;`.trim())

// 开始扫描
let token = scanner.scan()

while (token !== ts.SyntaxKind.EndOfFileToken) {
  console.log(ts.formatSyntaxKind(token))
  token = scanner.scan()
}
```

#### TypeScript Parser

```bash
程序 ->
    CompilerHost.getSourceFile ->
        (全局函数 parser.ts).createSourceFile ->
            Parser.parseSourceFile
```

```ts
function printAllChildren(node: ts.Node, depth = 0) {
  console.log(
    Array.from({ length: depth + 1 }, (num, i) => i).join('----'),
    ts.formatSyntaxKind(node.kind),
    node.pos,
    node.end
  )
  depth++
  node.getChildren().forEach(c => printAllChildren(c, depth))
}

const sourceCode = `const foo = 123;`.trim()
const sourceFile = ts.createSourceFile(
  'foo.ts',
  sourceCode,
  ts.ScriptTarget.ES5,
  true
)
printAllChildren(sourceFile)
```

#### TypeScript Binder

```bash
program.getTypeChecker ->
    ts.createTypeChecker（检查器中）->
        initializeTypeChecker（检查器中） ->
            for each SourceFile `ts.bindSourceFile`（绑定器中）
            for each SourceFile `ts.mergeSymbolTable`（检查器中）
```

#### TypeScript Checker

初始化检查器:

```bash
program.getTypeChecker ->
    ts.createTypeChecker（检查器中）->
        initializeTypeChecker（检查器中） ->
            for each SourceFile `ts.bindSourceFile`（绑定器中）
            for each SourceFile `ts.mergeSymbolTable`（检查器中）
```

真正的类型检查会在调用 `getDiagnostics` 时才发生:

```bash
program.emit ->
    emitWorker (program local) ->
        createTypeChecker.getEmitResolver ->
            // 第一次调用下面的几个 createTypeChecker 的本地函数
            call getDiagnostics ->
                getDiagnosticsWorker ->
                    checkSourceFile

            // 接着
            return resolver
            // 通过对本地函数 createResolver() 的调用，resolver 已在 createTypeChecker 中初始化。
```

#### TypeScript Emitter

```bash
Program.emit ->
    `emitWorker` （在 program.ts 中的 createProgram） ->
        `emitFiles` （emitter.ts 中的函数）
```

### TypeScript Internals API

```ts
// Path of the file we want to analyze.
// It's important that @types/react is installed in the same package.
const filePath = 'example.jsx'

// Make sure to analyze .js/.jsx files.
const options = {
  allowJs: true,
  jsx: 'preserve',
}

// Create a TypeScript compilation environment.
const host = ts.createCompilerHost(options)

// Parse and analyze our file, along with dependencies.
const program = ts.createProgram([filePath], options, host)
const sourceFile = program.getSourceFile(filePath)
const checker = program.getTypeChecker()

const detectedComponents = []

for (const statement of sourceFile.statements) {
  if (ts.isVariableStatement(statement)) {
    for (const declaration of statement.declarationList.declarations) {
      // 🚀 This is where the magic happens.
      const type = checker.getTypeAtLocation(declaration.name)

      // A type that has call signatures is a function type.
      for (const callSignature of type.getCallSignatures()) {
        const returnType = callSignature.getReturnType()

        if (returnType.symbol?.getEscapedName().toString() === 'Element')
          detectedComponents.push(declaration.name.text)
      }
    }
  }
}

console.log(detectedComponents)
// ["Foo", "Bar"]
```

## TypeScript Reference

- [Learning TypeScript](https://github.com/LearningTypeScript/projects)
- [Tackling TypeScript](https://exploringjs.com/tackling-ts/index.html)
- [TypeScript Deep Dive](https://github.com/basarat/typescript-book)
- [Clean TypeScript Code](https://github.com/labs42io/clean-code-typescript)
- [Effective TypeScript](https://github.com/danvk/effective-typescript)
