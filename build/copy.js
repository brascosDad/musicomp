var gulp = require('gulp');

//copy static files over to dist

gulp.task('copy', function () {
	return gulp.src(['src/public/index.html', 'src/public/img/**'])
	.pipe(gulp.dest('dist'));
});
