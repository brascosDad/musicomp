var globals = require("./_globals"),
	gulp = require('gulp'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	sourcemaps = require('gulp-sourcemaps'),
	gulpUtil = require('gulp-util');

	gulp.task('bundle-app', function() {

		var sources = ['src/app/app.js', 'src/app/**/*.js', '!./src/app/**/*.spec.js'];

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

	gulp.task('bundle-lib', function() {
		return gulp.src(['node_modules/angular/angular.min.js', 
						'node_modules/angular-route/angular-route.min.js', 
						'node_modules/angular-aria/angular-aria.min.js',
    					'node_modules/angular-animate/angular-animate.min.js',
    					'node_modules/angular-material/angular-material.min.js',
    					'node_modules/angular-messages/angular-messages.min.js',
    					'node_modules/angular-resource/angular-resource.min.js',
    					'node_modules/lodash/lodash.min.js'
			])
			.pipe(sourcemaps.init())
			.pipe(concat('lib.min.js'))
			.pipe(sourcemaps.write('./'))	
			.pipe(gulp.dest('./dist'));
	});

	
