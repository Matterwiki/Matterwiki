const test = require('ava')
const Promise = require('bluebird')
const HttpStatus = require('http-status-codes')
const { isNumber, map, keys, merge, shuffle } = require('lodash')

const {
    testApiSetup,
    testDbSetup,
    testAuth,
} = require('../../common/test-utils/index')
const { testUserSetup } = require('../../user/test/user-test-utils')
const { testTopicSetup } = require('../../topic/test/topic-test-utils')
const { createFakeArticle, testArticleSetup } = require('./article-test-utils')

const searchTerm = `cool beans`

/**
 * Creates articles that has the search term "cool beans" in all forms
 */
function createMultipleArticles(t) {
    // 📝 About `order` property
    // It is a simple "guessing" game at this point.
    // This will have to verified and perhaps later, we can be
    // more sure about it!
    const overrides = shuffle([
        // not in title or content
        {
            title: 'non important title',
            content: '<p>this will not appear in search results</p>',
        },
        // partial match
        {
            title: 'cool thing',
            content: '<p>content does not have it</p>',
            order: 3,
        },
        // partial match
        {
            title: 'beans',
            content: '<p>Cool is the word and you know it.</p>',
            order: 2,
        },
        // title & content
        {
            title: `important ${searchTerm} title`,
            content: `<p>this will ${searchTerm} appear in search results</p>`,
            order: 0,
        },
        // in content with markup breaking string
        {
            title: `coo important title beans`,
            content: `<p>this will <b>Cool</b> Beans appear in search results</p>`,
            order: 1,
        },
    ])

    return Promise.map(overrides, async ({ order, ...override }) => {
        const article = await createFakeArticle(t.context.users.user1, override)

        if (isNumber(order)) {
            // Create an array of article ids in the right order!
            t.context.expectedIdOrder =
                t.context.expectedIdOrder || new Array(4)
            t.context.expectedIdOrder[order] = article.id
        }
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

test('(200) search query returns expected results', async t => {
    const { expectedIdOrder } = t.context

    const res = await callApiWithQuery(t, { searchTerm: 'cool beans' })

    t.is(res.body.length, expectedIdOrder.length)

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
            'relevanceScore',
        ].sort(),
    )

    t.deepEqual(expectedIdOrder, map(res.body, 'id'))
})
