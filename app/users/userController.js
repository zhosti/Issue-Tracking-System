'use strict';

angular.module('issueTrackingSystem.users.userController', [])
    .controller('UserController', [
        '$scope',
        'userService',
        'identity',
        function UserController($scope, userService,identity) {
            $scope.isLoggedIn = identity.isLoggedIn;

            $scope.issuesParams = {
                pageSize: 10,
                pageNumber: 1
            };

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

            $scope.getUserIssues = function(){
                userService.getUserIssues($scope.issuesParams)
                    .then(function success(data){
                        $scope.userIssues = data.Issues;
                        $scope.issuesPagination = data.TotalPages > 1;
                        $scope.issuesCount = data.TotalPages * $scope.issuesParams.pageSize;
                    }, function error(err){
                        console.log(err);
                    })
            };

            if ($scope.isLoggedIn()){
                $scope.getUserIssues();
            }

        }]);
