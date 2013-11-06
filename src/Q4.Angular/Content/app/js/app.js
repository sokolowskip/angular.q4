'use strict';

var q4AngularApp = angular.module('q4AngularApp', [
    'ngRoute',
    'q4AngularControllers',
    'ui.bootstrap']);

q4AngularApp.config([
    '$routeProvider',
    function($routeProvider) {
        $routeProvider
            .when('/developers/new', {
                templateUrl: 'Content/app/views/developers/create.html',
                controller: 'developersCtrl'
            })
            .when('/developers', {
                templateUrl: 'Content/app/views/developers/list.html',
                controller: 'developersCtrl'
            })
            .when('/projects', {
                templateUrl: 'Content/app/views/projects-list.html',
                controller: 'projectsCtrl'
            })
            .otherwise({
                redirectTo: '/developers'
            });
    }
]);