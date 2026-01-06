---
tags: [Web, Vue, Instance]
sidebar_position: 24
---

# Instance

```ts
// Vue.prototype._init: core/instance/init.js

const vm: Component = this
```

```ts
// Vue.prototype._init: core/instance/init.js
vm._uid = uid++ // 每个Vue实例都拥有一个唯一的 id
vm._isVue = true // 这个表示用于避免Vue实例对象被观测(observed)
vm.$options = options // 当前Vue实例的初始化选项, 注意: 这是经过 mergeOptions() 后的
vm._renderProxy = vm // 渲染函数作用域代理
vm._self = vm // 实例本身
```

```ts
// initLifecycle(vm): core/instance/lifecycle.js
vm.$parent = vmParent
vm.$root = vmParent ? vmParent.$root : vm

vm.$children = []
vm.$refs = {}
```

```ts
// initEvents(vm): core/instance/events.js
vm._events = Object.create(null)
vm._hasHookEvent = false
```

```ts
// initRender(vm): core/instance/render.js
vm._vnode = null // root of child tree
vm._staticTrees = null // v-once cached trees

vm.$vnode = vnode
vm.$slots = slots
vm.$scopedSlots = scopedSlots
```

```ts
// initState(vm): core/instance/state.js
vm._watchers = []
vm._data = data
```

```ts
// mountComponent(): core/instance/lifecycle.js
vm.$el = el
```

```ts
// initComputed(): core/instance/state.js
vm._computedWatchers = Object.create(null)
```

```ts
// initProps(): core/instance/state.js
vm._props = {}
```

```ts
// initProvide(): core/instance/inject.js
vm._provided = provided
```
