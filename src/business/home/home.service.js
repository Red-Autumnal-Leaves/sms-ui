angular.module('home').factory('homeService', ['$http', '$filter',  function($http,  $filter) {
    return {
        hello:function(name){
            return "hello " + name;
        }
    };
}]);