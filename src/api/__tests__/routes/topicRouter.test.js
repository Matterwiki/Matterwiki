const Promise = require("bluebird");
const { find, assign, uniq } = require("lodash");

const TopicModel = require("../../models/topicModel");
const ArticleModel = require("../../models/articleModel");

const {
  NO_ACCESS,
  DUPLICATE_TOPIC,
  DELETE_DEFAULT_TOPIC
} = require("../../utils/constants").ERRORS;

const {
  setupAll,
  setupEach,
  teardownAll
} = require("../testUtils/globalSetup");

const { userHolder, tokenHolder } = require("../testUtils/modelHolder");
const { apiClient } = require("../testUtils/testUtils");
const { makeTopics, makeArticles } = require("../testUtils/dataGenerators");
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

  beforeEach(async () => (topics = await makeTopics()));

  testUnauthenticatedRequests(apiUrl);

  describe("GET api/topics", () => {
    test(`200 - any - VALID - returns expected topics`, () =>
      Promise.map([tokens.admin, tokens.user], token =>
        apiClient
          .get(apiUrl)
          .set("x-access-token", token)
          .expect(200)
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

  describe("GET api/topics/:id", () => {
    test("403 user - INVALID - only admin allowed to fetch specific topic", () =>
      apiClient
        .get(`${apiUrl}/1`)
        // Using a non-admin for making this token
        .set("x-access-token", tokens.user)
        .expect(403)
        .then(res => {
          expect(res.body.message).toBe(NO_ACCESS.message);
        }));

    test("200 admin - VALID - returns expected data", () =>
      apiClient
        .get(`${apiUrl}/1`)
        .set("x-access-token", tokens.admin)
        .expect(200)
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

  describe("GET api/:topicId/:articleId", () => {
    let articles = [];

    beforeEach(
      async () => (articles = await makeArticles(1, userHolder.getAdmin().id))
    );

    test("200 any - VALID - should fetch articles of topic with provided ID", () =>
      Promise.map([tokens.admin, tokens.user], token =>
        apiClient
          .get(`${apiUrl}/1/articles`)
          .set("x-access-token", token)
          .expect(200)
          .then(res => {
            expect(res.body.article).toHaveLength(articles.length);
            expect(res.body.id).toEqual(1);

            res.body.article.forEach((relatedArticle, i) =>
              expect(relatedArticle).toEqual(
                expect.objectContaining({
                  title: articles[i].title,
                  content: articles[i].content,
                  change_log: articles[i].change_log,
                  id: articles[i].id,
                  modified_by_id: userHolder.getAdmin().id
                })
              )
            );
          })
      ));
  });

  describe("POST api/topics", () => {
    test("403 - INVALID - only admin allowed to create topic", () =>
      apiClient
        .post(apiUrl)
        // Using a non-admin for making this token
        .set("x-access-token", tokens.user)
        .send({})
        .expect(403)
        .then(res => {
          expect(res.body.message).toBe(NO_ACCESS.message);
        }));

    test("409 - INVALID - duplicate topic not allowed", () => {
      const duplicateTopic = assign({}, topicFactory.build(), {
        name: topics[0].name
      });

      return apiClient
        .post(apiUrl)
        .set("x-access-token", tokens.admin)
        .send(duplicateTopic)
        .expect(409)
        .then(async res => {
          expect(res.body.message).toBe(DUPLICATE_TOPIC.message);
        });
    });

    test("201 - VALID - should create new topic", async () => {
      const newTopic = topicFactory.build();

      return apiClient
        .post(apiUrl)
        .set("x-access-token", tokens.admin)
        .send(newTopic)
        .expect(201)
        .then(async res => {
          const topic = await TopicModel.get(res.body.id);

          expect(topic.id).toEqual(res.body.id);
          expect(res.body).toEqual(
            expect.objectContaining({
              name: newTopic.name,
              description: newTopic.description
            })
          );
        });
    });
  });

  describe("PUT api/topics/:id", () => {
    test("403 - INVALID - only admin allowed to update topic", () =>
      apiClient
        .put(`${apiUrl}/1`)
        // Using a non-admin for making this token
        .set("x-access-token", tokens.user)
        .send({})
        .expect(403)
        .then(res => {
          expect(res.body.message).toBe(NO_ACCESS.message);
        }));

    test("409 - INVALID - duplicate topic not allowed", () => {
      const updatedDuplicateTopic = assign({}, topics[0], {
        name: topics[1].name
      });

      return apiClient
        .put(`${apiUrl}/1`)
        .set("x-access-token", tokens.admin)
        .send(updatedDuplicateTopic)
        .expect(409)
        .then(async res => {
          expect(res.body.message).toBe(DUPLICATE_TOPIC.message);
        });
    });

    test("200 - VALID - should update topic with provided ID", () => {
      const updatedTopic = assign({}, topics[0], { name: "new name" });
      return apiClient
        .put(`${apiUrl}/1`)
        .set("x-access-token", tokens.admin)
        .send(updatedTopic)
        .expect(200)
        .then(async res => {
          expect(res.body.id).toBe(1);
          expect(res.body.name).toBe(updatedTopic.name);
        });
    });
  });

  describe("DELETE api/topics/:id", () => {
    test("403 - INVALID - only admin allowed to delete topic", () =>
      apiClient
        .delete(`${apiUrl}/1`)
        // Using a non-admin for making this token
        .set("x-access-token", tokens.user)
        .expect(403)
        .then(res => {
          expect(res.body.message).toBe(NO_ACCESS.message);
        }));

    test("405 - INVALID - cannot delete default topics", () =>
      Promise.map([1, 2], id =>
        apiClient
          .delete(`${apiUrl}/${id}`)
          .set("x-access-token", tokens.admin)
          .expect(405)
          .then(res => {
            expect(res.body.message).toBe(DELETE_DEFAULT_TOPIC.message);
          })
      ));

    test("200 - VALID - should delete topic with provided ID", () =>
      apiClient
        .delete(`${apiUrl}/3`)
        .set("x-access-token", tokens.admin)
        .expect(200)
        .then(async () => {
          const topic = await TopicModel.get(3);
          expect(topic.is_active).toBeFalsy();
        }));

    test(`200 - VALID - deleting topic should move topic's articles to "uncategorized"`, async () => {
      const topicId = 3;

      // make articles to a topic first (topicId: 3)
      const articles = await makeArticles(topicId);

      // article IDs that belong to topicId: 3
      const articleIds = articles.map(article => article.id);

      return apiClient
        .delete(`${apiUrl}/${topicId}`)
        .set("x-access-token", tokens.admin)
        .expect(200)
        .then(async () => {
          // ensure that topic is deleted
          const topic = await TopicModel.get(3);
          expect(topic.is_active).toBeFalsy();

          // ensure that articles have been moved to topicId: 1; uncategorized
          // inefficient, but its just a test :/
          const topicIds = await Promise.map(articleIds, articleId =>
            ArticleModel.get(articleId).then(a => a.topic_id)
          );

          // all topicIds are same
          expect(uniq(topicIds)).toHaveLength(1);
          expect(topicIds[0]).toEqual(1);
        });
    });
  });
});
