const { assign } = require("lodash");
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
      assign({}, topic, {
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

  test("Inserts topic and returns inserted topic", async () => {
    const topicToInsert = assign({}, topicFactory.build(1), {
      created_by_id: userHolder.getAdmin().id,
      modified_by_id: userHolder.getAdmin().id
    });

    const dbTopic = await TopicModel.insert(topicToInsert);

    expect(dbTopic).toBeInstanceOf(TopicModel.Model);
    expect(dbTopic.name).toEqual(topicToInsert.name);
    expect(dbTopic.description).toEqual(topicToInsert.description);
    expect(dbTopic.created_by_id).toEqual(userHolder.getAdmin().id);
    expect(dbTopic.modified_by_id).toEqual(userHolder.getAdmin().id);
    expect(dbTopic.is_active).toBeTruthy();
  });

  test("Inserts array of topics", async () => {
    const topicsToInsert = topicFactory.build(2).map(topic =>
      assign({}, topic, {
        created_by_id: userHolder.getAdmin().id,
        modified_by_id: userHolder.getAdmin().id
      })
    );
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
