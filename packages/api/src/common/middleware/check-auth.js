const jwt = require('jsonwebtoken')
const HttpStatus = require('http-status-codes')
const { isNil } = require('lodash')

const { makeHttpError } = require('../utils/index')

const UserModel = require('../../user/user-model')
const { ERRORS } = require('../../user/user-constants')

const invalidTokenErr = makeHttpError(
    HttpStatus.UNAUTHORIZED,
    ERRORS.INVALID_TOKEN,
)

module.exports = async function checkAuth(req, res, next) {
    const token = req.headers['x-access-token']
    if (!token) return next(invalidTokenErr)

    try {
        const decodedToken = jwt.verify(token, process.env.AUTH_SECRET)
        if (!decodedToken) return next(invalidTokenErr)

        const user = await UserModel.fetchUserById(decodedToken.id)
        if (isNil(user)) next(invalidTokenErr)

        req.user = user

        return next()
    } catch (err) {
        return next(invalidTokenErr)
    }
}
