const HttpStatus = require('http-status-codes')

const ArticleHistoryModel = require('./article-history-model')
const { withDefaultFilterParams } = require('./article-history-utils')

exports.fetchArticleHistoryList = async function fetchArticleHistoryList(
    req,
    res,
    next,
) {
    try {
        const historyItems = await ArticleHistoryModel.fetchHistoryByArticleId(
            req.params.articleId,
            withDefaultFilterParams(req.query),
        )

        res.status(HttpStatus.OK).json(historyItems)
    } catch (error) {
        next(error)
    }
}

exports.fetchArticleHistoryEntry = async function fetchArticleHistoryEntry(
    req,
    res,
    next,
) {
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
