'use strict';

var q4AngularControllers = angular.module('q4AngularControllers', ['q4AngularServices.global']);

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
        console.log($scope.developer.BirthDate);
        $scope.developer.$update({ developerId: $routeParams.developerId });
    };
});

q4AngularControllers.controller('featuresCtrl', function featuresCtrl($scope, $routeParams, Feature, FeaturesByProject) {
    $scope.features = FeaturesByProject.query({ projectId: $routeParams.projectId });

    $scope.addFeature = function (name) {
        console.log("add feature invoked!!!");
        console.log(name);

        var feature = new Feature({
            Name: name,
            ProjectId: $routeParams.projectId
        });

        feature.$save(function () {
            $scope.features.push(feature);
        });
    };
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
        console.group('create task');
        console.log($scope.task);

        var task = new Task({
            Name: $scope.task.Name,
            ExpectedWorkload: $scope.task.ExpectedWorkload,
            DueDate: $scope.task.DueDate,
            Description: $scope.task.Description,
            Developer: $scope.task.Developer,
            Feature: $scope.task.Feature
        });

        console.log(task);

        task.$save(function() {
            $location.path('mytasks');
        });
        console.groupEnd('create task');
    };

    $scope.onProjectChanged = function () {
        console.group("onProjectChanged");
        console.log($scope.task);
        console.log($scope.project);

        $scope.task.Feature = null;
        $scope.features = FeaturesByProject.query({ projectId: $scope.project.ProjectId });
        $scope.featuresVisible = true;

        console.groupEnd("onProjectChanged");
    };
});

q4AngularControllers.controller('myTasksCtrl', function myTasksCtrl($scope, User, $http) {

    $scope.loadList = function () {
        if (!User.getCurrent())
            return;
        console.log('User from myTasks Ctrl:');
        console.log(User.getCurrent());
        $http.get('/api/TasksForDeveloper/' + User.getCurrent().DeveloperId).success(function (data) {
            console.log('get my tasks');
            console.log(data);
            $scope.tasks = data;
        });
    };

    $scope.changeState = function (task, operation) {
        console.log('change state method');
        $http.put('/TaskManagament/' + operation + '/' + task.TaskId).success(function(data) {
            console.log('change state method - success response to status: ' + data);
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

q4AngularControllers.controller('detailProjectCtrl', function detailProjectsCtrl($scope, $routeParams, Project) {
    $scope.findOne = function () {
        $scope.project = Project.get({ projectId: $routeParams.projectId });
        console.log($scope.project);
    };

    $scope.update = function () {
        $scope.project.$update({ projectId: $routeParams.projectId });
    };
});

q4AngularControllers.controller('projectStatisticsCtrl', function projectStatisticsCtrl($scope, $routeParams, TasksPerStatus, FinishedTasksPerDay) {
    TasksPerStatus.query({ projectId: $routeParams.projectId }, function (data) {
        console.group("TasksPerStatus");
        console.log(data);
        $scope.tasksPerStatus = data.map(function (single) {
            return {
                y: single.Count,
                name: single.StatusName
            };
        });
        console.log($scope.tasksPerStatus);
        console.groupEnd("TasksPerStatus");
    });

    FinishedTasksPerDay.query({ projectId: $routeParams.projectId }, function (data) {
        console.group("FinishedTasksPerDay");
        console.log(data);
        $scope.finishedTasksPerDay = data.map(function (single) {
            return {
                y: single.Count,
                x: new Date(single.Date)
            };
        });
        var toType = function (obj) {
            return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
        };

        console.log($scope.finishedTasksPerDay);
        console.log(toType($scope.finishedTasksPerDay[0].x));
        console.groupEnd("FinishedTasksPerDay");
    });
    
});