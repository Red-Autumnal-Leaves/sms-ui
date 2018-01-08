angular.module('sales').factory('salesService', ['$http', '$filter',  'commonService',function($http,  $filter,commonService) {
    return {
        /******************  支付方式相关 **************************/
        payMethod :{
            query : function (data) {//查询
                var req = {
                    method: "GET",
                    url: commonService.getServerAuthUrl("payMethod/query",data)
                };
                return $http(req);
            },
            enable:function (id) {
                var req = {
                    method: "PUT",
                    url: commonService.getServerAuthUrl("payMethod/enable/" + id)
                };
                return $http(req);
            },
            queryById : function(methodId) {
                var req = {
                    method: "GET",
                    url: commonService.getServerAuthUrl("payMethod/" + methodId)
                };
                return $http(req);
            },
            update:function(data){
                var req = {
                    method: "PUT",
                    url: commonService.getServerAuthUrl("payMethod/" + data.id),
                    data:data
                };
                return $http(req);
            }
        },
        /************************  物流方式相关 *****************************/
        express:{
            query:function (data) {
                var req = {
                    method: "GET",
                    url: commonService.getServerAuthUrl("express/query",data)
                };
                return $http(req);
            },
            queryById : function(expressId){
                var req = {
                    method: "GET",
                    url: commonService.getServerAuthUrl("express/" + expressId)
                };
                return $http(req);
            },
            update:function (expressId,data) {
                var req = {
                    method: "PUT",
                    url: commonService.getServerAuthUrl("express/" + expressId),
                    data:data
                };
                return $http(req);
            },
            add : function (data) {
                var req = {
                    method: "POST",
                    url: commonService.getServerAuthUrl("express/add"),
                    data:data
                };
                return $http(req);
            },
            del : function (expressId) {
                var req = {
                    method: "DELETE",
                    url: commonService.getServerAuthUrl("express/" + expressId)
                };
                return $http(req);
            },
            batchDelete : function (ids) {
                var req = {
                    method: "DELETE",
                    url: commonService.getServerAuthUrl("express/batch/" + ids)
                };
                return $http(req);
            }
        }
    };
}]);