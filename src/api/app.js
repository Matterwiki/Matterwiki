const express = require("express");
const helmet = require("helmet");

const setupRouter = require("./routes/setupRouter");
const authRouter = require("./routes/authRouter");
const articleRouter = require("./routes/articlesRouter/articlesRouter");
const topicsRouter = require("./routes/topicsRouter");
const userRouter = require("./routes/usersRouter");
const uploadsRouter = require("./routes/uploadsRouter");
const searchRouter = require("./routes/searchRouter");

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
app.use("/api/topics", topicsRouter);
app.use("/api/users", userRouter);

// util routes

// handles all upload endpoints
app.use("/api/uploads", uploadsRouter);

// handles all search endpoints
app.use("/api/search", searchRouter);

// TODO Good error handling, validation, etc
// https://www.joyent.com/node-js/production/design/errors

/**
 * Development error handler that prints stacktrace
 */
if (process.env.NODE_ENV === "develop") {
  app.use((err, req, res, next) => {
    res.status(err.status || 500).json({
      message: err.message,
      error: err
    });
  });
}

/**
 * Production error handler that does not leak stacktraces to user
 */
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message,
    error: {}
  });
});

module.exports = app;
