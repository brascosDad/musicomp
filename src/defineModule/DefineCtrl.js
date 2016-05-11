(function() {
	"use strict";
	angular.module('musiComp').controller('DefineCtrl', ['$scope', '$location', 'songModel', '$routeParams',
		function($scope, $location, songModel, $routeParams) {

			songModel.addSongToScope($scope);
		
			$scope.addInstrument = function() {
				var newInstrumentId = $scope.song.instruments.length;
				if (newInstrumentId < 8) {
					$scope.song.instruments.push({
						'id': newInstrumentId,
						'member': '',
						'type': ''
					});
				}

			};

			$scope.removeInstrument = function () {
				var lastItem = $scope.song.instruments.length-1;
				$scope.song.instruments.splice(lastItem);
			};

			$scope.submit = function(song) {
				//save song so 'back' button works
				songModel.saveSong(song).then(function(song) {
					$scope.song = song;
					$location.path('/create/' + song._id);
				});
			};

	}]);
}());

