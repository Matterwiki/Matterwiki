module.exports = function globalErrorHandler(err, req, res, next) {
    const { status, message } = err
    if (
        process.env.NODE_ENV === 'development' ||
        process.env.NODE_ENV === 'test'
    ) {
        // Development error handler that prints stacktrace
        return res.status(status || 500).json({
            message: message,
            error: err,
        })
    }

    // Production error handler that does not leak stacktraces to user
    res.status(err.status || 500).json({
        message: message,
        error: {},
    })

    next()
}
