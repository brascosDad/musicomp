var gulp = require('gulp');

gulp.task('pipeMaterialCss', function () {
	return gulp.src(['node_modules/angular-material/angular-material.min.css'])
	.pipe(gulp.dest('./dist'));
});
