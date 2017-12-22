const { omit, assign } = require("lodash");
const { Model } = require("objection");

const { withDbHelpers } = require("./modelHelpers");
const { ARTICLE_HISTORY_TYPES } = require("../utils/constants");

// TODO should this be unique?
const options = {
  uniqueFields: ["title"],
  // TopicModel and UserModel have namedFilters that are called "lite", check the model files
  eagerRelations: "[topic(lite), createdByUser(lite), modifiedByUser(lite)]"
};

class ArticleModel extends withDbHelpers(options)(Model) {
  static get tableName() {
    return "article";
  }

  static get relationMappings() {
    const TopicModel = require("./topicModel");
    const ArticleHistoryModel = require("./articleHistoryModel");
    const UserModel = require("./userModel");

    return {
      topic: {
        relation: Model.BelongsToOneRelation,
        modelClass: TopicModel,
        join: {
          from: "article.topic_id",
          to: "topic.id"
        }
      },
      createdByUser: {
        relation: Model.BelongsToOneRelation,
        modelClass: UserModel,
        join: {
          from: "article.created_by_id",
          to: "user.id"
        }
      },
      modifiedByUser: {
        relation: Model.BelongsToOneRelation,
        modelClass: UserModel,
        join: {
          from: "article.modified_by_id",
          to: "user.id"
        }
      },
      articleHistory: {
        relation: Model.HasManyRelation,
        modelClass: ArticleHistoryModel,
        join: {
          from: "article.id",
          to: "article_history.article_id"
        }
      }
    };
  }
}

module.exports = ArticleModel;
