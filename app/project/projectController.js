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
    'messageService',
    function ProjectController($scope, $location, $routeParams, projectService, messageService) {
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
                        messageService.showSuccess('Project is added');
                        $location.path('projects/' + data.data.Id);
                    }, function error() {
                        messageService.showError('There is an error, can\'t add the project');
                    }
                )
        };

        $scope.getAllProjects = function() {
            projectService.getAllProjects($scope.projectsPagination)
                .then(
                    function success(data) {
                        $scope.allProjects = data.Projects;
                        $scope.projectsCount  = data.TotalPages * $scope.projectsPagination.pageSize;

                    }, function error() {
                        messageService.showError('There is a problem with load all projects');
                    });
        };

        $scope.getProjectById = function(projectId) {
            projectService.getProjectById(projectId)
                .then(
                    function success(data) {
                        $scope.project = data.data;
                    }, function error() {
                       // messageService.showError('Problem with loading a project');
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
                        messageService.showSuccess('Project is edited');
                    }, function error(err) {
                        messageService.showError('There is problem with editing a project');
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
                }, function error(){
                    //messageService.showError('Problem with loading a project');
                })
        }

        getEditProjectById($routeParams.id);
        $scope.getAllProjects();
        $scope.getProjectById($routeParams.id);
    }
]);