angular.module("stock").controller("stockCtrl", ['$scope','$timeout','$modal','commonService', 'Alert','stockService',
    function($scope,$timeout,$modal,commonService,Alert, stockService) {

        /************  辅助函数 ***********/


        /****************  初始化变量 *********************/
        //query params
        $scope.query = commonService.baseQuery();
        $scope.selectItems = []//复选框
        $scope.tableData = []; //table data

        /************* 事件 *********************/
        /**
         * 清除参数
         */
        $scope.clearQuery = function(){
            $scope.query = commonService.baseQuery();
        }

        /**
         * 查询
         */
        function search(){
            var service = function () {
                return stockService.query($scope.query);
            }
            var callback = function (e) {
                $scope.tableData = e.data.response;
                $scope.pagination = e.data.query;
                $scope.selectItems = [];
            }
            Alert.doService("获取商品信息",service,callback);
        }
        $scope.search = function () {
            search();
        }

        /**
         * 初始化执行
         */
        function initTable(){
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

    }])