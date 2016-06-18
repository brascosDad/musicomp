(function() {
	"use strict";

	//declare variables
	var $rootScope,
		$compile,
		element;

	//inject app
	beforeEach(module("musiComp"));
	
	describe('picked Block directive', function() {
		//inject rootscope and compile
		beforeEach(inject(function(_$rootScope_, _$compile_) {
			//set up scope with test data
			$rootScope = _$rootScope_;
			$compile = _$compile_;
			$rootScope.block = {
				id: 1,
				isChecked: false
			};

			//create an element
			element = angular.element(
				'<div>' +
					'<div data-picked-block data-block="block">' +
					'</div>' +
				'</div>');

			//compile element
			element = $compile(element)($rootScope);

			//digest element
			$rootScope.$digest();
		}));
		
		it('should add class when clicked', function() {
			element.triggerHandler('click');
			expect(element.hasClass('blue')).toBe(true);
		});

		it('should remove class when clicked again', function() {
			element.triggerHandler('click');
			element.triggerHandler('click');
			expect(element.hasClass('blue')).toBe(false);
		});
	});

}());