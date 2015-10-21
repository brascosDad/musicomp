var gulp = require('gulp'),
	//requireDir = require('require-dir'),
	//dir = requireDir('./gulp/tasks'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	//sass = require('gulp-sass'),
	sourcemaps = require('gulp-sourcemaps'),
	gulpUtil = require('gulp-util'),
	//ignore = require('gulp-ignore'),
	liveReload = require('gulp-livereload');

	//htmlmin = require('htmlmin'),
	gulp.task('bundle-app', function() {
		return gulp.src(['src/app.js', 'src/**/*.js'])
			.pipe(sourcemaps.init())
				.pipe(concat('app.min.js'))
				//.pipe(gulp.dest('./tmp/dist'))
				.pipe(uglify().on('error', gulpUtil.log))
			.pipe(sourcemaps.write('./'))
			.pipe(gulp.dest('./public/dist'))
			.pipe(liveReload());
	});

	
