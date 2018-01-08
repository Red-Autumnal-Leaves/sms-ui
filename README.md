# KShop manage web ui.

KShop商城后台前端框架


## 目录说明

index.html 为web入口, 引用必要的js和css

app.html 为登录后显示的主体页面, 通过路由嵌套在index.html中, 主要包含main navbar和siderbar

login.html 为登录页面, 通过路由嵌套在index.html中

config.app.js 为module全局app的相关设置

config.constant.js 为静态参数设置

config.router.js 为路由配置

config.service.js 为公共服务

assets 为静态资源文件夹,包含css(样式)、images(图片)、js(模板自带插件)、lib(引入的插件)

business 为业务模块文件夹

components 为页面组件文件夹

## 新建一个模块文件夹结构和命名规范

为了团队更高效的合作, 开发者负责一个新模块, 创建新模块文件夹和文件名上有一定的规范要求. 示例如下:

文件夹 applications

applications.html 模块的视图文件,主要是展现的html代码片段, 也叫模板文件

applications.controller.js 控制器文件, 负责模块的逻辑控制, 通过service获取数据和发送数据, 将数据展现在视图上, 或从视图上获取数据提交给后台.

applications.service.js 服务文件, 负责与后端的REST接口通信, 接收数据和发送数据.

新模块必须要有以上3类文件. 模块的视图文件和控制器文件如有多个, 命名为applications-xxx.html application-xxx.controller.js

## 新模块的路由

项目框架使用UI-Router进行前端路由. 路由的配置定义在config.router.js. 下面的例子把applications.html定义在url:index.html#/app/demo/applications

```js
$stateProvider.state('app.demo',{
    url:'/demo',
    template:'<div ui-view></div>'
});
```
```js
$stateProvider.state('app.demo.applications', {
    url: '/applications',       //显示url里面的地址名称, 和状态最后一级名称相同
    title: '应用',
    templateUrl:LoadHtml('business/applications.html'),     //模板文件
    controller:'applications_ctrl',             //控制器名称(如果在这里定义了控制器名称,则模板文件中无需再写ng-controller)
    resolve: {          //加载模板文件时, 需要加载的服务文件和控制器文件
        deps:['$ocLazyLoad',function($ocLazyLoad){
            return $ocLazyLoad.load({
                files:[
                    'business/applications.controller.js',
                    'business/applications.service.js'
                ]
            });
        }]
    }
});
```

## 本地开发调试项目

依赖于Nginx,配置Nginx和config.constant.js：

config.constant.js
```
app.constant("AppConfig", {
    HostUrl:'sm/v1/'
});
```

```
server {
        listen       80;
        server_name  localhost;
        root F:\GitLab\KShop\sms-ui;#本地项目路径
        location /sm/v1 {
             proxy_set_header Host $host;
             proxy_set_header X-Real-IP $remote_addr;
             proxy_set_header REMOTE-HOST $remote_addr;
             proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
             proxy_pass    http://localhost:8080/sm/v1/;#接口地址
        }
        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
        }

    }
```


