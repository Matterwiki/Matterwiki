const { isNil } = require('lodash')
const HttpStatus = require('http-status-codes')

const { makeHttpBadRequest, makeHttpError } = require('../common/utils/index')

const { USER_ROLES, ERRORS } = require('./user-constants')
const UserModel = require('./user-model')
const {
    createJwt,
    withDefaultFilterParams,
    withoutSensitiveFields,
    verifyPassword,
} = require('./user-utils')
const {
    LoginValidator,
    UserValidator,
    UserUpdateValidator,
} = require('./user-validator')

exports.createAdminUser = async function createAdminUser(req, res, next) {
    try {
        const error = await UserValidator.validate(req.body)
        if (error) return next(makeHttpBadRequest(error))

        if (!isNil(await UserModel.fetchAdmin())) {
            return next(
                makeHttpError(HttpStatus.CONFLICT, ERRORS.DUPLICATE_ADMIN_USER),
            )
        }

        await UserModel.createUser(
            { ...req.body, role: USER_ROLES.ADMIN },
            false,
        )

        res.status(HttpStatus.CREATED).end()
    } catch (error) {
        next(error)
    }
}

exports.loginUser = async function loginUser(req, res, next) {
    const wrongCredsError = makeHttpBadRequest(ERRORS.CREDS_WRONG)
    try {
        const error = await LoginValidator.validate(req.body)
        if (error) return next(makeHttpBadRequest(error))

        const user = await UserModel.fetchUserByEmail(req.body.email)
        if (isNil(user)) return next(wrongCredsError)

        if (!(await verifyPassword(user.password, req.body.password))) {
            return next(wrongCredsError)
        }

        const payloadUser = {
            ...withoutSensitiveFields(user),
            token: createJwt(user),
        }

        res.status(HttpStatus.OK).json(payloadUser)
    } catch (err) {
        next(wrongCredsError)
    }
}

exports.verifyUser = function verifyUser(req, res, next) {
    res.status(HttpStatus.OK).json(withoutSensitiveFields(req.user))
}

exports.createRegularUser = async function createRegularUser(req, res, next) {
    try {
        const error = await UserValidator.validate(req.body)
        if (error) return next(makeHttpBadRequest(error))

        const user = await UserModel.createUser(
            { ...req.body, role: USER_ROLES.USER },
            true,
        )

        res.status(HttpStatus.CREATED).json(withoutSensitiveFields(user))
    } catch (error) {
        next(error)
    }
}

exports.updateUser = async function updateUser(req, res, next) {
    try {
        const error = await UserUpdateValidator.validate(req.body)
        if (error) return next(makeHttpBadRequest(error))

        const user = await UserModel.updateUserById(req.item.id, req.body)
        res.status(HttpStatus.OK).json(withoutSensitiveFields(user))
    } catch (error) {
        next(error)
    }
}

exports.deleteUser = async function deleteUser(req, res, next) {
    try {
        if (req.item.role === USER_ROLES.ADMIN) {
            return next({
                status: HttpStatus.METHOD_NOT_ALLOWED,
                ...ERRORS.DELETE_DEFAULT_ADMIN,
            })
        }

        await UserModel.deleteUserById(req.params.id)
        res.status(HttpStatus.OK).end()
    } catch (error) {
        next(error)
    }
}

exports.getUserById = async function getUserById(req, res, next) {
    res.status(200).json(withoutSensitiveFields(req.item))
}

exports.getUserList = async function getUserList(req, res, next) {
    try {
        const userList = await UserModel.fetchUserList(
            withDefaultFilterParams(req.query),
        )

        res.status(200).json(userList)
    } catch (error) {
        next(error)
    }
}
