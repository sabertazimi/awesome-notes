<!-- TOC depthFrom:1 depthTo:6 withLinks:1 updateOnSave:1 orderedList:0 -->

- [JQuery](#jquery)
	- [常用多态函数](#常用多态函数)
	- [window](#window)
	- [DOM](#dom)
		- [structure](#structure)
		- [class](#class)
		- [style](#style)

<!-- /TOC -->

# JQuery

## Events

### Mouse

-   click
-   dblclick
-   mouseenter
-   mouseleave

### Keyboard

-   keypress
-   keydown
-   keyup

### Form

-   submit
-   change
-   focus
-   blur

### Document/Window

-   load
-   resize
-   scroll
-   unload

## 常用多态函数

```js
data、html、css
$(document).ready(function(){});
```

## window

```js
$(window).scroll(function(event) {});
$(document).height()           //返回整个网页的高度
$(window).height()               //返回窗口高度
$(window).scrollTop()		//返回滚动条距网页顶部距离
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

## Ajax

```javascript
$.getJSON(url, data, success(data, status, xhr));

$.getJSON("test.js", function(json){
  alert("JSON Data: " + json.users[3].name);
});
```
