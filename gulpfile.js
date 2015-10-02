"use strict";

var gulp = require('gulp'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	//sass = require('gulp-sass'),
	sourcemaps = require('gulp-sourcemaps'),
	karmaServer = require('karma').Server,
	ngTemplates = require('gulp-ng-templates');

gulp.task('bundle-app', function() {
	return gulp.src(['src/app.js', 'src/MainCtrl.js'])
		.pipe(sourcemaps.init())
			.pipe(concat('app.min.js'))
			.pipe(uglify())
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest('public'));
});

gulp.task('bundle-lib', function() {
	return gulp.src(['node_modules/angular/angular.min.js'])
		.pipe(concat('lib.min.js'))
		.pipe(gulp.dest('public'));
});

// gulp.task('compileSass', function() {
//   return gulp.src("public/scss/application.scss")
//       .pipe(maps.init())
//       .pipe(sass())
//       .pipe(maps.write('./'))
//       .pipe(gulp.dest('src/css'));
// })



/**
 * Run test once and exit
 */
gulp.task('test', function (done) {
  new karmaServer({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, done).start();
});

gulp.task('clean', function() {
  //del all the dist folder as well as compiled and gulp-created files
	gulp.del(['public/dist'])
})


 
gulp.task('templates', ['clean'], function () {
    return gulp.src(paths.templates)
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(ngTemplates({
            filename: 'templates.js',
            module: 'App/templates',
            path: function (path, base) {
                return path.replace(base, '').replace('/templates', '');
            }
        }))
        .pipe(gulp.dest('public/js'));
});

gulp.task('watchFiles', function () {
	//gulp.watch('src/**/*.scss', ['compileSass']);
	gulp.watch('src/**.js', ['bundle-app']);
}); 

//this doesn't start a server, it just serves/turns on watchFiles
gulp.task('serve', ['watchFiles'])
