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
testApiSetup('/api/user/verify')

testAuth('get')

test('(200) ADMIN - verified user', async t => {
    const res = await t.context.apiClient
        .get(t.context.apiUrl)
        .set('x-access-token', t.context.tokens.admin)

    t.is(res.status, HttpStatus.OK)
})

test('(200) USER - verified user', async t => {
    const res = await t.context.apiClient
        .get(t.context.apiUrl)
        .set('x-access-token', t.context.tokens.user1)

    t.is(res.status, HttpStatus.OK)

    t.deepEqual(
        pick(t.context.users.user1, ['name', 'about', 'email']),
        pick(res.body, ['name', 'about', 'email']),
    )

    t.is(t.context.users.user1.createdAt.toISOString(), res.body.createdAt)
    t.is(t.context.users.user1.modifiedAt.toISOString(), res.body.modifiedAt)

    t.falsy(res.body.password)
})
