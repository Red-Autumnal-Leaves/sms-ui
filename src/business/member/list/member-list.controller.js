angular.module("member").controller("memberListCtrl", ['$scope','$timeout','$modal','commonService', 'Alert','memberService',
    function($scope,$timeout,$modal,commonService,Alert, memberService) {

        /************  辅助函数 ***********/
        function  initParams() {
            var params = angular.copy($scope.query);
            return params;
        }

        /****************  初始化变量 *********************/
        //default
        $scope.query = commonService.baseQuery();//query params
        $scope.query.name = null;
        $scope.query.pageSize = 10;
        //data
        $scope.tableData = []; //table data

        /************* 事件 *********************/
        /**
         * 清除参数
         */
        $scope.clearQuery = function(){
            $scope.query.name = null;
        }


        /**
         * 查询
         */
        function search(){
            var params = initParams();
            var service = function () {
                return memberService.member.query(params);
            }
            var callback = function (e) {
                $scope.tableData = e.data.response;
                $scope.pagination = e.data.query;
            }
            Alert.doService("获取会员信息",service,callback);
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
