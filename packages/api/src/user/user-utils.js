const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { omit } = require('lodash')

const { TOKEN_EXPIRATION } = require('./user-constants')

/**
 * Creates JSON Web Token
 * @param {object} user - User retrieved from the Db
 */
exports.createJwt = function createJwt(user) {
    user = exports.withoutSensitiveFields(user)

    return jwt.sign(user, process.env.AUTH_SECRET, {
        expiresIn: TOKEN_EXPIRATION,
    })
}

/**
 * Removes sensitive fields from the user object
 * @param {object} user - User retrieved from the Db, typically without the password field
 */
exports.withoutSensitiveFields = function withoutSensitiveFields(user) {
    return user ? omit(user, ['password']) : user
}

/**
 * Compares password which was sent over the wire with the one in the db
 *
 * @param {string} passwordFromDb
 * @param {string} passwordFromParam
 */
exports.verifyPassword = function verifyPassword(
    passwordFromDb,
    passwordFromParam,
) {
    return bcrypt.compare(passwordFromParam, passwordFromDb)
}

/**
 * Sets up defaults for query filters
 * @param {object} filters
 * @returns
 */
exports.withDefaultFilterParams = function withDefaultFilterParams(filters) {
    filters = filters || {}
    const {
        orderField,
        orderStyle,
        searchTerm,
        paging,
        pageNo,
        pageSize,
    } = filters

    return {
        orderField: orderField || 'name',
        orderStyle: orderStyle || 'asc',
        searchTerm: searchTerm || '',
        paging: paging === 'true',
        pageNo: paging ? pageNo || 0 : null,
        pageSize: paging ? pageSize || 10 : null,
    }
}
