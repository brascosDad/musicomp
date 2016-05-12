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

			$scope.next = function(song) {
				//create new section
				$scope.song.sections.push({
					name: 'Section Name',
					measures:[
						{
							id: 0,
							rows: []
						}
					],
					bpm: 120,
					timeSig: 4,
					sectionColor: null
				});
				//save to songModel
				songModel.saveSong(song).then(function(song) {
					$scope.currentSection = song.sections[song.sections.length-1];
					//add section._id
					$location.path('/create/' + song._id + '/' + $scope.currentSection._id);
				});
			};

	}]);
}());

