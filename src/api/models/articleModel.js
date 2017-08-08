const Model = require("objection").Model;
const withDBHelpers = require("./withDBHelpers");

class Article extends Model {
  static get tableName() {
    return "article";
  }

  static get relationMappings() {
    const TopicModel = require("./topicModel").Model;
    const ArticleHistoryModel = require("./articleHistoryModel").Model;
    const UserModel = require("./userModel").Model;

    return {
      topic: {
        relation: Model.BelongsToOneRelation,
        modelClass: TopicModel,
        join: {
          from: "article.topic_id",
          to: "topic.id"
        }
      },
      createdUser: {
        relation: Model.BelongsToOneRelation,
        modelClass: UserModel,
        join: {
          from: "article.created_by_id",
          to: "users.id"
        }
      },
      modifiedUser: {
        relation: Model.BelongsToOneRelation,
        modelClass: UserModel,
        join: {
          from: "article.modified_by_id",
          to: "users.id"
        }
      },
      articleHistory: {
        relation: Model.HasManyRelation,
        modelClass: ArticleHistoryModel,
        join: {
          from: "articles.id",
          to: "archives.article_id"
        }
      }
    };
  }
}

module.exports = withDBHelpers(Article);
