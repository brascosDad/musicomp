(function(angular) {
    "use strict";

    angular.module("musiComp").factory("songService", ["$resource",
        function($resource) {
            return $resource("api/songs/:id", {}, _.extend({}, {}, { "update": {method:"PUT"} }));
        }]);

}(angular));