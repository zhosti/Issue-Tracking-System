'use strict';

angular.module('issueTrackingSystem.home',[])
    .config(['$routeProvider', function($routeProvider){
        $routeProvider.when('/',{
            templateUrl: 'home/home.html',
            controller: 'HomeController'
        });
    }])
    .controller('HomeController',[
        '$scope',
        '$location',
        'userService',
        'authentication',
        'identity',
        function HomeController($scope, $location, userService, authentication, identity){
            $scope.register = function(user){
                authentication.registerUser(user)
                    .then(function(){
                        $scope.login({username: user.email, password: user.password});
                    },
                    function(err){
                        console.log(err);
                    });
            };
            $scope.login = function(user){
                authentication.loginUser(user)
                    .then(function(loggedInUser){
                            sessionStorage['authToken'] = loggedInUser.access_token;
                            identity.getCurrentUser()
                                .then(
                                    function(data){
                                        sessionStorage['currentUser'] = JSON.stringify(data);
                                    }, function(err){
                                        console.log(err);
                                    });
                        },
                        function(err){
                            console.log(err);
                        });

            };
            $scope.isLoggedIn = identity.isLoggedIn;
        }]);