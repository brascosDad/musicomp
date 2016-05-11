(function() {
	"use strict";
	angular.module('musiComp').service('SongData', function() {
		var songs = [],			
			song = {};

			return { songs:songs, song:song, currentSong:null };

	});
}());

