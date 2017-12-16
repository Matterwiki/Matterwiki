const { Model } = require("objection");
const { withDbHelpers } = require("./modelHelpers");

const options = {
  // TopicModel and UserModel have namedFilters that are called "lite", check the model files
  eagerRelations: "[topic(lite), createdByUser(lite), modifiedByUser(lite)]"
};

class ArticleHistoryModel extends withDbHelpers(options)(Model) {
  static get tableName() {
    return "article_history";
  }

  // Article dates come in as strings; make it into actual dates before inserting
  $beforeInsert() {
    this.created_at = this.created_at ? new Date(this.created_at) : new Date();
    this.updated_at = this.updated_at ? new Date(this.updated_at) : new Date();
  }

  // Article dates come in as strings; make it into actual dates before updating
  $beforeUpdate() {
    this.created_at = new Date(this.created_at);
    this.updated_at = this.updated_at ? new Date(this.updated_at) : new Date();
  }

  static get relationMappings() {
    const TopicModel = require("./topicModel");
    const UserModel = require("./userModel");
    const ArticleModel = require("./articleModel");

    return {
      article: {
        relation: Model.BelongsToOneRelation,
        modelClass: ArticleModel,
        join: {
          from: "article_history.article_id",
          to: "article.id"
        }
      },
      topic: {
        relation: Model.BelongsToOneRelation,
        modelClass: TopicModel,
        join: {
          from: "article_history.topic_id",
          to: "topic.id"
        }
      },
      createdByUser: {
        relation: Model.BelongsToOneRelation,
        modelClass: UserModel,
        join: {
          from: "article_history.created_by_id",
          to: "user.id"
        }
      },
      modifiedByUser: {
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

module.exports = ArticleHistoryModel;
