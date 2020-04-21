const test = require('ava')
const HttpStatus = require('http-status-codes')
const { pick, keys } = require('lodash')

const {
    testApiSetup,
    testDbSetup,
    testAuth,
} = require('../../common/test-utils/index')
const { testUserSetup } = require('../../user/test/user-test-utils')

const ArticleHistoryModel = require('../../article-history/article-history-model')
const {
    ARTICLE_HISTORY_TYPES,
} = require('../../article-history/article-history-constants')

const { ERRORS } = require('../article-constants')
const ArticleModel = require('../article-model')

const {
    makeArticleUpdatePayload,
    testArticleSetup,
    assertRelatedEntities,
} = require('./article-test-utils')

const { testTopicSetup } = require('../../topic/test/topic-test-utils')

const apiUrl = '/api/article'

testDbSetup()
testUserSetup()

testTopicSetup()
testArticleSetup()

testApiSetup(`${apiUrl}/{articles[1].id}`)

testAuth('put')

test('(400) validation error', async t => {
    const article = { ...makeArticleUpdatePayload(), content: null }

    const res = await t.context.apiClient
        .put(t.context.apiUrl)
        .set('x-access-token', t.context.tokens.admin)
        .send(article)

    t.is(res.status, HttpStatus.BAD_REQUEST)
    t.truthy(res.body.error)
})

test('(400) topicId invalid', async t => {
    const payload = { ...makeArticleUpdatePayload(), topicId: 1900000 }

    const res = await t.context.apiClient
        .put(t.context.apiUrl)
        .set('x-access-token', t.context.tokens.admin)
        .send(payload)

    t.is(res.status, HttpStatus.BAD_REQUEST)
    t.is(res.body.error.code, ERRORS.TOPIC_INVALID.code)
})

test('(404) article not found', async t => {
    const payload = makeArticleUpdatePayload()

    const res = await t.context.apiClient
        .put(`${apiUrl}/858793287957832589`)
        .set('x-access-token', t.context.tokens.admin)
        .send(payload)

    t.is(res.status, HttpStatus.NOT_FOUND)
})

test('(409) title must be unique', async t => {
    const [article1] = t.context.articles
    const payload = { ...makeArticleUpdatePayload(), title: article1.title }

    const res = await t.context.apiClient
        .put(t.context.apiUrl)
        .set('x-access-token', t.context.tokens.admin)
        .send(payload)

    t.is(res.status, HttpStatus.CONFLICT)
    t.is(res.body.error.code, ERRORS.DUPLICATE_TITLE.code)
})

test('(200) accessible to USER', async t => {
    const article = makeArticleUpdatePayload()

    const res = await t.context.apiClient
        .put(t.context.apiUrl)
        .set('x-access-token', t.context.tokens.user1)
        .send(article)

    t.is(res.status, HttpStatus.OK)
})

test('(200) unsafe html content is normalized', async t => {
    const expectedContent = `<p>This is OK to send over</p>`
    const article = {
        ...makeArticleUpdatePayload(),
        content: `
            ${expectedContent}
            <script>alert('This is not OK!')</script>
        `,
    }

    const res = await t.context.apiClient
        .put(t.context.apiUrl)
        .set('x-access-token', t.context.tokens.admin)
        .send(article)
    t.is(res.status, HttpStatus.OK)

    const articleFromDb = await ArticleModel.fetchArticleById(
        t.context.articles[1].id,
    )
    t.truthy(articleFromDb)

    t.is(articleFromDb.content.trim(), expectedContent)
})

test('(200) search tokens made during update', async t => {
    const article = makeArticleUpdatePayload()

    const res = await t.context.apiClient
        .put(t.context.apiUrl)
        .set('x-access-token', t.context.tokens.admin)
        .send(article)

    t.is(res.status, HttpStatus.OK)

    const articleFromDb = await ArticleModel.fetchArticles().findById(
        t.context.articles[1].id,
    )

    t.truthy(articleFromDb)
    t.truthy(articleFromDb.searchTokens)
})

test('(200) article created', async t => {
    const { users, tokens, articles, apiClient, apiUrl } = t.context

    // Prep article we are updating with older date, for testing.
    const dateFrom2018 = new Date(new Date().setFullYear(2018))
    articles[1] = await ArticleModel.patchArticleById(articles[1].id, {
        createdAt: dateFrom2018,
        modifiedAt: dateFrom2018,
        createdById: users.user2.id,
        modifiedById: users.user2.id,
    })

    const article = makeArticleUpdatePayload()

    const res = await apiClient
        .put(apiUrl)
        .set('x-access-token', tokens.admin)
        .send(article)
    t.is(res.status, HttpStatus.OK)

    const articleFromDb = await ArticleModel.fetchArticleById(articles[1].id)
    t.truthy(articleFromDb)

    t.deepEqual(
        pick(articleFromDb, ['title', 'content', 'changeLog']),
        pick(article, ['title', 'content', 'changeLog']),
    )

    t.is(dateFrom2018.getFullYear(), articleFromDb.createdAt.getFullYear())
    t.is(new Date().getFullYear(), articleFromDb.modifiedAt.getFullYear())

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

test('(200) returns related entities', async t => {
    const article = makeArticleUpdatePayload()

    const res = await t.context.apiClient
        .put(t.context.apiUrl)
        .set('x-access-token', t.context.tokens.admin)
        .send(article)
    t.is(res.status, HttpStatus.OK)

    assertRelatedEntities(t, article, t.context.users.admin, res.body)
})

test('(200) creates history entry', async t => {
    const article = makeArticleUpdatePayload()

    const res = await t.context.apiClient
        .put(t.context.apiUrl)
        .set('x-access-token', t.context.tokens.admin)
        .send(article)
    t.is(res.status, HttpStatus.OK)

    const historyItems = await ArticleHistoryModel.fetchArticleHistory().where({
        articleId: res.body.id,
    })
    t.is(historyItems.length, 2)

    const historyItem = historyItems[1]
    t.is(historyItem.type, ARTICLE_HISTORY_TYPES.UPDATE)

    t.deepEqual(
        pick(historyItem, ['title', 'content', 'topicId', 'changeLog']),
        pick(article, ['title', 'content', 'topicId', 'changeLog']),
    )

    t.is(historyItem.createdById, t.context.articles[1].createdById)
    t.is(historyItem.modifiedById, t.context.users.admin.id)
    t.truthy(historyItem.modifiedAt)
    t.truthy(historyItem.createdAt)
})
