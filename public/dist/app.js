(function() {
	"use strict";
	angular.module("musiComp", ['ngRoute', 'mcTemplates'])
		.config([
  			"$routeProvider", function (router) {
  				router.when('/', {  
  					controller: "MainCtrl",	
    			  templateUrl: "defineModule/_define.html"  
    			})    

    			//.otherwise({ 
    			//  redirectTo: '/' 
    			//}); 
  				} 
  			]);

}());  
