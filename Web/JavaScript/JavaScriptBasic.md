[TOC]

# JavaScript Grammar Basic

## 变量

### 变量声明提升(Hoisting)
- var 表达式和 function 声明都将会被提升到当前作用域(全局作用域/函数作用域)的顶部, 其余表达式顺序不变

### 数组
- 关联数组：`arrayName[“string”]  = value;`
    实际为Array对象添加属性`{string:value}`
- `[]`数组，`{}`对象
- 缓存数组长度:`int l = list.length`(访问`length`造成运算)

### 类型转化
- 字符串->整数：`+string`/`Number(string)`/`parseInt(string, arg1)`
- any->`bool`：`!!any`

------

## 运算符
- ==与===  !=与!==

------

## 函数

### 函数定义时  
- 全局变量

定义在函数体外，在函数体内不使用var关键字引用
- 局部变量

函数体内使用var关键字定义
- 不使用 var 声明变量将会导致隐式的全局变量
- 声明局部变量时绝对不要遗漏 var 关键字

### 匿名函数
- 匿名函数自动执行(定义即执行)：匿名包装器
    - 使得匿名函数内部的代码能够立即执行
    - 创建命名空间，防止变量命名冲突
    - `function(argumentNmae) {}(argumentValue)`  Value用于给匿名函数传递参数
    - 非匿名函数不自动执行(需显式传参调用执行)

### call/apply
- Function.call(obj, arg1, arg2,...)
- Function.apply(obj, [arg1, arg2, ...]/arguments)

### this/that
- `var that=this; //用于获取外部对象`

e.g `foo(){ //this会指向全局对象(window对象)}`

### 闭包(closure)
- 两个函数都维持着对外部作用域 Counter 的引用，因此总可以访问Counter作用域内定义的变量count(外部局部变量)
    - 函数外部不可对函数内部进行赋值或引用
    - 但函数中的闭包函数可对函数进行赋值或引用(函数对于闭包来说是外部，即内部引用外部)

### hasOwnProperty
- 使用其它对象的`hasOwnProperty`，并将其上下文设置为`foo`

`({}).hasOwnProperty.call(foo, 'bar'); // true`
- 推荐总是使用`hasOwnProperty`进行`for in`循环

### eval
- 不要使用`eval()`函数
- 不要使用字符串作`setTimeOut`/`setInterval`的第一个参数(会调用`eval`函数)

------

# JavaScript DOM Basic

## document
```javascript
document.write()
document.getElementsByTagName()
document.URI
document.title
```

## window
```javascript
window.location(string)
window.innerWidth(number)
window.closed(boolean)
```

## normal dom element
```javascript
element.innerHTML
element.alt
element.style.*
element.classname
```

## Events
- Mouse Events

```javascript
onclick
ondbclick
onmouse-down/move/enter/out/leave/over
```

- Key Events

`onkeypress/up/down`

```javascript
document.onkeydown=function(event){
    var e = event || window.event || arguments.callee.caller.arguments[0];
      if(e && e.keyCode==13){ // enter 键
        //coding
       }
    };
```
- Frame Events

```javascript
onresize/load/scroll/error 
```
- Input Events	

```javascript
oninput/onchange
```
------

# Emmet
## 嵌套操作
- 孩子 : >

``` html
div>ul>li

<div>
    <ul>
        <li></li>
    </ul>
</div>
```
- 兄弟 : +
```html
div+ul>li

<div></div>
<ul>
    <li></li>
</ul>
```
上级：^
ul>li^div
<ul>
    <li></li>
</ul>
<div></div>
ul>li>a^^div 上级多层
<ul>
    <li><a href=""></a></li>
</ul>
<div></div>
重复：*
ul>li*3
<ul>
    <li></li>
    <li></li>
    <li></li>
</ul>
分组：()
div>(p>span)*2
<div>
    <p><span></span></p>
    <p><span></span></p>
</div>
2. 属性操作----------
id和类
div#header+div.main+div#footer
<div id="header"></div>
<div class="main"></div>
<div id="footer"></div>
属性值
a[title=test target=_self]
<a title="test" target="_self" href=""></a>
数列值：$
p.item$*3
<p class="item1"></p>
<p class="item2"></p>
<p class="item3"></p>
p.item$$*3
<p class="item01"></p>
<p class="item02"></p>
<p class="item03"></p>
数列操作符：@
p.item$@-*3   @- = -1
<p class="item3"></p>
<p class="item2"></p>
<p class="item1"></p>
p.item$@3*3  @3 = 从3开始3次
<p class="item3"></p>
<p class="item4"></p>
<p class="item5"></p>
p.item$@-3*3 @-3 = 3次后到3结束
<p class="item5"></p>
<p class="item4"></p>
<p class="item3"></p>
3. 字符操作----------        
字符操作：{}
a{click}
<a href="">click</a>
a>{click}+span{me}
<a href="">click<span>me</span></a>
4. 缺省元素----------
.header+.footer  ---------------  div.header+div.footer
ul>.item*3 -------------- ul>li.item*3
table>.row*4>.cell*3 -------------- table>tr.row*4>td.cell*3



Bootstrap
表单form:
<form novalidate> <label for=”input_id”>textfield</label> <input /> </form>
<input      <!-- type,format,value →
id=”” name=””
type=”text/email/password/radiobutton/checkbox(checked)/submit/number/range/color/date/url”
value=”(textfield/buttontext)”
placeholder=”(默认占位文字)”
<!-- validate input data–>
required
pattern=”[0-9a-zA-z]{5/13-16}”      <!-- []:可用字符 {}:字符数目—>
min=”(number)”
max=”(number)”
step=”(步长:指定输入数字必须倍数关系)”
<!-- validate input data-->
/>
1.modal API:高级响应式界面  data-dismiss =”modal”
		修饰.modal-dialog、.modal-content
$().modal(‘’);
2.button
class:btn btn-success btn-warning btn-info
<button data-toggle=”” data-target-”” data-dismiss=””></button>
3.thumbnail
<container>
<row>
<col-xs/md-num>
<thumbnail>
…...
<caption>
</caption>
</thumbnail>
</col-xs/md-num>
<row>
<container>
4.navbar —— navbar navbar-default navbar-fixed-top nav-tabs nav-pills
<nav class="navbar navbar-default">
	<div class="container-fluid">
      		<div class="navbar-header">
		</div>
	</div>
</nav>

 <ul class="nav navbar-nav">
          <li class="active"><a href=""></a></li>
          <li><a href=""></a></li>
          <li><a href=""></a></li>
</ul>

5.form
<form>
  <div class="form-group">
    <label for="exampleInputEmail1">Email address</label>
    <input type="email" class="form-control" id="exampleInputEmail1" placeholder="Email">
  </div>
  <div class="form-group">
    <label for="exampleInputPassword1">Password</label>
    <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password">
  </div>
  <div class="form-group">
    <label for="exampleInputFile">File input</label>
    <input type="file" id="exampleInputFile">
    <p class="help-block">Example block-level help text here.</p>
  </div>
  <div class="checkbox">
    <label>
      <input type="checkbox"> Check me out
    </label>
  </div>
  <button type="submit" class="btn btn-default">Submit</button>
</form>

<div class="row">
  <div class="col-lg-6">
    <div class="input-group">
      <div class="input-group-btn">
        <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Action <span class="caret"></span></button>
        <ul class="dropdown-menu">
          <li><a href="#">Action</a></li>
          <li><a href="#">Another action</a></li>
          <li><a href="#">Something else here</a></li>
          <li role="separator" class="divider"></li>
          <li><a href="#">Separated link</a></li>
        </ul>
      </div><!-- /btn-group -->
      <input type="text" class="form-control" aria-label="...">
    </div><!-- /input-group -->
  </div><!-- /.col-lg-6 -->
</div>

hover transtion(property,times,modes e.g color .5s ease-in)

<UI API>
<container/content>
<header>
</header>
<body>
</body>
<footer>
</footer>
</container/content>
</UI API>

JQuery
一、常用多态函数
data、html、css
$(document).ready(function(){});

二、window
$(window).scroll(function(event) {});
$(document).height()           //返回整个网页的高度
$(window).height()               //返回窗口高度
$(window).scrollTop()		//返回滚动条距网页顶部距离


模板引擎：handlebars.js
将JSON通过模板转化为Html内容(分离结构与内容，达成结构固定内容变化)
Data——(Structure)——Content
Handlebars.compile($(“#template_id”).html());  //一次编译，多次使用该模板
{{#each array_name}}  {{subvariable}} {{ … }} < … > {{/each}}
{{#if @first}} … {{/if}}
{{@index}} 数组下标

Meteor.js
特殊文件夹:public(存放assets)、client、server、lib
1.create and run:
meteor create app_folder_name
cd app_folder_name
meteor
2.list package:
meteor search .或package_name
3.add package:
meteor add package_name
4.android
meteor add-platform android
meteor install-sdk android  // ~/.meteor/android-bundle 
meteor run android 或 meteor run android-device
 --mobile-server https://hostname:port  指定(http可不写schema)
5.static assets: app_folder_name → public (default assets folder 不可改名)
6.发布
meteor deploy domain/ip address
meteor deploy –delete domain/ip address
7.常用Package
a.barbatus:stars-rating  1.0.7  Stars rating control
	{{>starsRating mutable=true class="js-rate-image" id=_id}
	 var rating = $(event.currentTarget).data("userrating");
b.accounts-password      1.1.4  Password support for accounts
   accounts-ui            1.1.6  Simple templates to add login widgets to an app
	 {{> loginButtons}}

c.stylus-multi
    将.css改为.styl	
   @import ‘nib’
d.iron:router
Router.configure( {
	layoutTemplate: 'ParentTemplateName'    e.g'ApplicationLayout'
});

html:
<template name=”ApplicationLayout”>
	{{> yield “navbar”}}	//规定html区域
	{{> yield “main”}}	//规定html区域
</template>

https://atmospherejs.com/iron/router
Router.route('/', function () {
  this.render('MyTemplate');
});

Router.route('/items', function () {
  this.render('Items');
});

Router.route('/items', function () {
  this.render('TemplateName'{
	to:”yieldFunctionArgument”    //规定html区域
	}

Router.route('/items/_id', function () {
  this.render('TemplateName'{
	to:”yieldFunctionArgument”,    //规定html区域
	data:function() {    //传递Template中的特定数据
		return Collection.FindOne({_id: this.params._id});
	}
	});
});

Router.route('/items/:_id', function () {
  var item = Items.findOne({_id: this.params._id});
  this.render('ShowItem', {data: item});
});

Router.route('/files/:filename', function () {
  this.response.end('hi from the server\n');
}, {where: 'server'});

Router.route('/restful', {where: 'server'})
  .get(function () {
    this.response.end('get request\n');
  })
  .post(function () {
    this.response.end('post request\n');
  });


e.twbs:bootstrap         3.3.6  The most popular front-end framework for developing responsive, mobile first projects on the web.
f.ecmascript             0.1.6  Compiler plugin that supports ES2015+ in all .js files
g.jquery                 1.11.4  Manipulate the DOM using CSS selectors
h.mongo                  1.1.3  Adaptor for using MongoDB and Minimongo over DDP

一、传递数据
//data_variable为对象
Template.html_templatetag_name.helpers(data_variable);
//data_variable为对象数组
Template.html_templateTag_name.helpers(
	{
		property_name:data_variable, e.g Collection.find()、数组名、函数
		prepertyn:data_variablen
	}	
);    //传递一个匿名对象参数，它拥有一个对象数组字段/实例域

Template.body.helpers

html invoke:
{{#each property_name}}  <img src=”{{img_src}}” alt=”{{img_alt}}”>  {{/each}}
{{#if property_name}} {{/if}}

{{property function_argument}}



二、设置事件
//传递一个匿名对象参数，拥有一个函数字段/实例域
Template.templateTag_name.events({
	'click .inner_class_name/#inner_id_name' : function (event) {
		//TODO with coding
		//$(event.target) 选择产生事件的对象
		//$(event.currentTarget)
	}
	‘submit ./#' : function(event) {
		event.target.inputTag_name.value;
	}
});

三、Meteor.user()
Meteor.users.find()
Meteor.users.findOne(filter)
Meteor.user().email[num].address
Meteor.user().username
Meteor.user()._id
{{#if currentUser}}   {{/if}}

if(Meteor.user()) 判断当前是否有用户登录
Accounts.ui.config 
四、Session
1.将对象的某一个属性设为过滤器
Session.set(“userFilter”, Object.property_nmae);   
2.通过get得到过滤器属性值(已设置过滤器为有效值，未设置过滤器为NULL)
{ property_name: Session.get(“userFilter”) }    
3.移除过滤器
Session.set(“userFilter”, undefined);


五、MongoDB
1.Meteor.startup( function() {});
当客户端启动应用时，运行isClient与isServer代码
作用：a.若数据库无数据，则预存一定量数据
2.new Mongo.Collection(“name_string”);
创建Mongo集合——
find( {selector },                         //选择器 propername:filter_value
	{sort : { fieldname : -1 } }  , //从小至大排列的filter
	limit:number
)   
	
count、insert(对象{})、remove(Mongo Filter)
update({键值对}、{$set	{键值对}})
	可通过update读入用户操作，更新数据库，可再次反馈给用户
allow（安全性）

六、安全性
1.package的安全性
meteor remove insecure
2.MongoDB/Collection的安全性

doc：一个完整的image_data(即Collection中一个完整的对象)	


