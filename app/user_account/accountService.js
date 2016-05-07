'use strict';

angular.module('issueTrackingSystem.user_account.accountService', [])
    .factory('accountService', [
        '$q',
        '$http',
        'BASE_URL',
        function ($q, $http, BASE_URL) {

            function changePassword(user){
                var deferred = $q.defer();

                $http.defaults.headers.common.Authorization = 'Bearer ' + sessionStorage.authToken;

                $http.post(BASE_URL + 'api/account/changePassword', user)
                    .then(function (response) {
                        deferred.resolve(response.data)
                    }, function (error) {
                        deferred.reject(error);
                    });

                return deferred.promise;
            }

            return {
                changePassword: changePassword
            }
        }]);