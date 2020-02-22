const test = require('ava')
const bcrypt = require('bcryptjs')
const { pick } = require('lodash')
const HttpStatus = require('http-status-codes')

const { ERRORS } = require('../user-constants')
const UserModel = require('../user-model')

const {
    testApiSetup,
    testDbSetup,
    testAuth,
    testAdminRole,
} = require('../../common/test-utils/index')
const { makeUpdatePayload, testUserSetup } = require('./user-test-utils')

const apiUrl = '/api/user'

testDbSetup()
testUserSetup()
testApiSetup(`${apiUrl}/{users.user1.id}`)

testAuth('put')
testAdminRole('put')

const getUpdatedPayload = userToUpdate => {
    const updates = makeUpdatePayload()

    const payload = {
        name: updates.name,
        about: updates.about,

        // unchanged
        email: userToUpdate.email,
    }

    return payload
}

test('(400) validation error', async t => {
    const user = { ...t.context.users.userData, email: null }

    const res = await t.context.apiClient
        .put(t.context.apiUrl)
        .set('x-access-token', t.context.tokens.admin)
        .send(user)

    t.is(res.status, HttpStatus.BAD_REQUEST)
    t.truthy(res.body.error)
})

test('(404) user not found', async t => {
    const payload = getUpdatedPayload(t.context.users.user1)

    const res = await t.context.apiClient
        .put(`${apiUrl}/gibberish-id`)
        .set('x-access-token', t.context.tokens.admin)
        .send(payload)

    t.is(res.status, HttpStatus.NOT_FOUND)
})

test('(409) duplicate email', async t => {
    const payload = {
        ...getUpdatedPayload(t.context.users.user1),
        email: t.context.users.user2.email,
    }

    const res = await t.context.apiClient
        .put(t.context.apiUrl)
        .set('x-access-token', t.context.tokens.admin)
        .send(payload)

    t.is(res.status, HttpStatus.CONFLICT)
    t.is(res.body.error.code, ERRORS.DUPLICATE_EMAIL.code)
})

test('(200) user updated', async t => {
    // Prep user we are updating with older date, for testing.
    const dateFrom2018 = new Date(new Date().setFullYear(2018))
    t.context.users.user1 = await UserModel.patchUserById(
        t.context.users.user1.id,
        {
            createdAt: dateFrom2018,
            modifiedAt: dateFrom2018,
        },
    )

    const payload = getUpdatedPayload(t.context.users.user1)

    const res = await t.context.apiClient
        .put(t.context.apiUrl)
        .set('x-access-token', t.context.tokens.admin)
        .send(payload)

    t.is(res.status, HttpStatus.OK)

    const userFromDb = await UserModel.fetchUserById(t.context.users.user1.id)

    t.truthy(userFromDb)
    t.deepEqual(
        pick(userFromDb, ['name', 'email', 'about']),
        pick(payload, ['name', 'email', 'about']),
    )

    t.true(
        await bcrypt.compare(
            t.context.users.user1Data.password,
            userFromDb.password,
        ),
        'Password should not change during PUT operation.',
    )

    t.is(dateFrom2018.getFullYear(), userFromDb.createdAt.getFullYear())
    t.not(dateFrom2018.getFullYear(), userFromDb.modifiedAt.getFullYear())

    t.falsy(res.body.password)
    t.deepEqual(
        Object.keys(res.body).sort(),
        [
            'id',
            'name',
            'about',
            'email',
            'role',
            'createdAt',
            'modifiedAt',
        ].sort(),
    )
})
