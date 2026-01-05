---
author: Sabertazimi
authorTitle: Web Developer
authorURL: https://github.com/sabertazimi
authorImageURL: https://github.com/sabertazimi.png
tags: [Web, JavaScript, ECMAScript, Functional]
---

# Functional JavaScript

- Predictable: pure and immutable.
- Safe: pure and immutable.
- Transparent: pure and immutable.
- Modular: composite with currying and monads.

:::tip[Functional JavaScript]

Functional programming is the art of composing higher-order functions
to advance the state of a program in a pure manner:

- Pure Functions and Immutability:
  Pure functions ensure that functions have no side effects
  and return the same output for the same inputs,
  which is complemented by immutability that prevents data from being changed unexpectedly.
  Together, they ensure a predictable and stable code base.
- Currying and Memoization:
  Currying allows functions to be broken down into simpler, single-argument functions
  that are easier to manage and memoize.
  Memoization can then be applied to these curried functions to cache their results,
  optimizing the application's performance by avoiding repeated calculations.
- Monads and Pure Functions:
  Monads help manage side effects in a controlled manner,
  which allows pure functions to remain pure
  even when dealing with operations like I/O or state transitions.
  This encapsulation of side effects preserves the integrity of the functional architecture.

:::

## Functional JavaScript Pros

- Type safe and state safe.
- Explicit flow of data.
- Concurrency safety.

## Functional JavaScript Cons

- Verbose.
- More object creation.
- More garbage collection.
- More memory usage.

With help of `immutable.js`/`immer.js`,
object creation/garbage collection/memory usage can be alleviated.

For example, in vanilla.js, `map2 === map1` become `false`,
but in immutable.js `map2 === map1` become `true`
(copy free due to immutable data).

```ts
const map1 = { b: 2 }
const map2 = map1.set('b', 2)
```

## Partial Application

```ts
function partialFromBind(fn, ...args) {
  return fn.bind(null, ...args)
}

function partial(fn, ...args) {
  return (...rest) => {
    return fn(...args, ...rest)
  }
}
```

## Currying

Chain of multiple single argument functions:

```ts
function curry(fn, ...stored_args) {
  return function (...new_args) {
    const args = stored_args.concat(new_args)
    return fn(...args)
  }
}

const add = x => y => x + y

const addOne = curry(add, 1)
// addOne(3) === 4;
const addFive = curry(addOne, 1, 3)
// addFive(4) === 9;
```

## Compose

```ts
function compose(...fns) {
  return x =>
    fns.reduceRight((promise, fn) => promise.then(fn), Promise.resolve(x))
}

const addTwo = x => x + 2
const addThree = x => x + 3
const addFive = x => x + 5
const addTen = compose(addTwo, addThree, addFive)

addTen(8).then(console.log) // 18
```

## Flow

```ts
function flow(...fns) {
  return x =>
    fns.reduce((promise, fn) => promise.then(fn), Promise.resolve(x))
}

const addTwo = x => x + 2
const addThree = x => x + 3
const addFive = x => x + 5
const addTen = flow(addTwo, addThree, addFive)

addTen(8).then(console.log) // 18
```

## Pipe

```ts
function pipe(x, ...fns) {
  return fns.reduce((promise, fn) => promise.then(fn), Promise.resolve(x))
}

const addTwo = x => x + 2
const addThree = x => x + 3
const addFive = x => x + 5
const addTen = pipe(8, addTwo, addThree, addFive)

addTen.then(console.log) // 18
```

## Immutable

Immutable data structure:

- Reused reference: one address represent one data.
- Quick comparison: different address represent different data.
- Fast recovery and snapshot: reuse previous data.

### Immutable Array

```ts
const RE_INDEX_PROP_KEY = /^\d+$/
const ALLOWED_PROPERTIES = new Set(['length', 'constructor', 'slice', 'concat'])

function createImmutableArray(arrayLike, mapFn) {
  const arr = Array.from(arrayLike, mapFn)

  const handler = {
    get(target, propKey, receiver) {
      if (RE_INDEX_PROP_KEY.test(propKey) || ALLOWED_PROPERTIES.has(propKey))
        return Reflect.get(target, propKey, receiver)

      throw new TypeError(`Property "${propKey}" can’t be accessed`)
    },
    set(target, propKey, value, receiver) {
      throw new TypeError('Setting is not allowed')
    },
    deleteProperty(target, propKey) {
      throw new TypeError('Deleting is not allowed')
    },
  }

  return new Proxy(arr, handler)
}

const array = createImmutableArray(['a', 'b', 'c'])

// Non-destructive operations are allowed:
assert.deepEqual(array.slice(1), ['b', 'c'])
assert.equal(array[1], 'b')

// Destructive operations are not allowed:
assert.throws(() => (array[1] = 'x'), /^TypeError: Setting is not allowed$/)
assert.throws(
  () => array.shift(),
  /^TypeError: Property "shift" can’t be accessed$/
)
```

### Immutable Map

```ts
class ImmutableMap {
  #map

  constructor(iterable) {
    this.#map = new Map(iterable)
  }

  static _setUpPrototype() {
    // Only forward non-destructive methods to the map:
    for (const methodName of ['get', 'has', 'keys', 'size']) {
      ImmutableMap.prototype[methodName] = function (...args) {
        return this.#map[methodName](...args)
      }
    }
  }
}

ImmutableMap._setUpPrototype()

const map = new ImmutableMap([
  [false, 'no'],
  [true, 'yes'],
])

// Non-destructive operations work as usual:
assert.equal(map.get(true), 'yes')
assert.equal(map.has(false), true)
assert.deepEqual([...map.keys()], [false, true])

// Destructive operations are not available:
assert.throws(
  () => map.set(false, 'never!'),
  /^TypeError: map.set is not a function$/
)
assert.throws(() => map.clear(), /^TypeError: map.clear is not a function$/)
```

### Immutable Class

Copying class instances without side effects:

```ts
class Point {
  constructor(x, y) {
    this.x = x
    this.y = y
  }

  clone() {
    return new Point(this.x, this.y)
  }

  static from(other) {
    return new Point(other.x, other.y)
  }
}

class Color {
  constructor(name) {
    this.name = name
  }

  clone() {
    return new Color(this.name)
  }

  static from(other) {
    return new Color(other.name)
  }
}

class ColorPoint extends Point {
  constructor(x, y, color) {
    super(x, y)
    this.color = color
  }

  clone() {
    return new ColorPoint(this.x, this.y, this.color.clone())
  }

  static from(other) {
    return new ColorPoint(other.x, other.y, Color.from(other.color))
  }
}
```

## Lodash

- chunk.
- shuffle.
- take.
- difference.
- intersection.
- isEmpty.
- orderBy.
- merge.
- cloneDeep.
- debounce.
- throttle.
- startCase.
- kebabCase.
- snakeCase.
- camelCase.

## RxJS

- Async iteration: pull streams and single consumers.
- Reactive programming: push streams and potentially multiple consumers.

![Data Stream](./figures/data-stream.png 'Data Stream')

### Stream

```ts
class PushArray extends Array {
  static EVENT_NAME = 'new_value'
  #eventEmitter = new EventEmitter()

  push(value) {
    this.#eventEmitter.emit(PushArray.EVENT_NAME, value)
    return super.push(value)
  }

  subscribe({ next }) {
    this.#eventEmitter.on(PushArray.EVENT_NAME, (value) => {
      next(value)
    })
  }

  unsubscribe() {
    this.#eventEmitter.removeAllListeners(PushArray.EVENT_NAME)
  }
}

// Source
const pushArray = new PushArray(1, 2, 3)

// Consumer
pushArray.subscribe({
  next(value) {
    console.log('New value:', value)
  },
})

// Producer
pushArray.push(4)
pushArray.push(5)
pushArray.unsubscribe()
pushArray.push(6)
```

### Observable

```ts
interface Observer<T> {
  next: (value: T) => void
  error?: (error: Error) => void
  complete?: () => void
}

interface Subscription {
  unsubscribe: () => void
}

class Observable<T> {
  constructor(subscriber: (observer: Observer<T>) => Subscription): Observable<T>
  observable: () => this
  readonly species: this

  of: (...items: Array<mixed>) => Observable<T>
  from: (x: Observable<T> | Iterable<T>) => Observable<T>

  map: <Z>(fn: (value: T) => Z) => Observable<Z>
  reduce: <Z>(
    acc: (accumulator: Z, value: T, index?: number, array?: Array<T>) => Z,
    startsWith?: T
  ) => Observable<T>

  filter: (predicate: (value: T) => boolean) => Observable<T>
  skip: (count: number) => Observable<T>

  subscribe: (observer: Function | Observer<T>) => Subscription
}
```

```ts
const map = curry(
  (fn, stream) =>
    new Observable((observer) => {
      const subs = stream.subscribe({
        next(value) {
          try {
            observer.next(fn(value))
          } catch (err) {
            observer.error(err)
          }
        },
        error(e) {
          observer.error(e)
        },
        complete() {
          observer.complete()
        },
      })

      return () => subs.unsubscribe()
    })
)

const reduce = curry((accumulator, initialValue, stream) => {
  let result = initialValue ?? {}

  return new Observable((observer) => {
    const subs = stream.subscribe({
      next(value) {
        result = accumulator(result, value)
      },
      error(e) {
        observer.error(e)
      },
      complete() {
        observer.next(result)
        observer.complete()
      },
    })

    return () => subs.unsubscribe()
  })
})

const filter = curry(
  (predicate, stream) =>
    new Observable((observer) => {
      const subs = stream.subscribe({
        next(value) {
          if (predicate(value))
            observer.next(value)
        },
        error(e) {
          observer.error(e)
        },
        complete() {
          observer.complete()
        },
      })

      return () => subs.unsubscribe()
    })
)

const skip = curry((count, stream) => {
  let skipped = 0

  return new Observable((observer) => {
    const subs = stream.subscribe({
      next(value) {
        if (skipped++ >= count)
          observer.next(value)
      },
      error(e) {
        observer.error(e)
      },
      complete() {
        observer.complete()
      },
    })

    return () => subs.unsubscribe()
  })
})

class Observable {
  map(fn) {
    return map(fn, this)
  }

  reduce(accumulator, initialValue = {}) {
    return reduce(accumulator, initialValue, this)
  }

  filter(predicate) {
    return filter(predicate, this)
  }

  skip(count) {
    return skip(count, this)
  }
}
```

```ts
Observable.of(1, 2, 3, 4)
  .skip(1)
  .filter(isEven)
  .map(square)
  .reduce(add, 0)
  .subscribe({
    next: console.log,
  })
```
