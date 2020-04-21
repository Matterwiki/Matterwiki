const test = require('ava')
const Promise = require('bluebird')
const HttpStatus = require('http-status-codes')
const {
    orderBy,
    find,
    map,
    filter,
    uniq,
    keys,
    merge,
    first,
} = require('lodash')

const ArticleModel = require('../article-model')

const {
    testApiSetup,
    testDbSetup,
    testAuth,
} = require('../../common/test-utils/index')
const { testUserSetup } = require('../../user/test/user-test-utils')
const { testTopicSetup } = require('../../topic/test/topic-test-utils')
const { createFakeArticle, testArticleSetup } = require('./article-test-utils')

function findArticleByTitle(t, title) {
    return find(t.context.articles, u => u.title === title)
}

function getSortedArticlesByTitle(t, orderStyle = 'asc') {
    return orderBy(
        t.context.articles,
        [u => u.title.toLowerCase()],
        [orderStyle],
    )
}

/**
 * Creates articles that work for multiple scenarios
 * - Mixed up sorting
 * - Mixed up createdAt dates
 * - Mixed up modifiedAt dates
 *
 * TODO: Refactor to make this more understandable! The good thing about this nasty fn
 * is that takes care of data work for us!
 */
function createMultipleArticles(t) {
    const currentYear = new Date().getFullYear()

    const overrides = [
        { title: '0001FirstTitle' },
        {
            patch: true,
            title: '0013ThirteenthTitle',
            // 🍭 Whoo, date in the future 🤡
            // TODO: Maybe make this into a function?
            createdAt: new Date(new Date().setFullYear(currentYear + 10)),
            modifiedAt: new Date(new Date().setFullYear(currentYear + 12)),
        },
        {
            title: '0003ThirdTitle',
        },
        { title: '0002SecondTitle' },
        {
            patch: true,
            title: '0045FortyFifthTitle',
            createdAt: new Date(new Date().setFullYear(currentYear + 5)),
            modifiedAt: new Date(new Date().setFullYear(currentYear + 6)),
        },
        { title: '0004FourthTitle' },
        {
            patch: true,
            title: '0036ThirtySixthTitle',
            createdAt: new Date(new Date().setFullYear(2012)),
            modifiedAt: new Date(new Date().setFullYear(2013)),
        },
        { title: '0005FifthTitle' },
        {
            patch: true,
            title: '0023TwentyThirdTitle',
            createdAt: new Date(new Date().setFullYear(2014)),
            modifiedAt: new Date(new Date().setFullYear(2014)),
        },
        { title: '0058FiftyEigthTitle' },
        { title: '0017SeventeenthTitle' },
        { title: '2058FiftyEigthTitle' },
        { title: '1017SeventeenthTitle' },
    ]
    return Promise.map(overrides, async ({ patch, ...override }) => {
        let article = await createFakeArticle(t.context.users.user1, override)

        // Updating some extra meta fields
        if (patch) {
            article = await ArticleModel.patchArticleById(article.id, {
                createdAt: override.createdAt,
                modifiedAt: override.modifiedAt,
            })
        }
        return article
    })
}

// TODO: Move to test-utils
async function callApiWithQuery(t, query) {
    let callApi = t.context.apiClient
        .get(t.context.apiUrl)
        .set('x-access-token', t.context.tokens.admin)

    if (query) callApi = callApi.query(query)

    const res = await callApi

    t.is(res.status, HttpStatus.OK)

    return res
}

function assertArticleListOrderingByTitle(t, expected, actual) {
    t.is(expected[0].title, actual[0].title)
    t.is(expected[1].title, actual[1].title)
    t.is(expected[expected.length - 1].title, actual[actual.length - 1].title)
}

testDbSetup()
testUserSetup()

testTopicSetup()
test.beforeEach(async t => {
    const newArticles = await createMultipleArticles(t)
    merge(t.context, { newArticles })
})
testArticleSetup()
testApiSetup(`/api/article/`)

testAuth('get')

test('(200) USER can access list', async t => {
    const res = await t.context.apiClient
        .get(t.context.apiUrl)
        .set('x-access-token', t.context.tokens.user1)

    t.is(res.status, HttpStatus.OK)
})

test('(200) list returns expected data', async t => {
    const res = await callApiWithQuery(t)

    t.is(res.body.length, t.context.articles.length)

    t.deepEqual(
        keys(res.body[0]).sort(),
        [
            'id',
            'title',
            'modifiedAt',
            'createdAt',
            'createdByUser',
            'modifiedByUser',
            'topic',
        ].sort(),
    )
})

test('(200) default list sorted by modifiedAt and in desc order', async t => {
    const expectedFirst = findArticleByTitle(t, '0013ThirteenthTitle')
    const expectedSecond = findArticleByTitle(t, '0045FortyFifthTitle')

    const res = await callApiWithQuery(t, {
        orderField: 'modifiedAt',
        orderStyle: 'desc',
    })

    t.is(res.body.length, t.context.articles.length)

    const [actualFirst, actualSecond] = res.body
    t.is(
        expectedFirst.modifiedAt.getFullYear(),
        new Date(actualFirst.modifiedAt).getFullYear(),
    )
    t.is(
        expectedSecond.modifiedAt.getFullYear(),
        new Date(actualSecond.modifiedAt).getFullYear(),
    )
})

test('(200) modifiedAt sort filter (ASC) returns expected list', async t => {
    const expectedFirst = findArticleByTitle(t, '0036ThirtySixthTitle')
    const expectedSecond = findArticleByTitle(t, '0023TwentyThirdTitle')

    const res = await callApiWithQuery(t, {
        orderField: 'modifiedAt',
        orderStyle: 'asc',
    })

    t.is(res.body.length, t.context.articles.length)

    const [actualFirst, actualSecond] = res.body
    t.is(
        expectedFirst.modifiedAt.getFullYear(),
        new Date(actualFirst.modifiedAt).getFullYear(),
    )
    t.is(
        expectedSecond.modifiedAt.getFullYear(),
        new Date(actualSecond.modifiedAt).getFullYear(),
    )
})

test('(200) createdAt sort filter (ASC) returns expected list', async t => {
    const expectedFirst = findArticleByTitle(t, '0036ThirtySixthTitle')
    const expectedSecond = findArticleByTitle(t, '0023TwentyThirdTitle')

    const res = await callApiWithQuery(t, {
        orderField: 'createdAt',
        orderStyle: 'asc',
    })

    t.is(res.body.length, t.context.articles.length)

    const [actualFirst, actualSecond] = res.body
    t.is(
        expectedFirst.modifiedAt.getFullYear(),
        new Date(actualFirst.modifiedAt).getFullYear(),
    )
    t.is(
        expectedSecond.modifiedAt.getFullYear(),
        new Date(actualSecond.modifiedAt).getFullYear(),
    )
})

test('(200) createdAt sort filter (DESC) returns expected list', async t => {
    const expectedFirst = findArticleByTitle(t, '0013ThirteenthTitle')
    const expectedSecond = findArticleByTitle(t, '0045FortyFifthTitle')

    const res = await callApiWithQuery(t, {
        orderField: 'createdAt',
        orderStyle: 'desc',
    })

    t.is(res.body.length, t.context.articles.length)

    const [actualFirst, actualSecond] = res.body
    t.is(
        expectedFirst.modifiedAt.getFullYear(),
        new Date(actualFirst.modifiedAt).getFullYear(),
    )
    t.is(
        expectedSecond.modifiedAt.getFullYear(),
        new Date(actualSecond.modifiedAt).getFullYear(),
    )
})

test('(200) title sort filter (ASC) returns expected list', async t => {
    const expected = getSortedArticlesByTitle(t, 'asc')

    const res = await callApiWithQuery(t, {
        orderField: 'title',
        orderStyle: 'asc',
    })

    t.is(res.body.length, expected.length)
    assertArticleListOrderingByTitle(t, expected, res.body)
})

test('(200) title sort filter (DESC) returns expected list', async t => {
    const expected = getSortedArticlesByTitle(t, 'desc')

    const res = await callApiWithQuery(t, {
        orderField: 'title',
        orderStyle: 'desc',
    })

    t.is(res.body.length, expected.length)
    assertArticleListOrderingByTitle(t, expected, res.body)
})

test('(200) topicId filter returns expected list', async t => {
    const topicToFilter = t.context.topics[1]
    const expectedArticles = filter(
        t.context.articles,
        a => a.topicId === topicToFilter.id,
    )

    const res = await callApiWithQuery(t, {
        topicId: topicToFilter.id,
    })

    t.is(res.body.length, expectedArticles.length)
    t.is(first(uniq(map(res.body, 'topic.id'))), topicToFilter.id)
})

test('(200) paging filters with applied filters work as expected', async t => {
    const sorted = getSortedArticlesByTitle(t, 'asc')

    return Promise.map([0, 1], async pageNo => {
        const pageSize = 3
        const res = await callApiWithQuery(t, {
            orderField: 'title',
            orderStyle: 'asc',
            paging: true,
            pageNo,
            pageSize,
        })

        t.is(res.body.total, sorted.length)
        t.is(res.body.results.length, 3)

        const start = pageNo * pageSize
        const end = start + pageSize

        assertArticleListOrderingByTitle(
            t,
            sorted.slice(start, end),
            res.body.results,
        )
    })
})

test('(200) paging filters with default filters work as expected', async t => {
    const expectedFirst = findArticleByTitle(t, '0013ThirteenthTitle')
    const expectedSecond = findArticleByTitle(t, '0045FortyFifthTitle')

    const res = await callApiWithQuery(t, {
        paging: true,
        pageNo: 0,
        pageSize: 3,
    })

    t.is(res.body.total, t.context.articles.length)
    t.is(res.body.results.length, 3)

    const [actualFirst, actualSecond] = res.body.results
    t.is(
        expectedFirst.modifiedAt.getFullYear(),
        new Date(actualFirst.modifiedAt).getFullYear(),
    )
    t.is(
        expectedSecond.modifiedAt.getFullYear(),
        new Date(actualSecond.modifiedAt).getFullYear(),
    )
})
