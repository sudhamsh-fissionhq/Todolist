'use strict';

angular.module('mainApp',['ui.router','ngResource'])

.config(function($stateProvider,$locationProvider,$urlRouterProvider) {

    $stateProvider
        .state('viewList', {
            url: '/viewList',
            templateUrl: 'app/templates/viewList.html',
            controller: 'todoController'
        })
        .state('createNew', {
            url: '/createNew',
            templateUrl: 'app/templates/createNew.html',
           /* controller:function(){
                console.log('its hit');
            }*/
        })
        // ABOUT PAGE AND MULTIPLE NAMED VIEWS =================================
        .state('/viewList.html', {
            // we'll get to this in a bit
        });
    //$locationProvider.html5Mode(false);
    $urlRouterProvider.otherwise('/viewList');
});
