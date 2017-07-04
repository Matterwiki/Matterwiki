const db = require("../utils/db");
const buildDbModel = require("../utils/buildDbModel");

require("./article");

const UserModel = db.model(
  "User",
  db.Model.extend({
    tableName: "users",
    articles: function() {
      return this.hasMany("Article");
    }
  })
);

module.exports = buildDbModel(UserModel);
