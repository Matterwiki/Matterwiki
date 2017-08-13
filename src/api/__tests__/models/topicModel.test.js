const { assign } = require("lodash");
const Promise = require("bluebird");

const { knexInstance: knex } = require("../../utils/db");
const {
  setupAll,
  setupEach,
  teardownAll
} = require("../testUtils/globalSetup");

const { userHolder } = require("../testUtils/modelHolder");
const { makeTopics, makeArticles } = require("../testUtils/dataGenerators");

const { topic: topicFactory } = require("../factories/factories");

const TopicModel = require("../../models/topicModel");

describe("Topic model tests", () => {
  let dbTopics = null;

  beforeAll(setupAll);
  afterAll(teardownAll);

  beforeEach(setupEach);
  beforeEach(() => makeTopics().then(topics => (dbTopics = topics)));

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

  describe("Relation queries", () => {
    let dbArticles = [];

    beforeEach(() =>
      makeArticles(dbTopics[0].id).then(articles => (dbArticles = articles))
    );

    test("Gets topic by ID with articles", async () => {
      const expectedTopic = dbTopics[0];

      const articles = await Promise.map(dbArticles, async article => {
        const [modifiedUser] = await knex("user").where(
          "id",
          article.modified_by_id
        );

        return assign({}, article, { modifiedUser });
      });

      expectedTopic.article = articles;

      const dbTopic = await TopicModel.getWithRels(expectedTopic.id);

      expect(dbTopic).toEqual(expectedTopic);
    });
  });

  test("Inserts topic and returns inserted topic", async () => {
    const topicToInsert = topicFactory.build(1);

    const dbTopic = await TopicModel.insert(topicToInsert);

    expect(dbTopic).toBeInstanceOf(TopicModel.Model);
    expect(dbTopic.name).toEqual(topicToInsert.name);
    expect(dbTopic.description).toEqual(topicToInsert.description);
    expect(dbTopic.is_active).toBeTruthy();
  });

  test("Inserts array of topics", async () => {
    const topicsToInsert = topicFactory.build(2);
    const insertedDbTopics = await TopicModel.insertMany(topicsToInsert);

    insertedDbTopics.forEach((dbTopic, i) => {
      expect(dbTopic).toBeInstanceOf(TopicModel.Model);
      expect(dbTopic.name).toEqual(topicsToInsert[i].name);
      expect(dbTopic.description).toEqual(topicsToInsert[i].description);
      expect(dbTopic.is_active).toBeTruthy();
    });
  });

  test("Updates topic by ID", async () => {
    const { id } = dbTopics[0];

    const updatedDbTopic = await TopicModel.update(id, { name: "New name" });

    expect(updatedDbTopic.name).toEqual("New name");

    // rest of the props did not change
    expect(updatedDbTopic.email).toEqual(dbTopics[0].email);
    expect(updatedDbTopic.role).toEqual(dbTopics[0].role);
    expect(updatedDbTopic.is_active).toBeTruthy();
  });

  test("Soft-deletes topic by ID (sets to inactive)", async () => {
    const { id } = dbTopics[1];

    await TopicModel.delete(id);

    const deletedDbTopic = await knex("topic").where("id", id);

    expect(deletedDbTopic.is_active).toBeFalsy();
  });

  test("Gets only active topics", async () => {
    const { id } = dbTopics[0];

    await TopicModel.delete(id);

    const filteredDbTopics = await TopicModel.getAll();

    expect(filteredDbTopics.map(topic => topic.id)).not.toContain(id);
  });

  test("Gets inactive topic if `is_active` param is passed in", async () => {
    const { id } = dbTopics[0];

    await TopicModel.delete(id);

    const filteredDbTopics = await TopicModel.getAll({ is_active: false });

    expect(filteredDbTopics.map(topic => topic.id)).toContain(id);
  });
});
