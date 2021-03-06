'use strict';

angular.module('issueTrackingSystem.users.userController', [])
    .controller('UserController', [
        '$scope',
        'userService',
        'identity',
        'authentication',
        'messageService',
        function UserController($scope, userService,identity, authentication, messageService) {
            $scope.isLoggedIn = identity.isLoggedIn;

            $scope.isAdmin = identity.isAdmin;

            $scope.issuesParams = {
                pageSize: 10,
                pageNumber: 1
            };

            $scope.projectsParams = {
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

            $scope.getLeadProjects  = function(){
                userService.getUserLeadProjects($scope.projectsParams)
                    .then(function success(data){
                        $scope.leadProjects = data.Projects;
                        $scope.projectsPagination  = data.TotalPages > 1;
                        $scope.projectsCount  = data.TotalPages * $scope.projectsParams.pageSize;
                    }, function error(err){
                        console.log(err);
                    })
            };

            $scope.logout = function(){
                authentication.logout()
                    .then(
                        function success(){
                            sessionStorage.clear();
                            messageService.showSuccess('Logout successfully');
                        },
                        function(err){
                            messageService.showError('Logout failed');
                        });
            };

            if ($scope.isLoggedIn()){
                $scope.getUserIssues();
                $scope.getLeadProjects();
                $scope.username = JSON.parse(sessionStorage['currentUser']).Username;
            }

        }]);
