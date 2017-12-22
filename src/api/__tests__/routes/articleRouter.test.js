const { assign, flatten, pick } = require("lodash");
const HttpStatus = require("http-status-codes");
const Promise = require("bluebird");

const { apiClient } = require("../testUtils/testUtils");
const { article: articleFactory } = require("../factories/factories");
const { makeArticlesForTopic } = require("../testUtils/dataGenerators");

const { setupAll, setupEach, teardownAll } = require("../testUtils/globalSetup");
const { userHolder, tokenHolder } = require("../testUtils/modelHolder");
const testUnauthenticatedRequests = require("../sharedBehaviour/testUnauthenticatedRequests");

const {
  DEFAULT_CHANGELOG_MESSAGE,
  ERRORS,
  ARTICLE_HISTORY_TYPES
} = require("../../utils/constants");

const ArticleModel = require("../../models/articleModel");
const ArticleHistoryModel = require("../../models/articleHistoryModel");

describe("Article API tests", () => {
  const apiUrl = "/api/articles";

  let articles = [];

  beforeAll(setupAll);
  afterAll(teardownAll);
  beforeEach(() =>
    setupEach().then(async () => {
      const { id: userId } = userHolder.getUsers()[0];
      const { id: adminId } = userHolder.getAdmin();
      articles = flatten(
        await Promise.all([makeArticlesForTopic(1, userId), makeArticlesForTopic(2, adminId)])
      );
    })
  );

  let tokens = {};

  const buildArticle = (extras = {}) => assign({}, articleFactory.build(), { topic_id: 1 }, extras);

  beforeAll(() => {
    tokens = tokenHolder.get();
  });

  testUnauthenticatedRequests(apiUrl);

  describe("#POST /api/articles", () => {
    test("(400) invalid if article does not have title", () =>
      Promise.map([null, "", undefined], falsyValue => {
        const newArticle = buildArticle({ title: falsyValue });

        return apiClient
          .post(apiUrl)
          .send(newArticle)
          .set("x-access-token", tokens.user)
          .expect(HttpStatus.BAD_REQUEST)
          .then(res => expect(res.body.message).toEqual(ERRORS.BAD_ARTICLE_CREATE.message));
      }));

    test("(400) invalid if article does not have body", () =>
      Promise.map([null, "", undefined], falsyValue => {
        const newArticle = buildArticle({ content: falsyValue });

        return apiClient
          .post(apiUrl)
          .send(newArticle)
          .set("x-access-token", tokens.user)
          .expect(HttpStatus.BAD_REQUEST)
          .then(res => expect(res.body.message).toEqual(ERRORS.BAD_ARTICLE_CREATE.message));
      }));

    test("(400) invalid if article does not have topic", () =>
      Promise.map([null, "", undefined], falsyValue => {
        const newArticle = buildArticle({ topic_id: falsyValue });

        return apiClient
          .post(apiUrl)
          .send(newArticle)
          .set("x-access-token", tokens.user)
          .expect(HttpStatus.BAD_REQUEST)
          .then(res => expect(res.body.message).toEqual(ERRORS.BAD_ARTICLE_CREATE.message));
      }));

    test.skip("(400) invalid if nonexistent topicId");

    test("(201) should create article with expected fields", () => {
      const newArticle = buildArticle();

      return apiClient
        .post(apiUrl)
        .send(newArticle)
        .set("x-access-token", tokens.user)
        .expect(HttpStatus.CREATED)
        .then(async res => {
          expect(res.body.id).toBeDefined();

          const dbCreatedArticle = await ArticleModel.query().findById(res.body.id);

          expect(dbCreatedArticle).toBeDefined();

          expect(dbCreatedArticle.is_active).toBeTruthy();

          expect(dbCreatedArticle.title).toEqual(newArticle.title);
          expect(dbCreatedArticle.content).toEqual(newArticle.content);
          expect(dbCreatedArticle.change_log).toEqual(DEFAULT_CHANGELOG_MESSAGE);
        });
    });

    test("(201) create should return expected fields", () => {
      const newArticle = buildArticle();

      return apiClient
        .post(apiUrl)
        .send(newArticle)
        .set("x-access-token", tokens.user)
        .expect(HttpStatus.CREATED)
        .then(async res => {
          expect(res.body.id).toBeDefined();
          expect(res.body.is_active).toBeTruthy();
          expect(res.body.title).toEqual(newArticle.title);
          expect(res.body.content).toEqual(newArticle.content);
          expect(res.body.change_log).toEqual(DEFAULT_CHANGELOG_MESSAGE);
        });
    });

    test("(201) create should set createdByUser, modifiedByUser correctly", () => {
      const newArticle = buildArticle();

      return apiClient
        .post(apiUrl)
        .send(newArticle)
        .set("x-access-token", tokens.admin)
        .expect(HttpStatus.CREATED)
        .then(async res => {
          expect(res.body.id).toBeDefined();

          const dbCreatedArticle = await ArticleModel.query().findById(res.body.id);

          expect(dbCreatedArticle).toBeDefined();

          expect(dbCreatedArticle.modified_by_id).toBe(userHolder.getAdmin().id);
          expect(dbCreatedArticle.created_by_id).toBe(userHolder.getAdmin().id);
        });
    });

    test("(201) create should return createdByUser, modifiedByUser and topic relations", () => {
      const newArticle = buildArticle();

      return apiClient
        .post(apiUrl)
        .send(newArticle)
        .set("x-access-token", tokens.admin)
        .expect(HttpStatus.CREATED)
        .then(async res => {
          expect(res.body.id).toBeDefined();
          expect(res.body.createdByUser).toBeDefined();
          expect(res.body.modifiedByUser).toBeDefined();
          expect(res.body.topic).toBeDefined();

          expect(res.body.createdByUser).toEqual(
            expect.objectContaining(pick(userHolder.getAdmin(), ["name", "email", "about"]))
          );
          expect(res.body.createdByUser.password).toBeUndefined();

          expect(res.body.modifiedByUser).toEqual(
            expect.objectContaining(pick(userHolder.getAdmin(), ["name", "email", "about"]))
          );
          expect(res.body.modifiedByUser.password).toBeUndefined();

          expect(res.body.topic).toEqual(expect.objectContaining({ name: "uncategorised" }));
        });
    });

    test("(201) should make a history item for the article", () => {
      const newArticle = buildArticle();

      return apiClient
        .post(apiUrl)
        .send(newArticle)
        .set("x-access-token", tokens.admin)
        .expect(HttpStatus.CREATED)
        .then(async res => {
          const historyItem = (await ArticleHistoryModel.query().where({
            article_id: res.body.id
          }))[0];

          expect(historyItem).toBeDefined();
          expect(historyItem.type).toBe(ARTICLE_HISTORY_TYPES.CREATE);
          expect(historyItem.title).toBe(newArticle.title);
          expect(historyItem.content).toBe(newArticle.content);
          expect(historyItem.change_log).toBe(DEFAULT_CHANGELOG_MESSAGE);
          expect(historyItem.topic_id).toBe(1);
          expect(res.body.modified_by_id).toBe(historyItem.modified_by_id);
          expect(res.body.created_by_id).toBe(historyItem.created_by_id);
          expect(historyItem.created_at).toBeDefined();
          expect(historyItem.updated_at).toBeDefined();
        });
    });
  });

  describe("#GET /api/articles", () => {
    test("(200) should return expected fields", () =>
      apiClient
        .get(apiUrl)
        .set("x-access-token", tokens.user)
        .expect(HttpStatus.OK)
        .then(async res => {
          expect(res.body).toBeInstanceOf(Array);
          expect(res.body.length).toBeGreaterThan(1);
          expect(res.body.length).toBe(articles.length);

          res.body.forEach((a, i) => {
            expect(a).toEqual(
              expect.objectContaining({
                id: articles[i].id,
                is_active: 1,
                title: articles[i].title,
                change_log: articles[i].change_log,
                topic_id: articles[i].topic_id,
                created_by_id: articles[i].created_by_id,
                modified_by_id: articles[i].modified_by_id
              })
            );
            // TODO
            // expect(a.content).toBeUndefined();
          });
        }));

    test("(200) should return only active articles", async () => {
      await ArticleModel.query().deleteById(1);

      apiClient
        .get(apiUrl)
        .set("x-access-token", tokens.user)
        .expect(HttpStatus.OK)
        .then(async res => {
          expect(res.body).toBeInstanceOf(Array);
          expect(res.body.length).toBeGreaterThan(1);

          // One item lesser because we just deleted one
          expect(res.body.length).toBe(articles.length - 1);

          expect(res.body.map(a => a.id)).not.toContain(1);
        });
    });

    test("(200) should return createdBy user, modifiedBy user and topic with each article", () =>
      apiClient
        .get(apiUrl)
        .set("x-access-token", tokens.user)
        .expect(HttpStatus.OK)
        .then(async res => {
          res.body.forEach(a => {
            expect(a.createdByUser).toBeDefined();
            expect(a.modifiedByUser).toBeDefined();
            expect(a.topic).toBeDefined();
          });
        }));

    describe("Article filter tests", () => {
      test("(200) should return articles filtered by topic_id query", () =>
        apiClient
          .get(apiUrl)
          .query({ topic_id: 2 })
          .set("x-access-token", tokens.user)
          .expect(HttpStatus.OK)
          .then(async res => {
            expect(res.body).toHaveLength(articles.filter(a => a.topic_id === 2).length);
            res.body.forEach(a => {
              expect(a.topic_id).toEqual(2);
            });
          }));

      test("(200) should return articles filtered by modified_by_id query", () =>
        apiClient
          .get(apiUrl)
          .query({ modified_by_id: userHolder.getAdmin().id })
          .set("x-access-token", tokens.user)
          .expect(HttpStatus.OK)
          .then(async res => {
            expect(res.body).toHaveLength(
              articles.filter(a => a.modified_by_id === userHolder.getAdmin().id).length
            );

            res.body.forEach(a => {
              expect(a.modified_by_id).toEqual(userHolder.getAdmin().id);
            });
          }));

      test("(200) should return articles filtered by search query", async () => {
        const funkyTitle = "this is a funky title";
        const funkyContent = "this is a funky content section";

        await ArticleModel.query()
          .patch({
            title: funkyTitle
          })
          .where({ id: articles[0].id });

        await ArticleModel.query()
          .patch({
            content: funkyContent
          })
          .where({ id: articles[1].id });

        return apiClient
          .get(apiUrl)
          .query({ search: "funky" })
          .set("x-access-token", tokens.user)
          .expect(HttpStatus.OK)
          .then(async res => {
            expect(res.body).toHaveLength(2);

            expect(res.body[0].title).toEqual(funkyTitle);
            expect(res.body[1].content).toEqual(funkyContent);
          });
      });
    });

    describe("Article sort tests", () => {
      test("(200) should return expected articles sorted by modifiedDate by default", async () => {
        const date = new Date();

        date.setFullYear(1990, 2, 12);
        await ArticleModel.query()
          .patch({
            updated_at: date
          })
          .where({ id: articles[0].id });

        date.setFullYear(1980, 1, 12);
        await ArticleModel.query()
          .patch({
            updated_at: date
          })
          .where({ id: articles[1].id });

        return apiClient
          .get(apiUrl)
          .set("x-access-token", tokens.user)
          .expect(HttpStatus.OK)
          .then(async res => {
            // date set to 2/12/1990 should be second last
            expect(res.body.findIndex(a => a.id === articles[0].id)).toBe(articles.length - 2);

            // date set to 1/12/1980 should be last
            expect(res.body.findIndex(a => a.id === articles[1].id)).toBe(articles.length - 1);
          });
      });

      test("(200) should return articles sorted by title based on query param", async () => {
        const aaaTitle = "Aaaaaa good title that will be first when sorted";
        const zzzTitle = "zzzzzz to the future was a good movie";

        await ArticleModel.query()
          .patch({
            title: aaaTitle
          })
          .where({ id: articles[3].id });

        await ArticleModel.query()
          .patch({
            title: zzzTitle
          })
          .where({ id: articles[0].id });

        function assertSortDefault() {
          return apiClient
            .get(apiUrl)
            .query({ sort: "title" })
            .set("x-access-token", tokens.user)
            .expect(HttpStatus.OK)
            .then(async res => {
              // title set to begin with 'aaaaa' should be first, because direction is asc
              expect(res.body.findIndex(a => a.id === articles[3].id)).toBe(0);
              expect(res.body[0].title).toEqual(aaaTitle);

              // title set to begin with 'zzzz' should be last, because direction is asc
              expect(res.body.findIndex(a => a.id === articles[0].id)).toBe(articles.length - 1);
              expect(res.body[articles.length - 1].title).toEqual(zzzTitle);
            });
        }

        function assertSortAscending() {
          return apiClient
            .get(apiUrl)
            .query({ sort: "title", direction: "asc" })
            .set("x-access-token", tokens.user)
            .expect(HttpStatus.OK)
            .then(async res => {
              // title set to begin with 'aaaaa' should be first, because direction is asc
              expect(res.body.findIndex(a => a.id === articles[3].id)).toBe(0);
              expect(res.body[0].title).toEqual(aaaTitle);

              // title set to begin with 'zzzz' should be last, because direction is asc
              expect(res.body.findIndex(a => a.id === articles[0].id)).toBe(articles.length - 1);
              expect(res.body[articles.length - 1].title).toEqual(zzzTitle);
            });
        }

        function assertSortDescending() {
          return apiClient
            .get(apiUrl)
            .query({ sort: "title", direction: "desc" })
            .set("x-access-token", tokens.user)
            .expect(HttpStatus.OK)
            .then(async res => {
              // title set to begin with 'zzzz' should be first, because direction is desc
              expect(res.body.findIndex(a => a.id === articles[0].id)).toBe(0);
              expect(res.body[0].title).toEqual(zzzTitle);

              // title set to begin with 'aaaaa' should be last, because direction is desc
              expect(res.body.findIndex(a => a.id === articles[3].id)).toBe(articles.length - 1);
              expect(res.body[articles.length - 1].title).toEqual(aaaTitle);
            });
        }

        return assertSortDefault()
          .then(assertSortAscending)
          .then(assertSortDescending);
      });

      // TODO Must be a similar test as above, will write later (phew)
      test.skip("(200) should return articles sorted by topic based on query param");
    });
  });

  describe("#GET /api/articles/:id", () => {
    test("(200) should return expected fields", () =>
      apiClient
        .get(`${apiUrl}/1`)
        .set("x-access-token", tokens.user)
        .expect(HttpStatus.OK)
        .then(async res => {
          expect(res.body).toBeTruthy();

          const dbArticle = await ArticleModel.query().findById(1);

          expect(res.body).toEqual(
            expect.objectContaining({
              id: dbArticle.id,
              is_active: 1,
              title: dbArticle.title,
              change_log: dbArticle.change_log,
              content: dbArticle.content,
              topic_id: dbArticle.topic_id,
              created_by_id: dbArticle.created_by_id,
              modified_by_id: dbArticle.modified_by_id
            })
          );
        }));

    test("(200) should return createdBy and modifiedBy users, topic with article", () =>
      apiClient
        .get(`${apiUrl}/1`)
        .set("x-access-token", tokens.user)
        .expect(HttpStatus.OK)
        .then(async res => {
          expect(res.body.createdByUser).toBeDefined();
          expect(res.body.modifiedByUser).toBeDefined();
          expect(res.body.topic).toBeDefined();
        }));
  });

  describe("#PUT /api/articles/:id", () => {
    test("(400) invalid if article does not have title", () =>
      Promise.map([null, ""], falsyValue => {
        const articleToUpdate = { title: falsyValue };

        return apiClient
          .put(`${apiUrl}/1`)
          .send(articleToUpdate)
          .set("x-access-token", tokens.user)
          .expect(HttpStatus.BAD_REQUEST)
          .then(res => expect(res.body.message).toEqual(ERRORS.BAD_ARTICLE_UPDATE.message));
      }));

    test("(400) invalid if article does not have body", () =>
      Promise.map([null, ""], falsyValue => {
        const articleToUpdate = { content: falsyValue };

        return apiClient
          .put(`${apiUrl}/1`)
          .send(articleToUpdate)
          .set("x-access-token", tokens.user)
          .expect(HttpStatus.BAD_REQUEST)
          .then(res => expect(res.body.message).toEqual(ERRORS.BAD_ARTICLE_UPDATE.message));
      }));

    test("(400) invalid if article does not have topic", () =>
      Promise.map([null, ""], falsyValue => {
        const articleToUpdate = { topic_id: falsyValue };

        return apiClient
          .put(`${apiUrl}/1`)
          .send(articleToUpdate)
          .set("x-access-token", tokens.user)
          .expect(HttpStatus.BAD_REQUEST)
          .then(res => expect(res.body.message).toEqual(ERRORS.BAD_ARTICLE_UPDATE.message));
      }));

    test("(400) invalid if article does not have change log", () =>
      Promise.map([null, ""], falsyValue => {
        const articleToUpdate = { change_log: falsyValue };

        return apiClient
          .put(`${apiUrl}/1`)
          .send(articleToUpdate)
          .set("x-access-token", tokens.user)
          .expect(HttpStatus.BAD_REQUEST)
          .then(res => expect(res.body.message).toEqual(ERRORS.BAD_ARTICLE_UPDATE.message));
      }));

    test.skip("(400) invalid if nonexistent topicId");

    test("(200) should successfully update article with expected fields", async () => {
      const articleToUpdate = {
        title: "random title",
        content: "random content used for testing this",
        change_log: "things have changed"
      };

      let dbCreatedArticle = await ArticleModel.query().findById(2);

      expect(dbCreatedArticle.modified_by_id).toBe(userHolder.getUsers()[0].id);

      return apiClient
        .put(`${apiUrl}/2`)
        .send(articleToUpdate)
        .set("x-access-token", tokens.admin)
        .expect(HttpStatus.OK)
        .then(async () => {
          dbCreatedArticle = await ArticleModel.query().findById(2);

          expect(dbCreatedArticle.title).toEqual(articleToUpdate.title);
          expect(dbCreatedArticle.content).toEqual(articleToUpdate.content);
          expect(dbCreatedArticle.change_log).toEqual(articleToUpdate.change_log);
          expect(dbCreatedArticle.created_by_id).toBe(userHolder.getUsers()[0].id);
          expect(dbCreatedArticle.modified_by_id).toBe(userHolder.getAdmin().id);
          expect(dbCreatedArticle.topic_id).toBe(1);
        });
    });

    test("(200) update should return expected fields", () => {
      const articleToUpdate = {
        content: "random content used for testing this",
        change_log: "things have changed"
      };

      return apiClient
        .put(`${apiUrl}/2`)
        .send(articleToUpdate)
        .set("x-access-token", tokens.admin)
        .expect(HttpStatus.OK)
        .then(async res => {
          expect(res.body.id).toBe(2);
          expect(Object.keys(res.body)).toEqual(
            expect.arrayContaining([
              "content",
              "change_log",
              "modified_by_id",
              "updated_at",
              "id",
              "title",
              "topic_id",
              "created_by_id",
              "is_active",
              "created_at",
              "topic",
              "createdByUser",
              "modifiedByUser"
            ])
          );
        });
    });

    test("(200) should make a history item for the article", () => {
      const articleToUpdate = {
        content: "random content used for testing this",
        change_log: "things have changed"
      };

      return apiClient
        .put(`${apiUrl}/2`)
        .send(articleToUpdate)
        .set("x-access-token", tokens.admin)
        .expect(HttpStatus.OK)
        .then(async res => {
          const historyItem = (await ArticleHistoryModel.query().where({
            article_id: 2
          }))[0];

          const article2FromDB = await ArticleModel.query().findById(2);

          expect(historyItem).toBeDefined();
          expect(historyItem.type).toBe(ARTICLE_HISTORY_TYPES.UPDATE);
          expect(historyItem.title).toBe(article2FromDB.title);
          expect(historyItem.content).toBe(articleToUpdate.content);
          expect(historyItem.change_log).toBe(articleToUpdate.change_log);
          expect(historyItem.topic_id).toBe(1);
          expect(res.body.modified_by_id).toBe(historyItem.modified_by_id);
          expect(res.body.created_by_id).toBe(historyItem.created_by_id);
          expect(historyItem.created_at).toBeDefined();
          expect(historyItem.updated_at).toBeDefined();
        });
    });
  });

  describe("#DELETE /api/articles/:id", () => {
    test("(403) user not allowed to delete article", () =>
      apiClient
        .delete(`${apiUrl}/2`)
        .set("x-access-token", tokens.user)
        .expect(HttpStatus.FORBIDDEN)
        .then(res => expect(res.body.message).toBe(ERRORS.NO_ACCESS.message)));

    test("(200) should soft-delete article", () =>
      apiClient
        .delete(`${apiUrl}/2`)
        .set("x-access-token", tokens.admin)
        .expect(HttpStatus.OK)
        .then(async () => {
          const deletedArticle = (await ArticleModel.knex()
            .table("article")
            .where("id", 2))[0];

          expect(deletedArticle.is_active).toBe(0);
        }));
  });
});
