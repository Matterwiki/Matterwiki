const test = require('ava')
const chance = require('chance')

const { validationTestRunner } = require('../../common/test-utils/index')
const { ArticleUpdateValidator } = require('../article-validator')
const { makeArticleUpdatePayload } = require('./article-test-utils')

const validationTester = validationTestRunner(
    makeArticleUpdatePayload,
    ArticleUpdateValidator,
)

test(
    'missing title',
    validationTester,
    { title: undefined },
    { title: ['"title" is required'] },
)

test(
    'bad title format type',
    validationTester,
    { title: null },
    { title: ['"title" must be a string'] },
)

test(
    'bad title (min)',
    validationTester,
    { title: 'jfjda' },
    { title: ['"title" length must be at least 10 characters long'] },
)

test(
    'bad title (max)',
    validationTester,
    { title: chance().word({ length: 81 }) },
    {
        title: [
            '"title" length must be less than or equal to 80 characters long',
        ],
    },
)

test(
    'missing content',
    validationTester,
    { content: undefined },
    { content: ['"content" is required'] },
)

test(
    'bad content format type',
    validationTester,
    { content: null },
    { content: ['"content" must be a string'] },
)

test(
    'missing topicId',
    validationTester,
    { topicId: undefined },
    { topicId: ['"topicId" is required'] },
)
test(
    'bad topicId format type',
    validationTester,
    { topicId: null },
    { topicId: ['"topicId" must be a number'] },
)

test(
    'missing changeLog',
    validationTester,
    { changeLog: undefined },
    { changeLog: ['"changeLog" is required'] },
)

test(
    'bad changeLog format type',
    validationTester,
    { changeLog: null },
    { changeLog: ['"changeLog" must be a string'] },
)

test(
    'bad changeLog (min)',
    validationTester,
    { changeLog: 'jfjda' },
    { changeLog: ['"changeLog" length must be at least 10 characters long'] },
)

test(
    'bad changeLog (max)',
    validationTester,
    { changeLog: chance().word({ length: 51 }) },
    {
        changeLog: [
            '"changeLog" length must be less than or equal to 50 characters long',
        ],
    },
)

test('valid article', async t => {
    const article = makeArticleUpdatePayload()
    const error = await ArticleUpdateValidator.validate(article)
    t.falsy(error)
})
