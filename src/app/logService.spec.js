(function () {
    "use strict";

    var service,
        openParams,
        headerParams,
        sendParams;

    beforeEach(module("musiComp"));

    describe("Log Service Tests", function () {

        beforeEach(inject(function (logService, $window) {

            service = logService;

            openParams = { method: "", path: "", isAsync: false };
            headerParams = [];
            sendParams = { obj: "" };

            XMLHttpRequest = function () { };
            XMLHttpRequest.prototype.open = function (method, path, isAsync) {
                openParams.method = method;
                openParams.path = path;
                openParams.isAsync = isAsync;
            };
            XMLHttpRequest.prototype.setRequestHeader = function(key, value) {
                headerParams.push({ key: key, value: value });
            };
            XMLHttpRequest.prototype.send = function(obj) {
                sendParams.obj = obj;
            };

            // $window.sessionStorage.token = "foobarTest";

        }));

        it("should send log message to server appropriately", function () {

            var log = "foo bar";
            service.save(log);

            expect(openParams).toEqual({ method: "post", path: "api/logs", isAsync: true });
            expect(headerParams.length).toEqual(1);
            expect(headerParams[0]).toEqual({ key: "Content-Type", value: "application/json" });
            // expect(headerParams[1]).toEqual({ key: "Authorization", value: "Bearer foobarTest" });
            expect(sendParams).toEqual({ obj: '"foo bar"' });

        });

    });

}());