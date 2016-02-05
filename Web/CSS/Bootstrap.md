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

## Form

```html
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

## Modal

```html
data-dismiss =”modal”
```

修饰.modal-dialog、.modal-content

$().modal(‘’);

## Button

```html
class:btn btn-success btn-warning btn-info

<button data-toggle=”” data-target-”” data-dismiss=””></button>
```

## Thumbnail

```html
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
```

## Navbar

```html
class=navbar navbar-default navbar-fixed-top nav-tabs nav-pills
```

```html
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
```
