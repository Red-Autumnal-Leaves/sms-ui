
module.exports = function(grunt){

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

       /* jshint:{
            options: {
                curly: false,
                undef: true,
            },
            files: {
                src: ['src/!*.js', 'src/bussiness/!**!/!*.js']
            },
        },*/


        //合并CSS 和 JS
        concat: {
            options:{
                stripBanners:true,
                banner:'/*!<%= pkg.name %> - <%= pkg.version %>-'+'<%=grunt.template.today("yyyy-mm-dd") %> */'
            },
            cssConcat:{
                src:['src/**/*.css'],
                dest:'dest/css/app-<%= pkg.version %>.css'
            },
            jsConcat:{
                src:'src/**/*.js',
                dest:'dest/js/app-<%= pkg.version %>.js'
            }
        },

        //压缩css
        cssmin:{
            options:{
                stripBanners:true,
                banner:'/*!<%= pkg.name %> - <%= pkg.version %>-'+'<%=grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build:{
                src:'dest/css/app-<%= pkg.version %>.css',
                dest:'dest/css/app-<%= pkg.version %>.min.css'
            }
        },

        //压缩js
        jshint:{
            options:{
                stripBanners:true,
                boss: false,
                curly: false,		//循环或者条件语句必须使用花括号包围
                undef: true,		//变量未定义
                unused: false,		//变量未使用
                eqeqeq: false,		//强制使用三等号
                lastsemic: false,	//检查一行代码最后声明后面的分号是否遗漏
                banner:'/*!<%= pkg.name %> - <%= pkg.version %>-'+'<%=grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build:{
                src:'dest/js/app-<%= pkg.version %>.js',
                dest:'dest/js/app-<%= pkg.version %>.min.js'
            }
        },

        //watch自动化
        watch:{
            build:{
                files:['src/js/*.js','src/css/*.css'],
                tasks:['jshint','csslint','concat','cssmin','uglify'],
                options:{spawn:false}
            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-csslint');
    grunt.loadNpmTasks('grunt-contrib-watch');


    grunt.registerInitTask('check',['jshint']);//进行语法检查

    grunt.registerInitTask('build',['concat','cssmin','jshint']);//css合并
};