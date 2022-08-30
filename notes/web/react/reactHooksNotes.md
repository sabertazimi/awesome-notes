---
author: Sabertazimi
authorTitle: Web Developer
authorURL: https://github.com/sabertazimi
authorImageURL: https://github.com/sabertazimi.png
tags: [Web, React]
---

# React Hooks Notes

- Reuse stateful logic between components
  (avoid wrapper hell in render props or HOC)
- Split one complex component into smaller functions
- Use more of React features **without classes**
- Class components will read `this.props` **too early** or **too late**,
  because of mutable `this` in React
  (however `props` argument of function components is immutable),
  that says function components capture the **rendered values**.
  more details on
  [Overreacted](https://overreacted.io/how-are-function-components-different-from-classes/).

## Hooks Types

Hooks
[definition](https://github.com/facebook/react/blob/main/packages/react-reconciler/src/ReactFiberHooks.new.js):

- 从 React 内部 (Reconciler) 看, Hooks 可分为三类:
  - State Hooks (`useState/useReducer/useContext/useRef/useCallback/useMemo`):
    主要作用于 `Reconciler.Render` 阶段, `fiber.pendingProps/memoizedProps/memoizedState/updateQueue`.
  - Effect Hooks (`useLayoutEffect`/`useEffect`):
    在 `Reconciler.Render` 阶段设置 `fiber.flags` (effects flags),
    主要作用于 `Reconciler.Commit` 阶段, 功能接近 `ClassComponent.LifeCycle`.
  - Hybrid Hooks (`useDeferredValue/useTransition/useId/useSyncExternalStore`):
    State + Effect Hooks, 既保存状态, 又产生副作用.

```ts
interface Hook {
  // hook 保存的数据.
  memoizedState: any;
  // 本次更新以 baseState 为基础计算新的 state.
  baseState: any;
  // 本次更新开始时已有的 update 队列.
  baseQueue: Update<any, any> | null;
  // 本次更新需要增加的 update 队列.
  queue: UpdateQueue<any, any> | null;
  // 指向下一个 hook.
  next: Hook | null;
}

interface Update<S, A> {
  lane: Lane;
  action: A;
  hasEagerState: boolean;
  eagerState: S | null;
  next: Update<S, A>;
}

interface UpdateQueue<S, A> {
  pending: Update<S, A> | null;
  interleaved: Update<S, A> | null;
  dispatch: ((A) => mixed) | null;
  lanes: Lanes;
  lastRenderedReducer: ((S, A) => S) | null;
  lastRenderedState: S | null;
}

interface Effect {
  tag: HookFlags;
  create: () => (() => void) | void;
  destroy: (() => void) | void;
  deps: Array<mixed> | null;
  next: Effect;
}

type HookType =
  | 'useState'
  | 'useReducer'
  | 'useContext'
  | 'useRef'
  | 'useEffect'
  | 'useInsertionEffect'
  | 'useLayoutEffect'
  | 'useCallback'
  | 'useMemo'
  | 'useImperativeHandle'
  | 'useDebugValue'
  | 'useDeferredValue'
  | 'useTransition'
  | 'useMutableSource'
  | 'useSyncExternalStore'
  | 'useId'
  | 'useCacheRefresh';
```

## Hooks Memoized State

- `FunctionComponent` 内部所有 Hooks memoized state
  组成 `FunctionComponent` `Fiber` memoized state.
- `FunctionComponent` `Fiber`: `fiber.memoizedState` 指向第一个 `Hook`.

| Hooks       | Memoized State                                 |
| ----------- | ---------------------------------------------- |
| useRef      | `ref: { current }`                             |
| useMemo     | `[nextValue, deps]`                            |
| useCallback | `[callback, deps]`                             |
| useState    | `state`                                        |
| useEffect   | `effect: { tag, create, destroy, deps, next }` |

## Hooks Workflow

- `Reconciler.Render`/`Reconciler.Update`:
  `performUnitOfWork` -> `beginWork` -> `updateFunctionComponent`
  -> `renderWithHooks` -> `mountXXX`/`updateXXX`/`rerenderXXX`
  -> `reconcileChildren`.
- `Reconciler.Commit`:
  - `Update` layout effect (`useLayoutEffect`):
    - `Mutation` phase: `commitWork` -> `commitHooKEffectListUnmount` -> `effect.destroy`.
    - `Layout` phase: `commitLifeCycles` -> `commitHookEffectListMount` -> `effect.create`.
  - `Update | Passive` passive effect (`useEffect`):
    - `Layout` phase: `commitLifeCycles` -> `schedulePassiveEffects`, 收集 Effects.
    - `scheduleCallback` -> `flushPassiveEffects` -> `effect.destroy` -> `effect.create`.
  - 只有 `effect.tag` 包含 `HasEffect` 时才会调用 `effect.destroy` 和 `effect.create`.
- `renderWithHooks`:
  - `HooksDispatcherOnMount`: `mountXXX`.
  - `HooksDispatcherOnUpdate`: `updateXXX`.
  - `HooksDispatcherOnRerender`: `updateXXX`/`rerenderXXX`.
- **`mountXXX`**: `mountWorkInProgressHook` -> respective mount logic.
- **`updateXXX`**: `updateWorkInProgressHook` -> respective update logic.

[ReactReconciler/ReactFiberBeginWork](https://github.com/facebook/react/blob/main/packages/react-reconciler/src/ReactFiberBeginWork.new.js):

```ts
function beginWork(
  current: Fiber | null,
  workInProgress: Fiber,
  renderLanes: Lanes
): Fiber | null {
  const updateLanes = workInProgress.lanes;

  switch (workInProgress.tag) {
    case FunctionComponent: {
      const Component = workInProgress.type;
      const unresolvedProps = workInProgress.pendingProps;
      const resolvedProps =
        workInProgress.elementType === Component
          ? unresolvedProps
          : resolveDefaultProps(Component, unresolvedProps);
      return updateFunctionComponent(
        current,
        workInProgress,
        Component,
        resolvedProps,
        renderLanes
      );
    }
  }
}

function updateFunctionComponent(
  current,
  workInProgress,
  Component,
  nextProps: any,
  renderLanes
) {
  const context = prepareToReadContext(workInProgress, renderLanes);

  // 进入 Hooks 相关逻辑, 最后返回下级 ReactElement 对象.
  const nextChildren = renderWithHooks(
    current,
    workInProgress,
    Component,
    nextProps,
    context,
    renderLanes
  );

  const hasId = checkDidRenderIdHook();

  if (current !== null && !didReceiveUpdate) {
    bailoutHooks(current, workInProgress, renderLanes);
    return bailoutOnAlreadyFinishedWork(current, workInProgress, renderLanes);
  }

  if (getIsHydrating() && hasId) {
    pushMaterializedTreeId(workInProgress);
  }

  // React DevTools reads this flag.
  workInProgress.flags |= PerformedWork;

  // 进入 Reconcile 函数, 生成下级 Fiber 节点.
  reconcileChildren(current, workInProgress, nextChildren, renderLanes);
  // 返回下级 Fiber 节点.
  return workInProgress.child;
}
```

[ReactReconciler/ReactFiberHooks](https://github.com/facebook/react/blob/main/packages/react-reconciler/src/ReactFiberHooks.new.js):

```ts
// 渲染优先级.
let renderLanes: Lanes = NoLanes;

// 当前正在构造的 Fiber, 等同于 workInProgress.
let currentlyRenderingFiber: Fiber = null;

// Hooks 链表被存储在 fiber.memoizedState:
// currentHook = fiber(current).memoizedState.
let currentHook: Hook | null = null;
// workInProgressHook = fiber(workInProgress).memoizedState.
let workInProgressHook: Hook | null = null;

// 在 FunctionComponent 的执行过程中, 是否再次发起了更新.
// 只有 FunctionComponent 被完全执行之后才会重置.
// 当 render 异常时, 通过该变量可以决定是否清除 render 过程中的更新.
let didScheduleRenderPhaseUpdate = false;

// 在本次 FunctionComponent 的执行过程中, 是否再次发起了更新.
// 每一次调用 FunctionComponent 都会被重置.
let didScheduleRenderPhaseUpdateDuringThisPass = false;

// 在本次 FunctionComponent 的执行过程中, 重新发起更新的最大次数.
const RE_RENDER_LIMIT = 25;

export function renderWithHooks<Props, SecondArg>(
  current: Fiber | null,
  workInProgress: Fiber,
  Component: (p: Props, arg: SecondArg) => any,
  props: Props,
  secondArg: SecondArg,
  nextRenderLanes: Lanes
): any {
  // Store context.
  renderLanes = nextRenderLanes;
  currentlyRenderingFiber = workInProgress;

  workInProgress.memoizedState = null;
  workInProgress.updateQueue = null;
  workInProgress.lanes = NoLanes;

  // Mount or Update hooks dispatcher.
  ReactCurrentDispatcher.current =
    current === null || current.memoizedState === null
      ? HooksDispatcherOnMount
      : HooksDispatcherOnUpdate;

  // 执行 FunctionComponent 函数, 执行 `useXXX`.
  let children = Component(props, secondArg);

  // Check if there was a render phase update
  if (didScheduleRenderPhaseUpdateDuringThisPass) {
    // Keep rendering in a loop for as long as render phase updates continue.
    // Use a counter to prevent infinite loops.
    let numberOfReRenders = 0;

    do {
      didScheduleRenderPhaseUpdateDuringThisPass = false;
      localIdCounter = 0;

      if (numberOfReRenders >= RE_RENDER_LIMIT) {
        throw new Error(
          'Too many re-renders. React limits the number of renders to prevent ' +
            'an infinite loop.'
        );
      }

      numberOfReRenders += 1;

      // Start over from the beginning of the list
      currentHook = null;
      workInProgressHook = null;
      workInProgress.updateQueue = null;
      // Rerender hooks dispatcher.
      ReactCurrentDispatcher.current = HooksDispatcherOnRerender;

      children = Component(props, secondArg);
    } while (didScheduleRenderPhaseUpdateDuringThisPass);
  }

  // Restore context.
  ReactCurrentDispatcher.current = ContextOnlyDispatcher;
  renderLanes = NoLanes;
  currentlyRenderingFiber = null;
  currentHook = null;
  workInProgressHook = null;
  didScheduleRenderPhaseUpdate = false;

  return children;
}

const HooksDispatcherOnMount: Dispatcher = {
  useCallback: mountCallback,
  useContext: readContext,
  useEffect: mountEffect,
  useImperativeHandle: mountImperativeHandle,
  useLayoutEffect: mountLayoutEffect,
  useInsertionEffect: mountInsertionEffect,
  useMemo: mountMemo,
  useReducer: mountReducer,
  useRef: mountRef,
  useState: mountState,
  useDebugValue: mountDebugValue,
  useDeferredValue: mountDeferredValue,
  useTransition: mountTransition,
  useMutableSource: mountMutableSource,
  useSyncExternalStore: mountSyncExternalStore,
  useId: mountId,
  unstable_isNewReconciler: enableNewReconciler,
  readContext,
};

const HooksDispatcherOnUpdate: Dispatcher = {
  useCallback: updateCallback,
  useContext: readContext,
  useEffect: updateEffect,
  useImperativeHandle: updateImperativeHandle,
  useInsertionEffect: updateInsertionEffect,
  useLayoutEffect: updateLayoutEffect,
  useMemo: updateMemo,
  useReducer: updateReducer,
  useRef: updateRef,
  useState: updateState,
  useDebugValue: updateDebugValue,
  useDeferredValue: updateDeferredValue,
  useTransition: updateTransition,
  useMutableSource: updateMutableSource,
  useSyncExternalStore: updateSyncExternalStore,
  useId: updateId,
  unstable_isNewReconciler: enableNewReconciler,
  readContext,
};

const HooksDispatcherOnRerender: Dispatcher = {
  useCallback: updateCallback,
  useContext: readContext,
  useEffect: updateEffect,
  useImperativeHandle: updateImperativeHandle,
  useInsertionEffect: updateInsertionEffect,
  useLayoutEffect: updateLayoutEffect,
  useMemo: updateMemo,
  useReducer: rerenderReducer,
  useRef: updateRef,
  useState: rerenderState,
  useDebugValue: updateDebugValue,
  useDeferredValue: rerenderDeferredValue,
  useTransition: rerenderTransition,
  useMutableSource: updateMutableSource,
  useSyncExternalStore: updateSyncExternalStore,
  useId: updateId,
  unstable_isNewReconciler: enableNewReconciler,
  readContext,
};

// 创建 Hook, 挂载到 Hooks 链表.
function mountWorkInProgressHook(): Hook {
  // hook 实例
  const hook: Hook = {
    memoizedState: null,
    baseState: null,
    baseQueue: null,
    queue: null,
    next: hookForB,
  };

  if (workInProgressHook === null) {
    // Fist hook in the list.
    currentlyRenderingFiber.memoizedState = workInProgressHook = hook;
  } else {
    // Append to the end of list.
    workInProgressHook = workInProgressHook.next = hook;
  }

  return workInProgressHook;
}

// 移动 Hooks 链表指针, 获取 workInProgressHook.
function updateWorkInProgressHook(): Hook {
  let nextCurrentHook: Hook | null;
  let nextWorkInProgressHook: Hook | null;

  if (currentHook === null) {
    const current = currentlyRenderingFiber.alternate;
    nextCurrentHook = current ? current.memoizedState : null;
  } else {
    nextCurrentHook = currentHook.next;
  }

  if (workInProgressHook === null) {
    nextWorkInProgressHook = currentlyRenderingFiber.memoizedState;
  } else {
    nextWorkInProgressHook = workInProgressHook.next;
  }

  if (nextWorkInProgressHook !== null) {
    // There's already a work-in-progress. Reuse it.
    workInProgressHook = nextWorkInProgressHook;
    nextWorkInProgressHook = workInProgressHook.next;
    currentHook = nextCurrentHook;
  } else {
    // Clone from the current hook.
    if (nextCurrentHook === null) {
      throw new Error('Rendered more hooks than during the previous render.');
    }

    currentHook = nextCurrentHook;

    const newHook: Hook = {
      memoizedState: currentHook.memoizedState,

      baseState: currentHook.baseState,
      baseQueue: currentHook.baseQueue,
      queue: currentHook.queue,

      next: null,
    };

    if (workInProgressHook === null) {
      // This is the first hook in the list.
      currentlyRenderingFiber.memoizedState = workInProgressHook = newHook;
    } else {
      // Append to the end of the list.
      workInProgressHook = workInProgressHook.next = newHook;
    }
  }

  return workInProgressHook;
}

function commitHookEffectListMount(tag: number, finishedWork: Fiber) {
  const updateQueue: FunctionComponentUpdateQueue | null =
    finishedWork.updateQueue;
  const lastEffect = updateQueue !== null ? updateQueue.lastEffect : null;

  if (lastEffect !== null) {
    const firstEffect = lastEffect.next;
    let effect = firstEffect;

    do {
      if ((effect.tag & tag) === tag) {
        const create = effect.create;
        effect.destroy = create();
      }

      effect = effect.next;
    } while (effect !== firstEffect);
  }
}

function commitHookEffectListUnmount(tag: number, finishedWork: Fiber) {
  const updateQueue: FunctionComponentUpdateQueue | null =
    finishedWork.updateQueue;
  const lastEffect = updateQueue !== null ? updateQueue.lastEffect : null;

  if (lastEffect !== null) {
    const firstEffect = lastEffect.next;
    let effect = firstEffect;

    do {
      if ((effect.tag & tag) === tag) {
        // 根据传入的 tag 过滤 Effects 链表.
        const destroy = effect.destroy;
        effect.destroy = undefined;

        if (destroy !== undefined) {
          destroy();
        }
      }

      effect = effect.next;
    } while (effect !== firstEffect);
  }
}
```

## Minimal Hooks Implementation

```ts
const MyReact = (function () {
  const hooks = [];
  let currentHook = 0; // array of hooks, and an iterator!
  return {
    render(Component) {
      const Comp = Component(); // run effects
      Comp.render();
      currentHook = 0; // reset for next render
      return Comp;
    },
    useEffect(callback, depArray) {
      const hasNoDeps = !depArray;
      const deps = hooks[currentHook]; // type: array | undefined
      const hasChangedDeps = deps
        ? !depArray.every((el, i) => el === deps[i])
        : true;
      if (hasNoDeps || hasChangedDeps) {
        callback();
        hooks[currentHook] = depArray;
      }
      currentHook++; // done with this hook
    },
    useState(initialValue) {
      hooks[currentHook] = hooks[currentHook] || initialValue; // type: any
      const setStateHookIndex = currentHook; // for setState's closure!
      const setState = newState => (hooks[setStateHookIndex] = newState);
      return [hooks[currentHook++], setState];
    },
  };
})();
```

```ts
function Counter() {
  const [count, setCount] = MyReact.useState(0);
  const [text, setText] = MyReact.useState('foo'); // 2nd state hook!
  MyReact.useEffect(() => {
    console.log('effect', count, text);
  }, [count, text]);
  return {
    click: () => setCount(count + 1),
    type: txt => setText(txt),
    noop: () => setCount(count),
    render: () => console.log('render', { count, text }),
  };
}

let App;

App = MyReact.render(Counter);
// effect 0 foo
// render {count: 0, text: 'foo'}

App.click();
App = MyReact.render(Counter);
// effect 1 foo
// render {count: 1, text: 'foo'}

App.type('bar');
App = MyReact.render(Counter);
// effect 1 bar
// render {count: 1, text: 'bar'}

App.noop();
App = MyReact.render(Counter);
// // no effect run
// render {count: 1, text: 'bar'}

App.click();
App = MyReact.render(Counter);
// effect 2 bar
// render {count: 2, text: 'bar'}
```

```ts
function Component() {
  const [text, setText] = useSplitURL('www.netlify.com');
  return {
    type: txt => setText(txt),
    render: () => console.log({ text }),
  };
}

function useSplitURL(str) {
  const [text, setText] = MyReact.useState(str);
  const masked = text.split('.');
  return [masked, setText];
}

let App;

App = MyReact.render(Component);
// { text: [ 'www', 'netlify', 'com' ] }

App.type('www.reactjs.org');
App = MyReact.render(Component);
// { text: [ 'www', 'reactjs', 'org' ] }}
```

## UseState Hook

- Read rendered props/state.
- Return value of `useState` is `ref` to `hooks[idx]`:
  direct change to return value doesn't change state value.
- Return function of `useState` (`setState`) is to change value of `hooks[idx]`.
- 由于 setState 更新状态 (dispatch action) 时基于 hook.BaseState,
  `setState(value + 1)` 与 `setState(value => value + 1)` 存在差异.
- 当在 useEffect 中调用 setState 时, 最好使用 `setState(callback)` 形式,
  这样可以不用再 Deps List 中显式声明 state, 也可以避免一些 BUG.
- `dispatchAction`:
  - 创建 `Update` 对象.
  - 将 Update 对象添加到 hook.queue.pending 队列.
  - 根据 reducerEagerState 与 currentState, 决定是否发起新的 Reconciler 调度.

### UseState Hooks Dispatcher

```ts
function mountState<T>(initialState: T) {
  const hook = mountWorkInProgressHook();

  if (typeof initialState === 'function') {
    initialState = initialState();
  }

  // Setup Hook.
  hook.memoizedState = hook.baseState = initialState;
  const queue = (hook.queue = {
    pending: null,
    dispatch: null,
    lastRenderedReducer: basicStateReducer,
    lastRenderedState: initialState,
  });
  const dispatch = (queue.dispatch = dispatchAction.bind(
    null,
    currentlyRenderingFiber,
    queue
  ));

  // Return Hook state and dispatch action.
  return [hook.memoizedState, dispatch];
}

function updateState<T>(initialState: T) {
  const basicStateReducer = (state, action) => {
    return typeof action === 'function' ? action(state) : action;
  };

  return updateReducer(basicStateReducer);
}

function dispatchAction<S, A>(
  fiber: Fiber,
  queue: UpdateQueue<S, A>,
  action: A
) {
  // 1. 创建 Update 对象.
  const eventTime = requestEventTime();
  const lane = requestUpdateLane(fiber);
  const update: Update<S, A> = {
    lane,
    action,
    eagerReducer: null,
    eagerState: null,
    next: null,
  };

  // 2. 将 Update 对象添加到 hook.queue.pending 队列.
  const pending = queue.pending;
  if (pending === null) {
    // 首个 Update, 创建一个环形链表.
    update.next = update;
  } else {
    update.next = pending.next;
    pending.next = update;
  }
  queue.pending = update;

  const alternate = fiber.alternate;
  if (
    fiber === currentlyRenderingFiber ||
    (alternate !== null && alternate === currentlyRenderingFiber)
  ) {
    // 渲染时更新, 做好全局标记.
    didScheduleRenderPhaseUpdateDuringThisPass = didScheduleRenderPhaseUpdate =
      true;
  } else {
    if (
      fiber.lanes === NoLanes &&
      (alternate === null || alternate.lanes === NoLanes)
    ) {
      const lastRenderedReducer = queue.lastRenderedReducer;

      if (lastRenderedReducer !== null) {
        let prevDispatcher;
        const currentState: S = queue.lastRenderedState;
        const eagerState = lastRenderedReducer(currentState, action);
        update.eagerReducer = lastRenderedReducer;
        update.eagerState = eagerState;

        // 若在 Render 阶段, reducerEagerState === currentState,
        // 则可以无需再次计算状态, 跳过调度阶段, 后续直接使用 update.eagerState.
        if (is(eagerState, currentState)) {
          return;
        }
      }
    }

    // 3. 发起调度更新, 进入 Reconciler.
    scheduleUpdateOnFiber(fiber, lane, eventTime);
  }
}
```

[Queueing series of state updates](https://beta.reactjs.org/learn/queueing-a-series-of-state-updates):

```ts
export function getFinalState(baseState, queue) {
  let finalState = baseState;

  for (const update of queue) {
    finalState = typeof update === 'function' ? update(finalState) : update;
  }

  return finalState;
}
```

### UseState Hooks Usage

```ts
setState(prevState => {
  // Object.assign would also work
  return { ...prevState, ...updatedValues };
});
```

```ts
let newState = baseState;
const firstUpdate = hook.baseQueue.next;
let update = firstUpdate;

// setState(value + 1) 与 setState(value => value + 1) 存在差异
// 遍历 baseQueue 中的每一个 update
do {
  if (typeof update.action === 'function') {
    newState = update.action(newState);
  } else {
    newState = action;
  }

  update = reconciler();
} while (update !== firstUpdate);
```

```tsx
import { useState } from 'react';

function Example() {
  // Declare a new state variable, which we'll call "count"
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
}
```

```ts
import { useEffect, useState } from 'react';

function FriendStatus(props) {
  const [isOnline, setIsOnline] = useState(null);

  function handleStatusChange(status) {
    setIsOnline(status.isOnline);
  }

  useEffect(() => {
    ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);

    return () => {
      ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
    };
  });

  if (isOnline === null) {
    return 'Loading...';
  }

  return isOnline ? 'Online' : 'Offline';
}

// Mount with { friend: { id: 100 } } props
ChatAPI.subscribeToFriendStatus(100, handleStatusChange); // Run first effect

// Update with { friend: { id: 200 } } props
// Clean up previous effect
ChatAPI.unsubscribeFromFriendStatus(100, handleStatusChange);
ChatAPI.subscribeToFriendStatus(200, handleStatusChange); // Run next effect

// Update with { friend: { id: 300 } } props
// Clean up previous effect
ChatAPI.unsubscribeFromFriendStatus(200, handleStatusChange);
ChatAPI.subscribeToFriendStatus(300, handleStatusChange); // Run next effect

// Unmount
ChatAPI.unsubscribeFromFriendStatus(300, handleStatusChange); // Clean up last effect
```

## UseReducer Hook

- Use useState whenever manage a JS **primitive** (e.g. string, boolean, integer).
- Use useReducer whenever manage an **object** or **array**.
- It’s best to put states together in one state object
  when they conditionally dependent on each other (useReducer).
- Using useReducer over useState gives us predictable state transitions.
  It comes in very powerful when state changes become more complex.

### UseReducer Hooks Dispatcher

```ts
function mountReducer<S, I, A>(
  reducer: (S, A) => S,
  initialArg: I,
  init?: (I) => S
): [S, Dispatch<A>] {
  // 1. Create Hook.
  const hook = mountWorkInProgressHook();
  let initialState;

  if (init !== undefined) {
    initialState = init(initialArg);
  } else {
    initialState = initialArg;
  }

  // 2. Setup Hook.
  // 2.1 Set hook.memoizedState/hook.baseState.
  hook.memoizedState = hook.baseState = initialState;
  // 2.2 Set hook.queue.
  const queue = (hook.queue = {
    pending: null,
    dispatch: null,
    lastRenderedReducer: reducer,
    lastRenderedState: initialState,
  });
  // 2.3 Set hook.dispatch.
  const dispatch: Dispatch<A> = (queue.dispatch = dispatchAction.bind(
    null,
    currentlyRenderingFiber,
    queue
  ));

  // 3. Return Hook state and dispatch action.
  return [hook.memoizedState, dispatch];
}

function updateReducer<S, I, A>(
  reducer: (S, A) => S,
  initialArg: I,
  init?: (I) => S
): [S, Dispatch<A>] {
  // Get workInProgressHook.
  const hook = updateWorkInProgressHook();
  const queue = hook.queue;
  queue.lastRenderedReducer = reducer;
  const current: Hook = currentHook;

  // The last rebase update that is NOT part of the base state.
  let baseQueue = current.baseQueue;
  // The last pending update that hasn't been processed yet.
  const pendingQueue = queue.pending;

  // Append hook.queue.pending to current.baseQueue.
  if (pendingQueue !== null) {
    // We have new updates that haven't been processed yet.
    // We'll add them to the base queue.
    if (baseQueue !== null) {
      // Merge the pending queue and the base queue.
      const baseFirst = baseQueue.next;
      const pendingFirst = pendingQueue.next;
      baseQueue.next = pendingFirst;
      pendingQueue.next = baseFirst;
    }

    current.baseQueue = baseQueue = pendingQueue;
    queue.pending = null;
  }

  // Calculate Hook state.
  if (baseQueue !== null) {
    // We have a queue to process.
    const first = baseQueue.next;
    let newState = current.baseState;

    let newBaseState = null;
    let newBaseQueueFirst = null;
    let newBaseQueueLast = null;
    let update = first;

    do {
      const updateLane = update.lane;

      if (!isSubsetOfLanes(renderLanes, updateLane)) {
        // 优先级不够: 加入到 baseQueue, 等待下一次 render.
        const clone: Update<S, A> = {
          lane: updateLane,
          action: update.action,
          hasEagerState: update.hasEagerState,
          eagerState: update.eagerState,
          next: null,
        };

        if (newBaseQueueLast === null) {
          newBaseQueueFirst = newBaseQueueLast = clone;
          newBaseState = newState;
        } else {
          newBaseQueueLast = newBaseQueueLast.next = clone;
        }

        // Update the remaining priority in the queue.
        currentlyRenderingFiber.lanes = mergeLanes(
          currentlyRenderingFiber.lanes,
          updateLane
        );
        markSkippedUpdateLanes(updateLane);
      } else {
        // This update does have sufficient priority (优先级足够).
        // Merge state.
        if (newBaseQueueLast !== null) {
          // Update baseQueue
          const clone: Update<S, A> = {
            lane: NoLane,
            action: update.action,
            hasEagerState: update.hasEagerState,
            eagerState: update.eagerState,
            next: null,
          };
          newBaseQueueLast = newBaseQueueLast.next = clone;
        }

        // Process this update.
        if (update.hasEagerState) {
          // 性能优化:
          // If this update is a state update (not a reducer) and was processed eagerly,
          // we can use the eagerly computed state
          newState = update.eagerState;
        } else {
          // 调用 Reducer 获取最新状态.
          const action = update.action;
          newState = reducer(newState, action);
        }
      }

      update = update.next;
    } while (update !== null && update !== first);

    if (newBaseQueueLast === null) {
      newBaseState = newState;
    } else {
      newBaseQueueLast.next = newBaseQueueFirst;
    }

    // Mark that the fiber performed work,
    // but only if the new state is different from the current state.
    if (!is(newState, hook.memoizedState)) {
      markWorkInProgressReceivedUpdate();
    }

    // 把计算后结果更新到 workInProgressHook.
    hook.memoizedState = newState;
    hook.baseState = newBaseState;
    hook.baseQueue = newBaseQueueLast;
    queue.lastRenderedState = newState;
  }

  // Return Hook state and dispatch action.
  const dispatch: Dispatch<A> = queue.dispatch;
  return [hook.memoizedState, dispatch];
}
```

### UseReducer Hooks Usage

Use useState if:

- manage JavaScript primitives as state
- have simple state transitions
- want to have business logic within components
- have different properties that don’t change in any correlated manner
  and can be managed by multiple useState hooks
- state is co-located to your component
- for a small application

Use useReducer if:

- manage JavaScript objects or arrays as state
- have complex state transitions
- want to move business logic into reducers
- have different properties that are tied together
  and should be managed in one state object
- update state deep down in your component tree
- for a medium size application
- for easier testing
- for more predictable and maintainable state architecture

```ts
function App() {
  const [state, dispatch] = useState({ count: 0 });

  // 等价于
  const [state, dispatch] = useReducer(
    function basicStateReducer(state, action) {
      return typeof action === 'function' ? action(state) : action;
    },
    { count: 0 }
  );

  // 当需要更新 state 时, 有 2 种方式:
  // 1. 直接设置:
  dispatch({ count: 1 });
  // 2.通过回调函数设置:
  dispatch(state => ({ count: state.count + 1 }));
}
```

```tsx
const insertToHistory = state => {
  if (state && Array.isArray(state.history)) {
    // Do not mutate
    const newHistory = [...state.history];
    newHistory.push(state);
    return newHistory;
  }
  console.warn(`
    WARNING! The state was attempting capture but something went wrong.
    Please check if the state is controlled correctly.
  `);
  return state.history || [];
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'set-theme':
      return { ...state, theme: action.theme, history: insertToHistory(state) };
    case 'add-friend':
      return {
        ...state,
        friends: [...state.friends, action.friend],
        history: insertToHistory(state),
      };
    case 'undo': {
      const isEmpty = !state.history.length;
      if (isEmpty) return state;
      return { ...state.history[state.history.length - 1] };
    }
    case 'reset':
      return { ...initialState, history: insertToHistory(state) };
    default:
      return state;
  }
};

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return <div>App</div>;
};
```

## UseMemo Hook

- Returns a memoized value.
- Only recompute the memoized value when one of the dependencies has changed.
- **Shallow compare** diff.
- **Optimization** helps to
  avoid expensive calculations on every render
  (avoid re-render problem):
  - **Good use** for complex objects or expensive calculations.
  - **Donn't use** for primitive values or simple calculations.

### UseMemo Hooks Dispatcher

```ts
function mountMemo<T>(
  nextCreate: () => T,
  deps: Array<mixed> | void | null
): T {
  const hook = mountWorkInProgressHook();
  const nextDeps = deps === undefined ? null : deps;
  const nextValue = nextCreate();
  hook.memoizedState = [nextValue, nextDeps];
  return nextValue;
}

function updateMemo<T>(
  nextCreate: () => T,
  deps: Array<mixed> | void | null
): T {
  const hook = updateWorkInProgressHook();
  const nextDeps = deps === undefined ? null : deps;
  const prevState = hook.memoizedState;

  if (prevState !== null) {
    if (nextDeps !== null) {
      const prevDeps: Array<mixed> | null = prevState[1];

      if (areHookInputsEqual(nextDeps, prevDeps)) {
        return prevState[0];
      }
    }
  }

  const nextValue = nextCreate();
  hook.memoizedState = [nextValue, nextDeps];
  return nextValue;
}
```

### UseMemo Hooks Usage

```tsx
const Button = ({ color, children }) => {
  const textColor = useMemo(
    () => slowlyCalculateTextColor(color),
    [color] // ✅ Don’t recalculate until `color` changes
  );

  return (
    <button className={`Button-${color} Button-text-${textColor}`}>
      {children}
    </button>
  );
};
```

## UseCallback Hook

- Returns a memoized callback.
- 对事件句柄进行缓存, `useState` 的第二个返回值是 `dispatch`,
  但是每次都是返回新的函数, 使用 `useCallback`, 可以让它使用上次的函数.
  在虚拟 DOM 更新过程中, 如果事件句柄相同, 那么就不用每次都进行
  `removeEventListener` 与 `addEventListener`.
- `useCallback(fn, deps)` is equivalent to `useMemo(() => fn, deps)`.

### UseCallback Hooks Dispatcher

```ts
function mountCallback<T>(callback: T, deps: Array<mixed> | void | null): T {
  const hook = mountWorkInProgressHook();
  const nextDeps = deps === undefined ? null : deps;
  hook.memoizedState = [callback, nextDeps];
  return callback;
}

function updateCallback<T>(callback: T, deps: Array<mixed> | void | null): T {
  const hook = updateWorkInProgressHook();
  const nextDeps = deps === undefined ? null : deps;
  const prevState = hook.memoizedState;

  if (prevState !== null) {
    if (nextDeps !== null) {
      const prevDeps: Array<mixed> | null = prevState[1];

      if (areHookInputsEqual(nextDeps, prevDeps)) {
        return prevState[0];
      }
    }
  }

  hook.memoizedState = [callback, nextDeps];
  return callback;
}
```

### UseCallback Hooks Usage

```tsx
function Parent() {
  const [query, setQuery] = useState('react');

  // ✅ Preserves identity until query changes
  const fetchData = useCallback(() => {
    const url = `https://hn.algolia.com/api/v1/search?query=${query}`;
    // ... Fetch data and return it ...
  }, [query]); // ✅ Callback deps are OK

  return <Child fetchData={fetchData} />;
}

function Child({ fetchData }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchData().then(setData);
  }, [fetchData]); // ✅ Effect deps are OK

  // ...
}
```

## UseRef Hook

### UseRef Hooks Dispatcher

```ts
function mountRef<T>(initialValue: T) {
  const hook = mountWorkInProgressHook();
  const ref = {
    current: initialValue,
  };
  Object.seal(ref);
  hook.memoizedState = ref;
  return ref;
}

function updateRef<T>(initialValue: T) {
  const hook = updateWorkInProgressHook();
  return hook.memoizedState;
}
```

### Refs Features

- Mutable Value:
  `useRef()` is useful for for keeping any mutable value around.
  Updating reference values inside handlers/useEffect callbacks is good,
  updating reference values during rendering (outside callbacks) is bad.
- Lifecycle Persisted Value:
  `useRef()` creates a plain JavaScript object,
  is persisted (**stays the same**) between component re-renderings.
- Silent Value:
  update reference values don't trigger re-renderings.
- Latest Value:
  `useRef()` read rendered props/state from **the future**.
  It's good to get **latest** value of a particular prop or state
  (the updated reference value is available right away).

```tsx
function Example() {
  const [count, setCount] = useState(0);
  const latestCount = useRef(count);

  useEffect(() => {
    // Set the mutable latest value
    latestCount.current = count;
    setTimeout(() => {
      // Read the mutable latest value
      console.log(`You clicked ${latestCount.current} times`);
    }, 3000);
  });

  return <div>Example</div>;
}
```

### Refs Update Mechanism

- Update a `ref`, no re-renderings happens.
- Update a `state`, the deep rendering mechanism works to re-render components.
- Store values in refs and have them updated,
  which is more **efficient** than `useState` (which can be expensive)
  when the values are to be updated multiple times within a second.

```tsx
function UserAvatar(props) {
  return <img src={props.src} alt="User Avatar" />;
}

function Username(props) {
  return <span>{props.name}</span>;
}

function User() {
  const user = useRef({
    name: 'UserName',
    avatarURL: 'https://avatar.com/avatar',
  });

  useEffect(() => {
    setTimeout(() => {
      user.current = {
        name: 'NewUserName',
        avatarURL: 'https://avatar.com/newavatar',
      };
    }, 5000);
  });

  // Only output once
  console.log('Rendered.');

  // Both children won't be re-rendered
  // due to shallow rendering mechanism
  return (
    <div>
      <Username name={user.name} />
      <UserAvatar src={user.avatarURL} />
    </div>
  );
}
```

### Refs Usage

If your component needs to store some value,
but it doesn’t impact the rendering logic,
[choose refs](https://beta.reactjs.org/learn/referencing-values-with-refs#when-to-use-refs):

- Storing timeout IDs.
- Storing and manipulating DOM elements (binding to HTMLElement).
- Storing other objects that aren’t necessary to calculate the JSX:
  work with external systems or browser APIs.
- `ref` can either be a state that does not need to change too often.
- `ref` can either be a state that should change as frequently as possible
  but should not trigger full re-rendering of the component.

```tsx
import { useRef, useState } from 'react';

export default function Stopwatch() {
  const [startTime, setStartTime] = useState(null);
  const [now, setNow] = useState(null);
  const intervalRef = useRef(null);

  function handleStart() {
    setStartTime(Date.now());
    setNow(Date.now());

    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setNow(Date.now());
    }, 10);
  }

  function handleStop() {
    clearInterval(intervalRef.current);
  }

  let secondsPassed = 0;
  if (startTime != null && now != null) {
    secondsPassed = (now - startTime) / 1000;
  }

  return (
    <>
      <h1>Time passed: {secondsPassed.toFixed(3)}</h1>
      <button onClick={handleStart}>Start</button>
      <button onClick={handleStop}>Stop</button>
    </>
  );
}
```

```tsx
import { forwardRef, useImperativeHandle, useRef } from 'react';

const MyInput = forwardRef((props, ref) => {
  const realInputRef = useRef(null);
  useImperativeHandle(ref, () => ({
    // Only expose focus and nothing else
    focus() {
      realInputRef.current.focus();
    },
  }));
  return <input {...props} ref={realInputRef} />;
});

export default function Form() {
  const inputRef = useRef(null);

  function handleClick() {
    inputRef.current.focus();
  }

  return (
    <>
      <MyInput ref={inputRef} />
      <button onClick={handleClick}>Focus the input</button>
    </>
  );
}
```

## UseContext Hook

- Create custom `XXXContextProvider`:
  一般都不会裸露地使用 Context.Provider, 而是封装为独立的 Provider 组件,
  将子组件作为 props.children 传入, 这样当 Context 变化时 Provider 不会重新渲染它的子组件,
  由依赖了 context 的子组件自己进行重渲染, 未依赖的子组件不会重新渲染.
  **使用 `useMemo` 使得 value 不会导致不必要的重复渲染 (Re-rendering)**.
- Create custom `useXXXContext` hook:
- Check whether component under `XXXContextProvider`.
- Wrap complex context logic and only expose simple API (Facade design pattern).
- Use `useMemo`/`useCallback` to **memorize values and functions**.
- Context 中只定义被大多数组件所共用的属性,
  use context to avoid **Prop Drilling**.

### UseContext Hooks Dispatcher

- `HooksDispatcherOnMount.useContext = readContext`.
- `HooksDispatcherOnUpdate.useContext = readContext`.
- `HooksDispatcherOnRerender.useContext = readContext`.

```ts
export function createContext<T>(
  defaultValue: T,
  calculateChangedBits: ?((a: T, b: T) => number)
): ReactContext<T> {
  if (calculateChangedBits === undefined) {
    calculateChangedBits = null;
  }

  const context: ReactContext<T> = {
    $$typeof: REACT_CONTEXT_TYPE,
    _calculateChangedBits: calculateChangedBits,
    _currentValue: defaultValue,
    _currentValue2: defaultValue,
    _threadCount: 0,
    Provider: null,
    Consumer: null,
  };
  context.Provider = {
    $$typeof: REACT_PROVIDER_TYPE,
    _context: context,
  };
  context.Consumer = context;
  return context;
}

function beginWork(
  current: Fiber | null,
  workInProgress: Fiber,
  renderLanes: Lanes
): Fiber | null {
  const updateLanes = workInProgress.lanes;
  workInProgress.lanes = NoLanes;

  switch (workInProgress.tag) {
    case ContextProvider:
      return updateContextProvider(current, workInProgress, renderLanes);
    case ContextConsumer:
      return updateContextConsumer(current, workInProgress, renderLanes);
  }
}

function updateContextProvider(
  current: Fiber | null,
  workInProgress: Fiber,
  renderLanes: Lanes
) {
  const providerType: ReactProviderType<any> = workInProgress.type;
  const context: ReactContext<any> = providerType._context;

  const newProps = workInProgress.pendingProps;
  const oldProps = workInProgress.memoizedProps;
  const newValue = newProps.value; // <Provider value={}>{children}</Provider>

  // 更新 ContextProvider._currentValue:
  // workInProgress.type._context._currentValue = newValue;
  pushProvider(workInProgress, newValue);

  if (oldProps !== null) {
    // 更新阶段.
    // 对比 newValue 和 oldValue
    const oldValue = oldProps.value;
    const changedBits = calculateChangedBits(context, newValue, oldValue);

    if (changedBits === 0) {
      // value 没有变动, 进入 Bailout 逻辑.
      if (
        oldProps.children === newProps.children &&
        !hasLegacyContextChanged()
      ) {
        return bailoutOnAlreadyFinishedWork(
          current,
          workInProgress,
          renderLanes
        );
      }
    } else {
      // value变动, 查找对应的 Consumers, 并使其能够被更新.
      // 向下遍历:
      // 从 ContextProvider 节点开始,
      // 向下查找所有 fiber.dependencies 依赖该 context 的节点.
      // 向上遍历:
      // 从 ContextConsumer 节点开始,
      // 向上遍历, 修改父路径上所有节点的 fiber.childLanes 属性, 表明其子节点有改动, 子节点会进入更新逻辑.
      propagateContextChange(workInProgress, context, changedBits, renderLanes);
    }
  }

  // 生成下级 Fiber.
  const newChildren = newProps.children;
  reconcileChildren(current, workInProgress, newChildren, renderLanes);
  return workInProgress.child;
}

function updateContextConsumer(
  current: Fiber | null,
  workInProgress: Fiber,
  renderLanes: Lanes
) {
  const context: ReactContext<any> = workInProgress.type;
  const newProps = workInProgress.pendingProps;
  const render = newProps.children;

  // 读取 context.
  prepareToReadContext(workInProgress, renderLanes);
  const newValue = readContext(context, newProps.unstable_observedBits);

  // 生成下级 Fiber.
  const newChildren = render(newValue);
  reconcileChildren(current, workInProgress, newChildren, renderLanes);
  return workInProgress.child;
}

function prepareToReadContext(workInProgress: Fiber, renderLanes: Lanes): void {
  // Setup.
  currentlyRenderingFiber = workInProgress;
  lastContextDependency = null;
  lastContextWithAllBitsObserved = null;
  const dependencies = workInProgress.dependencies;

  if (dependencies !== null) {
    const firstContext = dependencies.firstContext;

    if (firstContext !== null) {
      if (includesSomeLane(dependencies.lanes, renderLanes)) {
        // Context list has a pending update.
        // Mark that this fiber performed work.
        markWorkInProgressReceivedUpdate();
      }

      // Reset the work-in-progress list
      dependencies.firstContext = null;
    }
  }
}

function readContext<T>(
  context: ReactContext<T>,
  observedBits: void | number | boolean
): T {
  const contextItem = {
    context: context as ReactContext<mixed>,
    observedBits: resolvedObservedBits,
    next: null,
  };

  // 1. 构造一个 contextItem, 加入到 workInProgress.dependencies 链表.
  if (lastContextDependency === null) {
    lastContextDependency = contextItem;
    currentlyRenderingFiber.dependencies = {
      lanes: NoLanes,
      firstContext: contextItem,
      responders: null,
    };
  } else {
    lastContextDependency = lastContextDependency.next = contextItem;
  }

  // 2. 返回 currentValue.
  return isPrimaryRenderer ? context._currentValue : context._currentValue2;
}
```

### UseContext Hooks Usage

```tsx
import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';

const CountContext = createContext();

function CountProvider(props) {
  const [count, setCount] = useState(0);

  // Use `useMemo`/`useCallback` to memorize values and functions.
  const value = useMemo(() => {
    return {
      count,
      setCount,
    };
  }, [count, setCount]);

  return <CountContext.Provider value={value} {...props} />;
}

function useCount() {
  const context = useContext(CountContext);

  // Check whether component under `XXXContextProvider`.
  if (!context) {
    throw new Error('useCount must be used within a CountProvider');
  }

  // Wrap complex context logic, only expose simple API.
  const { count, setCount } = context;
  const increment = useCallback(() => setCount(c => c + 1), [setCount]);

  return {
    count,
    increment,
  };
}

export { CountProvider, useCount };
```

## UseEffect Hook

### UseEffect Hooks Dispatcher

```ts
function mountEffect(
  create: () => (() => void) | void,
  deps: Array<mixed> | void | null
): void {
  return mountEffectImpl(
    UpdateEffect | PassiveEffect,
    HookPassive,
    create,
    deps
  );
}

function mountEffectImpl(fiberFlags, hookFlags, create, deps) {
  const hook = mountWorkInProgressHook();
  const nextDeps = deps === undefined ? null : deps;
  currentlyRenderingFiber.flags |= fiberFlags; // UpdateEffect | PassiveEffect.
  hook.memoizedState = pushEffect(
    HasEffect | hookFlags, // PassiveHook.
    create,
    undefined,
    nextDeps
  );
}

function updateEffect(
  create: () => (() => void) | void,
  deps: Array<mixed> | void | null
): void {
  return updateEffectImpl(PassiveEffect, HookPassive, create, deps);
}

function updateEffectImpl(fiberFlags, hookFlags, create, deps) {
  const hook = updateWorkInProgressHook();
  const nextDeps = deps === undefined ? null : deps;
  let destroy;

  if (currentHook !== null) {
    const prevEffect = currentHook.memoizedState;
    destroy = prevEffect.destroy;

    if (nextDeps !== null) {
      const prevDeps = prevEffect.deps;

      if (areHookInputsEqual(nextDeps, prevDeps)) {
        // 如果依赖不变, 新建 Effect (tag 不含 HookHasEffect).
        // Reconciler.Commit 阶段会跳过此 Effect.
        pushEffect(hookFlags, create, destroy, nextDeps);
        return;
      }
    }
  }

  // 如果依赖改变, 更改 fiber.flags, 新建 Effect.
  // Reconciler.Commit 阶段会再次执行此 Effect.
  currentlyRenderingFiber.flags |= fiberFlags;
  hook.memoizedState = pushEffect(
    HasEffect | hookFlags,
    create,
    destroy,
    nextDeps
  );
}

function pushEffect(tag, create, destroy, deps) {
  const effect = {
    tag,
    create, // User code: effect callback.
    destroy, // User code: destroy callback.
    deps, // User code: deps list.
    next: null,
  };

  let componentUpdateQueue = currentlyRenderingFiber.updateQueue;

  if (componentUpdateQueue === null) {
    componentUpdateQueue = createFunctionComponentUpdateQueue();
    currentlyRenderingFiber.updateQueue = componentUpdateQueue;
    componentUpdateQueue.lastEffect = effect.next = effect;
  } else {
    const lastEffect = componentUpdateQueue.lastEffect;

    if (lastEffect === null) {
      componentUpdateQueue.lastEffect = effect.next = effect;
    } else {
      // Circular effect list.
      const firstEffect = lastEffect.next;
      lastEffect.next = effect;
      effect.next = firstEffect;
      componentUpdateQueue.lastEffect = effect;
    }
  }

  return effect;
}
```

### UseEffect Lifecycle

1. React renders UI for current props/state to screen.
2. React cleans up the effect for prev props/state.
3. React runs the effect for current props/state
   (`useEffect` got invoked after `componentDidMount`).

### UseEffect Nasty Loop

The effect hook runs when the component `mounts`
but also when the component `updates`.
Because we are setting the state after every data fetch,
the component updates and the effect runs again.
It fetches the data again and again.
That’s a bug and needs to be avoided.

### UseEffect Deps List

无论是将组件编写为类还是函数,
都必须为 effect 响应所有 props 和 state 的更新
(`Reactive Value`).
在传统的 Class Component, 需要编写代码去检测这些 props 和 state 是否变更
(`shouldComponentUpdate`, `componentDidUpdate`).
在 Function Component, 借助 `useEffect` 可以实现自动检测.

If one of deps list changes, the hook runs again.
Provide **empty array** as second argument to the effect hook
to avoid activating it on component updates
but **only for the mounting** of the component.
For listeners binding, use `[]` deps list should be better.

`set` function returned from `useState`
and `ref` object returned by `useRef` are `Stable Value`,
omit them from deps list.

[Primitive values are better](https://beta.reactjs.org/learn/removing-effect-dependencies):

```ts
function ChatRoom({ options }) {
  const [message, setMessage] = useState('');
  const { roomId, serverUrl } = options;

  useEffect(() => {
    const connection = createConnection({
      roomId,
      serverUrl,
    });
    connection.connect();
    return () => connection.disconnect();
  }, [roomId, serverUrl]); // ✅ All dependencies declared
}
```

Functions in `useEffect`:

- If only use some functions inside an effect, move them directly into that effect.
- Hoisting functions that don’t need props or state outside of component,
  and pull the ones that are used only by an effect inside of that effect.
- For useCallback function, it should be in deps list `useEffect(() => {}, [callback])`

```ts
// https://www.robinwieruch.de/react-hooks-fetch-data
import { useEffect, useState } from 'react';
import axios from 'axios';

const useDataApi = (initialUrl, initialData) => {
  const [data, setData] = useState(initialData);
  const [url, setUrl] = useState(initialUrl);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);

      try {
        const result = await axios(url);

        setData(result.data);
      } catch (error) {
        setIsError(true);
      }

      setIsLoading(false);
    };

    fetchData();
  }, [url]);

  const doFetch = url => {
    setUrl(url);
  };

  return { data, isLoading, isError, doFetch };
};
```

### UseEffect Closure

- useEffect Hook 会丢弃上一次渲染结果,
  它会清除上一次 effect,
  再建立下一个 effect
  (也会创建新的 Closure),
  下一个 effect 锁住新的 props 和 state
  (整个 Counter 函数在 re-render 时会被重复调用一次).
- setInterval 不会丢弃上一次结果,
  会引用旧状态 Closure 中的变量,
  导致其与 useEffect 所预期行为不一致.
- 可以通过 useRef 解决这一现象: get latest value.

```tsx
// BUG
function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setCount(count + 1); // always 1 regardless `count` value change
    }, 1000);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <h1>{count}</h1>;
}
```

```tsx
function Counter() {
  const [count, setCount] = useState(0);

  useInterval(() => {
    setCount(count + 1);
  }, 1000);

  return <h1>{count}</h1>;
}

function useInterval(callback, delay) {
  const savedCallback = useRef(callback);

  // Remember the latest callback if it changes
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }

    const id = setInterval(tick, delay);
    return () => clearInterval(id);
  }, [delay]);
}
```

### UseEffect State

- 如 `UseEffect Closure` 所述, 每次调用 useEffect 时,
  会捕获那一次 render 时的 props 和 state.
- Class Component 中的 this.state.xxx 却总是指向最新的 state.

```tsx
function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      console.log(`You clicked ${count} times`);
    }, 3000);
  });

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
}
// Output:
// Mounted: You clicked 0 times
// Clicked 5 times in 3s
// You clicked 1 times
// You clicked 2 times
// You clicked 3 times
// You clicked 4 times
// You clicked 5 times
```

```tsx
class Counter {
  componentDidUpdate() {
    setTimeout(() => {
      console.log(`You clicked ${this.state.count} times`);
    }, 3000);
  }

  render() {
    const { count } = this.props;

    return (
      <div>
        <p>You clicked {count} times</p>
        <button onClick={() => this.setState(count + 1)}>Click me</button>
      </div>
    );
  }
}
// Output:
// Mounted: You clicked 0 times
// Clicked 5 times in 3s
// You clicked 5 times
// You clicked 5 times
// You clicked 5 times
// You clicked 5 times
// You clicked 5 times
```

### UseEffect Cleanup

- Avoid memory leaks.
- Prevent unexpected errors.
- Good user experience.

Cleanup API requests ([race condition](https://maxrozen.com/race-conditions-fetching-data-react-with-useeffect):

- `Boolean` flag.
- `AbortController`.

```ts
const App = ({ url }) => {
  const [results, setResults] = useState([]);
  const [page, setPage] = useState(1);

  // Cleanup with Boolean flag:
  useEffect(() => {
    let ignore = false;
    fetchResults(url, page).then(json => {
      if (!ignore) {
        setResults(json);
      }
    });
    return () => {
      ignore = true;
    };
  }, [url, page]);

  // Cleanup with AbortController:
  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    const fetchData = async () => {
      const response = await fetch(url, { signal });
      const json = await response.json();
      setResults(json);
    };

    fetchData();

    return () => controller.abort();
  }, [url]);
};
```

Cleanup connections:

```ts
const App = () => {
  useEffect(() => {
    const socket = new WebSocket('url', protocols);
    // do what you want with the socket

    return () => socket.close();
  }, []);
};
```

Cleanup timeouts:

```ts
const App = () => {
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      // do something in the timeout
    }, 3000);

    return () => clearTimeout(timeoutId);
  }, []);
};
```

:::caution React 18 Development Strict Mode

With `Strict Mode` in React 18,
React will simulate unmounting and remounting component in development mode:

- React mounts component:
  - Layout effects are created.
  - Effect effects are created.
- React simulates unmounting component:
  - Layout effects are destroyed.
  - Effects are destroyed.
- React simulates mounting component with previous state:
  - Layout effect setup code runs.
  - Effect setup code runs.

When `Strict Mode` is on,
remounts twice helps find out `Effects` need cleanup
and exposes bugs like race conditions early.

:::

### UseEffect Usage

Effects are typically used to
[synchronize with external system](https://beta.reactjs.org/learn/synchronizing-with-effects):
browser APIs,
third-party library,
network, and so on.

Effects let you specify side effects that are caused by rendering itself,
rather than by a particular event:

- Sending a message in the chat is an event
  because it is directly caused by user clicking a specific button:
  put it in `handleClick()`.
- However, setting up a server connection is an `Effect`
  because it needs to happen regardless of
  which interaction caused the component to appear:
  put int in `useEffect()`.

If your effect only adjusts some state based on other state,
[you might not need effects](https://beta.reactjs.org/learn/you-might-not-need-an-effect):

- You don’t need Effects to transform data for rendering.
- You don’t need Effects to handle user events.

```ts
function handleClick() {
  // ✅ Buying is an event because it is caused by a particular interaction.
  fetch('/api/buy', { method: 'POST' });
  showNotification(`Added ${product.name} to the shopping cart!`);
  navigateTo('/checkout');
}

function Form() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  // ✅ Good: calculated during rendering
  const fullName = `${firstName} ${lastName}`;

  // ✅ Good: This logic runs because the component was displayed
  useEffect(() => {
    post('/analytics/event', { eventName: 'visit_form' });
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    // ✅ Good: Event-specific logic is in the event handler
    post('/api/register', { firstName, lastName });
  }
  // ...
}
```

### UseEffect Reference

- `useEffect` complete [guide](https://overreacted.io/a-complete-guide-to-useeffect).
- `useEffect` usage [guide](https://beta.reactjs.org/learn/you-might-not-need-an-effect).

## UseLayoutEffect Hook

- `useLayoutEffect` callback called **synchronously**
  (fires synchronously after all DOM mutations),
  substitute for `componentDidMount` lifecycle function:
  `Update` effect flags, `HasEffect | Layout` hook flags.
- `useEffect` got invoked after `componentDidMount` **asynchronously**:
  `Update | Passive` effect flags, `HasEffect | Passive` hook flags.
- If need to mutate the DOM or do need to perform DOM measurements,
  `useLayoutEffect` is better than `useEffect`.

```ts
function mountLayoutEffect(
  create: () => (() => void) | void,
  deps: Array<mixed> | void | null
): void {
  return mountEffectImpl(
    UpdateEffect, // Fiber Flags
    HookLayout, // Hook Flags
    create,
    deps
  );
}

function mountEffect(
  create: () => (() => void) | void,
  deps: Array<mixed> | void | null
): void {
  return mountEffectImpl(
    UpdateEffect | PassiveEffect, // Fiber Flags
    HookPassive, // Hook Flags
    create,
    deps
  );
}

function updateLayoutEffect(
  create: () => (() => void) | void,
  deps: Array<mixed> | void | null
): void {
  return updateEffectImpl(UpdateEffect, HookLayout, create, deps);
}

function updateEffect(
  create: () => (() => void) | void,
  deps: Array<mixed> | void | null
): void {
  return updateEffectImpl(PassiveEffect, HookPassive, create, deps);
}
```

## UseInsertionEffect Hook

[`useInsertionEffect`](https://github.com/reactwg/react-18/discussions/110)
allows `CSS-in-JS` libraries to address performance
issues of injecting styles in render:

`useInsertionEffect` will run after the DOM is mutated,
but before layout effects read the new layout.

```tsx
function useCSS(rule) {
  if (!canUseDOM) {
    collectedRulesSet.add(rule);
  }

  useInsertionEffect(() => {
    if (!isInserted.has(rule)) {
      isInserted.add(rule);
      document.head.appendChild(getStyleForRule(rule));
    }
  });

  return rule;
}

function Component() {
  const className = useCSS(rule);
  return <div className={className} />;
}
```

## UseImperativeHandle Hook

```tsx
interface MyInputHandles {
  focus(): void;
}

const MyInput: RefForwardingComponent<MyInputHandles, MyInputProps> = (
  props,
  ref
) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useImperativeHandle(ref, () => ({
    focus: () => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    },
  }));

  return <input {...props} ref={inputRef} />;
};

export default React.forwardRef(MyInput);
```

## UseDebugValue Hook

```ts
function App() {
  const date = new Date();
  useDebugValue(date, date => date.toISOString());
}
```

## UseDeferredValue Hook

Debounce:

```tsx
import { useDeferredValue } from 'react';

function App() {
  const [text, setText] = useState('hello');

  // Debounced value.
  const deferredText = useDeferredValue(text, { timeoutMs: 2000 });

  return (
    <div>
      <input value={text} onChange={handleChange} />
      <List text={deferredText} />
    </div>
  );
}
```

## UseTransition Hook

`startTransition` 回调中的更新都会被认为是**非紧急处理**,
如果出现更紧急的更新 (User Input), 则上面的更新都会被中断,
直到没有其他紧急操作之后才会去继续执行更新.

Opt-in concurrent features (implementing debounce-like function):

```tsx
import { useRef, useState, useTransition } from 'react';
import Spinner from './Spinner';

function App() {
  const input = useRef('');
  const [searchInputValue, setSearchInputValue] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isPending, startTransition] = useTransition();

  // Urgent: show what was typed.
  setSearchInputValue(input);

  // Debounced callback.
  startTransition(() => {
    setSearchQuery(input);
  });

  return <div>{isPending && <Spinner />}</div>;
}
```

## UseId Hook

Generating unique IDs on client and server
(每个 ID 代表该组件在组件树中的层级结构):

```tsx
function Checkbox() {
  const id = useId();

  return (
    <>
      <label htmlFor={id}>Do you like React?</label>
      <input type="checkbox" name="react" id={id} />
    </>
  );
}
```

## UseSyncExternalStore Hook

`Props`/`Context`/`useState`/`useReducer` are internal states
not affected by concurrent features.

External stores affected by concurrent features including:

- Global variables:
  - `document.body`.
- Date.
- Redux store.
- Zustand store.

`useSyncExternalStore` allows external stores to support concurrent reads
by forcing updates to the store to be synchronous.

```ts
type UseSyncExternalStore = (
  subscribe: (callback: Callback) => Unsubscribe,
  getSnapshot: () => State
) => State;
```

Simple demo from [React Conf 2021](https://www.youtube.com/watch?v=oPfSC5bQPR8):

```tsx
import { useSyncExternalStore } from 'react';

// We will also publish a backwards compatible shim
// It will prefer the native API, when available
import { useSyncExternalStore } from 'use-sync-external-store/shim';

const store = {
  state: { count: 0 },
  listeners: new Set(),
  setState: fn => {
    store.state = fn(store.state);
    store.listeners.forEach(listener => listener());
  },
  subscribe: callback => {
    store.listeners.add(callback);
    return () => store.listeners.delete(callback);
  },
  getSnapshot: () => {
    const snap = Object.freeze(store.state);
    return snap;
  },
};

function App() {
  // Basic usage. getSnapshot must return a cached/memoized result
  const state = useSyncExternalStore(store.subscribe, store.getSnapshot);

  // Selecting a specific field using an inline getSnapshot
  const selectedField = useSyncExternalStore(
    store.subscribe,
    () => store.getSnapshot().count
  );

  return (
    <div>
      {state.count}
      {selectedField}
    </div>
  );
}
```

Migrate from `useState` + `useEffect` + `useRef` to `useSyncExternalStore`
for 3rd external stores libraries (e.g `Redux`):

```tsx
import React, { useCallback, useEffect, useState } from 'react';
import { useSyncExternalStore } from 'use-sync-external-store/shim';

const createStore = initialState => {
  let state = initialState;
  const listeners = new Set();

  const getState = () => state;
  const setState = fn => {
    state = fn(state);
    listeners.forEach(listener => listener());
  };
  const subscribe = listener => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  };

  return {
    getState,
    setState,
    subscribe,
  };
};

// Explicitly process external store for React v17.
// Sync external store state to React internal state
// with `useState` and `store.subscribe`:
// store.setState -> updater -> setState.
const useStoreLegacy = (store, selector) => {
  const [state, setState] = useState(selector(store.getState()));

  useEffect(() => {
    const updater = () => setState(selector(store.getState()));
    const unsubscribe = store.subscribe(updater);
    updater();
    return unsubscribe;
  }, [store, selector]);

  return state;
};

// Use `useSyncExternalStore` for React v18+.
const useStore = (store, selector) => {
  return useSyncExternalStore(
    store.subscribe,
    useCallback(() => selector(store.getState()), [store, selector])
  );
};

const store = createStore({ count: 0, text: 'hello' });

const Counter = () => {
  const count = useStore(
    store,
    useCallback(state => state.count, [])
  );

  const handleClick = () =>
    store.setState(state => ({ ...state, count: state.count + 1 }));

  return (
    <div>
      {count}
      <button onClick={handleClick}>+1</button>
    </div>
  );
};

const TextBox = () => {
  const text = useStore(
    store,
    useCallback(state => state.text, [])
  );

  const handleChange = event => {
    store.setState(state => ({ ...state, text: event.target.value }));
  };

  return (
    <div>
      <input type="text" value={text} onChange={handleChange} />
    </div>
  );
};

const App = () => (
  <div>
    <Counter />
    <Counter />
    <TextBox />
    <TextBox />
  </div>
);

React.createRoot(document.querySelector('#root')).render(<App />);
```

## UseEvent Hook

Extracting non-reactive logic out of `useEffect`,
[put them into `useEvent`](https://beta.reactjs.org/learn/separating-events-from-effects),
call `useEvent` from inside `useEffect`:

```ts
import { useCallback, useEffect, useInsertionEffect, useRef } from 'react';

function useEvent(fn) {
  const ref = useRef(null);
  useInsertionEffect(() => {
    ref.current = fn;
  }, [fn]);
  return useCallback((...args) => {
    const f = ref.current; // Get latest snapshot, break out closure.
    return f(...args);
  }, []);
}

function ChatRoom({ roomId, theme }) {
  const onConnected = useEvent(connectedRoomId => {
    // Non-reactive to `theme`.
    showNotification(`Welcome to ${connectedRoomId}`, theme);
  });

  useEffect(() => {
    const connection = createConnection(serverUrl, roomId);
    connection.on('connected', () => {
      onConnected(roomId);
    });
    connection.connect();
    return () => connection.disconnect();
  }, [roomId, onConnected]); // Linter will allow [roomId] in the future.
}
```

Event functions let you split an `Effect`
into reactive parts (which should "react" to reactive values and their changes)
and non-reactive parts (which only read their latest values).

## Custom Hooks

- [ReactUse Hooks](https://github.com/streamich/react-use)
- [LibReact](https://github.com/streamich/libreact)
- [Alibaba Hooks](https://github.com/alibaba/hooks)
- [Platform Hooks: Browser APIs turned into Hooks](https://github.com/jaredpalmer/the-platform)
- [TypeScript Hooks](https://github.com/juliencrn/useHooks.ts)
- [Optimistic state hook](https://github.com/perceived-dev/optimistic-state)
- [Use Hooks Gallery](https://github.com/uidotdev/usehooks)
- [React Hooks Gallery](https://github.com/nikgraf/react-hooks)

### Custom LifeCycle Hooks

`componentDidMount`:

```ts
const useMount = fn => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => fn(), []);
};
```

componentWillUnmount:

```ts
const useUnmount = fn => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => fn, []);
};
```

componentDidUpdate:

```ts
const useUpdate = fn => {
  const mounting = useRef(true);

  useEffect(() => {
    if (mounting.current) {
      // first get called for componentDidMount lifecycle
      // so skip it
      mounting.current = false;
    } else {
      fn();
    }
  });
};
```

Force Update:

```ts
const useUpdate = () => useState(0)[1];
```

```ts
import { useState } from 'react';

interface VoidFunction {
  (): void;
}

interface VoidFunctionCreator {
  (): VoidFunction;
}

const max = 9007199254740990; // Number.MAX_SAFE_INTEGER - 1;

const useForceUpdate: VoidFunctionCreator = (): VoidFunction => {
  const [, setState] = useState(0);
  const forceUpdate: VoidFunction = (): void => {
    setState((state: number) => (state + 1) % max);
  };
  return forceUpdate;
};

export default useForceUpdate;
```

`isMounted`:

```ts
const useIsMounted = () => {
  const [isMount, setIsMount] = useState(false);

  useEffect(() => {
    if (!isMount) {
      setIsMount(true);
    }
    return () => setIsMount(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return isMount;
};
```

### Custom Previous Hook

```tsx
function Counter() {
  const [count, setCount] = useState(0);
  const prevCount = usePrevious(count);
  return (
    <h1>
      Now: {count}, before: {prevCount}
    </h1>
  );
}

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}
```

### Custom Interval Hook

```ts
import { useEffect, useRef } from 'react';

function useInterval(callback: () => void, delay: number | null) {
  const savedCallback = useRef(callback);

  // Remember the latest callback if it changes.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    // Don't schedule if no delay is specified.
    if (delay === null) {
      return;
    }

    const id = setInterval(() => savedCallback.current(), delay);

    return () => clearInterval(id);
  }, [delay]);
}

export default useInterval;
```

### Custom Debounce Hook

```ts
// Hook
function useDebounce(value, delay) {
  // State and setters for debounced value
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(
    () => {
      // Update debounced value after delay
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);

      // Cancel the timeout if value changes (also on delay change or unmount)
      // This is how we prevent debounced value
      // from updating if value is changed ...
      // .. within the delay period. Timeout gets cleared and restarted.
      return () => {
        clearTimeout(handler);
      };
    },
    [value, delay] // Only re-call effect if value or delay changes
  );

  return debouncedValue;
}
```

```tsx
function App() {
  // Usage
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {}, [debouncedSearchTerm]);

  return <div>App</div>;
}
```

### Custom EventListener Hook

```ts
import { useCallback, useEffect } from 'react';

export default function useKeydown() {
  const handleKeydown = useCallback(() => {
    alert('key is pressed.');
  }, []);

  useMount(() => {
    document.addEventListener('keydown', handleKeydown);
    return () => {
      document.removeEventListener('keydown', handleKeydown);
    };
  });
}
```

```ts
import { useEffect } from 'react';

export default function useEventListener({ event, handler }) {
  useMount(() => {
    document.addEventListener(event, handler);
    return () => {
      document.removeEventListener(event, handler);
    };
  });
}
```

### Custom Media Query Hook

```ts
export default function useMedia<T>(
  queries: string[],
  values: T[],
  defaultValue: T
) {
  // Array containing a media query list for each query
  const mediaQueryLists = queries.map(q => window.matchMedia(q));

  const getValue = () => {
    // Get index of first media query that matches
    const index = mediaQueryLists.findIndex(mql => mql.matches);
    return values?.[index] || defaultValue;
  };

  // State and setter for matched value
  const [value, setValue] = useState<T>(getValue);

  useMount(() => {
    const handler = () => setValue(getValue);
    mediaQueryLists.forEach(mql => mql.addListener(handler));
    return () => mediaQueryLists.forEach(mql => mql.removeListener(handler));
  });

  return value;
}
```

### Custom Observer Hook

```ts
import type { RefObject } from 'react';
import { useEffect, useState } from 'react';

interface Args extends IntersectionObserverInit {
  freezeOnceVisible?: boolean;
}

function useIntersectionObserver(
  elementRef: RefObject<Element>,
  {
    threshold = 0,
    root = null,
    rootMargin = '0%',
    freezeOnceVisible = false,
  }: Args
): IntersectionObserverEntry | undefined {
  const [entry, setEntry] = useState<IntersectionObserverEntry>();

  const frozen = entry?.isIntersecting && freezeOnceVisible;

  // Update first entry
  const updateEntry = ([entry]: IntersectionObserverEntry[]): void => {
    setEntry(entry);
  };

  useEffect(() => {
    const node = elementRef?.current; // DOM Ref
    const hasIOSupport = !!window.IntersectionObserver;

    if (!hasIOSupport || frozen || !node) return;

    const observerParams = { threshold, root, rootMargin };
    const observer = new IntersectionObserver(updateEntry, observerParams);

    observer.observe(node);

    return () => observer.disconnect();
  }, [elementRef, threshold, root, rootMargin, frozen]);

  return entry;
}

export default useIntersectionObserver;
```

```ts
function useComponentSize() {
  const [size, setSize] = React.useState({
    height: 0,
    width: 0,
  });
  const ref = React.useRef<any>();

  const onResize = React.useCallback(() => {
    if (!ref.current) {
      return;
    }

    const newHeight = ref.current.offsetHeight;
    const newWidth = ref.current.offsetWidth;

    if (newHeight !== size.height || newWidth !== size.width) {
      setSize({
        height: newHeight,
        width: newWidth,
      });
    }
  }, [size.height, size.width]);

  React.useLayoutEffect(() => {
    if (!ref || !ref.current) {
      return;
    }

    const resizeObserver = new ResizeObserver(onResize);
    resizeObserver.observe(ref.current);

    return () => resizeObserver.disconnect();
  }, [ref, onResize]);

  return {
    ref,
    ...size,
  };
}
```

### Custom Locked Body Hook

```ts
import { useEffect, useLayoutEffect, useState } from 'react';

type ReturnType = [boolean, (locked: boolean) => void];

function useLockedBody(initialLocked = false): ReturnType {
  const [locked, setLocked] = useState(initialLocked);

  // Do the side effect before render
  useLayoutEffect(() => {
    // Key point 1
    if (!locked) {
      return;
    }

    // Save initial body style
    const originalOverflow = document.body.style.overflow;
    const originalPaddingRight = document.body.style.paddingRight;

    // Lock body scroll
    document.body.style.overflow = 'hidden';

    // Get the scrollBar width
    const root = document.getElementById('___gatsby'); // or root
    const scrollBarWidth = root ? root.offsetWidth - root.scrollWidth : 0;

    // Avoid width reflow
    if (scrollBarWidth) {
      document.body.style.paddingRight = `${scrollBarWidth}px`;
    }

    // Key point 2
    return () => {
      document.body.style.overflow = originalOverflow;

      if (scrollBarWidth) {
        document.body.style.paddingRight = originalPaddingRight;
      }
    };
  }, [locked]);

  // Update state if initialValue changes
  useEffect(() => {
    if (locked !== initialLocked) {
      setLocked(initialLocked);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialLocked]);

  return [locked, setLocked];
}

export default useLockedBody;
```

### Custom Mouse Hook

```ts
import { useRef, useState } from 'react';

export default function useLongPress(time = 500) {
  const [action, setAction] = useState();

  const timerRef = useRef();
  const isLongPress = useRef();

  function startPressTimer() {
    isLongPress.current = false;
    timerRef.current = setTimeout(() => {
      isLongPress.current = true;
      setAction('LongPress');
    }, time);
  }

  function handleClick() {
    if (isLongPress.current) {
      return;
    }

    setAction('Click');
  }

  function handleMouseDown() {
    startPressTimer();
  }

  function handleMouseUp() {
    clearTimeout(timerRef.current);
  }

  function handleTouchStart() {
    startPressTimer();
  }

  function handleTouchEnd() {
    if (action === 'LongPress') {
      return;
    }

    clearTimeout(timerRef.current);
  }

  return {
    action,
    handlers: {
      onClick: handleClick,
      onMouseDown: handleMouseDown,
      onMouseUp: handleMouseUp,
      onTouchStart: handleTouchStart,
      onTouchEnd: handleTouchEnd,
    },
  };
}
```

### Custom Form Hook

#### UseState Only Form Hook

- `useState` for form entire state and form control data.
- Custom logic via hooks `params` function.

```ts
import { useState } from 'react';

const useForm = callback => {
  const [values, setValues] = useState({});

  const handleSubmit = event => {
    if (event) event.preventDefault();
    callback();
  };

  const handleChange = event => {
    event.persist();
    setValues(values => ({
      ...values,
      [event.target.name]: event.target.value,
    }));
  };

  return {
    handleChange,
    handleSubmit,
    values,
  };
};

export default useForm;
```

#### UseState and UseRef Form Hook

- `useState` for form entire state.
- `useRef` for form control data.
- Custom logic via hooks `params` function.

```tsx
export const useField = (
  name,
  form,
  { defaultValue, validations = [], fieldsToValidateOnChange = [name] } = {}
) => {
  const [value, setValue] = useState(defaultValue);
  const [errors, setErrors] = useState([]);
  const [pristine, setPristine] = useState(true);
  const [validating, setValidating] = useState(false);
  const validateCounter = useRef(0);

  const validate = async () => {
    const validateIteration = ++validateCounter.current;
    setValidating(true);
    const formData = form.getFormData();
    let errorMessages = await Promise.all(
      validations.map(validation => validation(formData, name))
    );
    errorMessages = errorMessages.filter(Boolean);
    if (validateIteration === validateCounter.current) {
      // this is the most recent invocation
      setErrors(errorMessages);
      setValidating(false);
    }
    return errorMessages.length === 0;
  };

  useEffect(() => {
    if (pristine) return; // Avoid validate on mount
    form.validateFields(fieldsToValidateOnChange);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const field = {
    name,
    value,
    errors,
    setErrors,
    pristine,
    onChange: e => {
      if (pristine) {
        setPristine(false);
      }
      setValue(e.target.value);
    },
    validate,
    validating,
  };
  form.addField(field);
  return field;
};

export const useForm = ({ onSubmit }) => {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const fields = useRef([]);

  const validateFields = async fieldNames => {
    let fieldsToValidate;
    if (Array.is(fieldNames)) {
      fieldsToValidate = fields.current.filter(field =>
        fieldNames.includes(field.name)
      );
    } else {
      // If fieldNames not provided, validate all fields.
      fieldsToValidate = fields.current;
    }
    const fieldsValid = await Promise.all(
      fieldsToValidate.map(field => field.validate())
    );
    return fieldsValid.every(Boolean);
  };

  const getFormData = () => {
    return fields.current.reduce((formData, f) => {
      formData[f.name] = f.value;
      return formData;
    }, {});
  };

  return {
    onSubmit: async e => {
      e.preventDefault();
      setSubmitting(true);
      setSubmitted(true); // User has attempted to submit form at least once
      const formValid = await validateFields();
      const returnVal = await onSubmit(getFormData(), formValid);
      setSubmitting(false);
      return returnVal;
    },
    isValid: () => fields.current.every(f => f.errors.length === 0),
    addField: field => fields.current.push(field),
    getFormData,
    validateFields,
    submitted,
    submitting,
  };
};

const Field = ({
  label,
  name,
  value,
  onChange,
  errors,
  setErrors,
  pristine,
  validating,
  validate,
  formSubmitted,
  ...other
}) => {
  const showErrors = (!pristine || formSubmitted) && !!errors.length;

  return (
    <FormControl className="field" error={showErrors}>
      <InputLabel htmlFor={name}>{label}</InputLabel>
      <Input
        id={name}
        value={value}
        onChange={onChange}
        onBlur={() => !pristine && validate()}
        endAdornment={
          <InputAdornment position="end">
            {validating && <LoadingIcon className="rotate" />}
          </InputAdornment>
        }
        {...other}
      />
      <FormHelperText component="div">
        {showErrors &&
          errors.map(errorMsg => <div key={errorMsg}>{errorMsg}</div>)}
      </FormHelperText>
    </FormControl>
  );
};

const App = props => {
  const form = useForm({
    onSubmit: async (formData, valid) => {
      if (!valid) return;
      await timeout(2000); // Simulate network time
      if (formData.username.length < 10) {
        // Simulate 400 response from server.
        usernameField.setErrors(['Make a longer username']);
      } else {
        // Simulate 201 response from server.
        window.alert(
          `form valid: ${valid}, form data: ${JSON.stringify(formData)}`
        );
      }
    },
  });

  const usernameField = useField('username', form, {
    defaultValue: '',
    validations: [
      async formData => {
        await timeout(2000);
        return formData.username.length < 6 && 'Username already exists';
      },
    ],
    fieldsToValidateOnChange: [],
  });
  const passwordField = useField('password', form, {
    defaultValue: '',
    validations: [
      formData =>
        formData.password.length < 6 &&
        'Password must be at least 6 characters',
    ],
    fieldsToValidateOnChange: ['password', 'confirmPassword'],
  });
  const confirmPasswordField = useField('confirmPassword', form, {
    defaultValue: '',
    validations: [
      formData =>
        formData.password !== formData.confirmPassword &&
        'Passwords do not match',
    ],
    fieldsToValidateOnChange: ['password', 'confirmPassword'],
  });

  const requiredFields = [usernameField, passwordField, confirmPasswordField];

  return (
    <div id="form-container">
      <form onSubmit={form.onSubmit}>
        <Field
          {...usernameField}
          formSubmitted={form.submitted}
          label="Username"
        />
        <Field
          {...passwordField}
          formSubmitted={form.submitted}
          label="Password"
          type="password"
        />
        <Field
          {...confirmPasswordField}
          formSubmitted={form.submitted}
          label="Confirm Password"
          type="password"
        />
        <Button
          type="submit"
          disabled={
            !form.isValid() ||
            form.submitting ||
            requiredFields.some(f => f.pristine)
          }
        >
          {form.submitting ? 'Submitting' : 'Submit'}
        </Button>
      </form>
    </div>
  );
};
```

#### UseState and UseRef with DOM Refs Form Hook

- `useState` for form entire state.
- `useRef` for form control data.
- `Function Refs` bind to native `<input />` elements.
- Custom logic via hooks `return` function.

```tsx
// https://github.com/react-hook-form/react-hook-form/blob/v7.29.0/src/logic/createFormControl.ts
const createFormControl = () => ({
  register: (name, options = {}) => {
    // Register input filed.
    let field = get(_fields, name);
    const disabledIsDefined = isBoolean(options.disabled);

    set(_fields, name, {
      _f: {
        ...(field && field._f ? field._f : { ref: { name } }),
        name,
        mount: true,
        ...options,
      },
    });
    _names.mount.add(name);

    field
      ? disabledIsDefined &&
        set(
          _formValues,
          name,
          options.disabled
            ? undefined
            : get(_formValues, name, getFieldValue(field._f))
        )
      : updateValidAndValue(name, true, options.value);

    return {
      // Bind to Form Input Element.
      ref: (ref: HTMLInputElement | null): void => {
        if (ref) {
          register(name, options);
          field = get(_fields, name);

          const fieldRef = isUndefined(ref.value)
            ? ref.querySelectorAll
              ? (ref.querySelectorAll('input,select,textarea')[0] as Ref) || ref
              : ref
            : ref;
          const radioOrCheckbox = isRadioOrCheckbox(fieldRef);
          const refs = field._f.refs || [];

          if (
            radioOrCheckbox
              ? refs.find((option: Ref) => option === fieldRef)
              : fieldRef === field._f.ref
          ) {
            return;
          }

          set(_fields, name, {
            _f: {
              ...field._f,
              ...(radioOrCheckbox
                ? {
                    refs: [...refs.filter(live), fieldRef],
                    ref: { type: fieldRef.type, name },
                  }
                : { ref: fieldRef }),
            },
          });

          updateValidAndValue(name, false, undefined, fieldRef);
        } else {
          field = get(_fields, name, {});

          if (field._f) {
            field._f.mount = false;
          }

          (_options.shouldUnregister || options.shouldUnregister) &&
            !(isNameInFieldArray(_names.array, name) && _stateFlags.action) &&
            _names.unMount.add(name);
        }
      },
      value,
      min,
      max,
      required,
      disabled,
      ...fieldPropValues,
    };
  },
  // Higher order function: onSubmit (Use Code) => onSubmit (Bind to Form Element).
  handleSubmit: onSubmit => {
    return (event: SubmitEvent) => {
      onSubmit(this._getFormData());
    };
  },
});

const useForm = () => {
  // Detailed logic handlers: DOM refs, field getter/setter, submit handler.
  const formControl = useRef<FormControl>(createFormControl());
  // Entire form state: valid, errors etc.
  const formState = useState<FormState>();

  return {
    ...formControl.current,
  };
};

const App = () => {
  const { register, handleSubmit } = useForm();
  const onSubmit = data => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('name')} type="text" />
      <input {...register('password')} type="password" />
    </form>
  );
};
```

### Custom URL Params Hook

Storing state in the URL:

```ts
export default function useStateParams<T>(
  initialState: T,
  paramsName: string,
  serialize: (state: T) => string,
  deserialize: (state: string) => T
): [T, (state: T) => void] {
  const history = useHistory();
  const search = new URLSearchParams(history.location.search);

  const existingValue = search.get(paramsName);
  const [state, setState] = useState<T>(
    existingValue ? deserialize(existingValue) : initialState
  );

  useEffect(() => {
    // Updates state when user navigates backwards or forwards in browser history
    if (existingValue && deserialize(existingValue) !== state) {
      setState(deserialize(existingValue));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [existingValue]);

  const onChange = (s: T) => {
    setState(s);
    const searchParams = new URLSearchParams(history.location.search);
    searchParams.set(paramsName, serialize(s));
    const pathname = history.location.pathname;
    history.push({ pathname, search: searchParams.toString() });
  };

  return [state, onChange];
}
```

### Custom Router Hook

```ts
import { useContext, useEffect } from 'react';
import { __RouterContext } from 'react-router';
import useForceUpdate from 'use-force-update';

const useReactRouter = () => {
  const forceUpdate = useForceUpdate();
  const routerContext = useContext(__RouterContext);

  useEffect(
    () => routerContext.history.listen(forceUpdate),
    [forceUpdate, routerContext]
  );

  return routerContext;
};
```

### Custom History Hook

```ts
import { useCallback, useReducer } from 'react';

// Initial state that we pass into useReducer
const initialState = {
  // Array of previous state values updated each time we push a new state
  past: [],
  // Current state value
  present: null,
  // Will contain "future" state values if we undo (so we can redo)
  future: [],
};

// Our reducer function to handle state changes based on action
const reducer = (state, action) => {
  const { past, present, future } = state;

  switch (action.type) {
    case 'UNDO': {
      const previous = past[past.length - 1];
      const newPast = past.slice(0, past.length - 1);

      return {
        past: newPast,
        present: previous,
        future: [present, ...future],
      };
    }
    case 'REDO': {
      const next = future[0];
      const newFuture = future.slice(1);

      return {
        past: [...past, present],
        present: next,
        future: newFuture,
      };
    }
    case 'SET': {
      const { newPresent } = action;

      if (newPresent === present) {
        return state;
      }

      return {
        past: [...past, present],
        present: newPresent,
        future: [],
      };
    }
    case 'CLEAR': {
      const { initialPresent } = action;

      return {
        ...initialState,
        present: initialPresent,
      };
    }
    default:
      throw new Error('Unsupported action type!');
  }
};

// Hook
const useHistory = initialPresent => {
  const [state, dispatch] = useReducer(reducer, {
    ...initialState,
    present: initialPresent,
  });

  const canUndo = state.past.length !== 0;
  const canRedo = state.future.length !== 0;

  // Setup our callback functions
  // We memoize with useCallback to prevent unnecessary re-renders

  const undo = useCallback(() => {
    if (canUndo) {
      dispatch({ type: 'UNDO' });
    }
  }, [dispatch, canUndo]);

  const redo = useCallback(() => {
    if (canRedo) {
      dispatch({ type: 'REDO' });
    }
  }, [dispatch, canRedo]);

  const set = useCallback(
    newPresent => dispatch({ type: 'SET', newPresent }),
    [dispatch]
  );

  const clear = useCallback(
    () => dispatch({ type: 'CLEAR', initialPresent }),
    [dispatch, initialPresent]
  );

  // If needed we could also return past and future state
  return { state: state.present, set, undo, redo, clear, canUndo, canRedo };
};
```

### Custom Script Loading Hook

```ts
import { useEffect, useState } from 'react';

export type Status = 'idle' | 'loading' | 'ready' | 'error';
export type ScriptElt = HTMLScriptElement | null;

function useScript(src: string): Status {
  const [status, setStatus] = useState<Status>(src ? 'loading' : 'idle');

  useEffect(
    () => {
      if (!src) {
        setStatus('idle');
        return;
      }

      // Fetch existing script element by src
      // It may have been added by another instance of this hook
      // **Cache mechanism**
      let script: ScriptElt = document.querySelector(`script[src="${src}"]`);

      if (!script) {
        // Create script
        script = document.createElement('script');
        script.src = src;
        script.async = true;
        script.setAttribute('data-status', 'loading');
        // Add script to document body
        document.body.appendChild(script);

        // Store status in attribute on script
        // This can be read by other instances of this hook
        const setAttributeFromEvent = (event: Event) => {
          script?.setAttribute(
            'data-status',
            event.type === 'load' ? 'ready' : 'error'
          );
        };

        script.addEventListener('load', setAttributeFromEvent);
        script.addEventListener('error', setAttributeFromEvent);
      } else {
        // Grab existing script status from attribute and set to state.
        setStatus(script.getAttribute('data-status') as Status);
      }

      // Script event handler to update status in state
      // Note: Even if the script already exists we still need to add
      // event handlers to update the state for *this* hook instance.
      const setStateFromEvent = (event: Event) => {
        setStatus(event.type === 'load' ? 'ready' : 'error');
      };

      // Add event listeners
      script.addEventListener('load', setStateFromEvent);
      script.addEventListener('error', setStateFromEvent);

      // Remove event listeners on cleanup
      return () => {
        if (script) {
          script.removeEventListener('load', setStateFromEvent);
          script.removeEventListener('error', setStateFromEvent);
        }
      };
    },
    [src] // Only re-run effect if script src changes
  );

  return status;
}

export default useScript;
```

```ts
const cachedScripts = [];

const useScript = src => {
  // Keeping track of script loaded and error state
  const [state, setState] = useState({
    loaded: false,
    error: false,
  });

  useEffect(
    () => {
      // If cachedScripts array already includes src
      // that means another instance ...
      // ... of this hook already loaded this script, so no need to load again.
      if (cachedScripts.includes(src)) {
        setState({
          loaded: true,
          error: false,
        });
      } else {
        cachedScripts.push(src);

        // Create script
        const script = document.createElement('script');
        script.src = src;
        script.async = true;

        // Script event listener callbacks for load and error
        const onScriptLoad = () => {
          setState({
            loaded: true,
            error: false,
          });
        };

        const onScriptError = () => {
          // Remove from cachedScripts we can try loading again
          const index = cachedScripts.indexOf(src);
          if (index >= 0) cachedScripts.splice(index, 1);
          script.remove();

          setState({
            loaded: true,
            error: true,
          });
        };

        script.addEventListener('load', onScriptLoad);
        script.addEventListener('error', onScriptError);

        // Add script to document body
        document.body.appendChild(script);

        // Remove event listeners on cleanup
        return () => {
          script.removeEventListener('load', onScriptLoad);
          script.removeEventListener('error', onScriptError);
        };
      }
    },
    [src] // Only re-run effect if script src changes
  );

  return [state.loaded, state.error];
};
```

### Custom Cookie Hook

```ts
// https://github.com/tylerwolff/useCookie.
import { useState } from 'react';

const isBrowser = typeof window !== 'undefined';

function stringifyOptions(options) {
  return Object.keys(options).reduce((acc, key) => {
    if (key === 'days') {
      // Skip `days`.
      return acc;
    } else {
      if (options[key] === false) {
        return acc;
      } else if (options[key] === true) {
        return `${acc}; ${key}`;
      } else {
        return `${acc}; ${key}=${options[key]}`;
      }
    }
  }, '');
}

function getCookie(name, initialValue = '') {
  return (
    (isBrowser &&
      document.cookie.split('; ').reduce((r, v) => {
        const parts = v.split('=');
        return parts[0] === name ? decodeURIComponent(parts[1]) : r;
      }, '')) ||
    initialValue
  );
}

function setCookie(name, value, options) {
  if (!isBrowser) return;

  const optionsWithDefaults = {
    days: 7,
    path: '/',
    ...options,
  };

  const expires = new Date(
    Date.now() + optionsWithDefaults.days * 864e5
  ).toUTCString();

  document.cookie = `${name}=${encodeURIComponent(
    value
  )}; expires=${expires}${stringifyOptions(optionsWithDefaults)}`;
}

function useCookie(key, initialValue) {
  const [item, setItem] = useState(() => {
    return getCookie(key, initialValue);
  });

  const updateItem = (value, options) => {
    setItem(value);
    setCookie(key, value, options);
  };

  return [item, updateItem];
}
```

### Custom LocalStorage Hook

```tsx
// https://www.robinwieruch.de/react-uselocalstorage-hook.
const useLocalStorage = (storageKey, fallbackState) => {
  const [value, setValue] = React.useState(
    JSON.parse(localStorage.getItem(storageKey)) || fallbackState
  );

  // Update logic.
  React.useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(value));
  }, [value, storageKey]);

  return [value, setValue];
};

const App = () => {
  const [isOpen, setOpen] = useLocalStorage('is-open', false);

  const handleToggle = () => {
    setOpen(!isOpen);
  };

  return (
    <div>
      <button onClick={handleToggle}>Toggle</button>
      {isOpen && <div>Content</div>}
    </div>
  );
};
```

### Custom Async Data Hook

- `useState` to store url and data.
- `useEffect` to trigger async `fetch` actions.

```ts
import { useEffect, useState } from 'react';

function useFriendStatus(friendID) {
  const [isOnline, setIsOnline] = useState(null);

  function handleStatusChange(status) {
    setIsOnline(status.isOnline);
  }

  useEffect(() => {
    ChatAPI.subscribeToFriendStatus(friendID, handleStatusChange);
    return () => {
      ChatAPI.unsubscribeFromFriendStatus(friendID, handleStatusChange);
    };
  });

  return isOnline;
}
```

```tsx
function FriendStatus(props) {
  const isOnline = useFriendStatus(props.friend.id);

  if (isOnline === null) {
    return 'Loading...';
  }
  return isOnline ? 'Online' : 'Offline';
}

function FriendListItem(props) {
  const isOnline = useFriendStatus(props.friend.id);

  return (
    <li style={{ color: isOnline ? 'green' : 'black' }}>{props.friend.name}</li>
  );
}
```

```ts
import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';

const useDataApi = (initialUrl, initialData) => {
  const [data, setData] = useState(initialData);
  const [url, setUrl] = useState(initialUrl);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const fetchData = useCallback(async () => {
    setIsError(false);
    setIsLoading(true);

    try {
      const result = await axios(url);

      setData(result.data);
    } catch (error) {
      setIsError(true);
    }

    setIsLoading(false);
  }, [url]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const doGet = (event, url) => {
    setUrl(url);
    event.preventDefault();
  };

  return { data, isLoading, isError, doGet };
};
```

```tsx
function App() {
  const [query, setQuery] = useState('redux');
  const { data, isLoading, isError, doGet } = useDataApi(
    'http://hn.algolia.com/api/v1/search?query=redux',
    { hits: [] }
  );

  return (
    <Fragment>
      <form
        onSubmit={event =>
          doGet(event, `http://hn.algolia.com/api/v1/search?query=${query}`)
        }
      >
        <input
          type="text"
          value={query}
          onChange={event => setQuery(event.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      {isError && <div>Something went wrong ...</div>}

      {isLoading ? (
        <div>Loading ...</div>
      ) : (
        <ul>
          {data.hits.map(item => (
            <li key={item.objectID}>
              <a href={item.url}>{item.title}</a>
            </li>
          ))}
        </ul>
      )}
    </Fragment>
  );
}

export default App;
```

TypeScript fetch hook with caches:

```ts
import { useEffect, useReducer, useRef } from 'react';

import type { AxiosRequestConfig } from 'axios';
import axios from 'axios';

// State & hook output
interface State<T> {
  status: 'init' | 'fetching' | 'error' | 'fetched';
  data?: T;
  error?: string;
}

type Cache<T> = Record<string, T>;

// discriminated union type
type Action<T> =
  | { type: 'request' }
  | { type: 'success'; payload: T }
  | { type: 'failure'; payload: string };

function useFetch<T = unknown>(
  url?: string,
  options?: AxiosRequestConfig
): State<T> {
  const cache = useRef<Cache<T>>({});
  const cancelRequest = useRef<boolean>(false);

  const initialState: State<T> = {
    status: 'init',
    error: undefined,
    data: undefined,
  };

  // Keep state logic separated
  const fetchReducer = (state: State<T>, action: Action<T>): State<T> => {
    switch (action.type) {
      case 'request':
        return { ...initialState, status: 'fetching' };
      case 'success':
        return { ...initialState, status: 'fetched', data: action.payload };
      case 'failure':
        return { ...initialState, status: 'error', error: action.payload };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(fetchReducer, initialState);

  useEffect(() => {
    if (!url) {
      return;
    }

    const fetchData = async () => {
      dispatch({ type: 'request' });

      if (cache.current[url]) {
        dispatch({ type: 'success', payload: cache.current[url] });
      } else {
        try {
          const response = await axios(url, options);
          cache.current[url] = response.data;

          if (cancelRequest.current) return;

          dispatch({ type: 'success', payload: response.data });
        } catch (error) {
          if (cancelRequest.current) return;

          dispatch({ type: 'failure', payload: error.message });
        }
      }
    };

    fetchData();

    return () => {
      cancelRequest.current = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  return state;
}

export default useFetch;
```

### Custom Data Query Hook

```ts
import firebase from 'firebase/app';
import { useQuery, useQueryClient } from 'react-query';
import type { UseQueryOptions } from 'react-query';
import 'firebase/auth';
import 'firebase/database';
import { useEffect } from 'react';

// This value is the default 403 code from firebase
const PERMISSION_DENIED_STATUS_CODE = 'PERMISSION_DENIED';

export interface RealTimeFetchParams {
  path: string;
}

export interface RealTimeSubscribeParams<T> {
  path: string;
  event?: firebase.database.EventType;
  callback: (value: T) => void;
}

export interface RealTimeUnsubscribeParams {
  path: string;
  event?: firebase.database.EventType;
}

export class RealTimeApi {
  private firebase: firebase.app.App;

  constructor() {
    this.handleAuthenticationErrors =
      this.handleAuthenticationErrors.bind(this);

    this.firebase = firebase.initializeApp({
      apiKey: process.env.REACT_APP_FIREBASE_WEB_API_KEY,
      databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
      projectId: process.env.REACT_APP_FIREBASE_DATABASE_URL,
      messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
      appId: process.env.REACT_APP_FIREBASE_APP_ID,
    });
  }

  private handleAuthenticationErrors(error: firebase.FirebaseError) {
    if (error.code === PERMISSION_DENIED_STATUS_CODE) {
      // handle logout any way you want. For example, if you were using
      // AWS Cognito, you'd call `Auth.logout()`
    }
  }

  public connect(token: string) {
    return this.firebase.auth().signInWithCustomToken(token);
  }

  public disconnect() {
    return this.firebase.auth().signOut();
  }

  public fetch<T>({ path }: RealTimeFetchParams) {
    return new Promise<T>(resolve => {
      this.firebase
        .database()
        .ref(path)
        .once(
          'value',
          snapshot => {
            resolve(snapshot.val());
          },
          this.handleAuthenticationErrors
        );
    });
  }

  public subscribe<T>({
    path,
    callback,
    event = 'value',
  }: RealTimeSubscribeParams<T>) {
    const ref = this.firebase.database().ref(path);
    const cb = (snapshot: firebase.database.DataSnapshot) => {
      callback(snapshot.val() as T);
    };

    ref.on(event, cb, this.handleAuthenticationErrors);
    return () => ref.off(event, cb);
  }

  public unsubscribe({ path, event = 'value' }: RealTimeUnsubscribeParams) {
    this.firebase.database().ref(path).off(event);
  }
}

const realTimeApi = new RealTimeApi();

function useRealTimeQuery<Data>(
  firebasePathKey: string,
  useQueryOptions: UseQueryOptions<Data> = {}
) {
  const queryClient = useQueryClient();

  useEffect(() => {
    const unsubscribe = realTimeApi.subscribe<Data>({
      path: firebasePathKey,
      callback: val => {
        queryClient.setQueryData(firebasePathKey, val);
      },
    });

    return () => unsubscribe();
  }, [queryClient, firebasePathKey]);

  return useQuery<Data, Error>(
    firebasePathKey,
    () => new Promise<Data>(() => {}),
    useQueryOptions
  );
}

export default useRealTimeQuery;
```

### Custom Store Hook

Simple implementation:

```ts
import { useState } from 'react';

export const store = {
  state: {},
  setState(value) {
    this.state = value;
    this.setters.forEach(setter => setter(this.state));
  },
  setters: [],
};

// Bind the setState function to the store object so
// we don't lose context when calling it elsewhere
store.setState = store.setState.bind(store);

// this is the custom hook we'll call on components.
export default function useStore() {
  const [state, set] = useState(store.state);

  if (!store.setters.includes(set)) {
    store.setters.push(set);
  }

  return [state, store.setState];
}
```

Complex [implementation](https://github.com/timc1/kbar):

```ts
import { deepEqual } from 'fast-equals';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type {
  Action,
  ActionId,
  ActionTree,
  KBarOptions,
  KBarProviderProps,
  KBarState,
} from './types';
import { VisualState } from './types';

type useStoreProps = KBarProviderProps;

export default function useStore(props: useStoreProps) {
  if (!props.actions) {
    throw new Error(
      'You must define a list of `actions` when calling KBarProvider'
    );
  }

  const [state, setState] = useState<KBarState>({
    searchQuery: '',
    currentRootActionId: null,
    visualState: VisualState.hidden,
    actions: props.actions.reduce((acc, current) => {
      acc[current.id] = current;
      return acc;
    }, {}),
  });

  const currentState = useRef(state);
  currentState.current = state;

  const getState = useCallback(() => currentState.current, []);
  const publisher = useMemo(() => new Publisher(getState), [getState]);

  useEffect(() => {
    currentState.current = state;
    publisher.notify();
  }, [publisher, state]);

  const optionsRef = useRef((props.options || {}) as KBarOptions);

  const registerActions = useCallback((actions: Action[]) => {
    const actionsByKey: ActionTree = actions.reduce((acc, current) => {
      acc[current.id] = current;
      return acc;
    }, {});

    setState(state => ({
      ...state,
      actions: {
        ...actionsByKey,
        ...state.actions,
      },
    }));

    return function unregister() {
      setState(state => {
        const actions = state.actions;
        const removeActionIds = Object.keys(actionsByKey);
        removeActionIds.forEach(actionId => delete actions[actionId]);
        return {
          ...state,
          actions: {
            ...state.actions,
            ...actions,
          },
        };
      });
    };
  }, []);

  return useMemo(() => {
    return {
      getState,
      query: {
        setCurrentRootAction: (actionId: ActionId | null | undefined) => {
          setState(state => ({
            ...state,
            currentRootActionId: actionId,
          }));
        },
        setVisualState: (
          cb: ((vs: VisualState) => VisualState) | VisualState
        ) => {
          setState(state => ({
            ...state,
            visualState: typeof cb === 'function' ? cb(state.visualState) : cb,
          }));
        },
        setSearch: (searchQuery: string) =>
          setState(state => ({
            ...state,
            searchQuery,
          })),
        registerActions,
      },
      options: optionsRef.current,
      subscribe: (
        collector: <C>(state: KBarState) => C,
        cb: <C>(collected: C) => void
      ) => publisher.subscribe(collector, cb),
    };
  }, [getState, publisher, registerActions]);
}

class Publisher {
  getState;
  subscribers: Subscriber[] = [];

  constructor(getState: () => KBarState) {
    this.getState = getState;
  }

  subscribe<C>(
    collector: (state: KBarState) => C,
    onChange: (collected: C) => void
  ) {
    const subscriber = new Subscriber(
      () => collector(this.getState()),
      onChange
    );
    this.subscribers.push(subscriber);
    return this.unsubscribe.bind(this, subscriber);
  }

  unsubscribe(subscriber: Subscriber) {
    if (this.subscribers.length) {
      const index = this.subscribers.indexOf(subscriber);
      if (index > -1) {
        return this.subscribers.splice(index, 1);
      }
    }
  }

  notify() {
    this.subscribers.forEach(subscriber => subscriber.collect());
  }
}

class Subscriber {
  collected: any; // Previous state cache.
  collector;
  onChange;

  constructor(collector: () => any, onChange: (collected: any) => any) {
    this.collector = collector;
    this.onChange = onChange;
  }

  collect() {
    try {
      // Grab latest state.
      const recollect = this.collector();
      if (!deepEqual(recollect, this.collected)) {
        this.collected = recollect;
        if (this.onChange) {
          this.onChange(this.collected);
        }
      }
    } catch (error) {
      console.warn(error);
    }
  }
}
```

### Custom Recoil Hook

Recoil [minimal implementation](https://github.com/bennetthardwick/recoil-clone):

- `Atom`: collect children callbacks as `listeners`, notify children when value changed.
- `Selector`: collect parent `Atoms` as `deps`, update value when parent Atoms notified.

```ts
interface Disconnector {
  disconnect: () => void;
}

class Stateful<T> {
  private listeners = new Set<(value: T) => void>();

  constructor(private value: T) {}

  protected _update(value: T) {
    this.value = value;
    this.notify();
  }

  snapshot(): T {
    return this.value;
  }

  notify() {
    for (const listener of this.listeners) {
      listener(this.snapshot());
    }
  }

  subscribe(callback: (value: T) => void): Disconnector {
    this.listeners.add(callback);
    return {
      disconnect: () => {
        this.listeners.delete(callback);
      },
    };
  }
}

class Atom<T> extends Stateful<T> {
  update(value: T) {
    super._update(value);
  }
}

interface GeneratorContext {
  get: <V>(dependency: Stateful<V>) => V;
}

type SelectorGenerator<T> = (context: GeneratorContext) => T;

export class Selector<T> extends Stateful<T> {
  private registeredDeps = new Set<Stateful>();

  constructor(private readonly generate: SelectorGenerator<T>) {
    super(undefined as any);
    const context = { get: dep => this.getDep(dep) };
    this.value = generate(context);
  }

  private getDep<V>(dep: Stateful<V>): V {
    if (!this.registeredDeps.has(dep)) {
      // Update when parent Atom changed.
      dep.subscribe(() => this.updateSelector());
      this.registeredDeps.add(dep);
    }

    return dep.snapshot();
  }

  private updateSelector() {
    const context = { get: dep => this.getDep(dep) };
    this.update(this.generate(context));
  }
}

export function atom<V>(value: { key: string; default: V }): Atom<V> {
  return new Atom(value.default);
}

export function selector<V>(value: {
  key: string;
  get: SelectorGenerator<V>;
}): Selector<V> {
  return new Selector(value.get);
}

// This hook will re-render whenever supplied `Stateful` value changes.
// It can be used with `Selector` or `Atom`.
export function useCoiledValue<T>(value: Stateful<T>): T {
  const [, updateState] = useState({});

  // Force update when value changed.
  useEffect(() => {
    const { disconnect } = value.subscribe(() => updateState({}));
    return () => disconnect();
  }, [value]);

  return value.snapshot();
}

// Similar to above method, but it also lets set state.
// It only can be used with `Atom`.
export function useCoiledState<T>(atom: Atom<T>): [T, (value: T) => void] {
  const value = useCoiledValue(atom);
  return [value, useCallback(value => atom.update(value), [atom])];
}
```

```ts
function generate(context) {
  // Register NameAtom as a dependency and get its snapshot value:
  // get(nameAtom) => selector.getDep(nameAtom)
  // => nameAtom.subscribe(() => selector.updateSelector) + selector.deps.add(nameAtom)
  const name = context.get(nameAtom);
  // Do the same for AgeAtom
  const age = context.get(ageAtom);

  // Return new value using parent atoms.
  // E.g. 'Bob is 20 years old'.
  return `${name} is ${age} years old.`;
}
```

### Custom Atom Hook

Simple global store based on:

- Subscribe pattern.
- UseState hook.

```ts
import type { Dispatch, MutableRefObject, SetStateAction } from 'react';
import { useEffect, useRef, useState } from 'react';
import { nanoid } from 'nanoid';

const store = new Map<string, any>();

class Atom<T> {
  key = nanoid();
  subscribers = new Map<
    MutableRefObject<boolean>,
    Dispatch<SetStateAction<T>>
  >();

  private _current: T;

  constructor(initialState: T) {
    store.set(this.key, initialState);
    this._current = initialState;
  }

  subscribe(
    ref: MutableRefObject<boolean>,
    action: Dispatch<SetStateAction<T>>
  ) {
    this.subscribers.set(ref, action);
  }

  unsubscribe(ref: MutableRefObject<boolean>) {
    this.subscribers.delete(ref);
  }

  setState(nextState: T) {
    this._current = nextState;
    store.set(this.key, nextState);
    this.subscribers.forEach(action => action(nextState));
  }

  get current() {
    return this._current;
  }
}

export const atom = <T>(initialState: T) => new Atom(initialState);

export const useAtomValue = <T>(atom: Atom<T>) => {
  const ref = useRef(false);
  const [state, setState] = useState(atom.current);

  if (ref.current === false) {
    ref.current = true;
    atom.subscribe(ref, setState);
  }

  useMount(() => () => atom.unsubscribe(ref));

  return state;
};

export const setAtomValue =
  <T>(atom: Atom<T>) =>
  (nextState: T) =>
    atom.setState(nextState);
```

## Hooks Best Practice

如果将一个函数任意地将其放在 useEffect Deps List 中
可能会导致重复无意义的 useEffect 执行
(因为每次 render 期间的此函数都会重新定义).
有两个解决办法:

- 对于被多次复用 Utils 函数 (且不依赖组件的任何值),
  应该提到组件外面的公共区域去定义.
- 对于只被特定 Effect Hook 调用的 Utils 函数,
  可以放到 useEffect 内部定义.
- 对于其他需要在组件内(或自定义 Hooks 内)定义的函数,
  可使用 useCallback 包裹函数, 并设置正确的 Deps List,
  尽可能地减少 render 时重新定义此函数.

```ts
// ✅ Not affected by the data flow
function getFetchUrl(query) {
  return `https://hn.algolia.com/api/v1/search?query=${query}`;
}

function SearchResults() {
  useEffect(() => {
    const url = getFetchUrl('react');
    // ... Fetch data and do something ...
  }, []); // ✅ Deps are OK

  useEffect(() => {
    const url = getFetchUrl('redux');
    // ... Fetch data and do something ...
  }, []); // ✅ Deps are OK

  // ...
}
```

- Don't forget to cleanup side effects (return function in useEffect)
- Set correct deps list for useEffect:
  - avoid object deps (should use object property).
  - enough deps list to avoid infinite loop rendering pitfall.
  - enough deps list to avoid stale closure.
- setState(state => state + 1) is better (avoid outdated state).
- Change `useState` to `useRef` when values not for rendering.
- Don't put any `if` statement before hooks function.
- Only call Hooks at the top level (don't inside loops, conditions or nested functions).
- Only call Hooks from React function components.
