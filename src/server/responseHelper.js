"use strict";

module.exports = {
    sendResponse: (response, data) => {
        response.send({ d: data });
    },
    sendError: (response, err) => {
        let errorResponse = { error: "An error occurred.  Please contact the system administrator." };
        const validationError = "ValidationError",
            logger = require("./logger"),
            parseValidationError = (err) => {
                let errorResponse = {
                    error: "Validation error occurred",
                    errors: []
                };

                _.each(_.keys(err.errors), (key) => {
                    errorResponse.errors.push(err.errors[key].message);
                });

                return errorResponse;
            };

        if (err.name === validationError) {
            errorResponse = parseValidationError(err);
        }

        logger.instance().error(new Date().toJSON(), err.stack);
        response.send({ d: errorResponse });
    }
};
