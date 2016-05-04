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
        })
        .when('/projects/:id', {
            templateUrl: 'project/view-project.html',
            controller: 'ProjectController',
            access: {
                requiresLoggedUser: true
            }
        })
        .when('/projects/edit/:id', {
            templateUrl: 'project/edit-project.html',
            controller: 'ProjectController',
            access: {
                requiresLoggedUser: true
            }
        });
}])
.controller('ProjectController', [
    '$scope',
    '$location',
    '$routeParams',
    'projectService',
    function ProjectController($scope, $location, $routeParams, projectService) {
        $scope.projectsPagination = {
            pageSize: 10,
            currentPage: 1
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
            projectService.getAllProjects($scope.projectsPagination)
                .then(
                    function success(data) {
                        $scope.allProjects = data.Projects;
                        $scope.projectsCount  = data.TotalPages * $scope.projectsPagination.pageSize;

                    }, function error(err) {
                        console.log(err);
                    });
        };

        $scope.getProjectById = function(projectId) {
            projectService.getProjectById(projectId)
                .then(
                    function success(data) {
                        $scope.project = data.data;
                    }, function error(err) {
                        console.log(err);
                    });
        };

        $scope.editProject = function() {
            if(typeof $scope.newLabels === 'string'){
                $scope.newLabels = $scope.newLabels.split(',');
            }

            if(typeof $scope.newPriorities === 'string'){
                $scope.newPriorities = $scope.newPriorities.split(',');
            }

            var editProject = {
                Id: $scope.project.Id,
                Description: $scope.project.Description,
                Labels: $scope.newLabels,
                Priorities: $scope.newPriorities,
                Name: $scope.project.Name,
                LeadId: $scope.project.Lead.Id
            };

            projectService.editProject(editProject)
                .then(
                    function success() {
                        $location.path('projects/' + $scope.project.Id);
                    }, function error(err) {
                        console.log(err);
                    });
        };

        function getEditProjectById(id){
            projectService.getProjectById(id)
                .then(function success(project){
                    $scope.project = project.data;
                    $scope.newLabels  = [];
                    $scope.newPriorities  = [];
                    $scope.project.Labels.forEach(function(label) {
                        $scope.newLabels.push(label.Name);
                    });
                    $scope.project.Priorities.forEach(function(priority) {
                        $scope.newPriorities.push(priority.Name);
                    });
                }, function error(err){
                    console.log(err);
                })
        }

        $scope.getAllProjects();
        $scope.getProjectById($routeParams.id);
        getEditProjectById($routeParams.id);
    }
]);