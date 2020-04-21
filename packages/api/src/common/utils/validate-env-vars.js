const { hasIn, every } = require('lodash')

/**
 * Validates environment variables
 */
module.exports = function validateEnvVars() {
    const envVars = [
        'AUTH_SECRET',
        'DB_HOST',
        'DB_NAME',
        'DB_USER_NAME',
        'DB_PASSWORD',
        'NODE_ENV',
        'SERVER_HOST',
        'SERVER_PORT',
    ]

    return every(envVars, envVar => hasIn(process.env, envVar))
}
