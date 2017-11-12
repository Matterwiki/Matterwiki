/**
 * Error handler middleware that all errors in the API will be routed to
 * TODO - https://www.joyent.com/node-js/production/design/errors
 * @param {any} err 
 * @param {any} req 
 * @param {any} res 
 * @param {any} next 
 * @returns 
 */
function errorHandlerMiddleware(err, req, res, next) {
  if (process.env.NODE_ENV === "develop" || process.env.NODE_ENV === "test") {
    // Development error handler that prints stacktrace
    return res.status(err.statusCode || 500).json({
      message: err.message,
      error: err
    });
  }

  // Production error handler that does not leak stacktraces to user
  res.status(err.statusCode || 500).json({
    message: err.message,
    error: {}
  });

  next();
}

module.exports = errorHandlerMiddleware;
