'use strict';

angular.module('issueTrackingSystem.project.projectService',[
])
.factory('projectService',[
    '$http',
    '$q',
    'BASE_URL',
    function($http, $q, BASE_URL){
        function addProject(project){
            var deferred = $q.defer();

            var projLabels = '';
            project.labels.forEach(function(label, i){
                projLabels = '&labels[' + i + '].Name=' + label.trim();
            });
            var projPriorities = '';
            project.priorities.forEach(function(priority, i){
                projPriorities = '&priorities[' + i + '].Name=' + priority.trim();
            });

            var data = 'Name=' + project.name +
                    '&Description=' + project.description +
                    '&ProjectKey=' + project.key +
                    projLabels + projPriorities +
                    '&LeadId=' + project.leadId;

            var request = {
                method: 'POST',
                url: BASE_URL + 'projects',
                headers: {
                    Authorization: 'Bearer ' + sessionStorage.authToken,
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                data: data
            };

            $http(request)
                .then(
                    function success(data){
                        deferred.resolve(data);
                    }, function error(err){
                        deferred.reject(err);
                    }
                );
            return deferred.promise;
        }

        function getAllProjects(projectsParams){
            var deferred = $q.defer();

            var url = BASE_URL + 'projects?filter=&pageSize=' + projectsParams.pageSize + '&pageNumber=' + projectsParams.currentPage;

            $http.defaults.headers.common.Authorization = 'Bearer ' + sessionStorage.authToken;
            $http.get(url)
                .then(function(response){
                    deferred.resolve(response.data);
                }, function(err){
                    deferred.reject(err);
                });

            return deferred.promise;
        }

        function getProjectById(projectId){
            var deferred = $q.defer();

            var url = BASE_URL + 'projects/' + projectId;

            $http.defaults.headers.common.Authorization = 'Bearer ' + sessionStorage.authToken;
            $http.get(url)
                .then(function(response){
                    deferred.resolve(response);
                }, function(err){
                    deferred.reject(err);
                });

            return deferred.promise;
        }

        return {
            addProject: addProject,
            getAllProjects: getAllProjects,
            getProjectById: getProjectById
        }
    }
]);