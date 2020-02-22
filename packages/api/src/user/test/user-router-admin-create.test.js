const test = require('ava')
const bcrypt = require('bcryptjs')
const { pick } = require('lodash')
const HttpStatus = require('http-status-codes')

const UserModel = require('../user-model')
const { ERRORS } = require('../user-constants')

const { testApiSetup, testDbSetup } = require('../../common/test-utils/index')
const { makeUserData, createAdmin } = require('./user-test-utils')

testDbSetup()
testApiSetup('/api/user/admin')

test('(400) validation error', async t => {
    const admin = { ...makeUserData(), email: null }

    const res = await t.context.apiClient.post(t.context.apiUrl).send(admin)

    t.is(res.status, HttpStatus.BAD_REQUEST)
    t.truthy(res.body.error)
})

test('(409) only one admin can be created', async t => {
    await createAdmin()
    const dupAdmin = makeUserData()

    const res = await t.context.apiClient.post(t.context.apiUrl).send(dupAdmin)

    t.is(res.status, HttpStatus.CONFLICT)
    t.is(res.body.error.code, ERRORS.DUPLICATE_ADMIN_USER.code)
})

test('(201) admin created', async t => {
    const admin = makeUserData()

    const res = await t.context.apiClient.post(t.context.apiUrl).send(admin)
    t.is(res.status, HttpStatus.CREATED)

    const adminFromDb = await UserModel.fetchAdmin()

    t.truthy(adminFromDb)
    t.deepEqual(
        pick(adminFromDb, ['name', 'email', 'about']),
        pick(admin, ['name', 'email', 'about']),
    )
    t.true(await bcrypt.compare(admin.password, adminFromDb.password))
    t.truthy(adminFromDb.modifiedAt)
    t.truthy(adminFromDb.createdAt)
    t.deepEqual(res.body, {})
})
