'use strict';

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

q4AngularControllers.controller('featuresCtrl', function featuresCtrl($scope, $routeParams, Feature) {
    $scope.features = Feature.query({ projectId : $routeParams.projectId });

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