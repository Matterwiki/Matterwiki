const Model = require("objection").Model;
const withDBHelpers = require("./withDBHelpers");

class ArticleHistoryModel extends Model {
  static get tableName() {
    return "article_history";
  }

  static relationMappings = {
    articles: {
      relation: Model.BelongsToOneRelation,
      modelClass: `${__dirname}/ArticleModel`,
      join: {
        from: "article_history.article_id",
        to: "article.id"
      }
    },
    createdUser: {
      relation: Model.BelongsToOneRelation,
      modelClass: `${__dirname}/UserModel`,
      join: {
        from: "topic.created_by_id",
        to: "user.id"
      }
    },
    modifiedUser: {
      relation: Model.BelongsToOneRelation,
      modelClass: `${__dirname}/UserModel`,
      join: {
        from: "topic.modified_by_id",
        to: "user.id"
      }
    }
  };
}

module.exports = withDBHelpers(ArticleHistoryModel);
