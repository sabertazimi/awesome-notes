# React Basic Notes

<!-- TOC -->

- [React Basic Notes](#react-basic-notes)
  - [Diff Algorithm (Reconciliation)](#diff-algorithm-reconciliation)
    - [Elements of Different Types](#elements-of-different-types)
    - [DOM Elements of Same Type](#dom-elements-of-same-type)
    - [Component Elements of Same Type](#component-elements-of-same-type)
  - [props and state](#props-and-state)
    - [getInitialState() and constructor(props, context)](#getinitialstate-and-constructorprops-context)
    - [componentDidMount()](#componentdidmount)
    - [componentWillReceiveProps()](#componentwillreceiveprops)
    - [props validation](#props-validation)
  - [element and component](#element-and-component)
    - [functional/class component](#functionalclass-component)
    - [stateful/stateless component](#statefulstateless-component)
      - [stateless component](#stateless-component)
      - [stateful component](#stateful-component)
    - [component lifecycle](#component-lifecycle)
      - [creation](#creation)
      - [updates](#updates)
      - [unmount](#unmount)
    - [HOC (Higher-Order Components)](#hoc-higher-order-components)
    - [Render Props (Children as Function)](#render-props-children-as-function)
    - [Hooks](#hooks)
      - [Default Hooks](#default-hooks)
      - [Basic Rules](#basic-rules)
      - [Custom Hooks](#custom-hooks)
  - [ES6 Syntax](#es6-syntax)
    - [this.setState()](#thissetstate)
  - [MVC模式](#mvc模式)
    - [Controller](#controller)
    - [Best Practice](#best-practice)
  - [React 16 (New Features)](#react-16-new-features)
    - [Context API](#context-api)
    - [Error Boundary](#error-boundary)
    - [`React.Fragment`/`Array Components`](#reactfragmentarray-components)
  - [React Performance](#react-performance)
    - [Code Spliting](#code-spliting)
  - [Server Side Rendering](#server-side-rendering)
    - [Pros of SSR](#pros-of-ssr)
      - [Performance](#performance)
      - [SEO](#seo)
    - [Basic Example](#basic-example)
    - [Internationalization](#internationalization)
      - [Simple Intl](#simple-intl)
  - [Components/Plugins](#componentsplugins)
    - [Polyfill](#polyfill)
    - [Documents](#documents)
    - [Data](#data)
    - [Data to View](#data-to-view)
    - [Chat](#chat)
    - [UI](#ui)
      - [Animation](#animation)
      - [Charts](#charts)
      - [Search Bar](#search-bar)
      - [Scroll Bar](#scroll-bar)
      - [Mouse](#mouse)
      - [Button](#button)
      - [Calendar](#calendar)
    - [Debug/Test](#debugtest)

<!-- /TOC -->

## Diff Algorithm (Reconciliation)

### Elements of Different Types

- rebuild element and children
- methods: componentWillUnmount/componentWillMount/componentDidMount

### DOM Elements of Same Type

- only update the changed attributes
- use `key` attribute to match children

`Best Practice`: give `key` to `<li>/<tr>/<tc>` elements
(stable, predictable, unique and not array indexed)

### Component Elements of Same Type

- update the props to match the new element
- methods: componentWillRecevieProps/componentWillUpdate
- then `render` called, diff algorithm recurses on the old result and the new result

## props and state

### getInitialState() and constructor(props, context)

### componentDidMount()

### componentWillReceiveProps()

当此方法被调用时, 不代表 props 一定被改变. 当使用此方法监听 props 变化时, 必须额外检查 props 是否确实被改变

### props validation

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

## element and component

react element 实际上是纯对象, 可由 React.createElement()/JSX/element factory helper 创建,
并被 react 在必要时渲染成真实的DOM结点

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

### functional/class component

- 函数型组件没有实例, 类型组件具有实例, 但实例化的工作由 react 自动完成
- class component 具有更多特性: state, lifecycle hook, performance optimizations(shouldComponentUpdate()回调方法)

### stateful/stateless component

#### stateless component

采用函数型声明, 不使用 setState(), 一般作为表现型组件

#### stateful component

- 采用类型声明, 使用 setState(), 一般作为容器型组件(containers)
- 结合 Redux 中的 connect 方法, 将 store 中的 state 作为此类组件的 props

### component lifecycle

#### creation

constructor(props, context) -> componentWillMount() -> render() -> componentDidMount()

#### updates

update for three reasons:

- parent/top (re-)render
- this.setState() called
- this.forceUpdate() called

componentWillReceiveProps(nextProps) -> shouldComponentUpdate(nextProps, nextState)
-> componentWillUpdate(nextProps, nextState)
-> render() -> componentDidUpdate(prevProps, prevState)

#### unmount

componentWillUnmount()

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
      super()
      this.toggle = this.toggle.bind(this)
      this.state = { show: false }
    }

    toggle() {
      this.setState(prevState => ({ show: !prevState.show }))
    }

    render() {
      return (
        <div>
          <Clickable
            {...this.props}
            onClick={this.toggle}
          />
          {this.state.show && this.props.children}
        </div>
      )
    }
  }
}

class NormalMenu extends React.Component {
  render() {
    return (
      <div onClick={this.props.onClick}>
        <h1>{this.props.title}</h1>
      </div>
    )
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
    )
  }
}
```

### Render Props (Children as Function)

solve:

- reuse code with using ES6 classes
- lowest level of indirection
- no naming collision

problem:

- minor memory issues when defining a closure for every render
- callback hell (when many cross-cutting concerns are applied to a component)

```jsx
class Toggleable extends React.Component {
  constructor() {
    super()
    this.toggle = this.toggle.bind(this)
    this.state = { show: false }
  }

  toggle() {
    this.setState(prevState => ({ show: !prevState.show }))
  }

  render() {
    return this.props.children(this.state.show, this.toggle)
  }
}

const ToggleableMenu = props =>
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
    )
  }
}
```

### Hooks

- reuse stateful logic between components
  (avoid wrapper hell in render props or HOC)
- split one complex component into smaller functions
- use more of React's features without classes

#### Default Hooks

```jsx
import { useState } from 'react';

function Example() {
  // Declare a new state variable, which we'll call "count"
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
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
ChatAPI.subscribeToFriendStatus(100, handleStatusChange);     // Run first effect

// Update with { friend: { id: 200 } } props
// Clean up previous effect
ChatAPI.unsubscribeFromFriendStatus(100, handleStatusChange);
ChatAPI.subscribeToFriendStatus(200, handleStatusChange);     // Run next effect

// Update with { friend: { id: 300 } } props
// Clean up previous effect
ChatAPI.unsubscribeFromFriendStatus(200, handleStatusChange);
ChatAPI.subscribeToFriendStatus(300, handleStatusChange);     // Run next effect

// Unmount
ChatAPI.unsubscribeFromFriendStatus(300, handleStatusChange); // Clean up last effect
```

#### Basic Rules

- only call Hooks at the top level (don't inside loops, conditions or nested functions)
- only call Hooks from React function components

#### Custom Hooks

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
    <li style={{ color: isOnline ? 'green' : 'black' }}>
      {props.friend.name}
    </li>
  );
}
```

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

```jsx
function Counter() {
  const [count, setCount] = useState(0);
  const prevCount = usePrevious(count);
  return <h1>Now: {count}, before: {prevCount}</h1>;
}

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}
```

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
  const [ state, set ] = useState(store.state);

  if (!store.setters.includes(set)) {
    store.setters.push(set);
  }

  return [ state, store.setState ];
}
```

## ES6 Syntax

### this.setState()

```js
constructor() {
    this.handle = this.handle.bind(this);
}

handle(e) {
    this.setState({

    });
}
```

## MVC模式

### Controller

- 处理请求的参数
- 渲染和重定向
- 选择Model和Service
- 处理Session和Cookies

### Best Practice

- 组件细分化
- 组件
  - 只传入必要的props
  - 使用immutablejs或者react.addons.update实现不可变数据结构
  - 结合React.addons.PureRenderMixin来减少reRender
- 在shouldComponentUpdate中优化组件减少reRender
- 使用context
- 少做dom操作，始终让UI能够基于State还原
- 在store和action中不dom操作或者访问window.属性，只与数据打交道
- 推荐使用ES6
- npm的debug包，log组件渲染的每个步骤和动作

## React 16 (New Features)

### Context API

### Error Boundary

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

### Code Spliting

```js
import React, { Component } from "react";
import { Formik } from "formik";
import * as Yup from "yup";

const formValidator = Yup.object().shape({ /* ... */ });

export default class Form extends Component {
  render() {
    return (
      <Formik validationSchema={formValidator}>
        {/* ... */}
      </Formik>
    );
  }
}
```

```js
import React, { Component } from "react";

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
    const { default: Form } = await import("./Form");
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

### Pros of SSR

#### Performance

- Smaller first meaningful paint time
- HTML's strengths: progressive rendering
- Browsers are incredibly good at rendering partial content

#### SEO

- Search engine crawlers used to not execute scripts (or initial scripts)
- Search engine usually stop after a while (roughly 10 seconds)
- SPAs can't set meaningful HTTP status codes

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
import ReactDOMServer from "react-dom";
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

## Components/Plugins

- [**Starter Kit Collection**](http://andrewhfarmer.com/starter-project)
- [React Storybook](https://github.com/storybooks/storybook)

### Polyfill

- [Native Element](https://github.com/sokra/rawact)

### Documents

- [Blog Generator](https://github.com/gatsbyjs/gatsby)
- [React Built In Editor](https://github.com/facebook/draft-js)
- [docz](https://github.com/pedronauck/docz)

### Data

- [Baobab](https://github.com/Yomguithereal/baobab)
- [React Resolver](https://github.com/ericclemmons/react-resolver)
- [RxJS Middleware](https://github.com/redux-observable/redux-observable)

### Data to View

- [reselect](https://github.com/reactjs/reselect)

### Chat

- [Matrix](https://github.com/matrix-org/matrix-react-sdk)

### UI

- [React Material UI](https://github.com/callemall/material-ui)

#### Animation

- [React Animation npm install react-set-animate --save](https://github.com/FunctionFoundry/react-set-animate)
- [React Particle Animation](https://github.com/transitive-bullshit/react-particle-animation)
- [React Particle Button](https://github.com/transitive-bullshit/react-particle-effect-button)

#### Charts

- [React Chartjs](https://github.com/jhudson8/react-chartjs)

#### Search Bar

- [SearchKit](https://github.com/searchkit/searchkit)

#### Scroll Bar

- [React Scroll Box](https://github.com/smikhalevski/react-scroll-box)

#### Mouse

- [React Draftjs](https://github.com/draft-js-plugins/draft-js-plugins)

#### Button

- [Tiny Fab](https://github.com/dericgw/react-tiny-fab/)

#### Calendar

- [Big Calendar](https://github.com/intljusticemission/react-big-calendar)
- [React Calendar](https://github.com/moodydev/react-calendar)

### Debug/Test

- [React Testing Utilities](https://github.com/airbnb/enzyme)
- [React Component hierachy](https://github.com/team-gryff/react-monocle)
- [React a11y](https://github.com/reactjs/react-a11y)
- Chrome Extensions -  React Dev Tools/Redux Dev Tools
