(function() {
	"use strict";
	angular.module('musiComp').controller('CreateCtrl', ['$scope', '$routeParams', '$location', '$mdDialog', 'SongData', 'songModel',
		function($scope, $routeParams, $location, $mdDialog, SongData, songModel) {
		
			var self = this,
				init = function() {

					self.hidden = false;
					self.isOpen = false;
					self.hover = true;

					songModel.addSongToScope($scope).then(function() {
						var sectionId = $routeParams.sectionId;

						if (sectionId) {
							$scope.currentSection = _.find($scope.song.sections, {_id: sectionId});
							$scope.currentSection.sectionColor = $scope.setColor();
						}
					});
				};

			$scope.setColor = function () {
				var letters = '0123456789ABCDEF'.split(''),
					color = '#';
				for (var i = 0; i < 6; i++) {
						color += letters[Math.floor(Math.random() * 16)];
					}
					return color;
			};

			$scope.beats = ['1','+','2','+','3','+','4','+','5','+','6','+','7','+'];

			$scope.blockColors = ['orange', 'blue', 'yellow', 'green', 'purple', 'red', 'brown', 'olive'];

			$scope.timeSigs = [
					{
						name:'4/4',
						value: 4
					},
					{
						name:'3/4',
						value: 3
					},
					{
						name:'2/4',
						value: 2
					},
					{
						name:'6/8',
						value: 6
					},
					{
						name:'7/8',
						value: 7
					}
			];

			$scope.buildRowsfromSignature = function () {
				var rows = new Array($scope.rowCount);

				_.each(rows, function(row, rowIndex) {

					var blocks = [];

					_.each($scope.song.instruments, function(instrument, instrumentIndex) {
						blocks[instrumentIndex] = { id: instrument.id };
					});

					rows[rowIndex] = { chord: null, blocks: blocks };
				});

				return rows
			};

			$scope.changeSignature = function(hasChanged) {

				$scope.rowCount = $scope.currentSection.timeSig * 2;
				//reset instrument rows for each measure

				if (($scope.currentSection.measures.length === 1 &&
					!$scope.currentSection.measures[0].rows.length) || hasChanged) {
					_.each($scope.currentSection.measures, function(measure) {
						measure.rows = $scope.buildRowsfromSignature();
					});
				}
			};

			$scope.addMeasure = function () {
				$scope.currentSection.measures.push({
					index: $scope.currentSection.measures.length,
					rows: $scope.buildRowsfromSignature()
				});
			};

			$scope.removeMeasure = function () {
				$scope.currentSection.measures.pop();
			};

			$scope.addBeat = function () {
				if ($scope.rowCount < $scope.currentSection.timeSig * 2) {
					$scope.rowCount++;
					$scope.currentSection.measures[$scope.currentSection.measures.length-1].rows = $scope.buildRowsfromSignature();
				}
			};

			$scope.removeBeat = function () {
				if ($scope.rowCount > 1) {
					$scope.rowCount--;
					$scope.currentSection.measures[$scope.currentSection.measures.length-1].rows = $scope.buildRowsfromSignature();
				}
			};

			$scope.newSection = function () {
				//set that color to sectionColor
				songModel.newSection($scope);

				$scope.currentSection = $scope.song.sections[$scope.song.sections.length-1];
				//create random color
				$scope.song.sections[$scope.song.sections.length-1].sectionColor = $scope.setColor();
				$scope.changeSignature();
			};

			$scope.goToArrange = function (song) {
				//save song so 'back' button works
				songModel.saveSong(song).then(function(song) {
					$scope.song = song;
					$location.path('/arrange/' + song._id);
				});
			};

			//only reset measures when time signatures actually changed to avoid onload/route change updates
			$scope.$watch("currentSection.timeSig", function(newValue, oldValue) {

				if (newValue && oldValue && parseInt(newValue, 10) !== parseInt(oldValue, 10)) {
					$scope.changeSignature(true);
				}

			});

			init();
	}]);
}());

