"use strict"
/**
 * 路由设置
 */
app.config(['$stateProvider', '$urlRouterProvider', '$controllerProvider', '$compileProvider', '$filterProvider','$ocLazyLoadProvider', '$provide','JS_REQUIRES',
    function ($stateProvider,   $urlRouterProvider,   $controllerProvider,   $compileProvider,   $filterProvider, $ocLazyLoadProvider,  $provide,JS_REQUIRES) {
        app.controller = $controllerProvider.register;
        app.directive  = $compileProvider.directive;
        app.filter     = $filterProvider.register;
        app.factory    = $provide.factory;
        app.service    = $provide.service;
        app.constant   = $provide.constant;
        app.value      = $provide.value;

        // LAZY MODULES
        $ocLazyLoadProvider.config({
            debug: false,
            modules: JS_REQUIRES
        });

        //模块路由定义
        $urlRouterProvider.otherwise('/app/home');//默认

        $stateProvider
            .state('app', {
                abstract: true,
                url: '/app',
                templateUrl: 'app.html'
            })
            .state('access', {
                url: '/access',
                template: '<div ui-view class="fade-in-right-big smooth"></div>'
            })
    }
]);

/**
 * 登录
 *
 */
angular.module('login', []).config(function($stateProvider) {
    $stateProvider
        .state('access.login', {
            url:"/login",
            controller:'loginCtrl',
            templateUrl: "business/login/login.html",
            resolve: new LoadModules(["access.login"]),
        });
});

/**
 * 首页
 */
angular.module('home', []).config(function($stateProvider) {
    $stateProvider
        .state('app.home', {
            url:"/home",
            controller:'homeCtrl',
            templateUrl: "business/home/home.html",
            resolve: new LoadModules(["app.home"]),
        });
});

/**
 * 表格
 */
angular.module('table', []).config(function($stateProvider) {
    $stateProvider
        .state('app.table', {
            url:"/table",
            controller:'tableCtrl',
            templateUrl: "business/table/table.html",
            resolve: new LoadModules(["app.table"]),
        });
});


/**
 * 监控
 */
angular.module('monitor', []).config(function($stateProvider) {
    $stateProvider
        .state('app.monitor', {
            url:"/monitor",
            template: '<div ui-view class="fade-in-up"></div>',
            ncyBreadcrumb: {
                skip: true
            }
        })
        .state('app.monitor.schedule', {
            url: "/schedule",
            controller: "scheduleCtrl",
            templateUrl: "business/monitor/schedule/schedule.html",
            resolve: new LoadModules(["app.monitor.schedule"])
        });
});

//三级目录
angular.module('tree', []).config(function($stateProvider) {
    $stateProvider
        .state('app.tree', {
            url:"/tree",
            controller:'treeCtrl',
            templateUrl: "business/tree/tree.html",
            resolve: new LoadModules(["app.tree"])
        });
});

/**
 * 基础设置
 */
angular.module('basics', []).config(function($stateProvider) {
    $stateProvider
        .state('app.basics', {
            url:"/basics",
            template: '<div ui-view class="fade-in-up"></div>',
            ncyBreadcrumb: {
                skip: true
            }
        })
        .state('app.basics.category', {
            url: "/category",
            controller: "basicsCategoryCtrl",
            templateUrl: "business/basics/category/basics.category.html",
            resolve: new LoadModules(["app.basics.category"])
        })
        .state('app.basics.catalog', {
            url: "/catalog",
            controller: "basicsCatalogCtrl",
            templateUrl: "business/basics/catalog/basics.catalog.html",
            resolve: new LoadModules(["app.basics.catalog"])
        })
        .state('app.basics.brand', {
            url: "/brand",
            controller: "basicsBrandCtrl",
            templateUrl: "business/basics/brand/brand.html",
            resolve: new LoadModules(["app.basics.brand"])
        });
});

/**
 * 销售管理
 */
angular.module('sales', []).config(function($stateProvider) {
    $stateProvider
        .state('app.sales', {
            url:"/sales",
            template: '<div ui-view class="fade-in-up"></div>',
            ncyBreadcrumb: {
                skip: true
            }
        })
        .state('app.sales.paymethod', {//支付方式
            url: "/paymethod",
            controller: "payMethodCtrl",
            templateUrl: "business/sales/paymethod/pay-method.html",
            resolve: new LoadModules(["app.sales.paymethod"])
        })
        .state('app.sales.express', {//物流方式
            url: "/express",
            controller: "expressCtrl",
            templateUrl: "business/sales/express/express.html",
            resolve: new LoadModules(["app.sales.express"])
        });
});

/**
 * 会员
 */
angular.module('member', []).config(function($stateProvider) {
    $stateProvider
        .state('app.member', {
            url:"/member",
            template: '<div ui-view class="fade-in-up"></div>',
            ncyBreadcrumb: {
                skip: true
            }
        })
        .state('app.member.list', {
            url:"/list",
            controller: "memberListCtrl",
            templateUrl: "business/member/list/member-list.html",
            resolve: new LoadModules(["app.member.list"])
        })
        .state('app.member.type', {//会员类型
            url: "/type",
            controller: "memberTypeCtrl",
            templateUrl: "business/member/type/member-type.html",
            resolve: new LoadModules(["app.member.type"])
        });
});

/**
 * 商品资料
 */
angular.module('item', []).config(function($stateProvider) {
    $stateProvider
        .state('app.item', {
            url:"/item",
            template: '<div ui-view class="fade-in-up"></div>',
            ncyBreadcrumb: {
                skip: true
            }
        })
        .state('app.item.list', {
            url: "/list",
            controller: "itemCtrl",
            templateUrl: "business/item/item/item.html",
            resolve: new LoadModules(["app.item.list"])
        })
});

/**
 * 库存
 */
angular.module('stock', []).config(function($stateProvider) {
    $stateProvider
        .state('app.stock', {
            url:"/stock",
            template: '<div ui-view class="fade-in-up"></div>',
            ncyBreadcrumb: {
                skip: true
            }
        })
        .state('app.stock.list', {
            url: "/list",
            controller: "stockCtrl",
            templateUrl: "business/stock/stock.html",
            resolve: new LoadModules(["app.stock.list"])
        });
});

function LoadModules(js_list){
    return{
        load: ['$ocLazyLoad', function($ocLazyLoad) {
            return $ocLazyLoad.load(js_list);
        }]
    };
}

var _JS_REQUIRES = [
    {
        name: 'access.login',
        files: [
            'business/login/login.controller.js'
        ]
    },
    {
        name: 'app.home',
        files: [
            'business/home/home.service.js',
            'business/home/home.controller.js'
        ]
    },
    {
        name: 'app.table',
        files: [
            'business/table/table.service.js',
            'business/table/table.controller.js'
        ]
    },
    {
        name: 'app.monitor.schedule',
        files: [
            'business/monitor/monitor.service.js',
            'business/monitor/schedule/schedule.controller.js'
        ]
    },
    {
        name: 'app.sales.paymethod',
        files: [
            'business/sales/sales.service.js',
            'business/sales/paymethod/pay-method.controller.js'
        ]
    },
    {
        name: 'app.sales.express',
        files: [
            'business/sales/sales.service.js',
            'business/sales/express/express.controller.js'
        ]
    },
    {
        name: 'app.member.list',
        files: [
            'business/member/member.service.js',
            'business/member/list/member-list.controller.js'
        ]
    },
    {
        name: 'app.member.type',
        files: [
            'business/member/member.service.js',
            'business/member/type/member-type.controller.js'
        ]
    },
    {
        name: 'app.basics.category',
        files: [
            'business/basics/basics.service.js',
            'business/basics/category/basics.category.controller.js'
        ]
    },
    {
        name: 'app.basics.catalog',
        files: [
            'business/basics/basics.service.js',
            'business/basics/catalog/basics.catalog.controller.js'
        ]
    },
    {
        name: 'app.basics.brand',
        files: [
            'business/basics/basics.service.js',
            'business/basics/brand/brand.controller.js'
        ]
    },
    {
        name: 'app.item.list',
        files: [
            'business/item/item.service.js',
            'business/item/item/item.controller.js'
        ]
    },
    {
        name: 'app.stock.list',
        files: [
            'business/stock/stock.service.js',
            'business/stock/stock.controller.js'
        ]
    },
    {
        name: 'app.tree',
        files: [
            'business/tree/tree.service.js',
            'business/tree/tree.controller.js'
        ]
    }

];




// 对JS 进行初始化处理
function initJsRequires(){
    var timestamp =  new Date().getTime();
    for(var i = 0; i < _JS_REQUIRES.length ; i++){
        for(var j = 0 ; j < _JS_REQUIRES[i].files.length; j ++){
            _JS_REQUIRES[i].files[j] += "?v=" + timestamp;
        }
    }
}
initJsRequires();



app.constant('JS_REQUIRES',_JS_REQUIRES);


