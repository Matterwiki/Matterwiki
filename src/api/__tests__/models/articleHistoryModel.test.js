const { assign } = require("lodash");
const Promise = require("bluebird");

const { knexInstance: knex } = require("../../utils/db");
const {
  setupAll,
  setupEach,
  teardownAll
} = require("../testUtils/globalSetup");

const { userHolder } = require("../testUtils/modelHolder");
const { makeHistoryItems } = require("../testUtils/dataGenerators");

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
    const stuff = await makeHistoryItems();
    historyItems = stuff.historyItems;
    articleId = stuff.article.id;
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
