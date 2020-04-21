const test = require('ava')
const HttpStatus = require('http-status-codes')

const {
    testApiSetup,
    testDbSetup,
    testAuth,
} = require('../../common/test-utils/index')
const { testUserSetup } = require('../../user/test/user-test-utils')

const { ERRORS } = require('../article-constants')
const ArticleModel = require('../article-model')

const { testArticleSetup } = require('./article-test-utils')

const { testTopicSetup } = require('../../topic/test/topic-test-utils')

const apiUrl = '/api/article'

testDbSetup()
testUserSetup()

testTopicSetup()
testArticleSetup()

testApiSetup(`${apiUrl}/{articles[1].id}`)

testAuth('delete')

test('(404) article not found', async t => {
    const res = await t.context.apiClient
        .delete(`${apiUrl}/858793287957832589`)
        .set('x-access-token', t.context.tokens.admin)

    t.is(res.status, HttpStatus.NOT_FOUND)
})

test('(405) USER cannot delete article created by others', async t => {
    const res = await t.context.apiClient
        .delete(t.context.apiUrl)
        // According `article-test-utils::testArticleSetup`, articles[0]
        // was made by `user1`. Sending user2's token to verify error
        // returned.
        .set('x-access-token', t.context.tokens.user2)

    t.is(res.status, HttpStatus.METHOD_NOT_ALLOWED)
    t.is(res.body.error.code, ERRORS.DELETE_OTHERS_ARTICLES.code)

    const topic = await ArticleModel.fetchArticleById(t.context.articles[1].id)
    t.truthy(topic)
})

test('(200) ADMIN can delete any article', async t => {
    const res = await t.context.apiClient
        .delete(t.context.apiUrl)
        .set('x-access-token', t.context.tokens.admin)

    t.is(res.status, HttpStatus.OK)

    const topic = await ArticleModel.fetchArticleById(t.context.articles[1].id)
    t.falsy(topic)
})

test('(200) USER can delete article they created', async t => {
    const res = await t.context.apiClient
        .delete(t.context.apiUrl)
        // According `article-test-utils::testArticleSetup`, articles[0]
        // was made by `user1`. Sending user1's token to verify successful
        // delete.
        .set('x-access-token', t.context.tokens.user1)

    t.is(res.status, HttpStatus.OK)

    const topic = await ArticleModel.fetchArticleById(t.context.articles[1].id)
    t.falsy(topic)
})
