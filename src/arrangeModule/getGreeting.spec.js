(function() {
	'use strict';

	//declare variables


	describe('getGreeting', function() {
		var greeter;
		beforeEach(module('musiComp'));
		beforeEach(inject(function(_ArrangeCtrl_) {
			greeter = _ArrangeCtrl_;
		}));

		it('says Hello to me', function() {
			expect(greeter.getGreeting('Ernesto')).toEqual('Hello Ernesto');
		});
	});
}());