const test = require('ava')
const Promise = require('bluebird')
const HttpStatus = require('http-status-codes')

const ArticleModel = require('../../article/article-model')

const TopicModel = require('../topic-model')
const { ERRORS } = require('../topic-constants')

const {
    testApiSetup,
    testDbSetup,
    testAuth,
    testAdminRole,
} = require('../../common/test-utils/index')
const { testUserSetup } = require('../../user/test/user-test-utils')
const { createFakeArticle } = require('../../article/test/article-test-utils')

const { createFakeTopic, testTopicSetup } = require('./topic-test-utils')

testDbSetup()
testUserSetup()

test.beforeEach(async t => {
    const newTopic = await createFakeTopic()
    // Seeded topics + newly created topic
    t.is(3, await TopicModel.fetchTopics().resultSize())
    t.context.newTopic = newTopic
})
testTopicSetup()
testApiSetup(`/api/topic/{topics[2].id}`)

testAuth('delete')
testAdminRole('delete')

test('(404) topic not found', async t => {
    const res = await t.context.apiClient
        .delete(`/api/topic/gibberish-id`)
        .set('x-access-token', t.context.tokens.admin)

    t.is(res.status, HttpStatus.NOT_FOUND)
})

test('(405) cannot delete default topics', t => {
    return Promise.map([1, 2], async id => {
        const res = await t.context.apiClient
            .delete(`/api/topic/${id}`)
            .set('x-access-token', t.context.tokens.admin)

        t.is(res.status, HttpStatus.METHOD_NOT_ALLOWED)
        t.is(res.body.error.code, ERRORS.DELETE_DEFAULT_TOPIC.code)
    })
})

test('(200) topic deleted', async t => {
    const res = await t.context.apiClient
        .delete(t.context.apiUrl)
        .set('x-access-token', t.context.tokens.admin)

    t.is(res.status, HttpStatus.OK)

    const topic = await TopicModel.fetchTopicById(t.context.topics[2].id)
    t.falsy(topic)
})

test.only('(200) articles linked to deleted topic are recategorized', async t => {
    const article = await createFakeArticle(t.context.users.admin, {
        topicId: t.context.topics[2].id,
    })

    const res = await t.context.apiClient
        .delete(t.context.apiUrl)
        .set('x-access-token', t.context.tokens.admin)

    t.is(res.status, HttpStatus.OK)

    const { topic } = await ArticleModel.fetchArticleById(article.id)
    t.is(topic.name, 'uncategorised')
})
