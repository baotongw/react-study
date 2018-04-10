var gulp = require('gulp'),
    // js min
    uglify = require('gulp-uglify'),
    // 文件合并
    // concat = require('gulp-concat'),
    // 处理css import
    importCss = require('gulp-import-css'),
    cssmin = require('gulp-clean-css'),
    // htmlmin = require('gulp-htmlmin'),
    browserify = require("browserify"),
    // 生成source map
    sourcemaps = require("gulp-sourcemaps"),
    // gulp stream
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    // es6
    // babel = require('gulp-babel'),
    // ver文件
    rev = require('gulp-rev'),
    // html 版本号
    // revCollector = require('gulp-rev-collector'),
    // 重命名文件
    rename = require('gulp-rename'),    
    babelify = require('babelify'),
    es = require('event-stream');

var js_entries = [
    // 'page/todolist/backbone/app.js',
    'page/todolist/react/app.js',
    'page/todolist/flux/app.js',
    'page/todolist/redux/app.js', 
    'page/todolist/react-redux/index.js',
    'page/todolist/mobx/app.js',
    // 'page/react-study/app.js',
]

gulp.task('script', () => {
    //遍历入口文件
    var tasks = js_entries.map(function(entry, index) {
        console.log('compile file:', entry);
        var browser = browserify({
            basedir: 'src/scripts',
            entries: [entry]
        }, { debug: true });

        // es6 transform; react transform
        return browser.transform('babelify', {
            presets: ['es2015', 'react', 'stage-0'],
            plugins: ['transform-decorators-legacy'],
            sourceMaps: true,
        })
            .bundle()
            .pipe(source(entry))
            .pipe(buffer())
            .pipe(sourcemaps.init({ loadMaps: true }))
            // .pipe(uglify())
            .pipe(sourcemaps.write('./'))
            .pipe(gulp.dest('./public/scripts'));
    });

    //创建一个合并流
    return es.merge.apply(null, tasks);
});

var css_entries = [
    'src/styles/todolist/*.css',
    'src/styles/css/*.css',
    'src/styles/*.css',
]

gulp.task('style', () => {
    return gulp.src(css_entries)
        .pipe(importCss())
        // .pipe(sourcemaps.init())
        // .pipe(cssmin())
        // .pipe(sourcemaps.write())
        .pipe(gulp.dest('./public/styles'));
})

gulp.task('build', ['script', 'style'], () => console.log('Build script and style done.'));

// 第二个参数标识在此任务执行之前需要执行的task
gulp.task('react-dev', ['script'], () => gulp.watch('src/scripts/page/**', ['script']));

gulp.task('style-dev', ['style'], () => gulp.watch('src/styles/**', ['style']));

// 编译代码，同时监听文件变动，然后重写编译
gulp.task('default', ['react-dev', 'style-dev'], () => console.log('Gulp task done.'));