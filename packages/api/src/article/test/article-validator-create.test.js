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
    { title: ['title is a required field'] },
)
test(
    'bad title format type',
    validationTester,
    { title: null },
    { title: ['title must be a `string` type'] },
)

test(
    'bad title (min)',
    validationTester,
    { title: 'jfjda' },
    { title: ['title must be at least 10 characters'] },
)

test(
    'bad title (max)',
    validationTester,
    { title: chance().word({ length: 81 }) },
    {
        title: ['title must be at most 80 characters'],
    },
)

test(
    'missing content',
    validationTester,
    { content: undefined },
    { content: ['content is a required field'] },
)
test(
    'bad content format type',
    validationTester,
    { content: null },
    { content: ['content must be a `string` type'] },
)

test(
    'missing topicId',
    validationTester,
    { topicId: undefined },
    { topicId: ['topicId is a required field'] },
)
test(
    'bad topicId format type',
    validationTester,
    { topicId: null },
    { topicId: ['topicId must be a `number` type'] },
)

test('valid article', async t => {
    const article = makeArticleCreatePayload()
    const error = await ArticleCreateValidator.validate(article)
    t.falsy(error)
})
