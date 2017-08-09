const { knexInstance: knex } = require("../../utils/db");
const {
  setupAll,
  setupEach,
  teardownAll
} = require("../testUtils/globalSetup");

const { userHolder } = require("../testUtils/modelHolder");

const { topic: topicFactory } = require("../factories/factories");

const TopicModel = require("../../models/topicModel");

describe("Topic model tests", () => {
  let dbTopics = null;

  beforeAll(setupAll);
  afterAll(teardownAll);

  beforeEach(setupEach);
  beforeEach(() => {
    const newTopics = topicFactory.build(3).map(topic =>
      Object.assign({}, topic, {
        created_by_id: userHolder.getAdmin().id,
        modified_by_id: userHolder.getAdmin().id
      })
    );

    return knex("topic")
      .insert(newTopics)
      .then(() => knex("topic").select())
      .then(topics => {
        dbTopics = topics;
      });
  });

  test("Gets topic by ID", async () => {
    const expectedTopic = dbTopics[0];
    const dbTopic = await TopicModel.get(expectedTopic.id);

    expect(dbTopic).toEqual(expectedTopic);
  });

  test("Gets all topics", async () => {
    const expectedTopics = dbTopics;
    const allDbTopics = await TopicModel.getAll();

    allDbTopics.forEach((dbTopic, i) => {
      expect(dbTopic).toEqual(expectedTopics[i]);
    });
  });
});
