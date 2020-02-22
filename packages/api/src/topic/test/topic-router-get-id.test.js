const test = require('ava')
const { pick } = require('lodash')
const HttpStatus = require('http-status-codes')

const {
    testApiSetup,
    testDbSetup,
    testAuth,
    testAdminRole,
} = require('../../common/test-utils/index')
const { testUserSetup } = require('../../user/test/user-test-utils')

const { testTopicSetup } = require('./topic-test-utils')

const apiUrl = '/api/topic'

testDbSetup()
testUserSetup()
testTopicSetup()

testApiSetup(`${apiUrl}/{topics[1].id}`)

testAuth('get')
testAdminRole('get')

test('(404) topic not found', async t => {
    const res = await t.context.apiClient
        .get(`/api/topic/gibberish-id`)
        .set('x-access-token', t.context.tokens.admin)

    t.is(res.status, HttpStatus.NOT_FOUND)
})

test('(200) topic fetched', async t => {
    const [expectedTopic] = t.context.topics

    const res = await t.context.apiClient
        .get(t.context.apiUrl)
        .set('x-access-token', t.context.tokens.admin)

    t.is(res.status, HttpStatus.OK)
    t.deepEqual(
        pick(t.context.topics[1], ['name', 'description']),
        pick(res.body, ['name', 'description']),
    )

    t.is(expectedTopic.createdAt.toISOString(), res.body.createdAt)
    t.is(expectedTopic.modifiedAt.toISOString(), res.body.modifiedAt)
})
