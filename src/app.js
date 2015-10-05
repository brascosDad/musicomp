(function() {
	"use strict";
	angular.module("musiComp", ['ngRoute', 'mcTemplates'])
		.config([
  			"$routerProvider", function (router) {
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