'use strict';

var q4AngularApp = angular.module('q4AngularApp', [
    'ngRoute',
    'q4AngularControllers',
    'ui.bootstrap']);

q4AngularApp.config([
    '$routeProvider',
    function($routeProvider) {
        $routeProvider
            .when('/developers', {
                templateUrl: 'Content/app/partials/developers-list.html',
                controller: 'developersCtrl'
            })
            .when('/projects', {
                templateUrl: 'Content/app/partials/projects-list.html',
                controller: 'projectsCtrl'
            })
            .otherwise({
                redirectTo: '/developers'
            });
    }
]);