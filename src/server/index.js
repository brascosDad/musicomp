"use strict";

const globals = require("../../build/_globals"),
	express = require("express"),
	Router = require("./Router"),
	GlobalErrorHandler = require("./GlobalErrorHandler"),
	config = require("./config"),
	mongoose = require("mongoose"),
	server = express();

if (!globals.isProduction) {
	const liveReload = require("connect-livereload");
	server.use(liveReload());
	console.log("using connect-livereload");
}

new Router(server, express);
new GlobalErrorHandler({ server: server });
mongoose.Promise = Promise;
mongoose.connect(config.databaseUrl);

server.listen(9000);
console.log('MusiComp is up and running on http://localhost:9000');