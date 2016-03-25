# JavaScript Advanced Notes

## Event Mechanism

### Event-Delegate

-   事件委托利用的是事件冒泡机制，只制定一事件处理程序，就可以管理某一类型的所有事件
-   使用事件委托，只需在DOM书中尽量最高的层次上添加一个事件处理程序

```js
window.onload = function(){
    var oUl = document.getElementById("ul"),
        aLi = oUl.getElementsByTagName("li");

    oUl.onmouseover = function (e) {
        var e = e || window.event,
            target = e.target || e.srcElement;

        //alert(target.innerHTML);

        if (target.nodeName.toLowerCase() == "li") {
            target.style.background = "red";
        }
    }

    oUl.onmouseout = function(e) {
        var e = e || window.event,
            target = e.target || e.srcElement;

        //alert(target.innerHTML);

        if (target.nodeName.toLowerCase() == "li") {
            target.style.background = "";
        }
    }
}
```
