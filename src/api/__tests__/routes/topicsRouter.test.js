const TopicModel = require("../../models/topicModel");
const ArticleModel = require("../../models/articleModel");

const { NO_ACCESS } = require("../../utils/constants").ERRORS;

const {
  setupAll,
  setupEach,
  teardownAll
} = require("../testUtils/globalSetup");

const { userHolder, tokenHolder } = require("../testUtils/modelHolder");
const { factories, apiClient } = require("../testUtils/testUtils");

describe("Topic API Tests", () => {
  beforeAll(setupAll);
  afterAll(teardownAll);
  beforeEach(setupEach);

  const apiUrl = "/api/topics";
  let topics = [];

  let testUsers = {};
  let tokens = {};

  beforeAll(() => {
    testUsers = userHolder.get();
    tokens = tokenHolder.get();
  });

  // TODO bookshelf does not let you bulk insert stuff (without collections)
  // TODO Either change ORM to Objection.js to enable all that or use knex in all this
  beforeEach(() =>
    Promise.all(
      factories.topic
        .build(2)
        .map(topic =>
          TopicModel.post(topic).then(newTopic => newTopic.toJSON())
        )
    ).then(newTopics => {
      topics = newTopics;
    })
  );

  describe("GET api/topics", () => {
    test("200 any - VALID - returns expected topics", () =>
      apiClient
        .get(apiUrl)
        .set("x-access-token", tokens.user)
        .expect(200)
        .then(async res => {
          const dbTopics = (await TopicModel.getAll()).toJSON();

          expect(res.body).toHaveLength(dbTopics.length);
          res.body.forEach((topic, i) => {
            expect(topic).toEqual(
              expect.objectContaining({
                name: dbTopics[i].name,
                description: dbTopics[i].description,
                id: dbTopics[i].id
              })
            );
          });
        }));
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
        .then(async res => {
          const topic = (await TopicModel.get({ id: 1 })).toJSON();

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
    beforeEach(async () => {
      const mockArticle = await factories.article.build();

      return ArticleModel.post(
        Object.assign({}, mockArticle, {
          topic_id: 1,
          user_id: testUsers.users[0].id
        })
      );
    });
    test("200 any - VALID - should fetch articles of topic with provided ID", () =>
      apiClient
        .get(`${apiUrl}/1/articles`)
        .set("x-access-token", tokens.admin)
        .expect(200)
        .then(async res => {
          const articles = (await ArticleModel.getAllArticles({
            topic_id: 1
          })).toJSON();

          expect(res.body).toHaveLength(articles.length);

          res.body.forEach((article, i) =>
            expect(article).toEqual(
              expect.objectContaining({
                title: articles[i].title,
                body: articles[i].body,
                what_changed: articles[i].what_changed,
                id: articles[i].id
              })
            )
          );
        }));
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

    test("201 - VALID - should create new topic", async () => {
      const newTopic = factories.topic.build();

      return apiClient
        .post(apiUrl)
        .set("x-access-token", tokens.admin)
        .send(newTopic)
        .expect(201)
        .then(async res => {
          const topic = (await TopicModel.get({ id: res.body.id })).toJSON();

          expect(topic.id).toEqual(res.body.id);
          expect(res.body).toEqual(
            expect.objectContaining({
              name: topic.name,
              description: topic.description
            })
          );
        });
    });
  });
  describe("PUT api/topics:id", () => {
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

    test("200 - VALID - should update topic with provided ID", () => {
      const updatedTopic = Object.assign({}, topics[0], { name: "new name" });
      return apiClient
        .put(`${apiUrl}/1`)
        .set("x-access-token", tokens.admin)
        .send(updatedTopic)
        .expect(200)
        .then(async res => {
          expect(res.body.id).toBe("1");
          expect(res.body.name).toBe(updatedTopic.name);
        });
    });
  });
  describe("DELETE api/topics/:id", () => {
    test("403 - VALID - only admin allowed to delete topic", () =>
      apiClient
        .delete(`${apiUrl}/1`)
        // Using a non-admin for making this token
        .set("x-access-token", tokens.user)
        .expect(403)
        .then(res => {
          expect(res.body.message).toBe(NO_ACCESS.message);
        }));
    test("200 - VALID - should delete topic with provided ID", () =>
      apiClient
        .delete(`${apiUrl}/1`)
        .set("x-access-token", tokens.admin)
        .expect(200)
        .then(async () => {
          const topic = await TopicModel.get({ id: 1 });
          expect(topic).toBeNull();
        }));
  });
});
