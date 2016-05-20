(function() {
	'use strict';

	//declare variables


	describe('getGreeting', function() {
		var $rootScope;
		beforeEach(module('musiComp'));
		beforeEach(inject(function(_$controller_, _$rootScope_) {
			$rootScope = _$rootScope_;
			_$controller_('ArrangeCtrl', { $scope: $rootScope });
		})); 
		

		it('says Hello to me', function() {
			expect($rootScope.getGreeting('Ernesto')).toEqual('Hello Ernesto');
		});
	});
}());