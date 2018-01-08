angular.module('table').factory('tableService', ['$http', '$filter',  function($http,  $filter) {
    return {
        hello:function(name){
            return "hello " + name;
        }
    };
}]);