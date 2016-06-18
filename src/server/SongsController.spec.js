"use strict";

describe("Songs Controller Tests", () => {

    let _ = require("lodash"),
        mockery = require("mockery"),
        clearModuleCache = require("./_clearModuleCache"),
        song,
        songQueue,
        error;

    beforeEach(() => {

        error = undefined;
        song = { title: "newfoo" };
        songQueue = [];

        //make sure module can be loaded for each test
        clearModuleCache();

        mockery.enable({
            warnOnReplace: false,
            warnOnUnregistered: false
        });

        mockery.registerMock("./SongModel", class {

            constructor(data) {
                _.assign(this, data);
            }

            retrieve(searchObj) {
                return {
                    exec: () => {
                        return {
                            then: (fn) => {

                                const songs = [{ title:"foo1" }, { title: "foo2" }];
                                fn(songs);

                                return {
                                    "catch": (fn) => {

                                        if (error)  {
                                            fn({});
                                        }
                                    }
                                };
                            }
                        };
                    }
                };
            }

            //does the save func need to pass in same args as findByIdAndUpdate?
            save() {
                return {
                    then: (fn) => {

                        fn(song);

                        return {
                            "catch": (fn) => {

                                if (error)  {
                                    fn({});
                                }
                            }
                        };
                    }
                };
            }

            //pass in id to delete func?
            delete() {
                return {
                    exec: () => {
                        return {
                            then: (fn) => {
                                fn({})
                            }
                        }
                    }
                }
            }

            
        });

        mockery.registerMock("./logger", {
            instance: () => {
                return {
                    error: _.noop
                };
            }
        });
    });

    afterEach(() => {
        mockery.deregisterAll();
        mockery.disable();
    });

    it("should get all songs properly", () => {
        let SongsController = require("./SongsController"),
            songs = new SongsController(),
            request = { params:{ id: null } },
            response = { send: function(data) { songQueue.push(data); } };

        songs.getSongs(request, response);

        expect(songQueue.length).toEqual(2);
        expect(songQueue[0].d.title).toEqual("foo1");
    });

    it("should get song by id", () => {

    });

    it("should send error when attempting to get songs", () => {
        let SongsController = require("./SongsController"),
            songs = new SongsController(),
            request = { body: song },
            response = { send: function(data) { songQueue.push(data); } };

        const errorMessage = "An error occurred.  Please contact the system administrator.";

        error = true;
        songs.getSongs(request, response);

        expect(songQueue.length).toEqual(3);
        expect(songQueue[1].d.error).toEqual(errorMessage);

    });

});

