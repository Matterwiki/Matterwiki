const HttpStatusCodes = require('http-status-codes')

module.exports = function globalErrorHandler(err, req, res, next) {
    const { status, message } = err
    if (
        process.env.NODE_ENV === 'development' ||
        process.env.NODE_ENV === 'test'
    ) {
        // Development error handler that prints stacktrace
        return res
            .status(status || HttpStatusCodes.INTERNAL_SERVER_ERROR)
            .json({
                message: message,
                error: err,
            })
    }

    // Production error handler that does not leak stacktraces to user
    res.status(err.status || HttpStatusCodes.INTERNAL_SERVER_ERROR).json({
        message: message,
        error: {},
    })

    next()
}
