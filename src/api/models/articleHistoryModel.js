const { withDbHelpers, BaseModel } = require("./modelHelpers");

class ArticleHistoryModel extends BaseModel {
  static get tableName() {
    return "article_history";
  }

  static get relationMappings() {
    const TopicModel = require("./topicModel").Model;
    const UserModel = require("./userModel").Model;
    const ArticleModel = require("./articleModel").Model;

    return {
      article: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: ArticleModel,
        join: {
          from: "article_history.article_id",
          to: "article.id"
        }
      },
      createdUser: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: UserModel,
        join: {
          from: "article_history.created_by_id",
          to: "user.id"
        }
      },
      modifiedUser: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: UserModel,
        join: {
          from: "article_history.modified_by_id",
          to: "user.id"
        }
      }
    };
  }
}

const extraHelpers = {
  fetchArchive(id) {
    const archive = ArticleHistoryModel.query()
      .where("id", id)
      .where("is_active", true)
      .eager("[createdUser, modifiedUser]");
    return archive;
  }
};

module.exports = withDbHelpers(ArticleHistoryModel, extraHelpers);
