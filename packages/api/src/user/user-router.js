const express = require('express')

const {
    bodyParser: { JSONParser },
    checkAuth,
    checkAdminRole,
} = require('../common/middleware/index')

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

const router = express.Router()

// Anonymous routes
router.post('/admin', JSONParser, createAdminUser)
router.post('/login', JSONParser, loginUser)

// Authenticated routes
router.get('/verify', checkAuth, verifyUser)

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

router.delete('/:id', adminMiddleware, checkUserExists, deleteUser)

module.exports = router
