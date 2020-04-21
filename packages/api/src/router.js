const express = require('express')

const router = express.Router()

const articleRouter = require('./article/article-router')
const articleHistoryRouter = require('./article-history/article-history-router')
const topicRouter = require('./topic/topic-router')
const settingsRouter = require('./settings/settings-router')
const userRouter = require('./user/user-router')

module.exports = router
    .get('/', (req, res) => {
        res.send(`Hey! Welcome to the Matterwiki API.`)
    })
    .use('/article', articleRouter)
    .use('/article/:articleId/history', articleHistoryRouter)
    .use('/topic', topicRouter)
    .use('/settings', settingsRouter)
    .use('/user', userRouter)
