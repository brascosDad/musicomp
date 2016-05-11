"use strict";

const logger = require("./logger");

class GlobalErrorHandler {

    constructor(options) {
        this.server = options.server;

        if (!options.useManualRegistration) {
            this.registerNotFoundHandler();
            this.registerGlobalErrorHandler();
        }
    }

    registerNotFoundHandler() {
        //after all known routes, redirect to error if route not supported
        this.server.use((req, res) => {
            res.status(404);
            res.redirect(302, "/#/error");
            logger.instance().error(new Date().toJSON(), " route not found error");
        });
    }

    registerGlobalErrorHandler() {
        //catch all error handling
        this.server.use((err, req, res, next) => {
            const status = err.name === "UnauthorizedError" ? 401 : 500;
            logger.instance().error(new Date().toJSON(), err.stack);
            console.error(err.stack);
            res.status(status);
            res.send({ error: "An error occurred.  Please contact the system administrator." });
            next(err);
        });
    }
}

module.exports = GlobalErrorHandler;
