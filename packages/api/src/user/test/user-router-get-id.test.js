const test = require('ava')
const HttpStatus = require('http-status-codes')
const { pick } = require('lodash')

const {
    testApiSetup,
    testDbSetup,
    testAuth,
} = require('../../common/test-utils/index')
const { testUserSetup } = require('./user-test-utils')

testDbSetup()
testUserSetup()
testApiSetup(`/api/user/{users.user1.id}`)

testAuth('get')

test('(404) user not found', async t => {
    const res = await t.context.apiClient
        .get(`/api/user/gibberish-id`)
        .set('x-access-token', t.context.tokens.admin)

    t.is(res.status, HttpStatus.NOT_FOUND)
})

const userFetcher = async (t, userTokenName) => {
    const res = await t.context.apiClient
        .get(t.context.apiUrl)
        .set('x-access-token', t.context.tokens[userTokenName])

    t.is(res.status, HttpStatus.OK)
    t.deepEqual(
        pick(t.context.users.user1, ['name', 'about', 'email']),
        pick(res.body, ['name', 'about', 'email']),
    )

    t.is(t.context.users.user1.createdAt.toISOString(), res.body.createdAt)
    t.is(t.context.users.user1.modifiedAt.toISOString(), res.body.modifiedAt)

    t.falsy(res.body.password)
}

test('(200) user fetched for ADMIN', userFetcher, 'admin')
test('(200) user fetched for USER', userFetcher, 'user1')
