# Angular Basic Notes

<!-- TOC -->

- [Angular Basic Notes](#angular-basic-notes)
  - [Basic](#basic)
    - [CLI](#cli)
  - [Module](#module)
  - [Pipe](#pipe)
    - [Pure Pipe](#pure-pipe)
    - [Impure Pipe](#impure-pipe)
  - [Service](#service)
    - [Injection Provider](#injection-provider)
  - [RxJS](#rxjs)
  - [Component](#component)
    - [Props](#props)
  - [Event Binding](#event-binding)
  - [Directives](#directives)
    - [Structural Directives](#structural-directives)
      - [ngFor](#ngfor)
      - [ngIf](#ngif)
    - [Attribute Directives](#attribute-directives)
      - [ngClass](#ngclass)
  - [Styles](#styles)
    - [CSS Class Binding](#css-class-binding)

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
ng lint
ng test
ng e2e
```

production build: suffix `/` is required

```bash
ng build --prod true --outputPath ./build --baseHref https://sabertazimi.github.io/hust-web/angular/learn/
```

```bash
ng generate --help
```

## Module

Angular 需要知道如何把应用程序的各个部分组合到一起,
以及该应用需要哪些其它文件和库,
这些信息被称为元数据（metadata.
有些元数据位于`@Component`装饰器中, 你会把它加到组件类上.
另一些关键性的元数据位于`@NgModule`装饰器中.

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

## Service

### Injection Provider

```js
@Injectable({
  providedIn: 'root',
})
```

## RxJS

- RxJS 管理所有输入的 input -> redux action 的调度过程
- 同步与异步的统一
- 获取和订阅的统一
- 现在与未来的统一
- 可组合的数据变更过程
- 数据与视图的精确绑定
- 条件变更之后的自动重新计算
- UI 变化很复杂时，用 component 归一化处理
- state 变化很复杂时，用 action/state 归一化处理
- data-input 很复杂时，用 RxJS/observable 归一化处理

可观察对象可以发送多个任意类型的值 —— 字面量、消息、事件.
无论这些值是同步发送的还是异步发送的,
接收这些值的 API 都是一样的.
由于准备（setup）和清场（teardown）的逻辑都是由可观察对象自己处理的,
因此应用代码只管订阅并消费这些值就可以了, 做完之后, 取消订阅.
无论这个流是击键流、HTTP 响应流还是定时器,
对这些值进行监听和停止监听的接口都是一样的.

## Component

### Props

```js
import { Input } from '@angular/core';

... {
  @Input() hero: Hero;
}
```

private props

```js
constructor(private heroService: HeroService) { }
```

## Event Binding

- `()` template syntax for event binding

```html
<li (click)="onSelect($event.target.name)"></li>
<li (click)="onSelect(hero.name)"></li>
```

## Directives

### Structural Directives

#### ngFor

```html
<li *ngFor="let hero of heroes">{{hero.name}}</li>
```

#### ngIf

```html
<div *ngIf="selectedHero">Selected</div>
```

### Attribute Directives

#### ngClass

same to `[ngStyle]`

```html
<div [ngClass]="currentClasses">This div is initially saveable, unchanged, and special</div>
```

```js
currentClasses: {};

setCurrentClasses() {
  // CSS classes: added/removed per current state of component properties
  this.currentClasses = {
    'saveable': this.canSave,
    'modified': !this.isUnchanged,
    'special':  this.isSpecial
  };
}
```

## Styles

### CSS Class Binding

```html
<!-- toggle the "special" class on/off with a property -->
<div [class.special]="isSpecial">The class binding is special</div>

<!-- binding to `class.special` trumps the class attribute -->
<div class="special"
     [class.special]="!isSpecial">This one is not so special</div>
```

