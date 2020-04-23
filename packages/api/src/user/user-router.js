const { Router } = require('express')

const { checkAuth, checkAdminRole } = require('../common/middleware/index')

const { checkUserExists, checkDuplicateUser } = require('./user-middleware')
const {
    createAdminUser,
    loginUser,
    createRegularUser,
    updateUser,
    deleteUser,
    getUserById,
    getUserList,
    verifyUser,
} = require('./user-actions')

const anonymousUserRouter = Router()
    .post('/admin', createAdminUser)
    .post('/login', loginUser)

const authenticatedUserRouter = Router()
    .get('/verify', verifyUser)
    .get('/:id', checkUserExists, getUserById)
    // Admin ONLY routes
    .use(checkAdminRole)
    .get('/', getUserList)
    .post('/', checkDuplicateUser, createRegularUser)
    .put('/:id', checkUserExists, checkDuplicateUser, updateUser)
    .delete('/:id', checkUserExists, deleteUser)

module.exports = Router()
    .use(anonymousUserRouter)
    .use(checkAuth)
    .use(authenticatedUserRouter)
