---
tags: [Web, Vue]
sidebar_position: 1
---

# Vue Notes

:::tip[Version Coverage]

These notes cover both Vue 2 (Options API) and Vue 3 (Composition API), including internal implementation details.

:::

## Basic Concepts

- [Directives](./directives.md) - Control flow, binding, events, model directives
- [Components](./components.md) - Computed properties, slots, provide/inject
- [Composition API](./composition-api.md) - Setup, lifecycle, reactivity
- [Animation](./animation.md) - Transitions and animation system
- [Async](./async.md) - Async component, suspense
- [Keep Alive and Teleport](./keep-alive-teleport.md) - Component caching and DOM teleportation
- [Router](./router.md) - Vue Router guide
- [Vuex](./vuex.md) - State management
- [Toolchain](./toolchain.md) - Vite, CLI

## Advanced Internals

- [Constructor](./vue-constructor.md) - Constructor, prototype, global API
- [Global API](./vue-global-api.md) - Global API
- [Options API](./vue-options-api.md) - Options merging, normalization
- [Mounting Workflow](./vue-mounting-workflow.md) - Component initialization and rendering
- [Lifecycle](./vue-lifecycle.md) - Lifecycle hooks execution
- [Instance](./vue-instance.md) - Vue instance properties
- [Virtual DOM](./vue-virtual-dom.md) - VNode structure and types
- [Template Compiler](./vue-template-compiler.md) - Compilation workflow and performance
- [Legacy Reactivity](./vue-legacy-reactivity.md) - Vue 2 reactivity system
- [Modern Reactivity](./vue-modern-reactivity.md) - Vue 3 reactivity system

## Quick Reference

### For Beginners

Start with:

1. [Directives](./directives.md) - Learn v-if, v-for, v-model, event handling
2. [Components](./components.md) - Understand computed, slots, props
3. [Composition API](./composition-api.md) - Explore setup, ref, reactive, computed

### For Advanced Users

Deep dive into:

1. [Constructor](./vue-constructor.md) - How Vue is built
2. [Global API](./vue-global-api.md) - Global API
3. [Options API](./vue-options-api.md) - Options merge strategies
4. [Mounting Workflow](./vue-mounting-workflow.md) - From `new Vue()` to rendering
5. [Lifecycle](./vue-lifecycle.md) - Complete lifecycle execution order
6. [Virtual DOM](./vue-virtual-dom.md) - VNode types and rendering
7. [Template Compiler](./vue-template-compiler.md) - Template to render function
8. [Legacy Reactivity](./vue-legacy-reactivity.md) - Observer/Watcher/Dep system
9. [Modern Reactivity](./vue-modern-reactivity.md) - Proxy/reactive/effect system
