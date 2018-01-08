angular.module('monitor').factory('monitorService', ['$http', '$filter',  'commonService',function($http,  $filter,commonService) {
    return {
        /******************  调度相关 **************************/
        //获取所有job类型
        allJobTypes : function () {
            var req = {
                method: "GET",
                url: commonService.getServerAuthUrl("monitor/schedule/types")
            };
            return $http(req);
        },
        queryJobLogs:function (data) {
            var req = {
                method: "GET",
                url: commonService.getServerAuthUrl("monitor/schedule/query",data)
            };
            return $http(req);
        }

    };
}]);