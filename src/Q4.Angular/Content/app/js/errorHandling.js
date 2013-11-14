﻿angular
    .module('globalErrors', [])
    .config(function ($provide, $httpProvider, $compileProvider) {
        var elementsList = $();

        var showMessage = function (content, cl, time) {
            $('<div/>')
                .addClass('alert')
                .addClass(cl)
                .hide()
                .fadeIn('fast')
                .delay(time)
                .fadeOut('fast', function () { $(this).remove(); })
                .appendTo(elementsList)
                .text(content);
        };

        $httpProvider.responseInterceptors.push(function ($timeout, $q) {
            return function (promise) {
                return promise.then(function (successResponse) {
                    if (successResponse.config.method.toUpperCase() != 'GET')
                        showMessage('Success', 'alert-success', 3000);
                    return successResponse;

                }, function (errorResponse) {
                    switch (errorResponse.status) {
                        case 401:
                            showMessage('Wrong usename or password', 'alert-danger', 100);
                            break;
                        case 403:
                            showMessage('You don\'t have the right to do this', 'alert-danger', 100);
                            break;
                        case 500:
                            showMessage('Server internal error: ' + errorResponse.data, 'alert-danger', 100);
                            break;
                        default:
                            showMessage('Error ' + errorResponse.status + ': ' + errorResponse.data, 'alert-danger', 100);
                    }
                    return $q.reject(errorResponse);
                });
            };
        });

        $compileProvider.directive('appMessages', function () {
            var directiveDefinitionObject = {
                link: function (scope, element, attrs) { elementsList.push($(element)); }
            };
            return directiveDefinitionObject;
        });
    });