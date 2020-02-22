const express = require('express')
const HttpStatus = require('http-status-codes')
const { isNil } = require('lodash')

const {
    bodyParser: { JSONParser },
    checkAuth,
} = require('../common/middleware/index')
const { makeHttpBadRequest, makeHttpError } = require('../common/utils/index')

const { USER_ROLES } = require('../user/user-constants')
const TopicModel = require('../topic/topic-model')

const ArticleModel = require('./article-model')
const { ERRORS } = require('./article-constants')
const {
    ArticleCreateValidator,
    ArticleUpdateValidator,
} = require('./article-validator')
const {
    withDefaultFilterParams,
    prepareArticleDataForDb,
} = require('./article-utils')

const router = express.Router()

// All routes are protected
router.use(checkAuth)

router.get('/', getArticleList)
router.post(
    '/',
    JSONParser,
    checkDuplicateArticle,
    checkValidTopic,
    makeArticle,
)
router.get('/:id', JSONParser, checkArticleExists, getArticleById)
router.put(
    '/:id',
    JSONParser,
    checkArticleExists,
    checkDuplicateArticle,
    checkValidTopic,
    updateArticle,
)
router.delete('/:id', JSONParser, checkArticleExists, deleteArticle)

/**
 * Middleware function to verify if article exists for `req.params.id`.
 * If it exists, sets it up on `req.item`.
 *
 * TODO: Make this in a generator function
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
async function checkArticleExists(req, res, next) {
    try {
        if (!req.params.id) return next(makeHttpError(HttpStatus.NOT_FOUND))

        const article = await ArticleModel.fetchArticleById(req.params.id)
        if (isNil(article)) return next(makeHttpError(HttpStatus.NOT_FOUND))

        req.item = article

        next()
    } catch (error) {
        next(error)
    }
}

/**
 * If the `req.body` contains a title that already exists, do not allow to proceed!
 *
 * Send out a 409 🔙
 *
 * TODO: This may be a pretty rare scenario; is this worth the performance hit?
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
async function checkDuplicateArticle(req, res, next) {
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

async function checkValidTopic(req, res, next) {
    try {
        if (!req.body.topicId) return next()

        const topic = await TopicModel.fetchTopicById(req.body.topicId)
        if (isNil(topic)) return next(makeHttpBadRequest(ERRORS.TOPIC_INVALID))

        next()
    } catch (error) {
        next(error)
    }
}

async function makeArticle(req, res, next) {
    try {
        const error = await ArticleCreateValidator.validate(req.body)
        if (error) return next(makeHttpBadRequest(error))

        const article = await ArticleModel.createArticle(
            prepareArticleDataForDb(req.body),
            req.user,
        )
        res.status(HttpStatus.CREATED).json(article)
    } catch (error) {
        next(error)
    }
}

async function getArticleById(req, res, next) {
    res.status(HttpStatus.OK).json(req.item)
}

async function updateArticle(req, res, next) {
    try {
        const { params, body, user } = req

        const error = await ArticleUpdateValidator.validate(body)
        if (error) return next(makeHttpBadRequest(error))

        const updated = await ArticleModel.updateArticleById(
            params.id,
            prepareArticleDataForDb(body, params.id),
            user,
        )
        res.status(HttpStatus.OK).json(updated)
    } catch (error) {
        next(error)
    }
}

async function deleteArticle(req, res, next) {
    try {
        if (
            req.user.role === USER_ROLES.USER &&
            req.item.createdByUser.id !== req.user.id
        ) {
            return next(
                makeHttpError(
                    HttpStatus.METHOD_NOT_ALLOWED,
                    ERRORS.DELETE_OTHERS_ARTICLES,
                ),
            )
        }

        await ArticleModel.deleteArticleById(req.item.id)
        res.status(HttpStatus.OK).end()
    } catch (error) {
        next(error)
    }
}

async function getArticleList(req, res, next) {
    try {
        const articleList = await ArticleModel.fetchArticleList(
            withDefaultFilterParams(req.query),
        )

        res.status(200).json(articleList)
    } catch (error) {
        next(error)
    }
}

module.exports = router
