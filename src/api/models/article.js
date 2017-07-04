const db = require("../utils/db");
const buildDbModel = require("../utils/buildDbModel");

require("./topic");
require("./archive");
require("./user");

let ArticleModel = db.model(
  "Article",
  db.Model.extend({
    tableName: "articles",
    topic() {
      return this.belongsTo("Topic", "topic_id");
    },
    user() {
      return this.belongsTo("User", "user_id");
    },
    archives() {
      return this.hasMany("Archives");
    }
  })
);

ArticleModel = buildDbModel(ArticleModel);

// override so we could use query and add some extra stuff
// TODO there must be a better way to do this?
ArticleModel.getAllArticles = function getAllArticles(params = {}, count) {
  return this.model
    .query({ where: params })
    .query(qb => {
      if (count) {
        qb.limit(count);
      }
      qb.orderBy("updated_at", "DESC");
    })
    .fetchAll();
};

// One-off for searching..
// TODO Generalize this further when the need arises
ArticleModel.search = function search(query) {
  // TODO :( :( Security issues?
  const searchQuery = `%${query}%`;

  return this.model
    .query(qb => {
      qb
        .where("title", "LIKE", searchQuery)
        .orWhere("body", "LIKE", searchQuery);
    })
    .fetchAll();
};

module.exports = ArticleModel;
