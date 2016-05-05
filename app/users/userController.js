'use strict';

angular.module('issueTrackingSystem.users.userController', [])
    .controller('UserController', [
        '$scope',
        'userService',
        function UserController($scope, userService) {
            $scope.allUsers = function() {
                userService.getAllUsers()
                    .then(
                        function success(data){
                            $scope.users = data.data;
                        },
                        function error(err){
                            console.log(err);
                        }
                    );
            };
        }]);
