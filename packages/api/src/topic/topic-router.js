const express = require('express')
const { isNil } = require('lodash')
const HttpStatus = require('http-status-codes')

const {
    bodyParser: { JSONParser },
    checkAuth,
    checkAdminRole,
} = require('../common/middleware/index')
const { makeHttpBadRequest, makeHttpError } = require('../common/utils/index')

const TopicModel = require('./topic-model')
const { ERRORS } = require('./topic-constants')
const { withDefaultFilterParams } = require('./topic-utils')
const { TopicValidator } = require('./topic-validator')

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

/**
 * Middleware function to verify if topic exists for `req.params.id`.
 * If it exists, sets it up on `req.item`.
 *
 * TODO: Make this in a generator function
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
async function checkTopicExists(req, res, next) {
    try {
        if (!req.params.id) return next(makeHttpError(HttpStatus.NOT_FOUND))

        const topic = await TopicModel.fetchTopicById(req.params.id)
        if (isNil(topic)) return next(makeHttpError(HttpStatus.NOT_FOUND))

        req.item = topic

        next()
    } catch (error) {
        next(error)
    }
}

/**
 * If the `req.body` contains a topic that already exists, do not allow to proceed!
 *
 * Send out a 409 🔙
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
async function checkDuplicateTopic(req, res, next) {
    try {
        const existingCount = await TopicModel.fetchExistingCountByName(
            req.body.name,
            req.params.id || null,
        )
        if (existingCount > 0) {
            return next(
                makeHttpError(HttpStatus.CONFLICT, ERRORS.DUPLICATE_TOPIC),
            )
        }

        next()
    } catch (error) {
        next(error)
    }
}

async function getTopicList(req, res, next) {
    try {
        const topicList = await TopicModel.fetchTopicList(
            withDefaultFilterParams(req.query),
        )

        res.status(200).json(topicList)
    } catch (error) {
        next(error)
    }
}

async function makeTopic(req, res, next) {
    try {
        const error = await TopicValidator.validate(req.body)
        if (error) return next(makeHttpBadRequest(error))

        const topic = await TopicModel.createTopic(req.body)

        res.status(HttpStatus.CREATED).json(topic)
    } catch (error) {
        next(error)
    }
}

async function getTopicById(req, res, next) {
    res.status(HttpStatus.OK).json(req.item)
}

async function updateTopic(req, res, next) {
    try {
        const error = await TopicValidator.validate(req.body)
        if (error) return next(makeHttpBadRequest(error))

        if (req.item.name === 'uncategorised') {
            return next({
                status: HttpStatus.METHOD_NOT_ALLOWED,
                ...ERRORS.READONLY_UNCATEGORISED,
            })
        }

        const topic = await TopicModel.updateTopicById(req.item.id, req.body)

        res.status(HttpStatus.OK).json(topic)
    } catch (error) {
        next(error)
    }
}

async function deleteTopic(req, res, next) {
    try {
        if (req.item.isDefault) {
            return next({
                status: HttpStatus.METHOD_NOT_ALLOWED,
                ...ERRORS.DELETE_DEFAULT_TOPIC,
            })
        }

        await TopicModel.deleteTopicById(req.item.id)
        res.status(HttpStatus.OK).end()
    } catch (error) {
        console.log(error)
        next(error)
    }
}

module.exports = router
