'use strict';

angular.module('issueTrackingSystem.user_account.accountController', [])
    .config(['$routeProvider', function($routeProvider){
        $routeProvider.when('/profile/password', {
            templateUrl: 'user_account/change-password.html',
            controller: 'AccountController'
        })
    }])
    .controller('AccountController', [
        '$scope',
        'accountService',
        '$location',
        'messageService',
        function AccountController($scope, accountService, $location, messageService){
            $scope.changeUserPassword = function (data){
                accountService.changePassword(data)
                    .then(
                        function success(){
                            $location.path('#/');
                            messageService.showSuccess('Successfully changed password.');
                        },
                        function error(err){
                            messageService.showError('Error.', err);
                        }
                    )
            };
        }]);