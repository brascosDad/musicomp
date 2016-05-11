var gulp = require('gulp'),
	del = require('del');

	
gulp.task('clean', function() {
  //del all the dist folder as well as compiled and gulp-created files
	del(['dist'])
});

