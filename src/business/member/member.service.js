angular.module('member').factory('memberService', ['$http', '$filter',  'commonService',function($http,  $filter,commonService) {
    return {
        /******************  会员级别相关 **************************/
        memberType:{
            query:function (data) {
                var req = {
                    method: "GET",
                    url: commonService.getServerAuthUrl("memberType/query",data)
                };
                return $http(req);
            },
            queryById:function (id) {
                var req = {
                    method: "GET",
                    url: commonService.getServerAuthUrl("memberType/" + id)
                };
                return $http(req);
            },
            update:function (id,data) {
                var req = {
                    method: "PUT",
                    url: commonService.getServerAuthUrl("memberType/" + id,data),
                    data:data
                };
                return $http(req);
            },
            add:function (data) {
                var req = {
                    method: "POST",
                    url: commonService.getServerAuthUrl("memberType/add",data),
                    data:data
                };
                return $http(req);
            }
        }
    };
}]);