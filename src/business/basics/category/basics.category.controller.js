angular.module("basics").controller("basicsCategoryCtrl", ['$scope','$timeout','$modal','commonService', 'Alert','basicsService',
    function($scope,$timeout,$modal,commonService,Alert, basicsService) {

        /************  辅助函数 ***********/
        /**
         * 函数转换tree
         * @param data
         */
        function trans(data){
            var treeData = [];
            if(!data || data.length  == 0){
                return [];
            }
            for(var index in data){
                var item = data[index];
                treeData.push(transNode(item));
            }
            return treeData;
        }

        /**
         * 节点转换
         * @param data
         */
        function transNode(data){
            var node = {
                label:data.name,
                data:getNodeData(data),
                children:[]
            }
            node = initChildrens(node,data.childrens);
            return node;
        }

        function initChildrens(data,childrens){
            if(childrens == null || childrens.length  == 0){
                return;
            }
            for(var index in childrens){
                var child = childrens[index];
                var node = {
                    label:child.name,
                    data:getNodeData(child),
                    children:[]
                }
                data.children.push(node)
                initChildrens(node,child.childrens);
            }
            return data;
        }

        /**
         * 转换节点data
         * @param item
         */
        function getNodeData(item){
            var  data = {
                categoryId:item.categoryId,
                name:item.name,
                parentId:item.parentId
            }
            return data;
        }


        /****************  初始化变量 *********************/
        $scope.tree = {};

        /****************  初始化函数 *********************/

        function init(){
            //init all categories tree
            var service = function () {
                return commonService.categoryAllTree();
            }
            var callback = function (resp) {
                if(resp.data.success){
                    $scope.tree.data = trans(resp.data.response);
                }
            }
            Alert.doService("获取基础类目信息",service,callback);
        }

        init();


        $scope.treeData = [{"label":"护肤美容","data":{"categoryId":1,"name":"护肤美容","parentId":0},"children":[{"label":"面部护理","data":{"categoryId":2,"name":"面部护理","parentId":1},"children":[]}]}];


    }])
