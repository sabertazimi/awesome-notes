
# Functional Programming Basic Notes

<!-- TOC -->

- [Functional Programming Basic Notes](#functional-programming-basic-notes)
  - [Lambda Calculus](#lambda-calculus)
    - [Lambda-expresion (Lamba-term)](#lambda-expresion-lamba-term)
    - [Lambda Reduction](#lambda-reduction)
      - [alpha | α 转换](#alpha--α-转换)
      - [beta | β 归约](#beta--β-归约)
      - [eta | η 归约](#eta--η-归约)
    - [Church Numerals](#church-numerals)
  - [Defination for Functionanl Programming](#defination-for-functionanl-programming)
  - [Datatype](#datatype)
    - [Datatype Binding](#datatype-binding)
    - [Built-in Tagged Constructor](#built-in-tagged-constructor)
    - [Type Constructor](#type-constructor)
  - [Pattern Matching](#pattern-matching)
  - [Tail Position, Tail expression, Tail Call and Tail Recursion](#tail-position-tail-expression-tail-call-and-tail-recursion)
  - [Rules for expressions](#rules-for-expressions)
    - [samples](#samples)
  - [Standard ML](#standard-ml)
    - [functions](#functions)
    - [tuples](#tuples)
    - [lists](#lists)
    - [let expressions](#let-expressions)
    - [options](#options)
    - [boolean operations](#boolean-operations)
    - [closure](#closure)
      - [lexical scope vs dynamic scope](#lexical-scope-vs-dynamic-scope)
      - [compose and pipeline](#compose-and-pipeline)
      - [curry and uncurry](#curry-and-uncurry)
  - [Type inference](#type-inference)

<!-- /TOC -->

## Lambda Calculus

### Lambda-expresion (Lamba-term)

- Variable: x
- Abstraction: λx.M
- Application: M N

> e.g. λx.y λx.(λy.xy)

- 变量 x 本身就是一个有效的lambda项
- 如果 t 是一个lambda项，而 x 是一个变量，则 λx.t 是一个lambda项（称为lambda抽象）
- 如果 t 和 s 是lambda项，那么 (ts) 是一个lambda项（称为应用）

### Lambda Reduction

#### alpha | α 转换

`α: λx.x ≡ λy.y` 等价变量替换

#### beta | β 归约

`β: ((λV.E) E′) ≡ E[V := E′]` 函数抽象应用(apply)于参数的过程

#### eta | η 归约

`λx.M x ≡ M` 用于清除lambda表达式中存在的冗余函数抽象

### Church Numerals

按照皮亚诺公理可得自然数集合表示为 `{0, S(0), S(S(0)), ...}`, 于是得到如下定义:

```haskell
S ≡ λn.λf.λx.f (n f x)

0 ≡ λf.λx.x
1 ≡ λf.λx.f x
2 ≡ λf.λx.f (f x)
3 ≡ λf.λx.f (f (f x))
...
```

对后继函数S和丘奇数的简单验证如下：

```haskell
S 0
≡ (λn.λf.λx.f (n f x)) λf.λx.x
= (λn.λg.λy.g (n g y)) λf.λx.x    // alpha
= (λf.λx.f (n f x))[n := λf.λx.x] // beta
= λg.λy.g ((λf.λx.x) g y)         // substitute
= λg.λy.g (x[f := g, x := y])     // beta
= λg.λy.g y                       // substitute
= λf.λx.f x                       // alpha
≡ 1
```

## Defination for Functionanl Programming

- avoid mutation
- first class functions
- recursive data structures and recursive functions
- laziness

## Datatype

### Datatype Binding

tagged union, every constructor name as tag,
fields for different constructors can't exist at the same time

### Built-in Tagged Constructor

- NONE
- SOME i
- []
- x :: xs (infix constructor)
- ()

### Type Constructor

type constructor: datatype bindings with variables

```haskell
datatype 'a mylist = EMPTY | CONS of 'a * 'a mylist
mylist isn't a type, int list is a type
```

- 'a , 'a equivalent/different
- 'a, 'b different
- ''a, ''a equivalent

## Pattern Matching

- null/isSome check tag part（variant）
- hd/tl/valOf check data part (extract data)

```haskell
case e of
      p1 => e1
    | pn => en

val p = e (* declare multiple variables once time in p(pattern) *)

(* declare multiple callee arguments(hidden to caller) once time in p(pattern) *)
fun foo p = e
```

In SML, all functions only take 1 argument, a tuple/record:

fun f (x, y, z) = x + y + z seems that takes 3 arguments,
but truly owing to pattern matching only takes 1 tuple argument
Likewise, fun f () = 0 takes 1 empty tuple argument.

Futher more, tuples is syntactic sugar for records.

> As a whole: all functions only take 1 record argument owing to pattern matching.

## Tail Position, Tail expression, Tail Call and Tail Recursion

recursive defination for Tail Position:

- if E isn't in tail position, then sub expressions of E aren't in tail position
- if E is in tail position, then some sub expressions of E are in tail position

```haskell
if eb then e1 else e2
```

is in tail position, then e1 and e2 are in tail position, not eb

```haskell
f (x, e)
```

is in tail position, then f is in tail position(tail call), not x and e

```haskell
fun factorial n =
    let
        fun aux(n, acc) =
            if
                n = 0
            then
                acc
            else
                aux (n-1, n*acc)
    in
        aux (n,1)
    end
```

## Rules for expressions

- Syntactic: syntax rules
- Semantic: type checking rules
- Runtime: evaluation rules

### samples

```haskell
syntax: if e1 then e2 else e3
type: e1 = bool,  e2 = e3 = any
evaluation: e1 ? e2 : e3
```

## Standard ML

### functions

```haskell
syntax: fun name (arg1: type1, .., argn: typen) = body
type: name = type1 * ... * typen -> body_type
lazy evaluation
```

### tuples

```haskell
(* tuples *)
syntax: e = (e1, ..., en)
type: e1 * ... * en (can become fun's arguments list)
evaluation: #1 e, #2 e, ..., #n e
```

### lists

```haskell
(* lists *)
syntax: l = [e1, ..., en]
type: [] = elem_type list; hd(head) l = elem_type, tl(tail) x = elem_type list
evaluation: cons = e :: l; null [] = false;

> 6 :: [1, 3, 5]
```

### let expressions

```haskell
syntax: let
            b1 b2 ... bn
        in
            body
        end
type: whole let type = body_type
evaluation: whole let result = body_result
```

### options

- NONE  : type = 'a option
- SOME e: type = `e_type` option
- isSome: type = 'a option -> bool
- valOf : type = 'a option -> 'a

### boolean operations

- e1 andalso e2: keyword
- e1 orelse e2 : keyword
- not e1       : bool -> bool
- `=`(equal) `<>`(not equal) `>` `<` `>=` `<=`: require two same type elem

### closure

#### lexical scope vs dynamic scope

- lexical scope: function where defined
- dynamic scope: function where called

#### compose and pipeline

```haskell
fun sqrt_of_abs = Math.sqrt o Real.fromInt o abs

infix !>
fun x !> f = f x

fun sqrt_of_abs i = i !> abs !> Real.fromInt !> Math.sqrt
```

#### curry and uncurry

```haskell
fun carry f x y = f (x, y)
fun uncarry f (x, y) = f x y

fun range (i, j) = if i > j then [] else i :: range(i+1, j)
fun countup = curry range 1

val arr = countup 7 (* maps to [1, 2, ..., 7] *)
```

## Type inference
