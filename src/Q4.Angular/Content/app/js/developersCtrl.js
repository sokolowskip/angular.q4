'use strict';

var q4AngularControllers = angular.module('q4AngularControllers', []);

q4AngularControllers.controller('developersCtrl', function developersCtrl($scope, Developer) {
    $scope.developers = Developer.query();
});

q4AngularControllers.controller('developersDetailCtrl', function developersDetailCtrl($scope, Developer, $routeParams, $location) {
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
        $scope.developer = Developer.get({ developerId: $routeParams.developerId });
    };

    $scope.update = function () {
        console.log($scope.developer.BirthDate);
        $scope.developer.$update({ developerId: $routeParams.developerId });
    };
});

