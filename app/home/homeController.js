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
        'messageService',
        function HomeController($scope, $location, userService, authentication, identity, messageService){
            $scope.register = function(user){
                authentication.registerUser(user)
                    .then(function(){
                        $scope.login({username: user.email, password: user.password});
                        messageService.showSuccess('User was register successfully')
                        },
                    function(err){
                        messageService.showError('Problem, cannot register user')
                    });
            };
            $scope.login = function(user){
                authentication.loginUser(user)
                    .then(function(loggedInUser){
                            sessionStorage['authToken'] = loggedInUser.access_token;
                            messageService.showSuccess('Login successful!');
                            identity.getCurrentUser()
                                .then(
                                    function(data){
                                        sessionStorage['currentUser'] = JSON.stringify(data);
                                    }, function(err){
                                        console.log(err);
                                    });
                        },
                        function(){
                            messageService.showError('Login failed!');
                        });

            };
            $scope.isLoggedIn = identity.isLoggedIn;
        }]);