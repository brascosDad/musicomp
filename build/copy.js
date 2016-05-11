var gulp = require('gulp');

gulp.task('copy', function () {
	return gulp.src(['src/index.html', 'src/img/**'])
	.pipe(gulp.dest('dist'));
});
