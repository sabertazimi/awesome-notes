# Angular Basic Notes

<!-- TOC -->

- [Angular Basic Notes](#angular-basic-notes)
  - [Basic](#basic)
    - [CLI](#cli)
  - [Pipe](#pipe)
    - [Pure Pipe](#pure-pipe)
    - [Impure Pipe](#impure-pipe)

<!-- /TOC -->

## Basic

- [Installation](https://angular.io/guide/quickstart)
- [Basic Tutorial](https://angular.io/tutorial)

### CLI

- [CLI Commands](https://angular.io/cli)

```bash
npm install -g @angular/cli
```

```bash
ng new my-app
ng add <package-name>
ng serve --open
ng build
ng lint
ng test
ng e2e
```

```bash
ng generate --help
```

## Pipe

### Pure Pipe

Angular 只有在它检测到输入值发生了纯变更时才会执行纯管道.
纯变更是指对原始类型值 (String、Number、Boolean、Symbol) 的更改,
或者对对象引用 (Date、Array、Function、Object) 的更改.
Higher performance.

### Impure Pipe

Angular 会在每个组件的变更检测周期中执行非纯管道.
非纯管道可能会被调用很多次,
和每个按键或每次鼠标移动一样频繁.
