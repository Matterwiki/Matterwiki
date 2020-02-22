const test = require('ava')
const HttpStatus = require('http-status-codes')

const { checkAdminRole } = require('../index')

const { ERRORS } = require('../../../user/user-constants')

const { testDbSetup } = require('../../test-utils/index')
const { testUserSetup } = require('../../../user/test/user-test-utils')

testDbSetup()
testUserSetup()

test('req.user not set', t => {
    checkAdminRole({}, {}, err => {
        t.is(err.status, HttpStatus.FORBIDDEN)
        t.is(err.code, ERRORS.NO_ACCESS.code)
    })
})

test('regular user', t => {
    checkAdminRole({ user: t.context.users.user1 }, {}, err => {
        t.is(err.status, HttpStatus.FORBIDDEN)
        t.is(err.code, ERRORS.NO_ACCESS.code)
    })
})

test('verified admin user', t => {
    checkAdminRole({ user: t.context.users.admin }, {}, t.pass)
})
