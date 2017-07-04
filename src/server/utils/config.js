require("dotenv").config({ path: "config.env" });

const environment = process.env.NODE_ENV;

const server = {
  port: process.env.SERVER_PORT || 5000,
  ip: process.env.SERVER_HOST || "127.0.0.1"
};

const authSecret = process.env.AUTH_SECRET;

if (!authSecret) {
  throw new Error(
    "No auth secret found! Set it up in config.env and start the app, please? :)"
  );
}

module.exports = { environment, server, authSecret };
