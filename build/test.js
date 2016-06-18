var gulp = require('gulp'),
	globals = require('./_globals.js'),
	jshint = require('gulp-jshint'),
	stylish = require('jshint-stylish'),
	coveralls = require('gulp-coveralls'),
	jasmine = require('gulp-jasmine'),
	istanbul = require('gulp-istanbul'),
	concat = require('gulp-concat')
	karmaServer = require('karma').Server,
	runClientTest = function(isProduction) {
		var config = {
			configFile: process.cwd() + '/karma.conf.js',
			singleRun: isProduction
		};

		if (!isProduction) {
			config.coverageReporter = {
				type: "text" //change to text or text-summary for details or summary
			};
		}

		return gulp.src(['./src/app/**/*.js', '!./src/app/templates.js'])
			.pipe(jshint())
			.pipe(jshint.reporter(stylish))
			.pipe(jshint.reporter('fail'))
			.on('end', function() {
				new karmaServer(config).start();
			});
	};

gulp.task('test-client', function() {
	return runClientTest(globals.isProduction);
});

gulp.task('pre-test-server', function() {
	return gulp.src(['./src/server/**/*.js', 
			'!./src/server/config.js', '!./src/server/**/*.spec.js'])
		.pipe(jshint())
		.pipe(jshint.reporter(stylish))
		.pipe(jshint.reporter('fail'))
		.pipe(istanbul({ includeUntested: true }))
		.pipe(istanbul.hookRequire())
});

gulp.task('test-server', ['pre-test-server'], function() {

	var reporters = ['lcovonly'];

	if(!globals.isProduction) {
		reporters.push('text');
	}

	return gulp.src('./src/server/**/*.spec.js')
		.pipe(jasmine({
			includeStackTrace: true
		}))
		.on('error', function() {
			process.exit(1);
		})
		.pipe(istanbul.writeReports({
			reporters: reporters,
			reportOpts: {
				dir: './coverage/server'
			}
		}));
});

gulp.task('test-server-coverage', ['pre-test-server', 'test-server'], function() {

	var reporters = ['lcovonly'];

	if(!globals.isProduction) {
		reporters.push('text');
	}

	return gulp.src('./src/server/**/*.spec.js')
		.pipe(istanbul.writeReports({
			reporters: reporters,
			reportOpts: {
				dir: './coverage/server'
			}
		}));
});
	
gulp.task('test', ['test-client', 'test-server']);

gulp.task('pre-coveralls', function() {
	return gulp.src('./coverage/**/lcov.info')
		.pipe(concat('lcov.info'))
		.pipe(gulp.dest('./coverage'));
});

gulp.task('coveralls', ['pre-coveralls'], function() {
	return gulp.src('./coverage/lcov.info')
		.pipe(coveralls());
});

