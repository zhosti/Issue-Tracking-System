'use strict';

angular.module('issueTrackingSystem.messages.messageService', [])
    .factory('messageService', [
        function(){
            function showError(message) {
                noty({
                    text: message,
                    type: 'error',
                    layout: 'topCenter',
                    timeout: 1000
                });
            }

            function showSuccess(message) {
                noty({
                    text: message,
                    type: 'success',
                    layout: 'topCenter',
                    timeout: 1000
                });
            }

            return {
                showSuccess: showSuccess,
                showError: showError
            }
        }
    ]);