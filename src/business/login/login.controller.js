angular.module("login").controller("loginCtrl", ['$scope','$rootScope','$localStorage','commonService',
    function($scope,$rootScope,$localStorage,commonService) {
        $scope.form = {};
        $scope.login = function(){
            commonService.login($scope.form).then(function(e){
                if(e.data.success){
                    $rootScope.user = e.data.response;
                    $rootScope.$state.go('app.home');
                    $localStorage.user = e.data.response;
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