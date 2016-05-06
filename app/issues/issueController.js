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
            .when('/issues/edit/:id',{
                controller: 'IssueController',
                templateUrl: 'issues/edit-issue.html',
                access:{
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
                        $scope.priorities = project.data.Priorities;
                    },
                    function err(err){
                        console.log(err);
                    }
                );

            $scope.addIssue = function(){
                var issueAdd = {
                    Title: $scope.addIssue.Title,
                    Description: $scope.addIssue.Description,
                    DueDate: $scope.addIssue.DueDate.toISOString(),
                    ProjectId: $routeParams.id,
                    AssigneeId: $scope.addIssue.AssigneeId,
                    PriorityId: $scope.addIssue.PriorityId,
                    Labels: $scope.addIssue.Labels.split(',')
                };
                issueService.addIssue(issueAdd)
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

            issueService.getIssueById($routeParams.id)
                .then(
                    function success(issue){
                        $scope.currentIssue = issue.data;
                        $scope.currentIssueDueDate =new Date(issue.data.DueDate);
                        $scope.issuePriority = issue.data.Priority.Id;
                        $scope.currentIssueLabels = [];

                        issue.data.Labels.forEach(function(label) {
                            $scope.currentIssueLabels.push(label.Name);
                        });

                        projectService.getProjectById(issue.data.Project.Id)
                            .then(function success(project) {
                                $scope.projectPriorities = project.data.Priorities;
                            });
                    },
                    function error(err){
                        console.log(err);
                    }
                );

            $scope.editIssue = function(){
                if(typeof $scope.currentIssueLabels === 'string') {
                    $scope.currentIssueLabels = $scope.currentIssueLabels.split(',')
                }

                var issueEdit = {
                    Title: $scope.currentIssue.Title,
                    Description: $scope.currentIssue.Description,
                    DueDate: $scope.currentIssueDueDate.toISOString(),
                    AssigneeId: $scope.currentIssue.Assignee.Id,
                    PriorityId: $scope.issuePriority,
                    Labels: $scope.currentIssueLabels
                };

                issueService.editIssue(issueEdit, $routeParams.id)
                    .then(
                        function success(data){
                            $location.path('issues/' + data.data.Id);
                        },
                        function error(err){
                            console.log(err);
                        }
                    )
            };

            function getComments (){
                issueService.getIssueComments($routeParams.id)
                    .then(
                        function success(comments){
                            $scope.comments = comments.data;
                        },
                        function error (err){
                            console.log(err);
                        }
                    )
            }

            $scope.addComment = function (comment){
                issueService.addIssueComment(comment, $routeParams.id)
                    .then(
                        function success(data){
                            $scope.commentIssue = {};
                            $scope.comments = data.data;
                        },
                        function error(err){
                            console.log(err);
                        }
                    )
            };

            getIssue();
            getComments();
        }
    ]);