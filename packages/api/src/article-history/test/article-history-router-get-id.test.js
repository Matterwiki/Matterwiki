const test = require('ava')
const HttpStatus = require('http-status-codes')
const { pick, keys } = require('lodash')

const ArticleHistoryModel = require('../article-history-model')

const {
    testApiSetup,
    testDbSetup,
    testAuth,
} = require('../../common/test-utils/index')
const { testUserSetup } = require('../../user/test/user-test-utils')

const { testArticleSetup } = require('../../article/test/article-test-utils')

const { testTopicSetup } = require('../../topic/test/topic-test-utils')

testDbSetup()
testUserSetup()

testTopicSetup()
testArticleSetup()
test.beforeEach(async t => {
    t.context.historyItem = await ArticleHistoryModel.fetchArticleHistory().findOne(
        'articleId',
        t.context.articles[1].id,
    )
})

testApiSetup(`/api/article/{articles[1].id}/history/{historyItem.id}`)

testAuth('get')

test('(200) returns expected fields', async t => {
    const { tokens, historyItem, apiClient, apiUrl } = t.context
    const res = await apiClient.get(apiUrl).set('x-access-token', tokens.admin)

    t.is(res.status, HttpStatus.OK)

    t.deepEqual(
        pick(res.body, ['id', 'title', 'content', 'changeLog', 'type']),
        pick(historyItem, ['id', 'title', 'content', 'changeLog', 'type']),
    )
    t.truthy(res.body.modifiedAt)
    t.truthy(res.body.createdAt)

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
            'type',
        ].sort(),
    )
})
