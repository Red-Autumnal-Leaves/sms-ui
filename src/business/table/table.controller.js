angular.module("table").controller("tableCtrl", ['$scope', 'tableService',
    function($scope, tableService) {

        var name = "table";

        console.log(tableService.hello(name))

}])