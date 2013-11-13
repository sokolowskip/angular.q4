'use strict';

var q4AngularControllers = angular.module('q4AngularControllers', ['q4AngularServices.global']);

q4AngularControllers.controller('loginCtrl', function($scope, $http, Base64, User) {
    $scope.login = {};
    $scope.login.user = null;

    $scope.login.connect = function () {
        $http.get('api/users').success(function (data, status) {
            if (status < 200 || status >= 300)
                return;
            User.setCurrent(data);
        });
    };

    $scope.login.disconnect = function () {
        User.setCurrent(null);
    };

    $scope.$watch('login.login + login.password', function () {
        $http.defaults.headers.common['Authorization'] = 'Basic ' + Base64.encode($scope.login.login + ':' + $scope.login.password);
    });
});

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

