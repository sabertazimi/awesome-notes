var gulp = require('gulp'),
    gutil = require('gulp-util'),
    concat = require('gulp-concat'),
    combiner = require('stream-combiner2'),
    sourcemaps = require('gulp-sourcemaps'),
    rename = require('gulp-rename');

var uglify = require('gulp-uglify'),
    babel = require('gulp-babel');

var cleancss = require('gulp-clean-css'),
    autoprefixer = require('gulp-autoprefixer'),
    less = require('gulp-less'),
    sass = require('gulp-ruby-sass');

var imagemin = require('gulp-imagemin');

var watchPath = require('gulp-watch-path'),
    handlebars = require('gulp-handlebars'),
    wrap = require('gulp-wrap'),
    declare = require('gulp-declare');

var handleError = function (err) {
    var colors = gutil.colors;
    console.log('\n');
    gutil.log(colors.red('Error!'));
    gutil.log('fileName: ' + colors.red(err.fileName));
    gutil.log('lineNumber: ' + colors.red(err.lineNumber));
    gutil.log('message: ' + err.message);
    gutil.log('plugin: ' + colors.yellow(err.plugin));
};

gulp.task('bower', function () {
    gulp.src('./bower_components/mdl/material.min.css')
        .pipe(gulp.dest('./dist/css/'));
    gulp.src('./bower_components/mdl/material.min.js')
        .pipe(gulp.dest('./dist/js/'));
    gulp.src('./bower_components/jquery/dist/jquery.min.js')
        .pipe(gulp.dest('./dist/js/'));
    gulp.src('./bower_components/handlebars/handlebars.min.js')
        .pipe(gulp.dest('./dist/js/'));
});

gulp.task('watchjs', function () {
    gulp.watch('src/js/**/*.js', function (event) {
        var paths = watchPath(event, 'src/', 'dist/');
        /*
        paths
            { srcPath: 'src/js/log.js',
              srcDir: 'src/js/',
              distPath: 'dist/js/log.js',
              distDir: 'dist/js/',
              srcFilename: 'log.js',
              distFilename: 'log.js' }
        */
        gutil.log(gutil.colors.green(event.type) + ' ' + paths.srcPath);
        gutil.log('Dist ' + paths.distPath);

        var combined = combiner.obj([
            gulp.src([
                'src/js/**/*.js',
            ]),
            concat('main.js'),
            gulp.dest(paths.distDir),
            sourcemaps.init(),
            babel(),
            rename({ suffix: '.min' }),
            uglify(),
            sourcemaps.write('./'),
            gulp.dest(paths.distDir)
        ]);

        combined.on('error', handleError);
    });
});


gulp.task('js', function () {
    var combined = combiner.obj([
        gulp.src([
            'src/js/**/*.js',
        ]),
        concat('main.js'),
        gulp.dest('dist/js/'),
        sourcemaps.init(),
        babel(),
        rename({ suffix: '.min' }),
        uglify(),
        sourcemaps.write('./'),
        gulp.dest('dist/js/')
    ]);
    combined.on('error', handleError);
});


gulp.task('watchcss', function () {
    gulp.watch('src/css/**/*.css', function (event) {
        var paths = watchPath(event, 'src/', 'dist/');

        gutil.log(gutil.colors.green(event.type) + ' ' + paths.srcPath);
        gutil.log('Dist ' + paths.distPath);

        gulp.src('src/css/**/*.css')
            .pipe(concat('main.css'))
            .pipe(gulp.dest(paths.distDir))
            .pipe(sourcemaps.init())
            .pipe(autoprefixer({
              browsers: 'last 2 versions'
            }))
            .pipe(rename({ suffix: '.min' }))
            .pipe(cleancss())
            .pipe(sourcemaps.write('./'))
            .pipe(gulp.dest(paths.distDir));
    });
});

gulp.task('css', function () {
    gulp.src('src/css/**/*.css')
        .pipe(concat('main.css'))
        .pipe(gulp.dest('dist/css/'))
        .pipe(sourcemaps.init())
        .pipe(autoprefixer({
          browsers: 'last 2 versions'
        }))
        .pipe(rename({ suffix: '.min' }))
        .pipe(cleancss())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('dist/css/'));
});

// gulp.task('watchless', function () {
//     gulp.watch('src/less/**/*.less', function (event) {
//         var paths = watchPath(event, 'src/less/', 'dist/css/');
//
//         gutil.log(gutil.colors.green(event.type) + ' ' + paths.srcPath);
//         gutil.log('Dist ' + paths.distPath);
//         var combined = combiner.obj([
//             gulp.src(paths.srcPath),
//             sourcemaps.init(),
//             autoprefixer({
//               browsers: 'last 2 versions'
//             }),
//             less(),
//             minifycss(),
//             sourcemaps.write('./'),
//             gulp.dest(paths.distDir)
//         ]);
//         combined.on('error', handleError);
//     });
// });

// gulp.task('lesscss', function () {
//     var combined = combiner.obj([
//             gulp.src('src/less/**/*.less'),
//             sourcemaps.init(),
//             autoprefixer({
//               browsers: 'last 2 versions'
//             }),
//             less(),
//             minifycss(),
//             sourcemaps.write('./'),
//             gulp.dest('dist/css/')
//         ]);
//     combined.on('error', handleError);
// });


// gulp.task('watchsass',function () {
//     gulp.watch('src/sass/**/*', function (event) {
//         var paths = watchPath(event, 'src/sass/', 'dist/css/');
//
//         gutil.log(gutil.colors.green(event.type) + ' ' + paths.srcPath);
//         gutil.log('Dist ' + paths.distPath);
//         sass(paths.srcPath)
//             .on('error', function (err) {
//                 console.error('Error!', err.message);
//             })
//             .pipe(sourcemaps.init())
//             .pipe(minifycss())
//             .pipe(autoprefixer({
//               browsers: 'last 2 versions'
//             }))
//             .pipe(sourcemaps.write('./'))
//             .pipe(gulp.dest(paths.distDir));
//     });
// });
//
// gulp.task('sasscss', function () {
//         sass('src/sass/')
//         .on('error', function (err) {
//             console.error('Error!', err.message);
//         })
//         .pipe(sourcemaps.init())
//         .pipe(minifycss())
//         .pipe(autoprefixer({
//           browsers: 'last 2 versions'
//         }))
//         .pipe(sourcemaps.write('./'))
//         .pipe(gulp.dest('dist/css'));
// });

gulp.task('watchhtml', function () {
    gulp.watch('src/*.html', function (event) {
        var paths = watchPath(event, 'src/', 'dist/');

        gutil.log(gutil.colors.green(event.type) + ' ' + paths.srcPath);
        gutil.log('Dist ' + paths.distPath);

        gulp.src(paths.srcPath)
            .pipe(gulp.dest(paths.distDir));
    });
});

gulp.task('html', function() {
    var htmlSrc = './src/*.html',
        htmlDst = './dist/';

    gulp.src(htmlSrc)
        .pipe(gulp.dest(htmlDst));
});

gulp.task('watchimages', function () {
    gulp.watch('src/images/**/*', function (event) {
        var paths = watchPath(event,'src/','dist/');

        gutil.log(gutil.colors.green(event.type) + ' ' + paths.srcPath);
        gutil.log('Dist ' + paths.distPath);

        gulp.src(paths.srcPath)
            .pipe(imagemin({
                progressive: true
            }))
            .pipe(gulp.dest(paths.distDir));
    });
});

gulp.task('images', function () {
    gulp.src('src/images/**/*')
        .pipe(imagemin({
            progressive: true
        }))
        .pipe(gulp.dest('dist/images'));
});

gulp.task('watchcopy', function () {
    gulp.watch('src/fonts/**/*', function (event) {
        var paths = watchPath(event,'src/', 'dist/');

        gutil.log(gutil.colors.green(event.type) + ' ' + paths.srcPath);
        gutil.log('Dist ' + paths.distPath);

        gulp.src(paths.srcPath)
            .pipe(gulp.dest(paths.distDir));
    });
});

gulp.task('copy', function () {
    gulp.src('src/fonts/**/*')
        .pipe(gulp.dest('dist/fonts/'));
});

gulp.task('watchtemplates', function () {
    gulp.watch('src/templates/**/*', function (event) {
        var paths = watchPath(event, 'src/', 'dist/');

        gutil.log(gutil.colors.green(event.type) + ' ' + paths.srcPath);
        gutil.log('Dist ' + paths.distPath);

        var combined = combiner.obj([
            gulp.src(paths.srcPath),
            handlebars({
              // 3.0.1
              handlebars: require('handlebars')
            }),
            wrap('Handlebars.template(<%= contents %>)'),
            declare({
              namespace: 'S.templates',
              noRedeclare: true
            }),
            gulp.dest(paths.distDir)
        ]);
        combined.on('error', handleError);
    });
});

gulp.task('templates', function () {
        gulp.src('src/templates/**/*')
        .pipe(handlebars({
          // 3.0.1
          handlebars: require('handlebars')
        }))
        .pipe(wrap('Handlebars.template(<%= contents %>)'))
        .pipe(declare({
          namespace: 'S.templates',
          noRedeclare: true
        }))
        .pipe(gulp.dest('dist/templates'));
});


gulp.task('default', ['bower', 'html', 'js', 'css', 'images', 'copy', 'templates', 'watchhtml', 'watchjs', 'watchcss', 'watchimages', 'watchcopy', 'watchtemplates']);
