

angular.module('mainApp')
    .factory('todoData', function($resource,$q,$http) {
        /*return $resource('app/data/todo.json',{ }, {
         getData: {method:'GET', isArray: false}
         });*/

        //var db = ('http://localhost:3000/db/:todoList',{todoList:'@todoList'});
        var res = $resource('http://localhost:3000/db',{todoList:'@todoList'});
        var res1 = $resource('http://localhost:3000/todoList',null);
        var deleteService = $resource('http://localhost:3000/todoList/:id',null);
        function  postData(obj){
            var defer1 = $q.defer();
            res1.save({},obj,function(response){
                defer1.resolve(response);
            },function(error){
                defer1.reject(error);
            });

            return defer1.promise;
        }

        function  deleteData(id){
            var defer2 = $q.defer();
            deleteService.delete({id : id},{},function(response){
                defer2.resolve(response);
            },function(error){
                defer2.reject(error);
            });

            return defer2.promise;
        }

        function getData(){
            var defer = $q.defer();
            res.get('',{},function(response){
                defer.resolve(response);
            },function(error){
                defer.reject(error);
            });

            return defer.promise;
        }
        return {getData:getData,postData:postData,deleteData:deleteData};
        /*
         :function (param){
         var defer1 = $q.defer();
         $http.post('http://localhost:3000/posts',param).success(function(){
         defer1.resolve(response);
         }).error(function(error){
         defer1.reject(error);
         });

         return defer1.promise;
         }};
         */

    });


