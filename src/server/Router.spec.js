"use strict";

describe("Router Tests", () => {

    let mockery = require("mockery"),
        configQueue,
        jwtConfig;

    beforeEach(() => {

        configQueue = [];

        mockery.enable({
            warnOnReplace: false,
            warnOnUnregistered: false
        });

        //mock out dependencies
        mockery.registerMock("./SongsController",
            class {
                getSongs(request, response) {}
                saveSong(request, response) {}
                deleteSong(request, response) {}
            });
        mockery.registerMock("./LogsController",
            class {
                saveLog(request, response) {}
            });
        // mockery.registerMock("./controllers/loginController",
        //     class {
        //         login(request, response) {}
        //     });
        // mockery.registerMock("express-jwt",
        //     (config) => {
        //        jwtConfig = config;
        //     });

        mockery.registerMock("./config", { secret: "BlahTest" });

        //mock out body-parser for verifying calls only
        mockery.registerMock("body-parser", {
            json: (config) => {
                configQueue.push(config);
                return "json being used";
            },
            urlencoded: (config) => {
                configQueue.push(config);
                return "urlencoded being used";
            }
        });
    });

    afterEach(() => {
        mockery.deregisterAll();
        mockery.disable();
    });

    it("should configure router properly", () => {
        let Router = require("./router"),
            express = { "static": (config) => { configQueue.push(config); }},
            server = {
                use: (config) => { configQueue.push(config); },
                route: (config) => {
                    configQueue.push("route: " + config);

                    let Pipe = class {
                        post (config) { configQueue.push("post: " + config); return this; }
                        get (config) { configQueue.push("get: " + config); return this; }
                    };

                    return new Pipe();
                }
            },
            router = new Router(express, server);

        expect(configQueue.length).toEqual(13);
        expect(configQueue[0]).toEqual("dist");
        expect(configQueue[1]).toEqual({});
        expect(configQueue[2]).toEqual("json being used");
        expect(configQueue[3]).toEqual({ extended: false });
        expect(configQueue[4]).toEqual("route: /api/songs/:id");
        expect(configQueue[5]).toEqual("get: getSongs(request, response) {}");
        expect(configQueue[6]).toEqual("delete: deleteSong(request, response) {}");
        expect(configQueue[7]).toEqual("route: /api/songs");
        expect(configQueue[8]).toEqual("post: saveSong(request, response) {}");
        expect(configQueue[9]).toEqual("get: getSongs(request, response) {}");
        expect(configQueue[10]).toEqual("put: saveSong(request, response) {}");
        expect(configQueue[11]).toEqual("route: /api/logs");
        expect(configQueue[12]).toEqual("post: saveLog(request, response) {}");        
    });

    // it("should handle jwt security properly if no auth token is provided", () => {
    //     const request = { headers: {} },
    //         token = jwtConfig.getToken(request);

    //     expect(token).toBeNull();
    // });

    // it("should handle jwt security properly if auth token is provided", () => {
    //     const crypto = require("crypto"),
    //         algorithm = "aes-256-ctr",
    //         clearToken = "woo hoo mate!",
    //         config = require("./config/config"),
    //         cipher = crypto.createCipher(algorithm, config.secret);

    //     let encryptedToken = cipher.update(clearToken, "utf8", "hex"),
    //         request = { headers: {} },
    //         token;

    //     encryptedToken += cipher.final("hex");
    //     request.headers.authorization = "Bearer " + encryptedToken;
    //     token = jwtConfig.getToken(request);

    //     expect(token).not.toBeNull();
    //     expect(token).toEqual(clearToken);
    // });
});
