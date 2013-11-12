'use strict';

/* Services */

var q4AngularServices = angular.module('q4AngularServices', ['ngResource']);

q4AngularServices.factory('Project', ['$resource',
  function ($resource) {
      return $resource(
          'api/projects/:projectId',
          {},
          { update: { method: 'PUT' } });
  }]);

q4AngularServices.factory('Developer', ['$resource',
  function ($resource) {
      return $resource(
          'api/developers/:developerId',
          {},
          { update: { method: 'PUT' } });
  }]);

q4AngularServices.factory('Feature', ['$resource',
  function ($resource) {
      return $resource(
          'api/features/:featureId',
          {},
          { update: { method: 'PUT' } });
  }]);

q4AngularServices.factory('FeaturesByProject', ['$resource',
    function($resource) {
        return $resource('api/Featuresbyproject/:projectId', {});
    }]);

q4AngularServices.factory('TasksPerStatus', ['$resource',
    function ($resource) {
        return $resource('api/TasksPerStatus/:projectId', {});
    }]);

q4AngularServices.factory('FinishedTasksPerDay', ['$resource',
    function ($resource) {
        return $resource('api/FinishedTasksPerDay/:projectId', {});
    }]);

q4AngularServices.factory('Task', ['$resource',
  function ($resource) {
      return $resource(
          'api/tasks/:taskId',
          {},
          { update: { method: 'PUT' } });
  }]);