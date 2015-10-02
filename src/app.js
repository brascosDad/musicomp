(function() {
	"use strict";
	angular.module("musiComp", ['ngRoute', 'mcTemplates'])
		.config([
  			"$routerProvider", function (router) {
				var test = "blah";
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