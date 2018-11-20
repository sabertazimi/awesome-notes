# JQuery

<!-- TOC -->

- [JQuery](#jquery)
  - [Callbacks Queue](#callbacks-queue)
  - [Deferred Queue](#deferred-queue)
  - [Sizzle Selector Engine](#sizzle-selector-engine)
  - [DOM Module](#dom-module)
    - [structure](#structure)
    - [class](#class)
    - [style](#style)
  - [Events Module](#events-module)
    - [Mouse](#mouse)
    - [Keyboard](#keyboard)
    - [Form](#form)
    - [Document/Window](#documentwindow)
    - [常用多态函数](#常用多态函数)
    - [window](#window)
  - [Ajax Module](#ajax-module)
    - [$.getJSON](#getjson)
    - [$.ajax](#ajax)
  - [Animation Module](#animation-module)

<!-- /TOC -->

## Callbacks Queue

callback queue use `Observer` pattern to
add callbacks to callback queue,
fire callbacks when events happen.

```js
function Callbacks(options) {
  let list = [];
  const self;

  self = {
    add(fn) {
      if (options == 'unique') {
        if (-1 === list.indexOf(fn)) {
          list.push(fn)
        }
      } else {
        list.push(fn)
      }
    },
    fire(args) {
      list.forEach((fn) => {
        fn(args);
      });

      if (options === 'once') {
        list = undefined;
      }
    },
  };

  return self;
}
```

## Deferred Queue

Same to `Promise`

```js
class Promise {
  // `executor` takes 2 parameters, `resolve()` and `reject()`. The executor
  // function is responsible for calling `resolve()` or `reject()` to say that
  // the async operation succeeded (resolved) or failed (rejected).
  constructor(executor) {
    if (typeof executor !== 'function') {
      throw new Error('Executor must be a function');
    }

    // Internal state. `$state` is the state of the promise, and `$chained` is
    // an array of the functions we need to call once this promise is settled.
    this.$state = 'PENDING';
    this.$chained = [];

    // Implement `resolve()` and `reject()` for the executor function to use
    const resolve = res => {
      // A promise is considered "settled" when it is no longer
      // pending, that is, when either `resolve()` or `reject()`
      // was called once. Calling `resolve()` or `reject()` twice
      // or calling `reject()` after `resolve()` was already called
      // are no-ops.
      if (this.$state !== 'PENDING') {
        return;
      }

      // If `res` is a "thenable", lock in this promise to match the
      // resolved or rejected state of the thenable.
      const then = res != null ? res.then : null;
      if (typeof then === 'function') {
        // In this case, the promise is "resolved", but still in the 'PENDING'
        // state. This is what the ES6 spec means when it says "A resolved promise
        // may be pending, fulfilled or rejected" in
        // http://www.ecma-international.org/ecma-262/6.0/#sec-promise-objects
        return then(resolve, reject);
      }

      this.$state = 'FULFILLED';
      this.$internalValue = res;

      // If somebody called `.then()` while this promise was pending, need
      // to call their `onFulfilled()` function
      for (const { onFulfilled } of this.$chained) {
        onFulfilled(res);
      }

      return res;
    };

    const reject = err => {
      if (this.$state !== 'PENDING') {
        return;
      }

      this.$state = 'REJECTED';
      this.$internalValue = err;

      for (const { onRejected } of this.$chained) {
        onRejected(err);
      }
    };

    // Call the executor function with `resolve()` and `reject()` as in the spec.
    try {
      // If the executor function throws a sync exception, we consider that
      // a rejection. Keep in mind that, since `resolve()` or `reject()` can
      // only be called once, a function that synchronously calls `resolve()`
      // and then throws will lead to a fulfilled promise and a swallowed error
      executor(resolve, reject);
    } catch (err) {
      reject(err);
    }
  }

  // `onFulfilled` is called if the promise is fulfilled, and `onRejected`
  // if the promise is rejected. For now, you can think of 'fulfilled' and
  // 'resolved' as the same thing.
  then(onFulfilled, onRejected) {
    return new Promise((resolve, reject) => {
      // Ensure that errors in `onFulfilled()` and `onRejected()` reject the
      // returned promise, otherwise they'll crash the process. Also, ensure
      // that the promise
      const _onFulfilled = res => {
        try {
          // If `onFulfilled()` returns a promise, trust `resolve()` to handle
          // it correctly.
          // store new value to new Promise
          resolve(onFulfilled(res));
        } catch (err) {
          reject(err);
        }
      };

      const _onRejected = err => {
        try {
          // store new value to new Promise
          reject(onRejected(err));
        } catch (_err) {
          reject(_err);
        }
      };

      if (this.$state === 'FULFILLED') {
        _onFulfilled(this.$internalValue);
      } else if (this.$state === 'REJECTED') {
        _onRejected(this.$internalValue);
      } else {
        this.$chained.push({ onFulfilled: _onFulfilled, onRejected: _onRejected });
      }
    });
  }

  catch(onRejected) {
    return this.then(null, onRejected);
  }
}
```

## Sizzle Selector Engine

- runtime tokenizer and parser
- api from `querySelectorAll`

## DOM Module

### structure

```javascript
$("selector").html("tag+text");
$("selector").text("text");

$("selector").clone();
$("selector").remove();
$("selector").appendTo("selector");

$("selector").parent();
$("selector").children();
```

```js
$("selector").index();
```

### class

```javascript
$("selector").addClass("");
$("selector").removeClass("");
```

```javascript
hidden
```

### style

```javascript
$("selector").css("color", "red");
$("selector").prop("disable", "true");
```

## Events Module

### Mouse

- click
- dblclick
- mouseenter
- mouseleave

### Keyboard

- keypress
- keydown
- keyup

### Form

- submit
- change
- focus
- blur

### Document/Window

- load
- resize
- scroll
- unload

### 常用多态函数

```js
data、html、css
$(document).ready(function(){});
```

### window

```js
$(window).scroll(function(event) {});
$(document).height()           //返回整个网页的高度
$(window).height()               //返回窗口高度
$(window).scrollTop() //返回滚动条距网页顶部距离
```

## Ajax Module

### $.getJSON

```javascript
$.getJSON(url, data, success(data, status, xhr));

$.getJSON("test.js", function(json){
  alert("JSON Data: " + json.users[3].name);
});
```

### $.ajax

```javascript
$.ajax({
    url: 'http://localhost:3000',
    type: 'GET'/'POST'/'PUT'/'DELETE',
    data: dataSchema,
    dataType: 'json'
    success: successCallback,
    error: errorHandle,
});
```

## Animation Module
