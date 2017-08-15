const Promise = require("bluebird");
const { omit, assign } = require("lodash");

const ArticleHistoryModel = require("../../models/articleHistoryModel");

const {
  setupAll,
  setupEach,
  teardownAll
} = require("../testUtils/globalSetup");

const { userHolder, tokenHolder } = require("../testUtils/modelHolder");
const { apiClient, makeJwt } = require("../testUtils/testUtils");
const {
  makeArticles,
  makeHistoryItems
} = require("../testUtils/dataGenerators");

describe("Article Router tests", () => {
  beforeAll(setupAll);
  afterAll(teardownAll);
  beforeEach(setupEach);

  let apiUrl = "";
  let tokens = {};
  let article = {};
  let historyItems = [];

  beforeAll(() => {
    tokens = tokenHolder.get();
  });

  beforeEach(async () => {
    const stuff = await makeHistoryItems();
    article = stuff.article;
    historyItems = stuff.historyItems;
    apiUrl = `/api/articles/${article.id}/history`;
  });

  describe("GET - article/:id/history", () => {
    test("200 any - VALID - should get history items for a given article", () =>
      Promise.map([tokens.admin, tokens.user], token =>
        apiClient
          .get(apiUrl)
          .set("x-access-token", token)
          .expect(200)
          .then(res => {
            expect(res.body).toHaveLength(historyItems.length);

            res.body.forEach((historyItem, i) =>
              expect(historyItem).toEqual(
                expect.objectContaining({
                  title: historyItems[i].title,
                  change_log: historyItems[i].change_log,
                  content: historyItems[i].content,
                  type: historyItems[i].type,
                  article_id: article.id
                })
              )
            );
          })
      ));
  });

  describe("GET - article/:articleId/history/:id", () => {
    test("200 any - VALID - should get specific history item", () =>
      Promise.map([tokens.admin, tokens.user], token =>
        apiClient
          .get(`${apiUrl}/1`)
          .set("x-access-token", token)
          .expect(200)
          .then(res => {
            expect(res.body.id).toEqual(1);
            expect(res.body).toEqual(
              expect.objectContaining({
                title: historyItems[0].title,
                change_log: historyItems[0].change_log,
                content: historyItems[0].content,
                type: historyItems[0].type,
                article_id: article.id
              })
            );
          })
      ));
  });
});
