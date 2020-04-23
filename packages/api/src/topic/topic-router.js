const { Router } = require('express')

const { checkAdminRole } = require('../common/middleware/index')

const { checkTopicExists, checkDuplicateTopic } = require('./topic-middleware')
const {
    getTopicList,
    makeTopic,
    getTopicById,
    updateTopic,
    deleteTopic,
} = require('./topic-actions')

const idRouter = Router()
    .get('/', getTopicById)
    .put('/', checkDuplicateTopic, updateTopic)
    .delete('/', deleteTopic)

module.exports = Router()
    // General routes
    .get('/', getTopicList)
    // Admin ONLY routes
    .use(checkAdminRole)
    .post('/', checkDuplicateTopic, makeTopic)
    // Routes with `id` checks
    .use('/:id', checkTopicExists, idRouter)
