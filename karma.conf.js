// Karma configuration
// Generated on Sun Sep 27 2015 11:20:45 GMT-0400 (EDT)
var globals = require('./build/_globals.js'),
    _ = require('lodash'),
    files = [],
    libFiles = globals.getLibSources(),
    appFiles = globals.getAppSources();

libFiles.push('./node_modules/angular-mocks/angular-mocks.js');
appFiles = _.without(appFiles, "!./src/**/*.spec.js");
files = _.union(libFiles, appFiles);


module.exports = function(config) {
  config.set({
    frameworks: ['jasmine'],
    files: files,
    preprocessors: {
        ".src/**/!(*.spec).js": ["coverage"]
    },
    coverageReporter: {
        type: 'lcovonly' //change from text to text-summary for details or summary
    },
    reporters: ['dots', 'coverage'],
    browsers: ['PhantomJS']
  });

  config.LOG_DEBUG = true;
};
