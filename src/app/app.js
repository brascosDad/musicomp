(function() {
	"use strict";
	angular.module("musiComp", ['ngResource', 'ngRoute', 'mcTemplates', 'ngMaterial', 'ngMessages'])
		.config([
  			"$routeProvider",'$mdThemingProvider', function (router, $mdThemingProvider){
  				router.when('/', {  
  					controller: "OpenCtrl",	
    			  templateUrl: "app/openModule/_open.html"  
    			})   

          .when('/define/:songId', {
            controller: "DefineCtrl",
            templateUrl: "app/defineModule/_define.html"
          }) 

          .when('/arrange/:songId', {
            controller: "ArrangeCtrl",
            templateUrl: "app/arrangeModule/_arrange.html"
          })

          .when('/create/:songId', {
            controller: "CreateCtrl",
            templateUrl: "app/createModule/_create.html"
          })

          .when('/create/:songId/:sectionId', {
              controller: "CreateCtrl",
              templateUrl: "app/createModule/_create.html"
          })
          .otherwise({
            redirectTo: '/'
          });
          
          $mdThemingProvider.theme("default")
            .primaryPalette("deep-purple")
            .accentPalette("purple");
  				} 
  			])
        //override default exception handler to send errors server-side
        .factory("$exceptionHandler", ["logService", function(logService) {

            return function(exception, cause) {

                var exceptionToRaise = _.isObject(exception) ? exception.message : exception,
                    logInfo;

                if (exceptionToRaise) {
                    logInfo = {
                        level: "error",
                        message: exception && exception.message ? exception.message : exception,
                        cause: cause,
                        exception: exceptionToRaise,
                        stack: exception && exception.stack ? exception.stack : exception
                    };

                    //log to server, console
                    logService.save(logInfo);
                    console.error(logInfo);
                }
            };
        }]);
}());