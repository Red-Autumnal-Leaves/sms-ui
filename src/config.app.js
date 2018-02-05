'use strict';
// 模块组件
var app = angular.module('app', [
        'ngAnimate',
        'ngCookies',
        'ngStorage',
        'ui.router',
        'oc.lazyLoad',
        'ui.layout',
        'ngAnimate',
        'ui.bootstrap',
        'ui.load',
        'ui.jq',
        'pascalprecht.translate',
        'app.filters',
        'app.directives',
        'toaster',

        //业务模块
        'login',
        'home',
        'monitor',
        'sales',
        'item',
        'stock',
        'member',
        'basics'
]);
//初始化
app.run([ '$rootScope', '$state', '$stateParams',function ($rootScope,   $state,   $stateParams) {
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
        if(!$rootScope.user){
            $rootScope.user = {};//用户信息
        }
    }
]);

//全局Controller
app.controller('AppCtrl', ['$rootScope','$scope', '$translate', '$localStorage', '$window','AppConfig','commonService', function($rootScope ,$scope,$translate,  $localStorage,$window ,AppConfig,commonService) {

    /**
     * 对IE支持
     */
    var isIE = !!navigator.userAgent.match(/MSIE/i);
    isIE && angular.element($window.document.body).addClass('ie');
    isSmartDevice( $window ) && angular.element($window.document.body).addClass('smart');

    /**
     * 全局参数初始化
     * @type {{name: string, version: string, color: {primary: string, info: string, success: string, warning: string, danger: string, light: string, dark: string, black: string}, settings: {themeID: number, navbarHeaderColor: string, navbarCollapseColor: string, asideColor: string, headerFixed: boolean, asideFixed: boolean, asideFolded: boolean}}}
     */
    $scope.app = {
        name: AppConfig.app.name,
        version: AppConfig.app.version,
        color: {
            primary: '#7266ba',
            info:    '#23b7e5',
            success: '#27c24c',
            warning: '#fad733',
            danger:  '#f05050',
            light:   '#e8eff0',
            dark:    '#3a3f51',
            black:   '#1c2b36'
        },
        settings: {
            themeID: 1,
            navbarHeaderColor: 'bg-black',
            navbarCollapseColor: 'bg-white-only',
            asideColor: 'bg-black',
            headerFixed: true,
            asideFixed: true,
            asideFolded: false
        },
        offsidebarOpen: false,
    }

    /**
     * 设置相关初始化
     */
    if ( angular.isDefined($localStorage.settings) ) {
        $scope.app.settings = $localStorage.settings;
    } else {
        $localStorage.settings = $scope.app.settings;
    }
    $scope.$watch('app.settings', function(){ $localStorage.settings = $scope.app.settings; }, true);

    /**
     * 国际化设置
     * @type {{isopen: boolean}}
     */
    $scope.lang = { isopen: false };
    $scope.langs = {en:'English',ch_zn:"简体中文"};
    $scope.selectLang = $scope.langs[$translate.proposedLanguage()] || "简体中文";
    $scope.setLang = function(langKey, $event) {
        $scope.selectLang = $scope.langs[langKey];//设置当前语言
        $translate.use(langKey);//i18n设置
        $scope.lang.isopen = !$scope.lang.isopen;
    };

    /**
     * 分辨率相关
     * @param $window
     * @returns {boolean}
     */
    function isSmartDevice( $window ){
        var ua = $window['navigator']['userAgent'] || $window['navigator']['vendor'] || $window['opera'];
        return (/iPhone|iPod|iPad|Silk|Android|BlackBerry|Opera Mini|IEMobile/).test(ua);
    }

    /**
     * 获取用户是否登录
     */
    commonService.getToken().then(function(e){
        if(e.data.success){
            $rootScope.user = e.data.response;
            $localStorage.user = e.data.response;
        }
        else{
            $rootScope.$state.go('access.login',{reload: true});
        }
    },function(e){
        $rootScope.$state.go('access.login',{reload: true});
    });

    /**
     * 注销
     */
    $scope.logout = function(){
        commonService.logout().then(function(){
            $localStorage.user= {};
            $rootScope.$state.go("access.login");
        },function(){
            $rootScope.$state.go("access.login");
        });
    };



}])


/**
 * 国际化配置
 */
app.config(['$translateProvider', function($translateProvider){

    $translateProvider.useStaticFilesLoader({
        prefix: 'assets/i18n/',
        suffix: '.json'
    });

    // default
    $translateProvider.preferredLanguage('ch_zn');

    //
    $translateProvider.useLocalStorage();

}]);

/**
 * 解决跨域设置 将token设置到header
 */
app.config(['$httpProvider',function($httpProvider){
    $httpProvider.interceptors.push(['$rootScope', '$q','$localStorage', function ($rootScope, $q,$localStorage) {
        return {
            request: function (config) {
                config.headers = config.headers || {};
                if($localStorage.user){
                   // config.headers.token = $localStorage.user.token;
                }
                return config;
            },

            response: function (response) {

                return response || $q.when(response);
            },

            responseError: function (response) {

                return $q.reject(response);
            }
        }
    }])
}])

/**
 * jQuery 插件配置，自定义directives
 * key自定义指令key
 * value: jquery插件js,css
 */
app.constant('JQ_CONFIG', {


})
.constant('MODULE_CONFIG', {
        select2:[
                    'assets/js/jquery/select2/select2.css',
                    'assets/js/jquery/select2/select2-bootstrap.css',
                    'assets/js/jquery/select2/select2.min.js',
                    'assets/js/modules/ui-select2.js'
                ]
});