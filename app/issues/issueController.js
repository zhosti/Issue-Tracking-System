angular.module('issueTrackingSystem.issues.issueController', [
        'issueTrackingSystem.issues.issueService'
    ])
    .config(['$routeProvider', function($routeProvider){
        $routeProvider
            .when('/projects/addIssue/:id', {
                controller: 'IssueController',
                templateUrl: 'issues/add-issue.html',
                access: {
                    requiresLoggedUser: true
                }
            })
            .when('/issues/:id', {
                controller: 'IssueController',
                templateUrl: 'issues/view-issue.html',
                access: {
                    requiresLoggedUser: true
                }
            })
    }])
    .controller('IssueController', [
        '$scope',
        '$routeParams',
        '$location',
        'issueService',
        'projectService',
        'identity',
        function($scope, $routeParams, $location, issueService, projectService, identity){
            $scope.allUsers();

            projectService.getProjectById($routeParams.id)
                .then(
                    function success (project){
                        $scope.projectPriorities = project.data.Priorities;
                    },
                    function err(err){
                        console.log(err);
                    }
                );

            $scope.addIssue = function(){
                var issueToAdd = {
                    Title: $scope.addIssue.Title,
                    Description: $scope.addIssue.Description,
                    DueDate: $scope.addIssue.DueDate.toISOString(),
                    ProjectId: $routeParams.id,
                    AssigneeId: $scope.addIssue.AssigneeId,
                    PriorityId: $scope.addIssue.PriorityId,
                    Labels: $scope.addIssue.Labels.split(',')
                };
                issueService.addIssue(issueToAdd)
                    .then(
                        function success(){
                            $location.path('projects/' + $routeParams.id );
                        },
                        function error(err){
                            console.log(err);
                        }
                    )
            };

            function getIssue() {
                issueService.getIssueById($routeParams.id)
                    .then(
                        function success(issue) {
                            $scope.currentIssue = issue.data;
                            $scope.isAssignee = $scope.currentIssue.Assignee.Id === JSON.parse(sessionStorage.currentUser).Id;
                            $scope.currentIssueLabels = [];
                            issue.data.Labels.forEach(function (label) {
                                $scope.currentIssueLabels.push(label.Name);
                            });
                            identity.setProjectLeader($scope.currentIssue.Project.Id)
                                .then(
                                    function success() {
                                        $scope.isProjectLeader = identity.isProjectLeader();
                                    }
                                );
                        },
                        function error(err) {
                            console.log(err);
                        }
                    );
            }
            getIssue();
        }
    ]);