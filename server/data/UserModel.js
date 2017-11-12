const DBModel = require("./DBModel");
const { collectionMap } = require("../constants");

/**
 * Model for the User collection
 * @class UserModel
 * @extends {DBModel}
 */
class UserModel extends DBModel {
  constructor() {
    super(collectionMap.USER);

    this.uniqueFields = this.uniqueFields.concat(["email"]);
  }
}

module.exports = new UserModel();
