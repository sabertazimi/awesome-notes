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
  pages:
    name: Building and Deployment
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v3
        with:
          submodules: true
          fetch-depth: 1
      - name: Cache cargo binaries and registry
        uses: actions/cache@v2
        with:
          path: |
            ~/.cargo/bin/
            ~/.cargo/registry/index/
            ~/.cargo/registry/cache/
            ~/.cargo/git/db/
            target/
          key: ${{ runner.os }}-cargo-${{ hashFiles('**/Cargo.lock') }}
      - name: Setup mdBook
        uses: peaceiris/actions-mdbook@v1
        with:
          mdbook-version: 'latest'
      - name: Check toolchain version
        run: |
          rustc -V
          cargo -V
          mdbook -V
      - name: Build book
        run: |
          mdbook build
      - name: Deploy to Github Pages
        uses: peaceiris/actions-gh-pages@v3
        if: ${{ github.ref == 'refs/heads/main' }}
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./book
          force_orphan: true
          user_name: 'github-actions[bot]'
          user_email: 'github-actions[bot]@users.noreply.github.com'
          commit_message: ${{ github.event.head_commit.message }}
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

## Reference

- [Rust Course](https://github.com/sunface/rust-course).
