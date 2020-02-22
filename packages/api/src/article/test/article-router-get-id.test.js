const test = require('ava')
const HttpStatus = require('http-status-codes')
const { pick, keys } = require('lodash')

const {
    testApiSetup,
    testDbSetup,
    testAuth,
} = require('../../common/test-utils/index')
const { testUserSetup } = require('../../user/test/user-test-utils')

const {
    testArticleSetup,
    assertRelatedEntities,
} = require('./article-test-utils')

const { testTopicSetup } = require('../../topic/test/topic-test-utils')

const apiUrl = '/api/article'

testDbSetup()
testUserSetup()

testTopicSetup()
testArticleSetup()

testApiSetup(`${apiUrl}/{articles[1].id}`)

testAuth('get')

test('(404) article not found', async t => {
    const res = await t.context.apiClient
        .get(`${apiUrl}/858793287957832589`)
        .set('x-access-token', t.context.tokens.admin)

    t.is(res.status, HttpStatus.NOT_FOUND)
})

test('(200) accessible to USER', async t => {
    const res = await t.context.apiClient
        .get(t.context.apiUrl)
        .set('x-access-token', t.context.tokens.user1)

    t.is(res.status, HttpStatus.OK)
})

test('(200) article fetched', async t => {
    const { tokens, articles, apiClient, apiUrl } = t.context

    const expectedArticle = articles[1]

    const res = await apiClient.get(apiUrl).set('x-access-token', tokens.admin)

    t.is(res.status, HttpStatus.OK)

    t.deepEqual(
        pick(expectedArticle, ['title', 'content', 'changeLog']),
        pick(res.body, ['title', 'content', 'changeLog']),
    )

    t.is(expectedArticle.createdAt.toISOString(), res.body.createdAt)
    t.is(expectedArticle.modifiedAt.toISOString(), res.body.modifiedAt)

    t.deepEqual(
        keys(res.body).sort(),
        [
            'id',
            'title',
            'content',
            'changeLog',
            'modifiedAt',
            'createdAt',
            'topic',
            'createdByUser',
            'modifiedByUser',
        ].sort(),
    )
})

test('(200) returns related entities', async t => {
    const res = await t.context.apiClient
        .get(t.context.apiUrl)
        .set('x-access-token', t.context.tokens.admin)

    t.is(res.status, HttpStatus.OK)

    assertRelatedEntities(
        t,
        t.context.articles[1],
        t.context.users.admin,
        res.body,
    )
})
