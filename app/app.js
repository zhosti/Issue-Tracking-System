'use strict';

angular.module('issueTrackingSystem', [
    'ngRoute',
    'issueTrackingSystem.home',
    'issueTrackingSystem.user_account.authentication',
    'issueTrackingSystem.user_account.identity'
])
    .constant('BASE_URL', 'http://softuni-issue-tracker.azurewebsites.net/')
    .config(['$routeProvider', function($routeProvider) {
      $routeProvider.otherwise({redirectTo: '/'});
    }])
    .run(['$rootScope', '$location', 'identity', function($rootScope, $location, identity) {

        $rootScope.$on('$locationChangeStart', function(event) {
            if(!identity.hasLoggedUser()) {
                $location.path('/');
            }
        });
    }]);
