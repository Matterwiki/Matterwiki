const test = require('ava')

const { UserPasswordUpdateValidator } = require('../user-validator')

const { validationTestRunner } = require('../../common/test-utils/index')
const { makePasswordUpdatePayload } = require('./user-test-utils')

const validationTester = validationTestRunner(
    makePasswordUpdatePayload,
    UserPasswordUpdateValidator,
)

test(
    'missing current password',
    validationTester,
    { currentPassword: undefined },
    { currentPassword: ['"currentPassword" is required'] },
)
test(
    'bad current password format type',
    validationTester,
    { currentPassword: null },
    { currentPassword: ['"currentPassword" must be a string'] },
)

test(
    'missing new password',
    validationTester,
    { newPassword: undefined },
    { newPassword: ['"newPassword" is required'] },
)
test(
    'bad new password format type',
    validationTester,
    { newPassword: null },
    { newPassword: ['"newPassword" must be a string'] },
)

test('valid password payload', async t => {
    const user = makePasswordUpdatePayload()
    const error = await UserPasswordUpdateValidator.validate(user)
    t.falsy(error)
})
