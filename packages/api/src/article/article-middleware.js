const HttpStatus = require('http-status-codes')
const { isNil } = require('lodash')

const { checkResourceExists } = require('../common/middleware/index')
const { makeHttpBadRequest, makeHttpError } = require('../common/utils/index')

const TopicModel = require('../topic/topic-model')

const ArticleModel = require('./article-model')
const { ERRORS } = require('./article-constants')

exports.checkArticleExists = checkResourceExists(id =>
    ArticleModel.fetchArticleById(id),
)

/**
 * If the `req.body` contains a title that already exists, do not allow to proceed!
 *
 * Send out a 409 🔙
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
exports.checkDuplicateArticle = async function checkDuplicateArticle(
    req,
    res,
    next,
) {
    try {
        const existingCountWithTitle = await ArticleModel.fetchExistingCountByTitle(
            req.body.title,
            req.params.id || null,
        )
        if (existingCountWithTitle > 0) {
            return next(
                makeHttpError(HttpStatus.CONFLICT, ERRORS.DUPLICATE_TITLE),
            )
        }

        next()
    } catch (error) {
        next(error)
    }
}

exports.checkValidTopic = async function checkValidTopic(req, res, next) {
    try {
        if (!req.body.topicId) return next()

        const topic = await TopicModel.fetchTopicById(req.body.topicId)
        if (isNil(topic)) return next(makeHttpBadRequest(ERRORS.TOPIC_INVALID))

        next()
    } catch (error) {
        next(error)
    }
}
