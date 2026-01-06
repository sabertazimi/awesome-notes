---
tags: [Web, Vue]
sidebar_position: 20
---

# Constructor

## Vue Constructor

`core/instance/index.js`:

```ts
// 从五个文件导入五个方法（不包括 warn）
import { warn } from '../util/index'
import { eventsMixin } from './events'
import { initMixin } from './init'
import { lifecycleMixin } from './lifecycle'
import { renderMixin } from './render'
import { stateMixin } from './state'

// 定义 Vue 构造函数
function Vue(options) {
  this._init(options)
}

// 将 Vue 作为参数传递给导入的五个方法
initMixin(Vue)
stateMixin(Vue)
eventsMixin(Vue)
lifecycleMixin(Vue)
renderMixin(Vue)

// 导出 Vue
export default Vue
```

`core/instance/init.js`:

```ts
// initMixin(Vue)
Vue.prototype._init = function (options?: object) {}
```

`core/instance/state.js`:

```ts
// stateMixin(Vue)
Vue.prototype.$data = data
Vue.prototype.$props = props
Vue.prototype.$set = set
Vue.prototype.$delete = del
Vue.prototype.$watch = function (
  expOrFn: string | Function,
  cb: any,
  options?: object
): Function {}
```

`core/instance/events.js`:

```ts
// eventsMixin(Vue)
Vue.prototype.$on = function (
  event: string | Array<string>,
  fn: Function
): Component {}
Vue.prototype.$once = function (event: string, fn: Function): Component {}
Vue.prototype.$off = function (
  event?: string | Array<string>,
  fn?: Function
): Component {}
Vue.prototype.$emit = function (event: string): Component {}
```

`core/instance/lifecycle.js`:

```ts
// lifecycleMixin(Vue)
Vue.prototype._update = function (vnode: VNode, hydrating?: boolean) {}
Vue.prototype.$forceUpdate = function () {}
Vue.prototype.$destroy = function () {}
```

`core/instance/render.js`:

```ts
export function initRender(vm: Component) {
  vm._vnode = null // root of child tree
  vm._staticTrees = null // v-once cached trees
  const options = vm.$options
  const parentVnode = (vm.$vnode = options._parentVnode)
  const renderContext = parentVnode && parentVnode.context
  vm.$slots = resolveSlots(options._renderChildren, renderContext)
  vm.$scopedSlots = emptyObject
  vm._c = (a, b, c, d) => createElement(vm, a, b, c, d, false)
  vm.$createElement = (a, b, c, d) => createElement(vm, a, b, c, d, true)
  const parentData = parentVnode && parentVnode.data
}
```

`core/instance/render-helpers/index.js`:

```ts
export function installRenderHelpers(target: any) {
  target._o = markOnce
  target._n = toNumber
  target._s = toString
  target._l = renderList
  target._t = renderSlot
  target._q = looseEqual
  target._i = looseIndexOf
  target._m = renderStatic
  target._f = resolveFilter
  target._k = checkKeyCodes
  target._b = bindObjectProps
  target._v = createTextVNode
  target._e = createEmptyVNode
  target._u = resolveScopedSlots
  target._g = bindObjectListeners
}
```

## Vue Prototype

`core/index.js`:

```ts
import { isServerRendering } from 'core/util/env'
import { FunctionalRenderContext } from 'core/vdom/create-functional-component'
import { initGlobalAPI } from './global-api/index'
import Vue from './instance/index'

initGlobalAPI(Vue)

Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering,
})

Object.defineProperty(Vue.prototype, '$ssrContext', {
  get() {
    return this.$vnode && this.$vnode.ssrContext
  },
})

// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext,
})

Vue.version = '__VERSION__'

export default Vue
```

`runtime/index.js`:

```ts
import config from 'core/config'
import Vue from 'core/index'
import { mountComponent } from 'core/instance/lifecycle'
import { devtools, inBrowser, isChrome } from 'core/util/index'
import { extend, noop } from 'shared/util'

import {
  getTagNamespace,
  isReservedAttr,
  isReservedTag,
  isUnknownElement,
  mustUseProp,
  query,
} from 'web/util/index'

import platformComponents from './components/index'
import platformDirectives from './directives/index'
import { patch } from './patch'

// Install platform specific utils.
Vue.config.mustUseProp = mustUseProp
Vue.config.isReservedTag = isReservedTag
Vue.config.isReservedAttr = isReservedAttr
Vue.config.getTagNamespace = getTagNamespace
Vue.config.isUnknownElement = isUnknownElement

// Install platform runtime directives & components.
extend(Vue.options.directives, platformDirectives)
extend(Vue.options.components, platformComponents)

// Install platform patch function.
Vue.prototype.__patch__ = inBrowser ? patch : noop

// Public mount method.
Vue.prototype.$mount = function (
  el?: string | Element,
  hydrating?: boolean
): Component {
  el = el && inBrowser ? query(el) : undefined
  return mountComponent(this, el, hydrating)
}
```

`platforms/web/entry-runtime-with-compiler.js` 重写 `Vue.prototype.$mount` 方法:

```ts
import config from 'core/config'
import { cached } from 'core/util/index'

import { compileToFunctions } from './compiler/index'
import Vue from './runtime/index'
import {
  shouldDecodeNewlines,
  shouldDecodeNewlinesForHref,
} from './util/compat'
import { query } from './util/index'

const mount = Vue.prototype.$mount

const idToTemplate = cached((id) => {
  const el = query(id)
  return el && el.innerHTML
})

/**
 * Get outerHTML of elements, taking care
 * of SVG elements in IE as well.
 */
function getOuterHTML(el: Element): string {
  if (el.outerHTML) {
    return el.outerHTML
  } else {
    const container = document.createElement('div')
    container.appendChild(el.cloneNode(true))
    return container.innerHTML
  }
}

Vue.prototype.$mount = function (
  el?: string | Element,
  hydrating?: boolean
): Component {
  el = el && query(el)

  if (el === document.body || el === document.documentElement) {
    // Do not mount Vue to <html> or <body>
    return this
  }

  const options = this.$options
  // resolve template/el and convert to render function
  if (!options.render) {
    let template = options.template
    if (template) {
      if (typeof template === 'string') {
        if (template.charAt(0) === '#')
          template = idToTemplate(template)
      } else if (template.nodeType) {
        template = template.innerHTML
      } else {
        // Invalid template option
        return this
      }
    } else if (el) {
      template = getOuterHTML(el)
    }
    if (template) {
      const { render, staticRenderFns } = compileToFunctions(
        template,
        {
          shouldDecodeNewlines,
          shouldDecodeNewlinesForHref,
          delimiters: options.delimiters,
          comments: options.comments,
        },
        this
      )
      options.render = render
      options.staticRenderFns = staticRenderFns
    }
  }

  return mount.call(this, el, hydrating)
}

Vue.compile = compileToFunctions

export default Vue
```
