"use strict";

var gulp = require('gulp'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	sass = require('gulp-sass'),
	sourcemaps = require('gulp-sourcemaps'),
	karmaServer = require('karma').Server,
	ngTemplates = require('gulp-ng-templates'),
	del = require('del');
	//htmlmin = require('htmlmin'),

//
//  SERVE  /////////////////////////////////////////
//
	gulp.task('startExpress', function () {
	
		var express = require('express');
		var bodyParser = require ('body-parser');
		var server = express();
	
		//server.use(require('connect-livereload')())
		server.use(express.static('public/dist'));
		server.listen(9000);
	
		console.log('the server is running');
	});	
		
	// gulp.task('startLiveReload', function () {
	
	// 	tinylr = require('tiny-lr')();
	// 	tinylr.listen(35729);
	// });

	// function notifyLiveReload(event) {
	// 	// `gulp.watch()` events provide an absolute path
	//   	// so we need to make it relative to the server root
	//   	var fileName = require('path').relative('public/dist', event.path);
	
	//   	lr.changed({
	//   		body: {
	//   			files: [fileName]
	//   		}
	//   	});
	// }

//
//  STYLES ////////////////////////////////////////
//

	// gulp.task('compileSass', function() {
	//   return gulp.src("src/application.scss")
	//       .pipe(sourcemaps.init())
	//       .pipe(sass())
	//       .pipe(sourcemaps.write('./'))
	//       .pipe(gulp.dest('src/css'));
	// })


//
// TESTING ///////////////////////////////
//
	//karma test run
	gulp.task('test', function (done) {
	  new karmaServer({
	    configFile: __dirname + '/karma.conf.js',
	    singleRun: true
	  }, done).start(); 
	});

//
// MAINTENANCE //////////////////////////
//
	gulp.task('clean', function() {
	  //del all the dist folder as well as compiled and gulp-created files
		del(['public/dist']) 
	})

//
//  BUNDLING /////////////////////////////////////////
//
	gulp.task('templates', function () {
	    return gulp.src('src/**/*.html')
	        //.pipe(htmlmin({collapseWhitespace: true}))
	        .pipe(ngTemplates({
	            filename: 'templates.js',
	            module: "mcTemplates",
	            standalone: true ,
	            path: function (path, base) {
	                return path.replace(base, '').replace('/templates', '');
	            }
	        }))  
	        .pipe(gulp.dest('./src'));
	});
		

	gulp.task('bundle-app', ['templates'], function() {
		return gulp.src(['src/app.js', 'src/**/*.js'])
			.pipe(sourcemaps.init())
				.pipe(concat('app.min.js'))
				.pipe(uglify())
			.pipe(sourcemaps.write('./'))
			.pipe(gulp.dest('./src'));
	});

	gulp.task('bundle-lib', function() {
		return gulp.src(['node_modules/angular/angular.min.js', 'node_modules/angular-route/angular-route.min.js'])
			.pipe(sourcemaps.init())
				.pipe(concat('lib.min.js'))
			.pipe(sourcemaps.write('./'))	
			.pipe(gulp.dest('./src'));
	});

	gulp.task('build', function () {
		return gulp.src(['src/**/*.html', 'src/**/*.js', 'src/**/*.map'])
		.pipe(gulp.dest('public/dist')); //this takes too long!!
	});

//
// WATCH ///////////////////////////////////
//
	gulp.task('watchFiles', function () {
		//gulp.watch('src/**/*.scss', ['compileSass']);
		gulp.watch('src/**/*.html', ['bundle-app']);
		//gulp.watch('src/**/*.js', ['bundle-app']); //this causes an endless loop!
	}); 

//
// DEFAULT ////////////////////////////////////
//	
	gulp.task('default', ['startExpress'], function () {

	 });
