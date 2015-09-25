app.controller('MainController', ['$scope', function($scope) {
	$scope.test = {title: 'Never Been Used Before', bpm: '120'};
	$scope.master = {};

	$scope.submit = function(song) {
		$scope.master = angular.copy(song);
	};

}])