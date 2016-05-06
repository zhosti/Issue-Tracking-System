'use strict';

angular.module('issueTrackingSystem', [
    'ngRoute',
    'ui.bootstrap.pagination',

    'issueTrackingSystem.home',
    'issueTrackingSystem.users.userController',
    'issueTrackingSystem.users.userService',
    'issueTrackingSystem.user_account.authentication',
    'issueTrackingSystem.user_account.identity',
    'issueTrackingSystem.project.projectController',
        'issueTrackingSystem.project.projectService',
        'issueTrackingSystem.issues.issueController'
    ])
    .constant('BASE_URL', 'http://softuni-issue-tracker.azurewebsites.net/')
    .config(['$routeProvider', function($routeProvider) {
      $routeProvider.otherwise({redirectTo: '/'});
    }])
    .run(['$rootScope', '$location', 'identity', function($rootScope, $location, identity) {

        $rootScope.$on('$locationChangeStart', function(event) {
            if(!identity.isLoggedIn()) {
                $location.path('/');
            }
        });
    }]);
