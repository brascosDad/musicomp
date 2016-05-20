(function() {
	"use strict";
	angular.module('musiComp').controller('OpenCtrl', ['$scope', '$location', '$mdSidenav', "songModel",
		function($scope, $location, $mdSidenav, songModel) {

			//get all songs, empty search criteria being used, set collection via promise obj
			var getSongs = function () {
				songModel.getSongs({}).then(function(songs) {
				$scope.songs = songs;
				});
			};

			getSongs();

			$scope.goHome = function(song) {
				if (song) {
					songModel.saveSong(song).then(function() {
					$location.path('/');
				});
				} else {
					$location.path('/');
				}				
			};

			
			$scope.deleteSong = function (song) {
				songModel.deleteSong(song).then(function(response) {
					if(response.wasSuccessful && response.id === song._id) {
						$scope.songs = _.without($scope.songs, song);
					}
				});
			};

			$scope.createNewSong = function () {
				//create new song and push result to list via promise object
				songModel.saveSong({ title: 'Enter Name' }).then(function(song) {
					$location.path('/define/' + song._id);
				});
			};
	}]);
}());

