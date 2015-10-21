var gulp = require('gulp'),
	ngTemplates = require('gulp-ng-templates');
	//requireDir = require('require-dir'),
	//dir = requireDir('./gulp/tasks'),
	//concat = require('gulp-concat'),
	//uglify = require('gulp-uglify'),
	//sass = require('gulp-sass'),
	//sourcemaps = require('gulp-sourcemaps'),
	//gulpUtil = require('gulp-util'),
	//ignore = require('gulp-ignore'),
	//liveReload = require('gulp-livereload');

	//htmlmin = require('htmlmin'),

	
	gulp.task('templates', function () {
	    return gulp.src('src/**/*.html')
	        //.pipe(htmlmin({collapseWhitespace: true}))
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