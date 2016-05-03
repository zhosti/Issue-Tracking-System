'use strict';

angular.module('issueTrackingSystem.project.projectController',[
    'issueTrackingSystem.project.projectService'
])
.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        .when('/projects/add',{
            templateUrl: 'project/add-project.html',
            controller: 'ProjectController',
            access:{
                requiresAdmin: true
            }
        })
        .when('/projects/all',{
            templateUrl: 'project/list-projects.html',
            controller: 'ProjectController'
        });
}])
.controller('ProjectController', [
    '$scope',
    '$location',
    'projectService',
    'userService',
    function ProjectController($scope, $location, projectService, userService) {
        $scope.projectsParams = {
            pageSize: 1000,
            pageNumber: 1
        };
        $scope.allUsers();

        $scope.addProject = function(project){

            project.labels = project.labels.toString().split(',');
            project.priorities = project.priorities.toString().split(',');

            projectService.addProject(project)
                .then(
                    function success(data){
                        console.log(data);
                    }, function error(err) {
                        console.log(err);
                    }
                )
        };

        $scope.getAllProjects = function() {
            projectService.getAllProjects($scope.projectsParams)
                .then(
                    function success(data) {
                        $scope.allProjects = data.Projects;
                    }, function error(err) {
                        console.log(err);
                    });
        };

        $scope.getAllProjects();
    }
]);