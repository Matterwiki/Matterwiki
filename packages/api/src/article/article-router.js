const { Router } = require('express')

const {
    makeArticle,
    getArticleById,
    updateArticle,
    deleteArticle,
    getArticleList,
    uploadImage,
} = require('./article-actions')
const {
    checkArticleExists,
    checkDuplicateArticle,
    checkValidTopic,
} = require('./article-middleware')

const idRouter = Router({ mergeParams: true })
    .get('/', getArticleById)
    .put('/', checkDuplicateArticle, checkValidTopic, updateArticle)
    .delete('/', deleteArticle)

module.exports = Router()
    .get('/', getArticleList)
    .post('/', checkDuplicateArticle, checkValidTopic, makeArticle)
    .post('/upload-image', uploadImage)
    // Routes with `id` checks
    .use('/:id', checkArticleExists, idRouter)
