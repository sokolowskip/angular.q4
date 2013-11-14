'use strict';

var q4AngularControllers = angular.module('q4AngularControllers', []);

q4AngularControllers.controller('loginCtrl', function ($scope, $http, Base64, User, $location) {
    $scope.login = {};
    $scope.user = null;
    console.log("from login ctrl");
    console.log(User.getCurrent());
    var u = User.getCurrent();
    if (!!u) {
        $scope.login.user = u;
        $scope.login.login = u.Login;
        $scope.login.password = u.Password;
        $location.path('mytasks');
    }
    

    $scope.login.connect = function () {
        console.log("try to login");
        $http.get('api/users').success(function (data, status) {
            console.log("login successful");
            if (status < 200 || status >= 300)
                return;
            User.setCurrent(data);
            $scope.login.user = User.getCurrent();
            $location.path('mytasks');
        });
    };

    $scope.login.disconnect = function () {
        User.setCurrent(null);
        $scope.login.user = null;
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
        $scope.developer.$update({ developerId: $routeParams.developerId });
    };
});

q4AngularControllers.controller('featuresCtrl', function featuresCtrl($scope, $routeParams, Project) {
    
});

q4AngularControllers.controller('featureDetailsCtrl', function featureDetailsCtrl($scope, $routeParams, Feature) {
    $scope.findOne = function () {
        $scope.feature = Feature.get({ featureId: $routeParams.featureId });
    };

    $scope.update = function () {
        $scope.feature.$update({ featureId: $routeParams.featureId });
    };
});

q4AngularControllers.controller('tasksCtrl', function tasksCtrl($scope, Developer, Project, Task, FeaturesByProject, $location) {
    $scope.featuresVisible = false;
    $scope.task = {};
    $scope.projects = Project.query();

    $scope.developers = Developer.query();

    $scope.create = function () {
        var task = new Task({
            Name: $scope.task.Name,
            ExpectedWorkload: $scope.task.ExpectedWorkload,
            DueDate: $scope.task.DueDate,
            Description: $scope.task.Description,
            Developer: $scope.task.Developer,
            Feature: $scope.task.Feature
        });

        task.$save(function() {
            $location.path('mytasks');
        });
    };

    $scope.onProjectChanged = function () {
        $scope.task.Feature = null;
        $scope.features = FeaturesByProject.query({ projectId: $scope.project.ProjectId });
        $scope.featuresVisible = true;
    };
});

q4AngularControllers.controller('myTasksCtrl', function myTasksCtrl($scope, User, $http) {

    $scope.loadList = function () {
        if (!User.getCurrent())
            return;
        $http.get('/api/TasksForDeveloper/' + User.getCurrent().DeveloperId).success(function (data) {
            $scope.tasks = data;
        });
    };

    $scope.changeState = function (task, operation) {
        $http.put('/TaskManagament/' + operation + '/' + task.TaskId).success(function(data) {
            task.Status = data;
        });
    };
});


q4AngularControllers.controller('projectsCtrl', function projectsCtrl($scope, Project) {
    $scope.projects = Project.query();
});

q4AngularControllers.controller('newProjectCtrl', function newProjectsCtrl($scope, Project, $location) {
    $scope.create = function () {

        var project = new Project({
            name: $scope.project.name,
            clientName: $scope.project.clientName,
            technology: $scope.project.technology
        });

        project.$save(function () {
            $location.path('projects');
        });
    };
});

q4AngularControllers.controller('detailProjectCtrl', function detailProjectsCtrl($scope, $routeParams, Project, Feature) {
    $scope.findOne = function () {
        $scope.project = Project.get({ projectId: $routeParams.projectId });
    };

    $scope.update = function () {
        $scope.project.$update({ projectId: $routeParams.projectId });
    };
    
    Project.queryTasksPerStatus({ projectId: $routeParams.projectId }, function (data) {
        $scope.tasksPerStatus = data.map(function (single) {
            return {
                y: single.Count,
                name: single.StatusName
            };
        });
    });

    Project.queryFinishedTasksPerDay({ projectId: $routeParams.projectId }, function (data) {
        $scope.finishedTasksPerDay = data.map(function (single) {
            return {
                y: single.Count,
                x: new Date(single.Date)
            };
        });
    });
    
    $scope.features = Project.queryFeatures({ projectId: $routeParams.projectId });

    $scope.addFeature = function (name) {
        var feature = new Feature({
            Name: name,
            ProjectId: $routeParams.projectId
        });

        feature.$save(function () {
            $scope.features.push(feature);
        });
    };
});
