const test = require('ava')
const chance = require('chance')

const { validationTestRunner } = require('../../common/test-utils/index')
const { ArticleCreateValidator } = require('../article-validator')
const { makeArticleCreatePayload } = require('./article-test-utils')

const validationTester = validationTestRunner(
    makeArticleCreatePayload,
    ArticleCreateValidator,
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

test('valid article', async t => {
    const article = makeArticleCreatePayload()
    const error = await ArticleCreateValidator.validate(article)
    t.falsy(error)
})
