'use strict';

angular.module('issueTrackingSystem.admin.adminService', [])
    .factory('adminService', [
        '$http',
        '$q',
        'BASE_URL',
        function($http, $q, BASE_URL){
            function makeAdmin(userId){
                var deferred = $q.defer();

                var data = {'UserId': userId};
                $http.defaults.headers.common.Authorization = 'Bearer ' + sessionStorage.authToken;
                $http.defaults.headers.common.contentType = 'application/json';
                $http.put(BASE_URL + 'Users/makeadmin', data)
                    .then(
                        function(response){
                            deferred.resolve(response);
                        }, function(err){
                            deferred.reject(err);
                        });

                return deferred.promise;
            }

            return {
                makeAdmin: makeAdmin
            }
        }
    ]);