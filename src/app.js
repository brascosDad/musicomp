(function() {
	"use strict";
	angular.module("musiComp", ['ngRoute', 'mcTemplates'])
		.config([
  			"$routeProvider", function (router) {
  				router.when('/', {  
  					controller: "MainCtrl",	
    			  templateUrl: "defineModule/_define.html"  
    			})    

          .when('/arrange', {
            controller: "ArrangeCtrl",
            templateUrl: "arrangeModule/_arrange.html"
          })  

    			.otherwise({ 
    			  redirectTo: '/' 
    			}); 
  				} 
  			]);

}());