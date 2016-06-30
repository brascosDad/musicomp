"use strict";

const bodyParser = require("body-parser"),
	songs = new (require("./SongsController"))(),
	logs = new (require("./LogsController"))();

class Router {
	constructor(express, server) {

		server.use(express.static('dist'));
		server.use(bodyParser.json({}));
		server.use(bodyParser.urlencoded({extended: false}));

		server.route("/api/songs/:id")
			.get(songs.getSongs)
			.delete(songs.deleteSong);

		server.route("/api/songs")
			.post(songs.saveSong)
			.get(songs.getSongs)
			.put(songs.saveSong);

		server.route("/api/logs")
			.post(logs.saveLog);
	}
}

module.exports = Router;
