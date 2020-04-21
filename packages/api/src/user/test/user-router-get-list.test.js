// TODO: There is a lot of redundant code between tests in this file. Find a way to get this all cleaned up!

const test = require('ava')
const Promise = require('bluebird')
const HttpStatus = require('http-status-codes')
const { orderBy, find, map, keys, merge } = require('lodash')

const UserModel = require('../user-model')

const {
    testApiSetup,
    testDbSetup,
    testAuth,
    testAdminRole,
} = require('../../common/test-utils/index')
const { createRegularUser, testUserSetup } = require('./user-test-utils')

testDbSetup()
testUserSetup()
testApiSetup(`/api/user/`)

testAuth('get')
testAdminRole('get')

function findUserByName(t, name) {
    return find(t.context.allUsers, u => u.name === name)
}

function getSortedUsers(t, orderStyle = 'asc') {
    return orderBy(
        t.context.allUsers,
        [u => u.name.toLowerCase()],
        [orderStyle],
    )
}

/**
 * Creates users that work for multiple scenarios
 * - Mixed up sorting
 * - Randomly appease to the search term "cool beans"
 * - Mixed up createdAt dates
 * - Mixed up modifiedAt dates
 *
 * TODO: Refactor to make this more understandable! The good thing about this nasty fn
 * is that takes care of data work for us!
 */
function createMultipleUsers() {
    const userOverrides = [
        { name: 'King Pin' },
        {
            patch: true,
            name: 'Darkseid Apokalyse',
            createdAt: new Date(new Date().setFullYear(2017)),
            modifiedAt: new Date(new Date().setFullYear(2018)),
        },
        {
            name: 'Mysterio Villain',
            about: 'search Term that should be at the top: cool beans',
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
    return Promise.map(userOverrides, async ({ patch, ...override }) => {
        let user = await createRegularUser(override)

        // Updating some extra meta fields
        if (patch) {
            user = await UserModel.patchUserById(user.id, {
                createdAt: override.createdAt,
                modifiedAt: override.modifiedAt,
            })
        }
        return user
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

function assertUserListOrdering(t, expected, actual) {
    t.is(expected[0].name, actual[0].name)
    t.is(expected[1].name, actual[1].name)
    t.is(expected[expected.length - 1].name, actual[actual.length - 1].name)
}

test.beforeEach(async t => {
    const newUsers = await createMultipleUsers()
    const allUsers = await UserModel.fetchUsers()

    t.is(3 + newUsers.length, allUsers.length)

    merge(t.context, { newUsers, allUsers })
})

test('(200) list returns expected data', async t => {
    const { allUsers: expectedUsers } = t.context

    const res = await callApiWithQuery(t)

    t.is(res.body.length, expectedUsers.length)

    t.deepEqual(
        keys(res.body[0]).sort(),
        [
            'id',
            'name',
            'email',
            'about',
            'modifiedAt',
            'createdAt',
            'role',
        ].sort(),
    )
    res.body.forEach(u => t.falsy(u.password))
})

test('(200) default list sorted by name and in ascending order', async t => {
    const expectedUsers = getSortedUsers(t, 'asc')

    const res = await callApiWithQuery(t)

    t.is(res.body.length, expectedUsers.length)
    assertUserListOrdering(t, expectedUsers, res.body)
})

test('(200) name sort filter (DESC) returns expected list', async t => {
    const expectedUsers = getSortedUsers(t, 'desc')

    const res = await callApiWithQuery(t, {
        orderField: 'name',
        orderStyle: 'desc',
    })

    t.is(res.body.length, expectedUsers.length)
    assertUserListOrdering(t, expectedUsers, res.body)
})

test('(200) createdAt sort filter (ASC) returns expected list', async t => {
    const expectedFirst = findUserByName(t, 'Darkseid Apokalyse')
    const expectedSecond = findUserByName(t, 'Lex Luthor')

    const res = await callApiWithQuery(t, {
        orderField: 'createdAt',
        orderStyle: 'asc',
    })

    t.is(res.body.length, t.context.allUsers.length)

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
    const expectedLast = findUserByName(t, 'Darkseid Apokalyse')
    const expectedSecondLast = findUserByName(t, 'Lex Luthor')

    const res = await callApiWithQuery(t, {
        orderField: 'createdAt',
        orderStyle: 'desc',
    })

    t.is(res.body.length, t.context.allUsers.length)

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
    const expectedFirst = findUserByName(t, 'Darkseid Apokalyse')
    const expectedSecond = findUserByName(t, 'Lex Luthor')

    const res = await callApiWithQuery(t, {
        orderField: 'modifiedAt',
        orderStyle: 'asc',
    })

    t.is(res.body.length, t.context.allUsers.length)

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
    const expectedLast = findUserByName(t, 'Darkseid Apokalyse')
    const expectedSecondLast = findUserByName(t, 'Lex Luthor')

    const res = await callApiWithQuery(t, {
        orderField: 'modifiedAt',
        orderStyle: 'desc',
    })

    t.is(res.body.length, t.context.allUsers.length)

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
    const expectedUsers = [
        findUserByName(t, 'Mysterio Villain'),
        findUserByName(t, 'Sand Man cool beans'),
        findUserByName(t, 'Shocker Zap cool'),
    ]

    const res = await callApiWithQuery(t, { searchTerm: 'cool beans' })

    t.is(res.body.length, expectedUsers.length)

    t.deepEqual(
        keys(res.body[0]).sort(),
        [
            'id',
            'name',
            'email',
            'about',
            'modifiedAt',
            'createdAt',
            'relevanceScore',
            'role',
        ].sort(),
    )

    t.deepEqual(map(expectedUsers, 'id'), map(res.body, 'id'))
})

test('(200) paging filters with default filters work as expected', async t => {
    const sortedUsers = getSortedUsers(t, 'asc')

    return Promise.map([0, 1], async pageNo => {
        const pageSize = 3
        const res = await callApiWithQuery(t, {
            paging: true,
            pageNo,
            pageSize,
        })

        t.is(res.body.total, sortedUsers.length)
        t.is(res.body.results.length, 3)

        const start = pageNo * pageSize
        const end = start + pageSize

        assertUserListOrdering(
            t,
            sortedUsers.slice(start, end),
            res.body.results,
        )
    })
})

test('(200) paging filters with applied filters work as expected', async t => {
    const expectedFirst = findUserByName(t, 'Darkseid Apokalyse')
    const expectedSecond = findUserByName(t, 'Lex Luthor')

    const res = await callApiWithQuery(t, {
        orderField: 'modifiedAt',
        orderStyle: 'asc',
        paging: true,
        pageNo: 0,
        pageSize: 3,
    })

    t.is(res.body.total, await UserModel.fetchUsers().resultSize())

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
