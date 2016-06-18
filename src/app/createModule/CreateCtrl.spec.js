(function() {
	'use strict';

	var $rootScope,
		song, 
		$location,
		$routeParams,
		color;

	describe('Create Controller Tests', function() {
		
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
                    name: '',
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
			_$controller_('CreateCtrl', { $scope: $rootScope, songModel: mockSongModel, $routeParams: {sectionId: 102}});
		}));

		it('can set color', function() {
			var isHex = function (value) {
				var a = parseInt(value,16);
				return (a.toString(16) === value.toLowerCase());
			},
			extracted = $rootScope.setColor().slice(1,6);
			//expect return value to be hex format
			expect($rootScope.setColor()).toBeDefined();
			//string length is 7 characters
			expect($rootScope.setColor().length).toEqual(7);
			//first character is '#'
			expect($rootScope.setColor().indexOf('#')).toEqual(0);
			//second through the seventh is either a number
			// from 0-9 or a letter from A to F
			expect(isHex(extracted)).toBe(true);
		});

		it('can change time signature and build rows', function() {
			//does init set $scope.currentSection
			expect($rootScope.currentSection.name).toEqual('bar');
			$rootScope.changeSignature();
			expect($rootScope.rowCount).toEqual(8);
			//expect there to be a chord value of null for every row
			expect($rootScope.currentSection.measures[0].rows.length).toEqual(8);
			expect($rootScope.currentSection.measures[0].rows[0].chord).toBeNull();
			expect($rootScope.currentSection.measures[0].rows[7].chord).toBeNull();
			//expect there 1 block for every row
			expect($rootScope.currentSection.measures[0].rows[0].blocks.length).toEqual(1);
			expect($rootScope.currentSection.measures[0].rows[7].blocks.length).toEqual(1);
		});	

		it('can add a measure', function() {
			$rootScope.addMeasure();
			expect($rootScope.currentSection.measures.length).toEqual(2);
		});	

		it('can remove a measure', function() {
			$rootScope.removeMeasure();
			expect($rootScope.currentSection.measures.length).toEqual(0);
		});

		it('can add a beat(row)', function() {
			$rootScope.rowCount = 3;
			$rootScope.addBeat();
			expect($rootScope.currentSection.measures[0].rows.length).toEqual(4);
		});

		it('can remove a beat(row)', function() {
			$rootScope.rowCount = 7;
			$rootScope.removeBeat();
			expect($rootScope.currentSection.measures[0].rows.length).toEqual(6);
		});

		it('can create a new section', function() {
			$rootScope.newSection();
			expect($rootScope.song.sections.length).toEqual(4);
		});

		it('can switch views to arrange', function() {
			$rootScope.goToArrange(song);
			expect($rootScope.song.title).toEqual('titlefoo');
			expect($location.path).toHaveBeenCalledWith('/arrange/100');
		});

		//test for $watch on timeSig?

	});
}());