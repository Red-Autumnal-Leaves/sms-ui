
/***************************    定义插件     ***********************/
var gulp = require('gulp');

var htmlmin = require('gulp-htmlmin');//html 压缩插件

var uglify = require('gulp-uglify');//js丑化编译插件

var minify = require('gulp-minify');//JS压缩插件

var concat = require('gulp-concat');//文件合并插件

var annotate = require('gulp-ng-annotate');//angular 压缩打包支持插件

var less = require('gulp-less');//编译less文件的插件

var cssmin = require('gulp-minify-css');//css文件压缩插件

var minimist = require('minimist');//用于获取命令行输入参数插件

var del = require('del');//删除文件&目录插件

var zip = require('gulp-zip');//zip压缩插件

var ftp = require('gulp-ftp');//ftp插件

var sequence = require('run-sequence');//任务串行插件

var moment = require('moment');//操作时间的插件




/***************************    全局常量     ***********************/
var global = {
    path: {
        input:{//配置需要打包的目录
            html:['src/**/*.html'],
            js:['src/*.js','src/business/**/*.js'],
            css:['src/**/*.css'],
            image:['src/assets/img/*'],
            fonts:['src/assets/fonts/*'],
            copy:['src/**/*.*.less','src/assets/js/**/*','src/assets/lib/**/*']
        },
        output:{//输出目录
            dist:'dist',
            lib:'dist/assets/lib'
        }
    }
}

/***************************** 定义任务 **************************/


//压缩HTML
gulp.task('htmlmin', function () {
    var options = {
        collapseWhitespace: true,//压缩HTML
        collapseBooleanAttributes: true,//省略布尔属性的值 <input checked="true"/> ==> <input />
        removeEmptyAttributes: true,//删除所有空格作属性值 <input id="" /> ==> <input />
        removeScriptTypeAttributes: true,//删除<script>的type="text/javascript"
        removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
        minifyJS: true,//压缩页面JS
        minifyCSS: true//压缩页面CSS
    };
    return gulp.src(global.path.input.html)
        .pipe(htmlmin(options))
        .pipe(gulp.dest(global.path.output.dist))//gulp dest是输出
});


//压缩JS
gulp.task('jsmin', function (done) {
    return gulp.src(global.path.input.js)
        .pipe(annotate({single_quotes: true}))
        .pipe(uglify())
        .pipe(concat('index.min.js'))
        .pipe(gulp.dest(global.path.output.dist))
});


//压缩合并css
gulp.task('cssmin', function () {
    return gulp.src(global.path.input.css)
        .pipe(cssmin())
        .pipe(concat('index.min.css'))
        .pipe(gulp.dest(global.path.output.dist))
});

//复制
gulp.task('copy', function (done) {
    return gulp.src(global.path.input.copy)
        .pipe(gulp.dest(global.path.output.lib))
});

gulp.task('zip_new', function () {
    var timeStamp = moment().format("YYYY-MM-D_HH-mm-ss_");
    return gulp.src(config.input.zip)
        .pipe(zip("dist_" + timeStamp + ".zip"))
        .pipe(gulp.dest(config.output.dist));
});

gulp.task('ftp', function () {
    gulp.src("dist_zip/*")
        .pipe(ftp({
            host: 'someHost',
            port: 21,
            //user: 'anonymous',
            //pass:null,
            remotePath: "somePath/"
        }));
});

gulp.task('publish', function (callback) {
    runSequence(['html', 'js','less', 'copy'],'zip_new',ftp,callback);
});
