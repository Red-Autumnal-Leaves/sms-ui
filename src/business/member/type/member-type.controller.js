angular.module("member").controller("memberTypeCtrl", ['$scope','$timeout','$modal','commonService', 'Alert','memberService',
    function($scope,$timeout,$modal,commonService,Alert, memberService) {

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
         * 编辑模态框
         */
        $scope.showEditModal = function (id,size) {
            var service = function () {
                return memberService.memberType.queryById(id);
            }
            var callback = function (resp) {
                var methodType = resp.data.response;
                var modalInstance = $modal.open({
                    templateUrl : 'EditMemberTypeModal.html',
                    size:size,
                    controller : function ($modalInstance, $scope,params) {
                        $scope.methodType = params.methodType;
                        $scope.ok = function () {
                            $modalInstance.dismiss('cancel');
                        };
                        $scope.cancel = function () {
                            $modalInstance.dismiss('cancel');
                        }
                    },
                    resolve : {
                        params:function () {
                            return {
                                methodType:methodType
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
                return memberService.memberType.query(params);
            }
            var callback = function (e) {
                $scope.tableData = e.data.response;
                $scope.pagination = e.data.query;
            }
            Alert.doService("获取会员级别信息",service,callback);
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
