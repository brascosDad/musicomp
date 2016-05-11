
var globals = require("./_globals"),
	gulp = require('gulp');

	gulp.task('watchFiles', function () {

		if (!globals.isProduction) {
			const liveServer = require('gulp-live-server'),
				serverPath = "./src/server/index.js",
				server = liveServer([serverPath]);
			server.start();

			//restart server when changes are detected
			gulp.watch(["./dist/**/*.{html,css,png,js,ico}"], function(file){
				server.notify.apply(server, [file]);
			});

			gulp.watch(serverPath, server.start.bind(server));

			gulp.watch('src/**/*.scss', ['compileSass']);
			gulp.watch('src/**/*.html', ['watchHtmlFiles']);
			gulp.watch(['src/**/*.js', '!src/server/**/*.js'], ['bundle-app']);
		}
	}); 
