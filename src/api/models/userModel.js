const { withDbHelpers } = require("./modelHelpers");
const { Model } = require("objection");

const options = { uniqueFields: ["email"] };

class UserModel extends withDbHelpers(options)(Model) {
  static get tableName() {
    return "user";
  }

  static get hidden() {
    return ["password"];
  }

  static get namedFilters() {
    return {
      lite: builder => builder.select("name", "email", "about")
    };
  }

  static get relationMappings() {
    // this is in here to prevent circular deps
    const TopicModel = require("./topicModel");
    const ArticleHistoryModel = require("./articleHistoryModel");
    const ArticleModel = require("./articleModel");

    return {
      createdArticle: {
        relation: Model.HasManyRelation,
        modelClass: ArticleModel,
        join: {
          from: `user.id`,
          to: `article.created_by_id`
        }
      },
      modifiedArticle: {
        relation: Model.HasManyRelation,
        modelClass: ArticleModel,
        join: {
          from: `user.id`,
          to: `article.modified_by_id`
        }
      },
      createdTopic: {
        relation: Model.HasManyRelation,
        modelClass: TopicModel,
        join: {
          from: `user.id`,
          to: `topic.created_by_id`
        }
      },
      modifiedTopic: {
        relation: Model.HasManyRelation,
        modelClass: TopicModel,
        join: {
          from: `user.id`,
          to: `topic.modified_by_id`
        }
      },
      createdArticleHistory: {
        relation: Model.HasManyRelation,
        modelClass: ArticleHistoryModel,
        join: {
          from: `user.id`,
          to: `article_history.created_by_id`
        }
      },
      modifiedArticleHistory: {
        relation: Model.HasManyRelation,
        modelClass: ArticleHistoryModel,
        join: {
          from: `user.id`,
          to: `article_history.modified_by_id`
        }
      }
    };
  }
}

module.exports = UserModel;
