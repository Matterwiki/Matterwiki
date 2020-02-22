const dream = require('dreamjs')
const test = require('ava')

const TopicModel = require('../topic-model')

dream.customType('topic-name', helper => helper.chance.word({ length: 10 }))

exports.makeTopicData = function makeTopicData(num = 1) {
    return dream
        .schema({
            name: 'topic-name',
            description: 'sentence',
        })
        .generateRnd(num)
        .output()
}

exports.createFakeTopic = function createFakeTopic(overrides = {}) {
    const data = Object.assign(exports.makeTopicData(), overrides)
    return TopicModel.createTopic(data)
}

exports.addTopicsToContext = async function addTopicsToContext(t) {
    t.context.topics = await TopicModel.fetchTopics()

    t.true(
        t.context.topics.length > 0,
        'Seeded topics not found; Did seeding not happen?',
    )
}

/**
 * Sets up `t.context.topics` with topics from the DB.
 * Ensure this is called after all the mock topics have been created in the DB!
 */
exports.testTopicSetup = async function testTopicSetup() {
    test.beforeEach(exports.addTopicsToContext)
}
