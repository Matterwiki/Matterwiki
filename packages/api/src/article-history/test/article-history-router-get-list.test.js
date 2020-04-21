const test = require('ava')
const Promise = require('bluebird')
const HttpStatus = require('http-status-codes')
const { map, keys, last } = require('lodash')

const ArticleModel = require('../../article/article-model')
const { prepareArticleDataForDb } = require('../../article/article-utils')

const ArticleHistoryModel = require('../article-history-model')

const {
    testApiSetup,
    testDbSetup,
    testAuth,
} = require('../../common/test-utils/index')
const { testUserSetup } = require('../../user/test/user-test-utils')

const {
    testArticleSetup,
    makeArticleUpdatePayload,
} = require('../../article/test/article-test-utils')

const { testTopicSetup } = require('../../topic/test/topic-test-utils')

testDbSetup()
testUserSetup()

testTopicSetup()
testArticleSetup()

testApiSetup(`/api/article/{articles[1].id}/history`)

testAuth('get')

const currentYear = new Date().getFullYear()
const futureYear = currentYear + 10
const yesterYear = 2012

async function botchDatesInHistoryItems(articleId) {
    const randomHistoryItem = await ArticleHistoryModel.fetchArticleHistory().findOne(
        'articleId',
        articleId,
    )
    const randomHistoryItem1 = await ArticleHistoryModel.fetchArticleHistory()
        .findOne('articleId', articleId)
        .whereNot('id', randomHistoryItem.id)

    // set future date - this will be the first item in the list
    await ArticleHistoryModel.fetchArticleHistory().patchAndFetchById(
        randomHistoryItem.id,
        {
            createdAt: new Date(new Date().setFullYear(futureYear)),
            modifiedAt: new Date(new Date().setFullYear(futureYear)),
        },
    )

    // Set old date - this will be the last item in the list
    await ArticleHistoryModel.fetchArticleHistory().patchAndFetchById(
        randomHistoryItem1.id,
        {
            createdAt: new Date(new Date().setFullYear(yesterYear)),
            modifiedAt: new Date(new Date().setFullYear(yesterYear)),
        },
    )
}

test.beforeEach(async t => {
    // Make a bunch of updates to the articles, so history gets updated
    const { id } = t.context.articles[1]
    const { user2 } = t.context.users
    const updateCount = 10
    const articleUpdates = () =>
        prepareArticleDataForDb(makeArticleUpdatePayload(), id)

    await Promise.mapSeries(new Array(updateCount), () =>
        ArticleModel.updateArticleById(id, articleUpdates(), user2),
    )

    await botchDatesInHistoryItems(id)

    t.context.historyItems = await ArticleHistoryModel.fetchHistoryByArticleId(
        id,
    ).orderBy('modifiedAt', 'desc')

    t.is(
        t.context.historyItems.length,
        // History entry for creation + History entries for updates
        1 + updateCount,
    )
})

test('(200) returns expected fields', async t => {
    const { tokens, historyItems, apiClient, apiUrl } = t.context
    const res = await apiClient.get(apiUrl).set('x-access-token', tokens.admin)

    t.is(res.status, HttpStatus.OK)

    t.is(res.body.length, historyItems.length)
    t.deepEqual(
        keys(res.body[0]).sort(),
        [
            'id',
            'articleId',
            'title',
            'modifiedAt',
            'createdAt',
            'createdByUser',
            'modifiedByUser',
            'topic',
            'type',
        ].sort(),
    )
})

test('(200) returns expected list in right order', async t => {
    const { tokens, historyItems, apiClient, apiUrl } = t.context
    const res = await apiClient.get(apiUrl).set('x-access-token', tokens.admin)

    t.is(res.status, HttpStatus.OK)

    t.deepEqual(map(res.body, 'id'), map(historyItems, 'id'))
})

test('(200) returns expected list with paging', async t => {
    const { tokens, historyItems, apiClient, apiUrl } = t.context
    const pageNos = [0, 1, 2]
    const pageSize = 5

    const pages = await Promise.map(pageNos, async pageNo => {
        const res = await apiClient
            .get(apiUrl)
            .set('x-access-token', tokens.admin)
            .query({
                paging: true,
                pageNo,
                pageSize,
            })

        t.is(res.status, HttpStatus.OK)

        t.is(res.body.total, historyItems.length)

        return res.body.results
    })

    // Sanity tests
    t.is(pages.length, pageNos.length)

    const [page1, page2, page3] = pages
    t.true(page1.length <= pageSize)
    t.true(page2.length <= pageSize)
    t.true(page3.length <= pageSize)

    t.is(new Date(page1[0].modifiedAt).getFullYear(), futureYear)
    t.is(new Date(last(page3).modifiedAt).getFullYear(), yesterYear)
})
