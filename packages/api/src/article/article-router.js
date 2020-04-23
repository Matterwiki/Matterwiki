const express = require('express')

const {
    bodyParser: { JSONParser },
    checkAuth,
} = require('../common/middleware/index')

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

const router = express.Router()

router.use(checkAuth)

router.get('/', getArticleList)
router.post(
    '/',
    JSONParser,
    checkDuplicateArticle,
    checkValidTopic,
    makeArticle,
)
router.post('/upload-image', uploadImage)
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

module.exports = router
