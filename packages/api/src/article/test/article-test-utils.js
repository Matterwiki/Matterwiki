const test = require('ava')
const Promise = require('bluebird')
const dream = require('dreamjs')
const { pick, keys } = require('lodash')
const { loremIpsum } = require('lorem-ipsum')

const ArticleModel = require('../article-model')
const TopicModel = require('../../topic/topic-model')
const UserModel = require('../../user/user-model')

const { prepareArticleDataForDb } = require('../article-utils')

exports.articleHtmlContent = function articleHtmlContent() {
    return loremIpsum({
        count: 15,
        format: 'html',
        paragraphLowerBound: 3,
        paragraphUpperBound: 7,
        random: Math.random,
        sentenceLowerBound: 5,
        sentenceUpperBound: 15,
        units: 'paragraphs',
    })
}

dream.customType('article-html-content', exports.articleHtmlContent)

dream.customType('article-sentence', helper => {
    // Make a random sentence, with chancejs words
    // This was required because these sentences
    // needed to be within a limit and `chance.sentence`
    // wasnt cutting it.
    return Array.from({ length: 5 }, () =>
        helper.chance.word({ length: 5 }),
    ).join(' ')
})

exports.makeArticleCreatePayload = function makeArticleCreatePayload(
    num = 1,
    topicId = 1,
) {
    return dream
        .schema({
            title: 'article-sentence',
            content: 'article-html-content',
            // Seeded category
            topicId: () => topicId,
        })
        .generateRnd(num)
        .output()
}

exports.makeArticleUpdatePayload = function makeArticleUpdatePayload(
    num = 1,
    topicId = 1,
) {
    return dream
        .schema({
            title: 'article-sentence',
            content: 'article-html-content',
            changeLog: 'article-sentence',
            // Seeded category
            topicId: () => topicId,
        })
        .generateRnd(num)
        .output()
}

exports.createFakeArticle = function createFakeArticle(user, overrides = {}) {
    const data = Object.assign(exports.makeArticleCreatePayload(), overrides)
    return ArticleModel.createArticle(prepareArticleDataForDb(data), user)
}

exports.assertRelatedEntities = async function assertRelatedEntities(
    t,
    payload,
    user,
    responseBody,
) {
    const expectedTopic = await TopicModel.fetchTopics()
        .findById(payload.topicId)
        .modify('liteSelector')

    const expectedUser = await UserModel.fetchUsers()
        .findById(user.id)
        .modify('liteSelector')

    const { topic, createdByUser, modifiedByUser } = responseBody

    t.truthy(topic)
    t.deepEqual(keys(topic).sort(), keys(expectedTopic).sort())
    t.deepEqual(
        pick(topic, ['id', 'name', 'description']),
        pick(expectedTopic, ['id', 'name', 'description']),
    )

    t.truthy(createdByUser)
    t.deepEqual(keys(createdByUser).sort(), keys(expectedUser).sort())
    t.deepEqual(
        pick(createdByUser, ['id', 'name', 'email', 'about']),
        pick(expectedUser, ['id', 'name', 'email', 'about']),
    )
    t.falsy(createdByUser.password)

    t.truthy(modifiedByUser)
    t.deepEqual(keys(modifiedByUser).sort(), keys(expectedUser).sort())
    t.deepEqual(
        pick(modifiedByUser, ['id', 'name', 'email', 'about']),
        pick(expectedUser, ['id', 'name', 'email', 'about']),
    )
    t.falsy(modifiedByUser.password)
}

exports.addArticlesToContext = async function addArticlesToContext(t) {
    t.context.articles = await ArticleModel.fetchArticles()
}

/**
 * Sets up `t.context.articles`
 */
exports.testArticleSetup = function testArticleSetup() {
    test.beforeEach(async t => {
        const { user1, user2, admin } = t.context.users
        const userErrorMessage =
            '`testUserSetup` must be setup before this setup!'

        t.truthy(user1, userErrorMessage)
        t.truthy(user2, userErrorMessage)
        t.truthy(admin, userErrorMessage)

        const [topic1, topic2] = t.context.topics
        const topicErrorMessage =
            '`testUserSetup` must be setup before this setup!'

        t.truthy(topic1, topicErrorMessage)
        t.truthy(topic2, topicErrorMessage)

        const makeArticleForTopic1 = user => {
            return exports.createFakeArticle(user, { topicId: topic1.id })
        }
        const makeArticleForTopic2 = user => {
            return exports.createFakeArticle(user, { topicId: topic2.id })
        }

        const articleCountBeforeCreate = await ArticleModel.fetchArticles().resultSize()

        await Promise.all([
            makeArticleForTopic1(user1),
            makeArticleForTopic2(user1),
            makeArticleForTopic1(user2),
            makeArticleForTopic2(user2),
            makeArticleForTopic1(admin),
            makeArticleForTopic2(admin),
        ])

        await exports.addArticlesToContext(t)

        t.is(t.context.articles.length, articleCountBeforeCreate + 6)
    })
}
