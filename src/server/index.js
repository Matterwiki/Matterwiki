const { server, authSecret } = require("./utils/config");
const app = require("./app");

console.info("Starting the Matterwiki DB..");
require("./utils/db");

if (process.env.NODE_ENV === "develop") {
  console.log("Dev environment detected, starting webpack-dev-server..");

  // add some patchwork for the devserver to work!
  require("./utils/WDSStarter")(app);
}

console.info("Starting the Matterwiki server..");

app.listen(server.port, error => {
  if (error) {
    console.error("Unable to listen for connections", error);
    process.exit(10);
  }
  console.info(`Express is listening on http://${server.ip}:${server.port}`);
});
