var gulp = require('gulp'),
	//requireDir = require('require-dir'),
	//dir = requireDir('./gulp/tasks'),
	concat = require('gulp-concat'),
	//uglify = require('gulp-uglify'),
	//sass = require('gulp-sass'),
	sourcemaps = require('gulp-sourcemaps');
	//gulpUtil = require('gulp-util'),
	//ignore = require('gulp-ignore'),
	//liveReload = require('gulp-livereload');

	//htmlmin = require('htmlmin'),
	gulp.task('bundle-lib', function() {
		return gulp.src(['node_modules/angular/angular.min.js', 'node_modules/angular-route/angular-route.min.js'])
			.pipe(sourcemaps.init())
				.pipe(concat('lib.min.js'))
			.pipe(sourcemaps.write('./'))	
			.pipe(gulp.dest('./public/dist'));
	});
