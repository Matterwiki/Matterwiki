const { Router } = require('express')

const {
    checkAuth,
    bodyParser: { JSONParser },
} = require('./common/middleware/index')

const articleRouter = require('./article/article-router')
const articleHistoryRouter = require('./article-history/article-history-router')
const topicRouter = require('./topic/topic-router')
const settingsRouter = require('./settings/settings-router')
const userRouter = require('./user/user-router')

module.exports = Router()
    .get('/', (req, res) => {
        res.send(`Hey! Welcome to the Matterwiki API.`)
    })
    // For parsing JSON payloads
    .use(JSONParser)
    .use('/article', checkAuth, articleRouter)
    // 🔐
    // Notice that the `checkAuth` middleware is not used here.
    // Thats because this route is protected by the article router!
    // ie., The only way to access this route is via `/api/article/:id/history`
    .use('/article/:articleId/history', articleHistoryRouter)
    .use('/topic', checkAuth, topicRouter)
    .use('/settings', checkAuth, settingsRouter)
    // ⚠️
    // This route has a mix of authenticated and unauthenticated routes.
    // So we're handling middleware in the file!
    .use('/user', userRouter)
