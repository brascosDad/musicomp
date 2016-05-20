var globals = require("./_globals"),
    gulp = require('gulp'),
    runSequence = require("run-sequence").use(gulp);

gulp.task("start-mongo-database", () => {
    var config = require("../src/server/config"),
        exec = require("child_process").exec,
        shell = exec(config.databaseStartCommand);

    shell.stdout.on("data", (data) => {
        console.log(data);
    });

});

gulp.task("start", function(cb) {

    var exec, shell;

    runSequence(
        "clean",
        "templates",
        ['bundle-lib', 'bundle-app', 'compileSass', 'pipeMaterialCss'],
        "start-mongo-database",
        "copy",
        "watchFiles",
        cb);

    if (globals.isProduction) {
        exec = require("child_process").exec;
        shell = exec("node ./src/server/index.js");
        shell.stdout.on("data", function(data) {
            console.log(data);
        });
    }
 });
