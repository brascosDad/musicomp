(function() {
	'use strict';

	var $rootScope,
		song,
		songs, 
		$location,
		response,
		$routeParams;

	describe('Define Controller Tests', function() {
		
		beforeEach(module('musiComp'));
		beforeEach(inject(function(_$controller_, _$rootScope_, _$location_, _$routeParams_) {
			
			var mockSongModel = {
				getSongs: function(searchObj) {
					return {
						then: function(fn) {
							fn(songs);
						}
					};
				},
				saveSong: function(song) {
					return {
						then: function(fn) {
							fn(song);
						}
					};
				},
				deleteSong: function(song) {
					return {
						then: function(fn) {
							fn(response);
						}
					};
				}
			};

			songs = [{ _id: 333, id: 234, test: "foo" }, { id: 222, test: "bar" }, { id: 111, test: "me" }];

			response = { wasSuccessful: true, id: 333 };

			song = songs[0];

			// song = {
			// 	_id: 100,
			// 	title: 'titlefoo',
			// 	instruments: [{
			// 		id: 400,
			// 		member: "FooMember",
			// 		type: "FooType"
			// 	}],
			// 	sections: [
			// 		 { _id: 101, name: "foo" },
			// 		 { _id: 102,
			// 			name: "bar",
			// 		  	timeSig: 4,
			// 		  	measures: [{
			// 		  		id: 500,
			// 		  		rows: []
			// 		  	}]
			// 		 },
			// 		 { _id: 103, name:"me" }
			// 		 ]
			// 	};
			
			$location = _$location_;
			spyOn($location, 'path').and.returnValue();
			$routeParams = _$routeParams_;	
			// $routeParams.sectionId = 102;			
			$rootScope = _$rootScope_;
			// $rootScope.song = song;
			_$controller_('OpenCtrl', { $scope: $rootScope, songModel: mockSongModel, $routeParams: {sectionId: 102}});
		}));

		it('can successfully get songs from server', function() {
			expect($rootScope.songs.length).toEqual(3);
            expect($rootScope.songs[1].id).toEqual(222);
		});

		it('can go home', function() {
			$rootScope.goHome(song);
			expect($location.path).toHaveBeenCalledWith('/');
			song = null;
			$rootScope.goHome(song);
			expect($location.path).toHaveBeenCalledWith('/');
		});

		it('can delete a song', function() {
			$rootScope.deleteSong(song);
			expect($rootScope.songs.length).toEqual(2);
		});

		it('can create a new song', function() {
			$rootScope.createNewSong();
			expect($location.path).toHaveBeenCalledWith('/define/undefined');
		});

	});
}());