(function() {
	"use strict";
	angular.module('musiComp').controller('OpenCtrl', ['$scope', '$location', '$mdSidenav', "songModel",
		function($scope, $location, $mdSidenav, songModel) {

			//get all songs, empty search criteria being used, set collection via promise obj
			songModel.getSongs({}).then(function(songs) {
				$scope.songs = songs;
			});

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
			$scope.arrangementView = function (index) {
				$location.path('/arrange/' + $scope.songs[index]._id);
			};

			$scope.editSong = function (index) {
				$location.path('/define/' + $scope.songs[index]._id);
			}

			$scope.createNewSong = function () {

				//create new song and push result to list via promise object
				songModel.saveSong({ title: 'enter name' }).then(function(song) {
					$scope.songs.push(song);
					$location.path('/define/' + song._id);
				});
			};

			$scope.toggleMenu = function () {
				$mdSidenav('left').toggle();
			};
	}]);
}());

