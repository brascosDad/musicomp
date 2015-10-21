
var gulp = require('gulp'),
	//requireDir = require('require-dir'),
	//dir = requireDir('./gulp/tasks'),
	//concat = require('gulp-concat'),
	//uglify = require('gulp-uglify'),
	//sass = require('gulp-sass'),
	//sourcemaps = require('gulp-sourcemaps'),
	//gulpUtil = require('gulp-util'),
	//ignore = require('gulp-ignore'),
	liveReload = require('gulp-livereload');

	//htmlmin = require('htmlmin'),
	gulp.task('watchFiles', function () {
		liveReload.listen();
		//gulp.watch('src/**/*.scss', ['compileSass']);
		gulp.watch('src/**/*.html', ['templates','bundle-app']);//make sure these are synchronous
		gulp.watch('src/**/*.js', ['bundle-app']); 
	}); 
