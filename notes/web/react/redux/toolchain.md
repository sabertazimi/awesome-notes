---
sidebar_position: 5
tags: [Web, React, Redux, State Management]
---

# Toolchain

## React Redux Binding Library

- `useSelector`.
- `useDispatch`:
  dispatch function reference will be stable
  as long as same store instance is being passed to the `<Provider>`.

### Typed React Redux Hooks

```ts
import type { TypedUseSelectorHook } from 'react-redux'
import type store from './store'
import { useDispatch, useSelector } from 'react-redux'

type AppDispatch = typeof store.dispatch
type RootState = ReturnType<typeof store.getState>

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
```

### Custom React Redux Hooks

```ts
import { shallowEqual, useSelector } from 'react-redux'

export default function useShallowEqualSelector(selector) {
  return useSelector(selector, shallowEqual)
}
```

```ts
import { useMemo } from 'react'
import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'

export default function useActions(actions) {
  const dispatch = useDispatch()

  return useMemo(() => {
    if (Array.isArray(actions))
      return actions.map(a => bindActionCreators(a, dispatch))

    return bindActionCreators(actions, dispatch)
  }, [actions, dispatch])
}
```

### React Redux API

[`batch`](https://react-redux.js.org/api/batch):

```ts
import { batch } from 'react-redux'

function myThunk() {
  return (dispatch, getState) => {
    // Only result in one combined re-render, not two.
    batch(() => {
      dispatch(increment())
      dispatch(increment())
    })
  }
}
```

## Redux Server Side Rendering

- Client side:
  a new Redux store will be created with state provided from server.
- Server side:
  provide the initial state of app.

`client.jsx`:

```tsx
import { hydrateRoot } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import App from './containers/App'
import counterApp from './reducers'

const preloadedState = window.__PRELOADED_STATE__

delete window.__PRELOADED_STATE__

const store = createStore(counterApp, preloadedState)

hydrateRoot(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
```

`server.js`:

```tsx
import path from 'node:path'
import Express from 'express'
import qs from 'qs'
import { renderToString } from 'react-dom/server'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import App from './containers/App'
import counterApp from './reducers'

const app = Express()
const port = 3000

app.use('/static', Express.static('static'))

app.use(handleRender)

function handleRender(req, res) {
  // `parseInt` to prevent XSS attack
  const params = qs.parse(req.query)
  const counter = Number.parseInt(params.counter, 10) || 0

  const preloadedState = { counter }
  const store = createStore(counterApp, preloadedState)

  const html = renderToString(
    <Provider store={store}>
      <App />
    </Provider>
  )

  const finalState = store.getState()
  res.send(renderFullPage(html, finalState))
}

function renderFullPage(html, preloadedState) {
  // https://redux.js.org/usage/server-rendering#security-considerations
  // `replace(/</g, '\\u003c')` to prevent XSS attack
  return `
    <!doctype html>
    <html>
      <head>
        <title>Redux Universal Example</title>
      </head>
      <body>
        <div id="root">${html}</div>
        <script>
          // WARNING: security issues around embedding JSON in HTML:
          // https://redux.js.org/usage/server-rendering#security-considerations
          window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(
            /</g,
            '\\u003c'
          )}
        </script>
        <script src="/static/bundle.js"></script>
      </body>
    </html>
    `
}

app.listen(port)
```

## Redux Tools

### Immutable Data Tools

- ImmerJS.
- Immutable.js: decrease useless copy and memory occupation.

### Middleware Tools

- [Redux Thunk](https://github.com/reduxjs/redux-thunk)
- [Redux Sage](https://github.com/yelouafi/redux-saga)
- [Redux Promise](https://github.com/acdlite/redux-promise)
- [Redux Diff Logger](https://github.com/fcomb/redux-diff-logger)
- [Redux Dynamic Modules](https://github.com/microsoft/redux-dynamic-modules):
  Modularize Redux by dynamically loading reducers and middlewares
  (contribute to **code splitting**).

### State Tools

- Reselect: memorize state transformation.
- Redux undo.

### Debugging Tools

- [Redux Devtools](https://github.com/gaearon/redux-devtools)
