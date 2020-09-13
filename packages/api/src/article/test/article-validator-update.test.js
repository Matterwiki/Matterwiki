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

test(
    'missing changeLog',
    validationTester,
    { changeLog: undefined },
    { changeLog: ['changeLog is a required field'] },
)

test(
    'bad changeLog format type',
    validationTester,
    { changeLog: null },
    { changeLog: ['changeLog must be a `string` type'] },
)

test(
    'bad changeLog (min)',
    validationTester,
    { changeLog: 'jfjda' },
    { changeLog: ['changeLog must be at least 10 characters'] },
)

test(
    'bad changeLog (max)',
    validationTester,
    { changeLog: chance().word({ length: 51 }) },
    {
        changeLog: ['changeLog must be at most 50 characters'],
    },
)

test('valid article', async t => {
    const article = makeArticleUpdatePayload()
    const error = await ArticleUpdateValidator.validate(article)
    t.falsy(error)
})
