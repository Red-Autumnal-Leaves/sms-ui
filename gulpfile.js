
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

var moment = require('moment');//操作时间的插件

var webserver = require('gulp-webserver');//web server


/***************************    全局常量     ***********************/
var global = {
    path: {
        input:{//配置需要打包的目录
            html:['src/**/*.html'],
            css:['src/assets/css/**/*.css'],
            configJs:['src/*.js'],
            businessJs:['src/business/**/*.js'],
            image:['src/assets/img/**/*'],
            i18n:['src/assets/i18n/**/*'],
            fonts:['src/assets/fonts/*'],
            lib:['src/assets/lib/**/*']
        },
        output:{//输出目录
            dist:'dist',
            css:'dist/assets/css',
            business:'dist/business',
            lib:'dist/assets/lib',
            image:'dist/assets/img',
            i18n:'dist/assets/i18n'
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
gulp.task('configJsMin', function (done) {
    return gulp.src(global.path.input.configJs)
        .pipe(annotate({single_quotes: true}))
        .pipe(uglify())
        .pipe(gulp.dest(global.path.output.dist));
});

gulp.task('businessJsMin', function (done) {
    return gulp.src(global.path.input.businessJs)
        .pipe(annotate({single_quotes: true}))
        .pipe(uglify())
        .pipe(gulp.dest(global.path.output.business));
});


gulp.task('jsmin',['configJsMin','businessJsMin']);


//压缩合并css
gulp.task('cssmin', function () {
    return gulp.src(global.path.input.css)
        .pipe(cssmin({keepBreaks: true}))
        .pipe(gulp.dest(global.path.output.css));
});


gulp.task('lib', function () {
    return gulp.src(global.path.input.lib).pipe(gulp.dest(global.path.output.lib));
});

gulp.task('img', function () {
    return gulp.src(global.path.input.image).pipe(gulp.dest(global.path.output.image));
});

gulp.task('i18n', function () {
    return gulp.src(global.path.input.i18n).pipe(gulp.dest(global.path.output.i18n));
});


gulp.task('copy',['lib','img','i18n']);


gulp.task('start', function(){
    return gulp.src(['src']).pipe(webserver({
            port: 3888,
            livereload: true,
            open: true,
            proxies: [
                {
                    source: '/sms/v1', target: 'http://47.96.7.95:8083/ral/sms/v1'
                }
            ]
        }));
});

gulp.task('build',['htmlmin','cssmin','jsmin','copy']);

