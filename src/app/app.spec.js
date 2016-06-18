(function() {
	"use strict";

	var $route,
		logMessages,
		$exceptionHandler,
		lService,
		$location,
		$rootScope,
		$timeout;

	// beforeEach(module('musiComp'));	

	describe('App Tests', function() {

		beforeEach(module('musiComp', function($provide) {
			$provide.factory('logService', function() {
				return {
					save: function(log) {
						logMessages.push(log);
					}
				};
			});

			//mock log error
			console.error = angular.noop;
		}));

		beforeEach(inject(function(_$route_, _$location_, _$rootScope_, _$exceptionHandler_, logService, _$timeout_) {
			$rootScope = _$rootScope_;
			$route = _$route_;
			$location = _$location_;
			lService = logService;
			$exceptionHandler = _$exceptionHandler_;
			logMessages = [];
			$timeout = _$timeout_;

		}));

		describe('index/home route', function() {
			// beforeEach(inject(function($httpBackend) {
			// 	$httpBackend.expectGET('')
			// 	.respond(200);
			// }));

			it('should load the index page', function() {
				$location.path('/');
				$rootScope.$digest();
				expect($route.current.controller).toBe('OpenCtrl');
				expect($route.current.templateUrl).toEqual('app/openModule/_open.html');
			});
		});

		describe('define route', function() {
			// beforeEach(inject(function($httpBackend) {
			// 	$httpBackend.expectGET('define/:songId')
			// 	.respond(200);
			// }));

			it('should load the define page', function() {
				$location.path('/define/:songId');
				$rootScope.$digest();
				expect($route.current.controller).toBe('DefineCtrl');
				expect($route.current.templateUrl).toEqual('app/defineModule/_define.html');
			});
		});

		describe('arrange route', function() {
			// beforeEach(inject(function($httpBackend) {
			// 	$httpBackend.expectGET('arrange/:songId')
			// 	.respond(200);
			// }));

			it('should load the define page', function() {
				$location.path('/arrange/:songId');
				$rootScope.$digest();
				expect($route.current.controller).toBe('ArrangeCtrl');
				expect($route.current.templateUrl).toEqual('app/arrangeModule/_arrange.html');
			});
		});

		describe('create route', function() {
			// beforeEach(inject(function($httpBackend) {
			// 	$httpBackend.expectGET('create/:songId')
			// 	.respond(200);
			// }));

			it('should load the create page with song id', function() {
				$location.path('/create/:songId');
				$rootScope.$digest();
				expect($route.current.controller).toBe('CreateCtrl');
				expect($route.current.templateUrl).toEqual('app/createModule/_create.html');
			});
		});

		it('should load the create via song and section id', function() {
			$location.path('/create/:songId/:sectionId');
				$rootScope.$digest();
				expect($route.current.controller).toBe('CreateCtrl');
				expect($route.current.templateUrl).toEqual('app/createModule/_create.html');
		});

		it("should handle global exceptions properly where error is not an object but just a message", function () {

            var error = "foo bar";
            $timeout(function () { throw error; });
            $timeout.flush();
            expect(logMessages[0]).toEqual({ level: "error", message: error, cause: undefined, exception: error, stack: error });
        });

        it("should handle global exceptions properly where error IS an object", function () {

            var testError = { message: "foo", stack: "bar" };
            $exceptionHandler(testError);
            expect(logMessages[0]).toEqual({ level: "error", message: "foo", cause: undefined, exception: "foo", stack: "bar" });
        });

        it("should handle global exceptions properly when there IS NO ERROR", function () {

            spyOn(lService, "save").and.callThrough();

            $exceptionHandler(undefined);

            expect(lService.save).not.toHaveBeenCalled();
        });

	});
}());