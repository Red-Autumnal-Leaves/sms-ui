angular.module("login").controller("loginCtrl", ['$scope','$rootScope','commonService',
    function($scope,$rootScope,commonService) {
        $scope.form = {};
        $scope.login = function(){
            commonService.login($scope.form).then(function(e){
                if(e.data.success){
                    $rootScope.user = e.data.response;
                    $rootScope.user.token = e.data.response.token;//存储token信息
                    $rootScope.$state.go('app.home');
                }else{
                    $scope.msg = e.data.msg;
                    $scope.form = {};
                }
            },function(e){
                $scope.msg = "系统错误";
                $scope.form = {};
            });
        };
}])