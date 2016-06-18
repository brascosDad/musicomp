"use strict";

describe("Logs Controller Tests", () => {

    let _ = require("lodash"),
        mockery = require("mockery"),
        clearModuleCache = require("./_clearModuleCache"),
        errorQueue,
        error,
        originalConsoleError;

    beforeEach(() => {

        error = { stack: "foo stack", message: "bar message" };
        errorQueue = [];
        originalConsoleError = console.error;

        console.error = _.noop;

        //make sure module can be loaded for each test
        clearModuleCache();

        mockery.enable({
            warnOnReplace: false,
            warnOnUnregistered: false
        });

        mockery.registerMock("./logger", {
            instance: () => {
                return {
                    error: (date, err) => { errorQueue.push(err); }
                };
            }
        });
    });

    afterEach(() => {
        mockery.deregisterAll();
        mockery.disable();
        console.error = originalConsoleError;
    });

    it("should add logs properly", () => {
        let LogsController = require("./logsController"),
            logs = new LogsController(),
            request = { body: error, user: { _id: 2 } },
            response = { send: function(data) { errorQueue.push(data); } };

        logs.saveLog(request, response);

        expect(errorQueue.length).toEqual(2);
        expect(errorQueue[0]).toEqual(error.stack);
        expect(errorQueue[1].d.message).toEqual(error.message);
        expect(errorQueue[1].d.stack).toEqual(error.stack);

    });

});
