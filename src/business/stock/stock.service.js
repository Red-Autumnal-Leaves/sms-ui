angular.module('stock').factory('stockService', ['$http', '$filter',  'commonService',function($http,  $filter,commonService) {
    return {
        query:function (data) {
            var req = {
                method: "GET",
                url: commonService.getServerAuthUrl("stock/query",data)
            };
            return $http(req);
        },
    };
}]);