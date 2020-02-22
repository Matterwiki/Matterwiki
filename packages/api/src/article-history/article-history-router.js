const express = require('express')
const HttpStatus = require('http-status-codes')

const ArticleHistoryModel = require('./article-history-model')

// `mergeParams` is used to get the article router's params in this router
const router = express.Router({ mergeParams: true })

// 🔐
// Notice that the `checkAuth` middleware is not used here.
// Thats because this route is protected by the article router!
// ie., The only way to access this route is via `/api/article/:id/history`

// This router has ways to read the history, but no way to insert them!
// Check `article-model` file, specifically the insert and update methods,
// if you need to know how that works!

router.get('/', withDefaultFilterParams, fetchArticleHistoryList)
router.get('/:id', fetchArticleHistoryEntry)

function withDefaultFilterParams(req, res, next) {
    const { paging, pageNo, pageSize } = req.query || {}

    req.query = {
        paging: paging === 'true',
        pageNo: paging ? pageNo || 0 : null,
        pageSize: paging ? pageSize || 20 : null,
    }

    next()
}

async function fetchArticleHistoryList(req, res, next) {
    try {
        const historyItems = await ArticleHistoryModel.fetchHistoryByArticleId(
            req.params.articleId,
            req.query,
        )

        res.status(HttpStatus.OK).json(historyItems)
    } catch (error) {
        next(error)
    }
}
async function fetchArticleHistoryEntry(req, res, next) {
    try {
        const historyItem = await ArticleHistoryModel.fetchHistoryByHistoryId(
            req.params.articleId,
            req.params.id,
        )

        res.status(HttpStatus.OK).json(historyItem)
    } catch (error) {
        next(error)
    }
}

module.exports = router
