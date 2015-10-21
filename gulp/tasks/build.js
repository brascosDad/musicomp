var gulp = require('gulp');

gulp.task('build', ['bundle-lib', 'bundle-app'], function () {
	return gulp.src(['src/**/*.html'])
	.pipe(gulp.dest('public/dist')); 
});
