const express = require('express')
const { isNil } = require('lodash')
const HttpStatus = require('http-status-codes')

const {
    bodyParser: { JSONParser },
    checkAuth,
    checkAdminRole,
} = require('../common/middleware/index')
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
    UserCreateValidator,
    UserUpdateValidator,
    UserPasswordUpdateValidator,
} = require('./user-validator')

const router = express.Router()

// Anonymous routes
router.post('/admin', JSONParser, createAdminUser)
router.post('/login', JSONParser, loginUser)

// Authenticated routes
router.get('/verify', checkAuth, (req, res, next) => {
    res.status(HttpStatus.OK).end()
})

router.get('/:id', checkAuth, checkUserExists, getUserById)

// Admin ONLY routes
const adminMiddleware = [checkAuth, checkAdminRole]

router.get('/', adminMiddleware, getUserList)
router.post(
    '/',
    adminMiddleware,
    JSONParser,
    checkDuplicateUser,
    createRegularUser,
)
router.put(
    '/:id',
    adminMiddleware,
    JSONParser,
    checkUserExists,
    checkDuplicateUser,
    updateUser,
)
router.post(
    '/:id/change-password',
    adminMiddleware,
    JSONParser,
    checkUserExists,
    updateUserPassword,
)
router.delete('/:id', adminMiddleware, checkUserExists, deleteUser)

/**
 * Middleware function to verify if user exists for `req.params.id`.
 * If it exists, sets it up on `req.item`.
 *
 * TODO: Make this in a generator function
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
async function checkUserExists(req, res, next) {
    try {
        if (!req.params.id) return next(makeHttpError(HttpStatus.NOT_FOUND))

        const user = await UserModel.fetchUserById(req.params.id)
        if (isNil(user)) return next(makeHttpError(HttpStatus.NOT_FOUND))

        req.item = user

        next()
    } catch (error) {
        next(error)
    }
}

/**
 * If the `req.body` contains a user that already exists, do not allow to proceed!
 *
 * Send out a 409 🔙
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
async function checkDuplicateUser(req, res, next) {
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

async function createAdminUser(req, res, next) {
    try {
        const error = await UserCreateValidator.validate(req.body)
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

async function loginUser(req, res, next) {
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

async function createRegularUser(req, res, next) {
    try {
        const error = await UserCreateValidator.validate(req.body)
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

async function updateUser(req, res, next) {
    try {
        const error = await UserUpdateValidator.validate(req.body)
        if (error) return next(makeHttpBadRequest(error))

        const user = await UserModel.updateUserById(req.item.id, req.body)
        res.status(HttpStatus.OK).json(withoutSensitiveFields(user))
    } catch (error) {
        next(error)
    }
}

async function updateUserPassword(req, res, next) {
    try {
        const error = await UserPasswordUpdateValidator.validate(req.body)
        if (error) return next(makeHttpBadRequest(error))

        const passwordVerified = await verifyPassword(
            req.item.password,
            req.body.currentPassword,
        )
        if (!passwordVerified) {
            return next({
                status: HttpStatus.BAD_REQUEST,
                ...ERRORS.BAD_PASSWORD,
            })
        }

        await UserModel.updatePasswordById(req.params.id, req.body.newPassword)
        res.status(HttpStatus.OK).end()
    } catch (error) {
        next(error)
    }
}

async function deleteUser(req, res, next) {
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

async function getUserById(req, res, next) {
    res.status(200).json(withoutSensitiveFields(req.item))
}

async function getUserList(req, res, next) {
    try {
        const userList = await UserModel.fetchUserList(
            withDefaultFilterParams(req.query),
        )

        res.status(200).json(userList)
    } catch (error) {
        next(error)
    }
}

module.exports = router
