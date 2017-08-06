const Model = require("objection").Model;
const withDBHelpers = require("./withDBHelpers");

class TopicModel extends Model {
  static get tableName() {
    return "topic";
  }

  static relationMappings = {
    articles: {
      relation: Model.HasManyRelation,
      modelClass: `${__dirname}/ArticleModel`,
      join: {
        from: "topic.id",
        to: "article.topic_id"
      }
    },
    createdUser: {
      relation: Model.BelongsToOneRelation,
      modelClass: `${__dirname}/UserModel`,
      join: {
        from: "topic.created_by_id",
        to: "user.id"
      }
    },
    modifiedUser: {
      relation: Model.BelongsToOneRelation,
      modelClass: `${__dirname}/UserModel`,
      join: {
        from: "topic.modified_by_id",
        to: "user.id"
      }
    }
  };
}

module.exports = withDBHelpers(TopicModel);
