'use strict';

angular.module('issueTrackingSystem.user_account.identity', [])
    .factory('identity', ['BASE_URL', '$q', '$http',
        function (BASE_URL, $q, $http) {
            function getCurrentUser(){
                var deferred = $q.defer();

                $http.defaults.headers.common.Authorization = 'Bearer ' + sessionStorage.authToken;
                $http.get(BASE_URL + 'users/me')
                    .then(function (data) {
                        deferred.resolve(data.data);
                    }, function (err) {
                        deferred.reject(err)
                    });

                return deferred.promise;
            }

            function hasLoggedUser() {
                return sessionStorage.authToken !== undefined;
            }

            return {
                hasLoggedUser: hasLoggedUser,
                getCurrentUser: getCurrentUser
            };
        }]);