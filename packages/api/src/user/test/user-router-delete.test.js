const test = require('ava')
const HttpStatus = require('http-status-codes')

const { ERRORS } = require('../user-constants')
const UserModel = require('../user-model')

const {
    testApiSetup,
    testDbSetup,
    testAuth,
    testAdminRole,
} = require('../../common/test-utils/index')
const { testUserSetup } = require('./user-test-utils')

testDbSetup()
testUserSetup()

testApiSetup(`/api/user/{users.user1.id}`)

testAuth('delete')
testAdminRole('delete')

test('(404) user not found', async t => {
    const res = await t.context.apiClient
        .delete(`/api/user/gibberish-id`)
        .set('x-access-token', t.context.tokens.admin)

    t.is(res.status, HttpStatus.NOT_FOUND)
})

test('(405) cannot delete admin', async t => {
    const res = await t.context.apiClient
        .delete(`/api/user/${t.context.users.admin.id}`)
        .set('x-access-token', t.context.tokens.admin)

    t.is(res.status, HttpStatus.METHOD_NOT_ALLOWED)
    t.is(res.body.error.code, ERRORS.DELETE_DEFAULT_ADMIN.code)
})

test('(200) user deleted', async t => {
    const res = await t.context.apiClient
        .delete(t.context.apiUrl)
        .set('x-access-token', t.context.tokens.admin)

    t.is(res.status, HttpStatus.OK)

    const user = await UserModel.fetchUserById(t.context.users.user1.id)
    t.falsy(user)
})
