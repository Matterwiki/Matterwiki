const test = require('ava')

const { validationTestRunner } = require('../../common/test-utils/index')

const { TopicValidator } = require('../topic-validator')

const { makeTopicData } = require('./topic-test-utils')

const validationTester = validationTestRunner(makeTopicData, TopicValidator)

test(
    'missing name',
    validationTester,
    { name: undefined },
    { name: ['"name" is required'] },
)
test(
    'bad name format type',
    validationTester,
    { name: null },
    { name: ['"name" must be a string'] },
)
test(
    'bad name',
    validationTester,
    { name: 'ab' },
    { name: ['"name" length must be at least 3 characters long'] },
)

test('valid topic', async t => {
    const topic = makeTopicData()
    const error = await TopicValidator.validate(topic)
    t.falsy(error)
})
