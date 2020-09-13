const test = require('ava')
const { merge } = require('lodash')

const { validationTestRunner } = require('../../common/test-utils/index')
const { UserValidator } = require('../user-validator')
const { makeUserData } = require('./user-test-utils')

const validationTester = validationTestRunner(makeUserData, UserValidator)

test(
    'missing email',
    validationTester,
    { email: undefined },
    { email: ['email is a required field'] },
)
test(
    'bad email format type',
    validationTester,
    { email: null },
    { email: ['email must be a `string` type'] },
)
test(
    'bad email',
    validationTester,
    { email: 'jhbdfbjd' },
    { email: ['email must be a valid email'] },
)

test(
    'missing name',
    validationTester,
    { name: undefined },
    { name: ['name is a required field'] },
)
test(
    'bad name format type',
    validationTester,
    { name: null },
    { name: ['name must be a `string` type'] },
)
test(
    'bad name',
    validationTester,
    { name: 'ab' },
    { name: ['name must be at least 3 characters'] },
)

test(
    'missing password field',
    validationTester,
    { password: undefined },
    { password: ['password is a required field'] },
)

test('valid when empty about is passed', async t => {
    const user = merge(makeUserData(), { about: '' })
    const error = await UserValidator.validate(user)
    t.falsy(error)
})

test('valid user', async t => {
    const user = makeUserData()
    const error = await UserValidator.validate(user)
    t.falsy(error)
})
