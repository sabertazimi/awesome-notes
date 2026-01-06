---
tags: [Web, Vue]
sidebar_position: 21
---

# Global API

`core/global-api/index.js` 添加 `Vue.XXX` 静态方法:

```ts
// initGlobalAPI
Vue.config = config
Vue.util = {
  warn,
  extend,
  mergeOptions,
  defineReactive,
}
Vue.set = set
Vue.delete = del
Vue.nextTick = nextTick
Vue.options = {
  components: {
    KeepAlive,
    // Transition 和 TransitionGroup 组件在 runtime/index.js 文件中被添加
    // Transition,
    // TransitionGroup
  },
  directives: Object.create(null),
  // 在 runtime/index.js 文件中, 为 directives 添加了两个平台化的指令 model 和 show
  // directives:{
  // model,
  // show
  // },
  filters: Object.create(null),
  _base: Vue,
}

// initUse: global-api/use.js
Vue.use = function (plugin: Function | object) {}

// initMixin: global-api/mixin.js
Vue.mixin = function (mixin: object) {}

// initExtend: global-api/extend.js
Vue.cid = 0
Vue.extend = function (extendOptions: object): Function {}

// initAssetRegisters: global-api/assets.js
Vue.component
  = Vue.directive
    = Vue.filter
      = function (
        id: string,
        definition: Function | object
      ): Function | object | void {}

// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext,
})

Vue.version = '__VERSION__'

// entry-runtime-with-compiler.js
Vue.compile = compileToFunctions
```

## Global Extend API

`core/global-api/extend.js`:

- `Vue.extend`/`vm.$options._base.extend` will return brand new `Vue` constructor.

```ts
/**
 * Class inheritance
 */
Vue.extend = function (extendOptions: object): Function {
  extendOptions = extendOptions || {}
  const Super = this
  const SuperId = Super.cid
  const cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {})

  if (cachedCtors[SuperId])
    return cachedCtors[SuperId]

  const name = extendOptions.name || Super.options.name
  const Sub = function VueComponent(options) {
    this._init(options)
  }

  Sub.prototype = Object.create(Super.prototype)
  Sub.prototype.constructor = Sub
  Sub.cid = cid++
  Sub.options = mergeOptions(Super.options, extendOptions)
  Sub.super = Super

  // For props and computed properties, we define proxy getters on
  // Vue instances at extension time. This
  // avoids Object.defineProperty calls for each instance created.
  if (Sub.options.props)
    initProps(Sub)

  if (Sub.options.computed)
    initComputed(Sub)

  // allow further extension/mixin/plugin usage
  Sub.extend = Super.extend
  Sub.mixin = Super.mixin
  Sub.use = Super.use

  // create asset registers, so extended classes
  // can have their private assets too.
  ASSET_TYPES.forEach((type) => {
    Sub[type] = Super[type]
  })

  // keep a reference to super options at extension time.
  // later at instantiation we can check if Super's options have
  // been updated.
  Sub.superOptions = Super.options
  Sub.extendOptions = extendOptions
  Sub.sealedOptions = extend({}, Sub.options)

  // cache constructor
  cachedCtors[SuperId] = Sub
  return Sub
}
```

## Global NextTick API

为了减少布局和渲染,
`Vue` 把 `DOM` 更新设计为异步更新,
每次侦听到数据变化,
将开启一个队列,
并缓冲在同一事件循环中发生的所有数据变更。
如果同一个 `watcher` 被多次触发,
只会被推入到队列中一次。
在下一个事件循环 tick 中,
`Vue` 会真正执行队列中的数据变更,
页面才会重新渲染,
使得多次 DOM 更新合并成一次批处理.

`core/util/next-tick.js`:

```ts
import { noop } from 'shared/util'
import { isIOS, isNative } from './env'
import { handleError } from './error'

const callbacks = []
let pending = false

let microTimerFunc
let macroTimerFunc
let useMacroTask = false

// setImmediate -> MessageChannel -> setTimeout.
if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  macroTimerFunc = () => {
    setImmediate(flushCallbacks)
  }
} else if (
  typeof MessageChannel !== 'undefined'
  && (isNative(MessageChannel))
  && (MessageChannel.toString() === '[object MessageChannelConstructor]')
) {
  const channel = new MessageChannel()
  const port = channel.port2
  channel.port1.onmessage = flushCallbacks
  macroTimerFunc = () => {
    port.postMessage(1)
  }
} else {
  macroTimerFunc = () => {
    setTimeout(flushCallbacks, 0)
  }
}

// Promise.then -> Macro Timer.
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  const p = Promise.resolve()
  microTimerFunc = () => {
    p.then(flushCallbacks)
    if (isIOS)
      setTimeout(noop)
  }
} else {
  microTimerFunc = macroTimerFunc
}

/**
 * Wrap a function so that if any code inside triggers state change,
 * changes are queued using a (macro) task instead of a micro task.
 */
export function withMacroTask(fn: Function): Function {
  return (
    fn._withTask
    || (fn._withTask = function (...args) {
      useMacroTask = true
      const res = fn(...args)
      useMacroTask = false
      return res
    })
  )
}

export function nextTick(cb?: Function, ctx?: object) {
  let _resolve

  callbacks.push(() => {
    if (cb) {
      try {
        cb.call(ctx)
      } catch (e) {
        handleError(e, ctx, 'nextTick')
      }
    } else if (_resolve) {
      _resolve(ctx)
    }
  })

  if (!pending) {
    pending = true

    if (useMacroTask)
      macroTimerFunc()
    else microTimerFunc()

    if (!cb && typeof Promise !== 'undefined') {
      return new Promise((resolve) => {
        _resolve = resolve
      })
    }
  }
}
```

## Global Mixin API

`core/global-api/mixin.js`:

```ts
export function initMixin(Vue: GlobalAPI) {
  Vue.mixin = function (mixin: object) {
    this.options = mergeOptions(this.options, mixin)
    return this
  }
}
```

## Global Use API

`core/global-api/use.js`:

```ts
export function initUse(Vue: GlobalAPI) {
  Vue.use = function (plugin: Function | object, ...args: any) {
    const installedPlugins
      = this._installedPlugins || (this._installedPlugins = [])

    if (installedPlugins.includes(plugin))
      return this

    // Pass `Vue` to plugin install hook.
    args.unshift(this)

    if (typeof plugin.install === 'function')
      plugin.install(...args)
    else if (typeof plugin === 'function')
      plugin(...args)

    installedPlugins.push(plugin)
    return this
  }
}
```
