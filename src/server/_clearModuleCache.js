"use strict";

const _ = require("lodash");

module.exports = () => {
    //make sure module can be loaded for each test
    _.each(_.keys(require.cache), function (key) {delete require.cache[key];});
};
