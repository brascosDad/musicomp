"use strict";

const   logger = require("./logger"),
        handleError = (res, status, message) => {
            res.status(status);
            res.send({ error: "An error occurred.  Please contact the system administrator." });
            logger.instance().error(new Date().toJSON(), message);
            console.error(message);
        };

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
            handleError(res, 404, ' 404 not found error');
        });
    }

    registerGlobalErrorHandler() {
        //catch all error handling
        this.server.use((err, req, res, next) => {
            const status = err.name === "UnauthorizedError" ? 401 : 500;
            handleError(res, status, err.stack);
            next(err);
        });
    }
}

module.exports = GlobalErrorHandler;
