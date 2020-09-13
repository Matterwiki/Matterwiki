const test = require('ava')

const { UserUpdateValidator } = require('../user-validator')

const { validationTestRunner } = require('../../common/test-utils/index')
const { makeUserData } = require('./user-test-utils')

const validationTester = validationTestRunner(makeUserData, UserUpdateValidator)

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

test('allow empty password', async t => {
    const user = makeUserData()
    delete user.password

    const error = await UserUpdateValidator.validate(user)
    t.falsy(error)
})

test('valid user', async t => {
    const user = makeUserData()
    const error = await UserUpdateValidator.validate(user)
    t.falsy(error)
})
