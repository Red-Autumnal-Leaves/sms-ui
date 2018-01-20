# RAL-SHOP

RAL-SHOP商城后台前端框架


## 项目结构说明

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

## 新模块文件夹结构以及命名规范

为了团队更高效的合作, 开发者负责一个新模块, 创建新模块文件夹和文件名上有一定的规范要求. 示例如下:

文件夹 applications

applications.html 模块的视图文件,主要是展现的html代码片段, 也叫模板文件

applications.controller.js 控制器文件, 负责模块的逻辑控制, 通过service获取数据和发送数据, 将数据展现在视图上, 或从视图上获取数据提交给后台.

applications.service.js 服务文件, 负责与后端的REST接口通信, 接收数据和发送数据.

新模块必须要有以上3类文件. 模块的视图文件和控制器文件如有多个, 命名为applications-xxx.html application-xxx.controller.js

## 模块路由

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

## 开发&调试

1. 安装nodejs环境, <a href="http://example.com" target="_blank">[下载地址]</a>

2. 配置国内淘宝镜像, 命令行执行如下命令，可能时间会稍微有点长，需要一些耐心：
``` 
npm install -g cnpm --registry=https://registry.npm.taobao.org
```
3. 进入项目根目录，下载相关依赖插件，命令如下：
```
cnpm install
```

4. 启动项目:

```
cnpm run start
```




