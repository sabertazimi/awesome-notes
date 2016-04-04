# JavaScript Advanced Notes

## JavaScript Idioms

### Closure and IIFE

### Check

-   `O || {} ` `O || (O = {})`
-   `if (O && O.property)`
-   `if (typeof v === " ")`
-   `toString. apply(var)`

### Other

!!result 转化成 Boolean

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

## Project

-   sacc
-   autoprefixer
-   github-css-remove-unused-class
-   Jslint
-   uglification
-   concatenation
-   minimal

```shell
npm install
bower install
npm install gulp --save-dev
```

### Task Runner - Gulp

#### Gulp Plugins

```shell
npm install jshint gulp-jshint jshint-stylish gulp-imagemin gulp-concat gulp-uglify gulp-minify-css gulp-usemin gulp-cache gulp-changed gulp-rev gulp-rename gulp-notify  browser-sync del --save-dev
```

#### Gulpfile.js

```js
ar gulp = require('gulp'),
    minifycss = require('gulp-minify-css'),
    jshint = require('gulp-jshint'),
    stylish = require('jshint-stylish'),
    uglify = require('gulp-uglify'),
    usemin = require('gulp-usemin'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    changed = require('gulp-changed'),
    rev = require('gulp-rev'),
    browserSync = require('browser-sync'),
    del = require('del');

gulp.task('jshint', function() {
  return gulp.src('app/scripts/**/*.js')
  .pipe(jshint())
  .pipe(jshint.reporter(stylish));
});

// Clean
gulp.task('clean', function() {
    return del(['dist']);
});

// Default task
gulp.task('default', ['clean'], function() {
    gulp.start('usemin', 'imagemin','copyfonts');
});

gulp.task('usemin',['jshint'], function () {
  return gulp.src('./app/menu.html')
      .pipe(usemin({
        css:[minifycss(),rev()],
        js: [uglify(),rev()]
      }))
      .pipe(gulp.dest('dist/'));
});

// Images
gulp.task('imagemin', function() {
  return del(['dist/images']), gulp.src('app/images/**/*')
    .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
    .pipe(gulp.dest('dist/images'))
    .pipe(notify({ message: 'Images task complete' }));
});

gulp.task('copyfonts', ['clean'], function() {
   gulp.src('./bower_components/font-awesome/fonts/**/*.{ttf,woff,eof,svg}*')
   .pipe(gulp.dest('./dist/fonts'));
   gulp.src('./bower_components/bootstrap/dist/fonts/**/*.{ttf,woff,eof,svg}*')
   .pipe(gulp.dest('./dist/fonts'));
});

// Watch
gulp.task('watch', ['browser-sync'], function() {
  // Watch .js files
  gulp.watch('{app/scripts/**/*.js,app/styles/**/*.css,app/**/*.html}', ['usemin']);
      // Watch image files
  gulp.watch('app/images/**/*', ['imagemin']);

});

gulp.task('browser-sync', ['default'], function () {
   var files = [
      'app/**/*.html',
      'app/styles/**/*.css',
      'app/images/**/*.png',
      'app/scripts/**/*.js',
      'dist/**/*'
   ];

   browserSync.init(files, {
      server: {
         baseDir: "dist",
         index: "menu.html"
      }
   });
        // Watch any files in dist/, reload on change
  gulp.watch(['dist/**']).on('change', browserSync.reload);
    });
```
