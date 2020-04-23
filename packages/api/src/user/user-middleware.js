const HttpStatus = require('http-status-codes')

const { checkResourceExists } = require('../common/middleware/index')
const { makeHttpError } = require('../common/utils/index')

const { ERRORS } = require('./user-constants')
const UserModel = require('./user-model')

exports.checkUserExists = checkResourceExists(id => UserModel.fetchUserById(id))

/**
 * If the `req.body` contains a user that already exists, do not allow to proceed!
 *
 * Send out a 409 🔙
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
exports.checkDuplicateUser = async function checkDuplicateUser(req, res, next) {
    try {
        const existingCount = await UserModel.fetchExistingCountByEmail(
            req.body.email,
            req.params.id || null,
        )
        if (existingCount > 0) {
            return next(
                makeHttpError(HttpStatus.CONFLICT, ERRORS.DUPLICATE_EMAIL),
            )
        }

        next()
    } catch (error) {
        next(error)
    }
}
