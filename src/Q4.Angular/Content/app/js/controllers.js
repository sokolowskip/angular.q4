'use strict';

var q4AngularControllers = angular.module('q4AngularControllers', []);

q4AngularControllers.controller('developersCtrl', function developersCtrl($scope, $http) {
  
    $http.get('api/developers').success(function (data) {
        console.log('getAll');
        $scope.developers = data;
    });
  
});

q4AngularControllers.controller('developersDetailCtrl', function developersDetailCtrl($scope, $http, $routeParams, $location) {
    $scope.create = function () {
        console.group("developer");
        console.log($scope.developer.firstName);
        console.log($scope.developer.lastName);
        console.log($scope.developer.birthDate);
        console.groupEnd("developer");

        $http.post('api/developers', $scope.developer).success(function() {
            $location.path('#/developers');
        });
    };

    $scope.findOne = function () {
        console.group("findOne");
        console.log("findOne() invoked");
        console.log($routeParams.developerId);
        console.groupEnd("findOne");
        $http.get('api/developers/' + $routeParams.developerId).success(function (data) {
            console.log(data);
            $scope.developer = data;
        });
    };

    $scope.update = function () {
        console.group("update");
        console.log("update() invoked");
        console.log($scope.developer);
        console.groupEnd("update");
        $http.put('api/developers/' + $routeParams.developerId, $scope.developer);
    };
});

q4AngularControllers.controller('projectsCtrl', function projectsCtrl($scope) {
    $scope.ctrlName = 'Projects controller.';
    
    $scope.singleModel = 1;

    $scope.radioModel = 'Middle';

    $scope.checkModel = {
        left: false,
        middle: true,
        right: false
    };
});