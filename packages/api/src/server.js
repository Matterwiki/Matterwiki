require('dotenv').config()

const app = require('./app')
const { logger, validateEnvVars } = require('./common/utils/index')

if (!validateEnvVars()) {
    logger.error(
        `Some/All environment variables not loaded. Did you follow the instructions properly? 😱`,
    )
    process.exit(9)
}

logger.info('Starting the Matterwiki server..')

app.listen(process.env.SERVER_PORT, error => {
    if (error) {
        logger.error('Unable to listen for connections', error)
        process.exit(10)
    }
    logger.info(
        `Express is listening on http://${process.env.SERVER_HOST}:${process.env.SERVER_PORT}`,
    )
})
