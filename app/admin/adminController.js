'use strict';

angular.module('issueTrackingSystem.admin.adminController', [

    ])
    .config(['$routeProvider', function($routeProvider){
        $routeProvider
            .when('/users/all', {
                templateUrl: 'admin/users.html',
                controller: 'AdminController'
            });
    }])
    .controller('AdminController', [
        '$scope',
        'adminService',
        'messageService',
        function AdminController($scope, adminService, messageService){
            $scope.allUsers();

            $scope.makeAdmin = function(userId){
                adminService.makeAdmin(userId)
                    .then(
                        function success(){
                            $scope.allUsers();
                            messageService.showSuccess('User is changed to admin');
                        });
            };
        }]);