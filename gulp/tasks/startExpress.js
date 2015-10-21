var gulp = require('gulp');
	//requireDir = require('require-dir'),
	//dir = requireDir('./gulp/tasks'),
	//concat = require('gulp-concat'),
	//uglify = require('gulp-uglify'),
	//sass = require('gulp-sass'),
	//sourcemaps = require('gulp-sourcemaps'),
	//gulpUtil = require('gulp-util'),
	//ignore = require('gulp-ignore'),
	//liveReload = require('gulp-livereload');

	//htmlmin = require('htmlmin'),
	
gulp.task('startExpress', function () {

	var express = require('express');
	var bodyParser = require ('body-parser');
	var server = express();

	server.use(express.static('public/dist'));
	server.listen(9000);

	console.log('the server is running');
});	
