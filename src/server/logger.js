"use strict";

const mkdirp = require("mkdirp"),
    logDirectory = "./logs",
    options = {
        logDirectory: logDirectory,
        fileNamePattern: "musicomp-<DATE>.log",
        dateFormat: "YYYY.MM.DD"
    },
    createInstance = () => {
        mkdirp(logDirectory);
        return require("simple-node-logger").createRollingFileLogger(options);
    };

let instance;

module.exports = {
    instance: () => {
        if (!instance) {
            instance = createInstance();
        }

        return instance;
    }
};
