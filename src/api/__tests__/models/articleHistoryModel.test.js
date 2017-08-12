const { assign } = require("lodash");
const Promise = require("bluebird");

const { knexInstance: knex } = require("../../utils/db");
const {
  setupAll,
  setupEach,
  teardownAll
} = require("../testUtils/globalSetup");

const { userHolder } = require("../testUtils/modelHolder");

const { article: articleFactory } = require("../factories/factories");

const ArticleHistoryModel = require("../../models/articleHistoryModel");

const { ARTICLE_HISTORY_TYPES } = require("../../utils/constants");

describe("Article history tests", () => {
  beforeAll(setupAll);
  afterAll(teardownAll);

  let historyItems = [];
  let articleId = null;

  beforeEach(setupEach);
  beforeEach(async () => {
    const newArticle = assign(articleFactory.build(1), {
      created_by_id: userHolder.getAdmin().id,
      modified_by_id: userHolder.getAdmin().id,
      // the seed gives us this ID
      topic_id: 1
    });
    // make article
    [articleId] = await knex("article").insert(newArticle);

    function makeHistoryItem(type, changes = {}) {
      const historyItem = assign(
        { type, article_id: articleId },
        newArticle,
        changes
      );
      return knex("article_history")
        .insert(historyItem)
        .then(id => knex("article_history").where({ id }))
        .then(([item]) => item);
    }

    // insert history items
    // dont really care that data is not sequenced, like history data should
    return Promise.all([
      // make a CREATE item
      makeHistoryItem(ARTICLE_HISTORY_TYPES.CREATE),
      // make an UPDATE item
      makeHistoryItem(ARTICLE_HISTORY_TYPES.UPDATE, { title: "New title" }),
      // make an UPDATE item
      makeHistoryItem(ARTICLE_HISTORY_TYPES.UPDATE, { content: "New content" }),
      // make a DELETE item
      makeHistoryItem(ARTICLE_HISTORY_TYPES.DELETE)
    ]).then(dbHistoryItems => (historyItems = dbHistoryItems));
  });

  test("Gets all history items for an article", async () => {
    const historyItemsForArticle = await ArticleHistoryModel.getAll({
      article_id: articleId
    });
    const historyWithCreate = historyItemsForArticle.filter(
      item => item.type === ARTICLE_HISTORY_TYPES.CREATE
    );

    const historyWithUpdate = historyItemsForArticle.filter(
      item => item.type === ARTICLE_HISTORY_TYPES.UPDATE
    );

    const historyWithDelete = historyItemsForArticle.filter(
      item => item.type === ARTICLE_HISTORY_TYPES.DELETE
    );

    expect(historyItemsForArticle).toHaveLength(historyItems.length);
    expect(historyWithCreate).toHaveLength(1);
    expect(historyWithUpdate).toHaveLength(2);
    expect(historyWithDelete).toHaveLength(1);
  });
  test("Gets specific history item for ID and article", async () => {
    const historyItemForArticle = await ArticleHistoryModel.get(
      historyItems[1].id
    );

    expect(historyItemForArticle.article_id).toEqual(articleId);
    expect(historyItemForArticle.type).toEqual(historyItems[1].type);
  });
});
