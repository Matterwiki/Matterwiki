/**
 * This module does the following:
 * - serve as a single entry point for all routes in the app
 * - export a root router that has all the routes of the app in it
 * - attach all the global middleware we need, like error handling, auth and stuff
 */

const express = require("express");
const helmet = require("helmet");

// middleware
const errorHandler = require("./middleware/errorHandler");

// routes
const authRouter = require("./routes/authRouter/authRouter");
const userRouter = require("./routes/userRouter/userRouter");

const app = express();

app.use(helmet());

// TODO setup task runner for easier management: https://github.com/lukeed/taskr

// Sample API endpoint
app.get("/api", (req, res) => {
  res.send("Hey! You're looking at the Matterwiki API");
});

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);

// Global error handling
app.use(errorHandler);

module.exports = app;
