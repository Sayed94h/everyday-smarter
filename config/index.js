"use strict";

const defaults = require("./default.js");

const configEnv = process.env.NODE_ENV || "development";

const configPath = `./${configEnv}.js`;

const config = require(configPath);

module.exports = Object.assign({}, defaults, config);
