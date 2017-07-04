const express = require("express");
const app = express();

// TODO Add helmet

// Sample API endpoint
app.get("/api", function(req, res) {
  res.send("Hey! You're looking at the Matterwiki API");
});

// all the other routes
app.use("/api/setup", require("./routes/setup"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/articles", require("./routes/articles"));
app.use("/api/topics", require("./routes/topics"));
app.use("/api/users", require("./routes/users"));
app.use("/api/uploads", require("./routes/uploads"));

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
