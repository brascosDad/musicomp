"use strict";

describe("Server Tests", () => {

    let mockery = require("mockery"),
        consoleLog,
        originalConsoleLog;

    beforeEach(() => {

        consoleLog = [];
        originalConsoleLog = console.log;
        console.log = (message) => { consoleLog.push(message); };

        //make sure module can be loaded for each test (only delete server b/c globals is still needed)
        delete require.cache[require.resolve("./index")];

        mockery.enable({
            warnOnReplace: false,
            warnOnUnregistered: false
        });

        mockery.registerMock("express", () => {
            console.log("express is instantiated");
            return {
                listen: (port) => {
                    console.log("listening on port: " + port);
                },
                use: () => {
                    console.log("using object");
                }
            }
        });
        mockery.registerMock("./Router", class {
            constructor(express, server) {
                console.log("express is injected");
                console.log("server is injected");
            }
        });
        mockery.registerMock("connect-livereload", () => {
            console.log("livereload is instantiated");
        });
        mockery.registerMock("./globalErrorHandler", class { });
        mockery.registerMock("fs", {
            readFileSync: (ssl) => {
                console.log(ssl);
            }
        });
        mockery.registerMock("https", {
            createServer: (config) => {
                console.log(config);
                return {
                    listen: (port) => {
                        console.log(port);
                    }
                };
            }
        });
        mockery.registerMock("./config/config", {
            databaseUrl: "mockDatabaseUrl"
        });
        mockery.registerMock("mongoose", {
            connect: (url) => {
                console.log(url);
            }
        });
    });

    afterEach(() => {
        mockery.deregisterAll();
        mockery.disable();
        console.log = originalConsoleLog;
    });

    it("should start server properly in development mode", () => {
        let globals = require("../../build/_globals"),
            isProduction = globals.isProduction;
        globals.isProduction = false;
        let server = require("./index");

        expect(consoleLog.length).toEqual(11);
        expect(consoleLog[0]).toEqual("express is instantiated");
        expect(consoleLog[1]).toEqual("livereload is instantiated");
        expect(consoleLog[2]).toEqual("using object");
        expect(consoleLog[3]).toEqual("using connect-livereload");        
        expect(consoleLog[4]).toEqual("express is injected");
        expect(consoleLog[5]).toEqual("server is injected");
        expect(consoleLog[6]).toEqual("using object");
        expect(consoleLog[7]).toEqual("using object");
        expect(consoleLog[8]).toEqual("mockDatabaseUrl");
        expect(consoleLog[9]).toEqual("listening on port: 9000");        
        expect(consoleLog[10]).toEqual("MusiComp is up and running on http://localhost:9000");

        globals.isProduction = isProduction;
    });

    // it("should start server properly in production mode", () => {
    //     let globals = require("../../build/_globals"),
    //         isProduction = globals.isProduction;
    //     globals.isProduction = true;
    //     let server = require("./server");

    //     expect(consoleLog.length).toEqual(9);
    //     expect(consoleLog[0]).toEqual("express is instantiated");
    //     expect(consoleLog[1]).toEqual("./src/server/config/deliverytracker-key.pem");
    //     expect(consoleLog[2]).toEqual("./src/server/config/deliverytracker-cert.pem");
    //     expect(consoleLog[3]).toEqual("express is injected");        
    //     expect(consoleLog[4]).toEqual("server is injected");
    //     expect(consoleLog[5]).toEqual("mockDatabaseUrl");        
    //     expect(consoleLog[6]).toEqual({ key: undefined, cert: undefined });
    //     expect(consoleLog[7]).toEqual(8888);
    //     expect(consoleLog[8]).toEqual("Delivery Tracker server is now up...https://localhost:8888");

    //     globals.isProduction = isProduction;
    // });
});

