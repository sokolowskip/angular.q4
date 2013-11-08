'use strict';

var q4AngularApp = angular.module('q4AngularApp', [
    'ngRoute',
    'q4AngularControllers',
    'q4AngularServices',
    'ui.bootstrap']);

q4AngularApp.config([
    '$routeProvider',
    function($routeProvider) {
        $routeProvider
            .when('/developers/new', { templateUrl: 'Content/app/views/developers/create.html', controller: 'developersDetailCtrl' })
            .when('/developers/:developerId/edit', { templateUrl: 'Content/app/views/developers/edit.html', controller: 'developersDetailCtrl' })
            .when('/developers', {  templateUrl: 'Content/app/views/developers/list.html', controller: 'developersCtrl' })
            .when('/projects', { templateUrl: 'Content/app/views/projects/list.html', controller: 'projectsCtrl' })
            .when('/projects/new', { templateUrl: 'Content/app/views/projects/new.html', controller: 'newProjectCtrl' })
            .when('/projects/:projectId/edit', { templateUrl: 'Content/app/views/projects/edit.html', controller: 'detailProjectCtrl' })
            .when('/features/:projectId/new', { templateUrl: 'Content/app/views/features/new.html' })
            .otherwise({ redirectTo: '/developers' });
    }
]);