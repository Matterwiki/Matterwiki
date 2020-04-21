const HttpStatus = require('http-status-codes')
const { get } = require('lodash')
const { USER_ROLES, ERRORS } = require('../../user/user-constants')

/**
 * Middleware to check if given user is an admin or not
 */
module.exports = function checkAdminRole(req, res, next) {
    return get(req, 'user.role') === USER_ROLES.ADMIN
        ? next()
        : next({ status: HttpStatus.FORBIDDEN, ...ERRORS.NO_ACCESS })
}
