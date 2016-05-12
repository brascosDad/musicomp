(function() {
	"use strict";
	angular.module('musiComp').controller('ArrangeCtrl', ['$scope','$routeParams', '$mdDialog', '$location', 'songModel', function($scope, $routeParams, $mdDialog, $location, songModel) {
		
		
		songModel.addSongToScope($scope);

		$scope.blockClass = function(value) {
			//console.log(value);
			if(value === 4) {
				return "block block4";
			} else if (value == 3) {
				return "block block3";
			} else if (value == 2) {
				return "block block2";
			} else if (value == 6) {
				return "block block6";
			} else if (value == 7) {
				return "block block7";
			}
		};

		$scope.sectionUp = function (index) {
			var array = $scope.song.sections,
				temp = array[index-1];
			if (array.length > 1 && index != 0) {				
				array[index-1] = array[index];
				array[index] = temp;
			}
		};

		$scope.sectionDown = function (index) {
			var array = $scope.song.sections,
				temp = array[index+1];
			if (array.length > 1 && index !== array.length-1) {
				temp = array[index+1];
				array[index+1] = array[index];
				array[index] = temp;
			}
		};

		$scope.editSection = function (song,index) {			
			//save the current song, since order may have changed
			songModel.saveSong(song).then(function(song) {
				$scope.song = song;
				$scope.currentSection = song.sections[index];
				$location.path('/create/' + song._id + '/' + $scope.currentSection._id);
			});				
		};

		$scope.createNewFrom = function (song,index) {
			
			$scope.dupeSection(index);
			songModel.saveSong(song).then(function(song) {
				$scope.song = song;
				$scope.currentSection = song.sections[index];
				$scope.currentSection.name = "RENAME";
				$location.path('/create/' + song._id + '/' + $scope.currentSection._id);
			});	
		};

		$scope.deleteSection = function (ev, index) {
			var array = $scope.song.sections,
				confirm = $mdDialog.confirm()
          			.title('Are you sure?')
          			.content('This is irreversible.')
          			.ariaLabel('Delete Section')
          			.targetEvent(ev)
          			.ok('Yes')
          			.cancel('Cancel');
          	$mdDialog.show(confirm).then(function() {
          		array.splice(index, 1);
          	});			
		};

		$scope.dupeSection = function (index) {
			var array = $scope.song.sections,
				dupe = array[index];
				array.push(dupe);
		};
	}]);
}());

