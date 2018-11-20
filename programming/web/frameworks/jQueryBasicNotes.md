
# JQuery

<!-- TOC -->

- [JQuery](#jquery)
  - [$.Callbacks](#callbacks)
  - [DOM](#dom)
    - [structure](#structure)
    - [class](#class)
    - [style](#style)
  - [Events](#events)
    - [Mouse](#mouse)
    - [Keyboard](#keyboard)
    - [Form](#form)
    - [Document/Window](#documentwindow)
    - [常用多态函数](#常用多态函数)
    - [window](#window)
  - [Ajax](#ajax)
    - [$.getJSON](#getjson)
    - [$.ajax](#ajax)
  - [Animation](#animation)

<!-- /TOC -->

## $.Callbacks

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

## DOM

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

## Events

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

## Ajax

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

## Animation
