const { withDbHelpers } = require("./modelHelpers");
const { Model } = require("objection");

// const options = { uniqueFields: ["key"] };

class AuthModel extends withDbHelpers({})(Model) {
  static get tableName() {
    return "auth";
  }

  // static get hidden() {
  //   return ["password"];
  // }

  static get namedFilters() {
    return {
      lite: builder => builder.select("type", "user_id", "key")
    };
  }

  static get relationMappings() {
    // this is in here to prevent circular deps
    const UserModel = require("./userModel");

    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: UserModel,
        join: {
          from: `auth.user_id`,
          to: `user.id`
        }
      }
    };
  }
}

module.exports = AuthModel;
