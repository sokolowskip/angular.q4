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

q4AngularApp.directive("addfeature", function () {
    return {
        scope: {
           onadd: "&"
        },
        template: '<button role="button" class="btn btn-primary btn-lg active" ng-click="toggleContent()" ng-show="isAddButtonVisible">Add feature</button>'+
                  '<div ng-hide="isAddButtonVisible" class="container"><div class="row"><div class="col-sm-5"><input type="text" class="form-control" ng-model="name" placeholder="New feature name..." /></div><div class="col-sm-1"><span class="accept-action glyphicon glyphicon-saved" ng-click="accept()"></span><span class="reject-action glyphicon glyphicon-remove" ng-click="toggleContent()"></span></div></div></div>',
        link: function(scope, element, attrs) {
            scope.isAddButtonVisible = true;

            scope.toggleContent = function() {
                scope.isAddButtonVisible = !scope.isAddButtonVisible;
            };

            scope.accept = function () {
                scope.onadd({ name: scope.name });
                scope.name = '';
                scope.toggleContent();
            };

        }
        
    };
});