"use strict";

describe("Global Error Handler Tests", () => {

    let mockery = require("mockery"),
        clearModuleCache = require("./_clearModuleCache"),
        consoleLog,
        originalConsoleError,
        originalDate;

    beforeEach(() => {

        consoleLog = [];
        originalDate = Date;
        originalConsoleError = console.error;
        console.error = (message) => { consoleLog.push(message); };

        //make sure module can be loaded for each test
        clearModuleCache();

        mockery.enable({
            warnOnReplace: false,
            warnOnUnregistered: false
        });

        mockery.registerMock("simple-node-logger", {
            createRollingFileLogger: () => {
                return {
                    error: (param1, param2) => {
                        console.error(param1);
                        console.error(param2);
                    }
                };
            }
        });

        mockery.registerMock("mkdirp", () => {});
    });

    afterEach(() => {
        mockery.deregisterAll();
        mockery.disable();
        console.error = originalConsoleError;
        Date = originalDate;
    });

    it("should catch all errors properly", () => {

        let err = { stack: "fooBar" },
            server = {
                use: (fn) => {
                    let req = {},
                        res = { status: (s) => { console.error(s); }, send: (m) => { console.error(m); } },
                        next = (e) => { console.error(e); };

                    fn(err, req, res, next);
                }
            },
            GlobalErrorHandler = require("./GlobalErrorHandler");

        Date = class { toJSON() { console.error("fooBarDate"); return "fakeDateHere"; } };
        let handler = new GlobalErrorHandler({ server: server, useManualRegistration: true});
        handler.registerGlobalErrorHandler();

        expect(consoleLog.length).toEqual(7);
        expect(consoleLog[0]).toEqual(500);
        expect(consoleLog[1]).toEqual({ error: "An error occurred.  Please contact the system administrator." });
        expect(consoleLog[2]).toEqual("fooBarDate");
        expect(consoleLog[3]).toEqual("fakeDateHere");
        expect(consoleLog[4]).toEqual("fooBar");
        expect(consoleLog[5]).toEqual("fooBar");              
        expect(consoleLog[6]).toEqual({ stack: "fooBar" });

        //test 401 errors
        consoleLog = [];
        err.name = "UnauthorizedError";
        handler = new GlobalErrorHandler({ server: server, useManualRegistration: true});
        handler.registerGlobalErrorHandler();

        expect(consoleLog.length).toEqual(7);
        expect(consoleLog[0]).toEqual(401);
        expect(consoleLog[1]).toEqual({ error: "An error occurred.  Please contact the system administrator." });
        expect(consoleLog[2]).toEqual("fooBarDate");
        expect(consoleLog[3]).toEqual("fakeDateHere");
        expect(consoleLog[4]).toEqual("fooBar");
        expect(consoleLog[5]).toEqual("fooBar");        
        expect(consoleLog[6]).toEqual({ stack: "fooBar", name: "UnauthorizedError" });
    });

    it("should handle not found routes properly", () => {

        let server = {
                use: (fn) => {
                    let req = {},
                        res = { send: (m) => { console.error(m); },status: (s) => { console.error(s); }, redirect: (s, m) => { console.error(s); console.error(m); } };

                    fn(req, res);
                }
            },
            GlobalErrorHandler = require("./GlobalErrorHandler");

        Date = class { toJSON() { console.error("fooBarDate"); return "fakeDateHere"; } };
        let handler = new GlobalErrorHandler({ server: server, useManualRegistration: true});
        handler.registerNotFoundHandler();

        //was 3, now 6
        expect(consoleLog.length).toEqual(6);
        expect(consoleLog[0]).toEqual(404);
        //was 302, now error message obj
        expect(consoleLog[1]).toEqual({ error: "An error occurred.  Please contact the system administrator." });
        //was "/di/error", now fooBarDate
        expect(consoleLog[2]).toEqual("fooBarDate");
    });

    it("should register handlers properly through constructor when useManualRegistration is false", () => {

        let handlers = [],
            server = {
                use: (fn) => {
                    handlers.push(fn);
                }
            },
            GlobalErrorHandler = require("./GlobalErrorHandler");

        new GlobalErrorHandler({ server: server });

        expect(handlers.length).toEqual(2);
    });
});