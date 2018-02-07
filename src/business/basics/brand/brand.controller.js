angular.module("basics").controller("basicsBrandCtrl", ['$scope','$timeout','$modal','commonService', 'Alert','basicsService',
    function($scope,$timeout,$modal,commonService,Alert, basicsService) {

        /************  辅助函数 ***********/


        /****************  初始化变量 *********************/
        //default
        $scope.query = commonService.baseQuery();//query params
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
         * 查询
         */
        function search(){
            var service = function () {
                return basicsService.brand.query($scope.query);
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
         * 编辑
         * @param id 品牌
         */
        $scope.showEditModal = function (id,size) {
            var service = function () {
                return basicsService.brand.selectById(id);
            }
            var callback = function (resp) {
                var brand = resp.data.response;
                var modalInstance = $modal.open({
                    templateUrl : 'CreateOrUpdateBrandModal.html',
                    size:size,
                    controller : function ($modalInstance, $scope,params) {
                        $scope.brand = params.brand;
                        $scope.createOrUpdateTitle = '修改品牌信息';
                        $scope.ok = function () {
                            Alert.doService("保存品牌信息",function(){
                                return basicsService.brand.update( $scope.brand.brandId, $scope.brand);
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
                                brand:brand
                            };
                        }
                    }
                });
            }
            Alert.doService("获取品牌["+ id +"]",service,callback);
        }


        /**
         * 创建
         */
        $scope.showCreateModal = function (size) {
            var modalInstance = $modal.open({
                templateUrl : 'CreateOrUpdateBrandModal.html',
                size:size,
                controller : function ($modalInstance, $scope,params) {
                    // todo 品牌LOGO和类目需要修改，目前先写死
                    $scope.brand = {
                        logo:8,
                        logoUrl:"",
                        categoryId:2,
                        categoryName:null,
                        name:null
                    };
                    $scope.createOrUpdateTitle = '新增品牌';
                    $scope.ok = function () {
                        Alert.doService("保存品牌信息",function(){
                            return basicsService.brand.create($scope.brand);
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
         * @param id 品牌
         */
        $scope.delete = function (id,name) {
            var service = function () {
                return basicsService.brand.del(id);
            }
            var callback = function (res) {
                search();
            }
            Alert.confirmDoServiceAndCallback("删除","是否删除" + name + "？",service,callback);
        }



        /**
         * 启用、禁用
         * @param id
         * @param enable
         */
        $scope.changeEnable = function (id) {
            var service = function () {
                return basicsService.brand.enable(id);
            }
            var callback = function (e) {
                search();
            }
            Alert.doService("禁用/启用品牌",service,callback);
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
