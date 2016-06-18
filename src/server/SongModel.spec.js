"use strict";

describe("Song Model Tests", () => {

    it("should create schema properly", () => {

        const Song = require("./SongModel"),
            data = { title: "foobar" },
            song = new Song(data);

        expect(song.title).toEqual(data.title);
        
    });

});
