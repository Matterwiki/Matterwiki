const HttpStatus = require('http-status-codes')

const { makeHttpBadRequest } = require('../common/utils/index')

const TopicModel = require('./topic-model')
const { ERRORS } = require('./topic-constants')
const { withDefaultFilterParams } = require('./topic-utils')
const { TopicValidator } = require('./topic-validator')

exports.getTopicList = async function getTopicList(req, res, next) {
    try {
        const topicList = await TopicModel.fetchTopicList(
            withDefaultFilterParams(req.query),
        )

        res.status(200).json(topicList)
    } catch (error) {
        next(error)
    }
}

exports.makeTopic = async function makeTopic(req, res, next) {
    try {
        const error = await TopicValidator.validate(req.body)
        if (error) return next(makeHttpBadRequest(error))

        const topic = await TopicModel.createTopic(req.body)

        res.status(HttpStatus.CREATED).json(topic)
    } catch (error) {
        next(error)
    }
}

exports.getTopicById = async function getTopicById(req, res, next) {
    res.status(HttpStatus.OK).json(req.item)
}

exports.updateTopic = async function updateTopic(req, res, next) {
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

exports.deleteTopic = async function deleteTopic(req, res, next) {
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
        next(error)
    }
}
