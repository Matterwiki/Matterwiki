const HttpStatus = require('http-status-codes')

const { checkResourceExists } = require('../common/middleware/index')
const { makeHttpError } = require('../common/utils/index')

const TopicModel = require('./topic-model')
const { ERRORS } = require('./topic-constants')

exports.checkTopicExists = checkResourceExists(id =>
    TopicModel.fetchTopicById(id),
)

/**
 * If the `req.body` contains a topic that already exists, do not allow to proceed!
 *
 * Send out a 409 🔙
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
exports.checkDuplicateTopic = async function checkDuplicateTopic(
    req,
    res,
    next,
) {
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
