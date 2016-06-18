"use strict";

describe("Logger Tests", () => {

    let mockery = require("mockery"),
        clearModuleCache = require("./_clearModuleCache");

    beforeEach(() => {

        //make sure module can be loaded for each test
        clearModuleCache();

        mockery.enable({
            warnOnReplace: false,
            warnOnUnregistered: false
        });

        mockery.registerMock("simple-node-logger", {
            createRollingFileLogger: () => {
                return new Object("logger tests");
            }
        });

        mockery.registerMock("mkdirp", () => {});
    });

    afterEach(() => {
        mockery.deregisterAll();
        mockery.disable();
    });

    it("should incorporate singleton functionality", () => {

        let logger = require("./logger"),
            logger2 = require("./logger"),
            instance1 = logger.instance(),
            instance2 = logger2.instance();

        expect(instance1).toEqual(instance2);
    });
});
