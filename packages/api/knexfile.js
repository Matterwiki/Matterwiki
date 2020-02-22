require('dotenv').config()

const { knexSnakeCaseMappers } = require('objection')

module.exports = {
    client: 'mysql',
    connection: {
        host: process.env.DB_HOST,
        user: process.env.DB_USER_NAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        charset: 'utf8',
        debug: process.env.DB_LOG_DEBUG === 'true',
        timezone: 'UTC',
        /**
         * Function that converts MySQL boolean types from JS booleans
         *
         * https://stackoverflow.com/a/38020252/1217785
         *
         * @param {*} field
         * @param {*} next
         *
         * @example
         *
         * ```
         * 0 -> false
         * 1 -> true
         * null -> null
         * ```
         */
        typeCast(field, next) {
            if (field.type === 'TINY' && field.length === 1) {
                const value = field.string()
                return value ? value === '1' : null
            }
            return next()
        },
    },
    pool: {
        min: 1,
        max: 1,
    },
    seeds: {
        directory: './db/seed/',
    },
    migrations: {
        directory: './db/migrations/',
    },

    // Convert `snake_case` column names to `camelCase` names
    ...knexSnakeCaseMappers(),
}
