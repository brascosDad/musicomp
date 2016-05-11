
var gulp = require('gulp'),
	runSequence = require('run-sequence');

	gulp.task('watchHtmlFiles', function (callback) {
		runSequence('templates', 'bundle-app', callback);
	}); 
