const winston = require('winston')

const logger = winston.createLogger({
    transports: [
        new winston.transports.Console(),
        // TODO: File transport
    ],
})

module.exports = logger
