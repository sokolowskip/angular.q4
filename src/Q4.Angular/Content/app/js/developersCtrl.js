'use strict';

var q4AngularControllers = angular.module('q4AngularControllers', []);

q4AngularControllers.controller('developersCtrl', function developersCtrl($scope, Developer) {
    $scope.developers = Developer.query();
});

q4AngularControllers.controller('developersDetailCtrl', function developersDetailCtrl($scope, Developer, $routeParams, $location) {
    $scope.create = function () {
        var developer = new Developer({
            firstName: $scope.developer.firstName,
            lastName: $scope.developer.lastName,
            birthDate: $scope.developer.birthDate
        });

        developer.$save(function() {
            $location.path("developers");
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

