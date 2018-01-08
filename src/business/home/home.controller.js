angular.module("home").controller("homeCtrl", ['$scope', 'homeService',
    function($scope, homeService) {

    var name = "sms";
    console.log(homeService.hello(name));

}])