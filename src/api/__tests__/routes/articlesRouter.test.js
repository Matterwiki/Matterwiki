const Promise = require("bluebird");
const ArticleModel = require("../../models/articleModel");

const {
  setupAll,
  setupEach,
  teardownAll
} = require("../testUtils/globalSetup");

const { userHolder, tokenHolder } = require("../testUtils/modelHolder");
const { factories, apiClient } = require("../testUtils/testUtils");

describe("Articles API tests", () => {
  beforeAll(setupAll);
  afterAll(teardownAll);
  beforeEach(setupEach);

  const apiUrl = "/api/articles";
  const articles = [];

  let testUsers = {};
  let tokens = {};

  beforeAll(() => {
    testUsers = userHolder.get();
    tokens = tokenHolder.get();
  });

  beforeEach(() =>
    Promise.map(factories.article.build(2), article =>
      ArticleModel.post(article)
    )
  );

  describe("GET api/articles", () => {
    test("200 any - VALID - returns expected articles", () =>
      apiClient
        .get(apiUrl)
        .set("x-access-token", tokens.user)
        .expect(200)
        .then(async res => {
          const dbArticles = (await ArticleModel.getAll()).toJSON();
          expect(res.body).toHaveLength(dbArticles.length);
          res.body.forEach((article, i) => {
            expect(article).toEqual(
              expect.objectContaining({
                title: dbArticles[i].title,
                body: dbArticles[i].body,
                what_changed: dbArticles[i].what_changed
              })
            );
          });
        }));

    test("200 any - VALID - orders returned articles by last updated date", () =>
      apiClient
        .get(apiUrl)
        .set("x-access-token", tokens.user)
        .expect(200)
        .then(async res => {
          const dbArticles = (await ArticleModel.getAll()).toJSON();
          expect(res.body).toHaveLength(dbArticles.length);
          res.body.forEach((article, i) => {
            expect(article).toEqual(
              expect.objectContaining({
                title: dbArticles[i].title,
                body: dbArticles[i].body,
                what_changed: dbArticles[i].what_changed
              })
            );
          });
        }));
  });

  describe("GET api/articles/:id", () => {
    test("200 any - VALID - returns expected data");
  });

  describe("POST api/topics", () => {
    test("403 - INVALID - only admin allowed to create topic");
    test("201 - VALID - should create new topic");
  });
  describe("PUT api/topics:id", () => {
    test("403 - INVALID - only admin allowed to update topic");
    test("200 - VALID - should update topic with provided ID");
  });
  describe("DELETE api/topics/:id", () => {
    test("403 - VALID - only admin allowed to delete topic");
    test("200 - VALID - should delete topic with provided ID");
  });
});
