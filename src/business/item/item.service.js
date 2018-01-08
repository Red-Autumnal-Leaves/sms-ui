angular.module('item').factory('itemService', ['$http', '$filter',  'commonService',function($http,  $filter,commonService) {
    return {
        /***************  商品相关 *********************/
        item:{
            query:function (data) {
                var req = {
                    method: "GET",
                    url: commonService.getServerAuthUrl("item/query",data)
                };
                return $http(req);
            },
        },
        /***************  sku 相关 *********************/
        sku:{

        },

    };
}]);