const Promise = require("bluebird");
const { find, assign, uniq } = require("lodash");
const HttpStatus = require("http-status-codes");

const TopicModel = require("../../models/topicModel");
const ArticleModel = require("../../models/articleModel");

const {
  NO_ACCESS,
  DUPLICATE_TOPIC,
  DELETE_DEFAULT_TOPIC
} = require("../../utils/constants").ERRORS;

const { setupAll, setupEach, teardownAll } = require("../testUtils/globalSetup");

const { tokenHolder } = require("../testUtils/modelHolder");
const { apiClient } = require("../testUtils/testUtils");
const { makeTopics, makeArticlesForTopic } = require("../testUtils/dataGenerators");
const { topic: topicFactory } = require("../factories/factories");

const testUnauthenticatedRequests = require("../sharedBehaviour/testUnauthenticatedRequests");

describe("Topic API Tests", () => {
  beforeAll(setupAll);
  afterAll(teardownAll);
  beforeEach(setupEach);

  const apiUrl = "/api/topics";
  let topics = [];
  let tokens = {};

  beforeAll(() => {
    tokens = tokenHolder.get();
  });

  beforeEach(async () => {
    await makeTopics();

    topics = await TopicModel.query();
  });

  testUnauthenticatedRequests(apiUrl);

  describe("#POST api/topics", () => {
    test("(403) only admin allowed to create topic", () =>
      apiClient
        .post(apiUrl)
        // Using a non-admin for making this token
        .set("x-access-token", tokens.user)
        .send({})
        .expect(HttpStatus.FORBIDDEN)
        .then(res => {
          expect(res.body.message).toBe(NO_ACCESS.message);
        }));

    test("(409) duplicate topic not allowed", () => {
      const duplicateTopic = assign({}, topicFactory.build(), {
        name: topics[0].name
      });

      return apiClient
        .post(apiUrl)
        .set("x-access-token", tokens.admin)
        .send(duplicateTopic)
        .expect(HttpStatus.CONFLICT)
        .then(res => expect(res.body.message).toBe(DUPLICATE_TOPIC.message));
    });

    test("(201) create returns expected fields", async () => {
      const newTopic = topicFactory.build();

      return apiClient
        .post(apiUrl)
        .set("x-access-token", tokens.admin)
        .send(newTopic)
        .expect(HttpStatus.CREATED)
        .then(async res => {
          expect(Object.keys(res.body)).toEqual(
            expect.arrayContaining(["id", "name", "description"])
          );
        });
    });

    test("(201) creates new topic", async () => {
      const newTopic = topicFactory.build();

      return apiClient
        .post(apiUrl)
        .set("x-access-token", tokens.admin)
        .send(newTopic)
        .expect(HttpStatus.CREATED)
        .then(async res => {
          const topic = await TopicModel.query().findById(res.body.id);

          expect(topic).toEqual(
            expect.objectContaining({
              name: newTopic.name,
              description: newTopic.description
            })
          );
        });
    });
  });

  describe("#GET api/topics", () => {
    test("(200) list request returns expected topics", () =>
      Promise.map([tokens.admin, tokens.user], token =>
        apiClient
          .get(apiUrl)
          .set("x-access-token", token)
          .expect(HttpStatus.OK)
          .then(res => {
            expect(res.body).toHaveLength(topics.length);
            res.body.forEach((topic, i) => {
              expect(topic).toEqual(
                expect.objectContaining({
                  name: topics[i].name,
                  description: topics[i].description,
                  id: topics[i].id
                })
              );
            });
          })
      ));
  });

  describe("#GET api/topics/:id", () => {
    test("(403) only admin allowed to fetch specific topic", () =>
      apiClient
        .get(`${apiUrl}/1`)
        // Using a non-admin for making this token
        .set("x-access-token", tokens.user)
        .expect(HttpStatus.FORBIDDEN)
        .then(res => {
          expect(res.body.message).toBe(NO_ACCESS.message);
        }));

    test("(200) request returns expected data", () =>
      apiClient
        .get(`${apiUrl}/1`)
        .set("x-access-token", tokens.admin)
        .expect(HttpStatus.OK)
        .then(res => {
          const topic = find(topics, dbTopic => dbTopic.id === 1);

          expect(res.body).toEqual(
            expect.objectContaining({
              name: topic.name,
              description: topic.description,
              id: topic.id
            })
          );
        }));
  });

  describe("#PUT api/topics/:id", () => {
    test("(403) only admin allowed to update topic", () =>
      apiClient
        .put(`${apiUrl}/1`)
        // Using a non-admin for making this token
        .set("x-access-token", tokens.user)
        .send({})
        .expect(HttpStatus.FORBIDDEN)
        .then(res => {
          expect(res.body.message).toBe(NO_ACCESS.message);
        }));

    test("(409) duplicate topic not allowed", () => {
      const updatedDuplicateTopic = assign({}, topics[0], {
        name: topics[1].name
      });

      return apiClient
        .put(`${apiUrl}/1`)
        .set("x-access-token", tokens.admin)
        .send(updatedDuplicateTopic)
        .expect(HttpStatus.CONFLICT)
        .then(async res => {
          expect(res.body.message).toBe(DUPLICATE_TOPIC.message);
        });
    });

    test("(200) update returns expected fields", () => {
      const updatedTopic = assign({}, topics[0], { name: "new name" });
      return apiClient
        .put(`${apiUrl}/1`)
        .set("x-access-token", tokens.admin)
        .send(updatedTopic)
        .expect(HttpStatus.OK)
        .then(async res => {
          expect(Object.keys(res.body)).toEqual(
            expect.arrayContaining(["id", "name", "description"])
          );
        });
    });

    test("(200) should update topic with provided ID", () => {
      const updatedTopic = assign({}, topics[0], { name: "new name" });
      return apiClient
        .put(`${apiUrl}/1`)
        .set("x-access-token", tokens.admin)
        .send(updatedTopic)
        .expect(HttpStatus.OK)
        .then(async () => {
          const topic = await TopicModel.query().findById(1);
          expect(topic.name).toBe(updatedTopic.name);
        });
    });
  });

  describe("#DELETE api/topics/:id", () => {
    test("(403) only admin allowed to delete topic", () =>
      apiClient
        .delete(`${apiUrl}/1`)
        // Using a non-admin for making this token
        .set("x-access-token", tokens.user)
        .expect(HttpStatus.FORBIDDEN)
        .then(res => {
          expect(res.body.message).toBe(NO_ACCESS.message);
        }));

    test("(405) cannot delete default topics", () =>
      Promise.map([1, 2], id =>
        apiClient
          .delete(`${apiUrl}/${id}`)
          .set("x-access-token", tokens.admin)
          .expect(HttpStatus.METHOD_NOT_ALLOWED)
          .then(res => {
            expect(res.body.message).toBe(DELETE_DEFAULT_TOPIC.message);
          })
      ));

    test("(200) should delete topic with provided ID", () =>
      apiClient
        .delete(`${apiUrl}/3`)
        .set("x-access-token", tokens.admin)
        .expect(HttpStatus.OK)
        .then(async () => {
          const topic = (await TopicModel.knex()
            .table("topic")
            .where("id", 3))[0];
          expect(topic.is_active).toBeFalsy();
        }));

    test('(200) deleting topic should move topic\'s articles to "uncategorized"', async () => {
      const articleIds = (await makeArticlesForTopic(3)).map(a => a.id);

      return apiClient
        .delete(`${apiUrl}/3`)
        .set("x-access-token", tokens.admin)
        .expect(HttpStatus.OK)
        .then(async () => {
          const topicIds = (await ArticleModel.query().findByIds(articleIds)).map(a => a.topic_id);

          expect(uniq(topicIds)).toHaveLength(1);
          expect(uniq(topicIds)[0]).toBe(1);
        });
    });
  });
});
