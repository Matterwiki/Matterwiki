const express = require("express");
const helmet = require("helmet");

const setupRouter = require("./routes/setup");
const authRouter = require("./routes/auth");
const articleRouter = require("./routes/articles/articles");
const topicsRouter = require("./routes/topics");
const userRouter = require("./routes/users");

const app = express();

app.use(helmet());

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
app.use("/api/uploads", require("./routes/uploads"));

// handles all search endpoints
app.use("/api/search", require("./routes/search"));

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
