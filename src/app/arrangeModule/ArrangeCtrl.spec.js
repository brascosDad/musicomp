(function() {
	'use strict';

	var $rootScope,
		song, 
		$location, 
		$mdDialog, 
		$q,
		deferred, 
		ev;

	describe('Arrange Controller Tests', function() {
		
		beforeEach(module('musiComp'));
		beforeEach(inject(function(_$controller_, _$rootScope_, _$location_, _$mdDialog_, _$q_) {
			
			var mockSongModel = {
				addSongToScope: function(scope) {
					return {};
				},
				saveSong: function(song) {
					return {
						then: function(fn) {
							fn(song);
						}
					};
				}
			};

			song = {
				_id: 100,
				title: 'titlefoo',
				sections: [
					 { _id: 101, name: "foo" },
					 { _id: 102, name: "bar" },
					 { _id: 103, name:"me" }
					 ]
				};
			$mdDialog = _$mdDialog_;
			$q = _$q_;
			$location = _$location_;
			spyOn($location, 'path').and.returnValue();
			$rootScope = _$rootScope_;
			_$controller_('ArrangeCtrl', { $scope: $rootScope, songModel: mockSongModel });
			_.extend($mdDialog, {
            	show: function(thing) {
                deferred = $q.defer();
                return deferred.promise;
            	}
        	});		
		})); 
		

		it('assigns the right class to the block', function() {
			expect($rootScope.blockClass(4)).toEqual('block block4');
			expect($rootScope.blockClass(3)).toEqual('block block3');
			expect($rootScope.blockClass(2)).toEqual('block block2');
			expect($rootScope.blockClass(6)).toEqual('block block6');
			expect($rootScope.blockClass(7)).toEqual('block block7');
		});

		it('moves the section up in the song.sections array', function() {
			$rootScope.song = song;
			$rootScope.sectionUp(2);
			expect($rootScope.song.sections[1].name).toEqual('me');
			$rootScope.sectionUp(1);
			expect($rootScope.song.sections[0].name).toEqual('me');
			//the function should do nothing since index === 0
			$rootScope.sectionUp(0);
			expect($rootScope.song.sections[0].name).toEqual('me');

		});

		it('moves the section down in the song.sections array', function () {
			$rootScope.song = song;
			$rootScope.sectionDown(2);
			//this should do nothing since the index is the last one
			expect($rootScope.song.sections[2].name).toEqual('me');
			$rootScope.sectionDown(1);
			expect($rootScope.song.sections[2].name).toEqual('bar');
			$rootScope.sectionDown(0);
			expect($rootScope.song.sections[1].name).toEqual('foo');
		});

		it('can edit the picked section', function() {
			//1. call editSection
			$rootScope.editSection(song,1);
			//2. did scope.song get defined?
			expect($rootScope.song.title).toEqual('titlefoo');
			expect($rootScope.currentSection.name).toEqual('bar');
			expect($location.path).toHaveBeenCalledWith('/create/100/102');
			//console.log($location.path);
			// expect($location.path()).toBe('/create/100/102');
		});

		it('can create a duplicate of a section', function() {
			$rootScope.song = song;
			$rootScope.dupeSection(0);
			expect($rootScope.song.sections.length).toEqual(4);
		});

		it('can create a new section from an existing one', function() {
			$rootScope.song = song;
			$rootScope.createNewFrom(song,0);
			expect($rootScope.song.sections.length).toEqual(4);
			expect($rootScope.song.title).toEqual('titlefoo');
			expect($rootScope.currentSection.name).toEqual('RENAME');
			expect($location.path).toHaveBeenCalledWith('/create/100/101');
		});

		it('can delete a section', function() {
			$rootScope.song = song;
			$rootScope.deleteSection(ev, 0);
			deferred.resolve();
        	$rootScope.$digest(); //  $mdDialog.show
			expect($rootScope.song.sections[0].name).toEqual('bar');
		});

		it('can save and go home', function() {
			$rootScope.doneGoHome();
			expect($location.path).toHaveBeenCalledWith('/open');
		});


	});
}());