const test = require('ava')

const { validationTestRunner } = require('../../common/test-utils/index')

const { TopicValidator } = require('../topic-validator')

const { makeTopicData } = require('./topic-test-utils')

const validationTester = validationTestRunner(makeTopicData, TopicValidator)

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

test('valid topic', async t => {
    const topic = makeTopicData()
    const error = await TopicValidator.validate(topic)
    t.falsy(error)
})
