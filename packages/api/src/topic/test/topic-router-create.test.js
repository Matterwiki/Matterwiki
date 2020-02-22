const test = require('ava')
const { pick } = require('lodash')
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

const { makeTopicData } = require('./topic-test-utils')

testDbSetup()
testUserSetup()
testApiSetup(`/api/topic/`)

testAuth('post')
testAdminRole('post')

test('(400) validation error', async t => {
    const topic = { ...makeTopicData(), name: null }

    const res = await t.context.apiClient
        .post(t.context.apiUrl)
        .set('x-access-token', t.context.tokens.admin)
        .send(topic)

    t.is(res.status, HttpStatus.BAD_REQUEST)
    t.truthy(res.body.error)
})

test('(409) duplicate topic', async t => {
    const topics = await TopicModel.fetchTopics()
    t.true(
        topics.length > 0,
        'Seeded topics not found; Did seeding not happen?',
    )

    const topic = { ...makeTopicData(), name: topics[0].name }

    const res = await t.context.apiClient
        .post(t.context.apiUrl)
        .set('x-access-token', t.context.tokens.admin)
        .send(topic)

    t.is(res.status, HttpStatus.CONFLICT)
    t.is(res.body.error.code, ERRORS.DUPLICATE_TOPIC.code)
})

test('(201) topic created', async t => {
    const topic = makeTopicData()

    const res = await await t.context.apiClient
        .post(t.context.apiUrl)
        .set('x-access-token', t.context.tokens.admin)
        .send(topic)
    t.is(res.status, HttpStatus.CREATED)

    const topicFromDb = await TopicModel.fetchTopicByName(topic.name)

    t.truthy(topicFromDb)
    t.deepEqual(
        pick(topicFromDb, ['name', 'description']),
        pick(topic, ['name', 'description']),
    )

    t.is(res.body.id, topicFromDb.id)

    t.false(topicFromDb.isDefault)
    t.truthy(topicFromDb.modifiedAt)
    t.truthy(topicFromDb.createdAt)

    t.deepEqual(
        Object.keys(res.body).sort(),
        [
            'id',
            'name',
            'description',
            'modifiedAt',
            'createdAt',
            'isDefault',
        ].sort(),
    )
})
