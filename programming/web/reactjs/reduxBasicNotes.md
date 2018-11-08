# Redux Basic Notes

<!-- TOC -->

- [Redux Basic Notes](#redux-basic-notes)
  - [Basic Concepts](#basic-concepts)
    - [Store and State](#store-and-state)
      - [Store](#store)
      - [State](#state)
        - [Persisted State](#persisted-state)
    - [Reducers](#reducers)
  - [Best Practice](#best-practice)
  - [Awesome Tools](#awesome-tools)
    - [Libs](#libs)
      - [http](#http)
      - [middleware](#middleware)
      - [state](#state)
    - [Debugging](#debugging)

<!-- /TOC -->

Stack: ES6, webpack, react-hot-loader

[React Redux Style Guide](https://github.com/iraycd/React-Redux-Styleguide)

## Basic Concepts

### Store and State

#### Store

Redux 中只有一个全局唯一 store 状态树, 且由 reducers 创建 store.

```js
export default appStore = createStore(rootReducers, initState);
```

#### State

在 Redux 中 State 并不显式定义:

- 初态与变化态皆由 Reducers 定义并控制
- Actions 中保存着 action.type 外, 还保存着供 Reducers 进行有效状态变化的其他信息(可自定义)
- 调用 Dispatch 方法自动向 Store 传递一个 Action(因为只有一个全局 Store, 故无需额外指定 Store 参数),
  Store 遍历调用其中的  Reducers, 根据 switch 语句进行匹配 action 处理
- reducer 只保存最基本的 state, 可计算出的 state 放在 mapStateToProps(selector) 中直接计算后绑定至 props

##### Persisted State

```js
// localStorage.getItem('state')/localStorage.setItem('state', serializedState)
const persistedState = loadLocalStorageState();
const appStore = createStore(rootReducers, persistedState);
const appStore.subscribe(throttle(() => {
    saveLocalStorageState({
        todos: store.getState().todos
    });
}, 1000));
```

### Reducers

- 必须保持无任何副作用: 不修改传入参数, 不调用副作用函数(api/date.now()/math.random())

## Best Practice

- 用ES6, webpack, react-hot-loader....详细内容参照MERN v2.0
  Build production ready universal apps easily
- [Redux Devtools](https://github.com/gaearon/redux-devtools)
- 区分smart component (know the state) 和 dump component (stateless)
- component里不要出现任何async calls，交给action creator来做
- reducer尽量简单，复杂的交给action creator
- reducer里return新state的时候：

```js
// add new item to state array
// bad and does not work case "ADD":
return state.push(newItem);
// Good case "ADD":
return [ ...state, newItem ];


// delete new item to state array
// bad and does not work case "DELETE":
return state.splice(index, 1);
// Good case "DELETE":
return state.slice(0, index).concat(state.slice(index + 1));

// update new item to state array
// First way case "EDIT":
return state.slice(0, index)
  .concat([{id: "id", value: "newValue"}])
  .slice(index + 1);
// Second way case "EDIT":
return state.map((item) => {
  if (item.id === "id") {
    return {
      ...item, value: "newValue"
    }
  } else {
    return item;
  }
});
```

- action creator里，用promise/async/await以及redux-thunk来帮助你完成想要的功能
- 在 test 里不管你用 tape 还是 mocha，请用 [enzyme.js](http://airbnb.io/enzyme/)
- 有些时候有些项目你并不需要redux

```js
const fluxStandardAction = {
    type: 'ADD_TODO',
    payload: {
        text: 'Do something'
    },
    meta: meta
};

const fluxStandardAction = {
    type: 'ADD_TODO',
    payload: new Error(),
    error: true
};
```

## Awesome Tools

### Libs

#### http

- isomorphic-fetch

#### middleware

- redux-thunk
- redux-saga
- redux-promise
- redux-diff-logger

#### state

- redux-undo

### Debugging

- [Redux Devtools](https://github.com/gaearon/redux-devtools)
