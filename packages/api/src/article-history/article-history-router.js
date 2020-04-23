const { Router } = require('express')

const {
    fetchArticleHistoryEntry,
    fetchArticleHistoryList,
} = require('./article-history-actions')

// `mergeParams` is used to get the article router's params in this router
module.exports = Router({ mergeParams: true })
    // This router has ways to read the history, but no way to insert them!
    // Check `article-model` file, specifically the insert and update methods,
    // if you need to know how that works!
    .get('/', fetchArticleHistoryList)
    .get('/:id', fetchArticleHistoryEntry)
