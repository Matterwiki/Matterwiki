const env = process.env.NODE_ENV || "dev";
const config = require("dotenv").config({
  path: `config.${env}.env`
});

// Config probably not found!
if (config.error) {
  throw new Error(config.error);
}

/**
 * This module parses the config options per environment with validation
 */
module.exports = config.parsed;
