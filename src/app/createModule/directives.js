(function() {
	'use strict';
	angular.module('musiComp').directive('pickedBlock', function() {
		return {
			restrict: 'A',
			replace: false,
			scope: {
				block: '=' 
			},
			link: function(scope, elem, attrs) {
				var blockColors = ['orange', 'blue', 'yellow', 'green', 'purple', 'red', 'brown', 'olive'],
					clazz = blockColors[scope.block.id],
					parentEl = elem.parent(),
					paintBlock = function() {
						if (scope.block.isChecked) {
							parentEl.addClass(clazz);
						} else {
						//delete background color rule
							parentEl.removeClass(clazz);
						}
					};

				paintBlock();
				parentEl.bind('click', function() {
					//change value of isChecked
					scope.block.isChecked = !scope.block.isChecked;
					paintBlock();
				});
			}
		};
	});
}());