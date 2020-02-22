// TODO: There is a lot of redundant code between tests in this file. Find a way to get this all cleaned up!

const test = require('ava')
const Promise = require('bluebird')
const HttpStatus = require('http-status-codes')
const { orderBy, find, map, keys, merge } = require('lodash')

const TopicModel = require('../topic-model')

const {
    testApiSetup,
    testDbSetup,
    testAuth,
} = require('../../common/test-utils/index')
const { testUserSetup } = require('../../user/test/user-test-utils')

const { createFakeTopic, addTopicsToContext } = require('./topic-test-utils')

function findTopicByName(t, name) {
    return find(t.context.newTopics, u => u.name === name)
}

function getSortedTopics(t, orderStyle = 'asc') {
    return orderBy(t.context.topics, [u => u.name.toLowerCase()], [orderStyle])
}

/**
 * Creates topics that work for multiple scenarios
 * - Mixed up sorting
 * - Randomly appease to the search term "cool beans"
 * - Mixed up createdAt dates
 * - Mixed up modifiedAt dates
 *
 * TODO: Refactor to make this more understandable! The good thing about this nasty fn
 * is that takes care of data work for us!
 */
function createMultipleTopics() {
    const overrides = [
        { name: 'King Pin' },
        {
            patch: true,
            name: 'Darkseid Apokalyse',
            createdAt: new Date(new Date().setFullYear(2017)),
            modifiedAt: new Date(new Date().setFullYear(2018)),
        },
        {
            name: 'Mysterio Villain',
            description: 'search Term that should be at the top: cool beans',
        },
        { name: '001Second Item' },
        {
            patch: true,
            name: 'Lex Luthor',
            createdAt: new Date(new Date().setFullYear(2018)),
            modifiedAt: new Date(new Date().setFullYear(2019)),
        },
        { name: 'Sand Man cool beans' },
        { name: '000First Item' },
        { name: 'Shocker Zap cool' },
        { name: 'Krave Hunter' },
        { name: 'zzzLast Item' },
        { name: 'Green Goblin' },
    ]
    return Promise.map(overrides, async ({ patch, ...override }) => {
        let topic = await createFakeTopic(override)

        // Updating some extra meta fields
        if (patch) {
            topic = await TopicModel.patchTopicById(topic.id, {
                createdAt: override.createdAt,
                modifiedAt: override.modifiedAt,
            })
        }
        return topic
    })
}

// TODO: Move to test-utils
async function callApiWithQuery(t, query) {
    let callApi = t.context.apiClient
        .get(t.context.apiUrl)
        .set('x-access-token', t.context.tokens.admin)

    if (query) callApi = callApi.query(query)

    const res = await callApi

    t.is(res.status, HttpStatus.OK)

    return res
}

function assertTopicListOrdering(t, expected, actual) {
    t.is(expected[0].name, actual[0].name)
    t.is(expected[1].name, actual[1].name)
    t.is(expected[expected.length - 1].name, actual[actual.length - 1].name)
}

testDbSetup()
testUserSetup()

test.beforeEach(async t => {
    const newTopics = await createMultipleTopics()
    await addTopicsToContext(t)

    // Seeded topics + newly created topics
    t.is(2 + newTopics.length, t.context.topics.length)

    merge(t.context, { newTopics })
})
testApiSetup(`/api/topic/`)

testAuth('get')

test('(200) USER can access list', async t => {
    const res = await t.context.apiClient
        .get(t.context.apiUrl)
        .set('x-access-token', t.context.tokens.user1)

    t.is(res.status, HttpStatus.OK)
})

test('(200) list returns expected data', async t => {
    const res = await callApiWithQuery(t)

    t.is(res.body.length, t.context.topics.length)

    t.deepEqual(
        keys(res.body[0]).sort(),
        ['id', 'name', 'description', 'modifiedAt', 'createdAt'].sort(),
    )
})

test('(200) default list sorted by name and in ascending order', async t => {
    const expected = getSortedTopics(t, 'asc')

    const res = await callApiWithQuery(t)

    t.is(res.body.length, expected.length)
    assertTopicListOrdering(t, expected, res.body)
})

test('(200) name sort filter (DESC) returns expected list', async t => {
    const expected = getSortedTopics(t, 'desc')

    const res = await callApiWithQuery(t, {
        orderField: 'name',
        orderStyle: 'desc',
    })

    t.is(res.body.length, expected.length)
    assertTopicListOrdering(t, expected, res.body)
})

test('(200) createdAt sort filter (ASC) returns expected list', async t => {
    const expectedFirst = findTopicByName(t, 'Darkseid Apokalyse')
    const expectedSecond = findTopicByName(t, 'Lex Luthor')

    const res = await callApiWithQuery(t, {
        orderField: 'createdAt',
        orderStyle: 'asc',
    })

    t.is(res.body.length, t.context.topics.length)

    const [actualFirst, actualSecond] = res.body
    t.is(
        expectedFirst.createdAt.getFullYear(),
        new Date(actualFirst.createdAt).getFullYear(),
    )
    t.is(
        expectedSecond.createdAt.getFullYear(),
        new Date(actualSecond.createdAt).getFullYear(),
    )
})

test('(200) createdAt sort filter (DESC) returns expected list', async t => {
    const expectedLast = findTopicByName(t, 'Darkseid Apokalyse')
    const expectedSecondLast = findTopicByName(t, 'Lex Luthor')

    const res = await callApiWithQuery(t, {
        orderField: 'createdAt',
        orderStyle: 'desc',
    })

    t.is(res.body.length, t.context.topics.length)

    const [actualLast, actualSecondLast] = res.body.reverse()
    t.is(
        expectedLast.createdAt.getFullYear(),
        new Date(actualLast.createdAt).getFullYear(),
    )
    t.is(
        expectedSecondLast.createdAt.getFullYear(),
        new Date(actualSecondLast.createdAt).getFullYear(),
    )
})

test('(200) modifiedAt sort filter (ASC) returns expected list', async t => {
    const expectedFirst = findTopicByName(t, 'Darkseid Apokalyse')
    const expectedSecond = findTopicByName(t, 'Lex Luthor')

    const res = await callApiWithQuery(t, {
        orderField: 'modifiedAt',
        orderStyle: 'asc',
    })

    t.is(res.body.length, t.context.topics.length)

    const [actualFirst, actualSecond] = res.body
    t.is(
        expectedFirst.modifiedAt.getFullYear(),
        new Date(actualFirst.modifiedAt).getFullYear(),
    )
    t.is(
        expectedSecond.modifiedAt.getFullYear(),
        new Date(actualSecond.modifiedAt).getFullYear(),
    )
})

test('(200) modifiedAt sort filter (DESC) returns expected list', async t => {
    const expectedLast = findTopicByName(t, 'Darkseid Apokalyse')
    const expectedSecondLast = findTopicByName(t, 'Lex Luthor')

    const res = await callApiWithQuery(t, {
        orderField: 'modifiedAt',
        orderStyle: 'desc',
    })

    t.is(res.body.length, t.context.topics.length)

    const [actualLast, actualSecondLast] = res.body.reverse()
    t.is(
        expectedLast.modifiedAt.getFullYear(),
        new Date(actualLast.modifiedAt).getFullYear(),
    )
    t.is(
        expectedSecondLast.modifiedAt.getFullYear(),
        new Date(actualSecondLast.modifiedAt).getFullYear(),
    )
})

test('(200) search filter returns expected list', async t => {
    // TODO: Find a better way to assert order?
    const expected = [
        findTopicByName(t, 'Mysterio Villain'),
        findTopicByName(t, 'Sand Man cool beans'),
        findTopicByName(t, 'Shocker Zap cool'),
    ]

    const res = await callApiWithQuery(t, { searchTerm: 'cool beans' })

    t.is(res.body.length, expected.length)

    t.deepEqual(
        keys(res.body[0]).sort(),
        [
            'id',
            'name',
            'description',
            'modifiedAt',
            'createdAt',
            'relevanceScore',
        ].sort(),
    )

    t.deepEqual(map(expected, 'id'), map(res.body, 'id'))
})

test('(200) paging filters with default filters work as expected', async t => {
    const sorted = getSortedTopics(t, 'asc')

    return Promise.map([0, 1], async pageNo => {
        const pageSize = 3
        const res = await callApiWithQuery(t, {
            paging: true,
            pageNo,
            pageSize,
        })

        t.is(res.body.total, sorted.length)
        t.is(res.body.results.length, 3)

        const start = pageNo * pageSize
        const end = start + pageSize

        assertTopicListOrdering(t, sorted.slice(start, end), res.body.results)
    })
})

test('(200) paging filters with applied filters work as expected', async t => {
    const expectedFirst = findTopicByName(t, 'Darkseid Apokalyse')
    const expectedSecond = findTopicByName(t, 'Lex Luthor')

    const res = await callApiWithQuery(t, {
        orderField: 'modifiedAt',
        orderStyle: 'asc',
        paging: true,
        pageNo: 0,
        pageSize: 3,
    })

    t.is(res.body.total, t.context.topics.length)

    const [actualFirst, actualSecond] = res.body.results
    t.is(
        expectedFirst.modifiedAt.getFullYear(),
        new Date(actualFirst.modifiedAt).getFullYear(),
    )
    t.is(
        expectedSecond.modifiedAt.getFullYear(),
        new Date(actualSecond.modifiedAt).getFullYear(),
    )
})
