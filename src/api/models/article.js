const db = require("../utils/db");
const buildDbModel = require("../utils/buildDbModel");

require("./topic");
require("./archive");
require("./user");

let ArticleModel = db.model(
  "Article",
  db.Model.extend({
    tableName: "articles",
    topic: function() {
      return this.belongsTo("Topic", "topic_id");
    },
    user: function() {
      return this.belongsTo("User", "user_id");
    },
    archives: function() {
      return this.hasMany("Archives");
    }
  })
);

ArticleModel = buildDbModel(ArticleModel);

// override so we could use query and add some extra stuff
// TODO there must be a better way to do this?
ArticleModel.getAllArticles = function(params = {}, count) {
  return this.model
    .query({ where: params })
    .query(function(qb) {
      if (count) qb.limit(count);
      qb.orderBy("updated_at", "DESC");
    })
    .fetchAll();
};

module.exports = ArticleModel;
