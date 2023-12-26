---
author: Sabertazimi
authorTitle: Web Developer
authorURL: https://github.com/sabertazimi
authorImageURL: https://github.com/sabertazimi.png
tags: [Web, Vue]
---

# Vue Advanced Notes

## Vue Constructor

`core/instance/index.js`:

```ts
// 从五个文件导入五个方法（不包括 warn）
import { warn } from '../util/index';
import { initMixin } from './init';
import { stateMixin } from './state';
import { renderMixin } from './render';
import { eventsMixin } from './events';
import { lifecycleMixin } from './lifecycle';

// 定义 Vue 构造函数
function Vue(options) {
  this._init(options);
}

// 将 Vue 作为参数传递给导入的五个方法
initMixin(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);

// 导出 Vue
export default Vue;
```

`core/instance/init.js`:

```ts
// initMixin(Vue)
Vue.prototype._init = function (options?: Object) {};
```

`core/instance/state.js`:

```ts
// stateMixin(Vue)
Vue.prototype.$data = data;
Vue.prototype.$props = props;
Vue.prototype.$set = set;
Vue.prototype.$delete = del;
Vue.prototype.$watch = function (
  expOrFn: string | Function,
  cb: any,
  options?: Object
): Function {};
```

`core/instance/events.js`:

```ts
// eventsMixin(Vue)
Vue.prototype.$on = function (
  event: string | Array<string>,
  fn: Function
): Component {};
Vue.prototype.$once = function (event: string, fn: Function): Component {};
Vue.prototype.$off = function (
  event?: string | Array<string>,
  fn?: Function
): Component {};
Vue.prototype.$emit = function (event: string): Component {};
```

`core/instance/lifecycle.js`:

```ts
// lifecycleMixin(Vue)
Vue.prototype._update = function (vnode: VNode, hydrating?: boolean) {};
Vue.prototype.$forceUpdate = function () {};
Vue.prototype.$destroy = function () {};
```

`core/instance/render.js`:

```ts
export function initRender(vm: Component) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null; // v-once cached trees
  const options = vm.$options;
  const parentVnode = (vm.$vnode = options._parentVnode);
  const renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  vm._c = (a, b, c, d) => createElement(vm, a, b, c, d, false);
  vm.$createElement = (a, b, c, d) => createElement(vm, a, b, c, d, true);
  const parentData = parentVnode && parentVnode.data;
}

export function renderMixin(Vue: Class<Component>) {
  installRenderHelpers(Vue.prototype);
  Vue.prototype.$nextTick = function (fn: Function) {
    return nextTick(fn, this);
  };
  Vue.prototype._render = function (): VNode {};
}
```

`core/instance/render-helpers/index.js`:

```ts
export function installRenderHelpers(target: any) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
}
```

## Vue Prototype

`core/index.js`:

```ts
import { FunctionalRenderContext } from 'core/vdom/create-functional-component';
import { isServerRendering } from 'core/util/env';
import Vue from './instance/index';
import { initGlobalAPI } from './global-api/index';

initGlobalAPI(Vue);

Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering,
});

Object.defineProperty(Vue.prototype, '$ssrContext', {
  get() {
    return this.$vnode && this.$vnode.ssrContext;
  },
});

// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext,
});

Vue.version = '__VERSION__';

export default Vue;
```

`runtime/index.js`:

```ts
import Vue from 'core/index';
import config from 'core/config';
import { extend, noop } from 'shared/util';
import { mountComponent } from 'core/instance/lifecycle';
import { devtools, inBrowser, isChrome } from 'core/util/index';

import {
  getTagNamespace,
  isReservedAttr,
  isReservedTag,
  isUnknownElement,
  mustUseProp,
  query,
} from 'web/util/index';

import { patch } from './patch';
import platformDirectives from './directives/index';
import platformComponents from './components/index';

// Install platform specific utils.
Vue.config.mustUseProp = mustUseProp;
Vue.config.isReservedTag = isReservedTag;
Vue.config.isReservedAttr = isReservedAttr;
Vue.config.getTagNamespace = getTagNamespace;
Vue.config.isUnknownElement = isUnknownElement;

// Install platform runtime directives & components.
extend(Vue.options.directives, platformDirectives);
extend(Vue.options.components, platformComponents);

// Install platform patch function.
Vue.prototype.__patch__ = inBrowser ? patch : noop;

// Public mount method.
Vue.prototype.$mount = function (
  el?: string | Element,
  hydrating?: boolean
): Component {
  el = el && inBrowser ? query(el) : undefined;
  return mountComponent(this, el, hydrating);
};

export default Vue;
```

`platforms/web/entry-runtime-with-compiler.js` 重写 `Vue.prototype.$mount` 方法:

```ts
import config from 'core/config';
import { cached } from 'core/util/index';

import Vue from './runtime/index';
import { compileToFunctions } from './compiler/index';
import {
  shouldDecodeNewlines,
  shouldDecodeNewlinesForHref,
} from './util/compat';
import { query } from './util/index';

const mount = Vue.prototype.$mount;

const idToTemplate = cached(id => {
  const el = query(id);
  return el && el.innerHTML;
});

/**
 * Get outerHTML of elements, taking care
 * of SVG elements in IE as well.
 */
const getOuterHTML = (el: Element): string => {
  if (el.outerHTML) {
    return el.outerHTML;
  } else {
    const container = document.createElement('div');
    container.appendChild(el.cloneNode(true));
    return container.innerHTML;
  }
};

Vue.prototype.$mount = function (
  el?: string | Element,
  hydrating?: boolean
): Component {
  el = el && query(el);

  if (el === document.body || el === document.documentElement) {
    // Do not mount Vue to <html> or <body>
    return this;
  }

  const options = this.$options;
  // resolve template/el and convert to render function
  if (!options.render) {
    let template = options.template;
    if (template) {
      if (typeof template === 'string') {
        if (template.charAt(0) === '#') {
          template = idToTemplate(template);
        }
      } else if (template.nodeType) {
        template = template.innerHTML;
      } else {
        // Invalid template option
        return this;
      }
    } else if (el) {
      template = getOuterHTML(el);
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
      );
      options.render = render;
      options.staticRenderFns = staticRenderFns;
    }
  }

  return mount.call(this, el, hydrating);
};

Vue.compile = compileToFunctions;

export default Vue;
```

## Vue Global API

`core/global-api/index.js` 添加 `Vue.XXX` 静态方法:

```ts
// initGlobalAPI
Vue.config = config;
Vue.util = {
  warn,
  extend,
  mergeOptions,
  defineReactive,
};
Vue.set = set;
Vue.delete = del;
Vue.nextTick = nextTick;
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
};

// initUse: global-api/use.js
Vue.use = function (plugin: Function | Object) {};

// initMixin: global-api/mixin.js
Vue.mixin = function (mixin: Object) {};

// initExtend: global-api/extend.js
Vue.cid = 0;
Vue.extend = function (extendOptions: Object): Function {};

// initAssetRegisters: global-api/assets.js
Vue.component =
  Vue.directive =
  Vue.filter =
    function (
      id: string,
      definition: Function | Object
    ): Function | Object | void {};

// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext,
});

Vue.version = '__VERSION__';

// entry-runtime-with-compiler.js
Vue.compile = compileToFunctions;
```

### Vue Global Extend API

`core/global-api/extend.js`:

- `Vue.extend`/`vm.$options._base.extend` will return brand new `Vue` constructor.

```ts
/**
 * Class inheritance
 */
Vue.extend = function (extendOptions: Object): Function {
  extendOptions = extendOptions || {};
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const Super = this;
  const SuperId = Super.cid;
  const cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});

  if (cachedCtors[SuperId]) {
    return cachedCtors[SuperId];
  }

  const name = extendOptions.name || Super.options.name;
  const Sub = function VueComponent(options) {
    this._init(options);
  };

  Sub.prototype = Object.create(Super.prototype);
  Sub.prototype.constructor = Sub;
  Sub.cid = cid++;
  Sub.options = mergeOptions(Super.options, extendOptions);
  Sub.super = Super;

  // For props and computed properties, we define the proxy getters on
  // the Vue instances at extension time, on the extended prototype. This
  // avoids Object.defineProperty calls for each instance created.
  if (Sub.options.props) {
    initProps(Sub);
  }

  if (Sub.options.computed) {
    initComputed(Sub);
  }

  // allow further extension/mixin/plugin usage
  Sub.extend = Super.extend;
  Sub.mixin = Super.mixin;
  Sub.use = Super.use;

  // create asset registers, so extended classes
  // can have their private assets too.
  ASSET_TYPES.forEach(function (type) {
    Sub[type] = Super[type];
  });

  // enable recursive self-lookup
  if (name) {
    Sub.options.components[name] = Sub;
  }

  // keep a reference to the super options at extension time.
  // later at instantiation we can check if Super's options have
  // been updated.
  Sub.superOptions = Super.options;
  Sub.extendOptions = extendOptions;
  Sub.sealedOptions = extend({}, Sub.options);

  // cache constructor
  cachedCtors[SuperId] = Sub;
  return Sub;
};
```

### Vue Global NextTick API

为了减少布局和渲染,
`Vue` 把 `DOM` 更新设计为异步更新,
每次侦听到数据变化,
将开启一个队列,
并缓冲在同一事件循环中发生的所有数据变更.
如果同一个 `watcher` 被多次触发,
只会被推入到队列中一次.
在下一个事件循环 tick 中,
`Vue` 才会真正执行队列中的数据变更,
页面才会重新渲染,
使得多次 DOM 更新合并成一次批处理更新.

`core/util/next-tick.js`:

```ts
import { noop } from 'shared/util';
import { handleError } from './error';
import { isIOS, isNative } from './env';

const callbacks = [];
let pending = false;

function flushCallbacks() {
  pending = false;
  const copies = callbacks.slice(0);
  callbacks.length = 0;

  for (let i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

let microTimerFunc;
let macroTimerFunc;
let useMacroTask = false;

// setImmediate -> MessageChannel -> setTimeout.
if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  macroTimerFunc = () => {
    setImmediate(flushCallbacks);
  };
} else if (
  typeof MessageChannel !== 'undefined' &&
  (isNative(MessageChannel) ||
    // PhantomJS
    MessageChannel.toString() === '[object MessageChannelConstructor]')
) {
  const channel = new MessageChannel();
  const port = channel.port2;
  channel.port1.onmessage = flushCallbacks;
  macroTimerFunc = () => {
    port.postMessage(1);
  };
} else {
  macroTimerFunc = () => {
    setTimeout(flushCallbacks, 0);
  };
}

// Promise.then -> Macro Timer.
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  const p = Promise.resolve();
  microTimerFunc = () => {
    p.then(flushCallbacks);
    if (isIOS) setTimeout(noop);
  };
} else {
  microTimerFunc = macroTimerFunc;
}

/**
 * Wrap a function so that if any code inside triggers state change,
 * the changes are queued using a (macro) task instead of a micro task.
 */
export function withMacroTask(fn: Function): Function {
  return (
    fn._withTask ||
    (fn._withTask = function (...args) {
      useMacroTask = true;
      const res = fn(...args);
      useMacroTask = false;
      return res;
    })
  );
}

export function nextTick(cb?: Function, ctx?: Object) {
  let _resolve;

  callbacks.push(() => {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });

  if (!pending) {
    pending = true;

    if (useMacroTask) {
      macroTimerFunc();
    } else {
      microTimerFunc();
    }
  }

  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(resolve => {
      _resolve = resolve;
    });
  }
}
```

### Vue Global Mixin API

`core/global-api/mixin.js`:

```ts
export function initMixin(Vue: GlobalAPI) {
  Vue.mixin = function (mixin: Object) {
    this.options = mergeOptions(this.options, mixin);
    return this;
  };
}
```

### Vue Global Use API

`core/global-api/use.js`:

```ts
export function initUse(Vue: GlobalAPI) {
  Vue.use = function (plugin: Function | Object, ...args: any) {
    const installedPlugins =
      this._installedPlugins || (this._installedPlugins = []);

    if (installedPlugins.includes(plugin)) {
      return this;
    }

    // Pass `Vue` to plugin install hook.
    args.unshift(this);

    if (typeof plugin.install === 'function') {
      plugin.install(...args);
    } else if (typeof plugin === 'function') {
      plugin(...args);
    }

    installedPlugins.push(plugin);
    return this;
  };
}
```

## Vue Options API

`core/instance/init.js`:

```ts
vm.$options = mergeOptions(
  // resolveConstructorOptions(vm.constructor)
  {
    components: {
      KeepAlive,
      Transition,
      TransitionGroup,
    },
    directives: {
      model,
      show,
    },
    filters: Object.create(null),
    _base: Vue,
  },
  // options || {}
  {
    el: '#app',
    data: {
      test: 1,
    },
  },
  vm
);
```

Parent component options:

```ts
vm.$options = {
  components: {
    KeepAlive,
    Transition,
    TransitionGroup,
    ...UserRegisterComponents,
  },
  created: [
    function created() {
      console.log('parent created');
    },
  ],
  directives: {
    model,
    show,
    ...userCustomDirectives,
  },
  filters: {},
  _base: function Vue(options) {},
  el: '#app',
  render: function _render(h) {},
};
```

Children component options:

```ts
vm.$options = {
  parent: Vue /* 父Vue实例 */,
  propsData: undefined,
  _componentTag: undefined,
  _parentVnode: VNode /* 父VNode实例 */,
  _renderChildren: undefined,
  __proto__: {
    components: {
      KeepAlive,
      Transition,
      TransitionGroup,
      ...UserRegisterComponents,
    },
    directives: {
      model,
      show,
      ...userCustomDirectives,
    },
    filters: {},
    _base: function Vue(options) {},
    _Ctor: {},
    created: [
      function created() {
        console.log('parent created');
      },
      function created() {
        console.log('child created');
      },
    ],
    mounted: [
      function mounted() {
        console.log('child mounted');
      },
    ],
    data() {
      return {
        msg: 'Hello Vue',
      };
    },
    template: '<div>{{msg}}</div>',
  },
};
```

- `core/instance/state.js/initProps()`: `this.XXX` -> `this._props.XXX`.
- `core/instance/state.js/initData()`: `this.XXX` -> `this._data.XXX`.

### Vue Merge Options

`mergeOptions` (`core/util/options.js`):

- 对于 `el`/`propsData` 选项使用默认的合并策略 `defaultStrategy`.
- 对于 `data` 选项, 使用 `mergeDataOrFn` 函数进行处理, 最终结果是 `data` 选项将变成一个函数, 且该函数的执行结果为真正的数据对象.
- 对于 生命周期钩子 选项, 将合并成数组, 使得父子选项中的钩子函数都能够被执行.
- 对于 `directives`/`filters` 以及 `components` 等资源选项,
  父子选项将以原型链的形式被处理, 正是因为这样我们才能够在任何地方都使用内置组件或指令等.
- 对于 `watch` 选项的合并处理, 类似于生命周期钩子, 如果父子选项都有相同的观测字段, 将被合并为数组, 这样观察者都将被执行.
- 对于 `props`/`methods`/`inject`/`computed` 选项, 父选项始终可用, 但是子选项会覆盖同名的父选项字段.
- 对于 `provide` 选项, 其合并策略使用与 `data` 选项相同的 `mergeDataOrFn` 函数.
- 最后, 以上没有提及到的选项都将使默认选项 `defaultStrategy`.
- 最最后, 默认合并策略函数 `defaultStrategy` 的策略是: 只要子选项不是 `undefined` 就使用子选项, 否则使用父选项.

```ts
/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
export function mergeOptions(
  parent: Object,
  child: Object,
  vm?: Component
): Object {
  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child);

  const extendsFrom = child.extends;

  if (extendsFrom) {
    parent = mergeOptions(parent, extendsFrom, vm);
  }

  if (child.mixins) {
    for (let i = 0, l = child.mixins.length; i < l; i++) {
      parent = mergeOptions(parent, child.mixins[i], vm);
    }
  }

  const options = {};
  let key;

  for (key in parent) {
    mergeField(key);
  }

  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }

  function mergeField(key) {
    const strategy = strategies[key] || defaultStrategy;
    options[key] = strategy(parent[key], child[key], vm, key);
  }

  return options;
}
```

### Vue Normalize Options

Props:

```ts
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  props: {
    someData1: {
      type: Number,
    },
    someData2: {
      type: String,
      default: '',
    },
  },
};
```

Injects:

```ts
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  inject: {
    data1: { from: 'data1' },
    d2: { from: 'data2' },
    data3: { from: 'data3', someProperty: 'someValue' },
  },
};
```

Directives:

```ts
for (const key in dirs) {
  const def = dirs[key];
  if (typeof def === 'function') {
    dirs[key] = { bind: def, update: def };
  }
}
```

## Vue Mounting Workflow

`new Vue()` -> 初始化 -> 编译 -> 渲染 -> 挂载 -> 更新:

- `new Vue()`.
- `Vue.prototype._init`.
- `Vue.prototype.$mount`.
- `vm.$options.render = compileToFunctions(vm.$options.template)`:
  - `vue-loader` for static transform:
    `.vue` -> `.js` in build time.
  - `compileToFunctions` for runtime transform:
    bundle `compiler` and `runtime` into `vue.js`.
- `mountComponent(vm, el)`.
- `Vue.prototype._render`.
- `VDOM.createElement(vm)`:
  - Normalize children.
  - Create VNode and install hooks.
  - Create children recursively.
- `Vue.prototype._update`.
- `Vue.prototype.__patch__` (`platforms/web/runtime/patch.js`):
  - `backend.nodeOps` (`platforms/web/runtime/node-ops`).
    - `createElement`.
    - `createElementNS`.
    - `createTextNode`.
    - `createComment`.
    - `insertBefore`.
    - `appendChild`.
    - `removeChild`.
    - `parentNode`.
    - `nextSibling`.
    - `tagName`.
    - `setTextContent`.
    - `setStyleScope`.
  - `backend.hooksModules` (`core/vdom/modules` + `platforms/web/runtime/modules`):
    - `create`.
    - `activate`.
    - `update`.
    - `remove`.
    - `destroy`.

```ts
const app = new Vue({ el: '#app', ...restOptionsAPI });
vm._init(...restOptionsAPI);
if (vm.$options.el) vm.$mount(vm.$options.el);
vm.$options.render = compileToFunctions(vm.$options.template);
mountComponent(vm, el);
```

`core/instance/init.js`:

- 合并配置.
- 初始化生命周期.
- 初始化事件中心.
- 初始化渲染.
- 初始化 data/props/computed/watcher.

```ts
// initMixin(Vue)
Vue.prototype._init = function (options?: Object) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const vm: Component = this;

  // uid
  vm._uid = uid++;

  // a flag to avoid this being observed
  vm._isVue = true;

  // merge options
  if (options && options._isComponent) {
    initInternalComponent(vm, options);
  } else {
    vm.$options = mergeOptions(
      resolveConstructorOptions(vm.constructor),
      options || {},
      vm
    );
  }

  vm._renderProxy = vm;

  // expose real self
  vm._self = vm;
  initLifecycle(vm);
  initEvents(vm);
  initRender(vm);
  callHook(vm, 'beforeCreate');
  initInjections(vm); // resolve injections before data/props
  initState(vm);
  initProvide(vm); // resolve provide after data/props
  callHook(vm, 'created');

  if (vm.$options.el) {
    vm.$mount(vm.$options.el);
  }
};
```

`core/instance/lifecycle.js`:

```ts
export function mountComponent(
  vm: Component,
  el: ?Element,
  hydrating?: boolean
): Component {
  vm.$el = el;

  if (!vm.$options.render) {
    vm.$options.render = createEmptyVNode;
  }

  callHook(vm, 'beforeMount');

  const updateComponent = () => {
    vm._update(vm._render(), hydrating);
  };

  // eslint-disable-next-line no-new
  new Watcher(
    vm,
    updateComponent,
    noop,
    {
      before() {
        if (vm._isMounted) {
          callHook(vm, 'beforeUpdate');
        }
      },
    },
    true /* isRenderWatcher */
  );

  hydrating = false;

  // manually mounted instance, call mounted on self
  // mounted is called for render-created child components in its inserted hook
  // vm.$vnode 表示 Vue 实例的父虚拟 Node.
  if (vm.$vnode == null) {
    // Only `new Vue()` trigger this:
    vm._isMounted = true;
    callHook(vm, 'mounted');
  }

  return vm;
}
```

`core/instance/render.js`:

```ts
Vue.prototype._render = function (): VNode {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const vm: Component = this;
  const { render, _parentVnode } = vm.$options;

  if (_parentVnode) {
    vm.$scopedSlots = _parentVnode.data.scopedSlots || emptyObject;
  }

  // set parent vnode. this allows render functions to have access
  // to the data on the placeholder node.
  vm.$vnode = _parentVnode;

  // render self
  const vnode = render.call(vm._renderProxy, vm.$createElement);

  // return empty vnode in case the render function errored out
  if (!(vnode instanceof VNode)) {
    vnode = createEmptyVNode();
  }

  // set parent
  vnode.parent = _parentVnode;
  return vnode;
};
```

`core/vdom/create-element.js`:

- Normalize children: transform children to `Array<VNode>`.
- Create VNode:
  - `new VNode(tag, data, children, vm)` for native host elements (e.g `<div>`).
  - `createComponent(tag, data, children, vm)` for custom components:
    - `resolveConstructorOptions`: merge and resolve options API.
    - `installComponentHooks`:
      - Install internal (`core/vdom/create-component.js/componentVNodeHooks`) hooks.
      - Merge user-defined VNode hooks.
    - new VNode(`vue-component-${Ctor.options.name}`, data, undefined, vm).
    - Component VNode children is `undefined`.
- `vm._vnode.parent === vm.$vnode`.
- 组件 patch 过程中 DOM 的插入顺序为**先子后父**:
  `createComponent(vnode)` 中会调用内部钩子函数 `init(vnode)`,
  `init(vnode)` 函数会创建子组件 `VNode`, 并调用 `child.$mount(vnode.elm)`,
  递归式地创建子组件.

```ts
export function createElement(
  context: Component,
  tag: any,
  data: any,
  children: any,
  normalizationType: any,
  alwaysNormalize: boolean
): VNode | Array<VNode> {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }

  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }

  return _createElement(context, tag, data, children, normalizationType);
}

export function _createElement(
  context: Component,
  tag?: string | Class<Component> | Function | Object,
  data?: VNodeData,
  children?: any,
  normalizationType?: number
): VNode | Array<VNode> {
  if (isDef(data) && isDef(data.__ob__)) {
    return createEmptyVNode();
  }

  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }

  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode();
  }

  // support single function children as default scoped slot
  if (Array.isArray(children) && typeof children[0] === 'function') {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }

  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }

  let vnode;
  let ns;

  if (typeof tag === 'string') {
    let Ctor;
    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);

    if (config.isReservedTag(tag)) {
      // platform built-in elements
      vnode = new VNode(
        config.parsePlatformTagName(tag),
        data,
        children,
        undefined,
        undefined,
        context
      );
    } else if (
      (!data || !data.pre) &&
      // eslint-disable-next-line no-cond-assign
      isDef((Ctor = resolveAsset(context.$options, 'components', tag)))
    ) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(tag, data, children, undefined, undefined, context);
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }

  if (Array.isArray(vnode)) {
    return vnode;
  } else if (isDef(vnode)) {
    if (isDef(ns)) applyNS(vnode, ns);
    if (isDef(data)) registerDeepBindings(data);
    return vnode;
  } else {
    return createEmptyVNode();
  }
}
```

`core/instance/lifecycle.js`:

```ts
Vue.prototype._update = function (vnode: VNode, hydrating?: boolean) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const vm: Component = this;
  const prevEl = vm.$el;
  const prevVnode = vm._vnode;
  const restoreActiveInstance = setActiveInstance(vm);
  vm._vnode = vnode;

  // Vue.prototype.__patch__ is injected in entry points
  // based on the rendering backend used.
  if (!prevVnode) {
    // initial render
    vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */);
  } else {
    // updates
    vm.$el = vm.__patch__(prevVnode, vnode);
  }

  restoreActiveInstance();

  // update __vue__ reference
  if (prevEl) {
    prevEl.__vue__ = null;
  }

  if (vm.$el) {
    vm.$el.__vue__ = vm;
  }

  // if parent is an HOC, update its $el as well
  if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
    vm.$parent.$el = vm.$el;
  }

  // updated hook is called by the scheduler
  // to ensure that children are updated in a parent's updated hook.
};
```

## Vue Lifecycle

### Vue Options Lifecycle

[![Lifecycle](./figures/lifecycle.png)](https://v2.vuejs.org/v2/api/#Options-Lifecycle-Hooks)

`callHook` in `core/instance/lifecycle.js`:

```ts
export function callHook(vm: Component, hook: string) {
  pushTarget();
  const handlers = vm.$options[hook];

  if (handlers) {
    for (let i = 0, j = handlers.length; i < j; i++) {
      try {
        handlers[i].call(vm);
      } catch (e) {
        handleError(e, vm, `${hook} hook`);
      }
    }
  }

  if (vm._hasHookEvent) {
    vm.$emit(`hook:${hook}`);
  }

  popTarget();
}
```

`beforeCreate`/`created` in `core/instance/init.js`:

- `beforeCreate` 不能访问 `props`/`data`/`methods`.
- `created` 可以访问 `props`/`data`/`methods`.
- `beforeCreate`/`created` 不能访问 DOM.

```ts
Vue.prototype._init = function (options?: Object) {
  // ...
  initLifecycle(vm);
  initEvents(vm);
  initRender(vm);
  callHook(vm, 'beforeCreate');
  initInjections(vm);
  initState(vm); // props/data/methods/watch/computed.
  initProvide(vm);
  callHook(vm, 'created');
  // ...
};
```

`beforeMount`/`beforeUpdate` in `core/instance/lifecycle.js`:

```ts
export function mountComponent(
  vm: Component,
  el: ?Element,
  hydrating?: boolean
): Component {
  vm.$el = el;
  // ...
  callHook(vm, 'beforeMount');

  const updateComponent = () => {
    vm._update(vm._render(), hydrating);
  };

  // eslint-disable-next-line no-new
  new Watcher(
    vm,
    updateComponent,
    noop,
    {
      before() {
        if (vm._isMounted) {
          callHook(vm, 'beforeUpdate');
        }
      },
    },
    true /* isRenderWatcher */
  );

  hydrating = false;

  if (vm.$vnode == null) {
    // Only `new Vue()` trigger this:
    vm._isMounted = true;
    callHook(vm, 'mounted');
  }

  return vm;
}
```

`mounted` in `core/vdom/patch.js`/`core/vdom/create-component.js`:

- 对于同步渲染的子组件, `mounted` 执行顺序为**先子后父**.

```ts
// core/vdom/patch.js:
function invokeInsertHook(vnode, queue, initial) {
  // delay insert hooks for component root nodes, invoke them after the
  // element is really inserted
  if (isTrue(initial) && isDef(vnode.parent)) {
    vnode.parent.data.pendingInsert = queue;
  } else {
    for (let i = 0; i < queue.length; ++i) {
      queue[i].data.hook.insert(queue[i]);
    }
  }
}

// core/vdom/create-component.js:
const componentVNodeHooks = {
  // ...
  insert(vnode: MountedComponentVNode) {
    const { context, componentInstance } = vnode;
    if (!componentInstance._isMounted) {
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    // ...
  },
};
```

`update` in `core/observer/scheduler.js`:

- `RenderWatcher`.

```ts
function flushSchedulerQueue() {
  // ...
  // 获取到 updatedQueue
  callUpdatedHooks(updatedQueue);
}

function callUpdatedHooks(queue) {
  let i = queue.length;

  while (i--) {
    const watcher = queue[i];
    const vm = watcher.vm;

    // Peek up `RenderWatcher`
    if (vm._watcher === watcher && vm._isMounted) {
      callHook(vm, 'updated');
    }
  }
}
```

`beforeDestroy`/`destroyed` in `core/instance/lifecycle.js`:

- 调用 `beforeDestroy` 钩子函数.
- 从 `parent` 的 `$children` 中删掉自身.
- 删除 `watcher`.
- 当前渲染的 VNode 执行销毁钩子函数.
- 调用 `destroyed` 钩子函数.
- 在 `$destroy` 的执行过程中,
  会执行 `vm.__patch__(vm._vnode, null)` 触发子组件的销毁钩子函数 (递归),
  `destroyed` 钩子函数执行顺序为**先子后父**.

```ts
Vue.prototype.$destroy = function () {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const vm: Component = this;

  if (vm._isBeingDestroyed) {
    return;
  }

  callHook(vm, 'beforeDestroy');
  vm._isBeingDestroyed = true;

  // remove self from parent
  const parent = vm.$parent;

  if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
    remove(parent.$children, vm);
  }

  // teardown watchers
  if (vm._watcher) {
    vm._watcher.teardown();
  }

  let i = vm._watchers.length;

  while (i--) {
    vm._watchers[i].teardown();
  }

  // remove reference from data ob
  // frozen object may not have observer.
  if (vm._data.__ob__) {
    vm._data.__ob__.vmCount--;
  }

  // call the last hook...
  vm._isDestroyed = true;
  // invoke destroy hooks on current rendered tree
  vm.__patch__(vm._vnode, null);
  // fire destroyed hook
  callHook(vm, 'destroyed');
  // turn off all instance listeners.
  vm.$off();

  // GC: remove __vue__ reference
  if (vm.$el) {
    vm.$el.__vue__ = null;
  }

  // GC: release circular reference (#6759)
  if (vm.$vnode) {
    vm.$vnode.parent = null;
  }
};
```

### Vue Composition Lifecycle

```ts
let currentInstance = null;
function setCurrentInstance(instance) {
  currentInstance = instance;
}

function mountComponent(vnode, container, anchor) {
  const componentOptions = vnode.type;
  const { setup, data, props, attrs, slots } = componentOptions;
  const instance = {
    state: reactive(data),
    props: shallowReadonly(props),
    isMounted: false,
    subTree: null,
    slots,
    mounted: [],
  };

  const setupContext = { attrs, slots };
  setCurrentInstance(instance);
  const setupResult = setup(shallowReadonly(instance.props), setupContext);
  setCurrentInstance(null);

  effect(
    () => {
      const subTree = render.call(renderContext, renderContext);

      if (!instance.mounted) {
        instance.mounted?.forEach(hook => hook.call(renderContext));
      }
    },
    {
      scheduler: queueJob,
    }
  );
}

function onMounted(fn) {
  if (currentInstance) {
    currentInstance.mounted.push(fn);
  } else {
    console.error('`onMounted().` can only called in `setup()`.');
  }
}
```

## Vue Instance

```ts
// Vue.prototype._init: core/instance/init.js
// eslint-disable-next-line @typescript-eslint/no-this-alias
const vm: Component = this;
```

```ts
// Vue.prototype._init: core/instance/init.js
vm._uid = uid++; // 每个Vue实例都拥有一个唯一的 id
vm._isVue = true; // 这个表示用于避免Vue实例对象被观测(observed)
vm.$options = options; // 当前 Vue 实例的初始化选项, 注意: 这是经过 mergeOptions() 后的
vm._renderProxy = vm; // 渲染函数作用域代理
vm._self = vm; // 实例本身

// initLifecycle(vm): core/instance/lifecycle.js
vm.$parent = vmParent;
vm.$root = vmParent ? vmParent.$root : vm;

vm.$children = [];
vm.$refs = {};

vm._watcher = null;
vm._inactive = null;
vm._directInactive = false;
vm._isMounted = false;
vm._isDestroyed = false;
vm._isBeingDestroyed = false;

// initEvents(vm): core/instance/events.js
vm._events = Object.create(null);
vm._hasHookEvent = false;

// initRender(vm): core/instance/render.js
vm._vnode = null; // the root of the child tree
vm._staticTrees = null; // v-once cached trees

vm.$vnode = vnode;
vm.$slots = slots;
vm.$scopedSlots = scopedSlots;

vm._c = c;
vm.$createElement = createElement;

vm.$attrs = attrs;
vm.$listeners = listeners;

// initState(vm): core/instance/state.js
vm._watchers = [];
vm._data = data;

// mountComponent(): core/instance/lifecycle.js
vm.$el = el;

// initComputed(): core/instance/state.js
vm._computedWatchers = Object.create(null);

// initProps(): core/instance/state.js
vm._props = {};

// initProvide(): core/instance/inject.js
vm._provided = provided;
```

## Vue Virtual DOM

VNode Type:

- HTML native tag.
- Plain text.
- Component:
  - Functional component.
  - Stateful component:
    - Normal stateful component.
    - Need keep-alive stateful component.
    - Already keep-alive stateful component.
- Fragment.
- Portal.
- Suspense.

```ts
export default class VNode {
  tag: string | void;
  data: VNodeData | void;
  children: Array<VNode> | null;
  text: string | void;
  elm: Node | void;
  ns: string | void;
  context: Component | void; // rendered in this component's scope
  key: string | number | void;
  componentOptions: VNodeComponentOptions | void;
  componentInstance: Component | void; // component instance
  parent: VNode | void; // component placeholder node

  // strictly internal
  raw: boolean; // contains raw HTML? (server only)
  isStatic: boolean; // hoisted static node
  isRootInsert: boolean; // necessary for enter transition check
  isComment: boolean; // empty comment placeholder?
  isCloned: boolean; // is a cloned node?
  isOnce: boolean; // is a v-once node?
  asyncFactory: Function | void; // async component factory function
  asyncMeta: Object | void;
  isAsyncPlaceholder: boolean;
  ssrContext: Object | void;
  fnContext: Component | void; // real context vm for functional nodes
  fnOptions: ComponentOptions | null; // for SSR caching
  fnScopeId: string | null; // functional scope id support

  constructor(
    tag?: string,
    data?: VNodeData,
    children?: Array<VNode> | null,
    text?: string,
    elm?: Node,
    context?: Component,
    componentOptions?: VNodeComponentOptions,
    asyncFactory?: Function
  ) {
    this.tag = tag;
    this.data = data;
    this.children = children;
    this.text = text;
    this.elm = elm;
    this.ns = undefined;
    this.context = context;
    this.fnContext = undefined;
    this.fnOptions = undefined;
    this.fnScopeId = undefined;
    this.key = data && data.key;
    this.componentOptions = componentOptions;
    this.componentInstance = undefined;
    this.parent = undefined;
    this.raw = false;
    this.isStatic = false;
    this.isRootInsert = true;
    this.isComment = false;
    this.isCloned = false;
    this.isOnce = false;
    this.asyncFactory = asyncFactory;
    this.asyncMeta = undefined;
    this.isAsyncPlaceholder = false;
  }
}
```

```ts
const VNodeFlags = {
  ELEMENT_HTML: 1,
  ELEMENT_SVG: 1 << 1,
  COMPONENT_STATEFUL_NORMAL: 1 << 2,
  COMPONENT_STATEFUL_SHOULD_KEEP_ALIVE: 1 << 3,
  COMPONENT_STATEFUL_KEPT_ALIVE: 1 << 4,
  COMPONENT_FUNCTIONAL: 1 << 5,
  TEXT: 1 << 6,
  FRAGMENT: 1 << 7,
  PORTAL: 1 << 8,
};

VNodeFlags.ELEMENT = VNodeFlags.ELEMENT_HTML | VNodeFlags.ELEMENT_SVG;

VNodeFlags.COMPONENT_STATEFUL =
  VNodeFlags.COMPONENT_STATEFUL_NORMAL |
  VNodeFlags.COMPONENT_STATEFUL_SHOULD_KEEP_ALIVE |
  VNodeFlags.COMPONENT_STATEFUL_KEPT_ALIVE;

VNodeFlags.COMPONENT =
  VNodeFlags.COMPONENT_STATEFUL | VNodeFlags.COMPONENT_FUNCTIONAL;

const ChildrenFlags = {
  // 未知的 children 类型.
  UNKNOWN_CHILDREN: 0,
  // 没有 children.
  NO_CHILDREN: 1,
  // children 是单个 VNode.
  SINGLE_VNODE: 1 << 1,
  // children 是多个拥有 key 的 VNode.
  KEYED_VNODES: 1 << 2,
  // children 是多个没有 key 的 VNode.
  NONE_KEYED_VNODES: 1 << 3,
};

ChildrenFlags.MULTIPLE_VNODES =
  ChildrenFlags.KEYED_VNODES | ChildrenFlags.NONE_KEYED_VNODES;

export interface VNode {
  _isVNode: true;
  // Refer to real DOM.
  el: Element | null;
  flags: VNodeFlags;
  tag: string | FunctionalComponent | ComponentClass | null;
  data: VNodeData | null;
  children: VNodeChildren;
  childFlags: ChildrenFlags;
}
```

## Vue Template and Compiler

### Vue Compilation Workflow

```ts
function compile(template: string, options: CompilerOptions): CompiledResult {
  const ast = parse(template.trim(), options);
  optimize(ast, options);
  const code = generate(ast, options);

  return {
    ast,
    render: code.render,
    staticRenderFns: code.staticRenderFns,
  };
}
```

template 属性存在, render 方法不存在时:

- runtime with compiler 版本会在 JavaScript 运行时进行模板编译, 生成 render 函数.
- runtime only 版本会打印警告信息, 提示用户使用 runtime with compiler 版本或者使用使用 `vue-loader` 进行静态编译.

### Vue Compilation Performance

- Shorten template helper function with prefix `_v`/`_s` etc.
- Hoist static template blocks,
  eliminate unnecessary virtual DOM diff effort,
  only track dynamic VNode.
- Cache event handlers (React `useCallback`):
  默认情况下绑定事件行为会被视为动态绑定,
  所以每次都会去追踪它的变化,
  开启事件侦听器缓存后,
  直接复用事件处理器.
- Tree flattening:
  每一个区块都会追踪其所有带更新类型标记的后代节点,
  在激活时只有区块节点和其动态子节点需要被遍历,
  只需要遍历打平的树而非整棵树 (高效略过模板中任何的静态部分),
  大大减少了在虚拟 DOM 协调时需要遍历的节点数量.

```ts
const enum PatchFlags {
  TEXT = 1, // 动态的文本节点
  CLASS = 1 << 1, // 2 动态的 class
  STYLE = 1 << 2, // 4 动态的 style
  PROPS = 1 << 3, // 8 动态属性，不包括类名和样式
  FULL_PROPS = 1 << 4, // 16 动态 key，当 key 变化时需要完整的 diff 算法做比较
  HYDRATE_EVENTS = 1 << 5, // 32 表示带有事件监听器的节点
  STABLE_FRAGMENT = 1 << 6, // 64 一个不会改变子节点顺序的 Fragment
  KEYED_FRAGMENT = 1 << 7, // 128 带有 key 属性的 Fragment
  UN_KEYED_FRAGMENT = 1 << 8, // 256 子节点没有 key 的 Fragment
  NEED_PATCH = 1 << 9, // 512
  DYNAMIC_SLOTS = 1 << 10, // 动态 slot
  HOISTED = -1, // 特殊标志是负整数表示永远不会用作 diff
  BAIL = -2, // 一个特殊的标志，指代差异算法
}

function isStatic(node: ASTNode): boolean {
  if (node.type === 2) {
    // expression
    return false;
  }

  if (node.type === 3) {
    // text
    return true;
  }

  return !!(
    node.pre ||
    (!node.hasBindings && // no dynamic bindings
      !node.if &&
      !node.for && // not v-if or v-for or v-else
      !isBuiltInTag(node.tag) && // not a built-in
      isPlatformReservedTag(node.tag) && // not a component
      !isDirectChildOfTemplateFor(node) &&
      Object.keys(node).every(isStaticKey))
  );
}

function patchElement(n1, n2) {
  if (n2.dynamicChildren) {
    // Skip all static blocks.
    patchBlockChildren(n1, n2);
  } else {
    patchChildren(n1, n2, el);
  }
}
```

## Vue Two-Way Data Binding

`View-Model`: 主要做了两件微小的事情:

- 从 M 到 V 的映射 (Data Binding), 这样可以大量节省人肉来 update View 的代码:
  通过 Proxy 代理 Model, 每当调用 `Model[property].set` 时同时调用 `render`
- 从 V 到 M 的事件监听 (DOM Listeners), 这样 Model 会随着 View 触发事件而改变

```ts
const _data = {
  name: 'mark',
};

// new Proxy(target, handler);
const changeName = new Proxy(_data, {
  set(obj, name, value) {
    obj[name] = value;
    render();
  },
});
```

```ts
Array.from(el.getElementsByTagName('input'))
  .filter(ele => {
    return ele.getAttribute('v-model');
  })
  .forEach(input => {
    const name = input.getAttribute('v-model');
    input.value = changeName[name];

    // DOM Event Listener (listen to the changes of view)
    input.oninput = function () {
      changeName[name] = this.value;
    };
  });
```

## Vue Legacy Reactivity

[![Reactive](./figures/proxy.png)](https://ustbhuangyi.github.io/vue-analysis/v2/reactive/summary.html)

Collect deps (get):

- `watcher.get()`.
- `pushTarget(watcher)`.
- `watcherGetter()`: Access reactive object `reactiveObject.key`.
- `reactiveObject.get(key)` (`defineReactive`).
- `dep.depend()` + `childObserver.dep.depend()` + `dependArray()`.
- `Dep.target.addDep(dep)` -> `watcher.addDep(dep)`.
- `dep.addSub(watcher)`
- `dep.subs.push(watcher)`.
- `popTarget()`.
- `watcher.cleanupDeps()`.

Dispatch updates (set):

- Change reactive object `reactiveObject.key = value`.
- `reactiveObject.set(key, value)` (`defineReactive`).
- `dep.notify()`.
- `dep.subs.forEach(watcher => watcher.update())`.
- `watcher.update()`.
- `queueWatcher(watcher)`.
- `nextTick(flushSchedulerQueue)`.
- `watcher.run()`.
- `watcher.get()`: Get new value and recollect deps.

### Vue Watcher and Observer

`core/observer/watcher.js`:

- Watcher 的创建顺序为先父后子, 执行顺序 (WatcherQueue) 保持先父后子.
- 用户自定义 Watcher 要优先于 RenderWatcher 执行 (先创建先执行).
- 若一个组件在父组件的 Watcher 执行期间被销毁, 则它对应的 Watcher 执行都可以被跳过.
- `RenderWatcher` (built-in Watcher)
  `updateComponent = () => vm._update(vm._render(), hydrating)`:
  When reactive props and data changed,
  `updateComponent` get invoked automatically.
- 四种 `Watcher` 类型:
  - `Computed Watcher`: `Computed Props` Watcher.
  - `Sync Watcher`. `sync: true`.
  - `Deep Watcher`: `deep: true`, 检测 `Object` 内部变化.
  - `User Watcher`.

```ts
let uid = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
export default class Watcher {
  vm: Component;
  expression: string;
  cb: Function;
  id: number;
  deep: boolean;
  user: boolean;
  computed: boolean;
  sync: boolean;
  dirty: boolean;
  active: boolean;
  dep: Dep;
  deps: Array<Dep>;
  newDeps: Array<Dep>;
  depIds: SimpleSet;
  newDepIds: SimpleSet;
  before: Function | null;
  getter: Function;
  value: any;

  constructor(
    vm: Component,
    expOrFn: string | Function,
    cb: Function,
    options?: ?Object,
    isRenderWatcher?: boolean
  ) {
    this.vm = vm;

    if (isRenderWatcher) {
      vm._watcher = this;
    }

    vm._watchers.push(this);

    // options
    if (options) {
      this.deep = !!options.deep;
      this.user = !!options.user;
      this.computed = !!options.computed;
      this.sync = !!options.sync;
      this.before = options.before;
    } else {
      this.deep = this.user = this.computed = this.sync = false;
    }

    this.cb = cb;
    this.id = ++uid; // uid for batching
    this.active = true;
    this.dirty = this.computed; // for computed watchers
    this.deps = [];
    this.newDeps = [];
    this.depIds = new Set();
    this.newDepIds = new Set();
    this.expression = expOrFn.toString();

    // parse expression for getter
    if (typeof expOrFn === 'function') {
      this.getter = expOrFn;
    } else {
      this.getter = parsePath(expOrFn);

      if (!this.getter) {
        this.getter = function () {};
      }
    }

    if (this.computed) {
      this.value = undefined;
      this.dep = new Dep();
    } else {
      this.value = this.get();
    }
  }

  /**
   * Evaluate the getter, and re-collect dependencies.
   */
  get() {
    pushTarget(this);
    const vm = this.vm;
    const value = this.getter.call(vm, vm);

    if (this.deep) {
      traverse(value);
    }

    popTarget();
    this.cleanupDeps();
    return value;
  }

  /**
   * Add a dependency to this directive.
   */
  addDep(dep: Dep) {
    const id = dep.id;

    if (!this.newDepIds.has(id)) {
      this.newDepIds.add(id);
      this.newDeps.push(dep);

      if (!this.depIds.has(id)) {
        dep.addSub(this);
      }
    }
  }

  /**
   * Subscriber interface.
   * Will be called when a dependency changes.
   */
  update() {
    if (this.lazy) {
      this.dirty = true;
    } else if (this.sync) {
      this.run();
    } else {
      queueWatcher(this);
    }
  }

  /**
   * Scheduler job interface.
   * Will be called by the scheduler.
   */
  run() {
    if (this.active) {
      const value = this.get();

      if (value !== this.value || isObject(value) || this.deep) {
        // set new value
        const oldValue = this.value;
        this.value = value;

        if (this.user) {
          const info = `callback for watcher "${this.expression}"`;
          invokeWithErrorHandling(
            this.cb,
            this.vm,
            [value, oldValue],
            this.vm,
            info
          );
        } else {
          this.cb.call(this.vm, value, oldValue);
        }
      }
    }
  }

  /**
   * Depend on this watcher. Only for computed property watchers.
   */
  depend() {
    if (this.dep && Dep.target) {
      this.dep.depend();
    }
  }

  /**
   * Evaluate and return the value of the watcher.
   * This only gets called for computed property watchers.
   */
  evaluate() {
    if (this.dirty) {
      this.value = this.get();
      this.dirty = false;
    }

    return this.value;
  }
}
```

`core/observer/dep.js`:

```ts
import { remove } from '../util/index';
import type Watcher from './watcher';

let uid = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
export default class Dep {
  static target: ?Watcher;
  id: number;
  subs: Array<Watcher>;

  constructor() {
    this.id = uid++;
    this.subs = [];
  }

  addSub(sub: Watcher) {
    this.subs.push(sub);
  }

  removeSub(sub: Watcher) {
    remove(this.subs, sub);
  }

  depend() {
    if (Dep.target) {
      Dep.target.addDep(this);
    }
  }

  notify() {
    // stabilize the subscriber list first
    const subs = this.subs.slice();
    for (let i = 0, l = subs.length; i < l; i++) {
      subs[i].update();
    }
  }
}

// the current target watcher being evaluated.
// this is globally unique because there could be only one
// watcher being evaluated at any time.
Dep.target = null;
const targetStack = [];

export function pushTarget(_target: ?Watcher) {
  if (Dep.target) targetStack.push(Dep.target);
  Dep.target = _target;
}

export function popTarget() {
  Dep.target = targetStack.pop();
}
```

`core/observer/index.js`:

```ts
/**
 * Observer class that is attached to each observed
 * object. Once attached, the observer converts the target
 * object's property keys into getter/setters that
 * collect dependencies and dispatch updates.
 */
export class Observer {
  value: any;
  dep: Dep;
  vmCount: number; // number of vms that have this object as root $data

  constructor(value: any) {
    this.value = value;
    this.dep = new Dep();
    this.vmCount = 0;
    def(value, '__ob__', this);

    if (Array.isArray(value)) {
      if (hasProto) {
        protoAugment(value, arrayMethods);
      } else {
        copyAugment(value, arrayMethods, arrayKeys);
      }

      this.observeArray(value);
    } else {
      this.walk(value);
    }
  }

  /**
   * Walk through all properties and convert them into
   * getter/setters. This method should only be called when
   * value type is Object.
   */
  walk(obj: Object) {
    const keys = Object.keys(obj);

    for (let i = 0; i < keys.length; i++) {
      defineReactive(obj, keys[i]);
    }
  }

  /**
   * Observe a list of Array items.
   */
  observeArray(items: Array<any>) {
    for (let i = 0, l = items.length; i < l; i++) {
      observe(items[i]);
    }
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
export function observe(value: any, asRootData: ?boolean): Observer | void {
  if (!isObject(value) || value instanceof VNode) {
    return;
  }

  let ob: Observer | void;

  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    shouldObserve &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value);
  }

  if (asRootData && ob) {
    ob.vmCount++;
  }

  return ob;
}

/**
 * Define a reactive property on an Object.
 */
export function defineReactive(
  obj: Object,
  key: string,
  val: any,
  customSetter?: ?Function,
  shallow?: boolean
) {
  const dep = new Dep();

  const property = Object.getOwnPropertyDescriptor(obj, key);

  if (property && property.configurable === false) {
    return;
  }

  // cater for pre-defined getter/setters
  const getter = property && property.get;
  const setter = property && property.set;

  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key];
  }

  let childOb = !shallow && observe(val);

  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter() {
      const value = getter ? getter.call(obj) : val;

      if (Dep.target) {
        dep.depend();

        // 对于数组的特殊处理:
        if (childOb) {
          // 1. 收集数组本身依赖.
          childOb.dep.depend();

          // 2. 收集嵌套数组依赖.
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }

      return value;
    },
    set: function reactiveSetter(newVal) {
      const value = getter ? getter.call(obj) : val;

      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return;
      }

      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }

      childOb = !shallow && observe(newVal);
      dep.notify();
    },
  });
}
```

### Vue Array Watcher

```ts
const methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse',
];

methodsToPatch.forEach(function (method) {
  // Cache original method.
  const original = Array.prototype[method];

  def(arrayMethods, method, function mutator(...args) {
    const result = original.apply(this, args);
    const ob = this.__ob__;
    let inserted;

    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break;
      case 'splice':
        inserted = args.slice(2);
        break;
    }

    if (inserted) ob.observeArray(inserted);
    ob.dep.notify();
    return result;
  });
});
```

### Vue Global Set and Delete API

```ts
/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
Vue.set = function set(target: Array<any> | Object, key: any, val: any): any {
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val;
  }

  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val;
  }

  const ob = target.__ob__;

  if (target._isVue || (ob && ob.vmCount)) {
    return val;
  }

  if (!ob) {
    target[key] = val;
    return val;
  }

  defineReactive(ob.value, key, val);
  ob.dep.notify();
  return val;
};

/**
 * Delete a property and trigger change if necessary.
 */
Vue.del = function del(target: Array<any> | Object, key: any) {
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return;
  }

  const ob = target.__ob__;

  if (target._isVue || (ob && ob.vmCount)) {
    return;
  }

  if (!hasOwn(target, key)) {
    return;
  }

  delete target[key];

  if (!ob) {
    return;
  }

  ob.dep.notify();
};
```

### Vue Computed Watcher

`core/instance/state.js`:

- `Computed Props` 只关注最终计算结果是否发生变化, 是一种性能优化手段.
- `Computed Props` 最终计算结果不变, 不触发后续更新.
- `Computed Props` 创建的 `Watcher` 称为 `Computed Watcher`.

```ts
const computedWatcherOptions = { computed: true };

function initComputed(vm: Component, computed: Object) {
  const watchers = (vm._computedWatchers = Object.create(null));

  for (const key in computed) {
    const userDef = computed[key];
    const getter = typeof userDef === 'function' ? userDef : userDef.get;

    // create internal watcher for the computed property.
    watchers[key] = new Watcher(
      vm,
      getter || noop,
      noop,
      computedWatcherOptions
    );

    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    }
  }
}

export function defineComputed(
  target: any,
  key: string,
  userDef: Object | Function
) {
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = createComputedGetter(key);
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get ?? noop;
    sharedPropertyDefinition.set = userDef.set ?? noop;
  }

  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter(key) {
  return function computedGetter() {
    const watcher = this._computedWatchers && this._computedWatchers[key];

    if (watcher) {
      watcher.depend();
      return watcher.evaluate();
    }
  };
}
```

Legacy `Vuex` rely on `Computed Props`,
see [`Store` constructor](https://github.com/vuejs/vuex/blob/3.x/src/store.js#L281):

```ts
function resetStoreVM(store, state, hot) {
  const oldVm = store._vm;
  store.getters = {};
  store._makeLocalGettersCache = Object.create(null);
  const wrappedGetters = store._wrappedGetters;
  const computed = {};

  forEachValue(wrappedGetters, (fn, key) => {
    computed[key] = partial(fn, store);
    Object.defineProperty(store.getters, key, {
      get: () => store._vm[key],
      enumerable: true,
    });
  });

  // Use a `Vue` instance to store the state tree.
  const silent = Vue.config.silent;
  Vue.config.silent = true;
  store._vm = new Vue({
    data() {
      return {
        $$state: state,
      };
    },
    computed,
  });
  Vue.config.silent = silent;

  if (store.strict) {
    enableStrictMode(store);
  }

  if (oldVm) {
    if (hot) {
      store._withCommit(() => {
        oldVm._data.$$state = null;
      });
    }

    Vue.nextTick(() => oldVm.$destroy());
  }
}
```

### Vue Router Watcher

- `<route-link>` clicked.
- `vm.$router.push(location)`/`vm.$router.replace(location)`.
- `transitionTo(location, onComplete)`.
  - Call routes guard hooks.
  - Change `vm._routerRoot._route`.
  - Call `window.history.pushState`/`window.history.replaceState` in `onComplete`.
- `vm.$route` trigger `<route-view>` re-rendering.

## Vue Modern Reactivity

### Reactive System

- `effect.ts`: `effect`, `track`, `trigger`.
- `baseHandlers.ts`: proxy handler (`get` and `set`).
- `reactive.ts`: `reactive` using ES6 Proxy.
- `ref.ts`:
  - reactive reference using Object Accessors.
  - `ref` performant over `reactive`.
- `computed.ts`: `computed` using `effect` and return a `ref`.

### Reactive Effects

Data `getter`/`setter` -> Notify -> Watcher -> Trigger --> Renderer:

```ts
console.log(data.a); // getHook() get called.
data.a = 2; // setHook() get called.
```

Effects bucket:

- `targetMap` = `target: effectsMap`.
- `effectsMap` = `keyName: effectsSet`.

```ts
type Primitive = string | number | boolean;
type Key = string | symbol;
type Effect<T> = () => T;

const runningEffects = [];

const targetMap = new WeakMap();

const IterateKey = Symbol('IterateKey');
const LengthKey = 'length';

// runEffect -> effect -> proxy.get -> track.
function createEffect<T>(effect: Effect<T>) {
  runningEffects.push(effect);
  effect();
  runningEffects.pop();
}

function track<T extends object>(target: T, key: Key) {
  for (const effect of runningEffects) {
    let effectsMap = targetMap.get(target);
    if (!effectsMap) targetMap.set(target, (effectsMap = new Map()));

    let effects = effectsMap.get(key);
    if (!effects) effectsMap.set(key, (effects = new Set()));

    effects.add(effect);
  }
}

function trigger<T extends object>(target: T, key: Key, type: Type) {
  const effectsMap = targetMap.get(target);
  if (!effectsMap) return;

  const effectsToRun = new Set();

  const ordinaryEffects = effectsMap.get(key);
  ordinaryEffects?.forEach(effect => {
    // Remove current running effect
    // to avoid infinite call stack
    // (skip triggering current tracking effect):
    // reactive.foo = reactive.foo + 1;
    if (effect !== runningEffects.top()) {
      effectsToRun.add(effect);
    }
  });

  if (type === 'ADD' || type === 'DELETE') {
    const iterateEffects = effectsMap.get(IterateKey);
    iterateEffects?.forEach(effect => {
      if (effect !== runningEffects.top()) {
        effectsToRun.add(effect);
      }
    });
  }

  if (type === 'LENGTH') {
    const lengthEffects = effectsMap.get(LengthKey);
    lengthEffects?.forEach(effect => {
      if (effect !== runningEffects.top()) {
        effectsToRun.add(effect);
      }
    });
  }

  effectsToRun.forEach(effect => {
    if (effect.options.scheduler) {
      effect.options.scheduler(effect);
    } else {
      effect();
    }
  });
}

export function reactive<T extends object>(target: T) {
  const handler: ProxyHandler<T> = {
    get(target, key, receiver) {
      const value = Reflect.get(target, key, receiver);
      track(target, key);
      if (value !== null && typeof value === 'object') return reactive(value);
      else return value;
    },
    has(target, key) {
      track(target, key);
      return Reflect.has(target, key);
    },
    ownKeys(target) {
      // Proxy `for key in target` operator.
      track(target, Array.isArray(target) ? LengthKey : IterateKey);
      return Reflect.ownKeys(target);
    },
    set(target, key, value, receiver) {
      const type = Array.isArray(target)
        ? Number(key) < target.length
          ? 'SET'
          : 'LENGTH'
        : Object.hasOwn(target, key)
          ? 'SET'
          : 'ADD';
      const oldValue = Reflect.get(target, key, receiver);
      const result = Reflect.set(target, key, value, receiver);
      if (result && oldValue !== value) trigger(target, key, type);
      return result;
    },
    deleteProperty(target, key) {
      const isOwnKey = Object.hasOwn(target, key);
      const result = Reflect.deleteProperty(target, key);
      if (result && isOwnKey) trigger(target, key, 'DELETE');
      return result;
    },
  };

  return new Proxy(target, handler);
}

export function ref<T extends Primitive>(raw?: T) {
  const refObject = {
    get value() {
      track(refObject, 'value');
      return raw;
    },
    set value(newValue: T) {
      raw = newValue;
      trigger(refObject, 'value');
    },
  };

  return refObject;
}

export function computed<T extends Primitive>(getter: () => T) {
  const refObject = ref<T>();
  createEffect(() => (refObject.value = getter()));
  return refObject;
}
```

```ts
interface Product {
  price: number;
  quantity: number;
}

const product = reactive<Product>({ price: 5, quantity: 2 });
const salePrice = computed(() => product.price * 0.9);
const total = computed(() => salePrice.value * product.quantity);

console.assert(salePrice.value === 4.5);
console.assert(total.value === 9);

product.quantity = 3;
console.assert(total.value === 13.5);

product.quantity = 4;
console.assert(total.value === 18);

product.price = 6;
console.assert(salePrice.value === 5.4);
console.assert(total.value === 21.6);

product.price = 10;
console.assert(salePrice.value === 9);
console.assert(total.value === 36);
```

### Reactive Proxy

- Simple: `Proxy` 使用上比 `Object.defineProperty` 方便.
  - `Object.defineProperty` 只能监听对象, 导致 `Vue 2` `data` 属性必须通过一个返回对象的函数方式初始化,
  - `Vue 3` 更加多元化, 可以监听任意数据.
- Performant: `Proxy` 代理整个对象, `Object.defineProperty` 只代理对象上的某个属性.
  - `Object.defineProperty` 由于每次只能监听对象一个键的 `get`/`set`, 导致需要循环监听浪费性能.
  - `Proxy` 可以一次性监听到所有属性.
- Lazy: `Proxy` 性能优于 `Object.defineProperty`.
  - 如果对象内部要全部递归代理, 则 `Proxy` 可以只在调用时递归.
  - `Object.defineProperty` 需要在一开始就全部递归.
- Feature:
  - 对象上定义新属性时, 只有 `Proxy` 可以监听到:
    - Vue2: 提供 `Vue.set`/`Vue.delete` 等辅助方法.
    - Vue3: `Proxy` 监听新属性.
  - 数组新增删除修改时, 只有 `Proxy` 可以监听到:
    - `Object.defineProperty` 无法监听数组, `Proxy` 则可以直接监听数组变化.
    - Vue2: 重写数组方法监听数组变化.
    - Vue3: `Proxy` 监听数组变化.
- `Proxy` 不兼容 IE, `Object.defineProperty` 不兼容 IE8 及以下.

Vue 2:

```ts
Vue.set(app.items, indexOfItem, newValue);
Vue.set(app.product, newField, newValue);
```

Vue 3:

```ts
app.items[indexOfItem] = newValue;
app.product[newField] = newValue;
```

## Vue Setup

[Setup workflow](https://github.com/vuejs/core/blob/main/packages/runtime-core/src/component.ts):

- [`mountComponent(initialVNode, container)`](https://github.com/vuejs/core/blob/main/packages/runtime-core/src/renderer.ts).
- `instance = createComponentInstance(initialVNode)`.
- [`setupComponent(instance)`](https://github.com/vuejs/core/blob/main/packages/runtime-core/src/component.ts).
- `setupStatefulComponent(instance)`.
  - `setupContext = createSetupContext(instance)`: `{ attrs, slots, emit }`.
  - `setupResult = setup(instance.props, setupContext)`.
  - `handleSetupResult(instance, setupResult)`.
- 对渲染上下文 `instance.ctx` (`Options API` 用户代码中的 `this`) 属性的访问和修改,
  代理到对 `setupState`/`ctx`/`data`/`props` 中的数据的访问和修改
  (`PublicInstanceProxyHandlers`):
  - `setupState`: `setup()` return value, 最高优先级.
  - `data`: data from `Options API`.
  - `props`: props from `Options API`.
  - `ctx`: computed value/methods from `Options API`.

```ts
const mountComponent = (
  initialVNode,
  container,
  anchor,
  parentComponent,
  parentSuspense,
  isSVG,
  optimized
) => {
  // 创建组件实例
  const instance = (initialVNode.component = createComponentInstance(
    initialVNode,
    parentComponent,
    parentSuspense
  ));

  // 设置组件实例
  setupComponent(instance);

  // 设置并运行带副作用的渲染函数
  setupRenderEffect(
    instance,
    initialVNode,
    container,
    anchor,
    parentSuspense,
    isSVG,
    optimized
  );
};

function createComponentInstance(vnode, parent, suspense) {
  // 继承父组件实例上的 appContext, 如果是根组件, 则直接从根 vnode 中取.
  const appContext =
    (parent ? parent.appContext : vnode.appContext) || emptyAppContext;

  const instance = {
    // 组件唯一 id
    uid: uid++,
    // 组件 vnode
    vnode,
    // 父组件实例
    parent,
    // app 上下文
    appContext,
    // vnode 节点类型
    type: vnode.type,
    // 根组件实例
    root: null,
    // 新的组件 vnode
    next: null,
    // 子节点 vnode
    subTree: null,
    // 带副作用更新函数
    update: null,
    // 渲染函数
    render: null,
    // 渲染上下文代理
    proxy: null,
    // 带有 with 区块的渲染上下文代理
    withProxy: null,
    // 响应式相关对象
    effects: null,
    // 依赖注入相关
    provides: parent ? parent.provides : Object.create(appContext.provides),
    // 渲染代理的属性访问缓存
    accessCache: null,
    // 渲染缓存
    renderCache: [],
    // 渲染上下文
    ctx: EMPTY_OBJ,
    // data 数据
    data: EMPTY_OBJ,
    // props 数据
    props: EMPTY_OBJ,
    // 普通属性
    attrs: EMPTY_OBJ,
    // 插槽相关
    slots: EMPTY_OBJ,
    // 组件或者 DOM 的 ref 引用
    refs: EMPTY_OBJ,
    // setup 函数返回的响应式结果
    setupState: EMPTY_OBJ,
    // setup 函数上下文数据
    setupContext: null,
    // 注册的组件
    components: Object.create(appContext.components),
    // 注册的指令
    directives: Object.create(appContext.directives),
    // suspense 相关
    suspense,
    // suspense 异步依赖
    asyncDep: null,
    // suspense 异步依赖是否都已处理
    asyncResolved: false,
    // 是否挂载
    isMounted: false,
    // 是否卸载
    isUnmounted: false,
    // 是否激活
    isDeactivated: false,
    // 生命周期, before create
    bc: null,
    // 生命周期, created
    c: null,
    // 生命周期, before mount
    bm: null,
    // 生命周期, mounted
    m: null,
    // 生命周期, before update
    bu: null,
    // 生命周期, updated
    u: null,
    // 生命周期, unmounted
    um: null,
    // 生命周期, before unmount
    bum: null,
    // 生命周期, deactivated
    da: null,
    // 生命周期 activated
    a: null,
    // 生命周期 render triggered
    rtg: null,
    // 生命周期 render tracked
    rtc: null,
    // 生命周期 error captured
    ec: null,
    // 派发事件方法
    emit: null,
  };

  // 初始化渲染上下文
  instance.ctx = new Proxy(instance, {
    get(target, key, receiver) {
      // data, props, computed, methods etc.
      const [data, props] = target;

      if (data && key in data) {
        return data[key];
      } else if (key in props) {
        return props[key];
      } else {
        console.error('Not exist.');
      }
    },
    set(target, key, value, receiver) {
      // data, props, computed, methods etc.
      if (data && key in data) {
        data[key] = value;
      } else if (key in props) {
        console.warn(`Attempting to mutate read-only prop ${key}.`);
      } else {
        console.error('Not exist.');
      }
    },
  });

  // 初始化根组件指针
  instance.root = parent ? parent.root : instance;
  // 初始化派发事件方法
  instance.emit = emit.bind(null, instance);

  return instance;
}

function setupComponent(instance, isSSR = false) {
  const { props, children, shapeFlag } = instance.vnode;

  // STATEFUL_COMPONENT
  const isStateful = shapeFlag & 4;

  // 初始化 props
  initProps(instance, props, isStateful, isSSR);
  // 初始化 插槽
  initSlots(instance, children);

  // 设置有状态的组件实例
  const setupResult = isStateful
    ? setupStatefulComponent(instance, isSSR)
    : undefined;

  return setupResult;
}

function setupStatefulComponent(instance, isSSR) {
  const Component = instance.type;

  // 创建渲染代理的属性访问缓存
  instance.accessCache = {};

  // 创建渲染上下文代理
  instance.proxy = new Proxy(instance.ctx, PublicInstanceProxyHandlers);

  // 判断处理 setup 函数
  const { setup } = Component;

  if (setup) {
    // 如果 setup 函数带参数, 则创建一个 setupContext
    const setupContext = (instance.setupContext =
      setup.length > 1 ? createSetupContext(instance) : null);
    // 执行 setup 函数, 获取结果
    const setupResult = callWithErrorHandling(
      setup,
      instance,
      0 /* SETUP_FUNCTION */,
      [shallowReadonly(instance.props), setupContext]
    );
    // 处理 setup 执行结果
    handleSetupResult(instance, setupResult);
  } else {
    // 完成组件实例设置
    finishComponentSetup(instance);
  }
}

function handleSetupResult(instance, setupResult) {
  if (isFunction(setupResult)) {
    // setup 返回渲染函数
    instance.render = setupResult;
  } else if (isObject(setupResult)) {
    // 把 setup 返回结果变成响应式
    instance.setupState = reactive(setupResult);
  }

  finishComponentSetup(instance);
}
```

## Vue Reference

- [Vue.js Design and Implementation](https://github.com/HcySunYang/code-for-vue-3-book)
