const test = require('ava')
const { pick, find } = require('lodash')
const HttpStatus = require('http-status-codes')

const { ERRORS } = require('../topic-constants')
const TopicModel = require('../topic-model')

const {
    testApiSetup,
    testDbSetup,
    testAuth,
    testAdminRole,
} = require('../../common/test-utils/index')
const { testUserSetup } = require('../../user/test/user-test-utils')

const { makeTopicData, testTopicSetup } = require('./topic-test-utils')

const apiUrl = '/api/topic'

testDbSetup()
testUserSetup()
testTopicSetup()

testApiSetup(`${apiUrl}/{topics[1].id}`)

testAuth('put')
testAdminRole('put')

test('(400) validation error', async t => {
    const topic = { ...t.context.topics[0], name: null }

    const res = await t.context.apiClient
        .put(t.context.apiUrl)
        .set('x-access-token', t.context.tokens.admin)
        .send(topic)

    t.is(res.status, HttpStatus.BAD_REQUEST)
    t.truthy(res.body.error)
})

test('(404) topic not found', async t => {
    const payload = makeTopicData()

    const res = await t.context.apiClient
        .put(`${apiUrl}/gibberish-id`)
        .set('x-access-token', t.context.tokens.admin)
        .send(payload)

    t.is(res.status, HttpStatus.NOT_FOUND)
})

test('(405) "uncategorised" topic is readonly', async t => {
    const { id } = find(t.context.topics, t => t.name === 'uncategorised')
    const payload = makeTopicData()

    const res = await t.context.apiClient
        .put(`${apiUrl}/${id}`)
        .set('x-access-token', t.context.tokens.admin)
        .send(payload)

    t.is(res.status, HttpStatus.METHOD_NOT_ALLOWED)
    t.is(res.body.error.code, ERRORS.READONLY_UNCATEGORISED.code)
})

test('(409) duplicate topic', async t => {
    const payload = {
        ...makeTopicData(),
        name: t.context.topics[0].name,
    }

    const res = await t.context.apiClient
        .put(t.context.apiUrl)
        .set('x-access-token', t.context.tokens.admin)
        .send(payload)

    t.is(res.status, HttpStatus.CONFLICT)
    t.is(res.body.error.code, ERRORS.DUPLICATE_TOPIC.code)
})

test('(200) topic updated', async t => {
    // Prep topic we are updating with older date, for testing.
    const dateFrom2018 = new Date(new Date().setFullYear(2018))
    t.context.topics[1] = await TopicModel.patchTopicById(
        t.context.topics[1].id,
        {
            createdAt: dateFrom2018,
            modifiedAt: dateFrom2018,
        },
    )

    const payload = makeTopicData()

    const res = await t.context.apiClient
        .put(t.context.apiUrl)
        .set('x-access-token', t.context.tokens.admin)
        .send(payload)

    t.is(res.status, HttpStatus.OK)

    const topicFromDb = await TopicModel.fetchTopicById(t.context.topics[1].id)

    t.truthy(topicFromDb)
    t.deepEqual(
        pick(topicFromDb, ['name', 'description']),
        pick(payload, ['name', 'description']),
    )

    t.is(topicFromDb.isDefault, t.context.topics[1].isDefault)

    t.is(dateFrom2018.getFullYear(), topicFromDb.createdAt.getFullYear())
    t.is(new Date().getFullYear(), topicFromDb.modifiedAt.getFullYear())

    t.deepEqual(
        Object.keys(res.body).sort(),
        [
            'id',
            'name',
            'description',
            'createdAt',
            'modifiedAt',
            'isDefault',
        ].sort(),
    )
})
