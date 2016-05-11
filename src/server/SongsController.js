"use strict";

const Song = require("./SongModel"),
    responseHelper = require("./responseHelper");

class SongsController {

    constructor() { }

    getSongs(request, response) {

        const searchId = request.params.id,
            searchObj = searchId || {},
            searchFunc = searchId ? "findById" : "find";

        Song[searchFunc](searchObj).exec()
            .then((foundSong) => {
                responseHelper.sendResponse(response, foundSong);
            })
            .catch((err) => {
                responseHelper.sendError(response, err);
            });
    }

    saveSong(request, response) {

        const song = new Song(request.body);
        Song.findByIdAndUpdate(song._id, song, { new: true, upsert: true })
            .then((savedSong) => {
                responseHelper.sendResponse(response, savedSong);
            })
            .catch((err) => {
                responseHelper.sendError(response, err);
            });
    }

    deleteSong(request, response) {

        const id = request.params.id;
        Song.findByIdAndRemove(id).exec()
            .then(() => {
                responseHelper.sendResponse(response, { wasSuccessful: true, id: id });
            })
            .catch((err) => {
                responseHelper.sendError(response, err);
            });
    }
}

module.exports = SongsController;
