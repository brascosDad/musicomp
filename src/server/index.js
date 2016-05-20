"use strict";

const express = require("express"),	
	Router = require('./Router'),
	bodyParser = require("body-parser"),
	config = require('./config'),
	mongoose = require('mongoose'),
	globals = require('../../build/_globals'),
	GlobalErrorHandler = require("./GlobalErrorHandler"),
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