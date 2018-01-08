angular.module('basics').factory('basicsService', ['$http', '$filter',  'commonService',function($http,  $filter,commonService) {
    return {
        /******************  catalog相关 **************************/
        catalog :{
            create:function(data){
                var req = {
                    method: "POST",
                    url: commonService.getServerAuthUrl("catalog/add"),
                    data:data
                };
                return $http(req);
            },
            update:function(data){
                var req = {
                    method: "PUT",
                    url: commonService.getServerAuthUrl("catalog/" + data.catalogId),
                    data:data
                };
                return $http(req);
            },
            delNode: function (catalogId) {
                var req = {
                    method: "DELETE",
                    url: commonService.getServerAuthUrl("catalog/" +catalogId),
                };
                return $http(req);
            }
        },
        brand:{
            query:function(data){
                var req = {
                    method: "GET",
                    url: commonService.getServerAuthUrl("brand/query",data),
                    data:data
                };
                return $http(req);
            },
            selectById: function(brandId){
                var req = {
                    method: "GET",
                    url: commonService.getServerAuthUrl("brand/" + brandId)
                };
                return $http(req);
            },
            update:function(brandId,data){
                var req = {
                    method: "PUT",
                    url: commonService.getServerAuthUrl("brand/" + brandId),
                    data:data
                };
                return $http(req);
            },
            create:function(data){
                var req = {
                    method: "POST",
                    url: commonService.getServerAuthUrl("brand/add"),
                    data:data
                };
                return $http(req);
            },
            del:function(brandId){
                var req = {
                    method: "DELETE",
                    url: commonService.getServerAuthUrl("brand/" + brandId),
                };
                return $http(req);
            },
            enable:function(brandId){
                var req = {
                    method: "PUT",
                    url: commonService.getServerAuthUrl("brand/enable/" + brandId),
                };
                return $http(req);
            }

        }
    };
}]);