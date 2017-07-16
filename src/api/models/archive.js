const { db } = require("../utils/db");
const buildDbModel = require("../utils/buildDbModel");

require("./article");

const ArchiveModel = db.model(
  "Archive",
  db.Model.extend({
    tableName: "archives",
    articles() {
      return this.belongsTo("Articles", "article_id");
    }
  })
);

module.exports = buildDbModel(ArchiveModel);
