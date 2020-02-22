const test = require('ava')
const HttpStatus = require('http-status-codes')
const { pick } = require('lodash')

const { createJwt } = require('../../../user/user-utils')
const { ERRORS } = require('../../../user/user-constants')

const { checkAuth } = require('../index')

const { testDbSetup } = require('../../test-utils/index')
const { testUserSetup } = require('../../../user/test/user-test-utils')

testDbSetup()
testUserSetup()

const unauthorizedTests = async (t, input) => {
    await checkAuth({ headers: input }, {}, err => {
        t.is(err.status, HttpStatus.UNAUTHORIZED)
        t.is(err.code, ERRORS.INVALID_TOKEN.code)
    })
}

test('missing token', unauthorizedTests, {})

test('bad token', unauthorizedTests, { 'x-access-token': 'gibberish-token' })

test('valid token', async t => {
    const token = createJwt(t.context.users.admin)

    const req = { headers: { 'x-access-token': token } }

    await checkAuth(req, {}, () => {
        t.truthy(req.user)
        t.deepEqual(
            pick(req.user, ['name', 'email', 'about']),
            pick(t.context.users.admin, ['name', 'email', 'about']),
        )
    })
})
