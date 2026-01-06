---
sidebar_position: 18
tags: [Web, React, Testing]
---

# Testing

- [Jest and Enzyme snapshots testing](https://medium.com/codeclan/testing-react-with-jest-and-enzyme-20505fec4675).
- [Cypress: E2E testing framework](https://github.com/cypress-io/cypress).
- [GitHub CI for UI testing](https://storybook.js.org/blog/how-to-automate-ui-tests-with-github-actions).
- [React testing tutorial](https://www.robinwieruch.de/react-testing-tutorial).

## Shallow Renderer

浅层渲染 (Shallow Renderer) 对于在 React 中编写单元测试用例很有用.
它允许渲染一个一级深的组件并断言其渲染方法返回的内容, 而不必担心子组件未实例化或渲染.

```tsx
export default function MyComponent() {
  return (
    <div>
      <span className="heading">Title</span>
      <span className="description">Description</span>
    </div>
  )
}
```

```tsx
import ShallowRenderer from 'react-test-renderer/shallow'

const renderer = new ShallowRenderer()
renderer.render(<MyComponent />)

const result = renderer.getRenderOutput()

expect(result.type).toBe('div')
expect(result.props.children).toEqual([
  <span key="heading" className="heading">
    Title
  </span>,
  <span key="description" className="description">
    Description
  </span>,
])
```

## Test Renderer

测试渲染器 (Test Renderer) 可用于将组件渲染为纯 JavaScript 对象,
而不依赖于 DOM 或原生移动环境.
该包可以轻松获取由 ReactDOM 或 React Native 平台所渲染的视图层次结构 (类似于 DOM 树) 的快照,
而无需使用浏览器或 jsdom.

```tsx
import TestRenderer from 'react-test-renderer'

export default function Link({
  page,
  children,
}: {
  page: string
  children: ReactElement
}) {
  return <a href={page}>{children}</a>
}

const testRenderer = TestRenderer.create(
  <Link page="https://www.facebook.com/">Facebook</Link>,
)

console.log(testRenderer.toJSON())
// {
//   type: 'a',
//   props: { href: 'https://www.facebook.com/' },
//   children: [ 'Facebook' ]
// }
```

## Enzyme Mindset

`React Internals`:

- Enzyme tests ultimately prevent from modifying component without changing the test.
- Enzyme tests slowed down development speed and productivity,
  since every small change requires rewriting some part of tests.
- Enzyme provide access the DOM of the component.
  So using enzyme,
  we are not bound to test the internals
  but we can test the DOM too.

```bash
npm i -D enzyme enzyme-adapter-react-16 @types/enzyme
```

```tsx
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { DataTable } from './components'

configure({ adapter: new Adapter() })

describe(() => {
  it('renders in table rows based on provided columns', () => {
    const cols = [
      { header: 'ID', name: 'id' },
      { header: 'Name', name: 'name' },
      { header: 'Email', name: 'email' },
    ]
    const data = [
      { id: 5, name: 'John', email: 'john@example.com' },
      { id: 6, name: 'Liam', email: 'liam@example.com' },
      { id: 7, name: 'Maya', email: 'maya@example.com', someTest: 10 },
      {
        id: 8,
        name: 'Oliver',
        email: 'oliver@example.com',
        hello: 'hello world',
      },
      { id: 25, name: 'Amelia', email: 'amelia@example.com' },
    ]

    // Shallow render Data Table
    const container = shallow(<DataTable data={data} cols={cols} />)

    // There should be ONLY 1 table element
    const table = container.find('table')
    expect(table).toHaveLength(1)

    // The table should have ONLY 1 thead element
    const thead = table.find('thead')
    expect(thead).toHaveLength(1)

    // The number of th tags should be equal to number of columns
    const headers = thead.find('th')
    expect(headers).toHaveLength(cols.length)
    // Each th tag text should equal to column header
    headers.forEach((th, idx) => {
      expect(th.text()).toEqual(cols[idx].header)
    })

    // The table should have ONLY 1 tbody tag
    const tbody = table.find('tbody')
    expect(tbody).toHaveLength(1)

    // tbody tag should have the same number of tr tags as data rows
    const rows = tbody.find('tr')
    expect(rows).toHaveLength(data.length)
    // Loop through each row and check the content
    rows.forEach((tr, rowIndex) => {
      const cells = tr.find('td')
      expect(cells).toHaveLength(cols.length)
      expect(cells.at(0).text()).toEqual(data[rowIndex].id)
      expect(cells.at(1).text()).toEqual(data[rowIndex].name)
      expect(cells.at(2).text()).toEqual(data[rowIndex].email)
    })
  })
})
```

## React Testing Library Mindset

`User behavior` and `A11Y`:

- Rather than tests focusing on the **implementation** (props and state) (Enzyme),
  tests are more focused on **user behavior** (react-testing-library).
- React testing library enforce to
  use `placeholder`, `aria`, `test-ids` to access elements,
  benefiting for a11y components
  (write tests > build accessible components > tests pass).

But sometimes may need to test the internals of the component
when just testing the DOM from user’s perspective may not make sense.

So depending on the use cases,
we can choose between these two libraries
or just install them all for individual use cases.

> Enzyme for Internal API, React testing library for user behavior.

## React Testing Library Installation

<!-- markdownlint-disable line-length -->

```bash
npm i -D @testing-library/react @testing-library/dom @testing-library/jest-dom @testing-library/user-event
```

<!-- markdownlint-enable line-length -->

## React Testing Library Basis

```tsx
/**
 * render: render the component
 * screen: finding elements along with user
 */
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Checkbox, Welcome } from './'

describe('Welcome should', () => {
  test('has correct welcome message', () => {
    render(<Welcome firstName="John" lastName="Doe" />)
    expect(screen.getByRole('heading')).toHaveTextContent('Welcome, John Doe')
  })

  test('has correct input value', () => {
    render(<Welcome firstName="John" lastName="Doe" />)
    expect(screen.getByRole('form')).toHaveFormValues({
      firstName: 'John',
      lastName: 'Doe',
    })
  })

  test('handles click correctly', () => {
    render(<Checkbox />)
    userEvent.click(screen.getByText('Check'))
    expect(screen.getByLabelText('Check')).toBeChecked()
  })
})
```

```tsx
import { fireEvent, render, wait } from '@testing-library/react'
import { api } from './api'
import { App } from './App'

// Normally you can mock entire module using jest.mock('./api);
const mockCreateItem = (api.createItem = jest.fn())

test('allows users to add items to their list', async () => {
  const todoText = 'Learn spanish'
  mockCreateItem.mockResolvedValueOnce({ id: 123, text: todoText })

  const { getByText, getByLabelText } = render(<App />)

  const input = getByLabelText('What needs to be done?')
  const button = getByText('Add #1')

  fireEvent.change(input, { target: { value: todoText } })
  fireEvent.click(button)

  await wait(() => getByText(todoText))

  expect(mockCreateItem).toBeCalledTimes(1)
  expect(mockCreateItem).toBeCalledWith(
    '/items',
    expect.objectContaining({ text: todoText }),
  )
})
```

## React Testing Library Events

### FireEvent API

- `fireEvent` trigger DOM event: `fireEvent(node, event)`.
- `fireEvent.*` helpers for default event types:
  - click fireEvent.click(node).
  - See [all supported events](https://github.com/testing-library/dom-testing-library/blob/main/src/event-map.js).

### UserEvent API

[User Event](https://testing-library.com/docs/ecosystem-user-event)
provides more advanced simulation of browser interactions
than the built-in `fireEvent method`.

```bash
npm i -D @testing-library/user-event @testing-library/dom
```

```tsx
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

test('click', () => {
  render(
    <div>
      <label htmlFor="checkbox">Check</label>
      <input id="checkbox" type="checkbox" />
    </div>,
  )

  userEvent.click(screen.getByText('Check'))
  expect(screen.getByLabelText('Check')).toBeChecked()
})
```

## React Hooks Testing Library

### Basic Hook Testing

```ts
import { useCallback, useState } from 'react'

export default function useCounter(initialValue = 0) {
  const [count, setCount] = useState(initialValue)
  const increment = useCallback(() => setCount(x => x + 1), [])
  const reset = useCallback(() => setCount(initialValue), [initialValue])
  return { count, increment, reset }
}
```

```ts
import { act, renderHook } from '@testing-library/react-hooks'
import useCounter from './useCounter'

test('should reset counter to updated initial value', () => {
  const { result, rerender } = renderHook(
    ({ initialValue }) => useCounter(initialValue),
    {
      initialProps: { initialValue: 0 },
    },
  )

  rerender({ initialValue: 10 })

  act(() => {
    result.current.reset()
  })

  expect(result.current.count).toBe(10)
})
```

### Async Hook Testing

```ts
import { use, useCallback, useState } from 'react'

export default function useCounter(initialValue = 0) {
  const [count, setCount] = useState(initialValue)
  const step = use(CounterStepContext)
  const increment = useCallback(() => setCount(x => x + step), [step])
  const incrementAsync = useCallback(
    () => setTimeout(increment, 100),
    [increment],
  )
  const reset = useCallback(() => setCount(initialValue), [initialValue])
  return { count, increment, incrementAsync, reset }
}
```

```ts
import { renderHook } from '@testing-library/react-hooks'
import useCounter from './useCounter'

test('should increment counter after delay', async () => {
  const { result, waitForNextUpdate } = renderHook(() => useCounter())
  result.current.incrementAsync()
  await waitForNextUpdate()
  expect(result.current.count).toBe(1)
})
```

### Error Hook Testing

```ts
import { use, useCallback, useState } from 'react'

export default function useCounter(initialValue = 0) {
  const [count, setCount] = useState(initialValue)
  const step = use(CounterStepContext)
  const increment = useCallback(() => setCount(x => x + step), [step])
  const incrementAsync = useCallback(
    () => setTimeout(increment, 100),
    [increment],
  )
  const reset = useCallback(() => setCount(initialValue), [initialValue])

  if (count > 9000)
    throw new Error('It\'s over 9000!')

  return { count, increment, incrementAsync, reset }
}
```

```ts
import { act, renderHook } from '@testing-library/react-hooks'
import { useCounter } from './useCounter'

it('should throw when over 9000', () => {
  const { result } = renderHook(() => useCounter(9000))

  act(() => {
    result.current.increment()
  })

  expect(result.error).toEqual(new Error('It\'s over 9000!'))
})
```

## React Testing Library API

- `getByXXX` queries: common use case.
- `queryByXXX` queries: not throw error when nothing match.
- `findByXXX` queries: `getBy` queries + `waitFor`.

| API        | No Match | 1 Match | 1+ Match | Await |
| ---------- | -------- | ------- | -------- | ----- |
| getBy      | throw    | return  | throw    | No    |
| queryBy    | null     | return  | throw    | No    |
| findBy     | throw    | return  | throw    | Yes   |
| getAllBy   | throw    | array   | array    | No    |
| queryAllBy | []       | array   | array    | No    |
| findAllBy  | throw    | array   | array    | Yes   |

```tsx
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import TransactionCreateStepTwo from './TransactionCreateStepTwo'

test('if amount and note is entered, pay button becomes enabled', async () => {
  render(
    <TransactionCreateStepTwo sender={{ id: '5' }} receiver={{ id: '5' }} />,
  )

  expect(await screen.findByRole('button', { name: /pay/i })).toBeDisabled()

  userEvent.type(screen.getByPlaceholderText(/amount/i), '50')
  userEvent.type(screen.getByPlaceholderText(/add a note/i), 'dinner')
  expect(await screen.findByRole('button', { name: /pay/i })).toBeEnabled()
})
```

## React Testing Library Reference

- [Custom Jest DOM Matchers](https://github.com/testing-library/jest-dom)
- [React testing library cheat sheet](https://testing-library.com/docs/react-testing-library/cheatsheet)
