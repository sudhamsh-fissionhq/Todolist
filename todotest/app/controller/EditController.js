'use strict';

angular.module('mainApp')
    .controller('modalController',
        function ($scope,$uibModal,$log,$rootScope){
            $scope.todo = {
                firstName : "sudhamsh",
                lastName : "kodam",
                fullName : function (){
                    var todoObject;
                    todoObject = $scope.todo;
                    return todoObject.firstName + " " + todoObject.lastName;
                }
            };
            $scope.allList = [
                {id:1,name:'task 1', desc:'description', date :'nov 12, 2015', time : '12:12PM'},
                {id:2,name:'task 2', desc:'description', date :'nov 13, 2015', time : '12:14PM'},
                {id:3,name:'task 3', desc:'description', date :'nov 14, 2015', time : '12:16PM'},
                {id:4,name:'task 4', desc:'description', date :'nov 15, 2015', time : '12:10PM'}
            ];

            $scope.delete = function(index){
                if(confirm("Are you sure to remove Customer")){
                    angular.forEach($scope.allList, function(value, key) {
                        if (value.id === index){
                            $scope.allList.splice(key, 1);
                        }
                    });
                }
            };

            $scope.items = ['item1', 'item2', 'item3'];

            $scope.animationsEnabled = true;

            $scope.open = function (size) {

                var modalInstance = $uibModal.open({
                    animation: $scope.animationsEnabled,
                    templateUrl: 'app/modal.html',
                    controller: 'ModalInstanceCtrl',
                    size: size,
                    resolve: {
                        items: function () {
                            return $scope.items;
                        }
                    }
                });

                modalInstance.result.then(function (selectedItem) {
                    $scope.selected = selectedItem;
                }, function () {
                    $log.info('Modal dismissed at: ' + new Date());
                });
            };

            $scope.toggleAnimation = function () {
                $scope.animationsEnabled = !$scope.animationsEnabled;
            };

            $scope.edit = function (obj,type) {
                var modalInstance = $uibModal.open({
                    animation: $scope.animationsEnabled,
                    templateUrl: 'app/EditModal.html',
                    controller: 'EditModalInstanceCtrl',
                    size: '',
                    resolve: {
                        editObj: obj,
                        type:type
                    }
                });

                modalInstance.result.then(function (selectedItem) {
                    $scope.selected = selectedItem;
                }, function () {
                    $log.info('Modal dismissed at: ' + new Date());
                });
            };

            $scope.toggleAnimation = function () {
                $scope.animationsEnabled = !$scope.animationsEnabled;
            };

            $rootScope.$on('newobj',function(event,obj){
                $scope.allList.push(obj);
                console.log(event,obj,"in on");
            });

            $rootScope.$on('updObj',function(event,editObj){
                angular.forEach($scope.allList, function(value, key) {
                    if (value.id === index){
                        $scope.allList.splice(key, 1);
                    }
            });

        })

    .controller('ModalInstanceCtrl', function ($scope, $uibModalInstance, items,$rootScope) {
        $scope.user = {};
        $scope.items = items;
        $scope.selected = {
            item: $scope.items[0]
        };

        $scope.ok = function () {
            $uibModalInstance.close($scope.selected.item);
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };

        $scope.save = function(){
            $rootScope.$emit('newobj',$scope.user);
        }
    })

    .controller('EditModalInstanceCtrl', function ($scope, $uibModalInstance,$rootScope,editObj){

            $scope.edituser = editObj;
            console.log(editObj,"items");
            $scope.save = function(){
                $rootScope.$emit('updObj',$scope.edituser);
            };

            $scope.cancel = function () {
                $uibModalInstance.dismiss('cancel');
            };
        }
    );
