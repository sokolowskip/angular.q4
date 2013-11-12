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
            .when('/features/:featureId/edit', { templateUrl: 'Content/app/views/features/edit.html', controller: 'featureDetailsCtrl' })
            .when('/tasks/new', {templateUrl: 'Content/app/views/tasks/new.html', controller : 'tasksCtrl'})
            ;
    }
]);

q4AngularApp.directive("addfeature", function () {
    return {
        scope: {
           onadd: "&"
        },
        template: '<button role="button" class="btn btn-primary btn-lg active" ng-click="toggleContent()" ng-show="isAddButtonVisible">Add feature</button>'+
                  '<div ng-hide="isAddButtonVisible" class="container"><div class="row"><div class="col-sm-5"><input type="text" class="form-control" ng-model="name" placeholder="New feature name..." /></div><div class="col-sm-1"><span class="accept-action glyphicon glyphicon-saved" ng-click="accept()"></span><span class="reject-action glyphicon glyphicon-remove" ng-click="toggleContent()"></span></div></div></div>',
        link: function (scope, element, attrs) {
            console.log("add feature directive");
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

q4AngularApp.directive("statpiechart", function () {
    return {
        scope: {
            items: '='
        },
        template: '<div id="container" style="margin: 0 auto">not working</div>',
        link: function(scope) {
            console.log("pieChart directive is using");
            var chart = new Highcharts.Chart({
                chart: {
                    renderTo: 'container',
                    plotBackgroundColor: null,
                    plotBorderWidth: null,
                    plotShadow: false
                },
                title: {
                    text: 'Number of tasks per status'
                },
                tooltip: {
                    pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                },
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        dataLabels: {
                            enabled: true,
                            color: '#000000',
                            connectorColor: '#000000',
                            format: '<b>{point.name}</b>: {point.y} ({point.percentage:.1f}%)'
                        }
                    }
                },
                series: [
                    {
                        type: 'pie',
                        name: 'Browser share'
                    }
                ]
            });
            scope.$watch("items", function (data) {
                console.log(data);
                chart.series[0].setData(data);
            }, true);
        }
    
    };
});

