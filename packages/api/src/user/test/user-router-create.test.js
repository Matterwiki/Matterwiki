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
const { makeUserData, testUserSetup } = require('./user-test-utils')

testDbSetup()
testUserSetup()

testApiSetup('/api/user/')

testAuth('post')
testAdminRole('post')

test('(400) validation error', async t => {
    const user = { ...makeUserData(), email: null }

    const res = await t.context.apiClient
        .post(t.context.apiUrl)
        .set('x-access-token', t.context.tokens.admin)
        .send(user)

    t.is(res.status, HttpStatus.BAD_REQUEST)
    t.truthy(res.body.error)
})

test('(409) duplicate email', async t => {
    const user = { ...makeUserData(), email: t.context.users.user1Data.email }

    const res = await t.context.apiClient
        .post(t.context.apiUrl)
        .set('x-access-token', t.context.tokens.admin)
        .send(user)

    t.is(res.status, HttpStatus.CONFLICT)
    t.is(res.body.error.code, ERRORS.DUPLICATE_EMAIL.code)
})

test('(201) user created', async t => {
    const user = makeUserData()

    const res = await await t.context.apiClient
        .post(t.context.apiUrl)
        .set('x-access-token', t.context.tokens.admin)
        .send(user)
    t.is(res.status, HttpStatus.CREATED)

    const userFromDb = await UserModel.fetchUserByEmail(user.email)

    t.truthy(userFromDb)
    t.deepEqual(
        pick(userFromDb, ['name', 'about']),
        pick(user, ['name', 'about']),
    )

    t.true(await bcrypt.compare(user.password, userFromDb.password))
    t.truthy(userFromDb.modifiedAt)
    t.truthy(userFromDb.createdAt)

    t.is(res.body.id, userFromDb.id)
    t.falsy(res.body.password)
    t.deepEqual(
        Object.keys(res.body).sort(),
        [
            'id',
            'name',
            'about',
            'email',
            'role',
            'modifiedAt',
            'createdAt',
        ].sort(),
    )
})
