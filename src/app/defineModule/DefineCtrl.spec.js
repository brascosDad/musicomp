(function() {
	'use strict';

	var $rootScope,
		song, 
		$location,
		$routeParams;

	describe('Define Controller Tests', function() {
		
		beforeEach(module('musiComp'));
		beforeEach(inject(function(_$controller_, _$rootScope_, _$location_, _$routeParams_) {
			
			var mockSongModel = {
				addSongToScope: function(scope) {
					return {
						then: function(fn) {
							fn();
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
				newSection: function(scope) {
					$rootScope.song.sections.push({
						_id: 600,
	                    name: 'lastfoo',
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
				}
			};

			song = {
				_id: 100,
				title: 'titlefoo',
				instruments: [{
					id: 400,
					member: "FooMember",
					type: "FooType"
				}],
				sections: [
					 { _id: 101, name: "foo" },
					 { _id: 102,
						name: "bar",
					  	timeSig: 4,
					  	measures: [{
					  		id: 500,
					  		rows: []
					  	}]
					 },
					 { _id: 103, name:"me" }
					 ]
				};
			
			$location = _$location_;
			spyOn($location, 'path').and.returnValue();
			$routeParams = _$routeParams_;	
			// $routeParams.sectionId = 102;			
			$rootScope = _$rootScope_;
			$rootScope.song = song;
			_$controller_('DefineCtrl', { $scope: $rootScope, songModel: mockSongModel, $routeParams: {sectionId: 102}});
		}));

		it('can add an instrument', function() {
			$rootScope.addInstrument();
			expect($rootScope.song.instruments.length).toEqual(2);
		});

		it('can remove an instrument', function() {
			$rootScope.removeInstrument();
			expect($rootScope.song.instruments.length).toEqual(0);
		});

		it('can proceed to the create view', function() {
			$rootScope.next(song);
			expect($rootScope.song.sections.length).toEqual(4);
			expect($rootScope.currentSection.name).toEqual('lastfoo');
			expect($location.path).toHaveBeenCalledWith('/create/100/600');
		});

	});
}());