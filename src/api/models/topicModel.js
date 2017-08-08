const Model = require("objection").Model;
const withDBHelpers = require("./withDBHelpers");

class TopicModel extends Model {
  static get tableName() {
    return "topic";
  }

  static get relationMappings() {
    const UserModel = require("./userModel").Model;
    const ArticleHistoryModel = require("./articleHistoryModel").Model;
    const ArticleModel = require("./articleModel").Model;

    return {
      article: {
        relation: Model.HasManyRelation,
        modelClass: ArticleModel,
        join: {
          from: "topic.id",
          to: "article.topic_id"
        }
      },
      createdUser: {
        relation: Model.BelongsToOneRelation,
        modelClass: UserModel,
        join: {
          from: "topic.created_by_id",
          to: "user.id"
        }
      },
      modifiedUser: {
        relation: Model.BelongsToOneRelation,
        modelClass: UserModel,
        join: {
          from: "topic.modified_by_id",
          to: "user.id"
        }
      }
    };
  }
}

module.exports = withDBHelpers(TopicModel);
