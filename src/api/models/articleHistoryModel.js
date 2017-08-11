const Model = require("objection").Model;
const withDBHelpers = require("./withDBHelpers");

class ArticleHistoryModel extends Model {
  static get tableName() {
    return "article_history";
  }

  static get relationMappings() {
    const TopicModel = require("./topicModel").Model;
    const UserModel = require("./userModel").Model;
    const ArticleModel = require("./articleModel").Model;

    return {
      article: {
        relation: Model.BelongsToOneRelation,
        modelClass: ArticleModel,
        join: {
          from: "article_history.article_id",
          to: "article.id"
        }
      },
      createdUser: {
        relation: Model.BelongsToOneRelation,
        modelClass: UserModel,
        join: {
          from: "article_history.created_by_id",
          to: "user.id"
        }
      },
      modifiedUser: {
        relation: Model.BelongsToOneRelation,
        modelClass: UserModel,
        join: {
          from: "article_history.modified_by_id",
          to: "user.id"
        }
      }
    };
  }
}

module.exports = withDBHelpers(ArticleHistoryModel);
