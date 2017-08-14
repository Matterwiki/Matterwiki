const { assign } = require("lodash");
const { knexInstance: knex } = require("../../utils/db");
const {
  topic: topicFactory,
  article: articleFactory
} = require("../factories/factories");

const { userHolder } = require("../testUtils/modelHolder");

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

module.exports = { makeTopics, makeArticles };
