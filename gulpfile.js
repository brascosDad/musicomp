"use strict";

var gulp = require('gulp'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	sass = require('gulp-sass'),
	sourcemaps = require('gulp-sourcemaps'),
	karmaServer = require('karma').Server,
	ngTemplates = require('gulp-ng-templates'),
	del = require('del'),
	htmlmin = require('htmlmin'),
	lr = require('tiny-lr')();

gulp.task('bundle-app', ['templates'], function() {
	return gulp.src(['src/app.js', 'src/**/*.js'])
		.pipe(sourcemaps.init())
			.pipe(concat('app.min.js'))
			.pipe(uglify())
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest('public/dist'));
});

gulp.task('bundle-lib', function() {
	return gulp.src(['node_modules/angular/angular.min.js', 'node_modules/angular-route/angular-route.min.js'])
		.pipe(sourcemaps.init())
			.pipe(concat('lib.min.js'))
		.pipe(sourcemaps.write('./'))	
		.pipe(gulp.dest('public/dist'));
});

// gulp.task('compileSass', function() {
//   return gulp.src("xxxxxx/scss/application.scss")
//       .pipe(maps.init())
//       .pipe(sass())
//       .pipe(maps.write('./'))
//       .pipe(gulp.dest('src/css'));
// })


//karma test run
gulp.task('test', function (done) {
  new karmaServer({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, done).start(); 
});

gulp.task('clean', function() {
  //del all the dist folder as well as compiled and gulp-created files
	del(['public/dist']) 
})

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

gulp.task('watchFiles', function () {
	//gulp.watch('src/**/*.scss', ['compileSass']);
	//gulp.watch('src/**/*.html', notifyLiveReload);
	gulp.watch('src/**/*.js', ['templates','bundle-app']);
}); 

gulp.task("build", ['templates', 'bundle-app', 'bundle-lib'], function() {
	return gulp.src(['src/*.js', 'src/*.html'])
		.pipe(gulp.dest('public/dist'));

});

	function startExpress() {

	  	var express = require('express');
		var bodyParser = require ('body-parser');
		var server = express();

		server.use(require('connect-livereload')())
		server.use(express.static('public/dist'));
		server.listen(9000);

		console.log('the server is running');
	}

	function startLiveReload() {
		lr.listen(35729);
	}

	function notifyLiveReload(event) {
		// `gulp.watch()` events provide an absolute path
  		// so we need to make it relative to the server root
  		var fileName = require('path').relative('public/dist', event.path);

  		lr.changed({
  			body: {
  				files: [fileName]
  			}
  		});
	}

gulp.task('serve', ['watchFiles'], function () {

  startExpress();
  startLiveReload();
  gulp.watch('src/**/*.html', notifyLiveReload);
});
