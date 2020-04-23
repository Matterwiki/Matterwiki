const HttpStatus = require('http-status-codes')
const mime = require('mime-types')

const {
    makeHttpBadRequest,
    makeHttpError,
    parseFilesInForm,
} = require('../common/utils/index')

const { USER_ROLES } = require('../user/user-constants')

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

exports.makeArticle = async function makeArticle(req, res, next) {
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

exports.getArticleById = async function getArticleById(req, res, next) {
    res.status(HttpStatus.OK).json(req.item)
}

exports.updateArticle = async function updateArticle(req, res, next) {
    try {
        const { item, body, user } = req

        const error = await ArticleUpdateValidator.validate(body)
        if (error) return next(makeHttpBadRequest(error))

        const updated = await ArticleModel.updateArticleById(
            item.id,
            prepareArticleDataForDb(body, item.id),
            user,
        )
        res.status(HttpStatus.OK).json(updated)
    } catch (error) {
        next(error)
    }
}

exports.deleteArticle = async function deleteArticle(req, res, next) {
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

exports.getArticleList = async function getArticleList(req, res, next) {
    try {
        const articleList = await ArticleModel.fetchArticleList(
            withDefaultFilterParams(req.query),
        )

        res.status(200).json(articleList)
    } catch (error) {
        next(error)
    }
}

exports.uploadImage = async function uploadImage(req, res, next) {
    try {
        const { filename } = await parseFilesInForm(req, {
            fieldName: 'article-image',
            fileName: `${new Date().getTime()}`,
            acceptedMimeTypes: [
                mime.lookup('gif'),
                mime.lookup('png'),
                mime.lookup('jpg'),
            ],
        })

        res.status(HttpStatus.OK).send(filename)
    } catch (error) {
        next(makeHttpBadRequest(ERRORS.INVALID_FILE_ERR))
    }
}
