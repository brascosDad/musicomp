//not using resourceService to avoid circular dependency via $http & resourceService
(function(angular) {
    "use strict";

    angular.module("musiComp").factory("logService", ["$window", function($window) {
        return {
            save: function(log) {
                var request = new XMLHttpRequest();
                request.open("post", "api/logs", true);
                request.setRequestHeader("Content-Type", "application/json");
                request.send(JSON.stringify(log));
            }
        };
    }]);

}(angular));
