const express = require("express");
const helmet = require("helmet");

// Sets up the DB, starts the knex connection
require("./utils/db");

const appRouter = require("./router");

const errorHandler = require("./middleware/errorHandler");

const app = express();

app.use(helmet());

// TODO for perf reasons, https://www.npmjs.com/package/compression
// TODO setup task runner for easier management: https://github.com/lukeed/taskr
// TODO Maybe use lerna and split client and api dirs into subapps in a mono repo

app.use(appRouter);

// Global error handling
// TODO https://www.joyent.com/node-js/production/design/errors
app.use(errorHandler);

module.exports = app;
