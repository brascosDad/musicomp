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

    // base path that will be used to resolve all patterns (eg. files, exclude)
    //basePath: '',

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],

    // list of files / patterns to load in the browser
    files: files,

    // list of files to exclude
    //exclude: [
    //],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    // preprocessors: {
    //     ".src/**/!(*.spec).js": ["coverage"]
    // },

    // coverageReporter: {
    //     type: 'lcovonly' //change from text to text-summary for details or summary
    // },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['dots', 'coverage'],

    // web server port
    //port: 9876,

    // enable / disable colors in the output (reporters and logs)
    //colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    //logLevel: config.LOG_INFO,

    // enable / disable watching file and executing tests whenever any file changes
    //autoWatch: true,

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['PhantomJS']

    // plugins: [
    //     'karma-coverage'
    // ]

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    //singleRun: false

  });

  config.LOG_DEBUG = true;
};
