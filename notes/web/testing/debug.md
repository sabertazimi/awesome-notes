---
author: Sabertazimi
authorTitle: Web Developer
authorURL: https://github.com/sabertazimi
authorImageURL: https://github.com/sabertazimi.png
tags: [Web, Testing, Debugging, DevTools]
---

# Debugging

## Monkey Patch

### Window State Injection

Inject trace function (log, monitor, report service)
to window `pushState` and `replaceState`.

```ts
function _wr(type) {
  const orig = window.history[type]

  return function (...args) {
    const rv = orig.apply(this, args)
    const e = new Event(type.toLowerCase())
    e.arguments = args
    window.dispatchEvent(e)
    return rv
  }
}

window.history.pushState = _wr('pushState')
window.history.replaceState = _wr('replaceState')

window.addEventListener('pushstate', (event) => {
  console.trace('pushState')
})

window.addEventListener('replacestate', (event) => {
  console.trace('replaceState')
})
```

### Event Propagation Injection

```ts
const originalStopPropagation = MouseEvent.prototype.stopPropagation

MouseEvent.prototype.stopPropagation = function (...args) {
  console.trace('stopPropagation')
  originalStopPropagation.call(this, ...args)
}
```

### Window Scroll Injection

```ts
let originalScrollTop = element.scrollTop

Object.defineProperty(element, 'scrollTop', {
  get() {
    return originalScrollTop
  },
  set(newVal) {
    console.trace('scrollTop')
    originalScrollTop = newVal
  },
})
```

## Logging

### Logging Type

- Application client log.
- Web server log.
- Database server log.
- Access log.
- Debug log.
- Error log.

### Logging Information

- 日志时间: 包含时区信息和毫秒.
- 日志级别.
- 会话标识.
- 功能标识.
- 精炼内容: 场景信息, 状态信息 (开始/中断/结束), 重要参数.
- 其他信息: 版本号, 线程号.

### Logging Setup

```ts
const { createLogger, format, transports } = require('winston')

const logLevels = {
  fatal: 0,
  error: 1,
  warn: 2,
  info: 3,
  debug: 4,
  trace: 5,
}

const logger = createLogger({
  levels: logLevels,
  format: format.combine(format.timestamp(), format.json()),
  transports: [new transports.Console()],
})

logger.info('System Started')
logger.fatal('Fatal error occurred')
```

### Logging Clock

- `performance.now()` is more precise (100 us).
- `performance.now()` is strictly monotonic (unaffected by changes of machine time).

```ts
let lastVisibilityChange = 0

window.addEventListener('visibilitychange', () => {
  lastVisibilityChange = performance.now()
})

// don’t log any metrics started before the last visibility change
// don't log any metrics if the page is hidden
// discard perf data from when the machine was not running app at full speed
function metrics() {
  if (metric.start < lastVisibilityChange || document.hidden)
    return

  process()
}
```

```ts
requestAnimationFrame(() => {
  requestAnimationFrame((timestamp) => {
    metric.finish(timestamp)
  })
})
```

## Console API

- `console.XXX`.
- `copy`: copy complex object to clipboard.
- `monitor`: monitor object.

```ts
const devtools = /./
devtools.toString = function () {
  this.opened = true
}

console.log('%c', devtools)
// devtools.opened will become true if/when the console is opened
```

```ts
// Basic console functions
console.assert()
console.clear()
console.log()
console.debug()
console.info()
console.warn()
console.error()

// Different output styles
console.dir()
console.dirxml()
console.table()
console.group()
console.groupCollapsed()
console.groupEnd()

// Trace console functions
console.trace()
console.count()
console.countReset()
console.time()
console.timeEnd()
console.timeLog()

// Non-standard console functions
console.profile()
console.profileEnd()
console.timeStamp()
```

`console.log`:

```ts
// `sprinf` style log
console.log('%d %o %s', integer, object, string)
console.log('%c ...', 'css style')
```

`console.table`:

```ts
// display array of object (tabular data)
const transactions = [
  {
    id: '7cb1-e041b126-f3b8',
    seller: 'WAL0412',
    buyer: 'WAL3023',
    price: 203450,
    time: 1539688433,
  },
  {
    id: '1d4c-31f8f14b-1571',
    seller: 'WAL0452',
    buyer: 'WAL3023',
    price: 348299,
    time: 1539688433,
  },
  {
    id: 'b12c-b3adf58f-809f',
    seller: 'WAL0012',
    buyer: 'WAL2025',
    price: 59240,
    time: 1539688433,
  },
]

console.table(data, ['id', 'price'])
```

## JavaScript Tracing API

`debugger`:

```ts
// debugger;
```

```ts
copy(obj) // to clipboard
```

```ts
window.onerror = function (errorMessage, scriptURI, lineNo, columnNo, error) {
  console.log(`errorMessage: ${errorMessage}`) // 异常信息
  console.log(`scriptURI: ${scriptURI}`) // 异常文件路径
  console.log(`lineNo: ${lineNo}`) // 异常行号
  console.log(`columnNo: ${columnNo}`) // 异常列号
  console.log(`error: ${error}`) // 异常堆栈信息
  // ...
  // 异常上报
}

window.addEventListener('error', () => {
  console.log(error)
  // ...
  // 异常上报
})
```

### Trace Property

```ts
function traceProperty(object, property) {
  let value = object[property]
  Object.defineProperty(object, property, {
    get() {
      console.trace(`${property} requested`)
      return value
    },
    set(newValue) {
      console.trace(`setting ${property} to `, newValue)
      value = newValue
    },
  })
}
```

## Node Debugging API

- `node --inspect`.
- [ndb](https://github.com/GoogleChromeLabs/ndb).

```bash
node --inspect
ndb index.js
```

## Chrome DevTools Detection

- DevTools disable [library](https://github.com/theajack/disable-devtool).
- DevTools disable detection [guide](https://github.com/546669204/fuck-debugger-extensions).

### Console DevTools Detection

```ts
const x = document.createElement('div')

Object.defineProperty(x, 'id', {
  get() {
    // devtool opened.
    return 'id'
  },
})

console.log(x)
```

```ts
// eslint-disable-next-line prefer-regex-literals -- use RegExp to detect devtools panel opened
const c = new RegExp('1')

c.toString = function () {
  // devtool opened
}

console.log(c)
```

> Anti Method: hook `console` object, disable all outputs.

### Debugger Detection

```ts
;(function () {}).constructor('debugger')()
```

```ts
;(() => {
  function block() {
    if (
      window.outerHeight - window.innerHeight > 200
      || window.outerWidth - window.innerWidth > 200
    ) {
      document.body.innerHTML = 'Debug detected, please reload page!'
    }

    setInterval(() => {
      ;(function () {
        return false
      })
        .constructor('debugger')
        .call()
    }, 50)
  }

  try {
    block()
  } catch (err) {}
})()
```

```ts
const startTime = new Date()
// debugger;
const endTime = new Date()
const isDev = endTime - startTime > 100

while (true) {
  // debugger;
}
```

> Anti Method: use chrome protocol to block all `debugger` request.
> Anti Method: hook `Function.prototype.constructor` and replace `debugger` string.

## Chrome DevTools Shortcuts

- c-d: go to next word
- c-f in `Elements` panel: search DOM node
- c-m: go to next bracket
- c-p: go to files
- cs-p: go to anywhere
- cs-o: go to functions

long click reload: multiple reload options e.g. clean cache

## Elements Panel

- Break on elements.
- Inspect elements a11y.
- Capture node screenshot.

### Style Tab

- color picker
- filter: class filter, pseudo filter, css style filter

## Console Panel

[Console utilities API](https://developer.chrome.com/docs/devtools/console/utilities):

- `$_`.
- `$0` - `$4`.
- `$()`: `document.querySelector()`.
- `$$()`: `document.querySelectorAll()`.
- `getEventListeners(dom)`.
- `monitorEvents(dom, events)`.
- `unmonitorEvents(dom)`.
- `monitor(fn)`.
- `unmonitor(fn)`.
- `debug(fn)`.
- `undebug(fn)`.
- `keys(object)`.
- `values(object)`.
- `queryObjects(Constructor)`.

### Console Settings

- preserve log
- show timestamps
- Verbose: additional performance log
- click filename, filter error messages
- add folder to workspace

### Capture Default Event Listener

`$0`: the reference to the currently selected element in the Elements panel.

```ts
const listener = getEventListeners($0).click[0].listener
$0.removeEventListener('click', listener)
$0.addEventListener('click', (e) => {
  // do something
  // ...

  // then
  listener(e)
})
```

## Source Panel

- Add log points.
- Multiple breakpoints: source, XHR/fetch, DOM, global/event listeners.
- Open a source file, right click code, `Blackbox script` item.
- [Local Overrides](https://developers.google.com/web/updates/2018/01/devtools#overrides)
  for persistent changes to css styles.

Same thing in `VSCode` debug panel (log points, break points etc).

## Network Panel

- Network throttling: simulate different network environment.
- Initiator: go to files.

## Performance Panel

- `C+S+P`: performance monitor.
- `C+S+P`: FPS.
- Performance tips.
- Memory panel.
- Timeline events: `script -> style -> layout -> paint -> composite`.
- Timeline events [reference](https://developers.google.com/web/tools/chrome-devtools/evaluate-performance/performance-reference).
- Performance analysis [reference](https://developers.google.com/web/tools/chrome-devtools/evaluate-performance/reference).
- Performance tools [guide](https://zhuanlan.zhihu.com/p/41017888).

## Simulation Panel

- cs-p: type `3G` (slow network)
- cs-p: type `sensor` (geolocation)

## Audit Panel

- cs-p: type `audit`

## Coverage Panel

- cs-p: type `coverage`
- Use to eliminate **unused** CSS/JS code.

## Memory Panel

- Heap snapshot

## JS Profiler Panel

## Layer Panel

Tool for composite stage analysis:

- Compositor layers.

## Rendering Panel

- Emulate a focused page.
- FPS monitor.
- Scrolling performance.
- Scroll event.
- Paint flashing area: re-paint area.
- Layout shift region.
- Compositor layer borders.
- CSS media query emulation:
  - `prefers-color-scheme`.
  - `prefers-reduced-motion`.
  - `prefers-contrast`.
  - A11y emulation.

## Animations Panel

Overview for animations: learn animations tricks.

## CSS Overview Panel

CSS overview:

- Colors.
- Fonts.
- Unused declarations.
- Media queries.

## Bug List

### Basic Bug

- 必须进行输入验证 - 永远不要相信用户输入.
- 永不使用未经验证的数值的长度或大小.
- 必须返回正确的错误状态.
- 注意(隐式)类型转换.

### C Bug

- 栈缓冲区溢出.
- 空指针解引用.
- (隐式)类型转换.
- GOT 覆写 (Global Offset Table).

### Occasional Bug

- 多进程完全异步编程的复杂性.
- 逐渐地内存泄漏.
