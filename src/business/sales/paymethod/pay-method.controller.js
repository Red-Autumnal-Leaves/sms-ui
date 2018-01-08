angular.module("sales").controller("payMethodCtrl", ['$scope','$timeout','$modal','commonService', 'Alert','salesService',
    function($scope,$timeout,$modal,commonService,Alert, salesService) {

        /************  辅助函数 ***********/
        function  initParams() {
            var params = angular.copy($scope.query);
            if(params.status == -1){
                params.isEnable = null;
            }else{
                params.isEnable =   params.status ;
            }
            return params;
        }

        /****************  初始化变量 *********************/
        //default
        $scope.query = commonService.baseQuery();//query params
        $scope.query.name = null;
        $scope.query.appId = null;
        $scope.query.mchId = null;
        $scope.query.status = -1;
        $scope.query.pageSize = 10;
        //data
        $scope.tableData = []; //table data

        /************* 事件 *********************/
        /**
         * 清除参数
         */
        $scope.clearQuery = function(){
            $scope.query.name = null;
            $scope.query.appId = null;
            $scope.query.mchId = null;
            $scope.query.status = -1;
        }

        /**
         * 启用、禁用
         * @param id
         * @param enable
         */
        $scope.changeEnable = function (id) {
            var service = function () {
                return salesService.payMethod.enable(id);
            }
            var callback = function (e) {
                search();
            }
            Alert.doService("禁用/启用支付方式",service,callback);
        }

        /**
         * 编辑模态框
         */
        $scope.showEditModal = function (id,size) {
            var service = function () {
                return salesService.payMethod.queryById(id);
            }
            var callback = function (resp) {
                var payMethod = resp.data.response;
                var modalInstance = $modal.open({
                    templateUrl : 'EditPayMethodModal.html',
                    size:size,
                    controller : function ($modalInstance, $scope,params) {
                        $scope.method = params.method;
                        $scope.ok = function () {
                            Alert.doService("编辑支付方式",function(){
                                return salesService.payMethod.update($scope.method);
                            },function (re) {
                                $modalInstance.dismiss('cancel');
                                search();
                            });
                        };
                        $scope.cancel = function () {
                            $modalInstance.dismiss('cancel');
                        }
                    },
                    resolve : {
                        params:function () {
                            return {
                                method:payMethod
                            };
                        }
                    }
                });
            }
            Alert.doService("获取支付方式["+ id +"]",service,callback);
        }

        /**
         * 查询
         */
        function search(){
            var params = initParams();
            var service = function () {
                return salesService.payMethod.query(params);
            }
            var callback = function (e) {
                $scope.tableData = e.data.response;
                $scope.pagination = e.data.query;
            }
            Alert.doService("获取支付方式信息",service,callback);
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
