# React Basic Notes

<!-- TOC -->

- [React Basic Notes](#react-basic-notes)
  - [Diff Algorithm (Reconciliation)](#diff-algorithm-reconciliation)
    - [React Fiber](#react-fiber)
    - [Elements of Different Types](#elements-of-different-types)
    - [DOM Elements of Same Type](#dom-elements-of-same-type)
    - [Component Elements of Same Type](#component-elements-of-same-type)
  - [Props and State](#props-and-state)
    - [setState](#setstate)
    - [componentDidMount()](#componentdidmount)
    - [Props Validation](#props-validation)
  - [Element and Component](#element-and-component)
    - [JSX](#jsx)
    - [functional/class component](#functionalclass-component)
    - [stateful/stateless component](#statefulstateless-component)
      - [stateless component](#stateless-component)
      - [stateful component](#stateful-component)
    - [Component Lifecycle](#component-lifecycle)
      - [Creation/Mounting](#creationmounting)
      - [Updating](#updating)
      - [Unmounting](#unmounting)
    - [Refs](#refs)
      - [Forward Refs](#forward-refs)
      - [Callback Refs](#callback-refs)
    - [HOC (Higher-Order Components)](#hoc-higher-order-components)
    - [Render Props (Children as Function)](#render-props-children-as-function)
  - [Hooks](#hooks)
    - [Default Hooks](#default-hooks)
      - [useMemo](#usememo)
      - [useCallback](#usecallback)
      - [useState](#usestate)
      - [useRef](#useref)
      - [useEffect](#useeffect)
    - [Basic Rules](#basic-rules)
    - [Hooks Internel](#hooks-internel)
    - [Custom Hooks](#custom-hooks)
      - [LifeCycle Hooks](#lifecycle-hooks)
      - [Async Data Hook](#async-data-hook)
      - [Reducer Hook](#reducer-hook)
      - [Previous Hook](#previous-hook)
      - [Store Hook](#store-hook)
      - [History Hook](#history-hook)
      - [Debounce Hook](#debounce-hook)
      - [Context Hook](#context-hook)
      - [Router Hook](#router-hook)
      - [Script Loading Hook](#script-loading-hook)
      - [Form Hook](#form-hook)
  - [ES6 Syntax](#es6-syntax)
    - [Comments](#comments)
    - [binding for this](#binding-for-this)
  - [React Style Guide](#react-style-guide)
    - [Naming Style](#naming-style)
    - [Props Style](#props-style)
    - [Refs Style](#refs-style)
    - [Alignment Style](#alignment-style)
    - [Quotes Style](#quotes-style)
    - [Spacing Style](#spacing-style)
    - [Ordering of Class Component](#ordering-of-class-component)
  - [MVC/MVVM](#mvcmvvm)
    - [Controller](#controller)
    - [Comparsion](#comparsion)
    - [Best Practice](#best-practice)
  - [Modern React](#modern-react)
    - [Lazy and Suspense](#lazy-and-suspense)
    - [Context API](#context-api)
      - [Ref with Context](#ref-with-context)
    - [Error Boundary](#error-boundary)
    - [`React.Fragment`/`Array Components`](#reactfragmentarray-components)
  - [React Performance](#react-performance)
    - [Rerendering Problem](#rerendering-problem)
    - [Code Spliting](#code-spliting)
  - [Server Side Rendering](#server-side-rendering)
    - [Pros of SSR](#pros-of-ssr)
      - [Performance](#performance)
      - [SEO](#seo)
      - [Awesome Library](#awesome-library)
    - [Basic Example](#basic-example)
    - [Internationalization](#internationalization)
      - [Simple Intl](#simple-intl)
  - [Testing](#testing)
    - [Shallow Renderer](#shallow-renderer)
    - [Test Renderer](#test-renderer)
    - [Enzyme](#enzyme)
  - [Create React App](#create-react-app)
    - [React Scripts](#react-scripts)
    - [Deployment](#deployment)
  - [Styled Component](#styled-component)
    - [Basic Usage](#basic-usage)
      - [Shared CSS Styles](#shared-css-styles)
      - [Extend Styled Component](#extend-styled-component)
      - [Props for Styled Component](#props-for-styled-component)
  - [Interviews](#interviews)

<!-- /TOC -->

## Diff Algorithm (Reconciliation)

### React Fiber

- [A Simple React with Fiber Reconciliation](https://github.com/sabertazimi/meactjs)

React Fiber 的目标是提高其在动画、布局和手势等领域的适用性.
它的主要特性是 incremental rendering: 将渲染任务拆分为小的任务块并将任务分配到多个帧上的能力.

### Elements of Different Types

- rebuild element and children
- methods: componentDidMount/componentWillUnmount

### DOM Elements of Same Type

- only update the changed attributes
- use `key` attribute to match children

`Best Practice`: give `key` to `<li>/<tr>/<tc>` elements
(stable, predictable, unique and not array indexed)

### Component Elements of Same Type

- update the props to match the new element
- methods: componentWillRecevieProps/componentWillUpdate
- then `render` called, diff algorithm recurses on the old result and the new result

## Props and State

### setState

在事件处理函数中的 setState 是异步执行的,
为了防止子组件在处理事件时多次渲染,
将多个 setState (包括父组件) 移到浏览器事件之后执行
(batch updates: 此时 React 内部变量 isBatchingUpdates 变成 true),
可以提升 React 性能.
未来会在更多的可以 batch updates 的场景下将 setState 设为异步执行,
所以编写代码时最好将 setState 总是当做异步执行函数.

Batch Update: 事件处理,
Not Bacth Update: Async Work (setTimeout/Promise.then)

```js
class Example extends React.Component {
  constructor() {
    super();
    this.state = {
      val: 0
    };
  }

  componentDidMount() {
    this.setState({ val: this.state.val + 1 });
    console.log(this.state.val); // 第 1 次 log

    this.setState({ val: this.state.val + 1 });
    console.log(this.state.val); // 第 2 次 log

    setTimeout(() => {
      this.setState({ val: this.state.val + 1 });
      console.log(this.state.val); // 第 3 次 log

      this.setState({ val: this.state.val + 1 });
      console.log(this.state.val); // 第 4 次 log
    }, 0);
  }

  render() {
    return null;
  }
}

// => 0 0 2 3
```

### componentDidMount()

- don't `setState` directly in this method
- can use `setInterval`/`setTimeout`/AJAX request/`fetch` in this method,
  and call `setState` as `callback` inside these functions

```js
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    };
  }

  componentDidMount() {
    fetch('https://api.example.com/items')
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            isLoaded: true,
            items: result.items
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        error => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      );
  }

  render() {
    const { error, isLoaded, items } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <ul>
          {items.map(item => (
            <li key={item.name}>
              {item.name} {item.price}
            </li>
          ))}
        </ul>
      );
    }
  }
}
```

### Props Validation

```js
static PropTypes = {
    arrayProps: React.PropTypes.array
    // array/bool/func/number/object/string/symbol/node/element
    // React.PropTypes.instanceOf/oneOf/oneOfType
    // React.PropTypes.arrayOf(React.PropsTypes.number)
    // React.PropTypes.objectOf(React.PropsTypes.number)
    // React.PropTypes.any.isRequired
}
```

## Element and Component

react element 实际上是纯对象, 可由 React.createElement()/JSX/element factory helper 创建,
并被 react 在必要时渲染成真实的 DOM 结点

```js
ReactDOM.render({
  type: Form,
  props: {
    isSubmitted: false,
    buttonText: 'OK!'
  }
}, document.getElementById('root'));

// React: You told me this...
{
  type: Form,
  props: {
    isSubmitted: false,
    buttonText: 'OK!'
  }
}

// React: ...And Form told me this...
{
  type: Button,
  props: {
    children: 'OK!',
    color: 'blue'
  }
}

// React: ...and Button told me this! I guess I'm done.
{
  type: 'button',
  props: {
    className: 'button button-blue',
    children: {
      type: 'b',
      props: {
        children: 'OK!'
      }
    }
  }
}
```

### JSX

在 JSX 中, 小写标签被认为是 HTML 标签.
但是, 含有 `.` 的大写和小写标签名却不是.

```js
<component /> 将被转换为 React.createElement('component') (i.e, HTML 标签)
<obj.component /> 将被转换为 React.createElement(obj.component)
<Component /> 将被转换为 React.createElement(Component)
```

### functional/class component

- 函数型组件没有实例, 类型组件具有实例, 但实例化的工作由 react 自动完成
- class component 具有更多特性: state, lifecycle hook, performance optimizations(shouldComponentUpdate()回调方法)

### stateful/stateless component

#### stateless component

采用函数型声明, 不使用 setState(), 一般作为表现型组件

#### stateful component

- 采用类型声明, 使用 setState(), 一般作为容器型组件(containers)
- 结合 Redux 中的 connect 方法, 将 store 中的 state 作为此类组件的 props

```js
this.setState((prevState, props) => ({
  counter: prevState.counter + props.increment
}));
```

### Component Lifecycle

#### Creation/Mounting

constructor(props, context) -> getDerivedStateFromProps() -> render() -> componentDidMount()

#### Updating

update for three reasons:

- parent/top (re-)render
- this.setState() called
- this.forceUpdate() called

getDerivedStateFromProps() -> shouldComponentUpdate(nextProps, nextState)
-> render() -> getSnapshotBeforeUpdate() -> componentDidUpdate(prevProps, prevState)

getSnapshotBeforeUpdate:
在最新的渲染输出提交给 DOM 前将会立即调用,
这对于从 DOM 捕获信息（比如：滚动位置）很有用.

#### Unmounting

componentWillUnmount()

### Refs

Refs 用于返回对元素的引用.
但在大多数情况下, 应该避免使用它们.
当需要直接访问 DOM 元素或组件的实例时, 它们可能非常有用:

- Managing focus, text selection, or media playback.
- Triggering imperative animations.
- Integrating with third-party DOM libraries.k

#### Forward Refs

你不能在函数式组件上使用`ref`属性,
因为它们没有实例, 但可以在函数式组件内部使用`ref`.
Ref forwarding 是一个特性,
它允许一些组件获取接收到 ref 对象并将它进一步传递给子组件.

```js
// functional component
const ButtonElement = React.forwardRef((props, ref) => (
  <button ref={ref} className="CustomButton">
    {props.children}
  </button>
));

// Create ref to the DOM button:
// get ref to `<button>`
const ref = React.createRef();
<ButtonElement ref={ref}>{'Forward Ref'}</ButtonElement>;
```

#### Callback Refs

```js
class UserInput extends Component {
  setSearchInput = (input) => {
    this.input = input;
  }

  render () {
    return (
      <input
        type='text'
        ref={this.setSearchInput} /> // Access DOM input in handle submit
      <button type='submit'>Submit</button>
    );
  }
}
```

### HOC (Higher-Order Components)

solve:

- reuse code with using ES6 classes
- compose multiple HOCs

problem:

- indirection issues: which HOC providing a certain prop
- name collision: overwrite the same name prop silently

```jsx
// ToggleableMenu.jsx
function withToggleable(Clickable) {
  return class extends React.Component {
    constructor() {
      super();
      this.toggle = this.toggle.bind(this);
      this.state = { show: false };
    }

    toggle() {
      this.setState(prevState => ({ show: !prevState.show }));
    }

    render() {
      return (
        <div>
          <Clickable {...this.props} onClick={this.toggle} />
          {this.state.show && this.props.children}
        </div>
      );
    }
  };
}

class NormalMenu extends React.Component {
  render() {
    return (
      <div onClick={this.props.onClick}>
        <h1>{this.props.title}</h1>
      </div>
    );
  }
}

export default withToggleable(NormalMenu);
```

```jsx
class Menu extends React.Component {
  render() {
    return (
      <div>
        <ToggleableMenu title="First Menu">
          <p>Some content</p>
        </ToggleableMenu>
        <ToggleableMenu title="Second Menu">
          <p>Another content</p>
        </ToggleableMenu>
        <ToggleableMenu title="Third Menu">
          <p>More content</p>
        </ToggleableMenu>
      </div>
    );
  }
}
```

### Render Props (Children as Function)

solve:

- reuse code with using ES6 classes
- lowest level of indirection
- no naming collision

advantages:

- separate presentation from logic
- extendable
- reusable (abstract same logic)

problem:

- minor memory issues when defining a closure for every render
- callback hell (when many cross-cutting concerns are applied to a component)

```jsx
class Toggleable extends React.Component {
  constructor() {
    super();
    this.toggle = this.toggle.bind(this);
    this.state = { show: false };
  }

  toggle() {
    this.setState(prevState => ({ show: !prevState.show }));
  }

  render() {
    return this.props.children(this.state.show, this.toggle);
  }
}

const ToggleableMenu = props => (
  <Toggleable>
    {(show, onClick) => (
      <div>
        <div onClick={onClick}>
          <h1>{props.title}</h1>
        </div>
        {show && props.children}
      </div>
    )}
  </Toggleable>
);
```

```jsx
class Menu extends React.Component {
  render() {
    return (
      <div>
        <ToggleableMenu title="First Menu">
          <p>Some content</p>
        </ToggleableMenu>
        <ToggleableMenu title="Second Menu">
          <p>Another content</p>
        </ToggleableMenu>
        <ToggleableMenu title="Third Menu">
          <p>More content</p>
        </ToggleableMenu>
      </div>
    );
  }
}
```

## Hooks

- reuse stateful logic between components
  (avoid wrapper hell in render props or HOC)
- split one complex component into smaller functions
- use more of React's features without classes
- class components will read `this.props` **too early** or **too late**,
  because of mutable `this` in React
  (however `props` argument of function components is immutable),
  that says _function components capture the rendered values_.
  more details on
  [Overreacted](https://overreacted.io/how-are-function-components-different-from-classes/)

### Default Hooks

#### useMemo

- returns a memoized value
- only recompute the memoized value when one of the dependencies has changed
- **optimization** helps to avoid expensive calculations on every render

```js
const Button = ({ color, children }) => {
  const textColor = useMemo(
    () => slowlyCalculateTextColor(color),
    [color] // ✅ Don’t recalculate until `color` changes
  );

  return (
    <button className={'Button-' + color + ' Button-text-' + textColor}>
      {children}
    </button>
  );
};
```

#### useCallback

- returns a memoized callback
- 对事件句柄进行缓存, `useState` 的第二个返回值是 `dispatch`,
  但是每次都是返回新的函数, 使用 `useCallback`, 可以让它使用上次的函数.
  在虚拟 DOM 更新过程中, 如果事件句柄相同, 那么就不用每次都进行
  `removeEventListner` 与 `addEventListner`.
- `useCallback(fn, deps)` is equivalent to `useMemo(() => fn, deps)`

```js
function Parent() {
  const [query, setQuery] = useState('react');

  // ✅ Preserves identity until query changes
  const fetchData = useCallback(() => {
    const url = 'https://hn.algolia.com/api/v1/search?query=' + query;
    // ... Fetch data and return it ...
  }, [query]); // ✅ Callback deps are OK

  return <Child fetchData={fetchData} />;
}

function Child({ fetchData }) {
  let [data, setData] = useState(null);

  useEffect(() => {
    fetchData().then(setData);
  }, [fetchData]); // ✅ Effect deps are OK

  // ...
}
```

#### useState

read rendered props/state

```js
setState(prevState => {
  // Object.assign would also work
  return { ...prevState, ...updatedValues };
});
```

```jsx
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

```jsx
import { useState, useEffect } from 'react';

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

#### useRef

`useRef` read rendered props/state from **the future**.
Generally, you should avoid reading or setting refs
during rendering because they’re mutable.
We want to keep the rendering predictable.
However, if we want to get the latest value of a particular prop or state,
it's good to read/set `ref.current`.

```js
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
}
```

#### useEffect

[Complete Guide](https://overreacted.io/a-complete-guide-to-useeffect)

`useEffect` lifecycle:
React renders UI for current props/state to screen,
React cleans up the effect for prev props/state,
React runs the effect for current props/state.

`useEffect` nasty loop:
The effect hook runs when the component mounts but also when the component updates.
Because we are setting the state after every data fetch,
the component updates and the effect runs again.
It fetches the data again and again.
That’s a bug and needs to be avoided.

`useEffect` deps list:
That’s why provide an **empty array** as second argument to the effect hook
to avoid activating it on component updates
but **only for the mounting** of the component.
If one of the variables changes, the hook runs again.
For listeners binding, use `[]` deps list should be better.

Functions in useEffect:

- If only use some functions inside an effect, move them directly into that effect.
- Hoisting functions that don’t need props or state outside of component,
  and pull the ones that are used only by an effect inside of that effect.
- for useCallback function, it should be in deps list `useEffect(() => {}, [callback])`

```js
// https://www.robinwieruch.de/react-hooks-fetch-data
import { useState, useEffect } from 'react';
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

### Basic Rules

- only call Hooks at the top level (don't inside loops, conditions or nested functions)
- only call Hooks from React function components

### Hooks Internel

```js
const MyReact = (function() {
  let hooks = [],
    currentHook = 0; // array of hooks, and an iterator!
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
    }
  };
})();
```

```js
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
    render: () => console.log('render', { count, text })
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

```js
function Component() {
  const [text, setText] = useSplitURL('www.netlify.com');
  return {
    type: txt => setText(txt),
    render: () => console.log({ text })
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

### Custom Hooks

- [More Custom Hooks](https://usehooks.com)

#### LifeCycle Hooks

componentDidMount

```js
const useMount = fn => {
  useEffect(() => void fn(), []);
};
```

componentWillUnmount

```js
const useUnmount = fn => {
  useEffect(() => fn, []);
};
```

componentDidUpdate

```js
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

Force Update

```js
const useUpdate = () => useState(0)[1];
```

```js
// @ts-ignore
import { useState } from 'react';

interface VoidFunction {
  (): void;
}

interface VoidFunctionCreator {
  (): VoidFunction;
}

const max: number = 9007199254740990; // Number.MAX_SAFE_INTEGER - 1;

const useForceUpdate: VoidFunctionCreator = (): VoidFunction => {
  const [, setState] = useState(0);
  const forceUpdate: VoidFunction = (): void => {
    setState((state: number) => (state + 1) % max);
  };
  return forceUpdate;
};

export default useForceUpdate;
```

isMounted

```js
const useIsMounted = () => {
  const [isMount, setIsMount] = useState(false);

  useEffect(() => {
    if (!isMount) {
      setIsMount(true);
    }
    return () => setIsMount(false);
  }, []);

  return isMount;
};
```

#### Async Data Hook

```jsx
import { useState, useEffect } from 'react';

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

```jsx
import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';

const useDataApi = (initialUrl, initialData) => {
  const [data, setData] = useState(initialData);
  const [url, setUrl] = useState(initialUrl);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

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

  useEffect(() => {
    fetchData();
  }, [url]);

  const doGet = (event, url) => {
    setUrl(url);
    event.preventDefault();
  };

  return { data, isLoading, isError, doGet };
};

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

#### Reducer Hook

```jsx
function useReducer(reducer, initialState) {
  const [state, setState] = useState(initialState);

  function dispatch(action) {
    const nextState = reducer(state, action);
    setState(nextState);
  }

  return [state, dispatch];
}

function Todos() {
  const [todos, dispatch] = useReducer(todosReducer, []);

  function handleAddClick(text) {
    dispatch({ type: 'add', text });
  }

  // ...
}
```

#### Previous Hook

```jsx
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

#### Store Hook

```js
import { useState } from 'react';

export const store = {
  state: {},
  setState(value) {
    this.state = value;
    this.setters.forEach(setter => setter(this.state));
  },
  setters: []
};

// Bind the setState function to the store object so
// we don't lose context when calling it elsewhere
store.setState = store.setState.bind(store);

// this is the custom hook we'll call on components.
export function useStore() {
  const [state, set] = useState(store.state);

  if (!store.setters.includes(set)) {
    store.setters.push(set);
  }

  return [state, store.setState];
}
```

#### History Hook

```js
import { useReducer, useCallback } from 'react';

// Initial state that we pass into useReducer
const initialState = {
  // Array of previous state values updated each time we push a new state
  past: [],
  // Current state value
  present: null,
  // Will contain "future" state values if we undo (so we can redo)
  future: []
};

// Our reducer function to handle state changes based on action
const reducer = (state, action) => {
  const { past, present, future } = state;

  switch (action.type) {
    case 'UNDO':
      const previous = past[past.length - 1];
      const newPast = past.slice(0, past.length - 1);

      return {
        past: newPast,
        present: previous,
        future: [present, ...future]
      };
    case 'REDO':
      const next = future[0];
      const newFuture = future.slice(1);

      return {
        past: [...past, present],
        present: next,
        future: newFuture
      };
    case 'SET':
      const { newPresent } = action;

      if (newPresent === present) {
        return state;
      }
      return {
        past: [...past, present],
        present: newPresent,
        future: []
      };
    case 'CLEAR':
      const { initialPresent } = action;

      return {
        ...initialState,
        present: initialPresent
      };
  }
};

// Hook
const useHistory = initialPresent => {
  const [state, dispatch] = useReducer(reducer, {
    ...initialState,
    present: initialPresent
  });

  const canUndo = state.past.length !== 0;
  const canRedo = state.future.length !== 0;

  // Setup our callback functions
  // We memoize with useCallback to prevent unnecessary re-renders

  const undo = useCallback(() => {
    if (canUndo) {
      dispatch({ type: 'UNDO' });
    }
  }, [canUndo, dispatch]);

  const redo = useCallback(() => {
    if (canRedo) {
      dispatch({ type: 'REDO' });
    }
  }, [canRedo, dispatch]);

  const set = useCallback(newPresent => dispatch({ type: 'SET', newPresent }), [
    dispatch
  ]);

  const clear = useCallback(() => dispatch({ type: 'CLEAR', initialPresent }), [
    dispatch
  ]);

  // If needed we could also return past and future state
  return { state: state.present, set, undo, redo, clear, canUndo, canRedo };
};
```

#### Debounce Hook

```js
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

// Usage
const [searchTerm, setSearchTerm] = useState('');
const debouncedSearchTerm = useDebounce(searchTerm, 500);

useEffect(() => {
  ...
}, [debouncedSearchTerm]);
```

#### Context Hook

```js
import React from 'react';

const CountContext = React.createContext();

function CountProvider(props) {
  const [count, setCount] = React.useState(0);
  const value = React.useMemo(() => {
    return {
      count,
      setCount
    };
  }, [count]);
  return <CountContext.Provider value={value} {...props} />;
}

function useCount() {
  const context = React.useContext(CountContext);
  if (!context) {
    throw new Error('useCount must be used within a CountProvider');
  }
  const { count, setCount } = context;
  const increment = () => setCount(c => c + 1);
  return {
    count,
    increment
  };
}

export { CountProvider, useCount };
```

#### Router Hook

```js
import { useContext, useEffect } from 'react';
import { __RouterContext } from 'react-router';
import useForceUpdate from 'use-force-update';

const useReactRouter = () => {
  const forceUpdate = useForceUpdate();
  const routerContext = useContext(__RouterContext);

  useEffect(() => routerContext.history.listen(forceUpdate), [routerContext]);

  return routerContext;
};
```

#### Script Loading Hook

```js
// Hook
let cachedScripts = [];

const useScript = src => {
  // Keeping track of script loaded and error state
  const [state, setState] = useState({
    loaded: false,
    error: false
  });

  useEffect(
    () => {
      // If cachedScripts array already includes src
      // that means another instance ...
      // ... of this hook already loaded this script, so no need to load again.
      if (cachedScripts.includes(src)) {
        setState({
          loaded: true,
          error: false
        });
      } else {
        cachedScripts.push(src);

        // Create script
        let script = document.createElement('script');
        script.src = src;
        script.async = true;

        // Script event listener callbacks for load and error
        const onScriptLoad = () => {
          setState({
            loaded: true,
            error: false
          });
        };

        const onScriptError = () => {
          // Remove from cachedScripts we can try loading again
          const index = cachedScripts.indexOf(src);
          if (index >= 0) cachedScripts.splice(index, 1);
          script.remove();

          setState({
            loaded: true,
            error: true
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

#### Form Hook

```js
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
      [event.target.name]: event.target.value
    }));
  };

  return {
    handleChange,
    handleSubmit,
    values
  };
};

export default useForm;
```

```jsx
export const useField = (
  name,
  form,
  { defaultValue, validations = [], fieldsToValidateOnChange = [name] } = {}
) => {
  let [value, setValue] = useState(defaultValue);
  let [errors, setErrors] = useState([]);
  let [pristine, setPristine] = useState(true);
  let [validating, setValidating] = useState(false);
  let validateCounter = useRef(0);

  const validate = async () => {
    let validateIteration = ++validateCounter.current;
    setValidating(true);
    let formData = form.getFormData();
    let errorMessages = await Promise.all(
      validations.map(validation => validation(formData, name))
    );
    errorMessages = errorMessages.filter(errorMsg => !!errorMsg);
    if (validateIteration === validateCounter.current) {
      // this is the most recent invocation
      setErrors(errorMessages);
      setValidating(false);
    }
    let fieldValid = errorMessages.length === 0;
    return fieldValid;
  };

  useEffect(() => {
    if (pristine) return; // Avoid validate on mount
    form.validateFields(fieldsToValidateOnChange);
  }, [value]);

  let field = {
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
    validating
  };
  form.addField(field);
  return field;
};

export const useForm = ({ onSubmit }) => {
  let [submitted, setSubmitted] = useState(false);
  let [submitting, setSubmitting] = useState(false);
  let fields = [];

  const validateFields = async fieldNames => {
    let fieldsToValidate;
    if (fieldNames instanceof Array) {
      fieldsToValidate = fields.filter(field =>
        fieldNames.includes(field.name)
      );
    } else {
      //if fieldNames not provided, validate all fields
      fieldsToValidate = fields;
    }
    let fieldsValid = await Promise.all(
      fieldsToValidate.map(field => field.validate())
    );
    let formValid = fieldsValid.every(isValid => isValid === true);
    return formValid;
  };

  const getFormData = () => {
    return fields.reduce((formData, f) => {
      formData[f.name] = f.value;
      return formData;
    }, {});
  };

  return {
    onSubmit: async e => {
      e.preventDefault();
      setSubmitting(true);
      setSubmitted(true); // User has attempted to submit form at least once
      let formValid = await validateFields();
      let returnVal = await onSubmit(getFormData(), formValid);
      setSubmitting(false);
      return returnVal;
    },
    isValid: () => fields.every(f => f.errors.length === 0),
    addField: field => fields.push(field),
    getFormData,
    validateFields,
    submitted,
    submitting
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
  let showErrors = (!pristine || formSubmitted) && !!errors.length;
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
        //Simulate 400 response from server
        usernameField.setErrors(['Make a longer username']);
      } else {
        //Simulate 201 response from server
        window.alert(
          `form valid: ${valid}, form data: ${JSON.stringify(formData)}`
        );
      }
    }
  });

  const usernameField = useField('username', form, {
    defaultValue: '',
    validations: [
      async formData => {
        await timeout(2000);
        return formData.username.length < 6 && 'Username already exists';
      }
    ],
    fieldsToValidateOnChange: []
  });
  const passwordField = useField('password', form, {
    defaultValue: '',
    validations: [
      formData =>
        formData.password.length < 6 && 'Password must be at least 6 characters'
    ],
    fieldsToValidateOnChange: ['password', 'confirmPassword']
  });
  const confirmPasswordField = useField('confirmPassword', form, {
    defaultValue: '',
    validations: [
      formData =>
        formData.password !== formData.confirmPassword &&
        'Passwords do not match'
    ],
    fieldsToValidateOnChange: ['password', 'confirmPassword']
  });

  let requiredFields = [usernameField, passwordField, confirmPasswordField];

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

## ES6 Syntax

### Comments

```jsx
render() {
  {/* */}
  {/*

  */}
}
```

### binding for this

```js
constructor() {
  this.handle = this.handle.bind(this);
}

handle(e) {
  this.setState({
    ...
  });
}
```

```js
state = {};
handle = e => {};
```

## React Style Guide

### Naming Style

- use PascalCase for `.jsx` and component constructor
- use camelCase for component instance reference
- use camelCase for props name

```js
// bad
import reservationCard from './ReservationCard';

// good
import ReservationCard from './ReservationCard';

// bad
const ReservationItem = <ReservationCard />;

// good
const reservationItem = <ReservationCard />;
```

- setting displayname for HOC

```js
// bad
export default function withFoo(WrappedComponent) {
  return function WithFoo(props) {
    return <WrappedComponent {...props} foo />;
  }
}

// good
export default function withFoo(WrappedComponent) {
  function WithFoo(props) {
    return <WrappedComponent {...props} foo />;
  }

  const wrappedComponentName = WrappedComponent.displayName
    || WrappedComponent.name
    || 'Component';

  WithFoo.displayName = `withFoo(${wrappedComponentName})`;
  return WithFoo;
}
```

### Props Style

- use `prop` not `prop={true}`
- filter out unnecessary props

```js
// bad
render() {
  const { irrelevantProp, ...relevantProps  } = this.props;
  return <WrappedComponent {...this.props} />
}

// good
render() {
  const { irrelevantProp, ...relevantProps  } = this.props;
  return <WrappedComponent {...relevantProps} />
}
```

### Refs Style

- use callback refs

```js
// bad
// deprecated
<Foo
  ref="myRef"
/>

// good
<Foo
  ref={(ref) => { this.myRef = ref; }}
/>
```

### Alignment Style

```js
// bad
<Foo superLongParam="bar"
     anotherSuperLongParam="baz" />

// good
<Foo
  superLongParam="bar"
  anotherSuperLongParam="baz"
/>

// if props fit in one line then keep it on the same line
<Foo bar="bar" />

// children get indented normally
<Foo
  superLongParam="bar"
  anotherSuperLongParam="baz"
>
  <Quux />
</Foo>

// bad
{showButton &&
  <Button />
}

// bad
{
  showButton &&
    <Button />
}

// good
{showButton && (
  <Button />
)}

// good
{showButton && <Button />}
```

### Quotes Style

- use `"` for JSX attributes, use `'` for all other JS

```js
// bad
<Foo bar='bar' />

// good
<Foo bar="bar" />

// bad
<Foo style={{ left: "20px" }} />

// good
<Foo style={{ left: '20px' }} />
```

### Spacing Style

- a single space in self-closing tag
- no pad JSX curly spaces

```js
// bad
<Foo/>

// very bad
<Foo                 />

// bad
<Foo
 />

// good
<Foo />
```

```js
// bad
<Foo bar={ baz } />

// good
<Foo bar={baz} />
```

### Ordering of Class Component

1. optional static methods
2. constructor
3. getChildContext
4. getDerivedStateFromProps
5. componentDidMount
6. getDerivedStateFromProps
7. shouldComponentUpdate
8. getSnapshotBeforeUpdate
9. componentDidUpdate
10. componentWillUnmount
11. clickHandlers or eventHandlers like onClickSubmit() or onChangeDescription()
12. getter methods for render like getSelectReason() or getFooterContent()
13. optional render methods like renderNavigation() or renderProfilePicture()
14. render

## MVC/MVVM

### Controller

- 处理请求的参数
- 渲染和重定向
- 选择 Model 和 Service
- 处理 Session 和 Cookies

### Comparsion

- 初始渲染: Virtual DOM > 脏检查 >= 依赖收集
- 小量数据更新: 依赖收集 >> Virtual DOM + 优化 > 脏检查（无法优化） > Virtual DOM 无优化
- 大量数据更新: 脏检查 + 优化 >= 依赖收集 + 优化 > Virtual DOM（无法/无需优化）>> MVVM 无优化

### Best Practice

- 组件细分化
- 组件
  - 只传入必要的 props
  - 使用 immutablejs 或者 react.addons.update 实现不可变数据结构
  - 结合 React.addons.PureRenderMixin 来减少 reRender
- 在 shouldComponentUpdate 中优化组件减少 reRender
- 使用 context
- 少做 dom 操作，始终让 UI 能够基于 State 还原
- 在 store 和 action 中不 dom 操作或者访问 window.属性，只与数据打交道
- 推荐使用 ES6
- npm 的 debug 包，log 组件渲染的每个步骤和动作
- [Singel](https://github.com/diegohaz/singel)

## Modern React

### Lazy and Suspense

```js
import React, { lazy, Suspense } from 'react';

const Product = lazy(() => import('./ProductHandler'));

const App = () => (
  <div className="product-list">
    <h1>My Awesome Product</h1>
    <Suspense fallback={<h2>Product list is loading...</h2>}>
      <p>Take a look at my product:</p>
      <section>
        <Product id="PDT-49-232" />
        <Product id="PDT-50-233" />
        <Product id="PDT-51-234" />
      </section>
    </Suspense>
  </div>
);
```

### Context API

```js
function contextWrapper(WrappedComponent, Context) {
  return class extends React.Component {
    render() {
      return (
        <Context.Consumer>
          {context => <WrappedComponent context={context} {...this.props} />}
        </Context.Consumer>
      );
    }
  };
}
```

#### Ref with Context

```js
// Context.js
import React, { Component, createContext } from 'react';

// React team — thanks for Context API 👍
const context = createContext();
const { Provider: ContextProvider, Consumer } = context;

class Provider extends Component {
  // refs
  // usage: this.textareaRef.current
  textareaRef = React.createRef();

  // input handler
  onInput = e => {
    const { name, value } = e.target;

    this.setState({
      [name]: value
    });
  };

  render() {
    return (
      <ContextProvider
        value={{
          textareaRef: this.textareaRef,
          onInput: this.onInput
        }}
      >
        {this.props.children}
      </ContextProvider>
    );
  }
}
```

```js
// TextArea.jsx
import React from 'react';
import { Consumer } from './Context';

const TextArea = () => (
  <Consumer>
    {context => (
      <textarea
        ref={context.textareaRef}
        className="app__textarea"
        name="snippet"
        placeholder="Your snippet…"
        onChange={context.onInput}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck="false"
        wrap="off"
      />
    )}
  </Consumer>
);
```

### Error Boundary

以下是错误边界不起作用的情况:

- 在事件处理器内
- setTimeout 或 requestAnimationFrame 回调中的异步代码
- 在服务端渲染期间
- 错误边界代码本身中引发错误时

```js
class ErrorBoundary extends React.Component {
  state = {
    hasError: false,
    error: null,
    info: null
  };

  // key point
  componentDidCatch(error, info) {
    this.setState({
      hasError: true,
      error: error,
      info: info
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div>
          <h1>Oops, something went wrong :(</h1>
          <p>The error: {this.state.error.toString()}</p>
          <p>Where it occured: {this.state.info.componentStack}</p>
        </div>
      );
    }

    return this.props.children;
  }
}
```

### `React.Fragment`/`Array Components`

```js
class Items extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Fruit />
        <Beverages />
        <Drinks />
      </React.Fragment>
    )
  }
}

class Fruit extends React.Component {
  render() {
    return (
      <>
        <li>Apple</li>
        <li>Orange</li>
        <li>Blueberry</li>
        <li>Cherry</li>
      </>
    )
  }
}

class Frameworks extends React.Component {
  render () {
    return (
      [
        <p>JavaScript:</p>
        <li>React</li>,
        <li>Vuejs</li>,
        <li>Angular</li>
      ]
    )
  }
}
```

## React Performance

- use `key` correctly
- `shouldComponentUpdate`
- `React.PureComponent`
- stateless component
- Immutable.js
- Isomorphic rendering
- Webpack bundle analyzer
- [Progressive React](https://houssein.me/progressive-react)

### Rerendering Problem

The major difference between them is that
React.Component doesn’t implement the shouldComponentUpdate() lifecycle method
while React.PureComponent implements it.
If component's render() function renders the same result
given the same props and state,
use React.PureComponent/React.memo for a performance boost in some cases.

```js
import React, { PureComponent } from 'react';

const Unstable = props => {
  console.log(' Rendered Unstable component ');

  return (
    <div>
      <p> {props.value}</p>
    </div>
  );
};

class App extends PureComponent {
  state = {
    value: 1
  };

  componentDidMount() {
    setInterval(() => {
      this.setState(() => {
        return { value: 1 };
      });
    }, 2000);
  }

  render() {
    return (
      <div>
        <Unstable value={this.state.value} />
      </div>
    );
  }
}

export default App;
```

```js
import React, { Component } from 'react';

const Unstable = React.memo(props => {
  console.log(' Rendered this component ');

  return (
    <div>
      <p> {props.value}</p>
    </div>
  );
});

class App extends Component {
  state = {
    value: 1
  };

  componentDidMount() {
    setInterval(() => {
      this.setState(() => {
        return { value: 1 };
      });
    }, 2000);
  }

  render() {
    return (
      <div>
        <Unstable value={this.state.value} />
      </div>
    );
  }
}

export default App;
```

### Code Spliting

```js
import React, { Component } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';

const formValidator = Yup.object().shape({
  /* ... */
});

export default class Form extends Component {
  render() {
    return <Formik validationSchema={formValidator}>{/* ... */}</Formik>;
  }
}
```

```js
import React, { Component } from 'react';

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      Form: undefined
    };
  }

  render() {
    const { Form } = this.state;

    return (
      <div className="app">
        {Form ? <Form /> : <button onClick={this.showForm}>Show form</button>}
      </div>
    );
  }

  showForm = async () => {
    const { default: Form } = await import('./Form');
    this.setState({ Form });
  };
}
```

## Server Side Rendering

Application code is written in a way that
it can be executed **both on the server and on the client**.
The browser displays the initial HTML (fetch from server),
simultaneously downloads the single-page app (SPA) in the background.
Once the client-side code is ready,
the client takes over and the website becomes a SPA.

前后端分离是一种进步，但彻底的分离，也不尽善尽美，
比如会有首屏加载速度和 SEO 方面的困扰。
前后端分离+服务端首屏渲染看起来是个更优的方案，
它结合了前后端分离和服务端渲染两者的优点，
既做到了前后端分离，又能保证首页渲染速度，还有利于 SEO。

### Pros of SSR

#### Performance

- Smaller first meaningful paint time
- HTML's strengths: progressive rendering
- Browsers are incredibly good at rendering partial content

#### SEO

- Search engine crawlers used to not execute scripts (or initial scripts)
- Search engine usually stop after a while (roughly 10 seconds)
- SPAs can't set meaningful HTTP status codes

#### Awesome Library

- [Next.js for Isomorphic rendering](https://nextjs.org)

### Basic Example

[presentation](http://peerigon.github.io/talks/2018-07-20-js-camp-barcelona-bumpy-road-universal-javascript/#1)

webpack config

```js
module.exports = [
  webConfig,
  nodeConfig,
];

const webConfig = {}
  ...baseConfig,
  target: 'web',
};

const nodeConfig = {
  ...baseConfig,
  target: 'node',
  output: {
    ...baseConfig.output,
    libraryTarget: 'commonjs2',
  },
  externals: [require('webpack-node-externals')()],
};
```

start.server.js

```js
import React from 'react';
import ReactDOMServer from "react-dom/server";
import App from './App.js';

export deafult () => ReactDOMServer.renderToString(<App />);
```

index.html.js

```js
const startApp = require('../dist/server.js').default;

module.exports = () => `<!DOCTYPE html>
<head>
  ...
</head>
<body>
  <div id="app">${startApp()}</div>
  <script src="/static/client.js"></script>
</body>
</html>
```

start.client.js

```js
import React from 'react';
import ReactDOMServer from 'react-dom';
import App from './App.js';

ReactDOM.hydrate(<App />, document.getElementById('app'));
```

- async fetch out of `<App />`

```js
const data = await fetchData();
const app = <App {...data} />

return {
  html: ReactDOMServer.renderToString(app);
  state: { data }
};
```

### Internationalization

- [react-intl](https://github.com/alibaba/react-intl-universal)

#### Simple Intl

```js
// locale/zh.js
export default ({
   hello: '你好，{name}'
});

// locale/en.js
export default ({
   hello: 'Hello，{name}'
}) ;
```

```js
import IntlMessageFormat from 'intl-messageformat';
import zh from '../locale/zh';
import en from '../locale/en';
const MESSAGES = { en, zh };
const LOCALE = 'en'; // 这里写上决定语言的方法，例如可以从 cookie 判断语言

class Intl {
  get(key, defaultMessage, options) {
    let msg = MESSAGES[LOCALE][key];

    if (msg == null) {
      if (defaultMessage != null) {
        return defaultMessage;
      }
      return key;
    }

    if (options) {
      msg = new IntlMessageFormat(msg, LOCALE);
      return msg.format(options);
    }
    return msg;
  }
}

export default Intl;
```

## Testing

- [Complete Tutorial](https://www.robinwieruch.de/react-testing-tutorial/#react-enzyme-test-setup)
- [Jest and Enzyme Snapshots Testing](https://medium.com/codeclan/testing-react-with-jest-and-enzyme-20505fec4675)
- [Cypress - Testing Framework](https://www.cypress.io/)

### Shallow Renderer

浅层渲染 (Shallow Renderer) 对于在 React 中编写单元测试用例很有用.
它允许渲染一个一级深的组件并断言其渲染方法返回的内容, 而不必担心子组件未实例化或渲染.

```js
function MyComponent() {
  return (
    <div>
      <span className={'heading'}>{'Title'}</span>
      <span className={'description'}>{'Description'}</span>
    </div>
  );
}
```

```js
import ShallowRenderer from 'react-test-renderer/shallow';

const renderer = new ShallowRenderer();
renderer.render(<MyComponent />);

const result = renderer.getRenderOutput();

expect(result.type).toBe('div');
expect(result.props.children).toEqual([
  <span className={'heading'}>{'Title'}</span>,
  <span className={'description'}>{'Description'}</span>
]);
```

### Test Renderer

测试渲染器 (Test Renderer) 可用于将组件渲染为纯 JavaScript 对象,
而不依赖于 DOM 或原生移动环境.
该包可以轻松获取由 ReactDOM 或 React Native 平台所渲染的视图层次结构 (类似于 DOM 树) 的快照,
而无需使用浏览器或 jsdom.

```js
import TestRenderer from 'react-test-renderer';

const Link = ({ page, children }) => <a href={page}>{children}</a>;

const testRenderer = TestRenderer.create(
  <Link page={'https://www.facebook.com/'}>{'Facebook'}</Link>
);

console.log(testRenderer.toJSON());
// {
//   type: 'a',
//   props: { href: 'https://www.facebook.com/' },
//   children: [ 'Facebook' ]
// }
```

### Enzyme

```bash
npm install --save-dev enzyme enzyme-adapter-react-16
```

```js
import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { DataTable } from './components';

configure({ adapter: new Adapter() });

describe(() => {
  it('renders in table rows based on provided columns', () => {
    const cols = [
      { header: 'ID', name: 'id' },
      { header: 'Name', name: 'name' },
      { header: 'Email', name: 'email' }
    ];
    const data = [
      { id: 5, name: 'John', email: 'john@example.com' },
      { id: 6, name: 'Liam', email: 'liam@example.com' },
      { id: 7, name: 'Maya', email: 'maya@example.com', someTest: 10 },
      {
        id: 8,
        name: 'Oliver',
        email: 'oliver@example.com',
        hello: 'hello world'
      },
      { id: 25, name: 'Amelia', email: 'amelia@example.com' }
    ];

    // Shallow render Data Table
    const container = shallow(<DataTable data={data} cols={cols} />);

    // There should be ONLY 1 table element
    const table = container.find('table');
    expect(table).toHaveLength(1);

    // The table should have ONLY 1 thead element
    const thead = table.find('thead');
    expect(thead).toHaveLength(1);

    // The number of th tags should be equal to number of columns
    const headers = thead.find('th');
    expect(headers).toHaveLength(cols.length);
    // Each th tag text should equal to column header
    headers.forEach((th, idx) => {
      expect(th.text()).toEqual(cols[idx].header);
    });

    // The table should have ONLY 1 tbody tag
    const tbody = table.find('tbody');
    expect(tbody).toHaveLength(1);

    // tbody tag should have the same number of tr tags as data rows
    const rows = tbody.find('tr');
    expect(rows).toHaveLength(data.length);
    // Loop through each row and check the content
    rows.forEach((tr, rowIndex) => {
      const cells = tr.find('td');
      expect(cells).toHaveLength(cols.length);
      expect(cells.at(0).text()).toEqual(data[rowIndex].id);
      expect(cells.at(1).text()).toEqual(data[rowIndex].name);
      expect(cells.at(2).text()).toEqual(data[rowIndex].email);
    });
  });
});
```

## Create React App

- [Custom React Scripts](https://auth0.com/blog/how-to-configure-create-react-app/)

```js
npx create-react-app app-name --scripts-version @sabertazimi/react-scripts --use-npm
npm init react-app app-name --scripts-version @sabertazimi/react-scripts --use-npm
```

### React Scripts

- HTML/CSS/JSX boilerplate in `template/` directory
- config in `config/` directory

### Deployment

- [Offical Documentation](https://facebook.github.io/create-react-app/docs/deployment)
- [Deploy Subdirectory](https://medium.com/@svinkle/how-to-deploy-a-react-app-to-a-subdirectory-f694d46427c1)

## Styled Component

### Basic Usage

#### Shared CSS Styles

```js
// Import React.js, styled-components and css
import React from 'react';
import styled, { css } from 'styled-components';
const container = document.querySelector('.container');

// Define new const with bold style
const headingStyle = css`
  font-weight: bold;
`;

// Define typography styles
const H1 = styled.h1`
  font-size: 54px;
  // Using headingStyle const
  ${headingStyle}
`;
const H2 = styled.h2`
  font-size: 36px;
  // Using headingStyle const
  ${headingStyle}
`;
const H3 = styled.h3`
  font-size: 24px;
  // Using headingStyle const
  ${headingStyle}
`;
const H4 = styled.h4`
  font-size: 16px;
  // Using headingStyle const
  ${headingStyle}
`;
const H5 = styled.h5`
  font-size: 14px;
  // Using headingStyle const
  ${headingStyle}
`;
const H6 = styled.h6`
  font-size: 12px;
  // Using headingStyle const
  ${headingStyle}
`;
const Text = styled.p`
  font-size: 16px;
`;
const Small = styled.small`
  font-size: 80%;
`;

// Use our styles
const WrapperContainer = () => (
  <div>
    <H1>Heading h1</H1>
    <H2>Heading h2</H2>
    <H3>Heading h3</H3>
    <H4>Heading h4</H4>
    <H5>Heading h5</H5>
    <H6>Heading h6</H6>
    <Text>Body text</Text>
    <Small>Small text</Small>
  </div>
);

ReactDOM.render(<WrapperContainer />, container);
```

#### Extend Styled Component

```js
// Import React.js and styled-components
import React from 'react';
import styled from 'styled-components';

const container = document.querySelector('.container');

const Button = styled.button`
  padding: 12px 24px;
  font-size: 16px;
  color: #fff;
  border: 0;
  border-radius: 35px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  cursor: pointer;
`;

// Using extend to create a red variant of the button
const RedButton = Button.extend`
  background-color: #e74c3c;
`;

// Using extend to create a green variant of the button
const GreenButton = Button.extend`
  background-color: #2ecc71;
`;

// Use our styles
const WrapperContainer = () => (
  <div>
    <Button>Defaul button</Button>
    <RedButton>Red button</RedButton>
    <GreenButton>Green button</GreenButton>
  </div>
);

ReactDOM.render(<WrapperContainer />, container);
```

#### Props for Styled Component

```js
// Import React.js, styled-components and css
import React from 'react';
import styled, { css } from 'styled-components';

const container = document.querySelector('.container');

const Button = styled.button`
  padding: 12px 24px;
  font-size: 16px;
  border: 0;
  border-radius: 35px;
  box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
  cursor: pointer;

  // Using props to create a gray variant of the button
  ${props =>
    props.gray &&
    css`
      background-color: #95a5a6;
    `}
  // Using props to create a green variant of the button
  ${props =>
    props.green &&
    css`
      background-color: #2ecc71;
    `}
  // Using props to create a red variant of the button
  ${props =>
    props.red &&
    css`
      background-color: #e74c3c;
    `}
  // We can also use a ternary operator for "binary" changes
  color: ${props => (props.gray ? '#2c3e50' : '#fff')};
`;

const WrapperContainer = () => (
  <div>
    <Button>Defaul button</Button>
    {/* Button with prop "red" */}
    <Button red>Red button</Button>
    {/* Button with prop "green" */}
    <Button green>Green button</Button>
  </div>
);

ReactDOM.render(<WrapperContainer />, container);
```

## Interviews

- [Reactjs Interview Questions](https://github.com/semlinker/reactjs-interview-questions)
