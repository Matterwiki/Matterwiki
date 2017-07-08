const db = require("../utils/db");
const buildDbModel = require("../utils/buildDbModel");

require("./article");

const TopicModel = db.model(
  "Topic",
  db.Model.extend({
    tableName: "topics",
    articles() {
      return this.hasMany("Article");
    }
  })
);

module.exports = buildDbModel(TopicModel);
