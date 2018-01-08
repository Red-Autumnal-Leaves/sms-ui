angular.module("sales").controller("expressCtrl", ['$scope','$timeout','$modal','commonService', 'Alert','salesService',
    function($scope,$timeout,$modal,commonService,Alert, salesService) {

        /************  辅助函数 ***********/


        /****************  初始化变量 *********************/
        //default
        $scope.query = commonService.baseQuery();//query params
        $scope.query.keyword = null;
        $scope.query.pageSize = 10;
        $scope.selectItems = []//复选框
        $scope.tableData = []; //table data

        /************* 事件 *********************/
        /**
         * 清除参数
         */
        $scope.clearQuery = function(){
            $scope.query.keyword = null;
        }

        /**
         * 编辑
         * @param id 物流Id
         */
        $scope.showEditModal = function (id,size) {
            var service = function () {
                return salesService.express.queryById(id);
            }
            var callback = function (resp) {
                var express = resp.data.response;
                var modalInstance = $modal.open({
                    templateUrl : 'EditExpressModal.html',
                    size:size,
                    controller : function ($modalInstance, $scope,params) {
                        $scope.express = params.express;
                        $scope.ok = function () {
                            Alert.doService("保存物流方式",function(){
                                return salesService.express.update($scope.express.expressId,$scope.express);
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
                                express:express
                            };
                        }
                    }
                });
            }
            Alert.doService("获取物流信息["+ id +"]",service,callback);
        }

        /**
         * 新增
         */
        $scope.showCreateModal = function (size) {
            var modalInstance = $modal.open({
                templateUrl : 'CreateExpressModal.html',
                size:size,
                controller : function ($modalInstance, $scope) {
                    $scope.express = {};
                    $scope.ok = function () {
                        Alert.doService("创建物流方式",function(){
                            return salesService.express.add($scope.express);
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

                        };
                    }
                }
            });
        }

        /**
         * 删除
         * @param id
         * @param name
         */
        $scope.delete = function (id,name) {
            var service = function () {
                return salesService.express.del(id);
            }
            var callback = function (res) {
                search();
            }
            Alert.confirmDoServiceAndCallback("删除","是否删除" + name + "？",service,callback);
        }

        /**
         * 批量删除
         */
        $scope.deleteSelected = function () {
            var ids = [];
            if($scope.selectItems){
                for(var i=0; i< $scope.selectItems.length;i++){
                    if($scope.selectItems[i]){
                        if($scope.selectItems[i] == -1 || $scope.selectItems[i] == false ){
                            continue;
                        }
                        ids.push($scope.selectItems[i]);
                    }
                }
            }
            if(ids && ids.length > 0){
                var service = function () {
                    return salesService.express.batchDelete(ids);
                }
                var callback = function (res) {
                    search();
                }
                Alert.confirmDoServiceAndCallback("删除","是否删除选中物流方式？",service,callback);
            }
        }
        /**
         * 查询
         */
        function search(){
            var service = function () {
                return salesService.express.query($scope.query);
            }
            var callback = function (e) {
                $scope.tableData = e.data.response;
                $scope.pagination = e.data.query;
                $scope.selectItems = [];
            }
            Alert.doService("获取物流方式信息",service,callback);
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
