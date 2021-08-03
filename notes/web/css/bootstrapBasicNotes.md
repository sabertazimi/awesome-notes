# Bootstrap Basic Notes

[TOC]

## Bootstrap Basis

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

- 设置宽度: col-xs/sm/md/lg-num
- 设置偏移量: col-xs/sm/md/lg-pull/push/offset-num

### row

- row
- row-header/row-content/row-footer

## Nav

### NavBar

#### Class

- navbar navbar-default
- navbar-inverse(color) navbar-fixed-top
- navbar-form
- nav-tabs nav-pills
- navbar-left/right

#### Structure

navbar > container > nav/navbar-header/navbar-nav/navbar-form > li/a

```html
<nav class="navbar navbar-default">
  <div class="container-fluid">
    <!-- Brand and toggle get grouped for better mobile display -->
    <div class="navbar-header">
      <button
        type="button"
        class="navbar-toggle collapsed"
        data-toggle="collapse"
        data-target="#bs-example-navbar-collapse-1"
        aria-expanded="false"
      >
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
        <li class="active">
          <a href="#">Link <span class="sr-only">(current)</span></a>
        </li>
        <li><a href="#">Link</a></li>
        <li class="dropdown">
          <a
            href="#"
            class="dropdown-toggle"
            data-toggle="dropdown"
            role="button"
            aria-haspopup="true"
            aria-expanded="false"
          >
            Dropdown<span class="caret"></span>
          </a>
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
          <input type="text" class="form-control" placeholder="Search" />
        </div>
        <button type="submit" class="btn btn-default">Submit</button>
      </form>
      <ul class="nav navbar-nav navbar-right">
        <li><a href="#">Link</a></li>
        <li class="dropdown">
          <a
            href="#"
            class="dropdown-toggle"
            data-toggle="dropdown"
            role="button"
            aria-haspopup="true"
            aria-expanded="false"
          >
            Dropdown <span class="caret"></span>
          </a>
          <ul class="dropdown-menu">
            <li><a href="#">Action</a></li>
            <li><a href="#">Another action</a></li>
            <li><a href="#">Something else here</a></li>
            <li role="separator" class="divider"></li>
            <li><a href="#">Separated link</a></li>
          </ul>
        </li>
      </ul>
    </div>
    <!-- /.navbar-collapse -->
  </div>
  <!-- /.container-fluid -->
</nav>
```

```css
body {
  padding: 50px 0px 0px 0px;
  z-index: 0;
}

.navbar-inverse {
  background: #303f9f;
}

.navbar-inverse .navbar-nav > .active > a,
.navbar-inverse .navbar-nav > .active > a:hover,
.navbar-inverse .navbar-nav > .active > a:focus {
  color: #fff;
  background: #1a237e;
}

.navbar-inverse .navbar-nav > .open > a,
.navbar-inverse .navbar-nav > .open > a:hover,
.navbar-inverse .navbar-nav > .open > a:focus {
  color: #fff;
  background: #1a237e;
}

.navbar-inverse .navbar-nav .open .dropdown-menu > li > a,
.navbar-inverse .navbar-nav .open .dropdown-menu {
  background-color: #303f9f;
  color: #eeeeee;
}

.navbar-inverse .navbar-nav .open .dropdown-menu > li > a:hover {
  color: #000000;
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

### Scroll Spy

```css
body {
  position: relative;
}

.affix {
  top: 100px;
}
```

```html
<body data-spy="scroll" data-target="#navbar-example" data-offset="200">
  <nav class="hidden-xs col-sm-2" id="navbar-example">
    <ul
      class="nav nav-tabs"
      role="tablist"
      data-spy="affix"
      data-offset-top="400"
    >
      <li><a href="#history">Our History</a></li>
      <li><a href="#corporate">Corporate</a></li>
      <li><a href="#facts">Facts</a></li>
    </ul>
  </nav>

  <!-- 在某个地方 -->
  <div id="history">...</div>
  <div id="corporate">...</div>
  <div id="facts">...</div>
</body>
```

## Tabs and Pills

- nav-tabs/nav-pills
- nav-justified/nav-stacked
- link - active/disabled

```html
<ul class="nav nav-tabs/nav-pills nav-justified/nav-stacked">
  <li role="presentation" class="active"><a href="#">Home</a></li>
  <li role="presentation" class="disabled"><a href="#">Messages</a></li>
  <li role="presentation" class="dropdown">
    <a
      class="dropdown-toggle"
      data-toggle="dropdown"
      href="#"
      role="button"
      aria-haspopup="true"
      aria-expanded="false"
    >
      Dropdown <span class="caret"></span>
    </a>
    <ul class="dropdown-menu">
      ...
    </ul>
  </li>
</ul>
```

### Tab Pane

```html
<div>
  <!-- Nav tabs -->
  <ul class="nav nav-tabs" role="tablist">
    <li role="presentation" class="active">
      <a href="#home" aria-controls="home" role="tab" data-toggle="tab">Home</a>
    </li>
    <li role="presentation">
      <a href="#profile" aria-controls="profile" role="tab" data-toggle="tab"
        >Profile</a
      >
    </li>
    <li role="presentation">
      <a href="#messages" aria-controls="messages" role="tab" data-toggle="tab"
        >Messages</a
      >
    </li>
    <li role="presentation">
      <a href="#settings" aria-controls="settings" role="tab" data-toggle="tab"
        >Settings</a
      >
    </li>
  </ul>

  <!-- Tab panes -->
  <div class="tab-content">
    <div role="tabpanel" class="tab-pane fade in active" id="home">...</div>
    <div role="tabpanel" class="tab-pane fade" id="profile">...</div>
    <div role="tabpanel" class="tab-pane fade" id="messages">...</div>
    <div role="tabpanel" class="tab-pane fade" id="settings">...</div>
  </div>
</div>
```

### Tab Pane JS API

```js
$('#myTabs a').click(function (e) {
  e.preventDefault();
  $(this).tab('show');
});

$('#myTabs a[href="#profile"]').tab('show'); // Select tab by name
$('#myTabs a:first').tab('show'); // Select first tab
$('#myTabs a:last').tab('show'); // Select last tab
$('#myTabs li:eq(2) a').tab('show'); // Select third tab (0-indexed)
```

### Tab Pane JS Events

- hide.bs.tab (on the current active tab)
- show.bs.tab (on the to-be-shown tab)
- hidden.bs.tab (on the previous active tab,
  the same one as for the hide.bs.tab event)
- shown.bs.tab (on the newly-active just-shown tab,
  the same one as for the show.bs.tab event)

```js
$('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
  e.target; // newly activated tab
  e.relatedTarget; // previous active tab
});
```

## Collapse

href/data-target -> id

```html
<a
  class="btn btn-primary"
  role="button"
  data-toggle="collapse"
  href="#collapseExample"
  aria-expanded="false"
  aria-controls="collapseExample"
>
  Link with href
</a>

<button
  class="btn btn-primary"
  type="button"
  data-toggle="collapse"
  data-target="#collapseExample"
  aria-expanded="false"
  aria-controls="collapseExample"
>
  Button with data-target
</button>

<div class="collapse in" id="collapseExample">
  <div class="well">...</div>
</div>
```

### Accordion

panel-body/list-group

```html
<div
  class="panel-group"
  id="accordion"
  role="tablist"
  aria-multiselectable="true"
>
  <div class="panel panel-default">
    <div class="panel-heading" role="tab" id="headingOne">
      <h4 class="panel-title">
        <a
          role="button"
          data-toggle="collapse"
          data-parent="#accordion"
          href="#collapseOne"
          aria-expanded="true"
          aria-controls="collapseOne"
        >
          Collapsible Group Item #1
        </a>
      </h4>
    </div>
    <div
      id="collapseOne"
      class="panel-collapse collapse in"
      role="tabpanel"
      aria-labelledby="headingOne"
    >
      <div class="panel-body">
        Anim cliche, high life terry richardson ad squid.
      </div>
    </div>
  </div>
  <div class="panel panel-default">
    <div class="panel-heading" role="tab" id="headingTwo">
      <h4 class="panel-title">
        <a
          class="collapsed"
          role="button"
          data-toggle="collapse"
          data-parent="#accordion"
          href="#collapseTwo"
          aria-expanded="false"
          aria-controls="collapseTwo"
        >
          Collapsible Group Item #2
        </a>
      </h4>
    </div>
    <div
      id="collapseTwo"
      class="panel-collapse collapse"
      role="tabpanel"
      aria-labelledby="headingTwo"
    >
      <div class="panel-body">
        Anim cliche, high life terry richardson ad squid.
      </div>
    </div>
  </div>
  <div class="panel panel-default">
    <div class="panel-heading" role="tab" id="headingThree">
      <h4 class="panel-title">
        <a
          class="collapsed"
          role="button"
          data-toggle="collapse"
          data-parent="#accordion"
          href="#collapseThree"
          aria-expanded="false"
          aria-controls="collapseThree"
        >
          Collapsible Group Item #3
        </a>
      </h4>
    </div>
    <div
      id="collapseThree"
      class="panel-collapse collapse"
      role="tabpanel"
      aria-labelledby="headingThree"
    >
      <div class="panel-body">
        Anim cliche, high life terry richardson ad squid.
      </div>
    </div>
  </div>
</div>
```

## Text

- text-center/left/right
- text-primary/info/success/danger

## Form

```html
<!-- type,format,value -->
<input id=”” name=””
type=”text/email/password/radiobutton/checkbox(checked)/submit/number/range/color/date/url”
value=”(textfield/buttonText)” placeholder=”(默认占位文字)”

<!-- validate input data -->

required pattern=”[0-9a-zA-z]{5/13-16}”
<!-- []:可用字符 {}:字符数目 -->
min=”(number)” max=”(number)” step=”(步长:指定输入数字必须倍数关系)”
<!-- validate input data-->
/>
```

### Form Basic

- `<form class="form-horizontal" role="form">`
- `<form class="form-inline" role="form">`

```html
<form class="form-horizontal" role="form">
  <!-- input -->
  <div class="form-group">
    <label for="firstName" class="col-sm-2 control-label">First Name</label>
    <div class="col-sm-10">
      <input
        type="text"
        class="form-control"
        id="firstName"
        name="firstName"
        placeholder="Enter First Name"
      />
    </div>
  </div>
  <!-- input -->
  <div class="form-group">
    <label for="lastName" class="col-sm-2 control-label">Last Name</label>
    <div class="col-sm-10">
      <input
        type="text"
        class="form-control"
        id="lastName"
        name="lastName"
        placeholder="Enter Last Name"
      />
    </div>
  </div>
  <!-- input-addon -->
  <div class="form-group">
    <label for="telNum" class="col-xs-12 col-sm-2 control-label">
      Contact Tel
    </label>
    <div class="col-xs-5 col-sm-4 col-md-3">
      <div class="input-group">
        <div class="input-group-addon">(</div>
        <input
          type="tel"
          class="form-control"
          id="areaCode"
          name="areaCode"
          placeholder="Area code"
        />
        <div class="input-group-addon">)</div>
      </div>
    </div>
    <div class="col-xs-7 col-sm-6 col-md-7">
      <input
        type="tel"
        class="form-control"
        id="telNum"
        name="telNum"
        placeholder="Tel. number"
      />
    </div>
  </div>
  <!-- input -->
  <div class="form-group">
    <label for="emailID" class="col-sm-2 control-label">Email</label>
    <div class="col-sm-10">
      <input
        type="email"
        class="form-control"
        id="emailID"
        name="emailID"
        placeholder="Email"
      />
    </div>
  </div>
  <!-- check box and select -->
  <div class="form-group">
    <div class="checkbox col-sm-5 col-sm-offset-2">
      <label class="checkbox-inline">
        <input type="checkbox" name="approve" value="" />
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
      <textarea
        class="form-control"
        id="feedback"
        name="feedback"
        rows="12"
      ></textarea>
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
    <input
      type="email"
      class="form-control"
      id="exampleInputEmail1"
      placeholder="Email"
    />
  </div>
  <div class="form-group">
    <label for="exampleInputPassword1">Password</label>
    <input
      type="password"
      class="form-control"
      id="exampleInputPassword1"
      placeholder="Password"
    />
  </div>
  <div class="form-group">
    <label for="exampleInputFile">File input</label>
    <input type="file" id="exampleInputFile" />
    <p class="help-block">Example block-level help text here.</p>
  </div>
  <div class="checkbox">
    <label> <input type="checkbox" /> Check me out </label>
  </div>
  <button type="submit" class="btn btn-default">Submit</button>
</form>

<div class="row">
  <div class="col-lg-6">
    <div class="input-group">
      <div class="input-group-btn">
        <button
          type="button"
          class="btn btn-default dropdown-toggle"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          Action <span class="caret"></span>
        </button>
        <ul class="dropdown-menu">
          <li><a href="#">Action</a></li>
          <li><a href="#">Another action</a></li>
          <li><a href="#">Something else here</a></li>
          <li role="separator" class="divider"></li>
          <li><a href="#">Separated link</a></li>
        </ul>
      </div>
      <!-- /btn-group -->
      <input type="text" class="form-control" aria-label="..." />
    </div>
    <!-- /input-group -->
  </div>
  <!-- /.col-lg-6 -->
</div>
```

### CheckBox and Select

```html
<div class="form-group">
  <div class="checkbox col-sm-5 col-sm-offset-2">
    <label class="checkbox-inline">
      <input type="checkbox" name="approve" value="" />
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

### Form Alerts and Prompts

- has-color
- has-feedback
- form-control-feedback(icon)
- control-label/form-control/help-block

```html
<div class="form-group has-success has-feedback">
  <label class="control-label" for="inputSuccess2">Input with success</label>
  <input
    type="text"
    class="form-control"
    id="inputSuccess2"
    aria-describedby="inputSuccess2Status"
  />
  <span
    class="glyphicon glyphicon-ok form-control-feedback"
    aria-hidden="true"
  ></span>
  <span id="inputSuccess2Status" class="sr-only">(success)</span>
</div>
<div class="form-group has-warning has-feedback">
  <label class="control-label" for="inputWarning2">Input with warning</label>
  <input
    type="text"
    class="form-control"
    id="inputWarning2"
    aria-describedby="inputWarning2Status"
  />
  <span
    class="glyphicon glyphicon-warning-sign form-control-feedback"
    aria-hidden="true"
  ></span>
  <span id="inputWarning2Status" class="sr-only">(warning)</span>
</div>
<div class="form-group has-error has-feedback">
  <label class="control-label" for="inputError2">Input with error</label>
  <input
    type="text"
    class="form-control"
    id="inputError2"
    aria-describedby="inputError2Status"
  />
  <span
    class="glyphicon glyphicon-remove form-control-feedback"
    aria-hidden="true"
  ></span>
  <span id="inputError2Status" class="sr-only">(error)</span>
</div>
<div class="form-group has-success has-feedback">
  <label class="control-label" for="inputGroupSuccess1"
    >Input group with success</label
  >
  <div class="input-group">
    <span class="input-group-addon">@</span>
    <input
      type="text"
      class="form-control"
      id="inputGroupSuccess1"
      aria-describedby="inputGroupSuccess1Status"
    />
  </div>
  <span
    class="glyphicon glyphicon-ok form-control-feedback"
    aria-hidden="true"
  ></span>
  <span id="inputGroupSuccess1Status" class="sr-only">(success)</span>
</div>
```

## Table

### Table Basic Class

- table-striped
- table-bordered
- table-hover
- table-condensed
- table-responsive

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
    <h3 class="panel-title">Facts At a Glance</h3>
  </div>
  <div class="panel-body">
    <dl class="dl-horizontal">
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

- well/well-xs/well-sm

```html
<div class="well">
  <blockquote>
    <p>paragraph</p>
    <footer>
      Yogi Berra,<cite title="Source Title"
        >The Wit and Wisdom of Yogi Berra, 2014</cite
      >
    </footer>
  </blockquote>
</div>
```

## Images

### Img Class

- img-responsive
- img-rounded
- img-circle
- img-thumbnail

### Thumbnail

```html
<div class="row">
  <div class="col-sm-6 col-md-4">
    <div class="thumbnail">
      <img class="img-thumbnail" src="..." alt="..." />
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

- media
- media-list(ul)
- media-object
- media-body
- media-heading
- media-left/right
- media-top/middle/bottom

```html
<ul class="media-list">
  <li class="media">
    <div class="media-left media-middle">
      <a href="#">
        <img class="media-object" src="..." alt="..." />
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

- embed-responsive
- embed-responsive-item
- targets: `<iframe>, <embed>, <video>, <object>`

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

### Labels

- target: span
- label
- label-color
- label-size

```html
<span class="label label-default label-xs">Default</span>
<span class="label label-primary label-sm">Primary</span>
<span class="label label-success label-md">Success</span>
<span class="label label-info label-lg">Info</span>
<span class="label label-warning">Warning</span>
<span class="label label-danger">Danger</span>
```

### Badges

```html
<button class="btn btn-primary" type="button">
  Messages <span class="badge">4</span>
</button>
```

### Alerts

- alert
- alert-color
- alert-dismissible
- alert-link

```html
<div class="alert alert-warning alert-dismissible" role="alert">
  <button type="button" class="close" data-dismiss="alert" aria-label="Close">
    <span aria-hidden="true">&times;</span>
  </button>
  <strong>Warning!</strong> Better check yourself, you're not looking too good.
  <a href="#" class="alert-link">...</a>
</div>
```

### Progress Bars

- progress-bar
- width/aria-valuemin/aria-valuemax
- progress-bar-color
- progress-bar-striped
- stacked: put multi-progress-bar into same .progress

```html
<div class="progress">
  <div
    class="progress-bar progress-bar-success"
    role="progressbar"
    aria-valuenow="40"
    aria-valuemin="0"
    aria-valuemax="100"
    style="width:
  40%"
  >
    <span class="sr-only">40% Complete (success)</span>
  </div>
</div>
<div class="progress">
  <div
    class="progress-bar progress-bar-info"
    role="progressbar"
    aria-valuenow="20"
    aria-valuemin="0"
    aria-valuemax="100"
    style="width:
  20%"
  >
    <span class="sr-only">20% Complete</span>
  </div>
</div>
<div class="progress">
  <div
    class="progress-bar progress-bar-warning"
    role="progressbar"
    aria-valuenow="60"
    aria-valuemin="0"
    aria-valuemax="100"
    style="width:
  60%"
  >
    <span class="sr-only">60% Complete (warning)</span>
  </div>
</div>
<div class="progress">
  <div
    class="progress-bar progress-bar-danger"
    role="progressbar"
    aria-valuenow="80"
    aria-valuemin="0"
    aria-valuemax="100"
    style="width:
  80%"
  >
    <span class="sr-only">80% Complete (danger)</span>
  </div>
</div>
```

### Tooltip

- data-toggle="tooltip"
- data-placement="left"
- title="Tooltip on left"

```js
// manually initialization
$(function () {
  $('[data-toggle="tooltip"]').tooltip();
});
```

```html
<button
  type="button"
  class="btn btn-default"
  data-toggle="tooltip"
  data-placement="left"
  title="Tooltip on left"
>
  Tooltip on left
</button>

<button
  type="button"
  class="btn btn-default"
  data-toggle="tooltip"
  data-placement="top"
  title="Tooltip on top"
>
  Tooltip on top
</button>

<button
  type="button"
  class="btn btn-default"
  data-toggle="tooltip"
  data-placement="bottom"
  title="Tooltip on bottom"
>
  Tooltip on bottom
</button>

<button
  type="button"
  class="btn btn-default"
  data-toggle="tooltip"
  data-placement="right"
  title="Tooltip on right"
>
  Tooltip on right
</button>
```

### Popover

- data-container="body"
- data-toggle="popover"
- data-trigger="focus"
- data-placement="left"
- title="left"
- data-content="Button content."

```js
// manually initialization
$(function () {
  $('[data-toggle="popover"]').popover();
});
```

```html
<button
  type="button"
  class="btn btn-default"
  data-container="body"
  data-toggle="popover"
  data-placement="left"
  title="left"
  data-content="Button Content."
>
  Popover on left
</button>

<button
  type="button"
  class="btn btn-default"
  data-container="body"
  data-toggle="popover"
  data-placement="top"
  title="top"
  data-content="Button content."
>
  Popover on top
</button>

<button
  type="button"
  class="btn btn-default"
  data-container="body"
  data-toggle="popover"
  data-placement="bottom"
  title="bottom"
  data-content="Button content."
>
  Popover on bottom
</button>

<button
  type="button"
  class="btn btn-default"
  data-container="body"
  data-toggle="popover"
  data-placement="right"
  title="right"
  data-content="Button content."
>
  Popover on right
</button>
```

### Modal

```html
data-dismiss ="modal"
```

修饰.modal-dialog、.modal-content

\$().modal('');

```html
<!-- Button trigger modal -->
<button
  type="button"
  class="btn btn-primary btn-lg"
  data-toggle="modal"
  data-target="#myModal"
>
  Launch demo modal
</button>

<!-- Modal -->
<div
  class="modal fade"
  id="myModal"
  tabindex="-1"
  role="dialog"
  aria-labelledby="myModalLabel"
>
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button
          type="button"
          class="close"
          data-dismiss="modal"
          aria-label="Close"
        >
          <span aria-hidden="true">&times;</span>
        </button>
        <h4 class="modal-title" id="myModalLabel">Modal title</h4>
      </div>
      <div class="modal-body">...</div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">
          Close
        </button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>
```

```html
<button
  type="button"
  class="btn btn-primary"
  data-toggle="modal"
  data-target="#exampleModal"
  data-whatever="@mdo"
>
  Open modal for @mdo
</button>
<button
  type="button"
  class="btn btn-primary"
  data-toggle="modal"
  data-target="#exampleModal"
  data-whatever="@fat"
>
  Open modal for @fat
</button>
<button
  type="button"
  class="btn btn-primary"
  data-toggle="modal"
  data-target="#exampleModal"
  data-whatever="@getBootstrap"
>
  Open modal for @getBootstrap
</button>

<div
  class="modal fade"
  id="exampleModal"
  tabindex="-1"
  role="dialog"
  aria-labelledby="exampleModalLabel"
>
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button
          type="button"
          class="close"
          data-dismiss="modal"
          aria-label="Close"
        >
          <span aria-hidden="true">&times;</span>
        </button>
        <h4 class="modal-title" id="exampleModalLabel">New message</h4>
      </div>
      <div class="modal-body">
        <form>
          <div class="form-group">
            <label for="recipient-name" class="control-label">Recipient:</label>
            <input type="text" class="form-control" id="recipient-name" />
          </div>
          <div class="form-group">
            <label for="message-text" class="control-label">Message:</label>
            <textarea class="form-control" id="message-text"></textarea>
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">
          Close
        </button>
        <button type="button" class="btn btn-primary">Send message</button>
      </div>
    </div>
  </div>
</div>
```

## Button

- targets: a/input/button
- base: btn
- color: btn-primary btn-success btn-warning btn-danger btn-info
- size: btn-xs/sm/lg
- display: btn-block/btn-main
- group: btn-toolbar/btn-group/btn-group-vertical/btn-group-lg

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

- other: btn-social-icon

```html
<button data-toggle="””" data-target-”” data-dismiss="””"></button>
```

## Jumbotron

```html
<div class="jumbotron">
  <div class="container">
    <div class="main">
      <h1>We are Broadway</h1>
      <a href="#" class="btn-main"> Get started </a>
    </div>
  </div>
</div>
```

## Icon-Fonts

```html
<span class="glyphicon glyphicon-home" aria-hidden="true"></span>
<i class="fa fa-phone/fa-fax/fa-envelope"></i>
```

## Carousel

Slide Show:

```html
<div id="carousel-example-generic" class="carousel slide" data-ride="carousel">
  <!-- Indicators -->
  <ol class="carousel-indicators">
    <li
      data-target="#carousel-example-generic"
      data-slide-to="0"
      class="active"
    ></li>
    <li data-target="#carousel-example-generic" data-slide-to="1"></li>
    <li data-target="#carousel-example-generic" data-slide-to="2"></li>
  </ol>

  <!-- Wrapper for slides -->
  <div class="carousel-inner" role="listbox">
    <div class="item active">
      <img src="..." alt="..." />
      <div class="carousel-caption">...</div>
    </div>
    <div class="item">
      <img src="..." alt="..." />
      <div class="carousel-caption">...</div>
    </div>
    ...
  </div>

  <!-- Controls -->
  <a
    class="left carousel-control"
    href="#carousel-example-generic"
    role="button"
    data-slide="prev"
  >
    <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
    <span class="sr-only">Previous</span>
  </a>
  <a
    class="right carousel-control"
    href="#carousel-example-generic"
    role="button"
    data-slide="next"
  >
    <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
    <span class="sr-only">Next</span>
  </a>
</div>
```

```js
.carousel(options)

Initializes the carousel with an optional options object
and starts cycling through items.
Copy

$('.carousel').carousel({
  interval: 2000
})

.carousel('cycle')

Cycles through the carousel items from left to right.
.carousel('pause')

Stops the carousel from cycling through items.
.carousel(number)

Cycles the carousel to a particular frame (0 based, similar to an array).
.carousel('prev')

Cycles to the previous item.
.carousel('next')

Cycles to the next item.
```

## Common Class

### color

- default/primary/info/warnings/danger

### size

- xs/sm/md/lg

### state

- active
- disabled

### Bootstrap Animation

- collapse
- fade
- in

## Bootstrap 4

### Bootstrap Card

- .well: .card.bg-light
- .panel: .card
- .thumbnail: .card + .card-img/.card-img-top

## Custom Bootstrap Theme

### Webpack Setup

```json
{
  "scripts": {
    "start": "npm run dev",
    "dev": "cross-env NODE_ENV=development \
      webpack-dev-server --port 2333 --mode development --open",
    "build": "cross-env NODE_ENV=production webpack --mode production",
    "lint": "stylelint ./src/**/*.scss ./src/**/*.css && \
      eslint --ext .js --ext .jsx ./src"
  },
  "devDependencies": {
    "@babel/cli": "^7.2.3",
    "@babel/core": "^7.3.3",
    "@babel/plugin-proposal-class-properties": "^7.3.3",
    "@babel/plugin-proposal-object-rest-spread": "^7.3.2",
    "@babel/preset-env": "^7.3.1",
    "autoprefixer": "^8.6.2",
    "babel-eslint": "^10.0.1",
    "babel-loader": "^8.0.5",
    "clean-webpack-plugin": "^0.1.19",
    "cross-env": "^5.2.0",
    "css-loader": "^0.28.11",
    "eslint": "^4.19.1",
    "eslint-config-airbnb": "^17.0.0",
    "eslint-loader": "^2.1.0",
    "eslint-plugin-import": "^2.13.0",
    "eslint-plugin-jsx-a11y": "^6.1.1",
    "eslint-plugin-react": "^7.10.0",
    "html-loader": "^0.5.5",
    "html-webpack-plugin": "^3.2.0",
    "mini-css-extract-plugin": "^0.4.0",
    "node-sass": "^4.11.0",
    "postcss-loader": "^2.1.5",
    "precss": "^4.0.0",
    "sass-loader": "^7.0.3",
    "style-loader": "^0.21.0",
    "stylelint": "^9.10.1",
    "stylelint-config-mass": "^1.0.2",
    "stylelint-webpack-plugin": "^0.10.5",
    "webpack": "^4.12.0",
    "webpack-cli": "^3.0.6",
    "webpack-dev-server": "^3.2.0"
  },
  "dependencies": {
    "bootstrap": "^4.3.1",
    "jquery": "^3.3.1",
    "popper.js": "^1.14.7"
  }
}
```

```js
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');

const packageJson = require('./package.json');

const devMode = process.env.NODE_ENV !== 'production';
const useSass = !!packageJson.devDependencies['node-sass'];

const styleLoader = [
  devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
  {
    loader: 'css-loader',
    options: {
      minimize: !devMode,
    },
  },
  'postcss-loader',
];

if (useSass) {
  styleLoader.push('sass-loader');
}

module.exports = {
  entry: {
    main: './src/index.js',
  },
  output: {
    filename: '[name].[chunkhash].js',
    path: path.resolve(__dirname, 'build'),
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader', 'eslint-loader'],
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: {
              minimize: !devMode,
            },
          },
        ],
      },
      {
        test: /\.(css|scss)$/,
        use: [...styleLoader],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin('build'),
    new HtmlWebpackPlugin({
      hash: true,
      template: './src/index.html',
      filename: './index.html',
    }),
    new MiniCssExtractPlugin({
      filename: devMode ? '[name].css' : '[name].[hash].css',
      chunkFilename: devMode ? '[id].css' : '[id].[hash].css',
    }),
    new StyleLintPlugin(),
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  devtool: 'source-map',
};
```

- [Advanced Webpack Configuration](https://medium.com/@estherfalayi/setting-up-webpack-for-bootstrap-4-and-font-awesome-eb276e04aaeb)

### Bootstrap Reboot Tips

- `@import '~bootstrap/scss/reboot`;

Some useful best practices:

- body `font-size: 1rem` for scalable component spacing.
- avoid `margin-top` as vertical margins collapse
  (only use `margin-bottom` for headings `h1/.../h6`,
  lists `ul/ol/dl/dd`, `<pre></pre>`)
- block use `rems` for `margin` for easier scaling across device sizes
- using inherit whenever possible for `font-` property
- `box-sizing: border-box` is globally set on every element
  including `*::before` and `*::after`
- body sets a global `font-family`, `line-height` and `text-align`
- body sets `background-color: #fff` for safety
- `legend`/`fieldset` have no borders/padding/margin
- `label` are set to `display: inline-block` to allow margin
- `textarea` are modified to only be resizable vertically `resize: vertical`
  as horizontal resizing often “breaks” page layout
- `summary` are set to `cursor: pointer`

### Useful Custom Functions

- `@import '~bootstrap/scss/functions';`
- `@import '~bootstrap/scss/mixins';`

```css
@function color($key: 'blue') {
  @return map-get($colors, $key);
}

@function theme-color($key: 'primary') {
  @return map-get($theme-colors, $key);
}

@function gray($key: '100') {
  @return map-get($grays, $key);
}

@function theme-color-level($color-name: 'primary', $level: 0) {
  $color: theme-color($color-name);
  $color-base: if($level > 0, #000, #fff);
  $level: abs($level);

  @return mix($color-base, $color, $level * $theme-color-interval);
}

/* color contrast: color-yiq(color) */
.custom-element {
  background-color: color-yiq(#000);
  color: color-yiq(theme-color('dark'));
}
```

### Custom Global Options

```css
$enable-caret: true !default;
$enable-rounded: true !default;
$enable-shadows: false !default;
$enable-gradients: false !default;
$enable-transitions: true !default;
$enable-prefers-reduced-motion-media-query: true !default;
$enable-grid-classes: true !default;
$enable-pointer-cursor-for-buttons: true !default;
$enable-print-styles: true !default;
$enable-responsive-font-sizes: false !default;
$enable-validation-icons: true !default;
$enable-deprecation-messages: true !default;
```

### Custom Colors

- `@import '~bootstrap/scss/variables';`

```css
$theme-colors: (
  'primary': #0074d9,
  'danger': #ff4136 'secondary': #495057,
  'success': #37b24d,
  'info': #1c7ed6,
  'warning': #f59f00,
  'danger': #f03e3e
);

$colors: (
  'blue': $blue,
  'indigo': $indigo,
  'purple': $purple,
  'pink': $pink,
  'red': $red,
  'orange': $orange,
  'yellow': $yellow,
  'green': $green,
  'teal': $teal,
  'cyan': $cyan,
  'white': $white,
  'gray': $gray-600,
  'gray-dark': $gray-800
) !default;
```

### Custom Spacing

key variable - `$spacer`:

- t - for classes that set margin-top or padding-top
- b - for classes that set margin-bottom or padding-bottom
- l - for classes that set margin-left or padding-left
- r - for classes that set margin-right or padding-right
- x - for classes that set both `xxx`-left and `xxx`-right
- y - for classes that set both `xxx`-top and `xxx`-bottom
- blank - for classes that set a margin or padding on all 4 sides of the element
- 0 - for classes that eliminate the margin or padding by setting it to 0
- 1 - (by default) for classes that set the margin or padding to \$spacer \* .25
- 2 - (by default) for classes that set the margin or padding to \$spacer \* .5
- 3 - (by default) for classes that set the margin or padding to \$spacer
- 4 - (by default) for classes that set the margin or padding to \$spacer \* 1.5
- 5 - (by default) for classes that set the margin or padding to \$spacer \* 3
- auto - for classes that set the margin to auto

```css
.mt-0 {
  margin-top: 0 !important;
}

.ml-1 {
  margin-left: ($spacer * 0.25) !important;
}

.px-2 {
  padding-right: ($spacer * 0.5) !important;
  padding-left: ($spacer * 0.5) !important;
}

.p-3 {
  padding: $spacer !important;
}

.mt-n1 {
  margin-top: -0.25rem !important;
}
```

### Custom Layout

```css
$grid-columns: 12 !default;
$grid-gutter-width: 30px !default;
```

### Custom Borders

```css
$border-width: 1px !default;
$border-color: $gray-300 !default;
$border-radius: 0.25rem !default;
$border-radius-lg: 0.3rem !default;
$border-radius-sm: 0.2rem !default;
```

### Custom Navbar and Navigation

```css
/* $nav-link-padding-x: 1.5rem; */
$navbar-nav-link-padding-x: 1.5rem;
$nav-link-padding-y: 1rem;

$navbar-light-color: $violet-4;
$navbar-light-hover-color: $violet-6;
$navbar-light-active-color: $violet-9;
$navbar-light-toggler-border-color: $violet-2;

$navbar-dark-color: $violet-3;
$navbar-dark-hover-color: $violet-5;
$navbar-dark-active-color: $violet-1;
$navbar-dark-toggler-border-color: $violet-1;

$nav-tabs-border-color: $primary;
$nav-tabs-link-hover-border-color: $violet-5;
$nav-tabs-link-active-color: $violet-9;
$nav-tabs-link-active-bg: $violet-3;
$nav-tabs-link-active-border-color: $violet-1;

$nav-pills-link-active-color: $white;
$nav-pills-link-active-bg: $primary;
```

### Custom Dropdown

custom `$dropdown-` variables

```css
$dropdown-padding-y: 1rem;
$dropdown-spacer: 0.5rem;
$dropdown-bg: $white;
$dropdown-border-color: $primary;
$dropdown-border-width: $border-width * 3;
$dropdown-link-color: $primary;
$dropdown-item-padding-y: 0.5rem;
$dropdown-item-padding-x: 3rem;
```

### Custom List Group

```css
$list-group-border-color: $primary;
```

### Custom Card

```css
$card-border-color: $primary;
$card-color: $primary;
$card-bg: $violet-0;
```

### Custom Breadcrumb

```css
$breadcrumb-bg: $violet-0;
$breadcrumb-divider-color: $gray-600 !default;
$breadcrumb-active-color: $violet-3;
$breadcrumb-divider: quote('>');
```

### Custom Form

```css
$input-btn-padding-y: 0.75rem;
$input-btn-padding-x: 1.5rem;
$input-btn-focus-width: 0; /* remove focus box-shadow */
$custom-control-indicator-checked-color: $primary;
```

## Reference

- [BootStrap 5 CheatSheet](https://github.com/themeselection/bootstrap-cheatsheet)
