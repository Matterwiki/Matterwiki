const { Model } = require("objection");
const { withDbHelpers } = require("./modelHelpers");

const options = { uniqueFields: ["name"] };

class TopicModel extends withDbHelpers(options)(Model) {
  static get tableName() {
    return "topic";
  }

  static get namedFilters() {
    return {
      lite: builder => builder.select("name", "description")
    };
  }

  static get relationMappings() {
    const ArticleModel = require("./articleModel");
    const UserModel = require("./userModel");

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

module.exports = TopicModel;
