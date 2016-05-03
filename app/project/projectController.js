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
        });
}])
.controller('ProjectController', [
    '$scope',
    '$location',
    'projectService',
    function ProjectController($scope, $location, projectService) {
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
    }
]);