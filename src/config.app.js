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
        'ui.validate',
        'pascalprecht.translate',
        'angularBootstrapNavTree',
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
        'basics',
        'table'
]);
//初始化
app.run([ '$rootScope', '$state', '$stateParams',function ($rootScope,   $state,   $stateParams) {
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
        $rootScope.user = {};//用户信息
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
            $rootScope.user.token = e.data.response.token;//存储token信息
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

    // Register a loader for the static files
    // So, the module will search missing translation tables under the specified urls.
    // Those urls are [prefix][langKey][suffix].
    $translateProvider.useStaticFilesLoader({
        prefix: 'assets/i18n/',
        suffix: '.json'
    });

    // Tell the module what language to use by default
    $translateProvider.preferredLanguage('ch_zn');

    // Tell the module to store the language in the local storage
    $translateProvider.useLocalStorage();

}]);

/**
 * jQuery 插件配置，自定义directives
 * key自定义指令key
 * value: jquery插件js,css
 */
app.constant('JQ_CONFIG', {
        easyPieChart:   ['assets/js/jquery/charts/easypiechart/jquery.easy-pie-chart.js'],
        sparkline:      ['assets/js/jquery/charts/sparkline/jquery.sparkline.min.js'],
        plot:           [
                            'assets/js/jquery/charts/flot/jquery.flot.min.js',
                            'assets/js/jquery/charts/flot/jquery.flot.resize.js',
                            'assets/js/jquery/charts/flot/jquery.flot.tooltip.min.js',
                            'assets/js/jquery/charts/flot/jquery.flot.spline.js',
                            'assets/js/jquery/charts/flot/jquery.flot.orderBars.js',
                            'assets/js/jquery/charts/flot/jquery.flot.pie.min.js'
                        ],
        slimScroll:     ['assets/js/jquery/slimscroll/jquery.slimscroll.min.js'],
        sortable:       ['assets/js/jquery/sortable/jquery.sortable.js'],
        nestable:       [
                            'assets/js/jquery/nestable/jquery.nestable.js',
                            'assets/js/jquery/nestable/nestable.css'
                        ],
        filestyle:      ['assets/js/jquery/file/bootstrap-filestyle.min.js'],
        slider:         [
                            'assets/js/jquery/slider/bootstrap-slider.js',
                            'assets/js/jquery/slider/slider.css'
                        ],
        chosen:         [
                            'assets/js/jquery/chosen/chosen.jquery.min.js',
                            'assets/js/jquery/chosen/chosen.css'
                        ],
        TouchSpin:      [
                            'assets/js/jquery/spinner/jquery.bootstrap-touchspin.min.js',
                            'assets/js/jquery/spinner/jquery.bootstrap-touchspin.css'
                        ],
        wysiwyg:        [
                            'assets/js/jquery/wysiwyg/bootstrap-wysiwyg.js',
                            'js/jquery/wysiwyg/jquery.hotkeys.js'
                        ],
        dataTable:      [
                            'assets/js/jquery/datatables/jquery.dataTables.min.js',
                            'assets/js/jquery/datatables/dataTables.bootstrap.js',
                            'assets/js/jquery/datatables/dataTables.bootstrap.css'
                        ],
        vectorMap:      [
                            'assets/js/jquery/jvectormap/jquery-jvectormap.min.js',
                            'assets/js/jquery/jvectormap/jquery-jvectormap-world-mill-en.js',
                            'assets/js/jquery/jvectormap/jquery-jvectormap-us-aea-en.js',
                            'assets/js/jquery/jvectormap/jquery-jvectormap.css'
                        ],
        footable:       [
                            'assets/js/jquery/footable/footable.all.min.js',
                            'assets/js/jquery/footable/footable.core.css'
                        ],

})
.constant('MODULE_CONFIG', {
        select2:[
                    'assets/js/jquery/select2/select2.css',
                    'assets/js/jquery/select2/select2-bootstrap.css',
                    'assets/js/jquery/select2/select2.min.js',
                    'assets/js/modules/ui-select2.js'
                ]
});