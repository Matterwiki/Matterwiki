const express = require('express')

const {
    fetchArticleHistoryEntry,
    fetchArticleHistoryList,
} = require('./article-history-actions')

// `mergeParams` is used to get the article router's params in this router
const router = express.Router({ mergeParams: true })

// 🔐
// Notice that the `checkAuth` middleware is not used here.
// Thats because this route is protected by the article router!
// ie., The only way to access this route is via `/api/article/:id/history`

// This router has ways to read the history, but no way to insert them!
// Check `article-model` file, specifically the insert and update methods,
// if you need to know how that works!

router.get('/', fetchArticleHistoryList)
router.get('/:id', fetchArticleHistoryEntry)

module.exports = router
