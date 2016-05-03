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

            return {
                getAllUsers: getAllUsers
            }
        }
    ]);
