/**
 * This module does many things:
 * - Sets up server 
 * - bootstraps root router
 * - bootstraps DB
 */

const config = require("../config");
const app = require("./app");
const dbHelpers = require("../db");

// TODO use morgan or something for logging

console.info("Starting the Matterwiki server..");

app.listen(config.SERVER_PORT, async error => {
  if (error) {
    console.error("Unable to listen for connections", error);
    process.exit(10);
  }
  console.info(
    `Express is listening on http://${config.SERVER_HOST}:${config.SERVER_PORT}`
  );

  // initialize DB, test environemt initializes this global setup
  if (process.NODE_ENV !== "test") {
    await dbHelpers.init();
  }
});
