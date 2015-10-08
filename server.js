(function() {
	"use strict";
	var express = require('express');
	var bodyParser = require ('body-parser');
	var server = express();

	server.use(express.static('public/dist'));
	server.listen(9000);

	console.log('the server is running');
}());