---
author: Sabertazimi
authorTitle: Web Developer
authorURL: https://github.com/sabertazimi
authorImageURL: https://github.com/sabertazimi.png
tags: [Language, Rust]
---

# Rust Basic Notes

[TOC]

## Rust Toolchain

### Rust Installation

```bash
curl --proto '=https' --tlsv1.2 https://sh.rustup.rs -sSf | sh
```

### Cargo Basis

```bash
cargo new hello_world
cargo run
cargo build
cargo run --release
cargo build --release
cargo check
cargo generate-lockfile
```

```bash
cargo fmt --check
cargo clippy
cargo test
```

```bash
cargo install cargo-edit
cargo install cargo-release
cargo install cargo-tarpaulin
cargo install cargo-watch
cargo install cargo-workspaces
```

Cargo release configuration:

```toml
[workspace.metadata.release]
# cargo install cargo-release
# cargo release -x
sign-commit = true
sign-tag = true
release = false
push = false
publish = false
shared-version = true
pre-release-commit-message = "chore(release): {{version}}"
post-release-commit-message = "chore(release): {{version}}"
tag-message = "{{tag_name}}"
```

### Rust GitHub Action

```yml
name: CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

env:
  CARGO_TERM_COLOR: always

jobs:
  test:
    name: Test Suite
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v2
      - name: Install Rust toolchain
        uses: actions-rs/toolchain@v1
        with:
          toolchain: stable
          profile: minimal
          override: true
      - uses: actions-rs/cargo@v1
        with:
          command: test
          args: --all-features --workspace

  rustfmt:
    name: Rustfmt
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v2
      - name: Install Rust toolchain
        uses: actions-rs/toolchain@v1
        with:
          toolchain: stable
          profile: minimal
          override: true
          components: rustfmt
      - name: Check formatting
        uses: actions-rs/cargo@v1
        with:
          command: fmt
          args: --all -- --check

  clippy:
    name: Clippy
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v2
      - name: Install Rust toolchain
        uses: actions-rs/toolchain@v1
        with:
          toolchain: stable
          profile: minimal
          override: true
          components: clippy
      - name: Clippy check
        uses: actions-rs/cargo@v1
        with:
          command: clippy
          args: --all-targets --all-features --workspace -- -D warnings

  docs:
    name: Docs
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v2
      - name: Install Rust toolchain
        uses: actions-rs/toolchain@v1
        with:
          toolchain: stable
          profile: minimal
          override: true
      - name: Check documentation
        env:
          RUSTDOCFLAGS: -D warnings
        uses: actions-rs/cargo@v1
        with:
          command: doc
          args: --no-deps --document-private-items --all-features --workspace

  publish-dry-run:
    name: Publish dry run
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v2
      - name: Install Rust toolchain
        uses: actions-rs/toolchain@v1
        with:
          toolchain: stable
          profile: minimal
          override: true
      - uses: actions-rs/cargo@v1
        with:
          command: publish
          args: --dry-run

  coverage:
    name: Code coverage
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v2
      - name: Install Rust toolchain
        uses: actions-rs/toolchain@v1
        with:
          toolchain: stable
          profile: minimal
          override: true
      - name: Run cargo-tarpaulin
        uses: actions-rs/tarpaulin@v0.1
        with:
          args: '--all-features --workspace --ignore-tests --out Lcov'
      - name: Upload to Coveralls
        # upload only if push
        if: ${{ github.event_name == 'push' }}
        uses: coverallsapp/github-action@v1
        with:
          github-token: ${{ secrets.GITHUB_TOKEN }}
          path-to-lcov: './lcov.info'
```

## Rust Ownership

### Copy Trait

Copyable type (implement `Copy` trait):

- Integer type.
- Bool type.
- Float type.
- Char type.
- Copyable Tuple type, e.g `(i32, i32)`.
- Reference type (**borrowing** ownership).

```rust
fn main() {
    // Primitive type.
    let a = 5;
    let b = a;

    // Reference type.
    let x: &str = "hello, world";
    let y = x;

    // Deep clone on `non-Copy` type.
    let s1 = String::from("hello");
    let s2 = s1.clone();

    // Correct.
    println!("a = {}, b = {}", a, b);
    println!("x = {}, y = {}", x, y);
    println!("s1 = {}, s2 = {}", s1, s2);
}
```

```rust
fn main() {
    let s1 = String::from("hello");
    let s2 = s1;

    // Error[E0382]: use of moved value: `s1`.
    // Move occurs because `s1` has type `std::string::String`,
    // which does not implement the `Copy` trait.
    println!("{}, world!", s1);
}
```

### Reference Type

Borrowing ownership with reference type:

- At same time, only one mutable reference or multiple immutable reference.
- Reference should be valid (rustc will report dangling reference error).

```rust
fn main() {
    let s1 = String::from("hello");
    let len = calculate_length(&s1);
    println!("The length of '{}' is {}.", s1, len);
}

fn calculate_length(s: &String) -> usize {
    s.len()
    // Leave function without drop `s`,
    // due to `s` not owner string.
}
```

Mutable reference:

- Only one mutable reference for a value in a scope).
- Can't mutable borrow an already immutable borrowed value.

```rust
fn main() {
    let mut s = String::from("hello");
    change(&mut s);
}

fn change(some_string: &mut String) {
    some_string.push_str(", world");
}
```

```rust
fn main() {
   let mut s = String::from("hello");

    let r1 = &s;
    let r2 = &s;
    let r3 = &mut s;

    // Error.
    println!("{}, {} and {}", r1, r2, r3);
    // End of r1 and r2 borrowing.

    // Correct.
    let r4 = &mut s;
    println!("{}", r4);
}
```

## String Type

`&str` string slice type:

- Borrowing type.
- UTF-8 encode (1 ~ 4 bytes).
- String literal is `&str` type.

```rust
let s = String::from("hello world");
let len = s.len();

let hello = &s[0..5];
let world = &s[6..11];
let slice1 = &s[0..2];
let slice2 = &s[..2];
let slice3 = &s[4..len];
let slice4 = &s[4..];
let slice5 = &s[0..len];
let slice6 = &s[..];
```

`String` type:

- Ownership type.
- UTF-8 encode (1 ~ 4 bytes).

```rust
fn main() {
    let mut s = String::new();
    s.push_str("hello,world");
    s.push('!');
    assert_eq!(s,"hello,world!");

    let mut s = "hello,world".to_string();
    s.push('!');
    assert_eq!(s,"hello,world!");

    let mut s = String::from("你好, 世界");
    s.push('!');
    assert_eq!(s,"你好, 世界!");

    let s1 = String::from("hello,");
    let s2 = String::from("world!");
    let s3 = s1 + &s2;
    assert_eq!(s3,"hello,world!");

    for c in "中国人".chars() {
        println!("{}", c);
    }
}
```

## Struct Type

```rust
struct User {
    active: bool,
    username: String,
    email: String,
    sign_in_count: u64,
}

fn build_user(email: String, username: String) -> User {
    User {
        email,
        username,
        active: true,
        sign_in_count: 1,
    }
}

let user1 = User {
    email: String::from("someone@example.com"),
    username: String::from("username123"),
    active: true,
    sign_in_count: 1,
};

let user2 = User {
    email: String::from("another@example.com"),
    ..user1
};

// Tuple Struct.
struct Color(i32, i32, i32);
struct Point(i32, i32, i32);
let black = Color(0, 0, 0);
let origin = Point(0, 0, 0);

// Unit-like Struct.
struct AlwaysEqual;
let subject = AlwaysEqual;
impl SomeTrait for AlwaysEqual {}
```

## Enum Type

```rust
enum Message {
    Quit,
    Move { x: i32, y: i32 },
    Write(String),
    ChangeColor(i32, i32, i32),
}

fn main() {
    let m1 = Message::Quit;
    let m2 = Message::Move{x: 1, y: 1};
    let m3 = Message::ChangeColor(255, 255, 0);
}
```

```rust
enum Option<T> {
    Some(T),
    None,
}

fn plus_one(x: Option<i32>) -> Option<i32> {
    match x {
        None => None,
        Some(i) => Some(i + 1),
    }
}

let five = Some(5);
let six = plus_one(five);
let none = plus_one(None);
```

## Array Type

```rust
let a: [i32; 5] = [1, 2, 3, 4, 5];
let b = [3; 5];
let slice: &[i32] = &a[1..3];
assert_eq!(slice, &[2, 3]);

fn main() {
  let one             = [1, 2, 3];
  let two: [u8; 3]    = [1, 2, 3];
  let blank1          = [0; 3];
  let blank2: [u8; 3] = [0; 3];

  let arrays: [[u8; 3]; 4]  = [one, two, blank1, blank2];

  for a in &arrays {
    print!("{:?}: ", a);

    for n in a.iter() {
      print!("\t{} + 10 = {}", n, n+10);
    }

    let mut sum = 0;

    for i in 0..a.len() {
      sum += a[i];
    }

    println!("\t({:?} = {})", a, sum);
  }
}
```

## Flow Control

### If Statement

`if` expression:

```rust
let number = if condition {
    5
} else {
    6
};
```

`if let` expression:

```rust
let o = Some(3);
let v = if let Some(x) = o {
    x
} else {
    0
};
```

### Loop Statement

#### For Loop Statement

```rust
for i in 1..=5 {}
for _ in 0..10 {}
for item in collection {}
for item in &collection {}
for item in &mut collection {}
for (i, v) in collection.iter().enumerate() {}
```

#### While Loop Statement

```rust
fn main() {
    let mut n = 0;

    while n <= 5  {
        println!("{}!", n);
        n = n + 1;
    }
}
```

#### Loop Expression

```rust
fn main() {
    let mut counter = 0;

    let result = loop {
        counter += 1;

        if counter == 10 {
            break counter * 2;
        }
    };

    println!("The result is {}", result);
}
```

## Pattern Matching

```rust
match target {
    pattern1 => expression1,
    pattern2 => {
        statement1;
        statement2;
        expression2
    },
    _ => expression3
}

if let pattern = target {
    statement;
    expression
}

while let pattern = target {
    statement;
}
```

### Enum Pattern Matching

```rust
enum Action {
    Say(String),
    MoveTo(i32, i32),
    ChangeColorRGB(u16, u16, u16),
}

fn main() {
    let actions = [
        Action::Say("Hello Rust".to_string()),
        Action::MoveTo(1,2),
        Action::ChangeColorRGB(255,255,0),
    ];

    for action in actions {
        match action {
            Action::Say(s) => {
                println!("{}", s);
            },
            Action::MoveTo(x, y) => {
                println!("point from (0, 0) move to ({}, {})", x, y);
            },
            Action::ChangeColorRGB(r, g, _) => {
                println!("change color into '(r:{}, g:{}, b:0)', 'b' has been ignored",
                    r, g,
                );
            }
        }
    }
}
```

### Tuple Pattern Matching

```rust
fn main() {
    let numbers = (2, 4, 8, 16, 32);

    match numbers {
        (first, .., last) => {
            println!("Some numbers: {}, {}", first, last);
        },
    }
}
```

### Struct Pattern Matching

```rust
struct Point {
    x: i32,
    y: i32,
    z: i32,
}

fn main() {
    let p = Point { x: 0, y: 7, z: 0 };
    let Point { x: a, y: b, z: c } = p;
    assert_eq!(0, a);
    assert_eq!(7, b);
    assert_eq!(0, c);

    let origin = Point { x: 0, y: 0, z: 0 };
    match origin {
        Point { x, .. } => println!("x is {}", x),
    }
}
```

```rust
fn main() {
    let p = Point { x: 0, y: 7 };

    match p {
        Point { x, y: 0 } => println!("On the x axis at {}", x),
        Point { x: 0, y } => println!("On the y axis at {}", y),
        Point { x, y } => println!("On neither axis: ({}, {})", x, y),
    }
}
```

### Match Guard

Combine pattern matching and `if` expression:

```rust
let num = Some(4);

match num {
    Some(x) if x < 5 => println!("less than five: {}", x),
    Some(x) => println!("{}", x),
    None => (),
}
```

### Match Assignment

Combine pattern matching and `@` expression:

```rust
enum Message {
    Hello { id: i32 },
}

let msg = Message::Hello { id: 5 };

match msg {
    Message::Hello { id: id_variable @ 3..=7 } => {
        println!("Found an id in range: {}", id_variable)
    },
    Message::Hello { id: 10..=12 } => {
        println!("Found an id in another range")
    },
    Message::Hello { id } => {
        println!("Found some other id: {}", id)
    },
}
```

```rust
struct Point {
    x: i32,
    y: i32,
}

fn main() {
    let p @ Point {x: px, y: py } = Point {x: 10, y: 23};
    println!("x: {}, y: {}", px, py);
    println!("{:?}", p);

    let point = Point {x: 10, y: 5};
    if let p @ Point {x: 10, y} = point {
        println!("x is 10 and y is {} in {:?}", y, p);
    } else {
        println!("x was not 10 :(");
    }
}
```

## Method

```rust
struct Circle {
    x: f64,
    y: f64,
    radius: f64,
}

impl Circle {
    fn new(x: f64, y: f64, radius: f64) -> Circle {
        Circle {
            x,
            y,
            radius,
        }
    }

    fn area(&self) -> f64 {
        std::f64::consts::PI * (self.radius * self.radius)
    }
}
```

```rust
enum Message {
    Quit,
    Move { x: i32, y: i32 },
    Write(String),
    ChangeColor(i32, i32, i32),
}

impl Message {
    fn call(&self) {}
}

fn main() {
    let m = Message::Write(String::from("hello"));
    m.call();
}
```

### Self

- `self`: 所有权转移.
- `&self`: 不可变借用.
- `&mut self`: 可变借用.

```rust
pub struct Rectangle {
    width: u32,
    height: u32,
}

impl Rectangle {
    pub fn new(width: u32, height: u32) -> Self {
        Rectangle { width, height }
    }
    pub fn width(&self) -> u32 {
        return self.width;
    }
    pub fn height(&self) -> u32 {
        return self.height;
    }
}

fn main() {
    let rect = Rectangle::new(30, 50);
    println!("{}", rect.width());
    println!("{}", rect.height());
}
```

## Generics

```rust
enum Option<T> {
    Some(T),
    None,
}

enum Result<T, E> {
    Ok(T),
    Err(E),
}

struct Point<T> {
    x: T,
    y: T,
}

impl<T> Point<T> {
    fn x(&self) -> &T {
        &self.x
    }

    fn mixup<U>(self, other: Point<U>) {}
}

impl Point<f32> {
    fn distance_from_origin(&self) -> f32 {
        (self.x.powi(2) + self.y.powi(2)).sqrt()
    }
}


fn add<T: std::ops::Add<T, Output = T>>(a:T, b:T) -> T {
    a + b
}

fn largest<T: PartialOrd>(list: &[T]) -> T {}
```

## Traits

```rust
pub struct Post {
    pub username: String,
    pub content: String
}

pub trait Summary {
    fn summarize_author(&self) -> String;

    fn summarize(&self) -> String {
        format!("(Read more from {}...)", self.summarize_author())
    }
}

impl Summary for Post {
    fn summarize_author(&self) -> String {
        format!("@{}", self.username)
    }
}

fn main() {
    let post = Post{username: "username".to_string(),content: "content".to_string()};
    println!("1 new post: {}", post.summarize());
}
```

### Orphan Rule

Rust can’t implement external traits on external types:
can’t implement the `Display` trait on `Vec<T>` in `some_package` crate,
because `Display` and `Vec<T>` are **both** defined out of `some_package`.
This restriction is part of a property of programs called coherence,
ensures that other people’s code can’t break your code and vice versa.

### Trait Bound

```rust
fn notify(item: &impl Summary) {}
fn notify(item: &(impl Summary + Display)) {}
fn notify<T: Summary>(item: &T) {}
fn notify<T: Summary + Display>(item: &T) {}
fn notify<T, U>(t: &T, u: &U) -> i32
    where T: Display + Clone,
          U: Clone + Debug
{}
```

```rust
trait SomeTrait: BoundTrait {}
```

```rust
// 可以对任何实现了 Display 特征的类型调用 ToString 特征中方法.
impl<T: Display> ToString for T {}
```

### Trait Derive

```rust
#[derive(Debug)]
#[derive(PartialEq)]
#[derive(Eq)]
#[derive(PartialOrd)]
#[derive(Ord)]
#[derive(Clone)]
#[derive(Copy)]
#[derive(Hash)]
#[derive(Default)]
```

### Trait Object

- Define trait object:
  - `Box<dyn some_trait>`.
  - `&dyn some_trait`.
- A trait can have trait object only when
  it is `object safe`:
  - all methods can't return `Self`.
  - all methods can't be generics.
- Trait object stand for dynamic distributing (runtime),
  generics stand for static distributing (compile time).

```rust
trait Draw {
    fn draw(&self) -> String;
}

impl Draw for u8 {
    fn draw(&self) -> String {
        format!("u8: {}", *self)
    }
}

impl Draw for f64 {
    fn draw(&self) -> String {
        format!("f64: {}", *self)
    }
}

fn draw1(x: Box<dyn Draw>) {
    x.draw();
}

fn draw2(x: &dyn Draw) {
    x.draw();
}

fn main() {
    let x = 1.1f64;
    let y = 8u8;

    draw1(Box::new(x));
    draw1(Box::new(y));
    draw2(&x);
    draw2(&y);
}
```

### Associated Types

Associated types make code become readable and concise:

```rust
trait Container<A,B> {
    fn contains(&self,a: A,b: B) -> bool;
}

fn difference<A,B,C>(container: &C) -> i32
  where
    C : Container<A,B> {}
```

```rust
trait Container{
    type A;
    type B;
    fn contains(&self, a: &Self::A, b: &Self::B) -> bool;
}

fn difference<C: Container>(container: &C) {}
```

## Collection

### Vector

Create and Insert:

```rust
let mut v = Vec::new();
v.push(1);
```

Access and Get:

```rust
let v = vec![1, 2, 3, 4, 5];

let third: &i32 = &v[2];
println!("3rd: {}", third);

match v.get(2) {
    Some(third) => println!("3rd: {}", third),
    None => println!("None."),
}
```

Visit:

```rust
let v = vec![1, 2, 3];

for i in &v {
    println!("{}", i);
}
```

Visit and Mutate:

```rust
let mut v = vec![1, 2, 3];

for i in &mut v {
    *i += 10
}
```

Store different types:

```rust
enum IpAddr {
    V4(String),
    V6(String)
}

fn main() {
    let v = vec![
        IpAddr::V4("127.0.0.1".to_string()),
        IpAddr::V6("::1".to_string())
    ];

    for ip in v {
        show_addr(ip)
    }
}

fn show_addr(ip: IpAddr) {
    println!("{:?}",ip);
}
```

### HashMap

```rust
use std::collections::HashMap;
```

```rust
// Create.
let mut scores = HashMap::new();

// Insert.
scores.insert(String::from("Blue"), 10);
scores.insert(String::from("Yellow"), 50);
scores.entry("Red").or_insert(5);

// Get.
let team_name = String::from("Blue");
let score: Option<&i32> = scores.get(&team_name);

// Visit
for (key, value) in &scores {
    println!("{}: {}", key, value);
}

// Transform.
let from_list: HashMap<_,_> = some_list.into_iter().collect();
```

## Type Conversion

### Explicit Type Conversion

```rust
fn main() {
    let a = 3.1 as i8;
    let b = 100_i8 as i32;
    let c = 'a' as u8;
    println!("{}, {}, {}", a, b, c)

    let x: i16 = 1500;
    let x_: u8 = match x.try_into() {
        Ok(x1) => x1,
        Err(e) => {
            println!("{:?}", e.to_string());
            0
        }
    };
}
```

### Implicit Type Conversion

`target.method()`:

1. Call by value: `T::method(target)`.
2. Call by reference: `T::method(&target)` or `T::method(&mut target)`.
3. Call by deref: when `T: Deref<Target = U>`, then `(&T).method() => (&U).method()`.
4. Length-non-determined collection to length-determined slice.
5. Panic.

```rust
let array: Rc<Box<[T; 3]>> = ...;
let first_entry = array[0];
// 1. `Index` trait grammar sugar: array[0] => array.index(0).
// 2. Call by: value: `Rc<Box<[T; 3]>>` not impl `Index` trait.
// 3. Call by reference: `&Rc<Box<[T; 3]>>` not impl `Index` trait.
// 4. Call by reference: `&mut Rc<Box<[T; 3]>>` not impl `Index` trait.
// 5. Call by deref -> Call by value: `Box<[T; 3]>` not impl `Index` trait.
// 6. Call by deref -> Call by reference: `&Box<[T; 3]>` not impl `Index` trait.
// 7. Call by deref -> Call by reference: `&mut Box<[T; 3]>` not impl `Index` trait.
// 8. Call by deref -> Call by deref: `[T; 3]` not impl `Index` trait.
// 9. `[T; 3]` => `[T]` impl `Index` trait.
```

## Error Handling

### Result Type

```rust
use std::fs::File;
use std::io::ErrorKind;

fn main() {
    let f = File::open("hello.txt");

    let f = match f {
        Ok(file) => file,
        Err(error) => match error.kind() {
            ErrorKind::NotFound => match File::create("hello.txt") {
                Ok(fc) => fc,
                Err(e) => panic!("Problem creating the file: {:?}", e),
            },
            other_error => panic!("Problem opening the file: {:?}", other_error),
        },
    };
}
```

### Error Handling Macro

`?` for `Result` type:

```rust
use std::fs::File;
use std::io;
use std::io::Read;

fn open_file() -> Result<File, Box<dyn std::error::Error>> {
    let mut f = File::open("hello.txt")?;
    Ok(f)
}

fn read_username_from_file() -> Result<String, io::Error> {
    let mut s = String::new();
    File::open("hello.txt")?.read_to_string(&mut s)?;
    Ok(s)
}
```

`?` for `Option` type:

```rust
fn last_char_of_first_line(text: &str) -> Option<char> {
    text.lines().next()?.chars().last()
}
```

## Smart Pointer

### Deref Trait

- `&smart_pointer`
  => `smart_pointer.defer()`.
- `*smart_pointer`
  => `*(smart_pointer.defer())`.
- `smart_pointer.method()`
  => `(&smart_pointer).method()`
  => `(smart_pointer.defer()).method()`.
- When `T: Deref<Target=U>`, then `&T => &U`.
- When `T: DerefMut<Target=U>`, then `&mut T => &mut U`.
- When `T: Deref<Target=U>`, then `&mut T => &U`.

```rust
use core::ops::{self};
use crate::str::{self, from_boxed_utf8_unchecked};
use crate::vec::Vec;

struct String {
    vec: Vec<u8>,
}

impl ops::Deref for String {
    type Target = str;

    fn deref(&self) -> &str {
        unsafe { str::from_utf8_unchecked(&self.vec) }
    }
}

struct MyBox<T>(T);

impl<T> MyBox<T> {
    fn new(x: T) -> MyBox<T> {
        MyBox(x)
    }
}

impl<T> ops::Deref for MyBox<T> {
    type Target = T;

    fn deref(&self) -> &Self::Target {
        &self.0
    }
}

fn main() {
    let x = MyBox::new(5);
    assert_eq!(5, *x);
    // => *(x.deref())
    // => *(&x.0)
    // => x.0

    let s = MyBox::new(String::from("hello world"));
    display(&s);
    // => &MyBox
    // => MyBox.deref()
    // => &String
    // => String.deref()
    // => &str

    let hello_world = MyBox::new(String::from("hello, world"));
    let s1: &str = &hello_world;
    // => &MyBox<String>
    // => MyBox<String>.deref()
    // => &String
    // => String.deref()
    // => &str
    let s2: String = hello_world.to_string();
    // => MyBox<String>.to_string()
    // => (&MyBox<String>).to_string()
    // => (MyBox<String>.defer()).to_string()
    // => (&String).to_string()
    let ptr: *const u8 = hello_world.as_ptr();
    // => MyBox<String>.as_ptr()
    // => (&MyBox<String>).as_ptr()
    // => (MyBox<String>.defer()).as_ptr()
    // => (&String).as_ptr()
    // => (String.defer()).as_ptr()
    // => (&str).as_ptr()
}

fn display(s: &str) {
    println!("{}", s);
}
```

## Rust Asynchronous Programming

### Concurrency Programming Model

| Name         | Pros                 | Cons                                   |
| ------------ | -------------------- | -------------------------------------- |
| OS Thread    | simple, native model | consistent and context switch overhead |
| Event Driven | perf model           | non-liner logic, callback hell         |
| Coroutines   | perf model           | non-system abstraction                 |
| Actor        | distributed model    | complex flow control and retry logic   |
| Async/Await  | perf, native model   | complex internal logic                 |

## Rust Web Development

### Node.js Bindings

Tasks suite for native `Node.js` add-ons:

- Computing intensive tasks with simple I/O:
  e.g `@node-rs/crc32` (CPU SIMD instruction), `@node-rs/bcrypt`, `@node-rs/jieba`.
- System call tasks:
  SIMD instruction, GPU instruction.

[Napi](https://github.com/napi-rs/napi-rs):
Framework for building compiled `Node.js` add-ons in `Rust` via Node API.

```rust
#[macro_use]
extern crate napi;

/// import the preludes
use napi::bindgen_prelude::*;

/// module registration is done by the runtime, no need to explicitly do it now.
#[napi]
fn fibonacci(n: u32) -> u32 {
    match n {
        1 | 2 => 1,
        _ => fibonacci(n - 1) + fibonacci(n - 2),
    }
}

/// use `Fn`, `FnMut` or `FnOnce` traits to defined JavaScript callbacks
/// the return type of callbacks can only be `Result`.
#[napi]
fn get_cwd<T: Fn(String) -> Result<()>>(callback: T) {
    callback(env::current_dir().unwrap().to_string_lossy().to_string()).unwrap();
}

/// or, define the callback signature in where clause
#[napi]
fn test_callback<T>(callback: T)
where T: Fn(String) -> Result<()>
{}

/// async fn, require `async` feature enabled.
/// [dependencies]
/// napi = {version="2", features=["async"]}
#[napi]
async fn read_file_async(path: String) -> Result<Buffer> {
    tokio::fs::read(path)
        .map(|r| match r {
            Ok(content) => Ok(content.into()),
            Err(e) => Err(Error::new(
                Status::GenericFailure,
                format!("failed to read file, {}", e),
            )),
        })
        .await
}
```

[Neon](https://github.com/neon-bindings/neon):
`Rust` bindings for safe and fast native `Node.js` modules.

```rust
use neon::context::{Context, ModuleContext, FunctionContext};
use neon::types::JsNumber;
use neon::result::JsResult;
use neon::result::NeonResult;

fn fibonacci(n: i32) -> i32 {
    return match n {
        n if n < 1 => 0,
        n if n <= 2 => 1,
        _ => fibonacci(n - 1) + fibonacci(n - 2)
  }
}

fn fibonacci_api(mut cx: FunctionContext) -> JsResult<JsNumber> {
    let handle = cx.argument::<JsNumber>(0).unwrap();
    let res = fibonacci(handle.value(&mut cx) as i32);
    Ok(cx.number(res))
}

#[neon::main]
fn main(mut cx: ModuleContext) -> NeonResult<()> {
    cx.export_function("fibonacci_rs", fibonacci_api)?;
    Ok(())
}
```

```js
const { fibonacci_rs } = require('./index.node');

const value = process.argv[2] || null;
const number = parseInt(value);

if (isNaN(number)) {
  console.log('Provided value is not a number');
  return;
}

const result = fibonacci_rs(number);
console.log(result);
```

## Rust Library

- [Num: Numeric Types and Traits](https://github.com/rust-num/num)
- [Rand: Random Number Generator](https://github.com/rust-random/rand)
- [Chrono: DateTime Library](https://github.com/chronotope/chrono)
- [Tokio: Asynchronous Runtime](https://github.com/tokio-rs/tokio)
- [Rayon: Data Parallelism Library](https://github.com/rayon-rs/rayon)
- [Log: Logging Library](https://github.com/rust-lang/log)
- [Tracing: Tracing Library](https://github.com/tokio-rs/tracing)
- [Request: HTTP Client](https://github.com/seanmonstar/reqwest)
- [Clap: CLI Parser](https://github.com/clap-rs/clap)
- [Syn: Source Code Parser](https://github.com/dtolnay/syn)
- [Napi: Node.js Bindings Library](https://github.com/napi-rs/napi-rs):
- [Neon: Node.js Bindings Library](https://github.com/neon-bindings/neon):
- [Git: Git Bindings Library](https://github.com/rust-lang/git2-rs)

## Reference

- [Rust Course](https://github.com/sunface/rust-course).
