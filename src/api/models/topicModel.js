const { withDbHelpers, BaseModel } = require("./modelHelpers");

class TopicModel extends BaseModel {
  static get tableName() {
    return "topic";
  }

  static get relationMappings() {
    const UserModel = require("./userModel").Model;
    const ArticleHistoryModel = require("./articleHistoryModel").Model;
    const ArticleModel = require("./articleModel").Model;

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

module.exports = withDbHelpers(
  TopicModel,
  {},
  {
    relations: "[article, article.[modifiedUser]]"
  }
);
