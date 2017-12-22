const { assign } = require("lodash");
const HttpStatus = require("http-status-codes");

const { setupAll, setupEach, teardownAll } = require("../testUtils/globalSetup");

const { tokenHolder, userHolder } = require("../testUtils/modelHolder");
const { apiClient } = require("../testUtils/testUtils");
const { makeHistoryItemsForArticle } = require("../testUtils/dataGenerators");

const ArticleModel = require("../../models/articleModel");
const ArticleHistoryModel = require("../../models/articleHistoryModel");

const articleFactory = require("../factories/articleFactory");

describe("Article History Router tests", () => {
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
    const { id: adminId } = userHolder.getAdmin();
    const newArticle = assign({}, articleFactory.build(), {
      topic_id: 1,
      created_by_id: adminId,
      modified_by_id: adminId
    });
    article = await ArticleModel.query().insertAndFetch(newArticle);
    apiUrl = `/api/articles/${article.id}/history`;

    historyItems = await makeHistoryItemsForArticle(article);
  });

  // TODO
  // testUnauthenticatedRequests(apiUrl);

  describe("#GET article/:id/history", () => {
    test("(200) should get history items for a given article", () =>
      apiClient
        .get(apiUrl)
        .set("x-access-token", tokens.user)
        .expect(HttpStatus.OK)
        .then(res => {
          expect(res.body).toHaveLength(historyItems.length);

          res.body.forEach((historyItem, i) =>
            expect(historyItem).toEqual(
              expect.objectContaining({
                title: historyItems[i].title,
                change_log: historyItems[i].change_log,
                content: historyItems[i].content,
                type: historyItems[i].type,
                article_id: article.id,
                topic_id: article.topic_id,
                created_by_id: article.created_by_id,
                modified_by_id: article.modified_by_id
              })
            )
          );
        }));

    test("(200) returns modifiedByUser, topic and createdByUser relations with each history item", () =>
      apiClient
        .get(apiUrl)
        .set("x-access-token", tokens.user)
        .expect(HttpStatus.OK)
        .then(res => {
          expect(res.body).toHaveLength(historyItems.length);

          res.body.forEach(async historyItem => {
            expect(historyItem.topic).toBeDefined();
            expect(historyItem.createdByUser).toBeDefined();
            expect(historyItem.modifiedByUser).toBeDefined();
          });
        }));

    test("(200) sorts list by last modified date", async () => {
      const date = new Date();

      date.setFullYear(1980, 1, 12);
      await ArticleHistoryModel.query()
        .patch({
          updated_at: date
        })
        // The "CREATE" type history item
        .where({ id: historyItems[0].id });

      date.setFullYear(1995, 3, 17);
      await ArticleHistoryModel.query()
        .patch({
          updated_at: date
        })
        // One of the "UPDATE" type history items
        .where({ id: historyItems[2].id });

      return apiClient
        .get(apiUrl)
        .set("x-access-token", tokens.user)
        .expect(HttpStatus.OK)
        .then(res => {
          expect(res.body).toHaveLength(historyItems.length);

          expect(res.body[historyItems.length - 1].id).toEqual(historyItems[0].id);
          expect(res.body[historyItems.length - 2].id).toEqual(historyItems[2].id);
        });
    });
  });

  describe("#GET - article/:articleId/history/:id", () => {
    test("(200) should get specific history item", () =>
      apiClient
        .get(`${apiUrl}/1`)
        .set("x-access-token", tokenHolder.getUserToken())
        .expect(200)
        .then(res => {
          expect(res.body.id).toEqual(1);

          const historyItem = historyItems.find(h => h.id === 1);

          expect(res.body).toEqual(
            expect.objectContaining({
              title: historyItem.title,
              change_log: historyItem.change_log,
              content: historyItem.content,
              type: historyItem.type,
              article_id: article.id,
              topic_id: article.topic_id,
              created_by_id: article.created_by_id,
              modified_by_id: article.modified_by_id
            })
          );
        }));

    test("(200) returns modifiedByUser, topic and createdByUser relations", () =>
      apiClient
        .get(`${apiUrl}/2`)
        .set("x-access-token", tokenHolder.getUserToken())
        .expect(200)
        .then(res => {
          expect(res.body.id).toEqual(2);

          expect(res.body.topic).toBeDefined();
          expect(res.body.createdByUser).toBeDefined();
          expect(res.body.modifiedByUser).toBeDefined();
        }));
  });
});
