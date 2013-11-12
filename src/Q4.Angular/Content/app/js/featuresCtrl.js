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
    $scope.findOne = function() {
        $scope.feature = Feature.get({ featureId: $routeParams.featureId });
    };

    $scope.update = function() {
        $scope.feature.$update({ featureId: $routeParams.featureId });
    };
});

q4AngularControllers.controller('tasksCtrl', function tasksCtrl($scope, Developer, Project, Task) {
    $scope.featuresVisible = false;

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

        task.$save();

        console.groupEnd('create task');
    };

    $scope.onProjectChanged = function() {
        console.group("onProjectChanged");
        console.log($scope.project);

        $scope.task.Feature = null;
        $scope.features = $scope.project.Features;
        $scope.featuresVisible = true;

        console.groupEnd("onProjectChanged");
    };
});