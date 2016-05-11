var gulp = require('gulp'),
	ngTemplates = require('gulp-ng-templates');
	
	gulp.task('templates', function () {
	    return gulp.src('src/**/*.html')
	        .pipe(ngTemplates({
	            filename: 'templates.js',
	            module: "mcTemplates",
	            standalone: true ,
	            path: function (path, base) {
	                return path.replace(base, '').replace('/templates', '');
	            }
	        }))  
	        .pipe(gulp.dest('./src'));
	});