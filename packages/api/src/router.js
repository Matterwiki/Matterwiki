const express = require('express')

const router = express.Router()

const articleRouter = require('./article/article-router')
const articleHistoryRouter = require('./article-history/article-history-router')
const topicRouter = require('./topic/topic-router')
const settingsRouter = require('./settings/settings-router')
const userRouter = require('./user/user-router')

module.exports = router
    .get('/api', (req, res) => {
        res.send(`Hey! Welcome to the Matterwiki API.`)
    })
    .use('/api/article', articleRouter)
    .use('/api/article/:articleId/history', articleHistoryRouter)
    .use('/api/topic', topicRouter)
    .use('/api/settings', settingsRouter)
    .use('/api/user', userRouter)
    // TODO: Stuff will change when we have S3 and other integrations
    .use('/api/public', express.static(process.env.FILE_STORAGE_PATH))
