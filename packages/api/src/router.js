const express = require('express')

const router = express.Router()

const userRouter = require('./user/user-router')
const topicRouter = require('./topic/topic-router')
const articleRouter = require('./article/article-router')
const articleHistoryRouter = require('./article-history/article-history-router')

module.exports = router
    .get('/api', (req, res) => {
        res.send("Hey! You're looking at the Matterwiki API.")
    })
    .use('/api/user', userRouter)
    .use('/api/topic', topicRouter)
    .use('/api/article', articleRouter)
    .use('/api/article/:articleId/history', articleHistoryRouter)
