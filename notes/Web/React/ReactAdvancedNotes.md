---
author: Sabertazimi
authorTitle: Web Developer
authorURL: https://github.com/sabertazimi
authorImageURL: https://github.com/sabertazimi.png
tags: [Web, React]
---

# React Advanced Notes

## React Core Packages

- `Scheduler` 调度器: 调度任务的优先级, 高优任务优先进入 `Reconciler`.
- `Reconciler` 协调器:
  - 装载 `Renderer`.
  - 接收 `ReactDOM` 和 `React` 模块 (用户代码) 发起的更新请求:
    - `ReactFiberReconciler.updateContainer`.
    - `ReactFiberClassComponent.setState`.
    - `ReactFiberHooks.dispatchAction`.
  - 找出变化组件, 构建 Fiber Tree.
- `Renderer` 渲染器:
  - 引导 `React` 应用启动 (e.g `ReactDOM.createRoot(rootNode).render(<App />)`).
  - 实现 `HostConfig` 协议, 将变化的组件渲染到页面上.

其中 `Reconciler` 构建 Fiber Tree 的过程被包装成一个回调函数, 传入 `Scheduler` 模块等待调度.
`Scheduler` 将回调函数进一步包装成任务对象, 放入多优先级调度的任务队列, 循环消费任务队列, 直至队列清空.
Scheduler Work Loop (任务调度循环) 负责调度 `Task`,
Reconciler Work Loop (`Fiber` 构造循环) 负责实现 `Task`.

`React` runtime main logic:

- Updates: `Add`/`Delete`/`Mutation` updates from `User Code`.
- Registration:
  - `Reconciler` receive updates request from `User Code`.
  - `Scheduler` register new `Task`.
- Execution:
  - `Scheduler` consume `Task` in `TaskQueue` in work loop.
  - `Reconciler` execute `Task` work.
    - `Fiber` 构造循环: construct `Fiber` tree.
    - `commitRoot`: render `Fiber` tree with `Renderer`.
- 任务调度循环与 `Fiber` 构造循环相互配合可实现**可中断渲染**:
  - 渲染中断 (`Reconciler.renderRootConcurrent().shouldYield()`):
    - 存在更高优先级任务 (Priority Scheduling).
    - 当前帧没有剩余时间 (Time Slicing).
  - 渲染恢复 (`Scheduler.workLoop()`):
    将 `callback()` 返回的任务放入任务队列, 继续进行调度直至清空任务队列.

[![React Core Packages](./figures/ReactCorePackages.png)](https://7kms.github.io/react-illustration-series/main/macro-structure)

## React Virtual DOM

- Reduce rendering times with reconciliation algorithm,
  improving rendering efficiency:
  Declarative UI performance = Diff performance + DOM performance,
  `Virtual DOM` 主要是为了最小化 Diff 性能消耗.
- Cross platform code.
- Functional programming without details on DOM manipulation.
- Virtual DOM 很多时候都不是最优的操作,
  但它具有普适性, 在效率与可维护性之间达到平衡.
- [SnabbDOM](https://github.com/snabbdom/snabbdom):
  virtual DOM library focus on modularity and performance.

## React Core Workflow

[![React Core Workflow](./figures/ReactCoreWorkflow.png)](https://jser.dev/2023-07-14-initial-mount/#how-react-does-initial-mount-first-time-render-)

### Create RootContainer

#### Legacy Root

- [react-dom/src/client/ReactDOMLegacy](https://github.com/facebook/react/blob/main/packages/react-dom/src/client/ReactDOMLegacy.js):
  - **render**.
  - legacyRenderSubtreeIntoContainer.
  - legacyCreateRootFromDOMContainer.
- [react-reconciler/src/ReactFiberReconciler](https://github.com/facebook/react/blob/main/packages/react-reconciler/src/ReactFiberReconciler.js):
  - **createContainer**.
- [react-dom/src/client/ReactDOMComponentTree](https://github.com/facebook/react/blob/main/packages/react-dom/src/client/ReactDOMComponentTree.js):
  - markContainerAsRoot.
- [react-reconciler/src/ReactFiberRoot](https://github.com/facebook/react/blob/main/packages/react-reconciler/src/ReactFiberRoot.js):
  - **createFiberRoot**.
- [react-reconciler/src/ReactFiber](https://github.com/facebook/react/blob/main/packages/react-reconciler/src/ReactFiber.js):
  - createHostRootFiber.
- [react-reconciler/src/ReactUpdateQueue](https://github.com/facebook/react/blob/main/packages/react-reconciler/src/ReactUpdateQueue.js):
  - **initializeUpdateQueue**.
- [react-dom/src/events/DOMPluginEventSystem](https://github.com/facebook/react/blob/main/packages/react-dom/src/events/DOMPluginEventSystem.js):
  - listenToAllSupportedEvents:
    事件统一在 rootContainer 上处理 dispatchDiscreteEvent.

#### Concurrent Root

- [react-dom/src/client/ReactDOMRoot](https://github.com/facebook/react/blob/main/packages/react-dom/src/client/ReactDOMRoot.js):
  - **createRoot**.
- [react-reconciler/src/ReactFiberReconciler](https://github.com/facebook/react/blob/main/packages/react-reconciler/src/ReactFiberReconciler.js):
  - **createContainer**.
- [react-dom/src/client/ReactDOMComponentTree](https://github.com/facebook/react/blob/main/packages/react-dom/src/client/ReactDOMComponentTree.js):
  - markContainerAsRoot.
- [react-reconciler/src/ReactFiberRoot](https://github.com/facebook/react/blob/main/packages/react-reconciler/src/ReactFiberRoot.js):
  - **createFiberRoot**.
- [react-reconciler/src/ReactFiber](https://github.com/facebook/react/blob/main/packages/react-reconciler/src/ReactFiber.js):
  - createHostRootFiber.
- [react-reconciler/src/ReactUpdateQueue](https://github.com/facebook/react/blob/main/packages/react-reconciler/src/ReactUpdateQueue.js):
  - **initializeUpdateQueue**.
- [react-dom/src/events/DOMPluginEventSystem](https://github.com/facebook/react/blob/main/packages/react-dom/src/events/DOMPluginEventSystem.js):
  - listenToAllSupportedEvents:
    事件统一在 rootContainer 上处理 dispatchDiscreteEvent.
- `ReactDOMRoot.render(<App />)`.

### Update RootContainer

- [react-dom/src/client/ReactDOMLegacy](https://github.com/facebook/react/blob/main/packages/react-dom/src/client/ReactDOMLegacy.js):
  - render.
  - legacyRenderSubtreeIntoContainer.
- [react-dom/src/client/ReactDOMRoot](https://github.com/facebook/react/blob/main/packages/react-dom/src/client/ReactDOMRoot.js):
  - render.
- [react-reconciler/src/ReactFiberReconciler](https://github.com/facebook/react/blob/main/packages/react-reconciler/src/ReactFiberReconciler.js):
  - **updateContainer**.
- [react-reconciler/src/ReactUpdateQueue](https://github.com/facebook/react/blob/main/packages/react-reconciler/src/ReactUpdateQueue.js):
  - createUpdate.
  - enqueueUpdate.
- [react-reconciler/src/ReactFiberWorkLoop](https://github.com/facebook/react/blob/main/packages/react-reconciler/src/ReactFiberWorkLoop.js):
  - **scheduleUpdateOnFiber**.
  - **ensureRootIsScheduled**.
- [react-reconciler/src/ReactFiberSyncTaskQueue](https://github.com/facebook/react/blob/main/packages/react-reconciler/src/ReactFiberSyncTaskQueue.js):
  - flushSyncCallbacks.
- [react-reconciler/src/ReactFiberWorkLoop](https://github.com/facebook/react/blob/main/packages/react-reconciler/src/ReactFiberWorkLoop.js):
  - **performSyncWorkOnRoot**.
  - renderRootSync.
  - workLoopSync.
  - **performUnitOfWork**.
- [react-reconciler/src/ReactFiberBeginWork](https://github.com/facebook/react/blob/main/packages/react-reconciler/src/ReactFiberBeginWork.js):
  - **beginWork**.
  - **updateHostRoot**/**updateXXXComponent**.
  - `ReactDOMComponent.createElement`.
  - reconcileChildren.
- [react-reconciler/src/ReactChildFiber](https://github.com/facebook/react/blob/main/packages/react-reconciler/src/ReactChildFiber.js):
  - reconcileChildFibers.
- [react-reconciler/src/ReactFiberWorkLoop](https://github.com/facebook/react/blob/main/packages/react-reconciler/src/ReactFiberWorkLoop.js):
  - **completeUnitOfWork**.
- [react-reconciler/src/ReactFiberCompleteWork](https://github.com/facebook/react/blob/main/packages/react-reconciler/src/ReactFiberCompleteWork.js)
  - **completeWork**.
- [react-reconciler/src/ReactFiberWorkLoop](https://github.com/facebook/react/blob/main/packages/react-reconciler/src/ReactFiberWorkLoop.js):
  - **commitRoot**.
- [react-dom/src/client/ReactDOMHostConfig](https://github.com/facebook/react/blob/main/packages/react-dom/src/client/ReactDOMHostConfig.js):
  - appendChildToContainer.
  - finalizeInitialChildren.
- [react-dom/src/client/ReactDOMComponent](https://github.com/facebook/react/blob/main/packages/react-dom/src/client/ReactDOMComponent.js):
  - setInitialProperties:
    设置初始化属性, 处理特殊元素和事件.

```ts
// Legacy Mode
import type { ReactElement } from 'react'
import type { Container } from './types'
import Reconciler from './reconciler'

const Renderer = {
  render: (
    element: ReactElement,
    container: Container | null,
    callback?: Function
  ): void => {
    if (container) {
      const root = Reconciler.createContainer(container, 0, false, null)
      Reconciler.updateContainer(element, root, null)
    }
  },
}

export default Renderer
```

```ts
// Modern Mode
import type { ReactElement } from 'react'
import type { Container, OpaqueRoot } from './types'
import Reconciler from './reconciler'

const Renderer = {
  createRoot: (
    container: Container | null,
    callback?: Function
  ): OpaqueRoot => {
    if (container) {
      const root = Reconciler.createContainer(container, 0, false, null)

      root.render = function (element: ReactElement) {
        Reconciler.updateContainer(element, this, null)
      }

      return root
    }
  },
}

export default Renderer
```

### ReactComponent SetState

- [react-dom/src/events/ReactDOMEventListener](https://github.com/facebook/react/blob/main/packages/react-dom/src/events/ReactDOMEventListener.js):
  - dispatchDiscreteEvent.
- [react/src/ReactBaseClasses](https://github.com/facebook/react/blob/main/packages/react/src/ReactBaseClasses.js):
  - **setState**.
- [react-reconciler/src/ReactFiberClassComponent](https://github.com/facebook/react/blob/main/packages/react-reconciler/src/ReactFiberClassComponent.js):
  - enqueueSetState.
- [react-reconciler/src/ReactUpdateQueue](https://github.com/facebook/react/blob/main/packages/react-reconciler/src/ReactUpdateQueue.js):
  - createUpdate.
  - enqueueUpdate.
- [react-reconciler/src/ReactFiberWorkLoop](https://github.com/facebook/react/blob/main/packages/react-reconciler/src/ReactFiberWorkLoop.js):
  - **scheduleUpdateOnFiber**.
  - discreteUpdates.
- [react-reconciler/src/ReactFiberSyncTaskQueue](https://github.com/facebook/react/blob/main/packages/react-reconciler/src/ReactFiberSyncTaskQueue.js):
  - flushSyncCallbacks.
- [react-reconciler/src/ReactFiberWorkLoop](https://github.com/facebook/react/blob/main/packages/react-reconciler/src/ReactFiberWorkLoop.js):
  - **performSyncWorkOnRoot**.
  - workLoopSync.
  - **performUnitOfWork**.
- [react-reconciler/src/ReactFiberBeginWork](https://github.com/facebook/react/blob/main/packages/react-reconciler/src/ReactFiberBeginWork.js):
  - **beginWork**.
  - **updateXXXComponent**.
  - reconcileChildren.
- [react-reconciler/src/ReactChildFiber](https://github.com/facebook/react/blob/main/packages/react-reconciler/src/ReactChildFiber.js):
  - reconcileChildFibers.
- [react-reconciler/src/ReactFiberWorkLoop](https://github.com/facebook/react/blob/main/packages/react-reconciler/src/ReactFiberWorkLoop.js):
  - **completeUnitOfWork**.
- [react-reconciler/src/ReactFiberCompleteWork](https://github.com/facebook/react/blob/main/packages/react-reconciler/src/ReactFiberCompleteWork.js)
  - **completeWork**.
- [react-reconciler/src/ReactFiberWorkLoop](https://github.com/facebook/react/blob/main/packages/react-reconciler/src/ReactFiberWorkLoop.js):
  - **commitRoot**.
  - commitMutationEffects.
- [react-reconciler/src/ReactFiberCommitWork](https://github.com/facebook/react/blob/main/packages/react-reconciler/src/ReactFiberCommitWork.js):
  - commitWork.
- [react-dom/src/client/ReactDOMHostConfig](https://github.com/facebook/react/blob/main/packages/react-dom/src/client/ReactDOMHostConfig.js):
  - commitUpdate.
- [react-dom/src/client/ReactDOMComponentTree](https://github.com/facebook/react/blob/main/packages/react-dom/src/client/ReactDOMComponentTree.js):
  - updateFiberProps.
- [react-dom/src/client/ReactDOMComponent](https://github.com/facebook/react/blob/main/packages/react-dom/src/client/ReactDOMComponent.js):
  - updateProperties:
    Apply the diff.

### ClassComponent Update

- [react-reconciler/src/ReactFiberWorkLoop](https://github.com/facebook/react/blob/main/packages/react-reconciler/src/ReactFiberWorkLoop.js):
  - performSyncWorkOnRoot.
  - workLoopSync.
  - performUnitOfWork.
- [react-reconciler/src/ReactFiberBeginWork](https://github.com/facebook/react/blob/main/packages/react-reconciler/src/ReactFiberBeginWork.js):
  - beginWork
  - **updateClassComponent**.
- [react-reconciler/src/ReactFiberClassComponent](https://github.com/facebook/react/blob/main/packages/react-reconciler/src/ReactFiberClassComponent.js):
  - updateClassInstance.
- [react-reconciler/src/ReactFiberBeginWork](https://github.com/facebook/react/blob/main/packages/react-reconciler/src/ReactFiberBeginWork.js):
  - finishClassComponent.
  - **instance.render** (User defined Component).
  - **reconcileChildren**.
- [react-reconciler/src/ReactChildFiber](https://github.com/facebook/react/blob/main/packages/react-reconciler/src/ReactChildFiber.js):
  - reconcileChildFibers.

### FunctionComponent Update

- [react-reconciler/src/ReactFiberWorkLoop](https://github.com/facebook/react/blob/main/packages/react-reconciler/src/ReactFiberWorkLoop.js):
  - performSyncWorkOnRoot.
  - workLoopSync.
  - performUnitOfWork.
- [react-reconciler/src/ReactFiberBeginWork](https://github.com/facebook/react/blob/main/packages/react-reconciler/src/ReactFiberBeginWork.js):
  - beginWork.
  - **updateFunctionComponent**.
- [react-reconciler/src/ReactFiberHooks](https://github.com/facebook/react/blob/main/packages/react-reconciler/src/ReactFiberHooks.js):
  - renderWithHooks.
  - **FunctionComponent()** (User defined Function).
  - **Hooks**: useXXX -> mountXXX -> updateXXX.
- [react-reconciler/src/ReactFiberBeginWork](https://github.com/facebook/react/blob/main/packages/react-reconciler/src/ReactFiberBeginWork.js):
  - **reconcileChildren**.
- [react-reconciler/src/ReactChildFiber](https://github.com/facebook/react/blob/main/packages/react-reconciler/src/ReactChildFiber.js):
  - reconcileChildFibers.

## React Scheduler

Work loop in scheduler focus on **Task Scheduling**,
not only including `Reconciler.performSyncWorkOnRoot`/`Reconciler.performConcurrentWorkOnRoot`,
but also for non-react tasks
(meaning `Scheduler` module can work standalone without `React`).

### Scheduler Priority

React 16, unstable concurrent mode with
[`Priorities`](https://github.com/facebook/react/blob/main/packages/scheduler/src/SchedulerPriorities.js):

- ImmediatePriority: 立即执行优先级, 级别最高, `expirationTime = -1`.
- UserBlockingPriority: 用户阻塞优先级, `expirationTime = 250`.
- NormalPriority: 正常优先级, `expirationTime = 5000`.
- LowPriority: 低优先级, `expirationTime = 10000`.
- IdlePriority: 可闲置优先级, `expirationTime = maxSigned31BitInt`.

React 17, stable concurrent mode with
[`Lanes`](https://github.com/facebook/react/blob/main/packages/react-reconciler/src/ReactFiberLane.js):

```ts
export type Lanes = number
export type Lane = number

export const TotalLanes = 31

export const NoLanes: Lanes = /*                        */ 0b0000000000000000000000000000000
export const NoLane: Lane = /*                          */ 0b0000000000000000000000000000000

export const SyncLane: Lane = /*                        */ 0b0000000000000000000000000000001

export const InputContinuousHydrationLane: Lane = /*    */ 0b0000000000000000000000000000010
export const InputContinuousLane: Lanes = /*            */ 0b0000000000000000000000000000100

export const DefaultHydrationLane: Lane = /*            */ 0b0000000000000000000000000001000
export const DefaultLane: Lanes = /*                    */ 0b0000000000000000000000000010000

const TransitionHydrationLane: Lane = /*                */ 0b0000000000000000000000000100000
const TransitionLanes: Lanes = /*                       */ 0b0000000001111111111111111000000
const TransitionLane1: Lane = /*                        */ 0b0000000000000000000000001000000
const TransitionLane2: Lane = /*                        */ 0b0000000000000000000000010000000
const TransitionLane3: Lane = /*                        */ 0b0000000000000000000000100000000
const TransitionLane4: Lane = /*                        */ 0b0000000000000000000001000000000
const TransitionLane5: Lane = /*                        */ 0b0000000000000000000010000000000
const TransitionLane6: Lane = /*                        */ 0b0000000000000000000100000000000
const TransitionLane7: Lane = /*                        */ 0b0000000000000000001000000000000
const TransitionLane8: Lane = /*                        */ 0b0000000000000000010000000000000
const TransitionLane9: Lane = /*                        */ 0b0000000000000000100000000000000
const TransitionLane10: Lane = /*                       */ 0b0000000000000001000000000000000
const TransitionLane11: Lane = /*                       */ 0b0000000000000010000000000000000
const TransitionLane12: Lane = /*                       */ 0b0000000000000100000000000000000
const TransitionLane13: Lane = /*                       */ 0b0000000000001000000000000000000
const TransitionLane14: Lane = /*                       */ 0b0000000000010000000000000000000
const TransitionLane15: Lane = /*                       */ 0b0000000000100000000000000000000
const TransitionLane16: Lane = /*                       */ 0b0000000001000000000000000000000

const RetryLanes: Lanes = /*                            */ 0b0000111110000000000000000000000
const RetryLane1: Lane = /*                             */ 0b0000000010000000000000000000000
const RetryLane2: Lane = /*                             */ 0b0000000100000000000000000000000
const RetryLane3: Lane = /*                             */ 0b0000001000000000000000000000000
const RetryLane4: Lane = /*                             */ 0b0000010000000000000000000000000
const RetryLane5: Lane = /*                             */ 0b0000100000000000000000000000000

export const SomeRetryLane: Lane = RetryLane1

export const SelectiveHydrationLane: Lane = /*          */ 0b0001000000000000000000000000000

const NonIdleLanes = /*                                 */ 0b0001111111111111111111111111111

export const IdleHydrationLane: Lane = /*               */ 0b0010000000000000000000000000000
export const IdleLane: Lanes = /*                       */ 0b0100000000000000000000000000000

export const OffscreenLane: Lane = /*                   */ 0b1000000000000000000000000000000
```

### Scheduler Workflow

Scheduler main [workflow](https://github.com/facebook/react/blob/main/packages/scheduler/src/forks/Scheduler.js):

`scheduleCallback(callback)`
-> `push(queue, newTask)` (Wrap `callback` into `task`)
(For delayed task -> `requestHostTimeout(handleTimeout, delayTime)`)
-> `requestHostCallback(flushWork)`
-> `messageChannelPort.postMessage(null)`
-> `performWorkUntilDeadline()`
-> `flushWork(hasTimeRemaining, currentTime)`:
-> `workLoop(hasTimeRemaining, currentTime)`:

将 Reconciler 的工作 (Callback)
包装成 Task 组成 Task Queue,
按照时间分片机制,
不断地消费 Task Queue.

对于延时任务 (Delayed Task),
会将其先放入 Timer Queue,
等待延时完成后再将其放入 Task Queue.

### Scheduler Time Slicing

```ts
// 时间切片周期, 默认是 5ms.
// 如果一个 task 运行超过该周期, 下一个 task 执行前, 会把控制权归还浏览器.
const yieldInterval = 5
const maxYieldInterval = 300

let deadline = 0 // currentTime + yieldInterval.
let needsPaint = false
let isMessageLoopRunning = false
let scheduledHostCallback = null

const channel = new MessageChannel()
const port = channel.port2
channel.port1.onmessage = performWorkUntilDeadline

const scheduling = navigator.scheduling
const getCurrentTime = performance.now

// 请求回调:
function requestHostCallback(callback) {
  // 1. 保存 callback.
  scheduledHostCallback = callback

  if (!isMessageLoopRunning) {
    isMessageLoopRunning = true
    // 2. 通过 MessageChannel 发送消息.
    port.postMessage(null)
  }
}

// 取消回调:
function cancelHostCallback() {
  scheduledHostCallback = null
}

function requestHostTimeout(callback, ms) {
  taskTimeoutID = setTimeout(() => {
    callback(getCurrentTime())
  }, ms)
}

function cancelHostTimeout() {
  clearTimeout(taskTimeoutID)
  taskTimeoutID = -1
}

// 是否让出主线程 (time slice):
function shouldYieldToHost() {
  const currentTime = getCurrentTime()

  if (currentTime >= deadline) {
    if (needsPaint || scheduling.isInputPending()) {
      // There is either a pending paint or a pending input.
      return true
    }

    // There's no pending input.
    // Only yield if we've reached the max yield interval.
    return currentTime >= maxYieldInterval
  } else {
    // There's still time left in the frame.
    return false
  }
}

// 请求绘制:
function requestPaint() {
  needsPaint = true
}

// 实际回调函数处理:
function performWorkUntilDeadline() {
  if (scheduledHostCallback !== null) {
    // 1. 设置 currentTime 与 deadline.
    const currentTime = getCurrentTime()
    deadline = currentTime + yieldInterval
    const hasTimeRemaining = true

    try {
      // 2. 执行回调, 返回是否有还有剩余任务.
      const hasMoreWork = scheduledHostCallback(hasTimeRemaining, currentTime)

      if (!hasMoreWork) {
        // 没有剩余任务, 退出.
        isMessageLoopRunning = false
        scheduledHostCallback = null
      } else {
        port.postMessage(null) // 有剩余任务, 发起新的调度.
      }
    } catch (error) {
      port.postMessage(null) // 如有异常, 重新发起调度.
      throw error
    }
  } else {
    isMessageLoopRunning = false
  }

  needsPaint = false // Reset.
}
```

### Scheduler Task Queue

Task queue is [MinHeap](https://github.com/facebook/react/blob/main/packages/scheduler/src/SchedulerMinHeap.js),
storing Tasks.

```ts
const newTask = {
  id: taskIdCounter++,
  callback, // Work from reconciler.
  priorityLevel,
  startTime,
  expirationTime,
  sortIndex: -1, // MinHeap queue indexing.
}
```

```ts
function scheduleCallback(priorityLevel, callback, options) {
  const currentTime = getCurrentTime()
  const startTime = currentTime
  const expirationTime = startTime + timeout[priorityLevel] // -1/250/5000/10000/MAX_INT.
  const newTask = {
    id: taskIdCounter++,
    callback,
    priorityLevel,
    startTime,
    expirationTime,
    sortIndex: -1,
  }

  if (startTime > currentTime) {
    // Delayed task.
    newTask.sortIndex = startTime
    push(timerQueue, newTask)

    // All tasks are delayed, and this is the task with the earliest delay.
    if (peek(taskQueue) === null && newTask === peek(timerQueue)) {
      if (isHostTimeoutScheduled) {
        // Cancel an existing timeout.
        cancelHostTimeout()
      } else {
        isHostTimeoutScheduled = true
      }

      // Schedule a timeout.
      requestHostTimeout(handleTimeout, startTime - currentTime)
    }
  } else {
    // Normal task.
    newTask.sortIndex = expirationTime
    push(taskQueue, newTask)

    if (!isHostCallbackScheduled && !isPerformingWork) {
      isHostCallbackScheduled = true
      requestHostCallback(flushWork)
    }
  }

  return newTask
}

function handleTimeout(currentTime) {
  isHostTimeoutScheduled = false
  advanceTimers(currentTime)

  if (!isHostCallbackScheduled) {
    if (peek(taskQueue) !== null) {
      isHostCallbackScheduled = true
      requestHostCallback(flushWork)
    } else {
      const firstTimer = peek(timerQueue)

      if (firstTimer !== null)
        requestHostTimeout(handleTimeout, firstTimer.startTime - currentTime)
    }
  }
}
```

### Scheduler Work Loop

当 `callback()` 返回函数时, 表明产生连续回调 (e.g 出现更高优先任务/时间分片用完, 渲染中断),
需将返回的函数再次放入任务队列, 继续进行调度直至清空任务队列 (渲染恢复).

```ts
function flushWork(hasTimeRemaining, initialTime) {
  // We'll need a host callback the next time work is scheduled.
  isHostCallbackScheduled = false

  if (isHostTimeoutScheduled) {
    // We scheduled a timeout but it's no longer needed. Cancel it.
    isHostTimeoutScheduled = false
    cancelHostTimeout()
  }

  isPerformingWork = true // Lock.
  const previousPriorityLevel = currentPriorityLevel

  try {
    return workLoop(hasTimeRemaining, initialTime)
  } finally {
    // Restore context.
    currentTask = null
    currentPriorityLevel = previousPriorityLevel
    isPerformingWork = false
  }
}

function workLoop(hasTimeRemaining, initialTime) {
  let currentTime = initialTime
  advanceTimers(currentTime)
  currentTask = peek(taskQueue)

  while (currentTask !== null) {
    if (
      currentTask.expirationTime > currentTime
      && (!hasTimeRemaining || shouldYieldToHost())
    ) {
      // This currentTask hasn't expired, and we've reached the deadline.
      break
    }

    const callback = currentTask.callback

    if (typeof callback === 'function') {
      currentTask.callback = null
      currentPriorityLevel = currentTask.priorityLevel
      const didUserCallbackTimeout = currentTask.expirationTime <= currentTime
      const continuationCallback = callback(didUserCallbackTimeout)
      currentTime = getCurrentTime()

      if (typeof continuationCallback === 'function') {
        // 产生了连续回调 (如 Fiber树太大, 出现了中断渲染), 保留 currentTask.
        currentTask.callback = continuationCallback
      } else {
        if (currentTask === peek(taskQueue))
          pop(taskQueue)
      }

      advanceTimers(currentTime)
    } else {
      // 如果任务被取消 (currentTask.callback = null), 将其移出队列.
      pop(taskQueue)
    }

    currentTask = peek(taskQueue)
  }

  // Return whether there's additional work.
  if (currentTask !== null) {
    return true
  } else {
    const firstTimer = peek(timerQueue)

    // 存在延时任务, 继续进行调度.
    if (firstTimer !== null)
      requestHostTimeout(handleTimeout, firstTimer.startTime - currentTime)

    return false
  }
}
```

## React Fiber

[React Fiber](https://tigerabrodi.blog/reacts-evolution-from-hooks-to-concurrent-react#heading-react-fiber)
的目标是提高其在动画、布局和手势等领域的适用性:

- 它的主要特性是 `Incremental Rendering`:
  将渲染任务拆分为小的任务块并将任务分配到多个帧上的能力.
- Ability to pause and resume rendering.
- Ability to prioritize updates.
- Ability to work on multiple tasks concurrently.

### React Fiber Type

`Fiber` [definition](https://github.com/facebook/react/blob/main/packages/react-reconciler/src/ReactInternalTypes.js):

- Component type.
- Current props and state.
- Pointers to parent, sibling, and child components,
- Pointer to DOM/class instance.
- Other internal metadata to track rendering process.

```ts
export interface Fiber {
  tag: WorkTag
  key: string | null
  elementType: any
  type: any // Tag/Class/Function.
  stateNode: any // DOM/class instance.
  ref: (((handle: mixed) => void) & { _stringRef: ?string }) | RefObject | null

  // Singly Linked List Tree Structure.
  return: Fiber | null // DFS parent Fiber node.
  child: Fiber | null
  sibling: Fiber | null
  index: number

  // Props and state for output.
  pendingProps: any
  memoizedProps: any
  updateQueue: mixed // Updates from diff(pendingProps, memoizedProps).
  memoizedState: any

  // Context API.
  dependencies: Dependencies | null // (Contexts, Events) dependencies.

  mode: TypeOfMode // NoMode/BlockingMode/ConcurrentMode bit.

  // Effects.
  flags: Flags
  subtreeFlags: Flags
  deletions: Array<Fiber> | null
  nextEffect: Fiber | null // Next effect Fiber node.
  firstEffect: Fiber | null // First effect Fiber node.
  lastEffect: Fiber | null // Last effect Fiber node.

  // Priority.
  lanes: Lanes
  childLanes: Lanes
  alternate: Fiber | null // `current` Fiber and `workInpProgress` Fiber.

  // Performance statistics for React DevTool.
  actualDuration?: number
  actualStartTime?: number
  selfBaseDuration?: number
  treeBaseDuration?: number
}
```

### React Fiber Work Tag

常见的 Fiber [类型](https://github.com/facebook/react/blob/main/packages/react-reconciler/src/ReactWorkTags.js):

- HostComponent: HTML native tag.
- ClassComponent.
- FunctionComponent.

```ts
type WorkTag
  = | 'FunctionComponent'
    | 'ClassComponent'
    | 'IndeterminateComponent'
    | 'HostRoot'
    | 'HostPortal'
    | 'HostComponent'
    | 'HostText'
    | 'Fragment'
    | 'Mode'
    | 'ContextConsumer'
    | 'ContextProvider'
    | 'ForwardRef'
    | 'Profiler'
    | 'SuspenseComponent'
    | 'MemoComponent'
    | 'SimpleMemoComponent'
    | 'LazyComponent'
    | 'IncompleteClassComponent'
    | 'DehydratedFragment'
    | 'SuspenseListComponent'
    | 'FundamentalComponent'
    | 'ScopeComponent'
    | 'Block'
    | 'OffscreenComponent'
    | 'LegacyHiddenComponent'
```

### React Fiber Mode

React [运行模式](https://github.com/facebook/react/blob/main/packages/react-reconciler/src/ReactTypeOfMode.js):
所有 `Fiber.mode` 保持一致 (包括 `FiberRoot`).

```ts
type TypeOfMode = number

const NoMode = /*                         */ 0b000000
const ConcurrentMode = /*                 */ 0b000001
const ProfileMode = /*                    */ 0b000010
const DebugTracingMode = /*               */ 0b000100
const StrictLegacyMode = /*               */ 0b001000
const StrictEffectsMode = /*              */ 0b010000
const ConcurrentUpdatesByDefaultMode = /* */ 0b100000
```

### React Fiber Effects

- Insert DOM elements: `Placement` tag.
- Update DOM elements: `Update` tag.
- Delete DOM elements: `Deletion` tag.
- Update Ref property: `Ref` tag.
- `useEffect` callback: `got Passive` tag.
  - `useEffect(fn)`: `Mount` and `Update` lifecycle.
  - `useEffect(fn, [])`: `Mount` lifecycle.
  - `useEffect(fn, [deps])`:
    `Mount` lifecycle and
    `Update` lifecycle with `deps` changed.

React create effects when `Render` stage,
then update effects to real DOM when `Commit` stage.

常见的 Effect [标志位](https://github.com/facebook/react/blob/main/packages/react-reconciler/src/ReactFiberFlags.js):

```ts
type Flags = number

const NoFlags = /*                      */ 0b000000000000000000
const PerformedWork = /*                */ 0b000000000000000001
const Placement = /*                    */ 0b000000000000000010
const Update = /*                       */ 0b000000000000000100
const PlacementAndUpdate = /*           */ 0b000000000000000110
const Deletion = /*                     */ 0b000000000000001000
const ContentReset = /*                 */ 0b000000000000010000
const Callback = /*                     */ 0b000000000000100000
const DidCapture = /*                   */ 0b000000000001000000
const Ref = /*                          */ 0b000000000010000000
const Snapshot = /*                     */ 0b000000000100000000
const Passive = /*                      */ 0b000000001000000000
const PassiveUnmountPendingDev = /*     */ 0b000010000000000000
const Hydrating = /*                    */ 0b000000010000000000
const HydratingAndUpdate = /*           */ 0b000000010000000100
const LifecycleEffectMask = /*          */ 0b000000001110100100
const HostEffectMask = /*               */ 0b000000011111111111
const Incomplete = /*                   */ 0b000000100000000000
const ShouldCapture = /*                */ 0b000001000000000000
const ForceUpdateForLegacySuspense = /* */ 0b000100000000000000
const PassiveStatic = /*                */ 0b001000000000000000
const BeforeMutationMask = /*           */ 0b000000001100001010
const MutationMask = /*                 */ 0b000000010010011110
const LayoutMask = /*                   */ 0b000000000010100100
const PassiveMask = /*                  */ 0b000000001000001000
const StaticMask = /*                   */ 0b001000000000000000
const MountLayoutDev = /*               */ 0b010000000000000000
const MountPassiveDev = /*              */ 0b100000000000000000
```

### React Fiber Lanes

[Assign `Lane` to `Update`](https://github.com/facebook/react/blob/main/packages/react-reconciler/src/ReactFiberWorkLoop.js):

- Legacy 模式: 返回 SyncLane.
- Blocking 模式: 返回 SyncLane.
- Concurrent 模式:
  - 正常情况: 根据当前的调度优先级来生成一个 lane.
  - 处于 Suspense 过程中: 会优先选择 `TransitionLanes` 通道中的空闲通道 (或最高优先级).

```ts
export function requestUpdateLane(fiber: Fiber): Lane {
  const mode = fiber.mode

  if ((mode & BlockingMode) === NoMode) {
    // Legacy 模式.
    return SyncLane
  } else if ((mode & ConcurrentMode) === NoMode) {
    // Blocking 模式.
    return getCurrentPriorityLevel() === ImmediateSchedulerPriority
      ? SyncLane
      : SyncBatchedLane
  }

  // Concurrent 模式.
  if (currentEventWipLanes === NoLanes)
    currentEventWipLanes = workInProgressRootIncludedLanes

  const isTransition = requestCurrentTransition() !== NoTransition

  if (isTransition) {
    // 特殊情况, 处于 Suspense 过程中.
    if (currentEventPendingLanes !== NoLanes) {
      currentEventPendingLanes
        = mostRecentlyUpdatedRoot !== null
          ? mostRecentlyUpdatedRoot.pendingLanes
          : NoLanes
    }

    return findTransitionLane(currentEventWipLanes, currentEventPendingLanes)
  }

  // 正常情况, 获取调度优先级.
  let lane
  const schedulerPriority = getCurrentPriorityLevel()

  if (
    (executionContext & DiscreteEventContext) !== NoContext
    && schedulerPriority === UserBlockingSchedulerPriority
  ) {
    // `executionContext` 存在输入事件, 且调度优先级是用户阻塞性质.
    lane = findUpdateLane(InputDiscreteLanePriority, currentEventWipLanes)
  } else {
    // 调度优先级转换为车道模型.
    const schedulerLanePriority
      = schedulerPriorityToLanePriority(schedulerPriority)
    lane = findUpdateLane(schedulerLanePriority, currentEventWipLanes)
  }

  return lane
}
```

[Global `renderLanes`](https://github.com/facebook/react/blob/main/packages/react-reconciler/src/ReactFiberLane.js):

Fiber 树构造过程中 (`Render Phase`),
若 Fiber 对象或 Update 对象优先级 (`fiber.lanes`/`update.lane`) 比全局渲染优先级低,
则将会被忽略 (节点未更新, 可以直接复用).

```ts
export function getNextLanes(root: FiberRoot, wipLanes: Lanes): Lanes {
  const pendingLanes = root.pendingLanes

  if (pendingLanes === NoLanes)
    return NoLanes

  let nextLanes = NoLanes
  const suspendedLanes = root.suspendedLanes
  const pingedLanes = root.pingedLanes
  const nonIdlePendingLanes = pendingLanes & NonIdleLanes

  if (nonIdlePendingLanes !== NoLanes) {
    const nonIdleUnblockedLanes = nonIdlePendingLanes & ~suspendedLanes

    if (nonIdleUnblockedLanes !== NoLanes) {
      nextLanes = getHighestPriorityLanes(nonIdleUnblockedLanes)
    } else {
      const nonIdlePingedLanes = nonIdlePendingLanes & pingedLanes

      if (nonIdlePingedLanes !== NoLanes)
        nextLanes = getHighestPriorityLanes(nonIdlePingedLanes)
    }
  } else {
    const unblockedLanes = pendingLanes & ~suspendedLanes

    if (unblockedLanes !== NoLanes) {
      nextLanes = getHighestPriorityLanes(unblockedLanes)
    } else {
      if (pingedLanes !== NoLanes)
        nextLanes = getHighestPriorityLanes(pingedLanes)
    }
  }

  if (nextLanes === NoLanes)
    return NoLanes

  if (
    wipLanes !== NoLanes
    && wipLanes !== nextLanes
    && (wipLanes & suspendedLanes) === NoLanes
  ) {
    const nextLane = getHighestPriorityLane(nextLanes)
    const wipLane = getHighestPriorityLane(wipLanes)

    if (
      nextLane >= wipLane
      || (nextLane === DefaultLane && (wipLane & TransitionLanes) !== NoLanes)
    ) {
      return wipLanes
    }
  }

  if (
    allowConcurrentByDefault
    && (root.current.mode & ConcurrentUpdatesByDefaultMode) !== NoMode
  ) {
    // Do nothing, use the lanes as they were assigned.
  } else if ((nextLanes & InputContinuousLane) !== NoLanes) {
    nextLanes |= pendingLanes & DefaultLane
  }

  const entangledLanes = root.entangledLanes

  if (entangledLanes !== NoLanes) {
    const entanglements = root.entanglements
    let lanes = nextLanes & entangledLanes

    while (lanes > 0) {
      const index = pickArbitraryLaneIndex(lanes)
      const lane = 1 << index
      nextLanes |= entanglements[index]
      lanes &= ~lane
    }
  }

  return nextLanes
}
```

Lanes model [use case](https://github.com/facebook/react/pull/18796):

```ts
// task 与 batchTask 的优先级是否重叠:
// 1. expirationTime:
const isTaskIncludedInBatch = priorityOfTask >= priorityOfBatch
// 2. Lanes:
const isTaskIncludedInBatch = (task & batchOfTasks) !== 0

// 当同时处理一组任务, 该组内有多个任务, 且每个任务的优先级不一致:
// 1. expirationTime:
const isTaskIncludedInBatch
  = taskPriority <= highestPriorityInRange
    && taskPriority >= lowestPriorityInRange
// 2. Lanes:
const isTaskIncludedInBatch = (task & batchOfTasks) !== 0

// 从 group 中增删 task:
// 1. expirationTime (need list):
task.prev.next = task.next

let current = queue
while (task.expirationTime >= current.expirationTime)
  current = current.next

task.next = current.next
current.next = task

const isTaskIncludedInBatch
  = taskPriority <= highestPriorityInRange
    && taskPriority >= lowestPriorityInRange

// 2. Lanes:
batchOfTasks &= ~task // Delete task.
batchOfTasks |= task // Add task.
const isTaskIncludedInBatch = (task & batchOfTasks) !== 0
```

### React Fiber Trees

- `current` Fiber tree: rendered to screen.
- `workInProgress` Fiber tree: under reconciliation.
- When `workInProgress` Fiber tree complete `render` + `commit`,
  swap 2 Fiber tree:
  - Reuse Fiber objects.
  - Reduce memory usage and GC time.
- `FiberRoot`:
  - `FiberRoot.current = currentHostRootFiber`.
  - `FiberRoot.finishedWork = workInProgressHostRootFiber`.
  - `currentHostRootFiber.stateNode = FiberRoot`.
  - `workInProgressHostRootFiber.stateNode = FiberRoot`.
  - `currentHostRootFiber.alternate = workInProgressHostRootFiber`
  - `workInProgressHostRootFiber.alternate = currentHostRootFiber`
- `ReactElement` tree -> `Fiber` tree -> `DOM` tree.

[![React Fiber Trees](./figures/ReactFiberTrees.png)](https://7kms.github.io/react-illustration-series/main/fibertree-prepare)

### React Fiber Work Loop

[![React Fiber Work Loop](./figures/ReactFiberWorkLoop.png)](https://7kms.github.io/react-illustration-series/main/reconciler-workflow)

## React Reconciler

### Reconciler Render Workflow

Reconciler construct Fiber tree:

- scheduleUpdateOnFiber:
  - 首次 render 直接调用 `performWorkOnRoot`.
  - 再次 render 需要调用 `ensureRootIsScheduled`.
- ensureRootIsScheduled.
- flushSyncCallbacks.
- performSyncWorkOnRoot / performConcurrentWorkOnRoot:
  - `performConcurrentWorkOnRoot` 支持可中断渲染:
    - 此函数首先检查是否处于 render 过程中,
      是否需要恢复上一次渲染.
    - 如果本次渲染被中断,
      此函数最后返回一个新的 `performConcurrentWorkOnRoot` 函数,
      等待下一次 Scheduler 调度.
- renderRootSync / renderRootConcurrent:
  - 此函数会调用 `prepareFreshStack`, 重置 FiberRoot 上的全局属性, 重置 Fiber Work Loop 全局变量.
  - 此函数会设置 `workInProgressRoot = FiberRoot`, 表示正在进行 render.
  - 此函数退出前, 会重置 `workInProgressRoot = null`, 表示没有正在进行中的 render.
  - 此函数退出前, 会挂载 `FiberRoot.finishedWork = workInProgressHostRootFiber`.
    此时 `HostRootFiber` 上挂载了副作用队列, 层级越深子节点副作用越靠前.
- workLoopSync / workLoopConcurrent:
  循环调用 `performUnitOfWork`,
  直到 `workInProgress === null` 或用完当前时间分片.
- **performUnitOfWork(workInProgress)**:
  - 存在子节点， `beginWork` 与 `completeUnitOfWork` 不在同一次循环里调用:
    执行完 `beginWork` 后,
    优先向下遍历, 执行子节点的 `beginWork` 与 `completeUnitOfWork`,
    在 N 次循环后再向上回溯.
  - 不存在子节点， `beginWork` 与 `completeUnitOfWork` 在同一次循环里调用.
  - 若 `beginWork` 返回 `next` 节点,
    则设置 `workInProgress = next` 进行 DFS 遍历,
    再次调用此函数.
  - 若 `beginWork` 返回 `null` 节点,
    则调用 `completeUnitOfWork` 函数完成节点处理.
  - 若存在兄弟节点,
    `completeUnitOfWork` 会设置 `workInProgress = siblingFiber` 进行 DFS 遍历,
    再次调用此函数.
  - 若到达子叶节点,
    `completeUnitOfWork` 会设置 `workInProgress = returnFiber` 进行 DFS 回溯,
    再次调用此函数.
- **beginWork**:
  - 根据 `ReactElement` 对象创建所有的 Fiber 节点, 最终构造出 Fiber 树形结构
    (设置 `return` 和 `sibling` 指针).
  - 调用 `updateXXX`, 设置 `fiber.flags`/`fiber.stateNode` 等状态.
  - 非子叶节点返回子节点, 进行 DFS 遍历; 子叶节点返回 `null`, 直接进入 `completeUnitOfWork` 阶段.
- **updateHostRoot/updateXXXComponent**:
  - 根据 `fiber.pendingProps`/`fiber.updateQueue` 等输入数据状态,
    计算 `fiber.memoizedState` 作为输出状态.
  - ClassComponent:
    - 构建 `React.Component` 实例.
    - 把新实例挂载到 `fiber.stateNode` 上.
    - 执行 `render` 之前的生命周期函数.
    - 执行 `render` 方法, 获取下级 `ReactElement`.
    - 设置 `fiber.flags`, 标记副作用.
  - FunctionComponent:
    - 执行 `renderWithHooks()` -> `FunctionComponent()`, 获取下级 `ReactElement`.
    - 设置 `fiber.flags`, 标记副作用.
  - HostComponent.
    - `pendingProps.children` 作为下级 `ReactElement`.
    - 如果下级节点是文本节点, 则设置下级节点为 `null` (进入 `completeUnitOfWork` 阶段).
    - 设置 `fiber.flags`, 标记副作用.
  - 根据实际情况, 设置 `fiber.flags`, 标记副作用.
  - 根据获取的下级 `ReactElement` 对象, 调用 `reconcileChildren` 生成 `Fiber` 子节点 (只生成次级子节点).
- `ReactDOMComponent.createElement()` / `ReactClassComponent.render()` / `ReactFunctionComponent()`.
- **reconcileChildren**.
- mountChildFibers/reconcileChildFibers:
  - `mountChildFibers`: similar logic, not tracking side effects.
  - `reconcileChildFibers`: similar logic, tracking side effects.
  - `reconcileSingleElement`.
  - `reconcileSingleTextNode`.
  - `reconcileSinglePortal`.
  - `reconcileChildrenArray`.
  - `reconcileChildrenIterator`.
- **completeUnitOfWork**:
  - 当 `reconcileChildren` 返回值为 `null` 时, 表示 DFS 进行到子叶节点,
    `performUnitOfWork` 会调用 `completeUnitOfWork` 函数.
  - 调用 `completeWork` 进行 `render`.
  - 把当前 Fiber 对象的副作用队列 (`firstEffect` 与 `lastEffect`)
    加到父节点的副作用队列之后, 更新父节点的 `firstEffect` 和 `lastEffect` 指针.
  - 识别 `beginWork` 阶段设置的 `fiber.flags`,
    若当前 Fiber 存在副作用 (Effects),
    则将当前 Fiber 加入到父节点的 Effects 队列,
    等待 Commit 阶段处理.
  - 将 `workInProgress` 设置为 `siblingFiber` (DFS 遍历) 或 `returnFiber` (DFS 回溯),
    继续构建 Fiber 树.
- **completeWork**:
  - 创建 DOM 实例, 绑定至 `HostComponent`/`HostText` `fiber.stateNode` (局部状态).
  - 设置 DOM 节点属性, 绑定事件.
  - 设置 `fiber.flags`, 收集副作用.

```ts
export function scheduleUpdateOnFiber(
  fiber: Fiber,
  lane: Lane,
  eventTime: number
) {
  const root = markUpdateLaneFromFiberToRoot(fiber, lane)

  if (lane === SyncLane) {
    if (
      (executionContext & LegacyUnbatchedContext) !== NoContext
      && (executionContext & (RenderContext | CommitContext)) === NoContext
    ) {
      // 初次渲染.
      performSyncWorkOnRoot(root)
    } else {
      // 对比更新.
      ensureRootIsScheduled(root, eventTime)
    }
  }

  mostRecentlyUpdatedRoot = root
}

function performSyncWorkOnRoot(root) {
  // 1. 获取本次render的优先级, 初次构造返回 NoLanes.
  const lanes = getNextLanes(root, NoLanes)
  // 2. 从root节点开始, 至上而下更新.
  const exitStatus = renderRootSync(root, lanes)
  // 3. 将最新的 Fiber 树挂载到 root.finishedWork 节点上.
  const finishedWork: Fiber = root.current.alternate
  root.finishedWork = finishedWork
  root.finishedLanes = lanes
  // 4. 进入 Commit 阶段.
  commitRoot(root)
}

function performConcurrentWorkOnRoot(root) {
  const originalCallbackNode = root.callbackNode

  // 1. 刷新 pending 状态的 effects, 有可能某些 effect 会取消本次任务.
  const didFlushPassiveEffects = flushPassiveEffects()

  if (didFlushPassiveEffects) {
    if (root.callbackNode !== originalCallbackNode) {
      // 任务被取消, 退出调用.
      return null
    } else {
      // Current task was not canceled. Continue.
    }
  }

  // 2. 获取本次渲染的优先级.
  const lanes = getNextLanes(
    root,
    root === workInProgressRoot ? workInProgressRootRenderLanes : NoLanes
  )

  // 3. 构造 Fiber 树.
  const exitStatus = renderRootConcurrent(root, lanes)

  if (
    includesSomeLane(
      workInProgressRootIncludedLanes,
      workInProgressRootUpdatedLanes
    )
  ) {
    // 如果在 render 过程中产生了新 update, 且新 update 的优先级与最初 render 的优先级有交集.
    // 那么最初 render 无效, 丢弃最初 render 的结果, 等待下一次调度.
    prepareFreshStack(root, NoLanes)
  } else if (exitStatus !== RootIncomplete) {
    // 4. 异常处理: 有可能fiber构造过程中出现异常.
    if (exitStatus === RootError)
      processError()

    const finishedWork = root.current.alternate // Fiber
    root.finishedWork = finishedWork
    root.finishedLanes = lanes

    // 5. 输出: 渲染 Fiber树.
    finishConcurrentRender(root, exitStatus, lanes)
  }

  // 退出前再次检测, 是否还有其他更新, 是否需要发起新调度.
  ensureRootIsScheduled(root, now())

  if (root.callbackNode === originalCallbackNode) {
    // 渲染被阻断, 返回一个新的 performConcurrentWorkOnRoot 函数, 等待下一次调度.
    return performConcurrentWorkOnRoot.bind(null, root)
  }

  return null
}

function renderRootSync(root: FiberRoot, lanes: Lanes) {
  const prevExecutionContext = executionContext
  executionContext |= RenderContext

  // 如果 FiberRoot 变动, 或者 update.lane 变动, 都会刷新栈帧, 丢弃上一次渲染进度.
  if (workInProgressRoot !== root || workInProgressRootRenderLanes !== lanes) {
    // 刷新栈帧.
    prepareFreshStack(root, lanes)
  }
  do {
    try {
      workLoopSync()
      break
    } catch (thrownValue) {
      handleError(root, thrownValue)
    }
  } while (true)

  // 重置全局变量, 表明 render 结束.
  executionContext = prevExecutionContext
  workInProgressRoot = null
  workInProgressRootRenderLanes = NoLanes
  return workInProgressRootExitStatus
}

function renderRootConcurrent(root: FiberRoot, lanes: Lanes) {
  const prevExecutionContext = executionContext
  executionContext |= RenderContext
  const prevDispatcher = pushDispatcher()

  // 如果 FiberRoot 变动, 或者 update.lane变动, 都会刷新栈帧, 丢弃上一次渲染进度.
  if (workInProgressRoot !== root || workInProgressRootRenderLanes !== lanes) {
    resetRenderTimer()
    // 刷新栈帧.
    prepareFreshStack(root, lanes)
    startWorkOnPendingInteractions(root, lanes)
  }

  const prevInteractions = pushInteractions(root)

  do {
    try {
      workLoopConcurrent()
      break
    } catch (thrownValue) {
      handleError(root, thrownValue)
    }
  } while (true)

  // 重置全局变量.
  resetContextDependencies()
  popDispatcher(prevDispatcher)
  executionContext = prevExecutionContext

  // Check if the tree has completed.
  if (workInProgress !== null) {
    // Still work remaining.
    return RootIncomplete
  } else {
    // Completed the tree.
    // Set this to null to indicate there's no in-progress render.
    workInProgressRoot = null
    workInProgressRootRenderLanes = NoLanes

    // Return the final exit status.
    return workInProgressRootExitStatus
  }
}

function prepareFreshStack(root: FiberRoot, lanes: Lanes) {
  // 重置 FiberRoot 上的属性.
  root.finishedWork = null
  root.finishedLanes = NoLanes
  const timeoutHandle = root.timeoutHandle

  if (timeoutHandle !== noTimeout) {
    root.timeoutHandle = noTimeout
    cancelTimeout(timeoutHandle)
  }

  if (workInProgress !== null) {
    let interruptedWork = workInProgress.return
    while (interruptedWork !== null) {
      unwindInterruptedWork(interruptedWork)
      interruptedWork = interruptedWork.return
    }
  }

  // 重置全局变量.
  workInProgressRoot = root
  workInProgress = createWorkInProgress(root.current, null) // currentHostRootFiber.alternate.
  workInProgressRootRenderLanes
    = subtreeRenderLanes
      = workInProgressRootIncludedLanes
        = lanes
  workInProgressRootExitStatus = RootIncomplete
  workInProgressRootFatalError = null
  workInProgressRootSkippedLanes = NoLanes
  workInProgressRootUpdatedLanes = NoLanes
  workInProgressRootPingedLanes = NoLanes
}

function workLoopSync() {
  while (workInProgress !== null)
    performUnitOfWork(workInProgress)
}

function workLoopConcurrent() {
  // Perform work until Scheduler asks us to yield.
  while (workInProgress !== null && !shouldYield())
    performUnitOfWork(workInProgress)
}

function performUnitOfWork(unitOfWork: Fiber): void {
  // unitOfWork 就是被传入的 workInProgress.
  const current = unitOfWork.alternate
  const next = beginWork(current, unitOfWork, subtreeRenderLanes)
  unitOfWork.memoizedProps = unitOfWork.pendingProps

  if (next === null) {
    // 如果没有派生出新的下级节点, 则进入 completeWork 阶段, 传入的是当前 unitOfWork.
    completeUnitOfWork(unitOfWork)
  } else {
    // 如果派生出新的下级节点, 则递归处理.
    workInProgress = next
  }
}

function _performUnitOfWork_Recursive(unitOfWork: Fiber): void {
  beginWork(unitOfWork.alternate, unitOfWork, subtreeRenderLanes)
  if (unitOfWork.child)
    _performUnitOfWork_Recursive(unitOfWork.child)
  completeUnitOfWork(unitOfWork)
  if (unitOfWork.sibling)
    _performUnitOfWork_Recursive(unitOfWork.sibling)
}

function beginWork(
  current: Fiber | null,
  workInProgress: Fiber,
  renderLanes: Lanes
): Fiber | null {
  // 1. 设置 workInProgress 优先级为 NoLanes (最高优先级).
  const updateLanes = workInProgress.lanes
  didReceiveUpdate = false
  workInProgress.lanes = NoLanes

  // 2. 根据 workInProgress 节点的类型, 用不同的方法派生出子节点.
  switch (workInProgress.tag) {
    case ClassComponent: {
      const Component = workInProgress.type
      const unresolvedProps = workInProgress.pendingProps
      const resolvedProps
        = workInProgress.elementType === Component
          ? unresolvedProps
          : resolveDefaultProps(Component, unresolvedProps)
      return updateClassComponent(
        current,
        workInProgress,
        Component,
        resolvedProps,
        renderLanes
      )
    }
    case HostRoot:
      return updateHostRoot(current, workInProgress, renderLanes)
    case HostComponent:
      return updateHostComponent(current, workInProgress, renderLanes)
    case HostText:
      return updateHostText(current, workInProgress)
    case Fragment:
      return updateFragment(current, workInProgress, renderLanes)
  }
}

function completeUnitOfWork(unitOfWork: Fiber): void {
  let completedWork = unitOfWork

  // 外层循环控制并移动指针 (workInProgress/completedWork).
  do {
    const current = completedWork.alternate
    const returnFiber = completedWork.return

    if ((completedWork.flags & Incomplete) === NoFlags) {
      // 1. 处理 Fiber 节点, 会调用渲染器 (关联 Fiber 节点和 DOM 对象, 绑定事件等).
      const next = completeWork(current, completedWork, subtreeRenderLanes)

      if (next !== null) {
        // 如果派生出其他的子节点, 则回到 beginWork 阶段进行处理.
        workInProgress = next
        return
      }

      // 重置子节点的优先级.
      resetChildLanes(completedWork)

      if (
        returnFiber !== null
        && (returnFiber.flags & Incomplete) === NoFlags
      ) {
        // 2. 收集当前 Fiber 节点以及其子树的副作用 Effects.
        // 2.1 把子节点的副作用队列添加到父节点上.
        if (returnFiber.firstEffect === null)
          returnFiber.firstEffect = completedWork.firstEffect

        if (completedWork.lastEffect !== null) {
          if (returnFiber.lastEffect !== null)
            returnFiber.lastEffect.nextEffect = completedWork.firstEffect

          returnFiber.lastEffect = completedWork.lastEffect
        }

        // 2.2 如果当前 Fiber 节点有副作用, 将其添加到子节点的副作用队列之后.
        const flags = completedWork.flags

        if (returnFiber.lastEffect !== null)
          returnFiber.lastEffect.nextEffect = completedWork
        else
          returnFiber.firstEffect = completedWork

        returnFiber.lastEffect = completedWork
      }
    }

    const siblingFiber = completedWork.sibling

    if (siblingFiber !== null) {
      // 如果有兄弟节点, 返回之后再次进入 beginWork 阶段.
      workInProgress = siblingFiber
      return
    }

    // 移动指针, 指向下一个节点.
    completedWork = returnFiber
    workInProgress = completedWork
  } while (completedWork !== null)

  // 已回溯到根节点, 设置 workInProgressRootExitStatus = RootCompleted.
  if (workInProgressRootExitStatus === RootIncomplete)
    workInProgressRootExitStatus = RootCompleted
}

function completeWork(
  current: Fiber | null,
  workInProgress: Fiber,
  renderLanes: Lanes
): Fiber | null {
  const newProps = workInProgress.pendingProps

  switch (workInProgress.tag) {
    case HostRoot: {
      const fiberRoot: FiberRoot = workInProgress.stateNode

      if (fiberRoot.pendingContext) {
        fiberRoot.context = fiberRoot.pendingContext
        fiberRoot.pendingContext = null
      }

      if (current === null || current.child === null) {
        // 设置 fiber.flags.
        workInProgress.flags |= Snapshot
      }

      return null
    }
    case HostComponent: {
      popHostContext(workInProgress)
      const rootContainerInstance = getRootHostContainer()
      const type = workInProgress.type
      const currentHostContext = getHostContext()

      // 1. 创建 DOM 对象.
      const instance = createInstance(
        type,
        newProps,
        rootContainerInstance,
        currentHostContext,
        workInProgress
      )

      // 2. 把子树中的 DOM 对象 append 到本节点的 DOM 对象之后.
      appendAllChildren(instance, workInProgress, false, false)

      // 3. 设置 stateNode 属性, 指向 DOM 对象.
      workInProgress.stateNode = instance

      if (
        // 4. 设置DOM对象的属性, 绑定事件等.
        finalizeInitialChildren(
          instance,
          type,
          newProps,
          rootContainerInstance,
          currentHostContext
        )
      ) {
        // 设置 fiber.flags (Update).
        markUpdate(workInProgress)
      }

      if (workInProgress.ref !== null) {
        // 设置 fiber.flags (Ref).
        markRef(workInProgress)
      }

      return null
    }
  }
}
```

#### Host Root Fiber Rendering

```ts
function updateHostRoot(current, workInProgress, renderLanes) {
  // 1. 状态计算, 更新整合到 workInProgress.memoizedState.
  const updateQueue = workInProgress.updateQueue
  const nextProps = workInProgress.pendingProps
  const prevState = workInProgress.memoizedState
  const prevChildren = prevState !== null ? prevState.element : null
  cloneUpdateQueue(current, workInProgress)
  // 遍历 updateQueue.shared.pending, 提取有足够优先级的 update对象, 计算出最终的状态 workInProgress.memoizedState.
  processUpdateQueue(workInProgress, nextProps, null, renderLanes)
  const nextState = workInProgress.memoizedState

  // 2. 获取下级 ReactElement 对象.
  const nextChildren = nextState.element
  const root: FiberRoot = workInProgress.stateNode

  // 3. 根据 ReactElement 对象, 调用 reconcileChildren 生成 Fiber 子节点 (只生成次级子节点).
  reconcileChildren(current, workInProgress, nextChildren, renderLanes)
  return workInProgress.child
}
```

#### Host Component Fiber Rendering

```ts
function updateHostComponent(
  current: Fiber | null,
  workInProgress: Fiber,
  renderLanes: Lanes
) {
  // 1. 状态计算, 由于 HostComponent 是无状态组件, 只需要收集 nextProps.
  const type = workInProgress.type
  const nextProps = workInProgress.pendingProps
  const prevProps = current !== null ? current.memoizedProps : null

  // 2. 获取下级 ReactElement 对象.
  let nextChildren = nextProps.children
  const isDirectTextChild = shouldSetTextContent(type, nextProps)

  if (isDirectTextChild) {
    // 如果子节点只有一个文本节点, 不用再创建一个 HostText 类型的 Fiber.
    nextChildren = null
  } else if (prevProps !== null && shouldSetTextContent(type, prevProps)) {
    // 设置 fiber.flags.
    workInProgress.flags |= ContentReset
  }

  // 设置 fiber.flags.
  markRef(current, workInProgress)

  // 3. 根据 ReactElement 对象, 调用 reconcileChildren 生成 Fiber 子节点(只生成次级子节点)
  reconcileChildren(current, workInProgress, nextChildren, renderLanes)
  return workInProgress.child
}
```

#### Class Component Fiber Rendering

#### Function Component Fiber Rendering

### Reconciler Update Workflow

[Update and Update Queue](https://github.com/facebook/react/blob/main/packages/react-reconciler/src/ReactUpdateQueue.js):

- `UpdateQueue` 是一个**循环队列**.
- 创建 `Update` 时机 (`createUpdate`/`enqueueUpdate`):
  - `ReactFiberReconciler.updateContainer`.
  - `ReactFiberClassComponent.setState`.
  - `ReactFiberHooks.dispatchAction`.
- `Reconciler.Render` 阶段, 调用 `XXXClassInstance`/`useXXX`,
  遍历处理 Update Queue (`processUpdateQueue`/`HooksDispatcherOnUpdate`), 计算出 memoizedState,
  利用 pendingProps 与 memoizedState 产生新的 ReactElement (`ClassComponent.render()`/`FunctionComponent()`).

```ts
interface Update<State> {
  lane: Lane
  tag: 'UpdateState' | 'ReplaceState' | 'ForceUpdate' | 'CaptureUpdate'
  payload: any
  callback: (() => mixed) | null
  next: Update<State> | null
  _eventTime: number
}

interface SharedQueue<State> {
  pending: Update<State> | null
}

interface UpdateQueue<State> {
  baseState: State
  firstBaseUpdate: Update<State> | null
  lastBaseUpdate: Update<State> | null
  shared: SharedQueue<State>
  effects: Array<Update<State>> | null // Updates with `callback`.
}
```

[ReactFiberClassComponent.setState](https://github.com/facebook/react/blob/main/packages/react-reconciler/src/ReactFiberClassComponent.js):

```ts
const classComponentUpdater = {
  isMounted,
  enqueueSetState(inst, payload, callback) {
    // 1. 获取 ClassComponent 实例对应的 Fiber 节点.
    const fiber = getInstance(inst)
    // 2. 创建 Update 对象.
    const eventTime = requestEventTime()
    const lane = requestUpdateLane(fiber)
    const update = createUpdate(eventTime, lane)
    update.payload = payload

    if (callback !== undefined && callback !== null)
      update.callback = callback

    // 3. 将 Update 对象添加到当前 Fiber 节点的 updateQueue.
    enqueueUpdate(fiber, update)
    // 4. 请求调度, 进入 Reconciler.
    scheduleUpdateOnFiber(fiber, lane, eventTime)
  },
}
```

[ReactFiberHooks.dispatchAction](https://github.com/facebook/react/blob/main/packages/react-reconciler/src/ReactFiberHooks.js):

```ts
function dispatchAction<S, A>(
  fiber: Fiber,
  queue: UpdateQueue<S, A>,
  action: A
) {
  // 1. 创建 Update 对象.
  const eventTime = requestEventTime()
  const lane = requestUpdateLane(fiber)
  const update: Update<S, A> = {
    lane,
    action,
    eagerReducer: null,
    eagerState: null,
    next: null,
  }

  // 2. 将 Update 对象添加到当前 Hook 对象的 updateQueue.
  const pending = queue.pending

  if (pending === null) {
    update.next = update
  } else {
    update.next = pending.next
    pending.next = update
  }

  queue.pending = update

  // 3. 请求调度, 进入 Reconciler.
  scheduleUpdateOnFiber(fiber, lane, eventTime)
}
```

- createUpdate.
- enqueueUpdate.
- scheduleUpdateOnFiber.
- **markUpdateLaneFromFiberToRoot**:
  找出 Fiber 树中受到本次 `Update` 影响的所有节点 (存在更新可能),
  设置这些节点的 `fiber.lanes` 或 `fiber.childLanes`.
- ensureRootIsScheduled.
- flushSyncCallbacks.
- performSyncWorkOnRoot / performConcurrentWorkOnRoot.
- renderRootSync / renderRootConcurrent.
- workLoopSync / workLoopConcurrent.
- **performUnitOfWork(workInProgress)**.
- **beginWork**:
  - 若判断当前 Fiber 节点无需更新 (`lanes: 0, childLanes: ?`), 调用 `bailoutOnAlreadyFinishedWork` 循环检测子节点是否需要更新:
    - `instance.shouldComponentUpdate() === false`,
      `workInProgress.pendingProps === current.memoizedProps`,
      `hasLegacyContextChange() === false`,
      `checkIfContextChanged(fiber.dependencies) === false`,
      `includesSomeLane(fiber.lanes, renderLanes) === false`.
    - When it comes to `lanes: 0, childLanes: 0`, skip it and its children (**bailout**).
    - When it comes to `lanes: 0, childLanes: 1`, continue to check its children.
  - 若判断当前 Fiber 节点需要更新 (`lanes: 1`), 调用 `updateXXXComponent` 进行更新.
- **bailoutOnAlreadyFinishedWork**:
  - 若 `includesSomeLane(renderLanes, workInProgress.childLanes) === false`
    表明子节点无需更新, 可直接进入回溯阶段 (`completeUnitOfWork`).
  - 若 `includesSomeLane(renderLanes, workInProgress.childLanes) === true`,
    表明子节点需要更新, clone 并返回子节点.
- **updateHostRoot/updateXXXComponent**.
- `ReactClassComponent.render()` / `ReactFunctionComponent()` / `ReactDOMComponent.createElement()`:
  遍历处理 Update Queue (`processUpdateQueue`/`HooksDispatcherOnUpdate`), 计算出 memoizedState,
  利用 pendingProps 与 memoizedState 产生新的 ReactElement.
- **reconcileChildren**:
  - 通过 ReactElement 与 OldFiber, 产生或复用 ChildFiber.
  - 设置 `fiber.flags`, 标记副作用: `Placement`/`Deletion`/etc.
  - 对于 `Deletion` Fiber, 在 `beginWork` 阶段提前将其添加到父节点的 Effects 队列中
    (该节点会脱离 Fiber 树, 不会再进入 `completeWork` 阶段, 无法在此阶段收集此节点副作用).
- reconcileChildFibers.
- **completeUnitOfWork**: 收集副作用.
- **completeWork**: 收集副作用.

```ts
// 标记所有可能存在更新的节点, 并设置 fiber.lanes 与 fiber.childLanes.
function markUpdateLaneFromFiberToRoot(
  sourceFiber: Fiber, // 被更新的节点.
  lane: Lane
): FiberRoot | null {
  // 设置 sourceFiber.lanes.
  sourceFiber.lanes = mergeLanes(sourceFiber.lanes, lane)
  let alternate = sourceFiber.alternate

  if (alternate !== null) {
    // 同时设置 sourceFiber.alternate.lanes.
    alternate.lanes = mergeLanes(alternate.lanes, lane)
  }

  // 从 sourceFiber 开始, 向上遍历所有 Fiber, 直到 HostRootFiber.
  // 设置沿途所有 fiber.childLanes 与 fiber.alternate.childLanes.
  let node = sourceFiber
  let parent = sourceFiber.return

  while (parent !== null) {
    parent.childLanes = mergeLanes(parent.childLanes, lane)
    alternate = parent.alternate

    if (alternate !== null)
      alternate.childLanes = mergeLanes(alternate.childLanes, lane)

    node = parent
    parent = parent.return
  }

  if (node.tag === HostRoot) {
    const root: FiberRoot = node.stateNode
    return root
  } else {
    return null
  }
}

function beginWork(
  current: Fiber | null,
  workInProgress: Fiber,
  renderLanes: Lanes
): Fiber | null {
  const updateLanes = workInProgress.lanes

  if (current !== null) {
    // 进入对比.
    const oldProps = current.memoizedProps
    const newProps = workInProgress.pendingProps
    if (
      oldProps !== newProps
      || hasLegacyContextChanged()
      || (__DEV__ ? workInProgress.type !== current.type : false)
    ) {
      didReceiveUpdate = true
    } else if (!includesSomeLane(renderLanes, updateLanes)) {
      // 当前渲染优先级 renderLanes 不包括 fiber.lanes, 表明当前 Fiber 节点无需更新.
      didReceiveUpdate = false
      // 调用 bailoutOnAlreadyFinishedWork 循环检测子节点是否需要更新.
      return bailoutOnAlreadyFinishedWork(current, workInProgress, renderLanes)
    }
  }

  // 当前节点需要更新.
  workInProgress.lanes = NoLanes // 最高优先级

  switch (workInProgress.tag) {
    case ClassComponent: {
      const Component = workInProgress.type
      const unresolvedProps = workInProgress.pendingProps
      const resolvedProps
        = workInProgress.elementType === Component
          ? unresolvedProps
          : resolveDefaultProps(Component, unresolvedProps)
      return updateClassComponent(
        current,
        workInProgress,
        Component,
        resolvedProps,
        renderLanes
      )
    }
    case HostRoot:
      return updateHostRoot(current, workInProgress, renderLanes)
    case HostComponent:
      return updateHostComponent(current, workInProgress, renderLanes)
    case HostText:
      return updateHostText(current, workInProgress)
    case Fragment:
      return updateFragment(current, workInProgress, renderLanes)
  }
}

function bailoutOnAlreadyFinishedWork(
  current: Fiber | null,
  workInProgress: Fiber,
  renderLanes: Lanes
): Fiber | null {
  if (!includesSomeLane(renderLanes, workInProgress.childLanes)) {
    // 渲染优先级不包括 workInProgress.childLanes, 表明子节点也无需更新.
    // 返回 null, 直接进入回溯阶段.
    return null
  } else {
    // Fiber 自身无需更新, 但子节点需要更新, clone 并返回子节点.
    cloneChildFibers(current, workInProgress)
    return workInProgress.child
  }
}

function completeWork(
  current: Fiber | null,
  workInProgress: Fiber,
  renderLanes: Lanes
): Fiber | null {
  const newProps = workInProgress.pendingProps

  switch (workInProgress.tag) {
    case HostComponent: {
      // 非文本节点.
      popHostContext(workInProgress)
      const rootContainerInstance = getRootHostContainer()
      const type = workInProgress.type

      if (current !== null && workInProgress.stateNode !== null) {
        // 处理改动.
        updateHostComponent(
          current,
          workInProgress,
          type,
          newProps,
          rootContainerInstance
        )

        if (current.ref !== workInProgress.ref)
          markRef(workInProgress)
      }

      return null
    }
    case HostText: {
      // 文本节点.
      const newText = newProps

      if (current !== null && workInProgress.stateNode !== null) {
        const oldText = current.memoizedProps
        // 处理改动.
        updateHostText(current, workInProgress, oldText, newText)
      }

      return null
    }
  }
}

function updateHostComponent(
  current: Fiber,
  workInProgress: Fiber,
  type: Type,
  newProps: Props,
  rootContainerInstance: Container
) {
  const oldProps = current.memoizedProps

  if (oldProps === newProps)
    return

  const instance: Instance = workInProgress.stateNode
  const currentHostContext = getHostContext()
  const updatePayload = prepareUpdate(
    instance,
    type,
    oldProps,
    newProps,
    rootContainerInstance,
    currentHostContext
  )
  workInProgress.updateQueue = updatePayload

  // 如果有属性变动, 设置 fiber.flags |= Update, 等待 Commit 阶段处理.
  if (updatePayload)
    markUpdate(workInProgress)
}

function updateHostText(
  current: Fiber,
  workInProgress: Fiber,
  oldText: string,
  newText: string
) {
  // 如果有属性变动, 设置 fiber.flags |= Update, 等待 Commit 阶段处理.
  if (oldText !== newText)
    markUpdate(workInProgress)
}
```

### Reconciler Diff Workflow

Reconciler:

- O(n) incomplete tree comparison: only compare same level nodes.
- `ReactElement` + Old Children Fiber -> New Children Fiber.
- Create new children fiber (non exist/need update),
  drop useless children fiber,
  reuse old children fiber,
  set `fiber.flags`: `Placement`/`Deletion`.
  prepare for `Commit` stage.
- `key` prop to hint for Fiber nodes reuse.
- Detailed diff [algorithm](https://7kms.github.io/react-illustration-series/algorithm/diff).

#### Different Types Elements

- Rebuild element and children.

#### Same Type DOM Elements

- Only update the changed attributes.
- Use `key` attribute to match children.

`Best Practice`: give `key` to `<li>/<tr>/<tc>` elements
(stable, predictable, unique and not array indexed).

#### Same Type Component Elements

- Update the props to match the new element.

#### Reconcile Array Elements

- 第一次循环: 比较公共序列:
  - 从左到右逐一遍历, 遇到一个无法复用的节点则退出循环.
- 第二次循环: 比较非公共序列
  - 在第一次循环的基础上, 如果 oldFiber 队列遍历完成, 证明 newChildren 队列中剩余的对象全部都是新增.
  - 此时继续遍历剩余的 newChildren 队列即可, 没有额外的 diff 比较.
  - 在第一次循环的基础上, 如果 oldFiber 队列没有遍历完,
    需要将 oldFiber 队列中剩余的对象都添加到一个 Map 集合中, 以 oldFiber.key 作为键.
  - 此时继续遍历剩余的 newChildren 队列, 需要用 newChild.key 到 Map 集合中进行查找,
    将匹配上的 oldFiber 取出与 newChild 进行 diff 比较.
- 清理工作:
  - 在第二次循环结束后,
    若 Map 集合中还有剩余的 oldFiber,
    则说明 oldFiber 都是被删除的节点, 需要打上删除标记 (`Deletion`).

### Reconciler Commit Workflow

#### Renderer and HostConfig Protocol

`Renderer`:

- Implementing `HostConfig` [protocol](https://github.com/facebook/react/blob/main/packages/react-reconciler/README.md).
- Rendering fiber tree to real contents:
  - Web: DOM node.
  - Native: native UI.
  - Server: SSR strings.
- Real renderer [demo](https://github.com/sabertazimi/awesome-web/tree/main/packages/react-renderer/src/renderer).

`HostConfig` protocol:

- `isPrimaryRender: true`.
- `supportsHydration: true`: SSR renderer.
- `supportsMutation: true`: React DOM renderer.
- `supportsPersistence: true`: React Native renderer.
- Platform timer functions:
  - now.
  - scheduleTimeout.
  - cancelTimeout.
- Creation operations:
  - createInstance.
  - createTextInstance.
- UI tree operations:
  - appendInitialChild.
  - appendChild.
  - appendChildToContainer.
  - removeChildFromContainer.
  - removeChild.
  - clearContainer.
- Update props operations:
  - finalizeInitialChildren.
  - prepareUpdate.
  - commitUpdate.
  - commitTextUpdate.
  - shouldSetTextContent.
  - resetTextContent.
- Context and schedule operations:
  - getRootHostContext.
  - getChildHostContext.
  - getPublicInstance.
  - prepareForCommit.
  - resetAfterCommit.
  - preparePortalMount.

#### Commit Root

- `FiberRoot.finishedWork`:
  - 副作用队列挂载在根节点上 (`finishedWork.firstEffect`).
  - 最新 DOM 对象挂载在 HostComponent Fiber 上 (`fiber.stateNode`).
- `BeforeMutation` phase:
  - Read the state of the host tree right before DOM mutation.
  - Process
    `Passive`/`Snapshot`/`Deletion`
    effects fiber.
  - `instance.getSnapshotBeforeUpdate`.
- `Mutation` phase.
  - Mutate the host tree, render UI.
  - Process
    `ContentReset`/`Ref`/`Visibility`/`Placement`/`Update`/`Deletion`/`Hydrating`
    effects fiber.
- `Layout` phase.
  - After DOM mutation.
  - Process `Update | Callback` effects fiber.
  - `instance.componentDidMount/componentDidUpdate` (**synchronous**).
  - `instance` callback for `setState`.
  - `useLayoutEffect` (**synchronous**).
- `CommitEffects` functions located in
  [ReactFiberCommitWork](https://github.com/facebook/react/blob/main/packages/react-reconciler/src/ReactFiberCommitWork.js).

```ts
function commitRoot(root: FiberRoot, recoverableErrors: null | Array<mixed>) {
  const previousUpdateLanePriority = getCurrentUpdatePriority()
  const prevTransition = ReactCurrentBatchConfig.transition

  try {
    ReactCurrentBatchConfig.transition = null
    setCurrentUpdatePriority(DiscreteEventPriority)
    commitRootImpl(root, recoverableErrors, previousUpdateLanePriority)
  } finally {
    ReactCurrentBatchConfig.transition = prevTransition
    setCurrentUpdatePriority(previousUpdateLanePriority)
  }

  return null
}

function commitRootImpl(
  root: FiberRoot,
  recoverableErrors: null | Array<mixed>,
  renderPriorityLevel: EventPriority
) {
  do
    flushPassiveEffects()
  while (rootWithPendingPassiveEffects !== null)

  flushRenderPhaseStrictModeWarningsInDEV()

  if ((executionContext & (RenderContext | CommitContext)) !== NoContext)
    throw new Error('Should not already be working.')

  const finishedWork = root.finishedWork
  const lanes = root.finishedLanes

  if (finishedWork === null)
    return null

  // 清空 FiberRoot 对象上的属性.
  root.finishedWork = null
  root.finishedLanes = NoLanes
  root.callbackNode = null
  root.callbackPriority = NoLane

  // Update the first and last pending times on this root.
  // The new first pending time is whatever is left on the root fiber.
  const remainingLanes = mergeLanes(finishedWork.lanes, finishedWork.childLanes)

  if (root === workInProgressRoot) {
    // We can reset these now that they are finished.
    workInProgressRoot = null
    workInProgress = null
    workInProgressRootRenderLanes = NoLanes
  }

  // If there are pending passive effects, schedule a callback to process them.
  // Do this as early as possible before anything else in commit phase.
  if (
    (finishedWork.subtreeFlags & PassiveMask) !== NoFlags
    || (finishedWork.flags & PassiveMask) !== NoFlags
  ) {
    if (!rootDoesHavePassiveEffects) {
      rootDoesHavePassiveEffects = true
      pendingPassiveEffectsRemainingLanes = remainingLanes
      scheduleCallback(NormalSchedulerPriority, () => {
        flushPassiveEffects()
        return null
      })
    }
  }

  // Check if there are any effects in the whole tree.
  const subtreeHasEffects
    = (finishedWork.subtreeFlags
      & (BeforeMutationMask | MutationMask | LayoutMask | PassiveMask))
    !== NoFlags
  const rootHasEffect
    = (finishedWork.flags
      & (BeforeMutationMask | MutationMask | LayoutMask | PassiveMask))
    !== NoFlags

  if (subtreeHasEffects || rootHasEffect) {
    // Store context.
    const prevTransition = ReactCurrentBatchConfig.transition
    const previousPriority = getCurrentUpdatePriority()
    const prevExecutionContext = executionContext
    ReactCurrentBatchConfig.transition = null
    setCurrentUpdatePriority(DiscreteEventPriority)
    executionContext |= CommitContext

    // Reset this to null before calling life cycles.
    ReactCurrentOwner.current = null

    // `BeforeMutation` phase:
    // read the state of the host tree right before we mutate it.
    // `getSnapshotBeforeUpdate` is called.
    commitBeforeMutationEffects(root, finishedWork)

    // `Mutation` phase:
    // mutate the host tree.
    commitMutationEffects(root, finishedWork, lanes)

    resetAfterCommit(root.containerInfo)

    // The workInProgress tree is now the current tree (during `componentDidMount`/`Update`).
    root.current = finishedWork

    // `Layout` phase:
    // `useLayoutEffect` is called.
    commitLayoutEffects(finishedWork, root, lanes)

    // Tell Scheduler to yield at the end of the frame,
    // so the browser has an opportunity to paint.
    requestPaint()

    // Restore context.
    executionContext = prevExecutionContext
    setCurrentUpdatePriority(previousPriority)
    ReactCurrentBatchConfig.transition = prevTransition
  } else {
    // No effects.
    root.current = finishedWork
  }

  const rootDidHavePassiveEffects = rootDoesHavePassiveEffects

  if (rootDoesHavePassiveEffects) {
    // This commit has passive effects:
    // Stash a reference to them.
    rootDoesHavePassiveEffects = false
    rootWithPendingPassiveEffects = root
    pendingPassiveEffectsLanes = lanes
  } else {
    // There were no passive effects:
    // immediately release the cache pool for this render.
    releaseRootPooledCache(root, remainingLanes)
  }

  // Always call this before exiting `commitRoot`,
  // to ensure that any additional work on this root is scheduled.
  ensureRootIsScheduled(root, now())

  // If the passive effects are the result of a discrete render,
  // flush them synchronously at the end of the current task
  // so that the result is immediately observable.
  if (
    includesSomeLane(pendingPassiveEffectsLanes, SyncLane)
    && root.tag !== LegacyRoot
  ) {
    flushPassiveEffects()
  }

  // If layout work was scheduled, flush it now.
  flushSyncCallbacks()

  return null
}
```

```ts
const BeforeMutationMask = Update | Snapshot | ChildDeletion | Visibility

const MutationMask
  = Placement
    | Update
    | ChildDeletion
    | ContentReset
    | Ref
    | Hydrating
    | Visibility

const LayoutMask = Update | Callback | Ref | Visibility
```

#### Before Mutation Phase

- `Passive` effects:
  - `FunctionComponent` fiber (hooks):
    If there are pending passive effects,
    schedule a callback (**asynchronous**) to process them,
    **as early as possible** before anything else in commit phase.
  - `useXXX` hooks normally run in **asynchronous** mode.
  - `useEffect` (**asynchronous**) run after `useLayoutEffect`.
- `Snapshot` effects:
  - `HostRoot` fiber: `HostConfig.clearContainer`.
  - `ClassComponent` fiber: `instance.getSnapShotBeforeUpdate`.
- `Deletion` effects: `commitBeforeMutationEffectsDeletion` -> `HostConfig.beforeActiveInstanceBlur`.

```ts
// `Passive` effects.
scheduleCallback(NormalSchedulerPriority, () => {
  flushPassiveEffects()
  return null
})

function flushPassiveEffects(): boolean {
  // Returns whether passive effects were flushed.
  if (pendingPassiveEffectsRenderPriority !== NoSchedulerPriority) {
    const priorityLevel
      = pendingPassiveEffectsRenderPriority > NormalSchedulerPriority
        ? NormalSchedulerPriority
        : pendingPassiveEffectsRenderPriority
    pendingPassiveEffectsRenderPriority = NoSchedulerPriority
    return runWithPriority(priorityLevel, flushPassiveEffectsImpl)
  }

  return false
}

function flushPassiveEffectsImpl() {
  if (rootWithPendingPassiveEffects === null)
    return false

  rootWithPendingPassiveEffects = null
  pendingPassiveEffectsLanes = NoLanes

  // 1. 执行 effect.destroy().
  const unmountEffects = pendingPassiveHookEffectsUnmount
  pendingPassiveHookEffectsUnmount = []

  for (let i = 0; i < unmountEffects.length; i += 2) {
    const effect = unmountEffects[i]
    const fiber = unmountEffects[i + 1]
    const destroy = effect.destroy
    effect.destroy = undefined

    if (typeof destroy === 'function')
      destroy()
  }

  // 2. 执行新 effect.create(), 重新赋值到 effect.destroy.
  const mountEffects = pendingPassiveHookEffectsMount
  pendingPassiveHookEffectsMount = []

  for (let i = 0; i < mountEffects.length; i += 2) {
    const effect = mountEffects[i]
    const fiber = mountEffects[i + 1]
    effect.destroy = create()
  }
}
```

```ts
// `Snapshot` effects.
function commitBeforeMutationEffects(root: FiberRoot, firstChild: Fiber) {
  HostConfig.prepareForCommit(root.containerInfo)
  nextEffect = firstChild

  // DFS traverse.
  while (nextEffect !== null) {
    const fiber = nextEffect
    const deletions = fiber.deletions

    if (deletions !== null) {
      for (let i = 0; i < deletions.length; i++) {
        const deletion = deletions[i]
        commitBeforeMutationEffectsDeletion(deletion)
      }
    }

    const child = fiber.child

    if (
      (fiber.subtreeFlags & BeforeMutationMask) !== NoFlags
      && child !== null
    ) {
      // 1. Visit children.
      nextEffect = child
    } else {
      while (nextEffect !== null) {
        const fiber = nextEffect
        commitBeforeMutationEffectsOnFiber(fiber)
        const sibling = fiber.sibling

        // 2. Visit sibling.
        if (sibling !== null) {
          nextEffect = sibling
          break
        }

        nextEffect = fiber.return
      }
    }
  }
}

function commitBeforeMutationEffectsOnFiber(finishedWork: Fiber) {
  const current = finishedWork.alternate
  const flags = finishedWork.flags

  if ((flags & Snapshot) !== NoFlags) {
    switch (finishedWork.tag) {
      case ClassComponent: {
        if (current !== null) {
          const prevProps = current.memoizedProps
          const prevState = current.memoizedState
          const instance = finishedWork.stateNode

          // We could update instance props and state here,
          // but instead we rely on them being set during last render.
          const snapshot = instance.getSnapshotBeforeUpdate(
            finishedWork.elementType === finishedWork.type
              ? prevProps
              : resolveDefaultProps(finishedWork.type, prevProps),
            prevState
          )
          instance.__reactInternalSnapshotBeforeUpdate = snapshot
        }

        break
      }
      case HostRoot: {
        if (supportsMutation) {
          const root = finishedWork.stateNode
          HostConfig.clearContainer(root.containerInfo)
        }

        break
      }
      case FunctionComponent:
      case ForwardRef:
      case SimpleMemoComponent:
      case HostComponent:
      case HostText:
      case HostPortal:
      case IncompleteClassComponent:
        // Nothing to do for these component types.
        break
      default: {
        throw new Error(
          'This unit of work tag should not have side-effects. This error is '
          + 'likely caused by a bug in React. Please file an issue.'
        )
      }
    }
  }
}

function commitBeforeMutationEffectsDeletion(deletion: Fiber) {
  if (doesFiberContain(deletion, focusedInstanceHandle)) {
    shouldFireAfterActiveInstanceBlur = true
    beforeActiveInstanceBlur(deletion)
  }
}
```

#### Mutation Phase

- `ContentReset` effects: `commitResetTextContent` -> `HostConfig.resetTextContext`.
- `Ref` effects: `commitAttachRef`/`commitDetachRef` -> `HostConfig.getPublicInstance`.
- `Visibility` effects:
  - `SuspenseComponent` fiber:
    `markCommitTimeOfFallback`.
  - `OffscreenComponent` fiber:
    `hideOrUnhideAllChildren` -> `HostConfig.hideInstance/hideTextInstance/unhideInstance/unhideTextInstance`.
- `Deletion` effects:
  `commitDeletion` -> `HostConfig.removeChild/removeChildFromContainer/clearSuspenseBoundaryFromContainer`.
- `Placement` effects:
  `commitPlacement` -> `insertOrAppendPlacementNode`/`insertOrAppendPlacementNodeIntoContainer`
  -> `HostConfig.appendChild/insertBefore/appendChildToContainer/insertInContainerBefore`.
- `Update` effects:
  `commitWork` -> `HostConfig.commitUpdate/commitTextUpdate/commitHydratedContainer/replaceContainerChildren`.
- `Hydrating` effects.

:::tip Effect Order

Deletion -> Insertion -> Update.

:::

```ts
export function commitMutationEffects(
  root: FiberRoot,
  firstChild: Fiber,
  committedLanes: Lanes
) {
  inProgressLanes = committedLanes
  inProgressRoot = root
  nextEffect = firstChild

  while (nextEffect !== null) {
    const fiber = nextEffect
    const deletions = fiber.deletions

    if (deletions !== null) {
      for (let i = 0; i < deletions.length; i++) {
        const childToDelete = deletions[i]
        commitDeletion(root, childToDelete, fiber)
      }
    }

    const child = fiber.child

    if ((fiber.subtreeFlags & MutationMask) !== NoFlags && child !== null) {
      // 1. Visit children.
      nextEffect = child
    } else {
      while (nextEffect !== null) {
        const fiber = nextEffect
        commitMutationEffectsOnFiber(fiber, root, lanes)
        const sibling = fiber.sibling

        // 2. Visit sibling.
        if (sibling !== null) {
          nextEffect = sibling
          break
        }

        nextEffect = fiber.return
      }
    }
  }

  inProgressLanes = null
  inProgressRoot = null
}

function commitMutationEffectsOnFiber(
  finishedWork: Fiber,
  root: FiberRoot,
  lanes: Lanes
) {
  const flags = finishedWork.flags

  if (flags & ContentReset)
    commitResetTextContent(finishedWork)

  if (flags & Ref) {
    const current = finishedWork.alternate

    if (current !== null) {
      // 先清空 ref, 在第三阶段 (Layout), 再重新赋值.
      commitDetachRef(current)
    }

    if (finishedWork.tag === ScopeComponent)
      commitAttachRef(finishedWork)
  }

  if (flags & Visibility) {
    switch (finishedWork.tag) {
      case SuspenseComponent: {
        const newState: OffscreenState | null = finishedWork.memoizedState
        const isHidden = newState !== null

        if (isHidden) {
          const current = finishedWork.alternate
          const wasHidden = current !== null && current.memoizedState !== null

          if (!wasHidden)
            markCommitTimeOfFallback()
        }

        break
      }
      case OffscreenComponent: {
        const newState: OffscreenState | null = finishedWork.memoizedState
        const isHidden = newState !== null
        const current = finishedWork.alternate
        const wasHidden = current !== null && current.memoizedState !== null
        const offscreenBoundary: Fiber = finishedWork

        if (supportsMutation)
          hideOrUnhideAllChildren(offscreenBoundary, isHidden)

        break
      }
    }
  }

  const primaryFlags = flags & (Placement | Update | Hydrating)

  switch (primaryFlags) {
    case Placement: {
      // Placement
      commitPlacement(finishedWork)
      finishedWork.flags &= ~Placement // Clear bit.
      break
    }
    case PlacementAndUpdate: {
      // Placement
      commitPlacement(finishedWork)
      finishedWork.flags &= ~Placement // Clear bit.

      // Update
      const current = finishedWork.alternate
      commitWork(current, finishedWork)
      break
    }
    case Hydrating: {
      finishedWork.flags &= ~Hydrating // Clear bit.
      break
    }
    case HydratingAndUpdate: {
      finishedWork.flags &= ~Hydrating // Clear bit.

      // Update
      const current = finishedWork.alternate
      commitWork(current, finishedWork)
      break
    }
    case Update: {
      const current = finishedWork.alternate
      commitWork(current, finishedWork)
      break
    }
  }
}
```

#### Layout Phase

- `Update | Callback` effects:
  - `instance.componentDidMount/componentDidUpdate` (**synchronous**).
  - `instance` callback for `setState`.
  - `useLayoutEffect` (**synchronous**).
  - `HostConfig.getPublicInstance/commitMount`.

```ts
function commitLayoutEffects(
  finishedWork: Fiber,
  root: FiberRoot,
  committedLanes: Lanes
): void {
  inProgressLanes = committedLanes
  inProgressRoot = root
  nextEffect = finishedWork

  while (nextEffect !== null) {
    const fiber = nextEffect
    const firstChild = fiber.child

    if ((fiber.subtreeFlags & LayoutMask) !== NoFlags && firstChild !== null) {
      // 1. Visit children.
      nextEffect = firstChild
    } else {
      while (nextEffect !== null) {
        const fiber = nextEffect

        if ((fiber.flags & LayoutMask) !== NoFlags) {
          const current = fiber.alternate
          commitLayoutEffectOnFiber(root, current, fiber, committedLanes)
        }

        // Complete `commitLayoutEffects`.
        if (fiber === subtreeRoot) {
          nextEffect = null
          break
        }

        const sibling = fiber.sibling

        // 2. Visit sibling.
        if (sibling !== null) {
          nextEffect = sibling
          break
        }

        nextEffect = fiber.return
      }
    }
  }

  inProgressLanes = null
  inProgressRoot = null
}

function commitLayoutEffectOnFiber(
  finishedRoot: FiberRoot,
  current: Fiber | null,
  finishedWork: Fiber,
  committedLanes: Lanes
): void {
  if ((finishedWork.flags & LayoutMask) !== NoFlags) {
    switch (finishedWork.tag) {
      case FunctionComponent:
      case ForwardRef:
      case SimpleMemoComponent: {
        if (
          !enableSuspenseLayoutEffectSemantics
          || !offscreenSubtreeWasHidden
        ) {
          commitHookEffectListMount(HookLayout | HookHasEffect, finishedWork)
        }

        break
      }
      case ClassComponent: {
        const instance = finishedWork.stateNode

        if (finishedWork.flags & Update) {
          if (!offscreenSubtreeWasHidden) {
            if (current === null) {
              instance.componentDidMount()
            } else {
              const prevProps
                = finishedWork.elementType === finishedWork.type
                  ? current.memoizedProps
                  : resolveDefaultProps(
                      finishedWork.type,
                      current.memoizedProps
                    )
              const prevState = current.memoizedState

              instance.componentDidUpdate(
                prevProps,
                prevState,
                instance.__reactInternalSnapshotBeforeUpdate
              )
            }
          }
        }

        const updateQueue = finishedWork.updateQueue

        if (updateQueue !== null) {
          // 处理 update 回调函数, e.g: `this.setState({}, callback)`.
          commitUpdateQueue(finishedWork, updateQueue, instance)
        }

        break
      }
      case HostRoot: {
        const updateQueue = finishedWork.updateQueue

        if (updateQueue !== null) {
          let instance = null

          if (finishedWork.child !== null) {
            switch (finishedWork.child.tag) {
              case HostComponent:
                instance = getPublicInstance(finishedWork.child.stateNode)
                break
              case ClassComponent:
                instance = finishedWork.child.stateNode
                break
            }
          }

          // 处理 update 回调函数, e.g: `this.setState({}, callback)`.
          commitUpdateQueue(finishedWork, updateQueue, instance)
        }

        break
      }
      case HostComponent: {
        const instance: Instance = finishedWork.stateNode

        if (current === null && finishedWork.flags & Update) {
          const type = finishedWork.type
          const props = finishedWork.memoizedProps
          commitMount(instance, type, props, finishedWork)
        }

        break
      }
      case SuspenseComponent: {
        commitSuspenseHydrationCallbacks(finishedRoot, finishedWork)
        break
      }
      case HostText:
      case HostPortal:
      case Profiler:
      case SuspenseListComponent:
      case IncompleteClassComponent:
      case ScopeComponent:
      case OffscreenComponent:
      case LegacyHiddenComponent: {
        break
      }

      default:
        throw new Error(
          'This unit of work tag should not have side-effects. This error is '
          + 'likely caused by a bug in React. Please file an issue.'
        )
    }
  }

  // 重新设置ref.
  if (finishedWork.flags & Ref)
    commitAttachRef(finishedWork)
}
```

### Reconciler Performance Tips

- Render: 通过一些启发式算法跳过没有发生变更的子树.
- Commit:
  - 维护了一个列表用于记录变化的 Fiber, 不再访问其他 Fiber.
  - 首次渲染 (Mount) 时只有 `HostRootFiber.flags` 会设置 `Placement`,
    在 Commit 阶段只会执行一次插入操作.
- GC:
  - Reuse `OldFiber` objects when `Bailout`.
  - `current` Fiber tree and `workInProgress` Fiber tree for `Double Buffering`.

### Minimal Reconciler Implementation

```ts
function performWork(deadline) {
  if (!nextUnitOfWork)
    resetNextUnitOfWork()

  // whether current status is idle status or not
  while (nextUnitOfWork && deadline.timeRemaining() > ENOUGH_TIME)
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork)

  if (pendingCommit)
    commitAllWork(pendingCommit)

  // checks if there's pending work
  // if exist, performWork in **next frame** when idle
  if (nextUnitOfWork || updateQueue.length > 0)
    requestIdleCallback(performWork)
}

function scheduleUpdate(instance, partialState) {
  updateQueue.push({
    from: CLASS_COMPONENT,
    instance,
    partialState,
  })

  requestIdleCallback(performWork)
}

// React.render function
function render(elements, container) {
  updateQueue.push({
    from: HOST_ROOT,
    dom: container,
    newProps: {
      children: elements,
    },
  })

  requestIdleCallback(performWork)
}
```
