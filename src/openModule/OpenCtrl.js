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

			$scope.menuItems = [
				{
					name: 'Home',
					iconName: 'home',
					href: '#open'
				},
				{
					name: 'Song Info',
					iconName: 'edit',
					href: '#define'
				},
				{
					name: 'Create',
					iconName: 'code',
					href: '#create'
				},
				{
					name: 'Arrange',
					iconName: 'sort',
					href: '#arrange'
				}
			];
			// $scope.arrangementView = function (index) {
			// 	$location.path('/arrange/' + $scope.songs[index]._id);
			// };

			// $scope.editSong = function (index) {
			// 	$location.path('/define/' + $scope.songs[index]._id);
			// }
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

			$scope.toggleMenu = function () {
				$mdSidenav('left').toggle();
			};
	}]);
}());

