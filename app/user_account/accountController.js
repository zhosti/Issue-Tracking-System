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
        function AccountController($scope, accountService, $location){
            $scope.changeUserPassword = function (data){
                accountService.changePassword(data)
                    .then(
                        function success(){
                            $location.path('#/');
                        },
                        function error(err){
                            console.log(err);
                        }
                    )
            };
        }]);