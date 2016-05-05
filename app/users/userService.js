'use strict';

angular.module('issueTrackingSystem.users.userService', [])
    .factory('userService', [
        '$http',
        '$q',
        'BASE_URL',
        function($http, $q, BASE_URL){
            function getAllUsers(){
                var deferred = $q.defer();

                $http.defaults.headers.common.Authorization = 'Bearer ' + sessionStorage.authToken;
                $http.get(BASE_URL + 'Users/')
                    .then(function(response){
                        deferred.resolve(response);
                    }, function(err){
                        deferred.reject(err);
                    });

                return deferred.promise;
            }
            function getUserIssues(pageParams){
                var deferred = $q.defer();

                var url = BASE_URL + 'issues/me?orderBy=DueDate desc&pageSize=' +
                    pageParams.pageSize +
                    '&pageNumber=' +
                    pageParams.pageNumber;

                $http.defaults.headers.common.Authorization = 'Bearer ' + sessionStorage.authToken;
                $http.get(url)
                    .then(function(response){
                        deferred.resolve(response.data);
                    }, function(err){
                        deferred.reject(err);
                    });

                return deferred.promise;
            }

            function getUserLeadProjects(pageParams){
                var deferred = $q.defer();

                var id = JSON.parse(sessionStorage['currentUser']).Id;
                var url = BASE_URL + 'projects?filter=Lead.Id="' + id + '"&pageSize=' +
                    pageParams.pageSize +
                    '&pageNumber=' +
                    pageParams.pageNumber;

                $http.defaults.headers.common.Authorization = 'Bearer ' + sessionStorage.authToken;
                $http.get(url)
                    .then(function(response){
                        deferred.resolve(response.data);
                    }, function(err){
                        deferred.reject(err);
                    });

                return deferred.promise;
            }

            return {
                getAllUsers: getAllUsers,
                getUserIssues: getUserIssues,
                getUserLeadProjects: getUserLeadProjects
            }
        }
    ]);
