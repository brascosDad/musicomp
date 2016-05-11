var gulp = require('gulp'),
	karmaServer = require('karma').Server;
	

//karma test run
gulp.task('test', function (done) {
  new karmaServer({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, done).start(); 
});