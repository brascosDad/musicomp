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
        // song = { title: "newfoo" };
        song = { title: "foo1" };
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

            static find(searchObj) {
                return {
                    exec: () => {
                        return {
                            then: (fn) => {

                                const songs = [{ title: 'foo2' }, { title: 'foo3' }];
                                fn(songs);

                                return {
                                    "catch": (fn) => {

                                        if (error)  {
                                            fn({});
                                        }
                                    }
                                };
                            }
                        }
                    }
                }
            }

            static findById(searchObj) {
                return {
                    exec: () => {
                        return {
                            then: (fn) => {

                                // const songs = [{ title:"foo1" }, { title: "foo2" }];
                                // fn(songs);

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
            static findByIdAndRemove(id) {
                return {
                    exec: () => {
                        return {
                            then: (fn) => {
                                fn({});

                                return {
                                    "catch": (fn) => {

                                        if (error)  {
                                            fn({});
                                        }
                                    }
                                };
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
            request = { params: { id: null } },
            response = { send: function(data) { songQueue.push(data); } };

        songs.getSongs(request, response);

        // console.log(songQueue[0].d);
        expect(songQueue.length).toEqual(1);
        expect(songQueue[0].d[0].title).toEqual("foo2");
    });

    it("should delete song by id", () => {
        let SongsController = require("./SongsController"),
            songs = new SongsController(),
            request = { params: { id: 1} },
            response = { send: function(data) { songQueue.push(data); } };

        songs.deleteSong(request,response);

        expect(songQueue.length).toEqual(1);
        expect(songQueue[0].d.wasSuccessful).toBe(true);

    });

    it("should send error when attempting to get songs", () => {
        let SongsController = require("./SongsController"),
            songs = new SongsController(),
            request = { body: song, params:{ id: null } },
            response = { send: function(data) { songQueue.push(data); } };

        const errorMessage = "An error occurred.  Please contact the system administrator.";

        error = true;
        songs.getSongs(request, response);

        expect(songQueue.length).toEqual(2);
        expect(songQueue[1].d.error).toEqual(errorMessage);

    });

});

