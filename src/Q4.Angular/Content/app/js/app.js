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

q4AngularApp.directive("statcolumnchart", function () {
    return {
        scope: { },
        template: '<div id="statColumnsChartId" style="margin: 0 auto">not working</div>',
        link: function (scope) {
            console.log("column chart directive is using");
            var chart = new Highcharts.Chart({
                chart: {
                    renderTo: 'statColumnsChartId', 
                    type: 'column'
                },
                title: {
                    text: 'Monthly Average Rainfall'
                },
                subtitle: {
                    text: 'Source: WorldClimate.com'
                },
                xAxis: {
                    categories: [
                        'Jan',
                        'Feb',
                        'Mar',
                        'Apr',
                        'May',
                        'Jun',
                        'Jul',
                        'Aug',
                        'Sep',
                        'Oct',
                        'Nov',
                        'Dec'
                    ]
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: 'Rainfall (mm)'
                    }
                },
                tooltip: {
                    headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                    pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                        '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
                    footerFormat: '</table>',
                    shared: true,
                    useHTML: true
                },
                plotOptions: {
                    column: {
                        pointPadding: 0.2,
                        borderWidth: 0
                    }
                },
                series: [{
                    name: 'Tokyo',
                    data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]
    
                }, {
                    name: 'New York',
                    data: [83.6, 78.8, 98.5, 93.4, 106.0, 84.5, 105.0, 104.3, 91.2, 83.5, 106.6, 92.3]
    
                }, {
                    name: 'London',
                    data: [48.9, 38.8, 39.3, 41.4, 47.0, 48.3, 59.0, 59.6, 52.4, 65.2, 59.3, 51.2]
    
                }, {
                    name: 'Berlin',
                    data: [42.4, 33.2, 34.5, 39.7, 52.6, 75.5, 57.4, 60.4, 47.6, 39.1, 46.8, 51.1]
    
                }]
            });
            //scope.$watch("items", function (data) {
            //    console.log(data);
            //    chart.series[0].setData(data);
            //}, true);
        }

    };
});