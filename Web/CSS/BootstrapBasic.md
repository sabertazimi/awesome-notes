<!-- TOC depthFrom:1 depthTo:6 withLinks:1 updateOnSave:1 orderedList:0 -->

- [Bootstrap Notes](#bootstrap-notes)
	- [Grid System](#grid-system)
		- [Basic](#basic)
		- [row](#row)
	- [Nav](#nav)
		- [NavBar](#navbar)
			- [Class](#class)
			- [Structure](#structure)
		- [BreadCrumb](#breadcrumb)
	- [Text](#text)
	- [Form](#form)
		- [Form Basic](#form-basic)
		- [CheckBox and Select](#checkbox-and-select)
		- [Alerts and Prompts](#alerts-and-prompts)
	- [Table](#table)
		- [Table Basic Class](#table-basic-class)
	- [Card](#card)
		- [Panel](#panel)
		- [Well](#well)
	- [Images](#images)
		- [Img Class](#img-class)
		- [Thumbnail](#thumbnail)
		- [Media](#media)
		- [Embed](#embed)
	- [Alerts and Prompts](#alerts-and-prompts)
	- [Modal](#modal)
	- [Button](#button)
	- [Jumbotron](#jumbotron)
	- [Icon-Fonts](#icon-fonts)
	- [Style](#style)
		- [嵌入效果](#嵌入效果)

<!-- /TOC -->

# Bootstrap Notes

```html
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
```

## Grid System

### Basic

-   设置宽度:   col-xs/sm/md/lg-num
-   设置偏移量: col-xs/sm/md/lg-pull/push/offset-num

### row

-   row
-   row-header/row-content/row-footer

## Nav

### NavBar

#### Class

-   navbar navbar-default
-   navbar-inverse(color) navbar-fixed-top
-   navbar-form
-   nav-tabs nav-pills
-   navbar-left/right

#### Structure

navbar > container > nav/navbar-header/navbar-nav/navbar-form > li/a

```html
<nav class="navbar navbar-default">
	<div class="container-fluid">
		<!-- Brand and toggle get grouped for better mobile display -->
		<div class="navbar-header">
			<button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
				<span class="sr-only">Toggle navigation</span>
				<span class="icon-bar"></span>
				<span class="icon-bar"></span>
				<span class="icon-bar"></span>
			</button>
			<a class="navbar-brand" href="#">Brand</a>
		</div>

		<!-- Collect the nav links, forms, and other content for toggling -->
		<div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
			<ul class="nav navbar-nav">
				<li class="active"><a href="#">Link <span class="sr-only">(current)</span></a></li>
				<li><a href="#">Link</a></li>
				<li class="dropdown">
					<a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Dropdown <span class="caret"></span></a>
					<ul class="dropdown-menu">
						<li><a href="#">Action</a></li>
						<li><a href="#">Another action</a></li>
						<li><a href="#">Something else here</a></li>
						<li role="separator" class="divider"></li>
						<li><a href="#">Separated link</a></li>
						<li role="separator" class="divider"></li>
						<li><a href="#">One more separated link</a></li>
					</ul>
				</li>
			</ul>
			<form class="navbar-form navbar-left" role="search">
				<div class="form-group">
					<input type="text" class="form-control" placeholder="Search">
				</div>
				<button type="submit" class="btn btn-default">Submit</button>
			</form>
			<ul class="nav navbar-nav navbar-right">
				<li><a href="#">Link</a></li>
				<li class="dropdown">
					<a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Dropdown <span class="caret"></span></a>
					<ul class="dropdown-menu">
						<li><a href="#">Action</a></li>
						<li><a href="#">Another action</a></li>
						<li><a href="#">Something else here</a></li>
						<li role="separator" class="divider"></li>
						<li><a href="#">Separated link</a></li>
					</ul>
				</li>
			</ul>
		</div><!-- /.navbar-collapse -->
	</div><!-- /.container-fluid -->
</nav>
```

```css
body{
	padding:50px 0px 0px 0px;
	z-index:0;
}

.navbar-inverse {
	background: #303F9F;
}

.navbar-inverse .navbar-nav > .active > a,
.navbar-inverse .navbar-nav > .active > a:hover,
.navbar-inverse .navbar-nav > .active > a:focus {
	color: #fff;
	background: #1A237E;
}

.navbar-inverse .navbar-nav > .open > a,
.navbar-inverse .navbar-nav > .open > a:hover,
.navbar-inverse .navbar-nav > .open > a:focus {
	color: #fff;
	background: #1A237E;
}

.navbar-inverse .navbar-nav .open .dropdown-menu> li> a,
.navbar-inverse .navbar-nav .open .dropdown-menu {
	background-color: #303F9F;
	color:#eeeeee;
}

.navbar-inverse .navbar-nav .open .dropdown-menu> li> a:hover {
	color:#000000;
}
```

### BreadCrumb

路径导航栏 - Home -> Library -> Data

```html
<ol class="breadcrumb">
	<li><a href="#">Home</a></li>
	<li><a href="#">Library</a></li>
	<li class="active">Data</li>
</ol>
```

## Text

-   text-center/left/right
-   text-primary/info/success/danger

## Form

```html
<!-- type,format,value -->
<input
id=”” name=””
type=”text/email/password/radiobutton/checkbox(checked)/submit/number/range/color/date/url”
value=”(textfield/buttontext)”
placeholder=”(默认占位文字)”

<!-- validate input data -->

required
pattern=”[0-9a-zA-z]{5/13-16}”      <!-- []:可用字符 {}:字符数目 -->
min=”(number)”
max=”(number)”
step=”(步长:指定输入数字必须倍数关系)”
<!-- validate input data-->
/>
```

### Form Basic

-   `<form class="form-horizontal" role="form">`
-   `<form class="form-inline" role="form">`

```html
<form class="form-horizontal" role="form">
	<!-- input -->
	<div class="form-group">
		<label for="firstname" class="col-sm-2 control-label">First Name</label>
		<div class="col-sm-10">
			<input type="text" class="form-control" id="firstname" name="firstname" placeholder="Enter First Name">
		</div>
	</div>
	<!-- input -->
	<div class="form-group">
		<label for="lastname" class="col-sm-2 control-label">Last Name</label>
		<div class="col-sm-10">
			<input type="text" class="form-control" id="lastname" name="lastname" placeholder="Enter Last Name">
		</div>
	</div>
	<!-- input-addon -->
	<div class="form-group">
		<label for="telnum" class="col-xs-12 col-sm-2 control-label">Contact Tel.</label>
		<div class="col-xs-5 col-sm-4 col-md-3">
			<div class="input-group">
				<div class="input-group-addon">(</div>
				<input type="tel" class="form-control" id="areacode" name="areacode" placeholder="Area code">
				<div class="input-group-addon">)</div>
			</div>
		</div>
		<div class="col-xs-7 col-sm-6 col-md-7">
			<input type="tel" class="form-control" id="telnum" name="telnum" placeholder="Tel. number">
		</div>
	</div>
	<!-- input -->
	<div class="form-group">
		<label for="emailid" class="col-sm-2 control-label">Email</label>
		<div class="col-sm-10">
			<input type="email" class="form-control" id="emailid" name="emailid" placeholder="Email">
		</div>
	</div>
	<!-- check box and select -->
	<div class="form-group">
		<div class="checkbox col-sm-5 col-sm-offset-2">
			<label class="checkbox-inline">
				<input type="checkbox" name="approve" value="">
				<strong>May we contact you?</strong>
			</label>
		</div>
		<div class="col-sm-3 col-sm-offset-1">
			<select class="form-control">
				<option>Tel.</option>
				<option>Email</option>
			</select>
		</div>
	</div>
	<!-- textarea -->
	<div class="form-group">
		<label for="feedback" class="col-sm-2 control-label">Your Feedback</label>
		<div class="col-sm-10">
			<textarea class="form-control" id="feedback" name="feedback" rows="12"></textarea>
		</div>
	</div>
	<!-- submit button -->
	<div class="form-group">
		<div class="col-sm-offset-2 col-sm-10">
			<button type="submit" class="btn btn-primary">Send Feedback</button>
		</div>
	</div>
</form>
```

```html
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
```

### CheckBox and Select

```html
<div class="form-group">
	<div class="checkbox col-sm-5 col-sm-offset-2">
		<label class="checkbox-inline">
			<input type="checkbox" name="approve" value="">
			<strong>May we contact you?</strong>
		</label>
	</div>
	<div class="col-sm-3 col-sm-offset-1">
		<select class="form-control">
			<option>Tel.</option>
			<option>Email</option>
		</select>
	</div>
</div>
```

### Alerts and Prompts

## Table

### Table Basic Class

-  table-striped
-  table-bordered
-  table-hover
-  table-condensed
-  table-responsive

```html
<div class="table-responsive">
	<table class="table table-striped">
		<tr>
			<td>&nbsp;</td>
			<th>2013</th>
			<th>2014</th>
			<th>2015</th>
		</tr>
		<tr>
			<th>Employees</th>
			<td>15</td>
			<td>30</td>
			<td>40</td>
		</tr>
		<tr>
			<th>Guests Served</th>
			<td>15000</td>
			<td>45000</td>
			<td>100,000</td>
		</tr>
		<tr>
			<th>Special Events</th>
			<td>3</td>
			<td>20</td>
			<td>45</td>
		</tr>
		<tr>
			<th>Annual Turnover</th>
			<td>$251,325</td>
			<td>$1,250,375</td>
			<td>~$3,000,000</td>
		</tr>
	</table>
</div>
```

## Card

### Panel

```html
<div class="panel panel-primary">
	<div class="panel-heading">
		<h3	class="panel-title">Facts At a Glance</h3>
	</div>
	<div class="panel-body">
		<dl	class="dl-horizontal">
			<dt>Started</dt>
			<dd>3 Feb. 2013</dd>
			<dt>Major Stake Holder</dt>
			<dd>HK Fine Foods Inc.</dd>
			<dt>Last Year's Turnover</dt>
			<dd>$1,250,375</dd>
			<dt>Employees</dt>
			<dd>40</dd>
		</dl>
	</div>
</div>
```

### Well

-   well/well-xs/well-sm

```html
<div class="well">
	<blockquote>
		<p>paragraph</p>
		<footer>
			Yogi Berra,<cite title="Source Title">The Wit and Wisdom of Yogi Berra, 2014</cite>
		</footer>
	</blockquote>
</div>
```

## Images

### Img Class

-   img-responsive
-   img-rounded
-   img-circle
-   img-thumbnail

### Thumbnail

```html
<div class="row">
	<div class="col-sm-6 col-md-4">
		<div class="thumbnail">
			<img class="img-thumbnail" src="..." alt="...">
			<div class="caption">
				<h3>Thumbnail label</h3>
				<p>...</p>
				<p>
					<a href="#" class="btn btn-primary btn-xs" role="button">Button</a>
					<a href="#" class="btn btn-default btn-xs" role="button">Button</a>
				</p>
			</div>
		</div>
	</div>
</div>
```

### Media

-   media
-   media-list(ul)
-   media-object
-   media-body
-   media-heading
-   media-left/right
-   media-top/middle/bottom

```html
<ul class="media-list">
	<li class="media">
		<div class="media-left media-middle">
			<a href="#">
				<img class="media-object" src="..." alt="...">
			</a>
		</div>
		<div class="media-body">
			<h4 class="media-heading">Media heading</h4>
			...
		</div>
	</li>
</ul>
```

### Embed

-   embed-responsive
-   embed-responsive-item
    -   targets: `<iframe>, <embed>, <video>, <object>`

```html
<!-- 16:9 aspect ratio -->
<div class="embed-responsive embed-responsive-16by9">
  <iframe class="embed-responsive-item" src="..."></iframe>
</div>

<!-- 4:3 aspect ratio -->
<div class="embed-responsive embed-responsive-4by3">
  <iframe class="embed-responsive-item" src="..."></iframe>
</div>
```

## Alerts and Prompts

## Modal

```html
data-dismiss =”modal”
```

修饰.modal-dialog、.modal-content

$().modal(‘’);

## Button

-   targets: a/input/button
-   base:    btn
-   color:   btn-primary btn-success btn-warning btn-danger btn-info
-   size:    btn-xs/sm/lg
-   display: btn-block/btn-main
-   group:   btn-toolbar/btn-group/btn-group-vertical/btn-group-lg

```html
<div class="btn-toolbar">
	<div class="btn-group">
		<button class="btn">左</button>
		<button class="btn">中</button>
		<button class="btn">右</button>
	</div>
</div>

<div class="btn-group btn-group-vertical">
	<button class="btn">上</button>
	<button class="btn">中</button>
	<button class="btn">下</button>
</div>
```

-   other:   btn-social-icon

```html
<button data-toggle=”” data-target-”” data-dismiss=””></button>
```

## Jumbotron

```html
<div class="jumbotron">
	<div class="container">
		<div class="main">
			<h1>We are Broadway</h1>
			<a href ="#" class="btn-main">
				Get started
			</a>
		</div>
	</div>
</div>
```

## Icon-Fonts

```html
<span class="glyphicon glyphicon-home" aria-hidden="true"></span>
<i class="fa fa-phone/fa-fax/fa-envelope"></i>
```

## Style

### 嵌入效果
