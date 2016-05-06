angular.module('issueTrackingSystem.issues.issueService', [])
    .factory('issueService', [
        '$http', '$q', 'BASE_URL',
        function($http, $q, BASE_URL){
            function addIssue (issue){
                var deferred = $q.defer();

                var projectLabels = '';
                issue.Labels.forEach(function(l, index) {
                    projectLabels += '&labels[' + index + '].Name=' + l.trim();
                });

                var data = 'Title=' + issue.Title +
                    '&Description=' + issue.Description +
                    '&DueDate=' + issue.DueDate +
                    '&ProjectId=' + issue.ProjectId +
                    '&AssigneeId=' + issue.AssigneeId +
                    '&PriorityId=' + issue.PriorityId +
                    projectLabels;

                var requestData = {
                    method: 'POST',
                    url: BASE_URL + 'issues/',
                    data: data,
                    headers: {
                        Authorization: 'Bearer ' + sessionStorage.authToken,
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                };

                $http(requestData)
                    .then(
                        function success(data){
                            deferred.resolve(data);
                        },
                        function error(err){
                            deferred.reject(err);
                        }
                    );

                return deferred.promise;
            }
            function getIssueById(issueId) {
                var deferred = $q.defer();

                $http.defaults.headers.common.Authorization = 'Bearer ' + sessionStorage.authToken;
                $http.get(BASE_URL + 'Issues/' + issueId)
                    .then(
                        function success(data) {
                            deferred.resolve(data);
                        },
                        function error(err) {
                            deferred.reject(err);
                        }
                    );

                return deferred.promise;
            }

            function editIssue(issue, id){
                var deferred = $q.defer();
                var dataLabels = '';
                issue.Labels.forEach(function(label, index) {
                    dataLabels += '&labels[' + index + '].Name=' + label.trim();
                });

                var data = 'Title=' + issue.Title +
                    '&Description=' + issue.Description +
                    '&DueDate=' + issue.DueDate  +
                    '&AssigneeId=' + issue.AssigneeId +
                    '&PriorityId=' + issue.PriorityId +
                    dataLabels;
                var requestData = {
                    method: 'PUT',
                    url: BASE_URL + 'issues/' + id,
                    data: data,
                    headers: {
                        Authorization: 'Bearer ' + sessionStorage.authToken,
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                };

                $http(requestData)
                    .then(
                        function success(data){
                            deferred.resolve(data);
                        },
                        function error(err){
                            deferred.reject(err);
                        }
                    );

                return deferred.promise;
            }
            return {
                addIssue: addIssue,
                getIssueById: getIssueById,
                editIssue: editIssue
            }
        }
    ]);