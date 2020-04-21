const test = require('ava')

const { LoginValidator } = require('../user-validator')

const { validationTestRunner } = require('../../common/test-utils/index')
const { makeLoginPayload } = require('./user-test-utils')

const validationTester = validationTestRunner(makeLoginPayload, LoginValidator)

test(
    'missing email',
    validationTester,
    { email: undefined },
    { email: ['"email" is required'] },
)
test(
    'bad email',
    validationTester,
    { email: 'jhbdfbjd' },
    { email: ['"email" must be a valid email'] },
)
test(
    'missing password field',
    validationTester,
    { password: undefined },
    { password: ['"password" is required'] },
)

test('valid login payload', async t => {
    const user = makeLoginPayload()
    const error = await LoginValidator.validate(user)
    t.falsy(error)
})
