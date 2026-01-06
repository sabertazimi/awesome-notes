---
sidebar_position: 18
tags: [Web, TypeScript, Internals]
---

# Internals

## Type System

`TypeScript` type system:

- Structural type system: type checking focuses on shape (`Duck Typing`).
- [Turing complete](https://github.com/microsoft/TypeScript/issues/14833) type system.
- `TypeScript` type system models `JavaScript` runtime behavior
  and spot out runtime exception.

## Covariant

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

## Contravariant

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

:::tip[Function Types]

函数类型中:

- 参数类型为逆变.
- 返回值类型为协变.

:::

:::tip[Array Types]

- 允许不变的列表 (`Immutable`) 在它的参数类型上是协变的:
  `ConstList<Dog>` 为 `ConstList<Animal>` 的子类型.
- 对于可变的列表 (`Mutable`), 其参数类型则必须是不变的 (`Invariant`):
  既不是协变也不是逆变, 才能保证类型安全.

:::

## Type Gymnastics

### Type Gymnastics Programming

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

### Type Gymnastics Tools

- [Template literal types](./literal.md#template-literal-types).
- [Index signature](./signature.md#index-signature).
- [Mapped types](./mapped.md).
- [Conditional types](./conditional.md):
  - [Nested conditional types](./conditional.md#nested-conditional-types).
  - [Index conditional types](./conditional.md#index-conditional-types).
  - [Mapped conditional types](./conditional.md#mapped-conditional-types).
  - [Distributive conditional types](./conditional.md#distributive-conditional-types).
- `infer` [inference types](./narrowing.md#type-inference).
- `...` [rest types](./function.md#rest-parameters): `Items extends [infer Head, ...infer Tail]`.
- [Recursive types](./utility.md#recursive-types).

### Type Gymnastics Examples

- `PathOf<Form>` complex recursive [types](https://mp.weixin.qq.com/s/KJdUdwbLN4g4M7xy34m-fA).
- Type-safe React router advanced [types](https://speakerdeck.com/zoontek/advanced-typescript-how-we-made-our-router-typesafe).

```tsx
type PathSegments<Path extends string>
  = Path extends `${infer SegmentA}/${infer SegmentB}`
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

### Type Gymnastics Reference

- Type [challenges](https://github.com/type-challenges/type-challenges).
- Type [gymnastics](https://github.com/g-plane/type-gymnastics).
- Type [trident](https://github.com/anuraghazra/type-trident).

## TSC Workflow

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

### TypeScript Scanner

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

### TypeScript Parser

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

### TypeScript Binder

```bash
program.getTypeChecker ->
    ts.createTypeChecker（检查器中）->
        initializeTypeChecker（检查器中） ->
            for each SourceFile `ts.bindSourceFile`（绑定器中）
            for each SourceFile `ts.mergeSymbolTable`（检查器中）
```

### TypeScript Checker

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

### TypeScript Emitter

```bash
Program.emit ->
    `emitWorker` （在 program.ts 中的 createProgram） ->
        `emitFiles` （emitter.ts 中的函数）
```

## TypeScript Internals API

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
