const express = require('express')

const {
    bodyParser: { JSONParser },
    checkAuth,
    checkAdminRole,
} = require('../common/middleware/index')

const { checkTopicExists, checkDuplicateTopic } = require('./topic-middleware')
const {
    getTopicList,
    makeTopic,
    getTopicById,
    updateTopic,
    deleteTopic,
} = require('./topic-actions')

const router = express.Router()

// General routes
router.get('/', checkAuth, getTopicList)

// Admin ONLY routes
const adminAuthMiddleware = [checkAuth, checkAdminRole]
router.post(
    '/',
    adminAuthMiddleware,
    JSONParser,
    checkDuplicateTopic,
    makeTopic,
)
router.get('/:id', adminAuthMiddleware, checkTopicExists, getTopicById)
router.put(
    '/:id',
    adminAuthMiddleware,
    JSONParser,
    checkTopicExists,
    checkDuplicateTopic,
    updateTopic,
)
router.delete(
    '/:id',
    adminAuthMiddleware,
    JSONParser,
    checkTopicExists,
    deleteTopic,
)

module.exports = router
