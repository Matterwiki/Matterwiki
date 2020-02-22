const test = require('ava')
const HttpStatus = require('http-status-codes')
const { pick, keys } = require('lodash')

const { ERRORS, DEFAULT_CHANGELOG_MESSAGE } = require('../article-constants')
const ArticleModel = require('../article-model')
const ArticleHistoryModel = require('../../article-history/article-history-model')

const {
    ARTICLE_HISTORY_TYPES,
} = require('../../article-history/article-history-constants')

const {
    testApiSetup,
    testDbSetup,
    testAuth,
} = require('../../common/test-utils/index')
const { testUserSetup } = require('../../user/test/user-test-utils')

const {
    makeArticleCreatePayload,
    createFakeArticle,
    assertRelatedEntities,
} = require('./article-test-utils')

testDbSetup()
testUserSetup()

testApiSetup('/api/article/')

testAuth('post')

test('(400) validation error', async t => {
    const article = { ...makeArticleCreatePayload(), content: null }

    const res = await t.context.apiClient
        .post(t.context.apiUrl)
        .set('x-access-token', t.context.tokens.admin)
        .send(article)

    t.is(res.status, HttpStatus.BAD_REQUEST)
    t.truthy(res.body.error)
})

test('(400) topicId invalid', async t => {
    const payload = { ...makeArticleCreatePayload(), topicId: 190000 }

    const res = await t.context.apiClient
        .post(t.context.apiUrl)
        .set('x-access-token', t.context.tokens.admin)
        .send(payload)

    t.is(res.status, HttpStatus.BAD_REQUEST)
    t.is(res.body.error.code, ERRORS.TOPIC_INVALID.code)
})

test('(409) title must be unique', async t => {
    const article = await createFakeArticle(t.context.users.user1)
    const payload = { ...makeArticleCreatePayload(), title: article.title }

    const res = await t.context.apiClient
        .post(t.context.apiUrl)
        .set('x-access-token', t.context.tokens.admin)
        .send(payload)

    t.is(res.status, HttpStatus.CONFLICT)
    t.is(res.body.error.code, ERRORS.DUPLICATE_TITLE.code)
})

test('(201) accessible to USER', async t => {
    const article = makeArticleCreatePayload()

    const res = await t.context.apiClient
        .post(t.context.apiUrl)
        .set('x-access-token', t.context.tokens.user1)
        .send(article)

    t.is(res.status, HttpStatus.CREATED)
})

test('(201) unsafe html content is normalized', async t => {
    const expectedContent = `<p>This is OK to send over</p>`
    const article = {
        ...makeArticleCreatePayload(),
        content: `
            ${expectedContent}
            <script>alert('This is not OK!')</script>
        `,
    }

    const res = await t.context.apiClient
        .post(t.context.apiUrl)
        .set('x-access-token', t.context.tokens.admin)
        .send(article)
    t.is(res.status, HttpStatus.CREATED)

    const [articleFromDb] = await ArticleModel.fetchArticles().where(
        'title',
        article.title,
    )
    t.truthy(articleFromDb)

    t.is(articleFromDb.content.trim(), expectedContent)
})

test('(201) search tokens made during create', async t => {
    const article = makeArticleCreatePayload()

    const res = await t.context.apiClient
        .post(t.context.apiUrl)
        .set('x-access-token', t.context.tokens.admin)
        .send(article)
    t.is(res.status, HttpStatus.CREATED)

    const [articleFromDb] = await ArticleModel.fetchArticles()
        .where('title', article.title)
        .select('searchTokens')

    t.truthy(articleFromDb)
    t.truthy(articleFromDb.searchTokens)
})

test('(201) article created', async t => {
    const article = makeArticleCreatePayload()

    const res = await t.context.apiClient
        .post(t.context.apiUrl)
        .set('x-access-token', t.context.tokens.admin)
        .send(article)
    t.is(res.status, HttpStatus.CREATED)

    const [articleFromDb] = await ArticleModel.fetchArticles().where(
        'title',
        article.title,
    )
    t.truthy(articleFromDb)

    t.deepEqual(
        pick(articleFromDb, ['title', 'content', 'topicId']),
        pick(article, ['title', 'content', 'topicId']),
    )
    t.is(articleFromDb.changeLog, DEFAULT_CHANGELOG_MESSAGE)

    t.truthy(articleFromDb.modifiedAt)
    t.truthy(articleFromDb.createdAt)

    t.is(res.body.id, articleFromDb.id)
    t.deepEqual(
        keys(res.body).sort(),
        [
            'id',
            'title',
            'content',
            'changeLog',
            'modifiedAt',
            'createdAt',
            'topic',
            'createdByUser',
            'modifiedByUser',
        ].sort(),
    )
})

test('(201) returns related entities', async t => {
    const article = makeArticleCreatePayload()

    const res = await t.context.apiClient
        .post(t.context.apiUrl)
        .set('x-access-token', t.context.tokens.admin)
        .send(article)
    t.is(res.status, HttpStatus.CREATED)

    assertRelatedEntities(t, article, t.context.users.admin, res.body)
})

test('(201) creates history entry', async t => {
    const article = makeArticleCreatePayload()

    const res = await t.context.apiClient
        .post(t.context.apiUrl)
        .set('x-access-token', t.context.tokens.admin)
        .send(article)
    t.is(res.status, HttpStatus.CREATED)

    const historyItems = await ArticleHistoryModel.fetchArticleHistory().where(
        'articleId',
        res.body.id,
    )
    t.is(historyItems.length, 1)

    const [historyItem] = historyItems
    t.is(historyItem.type, ARTICLE_HISTORY_TYPES.CREATE)

    t.deepEqual(
        pick(historyItem, ['title', 'content', 'topicId']),
        pick(article, ['title', 'content', 'topicId']),
    )

    t.is(historyItem.changeLog, DEFAULT_CHANGELOG_MESSAGE)

    t.is(historyItem.createdById, t.context.users.admin.id)
    t.is(historyItem.modifiedById, t.context.users.admin.id)
    t.truthy(historyItem.modifiedAt)
    t.truthy(historyItem.createdAt)
})
