angular.module("basics").controller("basicsCatalogCtrl", ['$scope','$timeout','$modal','commonService', 'Alert','basicsService',
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
                    data:getNodeData(child,data),
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
        function getNodeData(item,parent){
            var _parent = parent ? parent.data : defaultParentData;
            var  data = {
                catalogId:item.catalogId,
                name:item.name,
                logo:item.logo,
                image:item.logoUrl,
                levl:item.levl,
                parentId:item.parentId,
                parent: _parent
            }
            return data;
        }

        /****************  初始化变量 *********************/
        $scope.tree = {
            selectNode:onTreeSelectNode,
            delete:deleteSelectedNode
        };
        var defaultParentData = {
            catalogId:0,
            name:"根目录",
            logo:0,
            image:"assets/img/const/default-upload.jpg",
            levl:0,
            parentId:0
        };
        $scope.tree.selectedNode = {
            catalogId:0,
            name:"",
            logo:0,
            levl:0,
            image:"assets/img/const/default-upload.jpg",
            parentId:0,
            parent:defaultParentData
        };

        /****************  初始化函数 *********************/

        function init(){
            //init all categories tree
            var service = function () {
                return commonService.catalogAllTree();
            }
            var callback = function (resp) {
                if(resp.data.success){
                   console.log(resp.data.response);
                   $scope.tree.data = trans(resp.data.response);
                }
            }
            Alert.doService("获取前端目录信息",service,callback);
        }
        init();

        /*************************************  事件 **********************/
        $scope.showModal = function(type,size){
            var isCreate = (type == 'create');
            var modalInstance = $modal.open({
                templateUrl : 'CreateOrUpdateCatalogModal.html',
                size:size,
                controller : function ($modalInstance, $scope,params) {
                    $scope.title = isCreate ? '创建目录信息' : '编辑目录';
                    $scope.selectedNode  = params.selectedNode;
                    $scope.ok = function () {
                        var data = {
                            name:$scope.selectedNode.name,
                            parentId:$scope.selectedNode.parentId,
                            levl:$scope.selectedNode.levl,
                            logo:$scope.logo,
                            catalogId:$scope.selectedNode.catalogId
                        }
                        var service;
                        if(type == 'create'){
                            service = function(){
                                return basicsService.catalog.create(data);
                            }
                        }else{
                            service = function(){
                                return basicsService.catalog.update(data);
                            }
                        }
                        var callback = function (resp) {
                            if(resp.data.success){
                                $modalInstance.dismiss('cancel');
                                fulshTree();
                            }
                        }
                        Alert.doService($scope.title,service,callback);
                    };
                    $scope.cancel = function () {
                        $modalInstance.dismiss('cancel');
                    }
                },
                resolve : {
                    params:function () {
                        return {
                            selectedNode :{
                                catalogId: isCreate ? 0 : $scope.tree.selectedNode.catalogId,
                                name: isCreate ? '' : $scope.tree.selectedNode.name,
                                logo: isCreate ? 0 : $scope.tree.selectedNode.logo,
                                levl: isCreate ? 0 : $scope.tree.selectedNode.levl,
                                image: isCreate ? "assets/img/const/default-upload.jpg" : $scope.tree.selectedNode.image,
                                parentId: isCreate ? $scope.tree.selectedNode.catalogId : $scope.tree.selectedNode.parentId,
                                parent: isCreate ?  $scope.tree.selectedNode : $scope.tree.selectedNode.parent
                            }

                        };
                    }
                }
            });
        }

        function onTreeSelectNode(node){
            if(node){
                $scope.tree.selectedNode = node.data;
            }
        }

        function deleteSelectedNode (){
            var service = function () {
                return basicsService.catalog.delNode($scope.tree.selectedNode.catalogId);
            }
            var callback = function (resp) {
                if(resp.data.success){
                    fulshTree();
                }
            }
            Alert.confirmDoServiceAndCallback("删除","是否删除" + $scope.tree.selectedNode.name + "？",service,callback);
        }
    
        function fulshTree() {
            $scope.tree.data = null;
            var service = function () {
                return commonService.catalogAllTree();
            }
            var callback = function (resp) {
                if(resp.data.success){
                    $scope.tree.data = trans(resp.data.response);
                }
            }
            Alert.doService("获取前端目录信息",service,callback);
        }
}])
