'use strict';


angular.module('mainApp')
    .controller('todoController',
        function ($scope,todoData,$location){

            $scope.go = function ( path ) {
                $location.path( path );
            };
            $scope.sortorder  = 'name';
            todoData
                .getData()
                .then(function(res){
                    console.log(res);
                    $scope.todolist=res.todoList;
                },function(err){
                    console.log(err)
                });

            $scope.cancel = function(){
                $location.path('/viewList');
            };

            $scope.save = function(newEntry){
                todoData.postData(newEntry);
                console.log(newEntry);
            };

            $scope.delete = function(id) {
                if (confirm('Are you sure to remove')) {
                    todoData.deleteData(id)
                        .then(function(response){
                            angular.forEach($scope.todolist,function(val,key){
                                if(val.id == id){
                                    $scope.todolist.splice(key, 1);
                                }
                            })
                        },function(error){

                        });
                }
            }
        });


/*angular.module('mainApp')
 .controller('todoController', function(todoData, $scope) {
 $scope.todolist = todoData.getData();
 console.log($scope.todolist);
 });*/
