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
}
```
