const test = require('ava')
const bcrypt = require('bcryptjs')
const HttpStatus = require('http-status-codes')

const { ERRORS } = require('../user-constants')
const UserModel = require('../user-model')

const {
    testApiSetup,
    testDbSetup,
    testAuth,
    testAdminRole,
} = require('../../common/test-utils/index')
const {
    makePasswordUpdatePayload,
    testUserSetup,
} = require('./user-test-utils')

testDbSetup()
testUserSetup()
testApiSetup(`/api/user/{users.user1.id}/change-password`)

testAuth('post')
testAdminRole('post')

const getUpdatedPayload = userToUpdate => {
    const updates = makePasswordUpdatePayload()

    const payload = {
        currentPassword: userToUpdate.password,
        newPassword: updates.newPassword,
    }

    return payload
}

test('(400) validation error', async t => {
    const payload = { ...makePasswordUpdatePayload(), newPassword: null }

    const res = await t.context.apiClient
        .post(t.context.apiUrl)
        .set('x-access-token', t.context.tokens.admin)
        .send(payload)

    t.is(res.status, HttpStatus.BAD_REQUEST)
    t.truthy(res.body.error)
})

test('(404) user not found', async t => {
    const payload = getUpdatedPayload(t.context.users.user1Data)

    const res = await t.context.apiClient
        .post(`/api/user/gibberish-id/change-password`)
        .set('x-access-token', t.context.tokens.admin)
        .send(payload)

    t.is(res.status, HttpStatus.NOT_FOUND)
})

test('(400) incorrect old password', async t => {
    const payload = {
        ...getUpdatedPayload(t.context.users.user1Data),
        currentPassword: 'gibberish-password',
    }
    const res = await t.context.apiClient
        .post(t.context.apiUrl)
        .set('x-access-token', t.context.tokens.admin)
        .send(payload)

    t.is(res.status, HttpStatus.BAD_REQUEST)
    t.is(res.body.error.code, ERRORS.BAD_PASSWORD.code)
})

test('(200) password updated', async t => {
    const payload = getUpdatedPayload(t.context.users.user1Data)

    const res = await t.context.apiClient
        .post(t.context.apiUrl)
        .set('x-access-token', t.context.tokens.admin)
        .send(payload)

    t.is(res.status, HttpStatus.OK)

    const userFromDb = await UserModel.fetchUserById(t.context.users.user1.id)
    t.true(await bcrypt.compare(payload.newPassword, userFromDb.password))
})
