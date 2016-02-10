# JQuery

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

### style

```javascript
$("selector").css("color", "red");
$("selector").prop("disable", "true");
```
