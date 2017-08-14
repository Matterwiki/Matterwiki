module.exports = (err, req, res, next) => {
  if (process.env.NODE_ENV === "develop" || process.env.NODE_ENV === "test") {
    // Development error handler that prints stacktrace
    return res.status(err.status || 500).json({
      message: err.message,
      error: err
    });
  }

  // Production error handler that does not leak stacktraces to user
  res.status(err.status || 500).json({
    message: err.message,
    error: {}
  });

  next();
};
