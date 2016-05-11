var gulp = require('gulp'),
	concat = require('gulp-concat'),
	sourcemaps = require('gulp-sourcemaps');
	
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
