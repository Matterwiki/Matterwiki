const { withDbHelpers, BaseModel } = require("./modelHelpers");

const ArticleModel = require("./articleModel").Model;

class TopicModel extends BaseModel {
  static get tableName() {
    return "topic";
  }

  static get relationMappings() {
    const UserModel = require("./userModel").Model;
    const ArticleHistoryModel = require("./articleHistoryModel").Model;

    return {
      article: {
        relation: BaseModel.HasManyRelation,
        modelClass: ArticleModel,
        join: {
          from: "topic.id",
          to: "article.topic_id"
        }
      },
      createdUser: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: UserModel,
        join: {
          from: "topic.created_by_id",
          to: "user.id"
        }
      },
      modifiedUser: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: UserModel,
        join: {
          from: "topic.modified_by_id",
          to: "user.id"
        }
      }
    };
  }
}

const extraHelpers = {
  // TODO fix this function. Should run the query on topic model
  fetchActiveArticles: async id =>
    ArticleModel.query()
      .where("is_active", true)
      .where("topic_id", id)
      .eager("[createdUser, modifiedUser]")
};

module.exports = withDbHelpers(TopicModel, extraHelpers, {
  relations: "[article, article.[modifiedUser]]"
});
