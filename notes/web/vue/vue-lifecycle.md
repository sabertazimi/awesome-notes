---
tags: [Web, Vue, Lifecycle]
sidebar_position: 23
---

# Lifecycle

![Lifecycle](./figures/lifecycle.png)

## Vue Options Lifecycle

`beforeCreate`/`created` in `core/instance/init.js`:

- `beforeCreate` cannot access `props`/`data`/`methods`.
- `created` can access `props`/`data`/`methods`.
- `beforeCreate`/`created` cannot access DOM.

`beforeMount`/`mounted` in `core/instance/lifecycle.js`:

- 对于同步渲染的子组件, `mounted` 执行顺序为**先子后父**.
- `mounted` is called for render-created child components in its inserted hook.

`beforeDestroy`/`destroyed` in `core/instance/lifecycle.js`:

- 调用 `beforeDestroy` 钩子函数.
- 从 `parent` 的 `$children` 中删掉自身.
- 删除 `watcher`.
- 当前渲染的 VNode 执行销毁钩子函数.
- 调用 `destroyed` 钩子函数.
- 在 `$destroy` 的执行过程中,
  会执行 `vm.__patch__(vm._vnode, null)` 触发子组件的销毁钩子函数 (递归),
  `destroyed` 钩子函数执行顺序为**先子后父**.

## Vue Composition Lifecycle

```ts
const currentInstance = null

function mountComponent(vnode, container, anchor) {
  const componentOptions = vnode.type
  const { setup, data, props, attrs, slots } = componentOptions
  const instance = {
    state: reactive(data),
    props: shallowReadonly(props),
    isMounted: false,
    subTree: null,
    slots,
    mounted: [],
  }

  const setupContext = { attrs, slots }
  setCurrentInstance(instance)

  const setupResult = setup(allowReadonly(instance.props), setupContext)
  setCurrentInstance(null)

  effect(
    () => {
      const subTree = render.call(renderContext, renderContext)

      if (!instance.mounted)
        instance.mounted?.forEach(hook => hook.call(renderContext))
    },
    {
      scheduler: queueJob,
    }
  )
}

function onMounted(fn) {
  if (currentInstance)
    currentInstance.mounted.push(fn)
  else console.error('`onMounted()` can only be called in `setup()`.')
}
```
