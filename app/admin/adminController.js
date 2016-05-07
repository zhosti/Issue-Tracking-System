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
        function AdminController($scope, adminService){
            $scope.allUsers();

            $scope.makeAdmin = function(userId){
                adminService.makeAdmin(userId)
                    .then(
                        function success(data){
                            $scope.allUsers();
                        });
            };
        }]);