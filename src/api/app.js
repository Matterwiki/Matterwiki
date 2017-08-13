const express = require("express");
const helmet = require("helmet");

// Sets up the DB, starts the knex connection
require("./utils/db");

const setupRouter = require("./routes/setupRouter");
const authRouter = require("./routes/authRouter");
const articleRouter = require("./routes/articlesRouter/articlesRouter");
const topicsRouter = require("./routes/topicRouter");
const userRouter = require("./routes/usersRouter");
const uploadsRouter = require("./routes/uploadsRouter");
const searchRouter = require("./routes/searchRouter");

const errorHandler = require("./middleware/errorHandler");

const app = express();

app.use(helmet());

// TODO for perf reasons, https://www.npmjs.com/package/compression
// TODO setup task runner for easier management: https://github.com/lukeed/taskr
// TODO Maybe use lerna and split client and api dirs into subapps in a mono repo!

// Sample API endpoint
app.get("/api", (req, res) => {
  res.send("Hey! You're looking at the Matterwiki API");
});

// TODO find a way to add bodyParser stuff here - should happen only for POSTs

// all the other routes

app.use("/api/setup", setupRouter);
app.use("/api/auth", authRouter);
app.use("/api/articles", articleRouter);
app.use("/api/users", userRouter);
app.use("/api/topics", topicsRouter);

// util routes

// handles all upload endpoints
app.use("/api/uploads", uploadsRouter);

// handles all search endpoints
app.use("/api/search", searchRouter);

// Global error handling
// TODO https://www.joyent.com/node-js/production/design/errors
app.use(errorHandler);

module.exports = app;
