const Promise = require("bluebird");
const { assign, omit } = require("lodash");
const { knexInstance: knex } = require("../../utils/db");
const {
  setupAll,
  setupEach,
  teardownAll
} = require("../testUtils/globalSetup");

const { userHolder } = require("../testUtils/modelHolder");

const { article: articleFactory } = require("../factories/factories");

const ArticleModel = require("../../models/articleModel");
const ArticleHistoryModel = require("../../models/articleHistoryModel");

const { ARTICLE_HISTORY_TYPES } = require("../../utils/constants");

const { makeArticles } = require("../testUtils/dataGenerators");

describe("Article Model", () => {
  let dbArticles = null;
  const topicId = 1;

  beforeAll(setupAll);
  afterAll(teardownAll);

  beforeEach(setupEach);
  beforeEach(() =>
    // seed inserts general topic (check `setupEach`)
    makeArticles(topicId).then(articles => (dbArticles = articles))
  );

  test("Gets article by ID", async () => {
    const expectedArticle = dbArticles[0];
    const dbArticle = await ArticleModel.get(expectedArticle.id);

    expect(dbArticle).toEqual(expectedArticle);
  });

  test("Gets article by ID with topic and the created user", async () => {
    // make the expected article with the fields needed
    const expectedArticle = dbArticles[0];

    const [createdUser, topic] = await Promise.all([
      knex("user").where("id", expectedArticle.created_by_id),
      knex("topic").where("id", expectedArticle.topic_id)
    ]);

    expectedArticle.createdUser = createdUser[0];
    expectedArticle.topic = topic[0];

    const dbArticle = await ArticleModel.getWithRels(expectedArticle.id);

    expect(dbArticle).toEqual(expectedArticle);
  });

  test("Gets all articles", async () => {
    const expectedArticles = dbArticles;
    const allDbArticles = await ArticleModel.getAll();

    allDbArticles.forEach((dbArticle, i) => {
      expect(dbArticle).toEqual(expectedArticles[i]);
    });
  });

  test("Gets all articles with corresponding topics and createdUser props", async () => {
    // make the expected articles with the fields needed
    const expectedArticles = await Promise.map(dbArticles, dbArticle =>
      Promise.all([
        knex("user").where("id", dbArticle.created_by_id),
        knex("topic").where("id", dbArticle.topic_id)
      ]).then(([user, topic]) =>
        assign({}, dbArticle, {
          createdUser: user[0],
          topic: topic[0]
        })
      )
    );

    const allDbArticles = await ArticleModel.getAllWithRels();

    allDbArticles.forEach((dbArticle, i) => {
      expect(dbArticle).toEqual(expectedArticles[i]);
    });
  });

  test("Inserts and returns article", async () => {
    const articleToInsert = assign({}, articleFactory.build(1), {
      created_by_id: userHolder.getAdmin().id,
      modified_by_id: userHolder.getAdmin().id,
      topic_id: topicId
    });

    const dbArticle = await ArticleModel.insert(articleToInsert);

    expect(dbArticle).toBeInstanceOf(ArticleModel.Model);
    expect(dbArticle.title).toEqual(articleToInsert.title);
    expect(dbArticle.content).toEqual(articleToInsert.content);
    expect(dbArticle.change_log).toEqual(articleToInsert.change_log);
    expect(dbArticle.topic_id).toEqual(topicId);
    expect(dbArticle.created_by_id).toEqual(userHolder.getAdmin().id);
    expect(dbArticle.modified_by_id).toEqual(userHolder.getAdmin().id);
    expect(dbArticle.is_active).toBeTruthy();
  });

  test("Inserts with history and returns article with history", async () => {
    const articleToInsert = assign({}, articleFactory.build(1), {
      created_by_id: userHolder.getAdmin().id,
      modified_by_id: userHolder.getAdmin().id,
      topic_id: topicId
    });

    const dbArticle = await ArticleModel.insertWithHistory(articleToInsert);
    const dbHistory = dbArticle.articleHistory[0];

    // check article
    expect(dbArticle).toBeInstanceOf(ArticleModel.Model);
    expect(dbArticle.title).toEqual(articleToInsert.title);
    expect(dbArticle.content).toEqual(articleToInsert.content);
    expect(dbArticle.change_log).toEqual(articleToInsert.change_log);
    expect(dbArticle.topic_id).toEqual(topicId);
    expect(dbArticle.created_by_id).toEqual(userHolder.getAdmin().id);
    expect(dbArticle.modified_by_id).toEqual(userHolder.getAdmin().id);
    expect(dbArticle.is_active).toBeTruthy();

    // check if history is correctly "linked" to parent article
    expect(dbHistory).toBeInstanceOf(ArticleHistoryModel.Model);
    expect(dbHistory.article_id).toEqual(dbArticle.id);
    expect(dbHistory.type).toEqual(ARTICLE_HISTORY_TYPES.CREATE);

    // check if history got the right article values
    expect(dbHistory.title).toEqual(articleToInsert.title);
    expect(dbHistory.content).toEqual(articleToInsert.content);
    expect(dbHistory.change_log).toEqual(articleToInsert.change_log);
    expect(dbHistory.topic_id).toEqual(topicId);
    expect(dbHistory.created_by_id).toEqual(userHolder.getAdmin().id);
    expect(dbHistory.modified_by_id).toEqual(userHolder.getAdmin().id);
    expect(dbHistory.is_active).toBeTruthy();
  });

  test("Inserts array of articles", async () => {
    const articlesToInsert = articleFactory.build(3).map(article =>
      assign({}, article, {
        created_by_id: userHolder.getAdmin().id,
        modified_by_id: userHolder.getAdmin().id,
        topic_id: topicId
      })
    );
    const insertedArticles = await ArticleModel.insertMany(articlesToInsert);

    insertedArticles.forEach((dbArticle, i) => {
      expect(dbArticle).toBeInstanceOf(ArticleModel.Model);
      expect(dbArticle.title).toEqual(articlesToInsert[i].title);
      expect(dbArticle.content).toEqual(articlesToInsert[i].content);
      expect(dbArticle.change_log).toEqual(articlesToInsert[i].change_log);
      expect(dbArticle.topic_id).toEqual(topicId);
      expect(dbArticle.is_active).toBeTruthy();
    });
  });

  test("Updates article by ID", async () => {
    const { id } = dbArticles[0];

    const updatedDbArticle = await ArticleModel.update(id, {
      title: "New name"
    });

    expect(updatedDbArticle.title).toEqual("New name");

    // rest of the props did not change
    expect(updatedDbArticle.content).toEqual(dbArticles[0].content);
    expect(updatedDbArticle.change_log).toEqual(dbArticles[0].change_log);
    expect(updatedDbArticle.topic_id).toEqual(topicId);
    expect(updatedDbArticle.is_active).toBeTruthy();
  });

  test("Updates article by ID and creates new history item", async () => {
    // make an article first
    const articleToInsert = assign({}, articleFactory.build(1), {
      created_by_id: userHolder.getAdmin().id,
      modified_by_id: userHolder.getAdmin().id,
      topic_id: topicId
    });

    const dbArticle = await ArticleModel.insertWithHistory(articleToInsert);

    // update created article
    const updatedDbArticle = await ArticleModel.updateWithHistory(
      dbArticle.id,
      {
        title: "New funky name"
      }
    );

    const updatedDbHistory = updatedDbArticle.articleHistory;

    // check if history is correctly "linked" to parent article
    expect(updatedDbHistory).toBeInstanceOf(ArticleHistoryModel.Model);
    expect(updatedDbHistory.article_id).toEqual(dbArticle.id);
    expect(updatedDbHistory.type).toEqual(ARTICLE_HISTORY_TYPES.UPDATE);

    // check if history has the article update
    expect(updatedDbHistory.title).toEqual("New funky name");
  });

  test("Soft-deletes article by ID (sets to inactive)", async () => {
    const { id } = dbArticles[1];

    await ArticleModel.delete(id);

    const deletedDbArticle = await knex("article").where("id", id);

    expect(deletedDbArticle.is_active).toBeFalsy();
  });

  test("Soft-deletes article by ID and makes history entry", async () => {
    // make an article first
    const articleToInsert = assign({}, articleFactory.build(1), {
      created_by_id: userHolder.getAdmin().id,
      modified_by_id: userHolder.getAdmin().id,
      topic_id: topicId
    });

    const dbArticle = await ArticleModel.insertWithHistory(articleToInsert);

    await ArticleModel.deleteWithHistory(dbArticle.id);

    const deletedDbArticle = await knex("article").where("id", dbArticle.id);

    const deletedDbHistory = await knex("article_history").where({
      article_id: dbArticle.id,
      type: ARTICLE_HISTORY_TYPES.DELETE
    });

    expect(deletedDbArticle.is_active).toBeFalsy();
    expect(deletedDbHistory).toBeTruthy();
  });

  test("Gets only active articles", async () => {
    const { id } = dbArticles[0];

    await ArticleModel.delete(id);

    const filteredDbArticles = await ArticleModel.getAll();

    expect(filteredDbArticles.map(article => article.id)).not.toContain(id);
  });

  test("Gets inactive article if `is_active` param is passed in", async () => {
    const { id } = dbArticles[0];

    await ArticleModel.delete(id);

    const filteredDbArticles = await ArticleModel.getAll({ is_active: false });

    expect(filteredDbArticles.map(article => article.id)).toContain(id);
  });

  describe("Model Search tests", () => {
    beforeEach(() => {
      // update articles to something we know
      const updateTitle = () =>
        knex("article")
          .where("id", dbArticles[0].id)
          .update({ title: "jolly ladwig fell" });

      const updateChangelog = () =>
        knex("article")
          .where("id", dbArticles[1].id)
          .update({ change_log: "funky nosed fella" });

      const updateContent = () =>
        knex("article").where("id", dbArticles[2].id).update({
          content: `random stuff in here that's of no use whatsoever..
          I wonder if this is the right way to test this. they'd tell you why.`
        });

      return Promise.all([updateTitle(), updateChangelog(), updateContent()]);
    });

    test("Finds Article by search string provided for `title`", async () => {
      const filteredDbItems = await ArticleModel.search("jolly");

      expect(filteredDbItems).toHaveLength(1);
      expect(filteredDbItems[0].title).toContain("jolly");
      expect(filteredDbItems[0].title).toContain("jolly ladwig fell");
    });

    test("Finds Article by search string provided for `change_log`", async () => {
      const filteredDbItems = await ArticleModel.search("funky");

      expect(filteredDbItems).toHaveLength(1);
      expect(filteredDbItems[0].change_log).toContain("funky");
      expect(filteredDbItems[0].change_log).toContain("funky nosed fella");
    });

    test("Finds Article by search string provided for `content`", async () => {
      const filteredDbItems = await ArticleModel.search("right way");

      expect(filteredDbItems).toHaveLength(1);
      expect(filteredDbItems[0].content).toContain("right way");
    });

    test("Finds Articles by search string provided for `title`/`about`/`content`", async () => {
      const filteredDbItems = await ArticleModel.search("ell");

      expect(filteredDbItems).toHaveLength(3);
      expect(filteredDbItems[0].title).toContain("ell");
      expect(filteredDbItems[1].change_log).toContain("ell");
      expect(filteredDbItems[2].content).toContain("ell");
    });

    test("Returns no articles when search string does not match any User", async () => {
      const filteredDbItems = await ArticleModel.search("fewfgiuweghell");

      expect(filteredDbItems).toHaveLength(0);
    });

    test("should not return inactive results", async () => {
      await ArticleModel.delete(dbArticles[0].id);

      const filteredDbItems = await ArticleModel.search("jolly");

      expect(filteredDbItems).toHaveLength(0);
    });

    test("search returns topic and user with articles", async () => {
      const excludedProps = ["created_at", "updated_at"];
      const filteredDbItems = await ArticleModel.searchWithRels("ell");

      const topics = await knex("topic").select();
      const users = await knex("user").select();

      expect(filteredDbItems).toHaveLength(3);

      filteredDbItems.forEach(article => {
        expect(article.topic).toBeDefined();
        expect(article.createdUser).toBeDefined();

        const [topic] = topics.filter(t => t.id === article.topic_id);
        const [user] = users.filter(u => u.id === article.created_by_id);

        expect(article.topic).toEqual(
          expect.objectContaining(omit(topic, excludedProps))
        );
        expect(article.createdUser).toEqual(
          expect.objectContaining(omit(user, excludedProps))
        );
      });
    });
  });
});
