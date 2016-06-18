"use strict";

describe("Response Helper Tests", () => {

    let responseHelper = require("./responseHelper");

    it("should wrap the response appropriately", () => {

        let responseQueue = [],
            data = [1, 2, 3, 4, 5],
            response = { send: (d) => { responseQueue.push(d); }};

        responseHelper.sendResponse(response, data);

        expect(responseQueue.length).toEqual(1);
        expect(responseQueue[0]).toEqual({ d: data });
    });

});
