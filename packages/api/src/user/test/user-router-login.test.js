const test = require('ava')
const { pick } = require('lodash')
const HttpStatus = require('http-status-codes')

const { ERRORS } = require('../user-constants')

const { testApiSetup, testDbSetup } = require('../../common/test-utils/index')
const { createAdmin, makeLoginPayload } = require('./user-test-utils')

testDbSetup()
testApiSetup('/api/user/login')

test('(400) validation error', async t => {
    const payload = { ...makeLoginPayload(), email: undefined }

    const res = await t.context.apiClient.post(t.context.apiUrl).send(payload)

    t.is(res.status, HttpStatus.BAD_REQUEST)
    t.truthy(res.body.error)
})

test('(400) email not found', async t => {
    const payload = makeLoginPayload()
    await createAdmin({ password: 'test123' })

    const res = await t.context.apiClient.post(t.context.apiUrl).send(payload)

    t.is(res.status, HttpStatus.BAD_REQUEST)
    t.is(res.body.error.code, ERRORS.CREDS_WRONG.code)
})

test('(400) incorrect password', async t => {
    const payload = makeLoginPayload()
    await createAdmin({
        email: payload.email,
        password: 'test123',
    })

    const res = await t.context.apiClient.post(t.context.apiUrl).send(payload)

    t.is(res.status, HttpStatus.BAD_REQUEST)
    t.is(res.body.error.code, ERRORS.CREDS_WRONG.code)
})

test('(200) successful login', async t => {
    const payload = makeLoginPayload()
    const userFromDb = await createAdmin(payload)

    const res = await t.context.apiClient.post(t.context.apiUrl).send(payload)

    t.is(res.status, HttpStatus.OK)
    t.deepEqual(
        pick(res.body, ['name', 'email', 'about', 'role']),
        pick(userFromDb, ['name', 'email', 'about', 'role']),
    )

    t.truthy(res.body.token)
    t.falsy(res.body.password)
})
