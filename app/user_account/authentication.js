'use strict'

angular.module('issueTrackingSystem.user_account.authentication', [])
    .factory('authentication', [
        '$http',
        '$q',
        'BASE_URL',
        function ($http, $q, BASE_URL) {
            function registerUser(user) {
                var deferred = $q.defer();

                $http.post(BASE_URL + 'api/account/register', user)
                    .then(function (response) {
                        deferred.resolve(response.data)
                    }, function (error) {
                        deferred.reject(error);
                    });

                return deferred.promise;
            }

            function loginUser(user) {
                var deferred = $q.defer();
                var loginData = "grant_type=password&username=" + user.username + "&password=" + user.password;
                var headers = {'Content-Type': 'application/x-www-form-urlencoded'};
                $http.post(BASE_URL + 'api/Token', loginData, headers)
                    .then(function (response){
                            deferred.resolve(response.data);
                        },
                        function(err){
                            deferred.reject(err);
                        });

                return deferred.promise;
            }

            function logout(){
                var deferred = $q.defer();
                $http.defaults.headers.common.Authorization = 'Bearer ' + sessionStorage.authToken;
                $http.post(BASE_URL + 'api/Account/Logout', null)
                    .then(function(){
                        deferred.resolve();
                    }, function(err){
                        deferred.reject(err)
                    });

                return deferred.promise;
            }

            return {
                loginUser: loginUser,
                registerUser: registerUser,
                logout: logout
            }
        }
    ]);