const Promise = require("bluebird");
const { omit, assign } = require("lodash");

const ArticleModel = require("../../models/articleModel");
const ArticleHistoryModel = require("../../models/articleHistoryModel");

const {
  setupAll,
  setupEach,
  teardownAll
} = require("../testUtils/globalSetup");

const { userHolder, tokenHolder } = require("../testUtils/modelHolder");
const { apiClient, makeJwt } = require("../testUtils/testUtils");
const { article: articleFactory } = require("../factories/factories");
const { makeArticles } = require("../testUtils/dataGenerators");

const testUnauthenticatedRequests = require("../sharedBehaviour/testUnauthenticatedRequests");

const {
  ARTICLE_HISTORY_TYPES,
  DEFAULT_CHANGELOG_MESSAGE,
  ERRORS
} = require("../../utils/constants");

describe("Articles API tests", () => {
  beforeAll(setupAll);
  afterAll(teardownAll);
  beforeEach(setupEach);

  const ignoredFields = ["created_at", "updated_at"];
  const apiUrl = "/api/articles";

  let articles = [];
  let testUsers = {};
  let tokens = {};

  beforeAll(() => {
    testUsers = userHolder.get();
    tokens = tokenHolder.get();
  });

  beforeEach(() =>
    makeArticles(1, testUsers.users[0].id)
      .then(() => makeArticles(2))
      .then(response => {
        articles = response;
      })
  );

  testUnauthenticatedRequests(apiUrl);

  describe("GET api/articles", () => {
    test("200 any - VALID - returns expected articles", () =>
      Promise.map([tokens.admin, tokens.user], token =>
        apiClient
          .get(apiUrl)
          .set("x-access-token", token)
          .expect(200)
          .then(res => {
            expect(res.body).toHaveLength(articles.length);

            res.body.forEach((article, i) =>
              expect(article).toEqual(
                expect.objectContaining({
                  title: articles[i].title,
                  change_log: articles[i].change_log,
                  content: articles[i].content
                })
              )
            );
          })
      ));

    test("200 any - VALID - returns related user and topic with articles", () =>
      Promise.map([tokens.admin, tokens.user], token =>
        apiClient
          .get(apiUrl)
          .set("x-access-token", token)
          .expect(200)
          .then(async res => {
            const articlesWithRels = await ArticleModel.getAllWithRels();

            expect(res.body).toHaveLength(articlesWithRels.length);

            res.body.forEach((article, i) => {
              expect(omit(article.createdUser, ignoredFields)).toEqual(
                omit(articlesWithRels[i].createdUser, ignoredFields)
              );

              expect(omit(article.topic, ignoredFields)).toEqual(
                omit(articlesWithRels[i].topic, ignoredFields)
              );
            });
          })
      ));
  });

  describe("GET api/articles/:id", () => {
    test("200 any - VALID - returns expected data", () =>
      Promise.map([tokens.admin, tokens.user], token =>
        apiClient
          .get(`${apiUrl}/1`)
          .set("x-access-token", token)
          .expect(200)
          .then(res => {
            expect(res.body).toEqual(
              expect.objectContaining({
                title: articles[0].title,
                change_log: articles[0].change_log,
                content: articles[0].content
              })
            );
          })
      ));

    test("200 any - VALID - returns expected user and topic with article", () =>
      Promise.map([tokens.admin, tokens.user], token =>
        apiClient
          .get(`${apiUrl}/1`)
          .set("x-access-token", token)
          .expect(200)
          .then(async res => {
            const articlesWithRel = await ArticleModel.getWithRels(1);

            expect(omit(res.body.createdUser, ignoredFields)).toEqual(
              omit(articlesWithRel.createdUser, ignoredFields)
            );
            expect(omit(res.body.topic, ignoredFields)).toEqual(
              omit(articlesWithRel.topic, ignoredFields)
            );
          })
      ));
  });

  describe("POST api/topics", () => {
    test("201 any - VALID - should create new article", () =>
      Promise.map([tokens.admin, tokens.user], token => {
        const newArticle = assign({}, articleFactory.build(), {
          topic_id: 1
        });
        return apiClient
          .post(apiUrl)
          .send(newArticle)
          .set("x-access-token", token)
          .expect(201)
          .then(res => {
            expect(res.body).toEqual(
              expect.objectContaining({
                title: newArticle.title,
                content: newArticle.content,
                change_log: DEFAULT_CHANGELOG_MESSAGE
              })
            );
          });
      }));

    test("201 any - VALID - `created_by` and `modified_by` fields are set correctly", () =>
      Promise.map([testUsers.admin, testUsers.users[0]], user => {
        const newArticle = assign(articleFactory.build(), { topic_id: 1 });
        const token = makeJwt(user);
        return apiClient
          .post(apiUrl)
          .send(newArticle)
          .set("x-access-token", token)
          .expect(201)
          .then(res => {
            expect(res.body.created_by_id).toEqual(user.id);
            expect(res.body.modified_by_id).toEqual(user.id);
          });
      }));

    test("201 any - VALID - creating article creates history item", () =>
      Promise.map([tokens.user, tokens.admin], token => {
        const newArticle = assign(articleFactory.build(), { topic_id: 1 });
        return apiClient
          .post(apiUrl)
          .send(newArticle)
          .set("x-access-token", token)
          .expect(201)
          .then(async res => {
            const historyItems = await ArticleHistoryModel.getAll({
              article_id: res.body.id
            });

            expect(historyItems).toHaveLength(1);
            expect(historyItems[0].type).toEqual(ARTICLE_HISTORY_TYPES.CREATE);

            expect(historyItems[0]).toEqual(
              expect.objectContaining({
                title: newArticle.title,
                content: newArticle.content,
                change_log: DEFAULT_CHANGELOG_MESSAGE
              })
            );
          });
      }));
  });

  describe("PUT api/topics:id", () => {
    test("200 any - VALID - should update article with provided ID", () =>
      Promise.map([tokens.admin, tokens.user], token => {
        const articleToUpdate = articles[3];
        const updatedArticle = assign({}, articleToUpdate, {
          title: "New title"
        });
        return apiClient
          .put(`${apiUrl}/${articleToUpdate.id}`)
          .send(updatedArticle)
          .set("x-access-token", token)
          .expect(200)
          .then(res => {
            expect(res.body).toEqual(
              expect.objectContaining({
                title: updatedArticle.title,
                content: updatedArticle.content,
                change_log: updatedArticle.change_log
              })
            );
          });
      }));
    test("200 any - VALID - `modified_by` field is set correctly", () => {
      // this article was made by a user; check `beforeEach` block at the top of this file
      const articleToUpdate = articles[0];
      const updatedArticle = assign({}, articleToUpdate, {
        title: "New title"
      });
      return (
        apiClient
          .put(`${apiUrl}/${articleToUpdate.id}`)
          .send(updatedArticle)
          // using an admin token to update this
          .set("x-access-token", makeJwt(testUsers.admin))
          .expect(200)
          .then(res => {
            // created user should not change
            expect(res.body.created_by_id).toEqual(testUsers.users[0].id);
            // `modified_by` user should change to admin user
            expect(res.body.modified_by_id).toEqual(testUsers.admin.id);
          })
      );
    });
    test("200 user - VALID - `modified_by` field is set correctly", () => {
      // this article was made by an admin; check `beforeEach` block at the top of this file
      const articleToUpdate = articles[3];
      const updatedArticle = assign({}, articleToUpdate, {
        title: "New title"
      });
      return (
        apiClient
          .put(`${apiUrl}/${articleToUpdate.id}`)
          .send(updatedArticle)
          // using a user token to update this
          .set("x-access-token", makeJwt(testUsers.users[0]))
          .expect(200)
          .then(res => {
            // created user should not change
            expect(res.body.created_by_id).toEqual(testUsers.admin.id);
            // `modified_by` user should change to user.. user
            expect(res.body.modified_by_id).toEqual(testUsers.users[0].id);
          })
      );
    });
    test("201 admin - VALID - updating article creates history item", () => {
      const articleToUpdate = articles[3];
      const updatedArticle = assign({}, articleToUpdate, {
        title: "New title"
      });
      return apiClient
        .put(`${apiUrl}/${articleToUpdate.id}`)
        .send(updatedArticle)
        .set("x-access-token", tokens.admin)
        .expect(200)
        .then(async res => {
          const historyItems = await ArticleHistoryModel.getAll({
            article_id: res.body.id
          });

          expect(historyItems).toHaveLength(1);
          expect(historyItems[0].type).toEqual(ARTICLE_HISTORY_TYPES.UPDATE);

          expect(historyItems[0]).toEqual(
            expect.objectContaining({
              title: updatedArticle.title,
              content: updatedArticle.content,
              change_log: updatedArticle.change_log
            })
          );
        });
    });

    test("201 user - VALID - updating article creates history item", () => {
      const articleToUpdate = articles[3];
      const updatedArticle = assign({}, articleToUpdate, {
        title: "New title"
      });
      return apiClient
        .put(`${apiUrl}/${articleToUpdate.id}`)
        .send(updatedArticle)
        .set("x-access-token", tokens.admin)
        .expect(200)
        .then(async res => {
          const historyItems = await ArticleHistoryModel.getAll({
            article_id: res.body.id
          });

          expect(historyItems).toHaveLength(1);
          expect(historyItems[0].type).toEqual(ARTICLE_HISTORY_TYPES.UPDATE);

          expect(historyItems[0]).toEqual(
            expect.objectContaining({
              title: updatedArticle.title,
              content: updatedArticle.content,
              change_log: updatedArticle.change_log
            })
          );
        });
    });
  });

  describe("DELETE api/topics/:id", () => {
    test("403 user - INVALID - only admin allowed to delete article", () =>
      apiClient
        .delete(`${apiUrl}/1`)
        // Using a non-admin for making this token
        .set("x-access-token", tokens.user)
        .expect(403)
        .then(res => {
          expect(res.body.message).toBe(ERRORS.NO_ACCESS.message);
        }));

    test("200 admin - VALID - should delete article with provided ID", () =>
      apiClient
        .delete(`${apiUrl}/1`)
        .set("x-access-token", tokens.admin)
        .expect(200)
        .then(async res => {
          const article = await ArticleModel.get(1);
          expect(article.is_active).toBeFalsy();
        }));

    test("200 admin - VALID - deleting article creates history item", () =>
      apiClient
        .delete(`${apiUrl}/1`)
        .set("x-access-token", tokens.admin)
        .expect(200)
        .then(async res => {
          const historyItems = await ArticleHistoryModel.getAll({
            article_id: 1
          });

          expect(historyItems).toHaveLength(1);
          expect(historyItems[0].type).toEqual(ARTICLE_HISTORY_TYPES.DELETE);
        }));
  });
});
