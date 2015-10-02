(function() {
	"use strict";
	angular.module('musiComp').controller('MainCtrl', ['$scope', function($scope) {
		$scope.test = {title: 'Never Been Used Before', bpm: '120'};
		$scope.master = {};

		$scope.submit = function() {
			console.log($scope.test);
			console.log('watch is working');
		};

	}]);
}());

