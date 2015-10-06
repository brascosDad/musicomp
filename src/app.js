(function() {
	"use strict";
	angular.module("musiComp", ['ngRoute', 'mcTemplates'])
		.config([
  			"$routeProvider", function (router) {
  				router.when('/', {  
  					controller: "MainCtrl",	
    			  templateUrl: '_main.html'  
    			})    

    			.otherwise({ 
    			  redirectTo: '/' 
    			}); 
  				} 
  			]);

}());
