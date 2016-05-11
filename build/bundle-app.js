var globals = require("./_globals"),
	gulp = require('gulp'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	sourcemaps = require('gulp-sourcemaps'),
	gulpUtil = require('gulp-util');

	gulp.task('bundle-app', function() {

		var sources = ['src/app.js', 'src/**/*.js', '!src/server/**/*.*'];

		if (!globals.isProduction) {
			return gulp.src(sources)
				.pipe(concat('app.min.js'))
				.pipe(gulp.dest('./dist'));
		} else {
			return gulp.src(sources)
				.pipe(sourcemaps.init())
				.pipe(concat('app.min.js'))
				.pipe(uglify())
				.pipe(sourcemaps.write('./'))
				.pipe(gulp.dest('./dist'));
		}

	});

	
