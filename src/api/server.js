const { server } = require("./config");
const app = require("./app");

// TODO use morgan or something for logging

if (process.env.NODE_ENV === "dev") {
  console.info("Dev environment detected, starting webpack-dev-server..");

  // add some patchwork for the devserver to work!
  // ESLint disables because we would never want to do this in any other env

  /* eslint-disable global-require */
  require("./utils/WDSStarter")(app);
  /* eslint-enable global-require */
}

console.info("Starting the Matterwiki server..");

app.listen(server.port, error => {
  if (error) {
    console.error("Unable to listen for connections", error);
    process.exit(10);
  }
  console.info(`Express is listening on http://${server.ip}:${server.port}`);
});
