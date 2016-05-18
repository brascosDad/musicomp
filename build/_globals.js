//module used to stay DRY for sharing variables/values between tasks

module.exports = {
    isProduction: process.env.npm_config_isProduction,
    getAppSources: function() {
    	return [
            "./src/app.js",
            "!./src/**/*.spec.js",
            "!./src/server/**/*.*",
            "./src/**/*.js"
        ];
    },
    getLibSources: function() {
    	return [
            "./node_modules/angular/angular.js",
            "./node_modules/angular-route/angular-route.js",
            "./node_modules/angular-animate/angular-animate.js",
            "./node_modules/angular-aria/angular-aria.js",
            "./node_modules/angular-material/angular-material.js",
            "./node_modules/angular-messages/angular-messages.js",
            "./node_modules/angular-resource/angular-resource.js",
            "./node_modules/lodash/lodash.min.js",
        ];
    }
};
