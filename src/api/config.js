// TODO Needs more fine tuning - https://12factor.net/config
const config = require("dotenv").config({
  // process.env.NODE_ENV = dev|test|prod;
  path: `config.${process.env.NODE_ENV}.env`
});

// Config probably not found!
// TODO Customize this error
if (config.error) {
  throw new Error(config.error);
}

const environment = process.env.NODE_ENV;

const server = {
  port: process.env.SERVER_PORT || 5000,
  ip: process.env.SERVER_HOST || "127.0.0.1"
};

const authSecret = process.env.AUTH_SECRET;

if (!authSecret) {
  throw new Error("No auth secret found! Set it up in config.env and start the app, please? :)");
}

module.exports = { environment, server, authSecret };
