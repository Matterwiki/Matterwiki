const { assign } = require("lodash");
const { knexInstance: knex } = require("../../utils/db");
const {
  topic: topicFactory,
  article: articleFactory
} = require("../factories/factories");

const { userHolder } = require("../testUtils/modelHolder");

const { ARTICLE_HISTORY_TYPES } = require("../../utils/constants");

function makeTopics() {
  const newTopics = topicFactory.build(3);

  return knex("topic").insert(newTopics).then(() => knex("topic").select());
}

function makeArticles(topicId, userId = userHolder.getAdmin().id) {
  const newArticles = articleFactory.build(3).map(a =>
    assign({}, a, {
      topic_id: topicId,
      created_by_id: userId,
      modified_by_id: userId
    })
  );

  return knex("article")
    .insert(newArticles)
    .then(() => knex("article").select())
    .catch(console.error);
}

async function makeHistoryItems() {
  const newArticle = assign(articleFactory.build(1), {
    created_by_id: userHolder.getAdmin().id,
    modified_by_id: userHolder.getAdmin().id,
    // the seed gives us this ID
    topic_id: 1
  });

  // make and fetch article
  const [article] = await knex("article")
    .insert(newArticle)
    .then(id => knex("article").where("id", id));

  function makeHistoryItem(type, changes = {}) {
    const historyItem = assign(
      { type, article_id: article.id },
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
  const historyItems = await Promise.all([
    // make a CREATE item
    makeHistoryItem(ARTICLE_HISTORY_TYPES.CREATE),
    // make an UPDATE item
    makeHistoryItem(ARTICLE_HISTORY_TYPES.UPDATE, { title: "New title" }),
    // make an UPDATE item
    makeHistoryItem(ARTICLE_HISTORY_TYPES.UPDATE, { content: "New content" }),
    // make a DELETE item
    makeHistoryItem(ARTICLE_HISTORY_TYPES.DELETE)
  ]);

  return { historyItems, article };
}

module.exports = { makeTopics, makeArticles, makeHistoryItems };
