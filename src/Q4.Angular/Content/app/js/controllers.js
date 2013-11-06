'use strict';

var q4AngularControllers = angular.module('q4AngularControllers', []);

q4AngularControllers.controller('developersCtrl', function developersCtrl($scope) {
    $scope.ctrlName = 'Developers controller.';
});

q4AngularControllers.controller('projectsCtrl', function projectsCtrl($scope) {
    $scope.ctrlName = 'Projects controller.';
});