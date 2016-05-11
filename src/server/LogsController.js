"use strict";

const logger = require("./logger"),
    responseHelper = require("./responseHelper");

class LogsController {

    saveLog(request, response) {

        const error = request.body;

        logger.instance().error(new Date().toJSON(), error.stack);
        console.error(error.stack);

        responseHelper.sendResponse(response, error);
    }
}

module.exports = LogsController;
