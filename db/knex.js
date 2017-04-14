"use strict";
/*eslint no-undef: 0*/

var environment = process.env.NODE_ENV || "development";
var config = require("../knexfile.js")[environment];
module.exports = require("knex")(config);
