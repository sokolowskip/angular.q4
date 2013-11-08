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