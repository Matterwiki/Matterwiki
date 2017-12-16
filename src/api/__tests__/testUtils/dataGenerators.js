const { assign, omit } = require("lodash");
const Promise = require("bluebird");

const ArticleModel = require("../../models/articleModel");
const ArticleHistoryModel = require("../../models/articleHistoryModel");
const TopicModel = require("../../models/topicModel");

const { topic: topicFactory, article: articleFactory } = require("../factories/factories");

const { userHolder } = require("../testUtils/modelHolder");

const { ARTICLE_HISTORY_TYPES } = require("../../utils/constants");

function makeTopics() {
  const newTopics = topicFactory.build(3);

  return Promise.map(newTopics, t => TopicModel.query().insert(t));
}

function makeArticlesForTopic(topicId, userId = userHolder.getAdmin().id) {
  const newArticles = articleFactory.build(3).map(a =>
    assign({}, a, {
      topic_id: topicId,
      created_by_id: userId,
      modified_by_id: userId
    })
  );

  return Promise.map(newArticles, a => ArticleModel.query().insertAndFetch(a));
}

async function makeHistoryItemsForArticle(article) {
  function makeHistoryItem(type) {
    const historyItem = assign({ type, article_id: article.id }, omit(article, "id"));
    return ArticleHistoryModel.query().insertAndFetch(historyItem);
  }

  await makeHistoryItem(ARTICLE_HISTORY_TYPES.CREATE);
  await makeHistoryItem(ARTICLE_HISTORY_TYPES.UPDATE);
  await makeHistoryItem(ARTICLE_HISTORY_TYPES.UPDATE);
  await makeHistoryItem(ARTICLE_HISTORY_TYPES.UPDATE);

  const historyItems = await ArticleHistoryModel.query().where({
    article_id: article.id
  });

  return historyItems;
}

module.exports = {
  makeTopics,
  makeArticlesForTopic,
  makeHistoryItemsForArticle
};
