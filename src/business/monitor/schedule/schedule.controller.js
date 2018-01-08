angular.module("monitor").controller("scheduleCtrl", ['$scope','$timeout','Alert','commonService', 'monitorService',
    function($scope,$timeout,Alert,commonService, monitorService) {

        /************  辅助函数 ***********/
        function  initParams() {
            var params = angular.copy($scope.query);
            if(params.type == -1){
                params.type = null;
            }
            if(params.status == -1){
                params.status = null;
            }
            return params;
        }
        /****************  初始化变量 *********************/
        //default
        $scope.query = commonService.baseQuery();//query params
        $scope.query.type = -1;
        $scope.query.status = -1;
        $scope.query.name = null;
        $scope.query.pageSize = 10;

        //data
        $scope.types = [];//types
        $scope.tableData = []; //table data


        /************* 事件 *********************/
        /**
         * 清除参数
         */
        $scope.clearQuery = function(){
            $scope.query.type = -1;
            $scope.query.status = -1;
            $scope.query.name = null;
        }

        /**
         * 查询
         */
        function search(){
            var params = initParams();
            var service = function () {
                return monitorService.queryJobLogs(params);
            }
            var callback = function (e) {
                $scope.tableData = e.data.response;
                $scope.pagination = e.data.query;
            }
            Alert.doService("获取任务日志",service,callback);
        }

        $scope.search = function () {
            search();
        }

        /**
         * 加载任务类型
         */
        function initJobTypes() {
            var service = function () {
                return monitorService.allJobTypes();
            }
            var callback = function (e) {
                $scope.types = e.data.response;
            }
            Alert.doService("获取任务类型",service,callback);
        }

        /**
         * 初始化执行
         */
        function initTable(){
            initJobTypes();
            search();
        }

        /*******************分页相关******************/
        $scope.goPage = function (pageNow) {
            $scope.query.pageNow = pageNow;
            search();
        }
        $scope.selectPageSize = function(pageSize){
            $scope.query.pageSize = pageSize;
            $scope.query.pageNow = 1;
            search();
        }

        /**
         * 执行初始化
         */
        initTable();

        /**
         * 定时刷新
         */
        var _timeout;
        var _timeRunning = true;
        var timer_joblog = function() {
            var params = initParams();
            monitorService.queryJobLogs(params).then(function(e){
                if(e.data.success){
                    if (JSON.stringify($scope.tableData) != JSON.stringify(e.data.response)) {
                        $scope.tableData = e.data.response;
                        $scope.pagination = e.data.query;
                    }
                    if (_timeRunning) {
                        _timeout = $timeout(timer_joblog, 5000);
                    }
                }
            },function(e){
                if (_timeRunning) {
                    _timeout = $timeout(timer_joblog, 5000);
                }
            });
        }
        $scope.$on(
            "$destroy",
            function(e) {
                $timeout.cancel(_timeout);
                _timeRunning = false;
            }
        );
        //_timeout = $timeout(timer_joblog, 5000);
}])