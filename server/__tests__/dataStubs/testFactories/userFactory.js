const dream = require("dreamjs");

/**
 * Factory that is used to make random User objects
 */
module.exports = {
  /**
   * This method utilizes dream to make nice mock users
   * @param {number} [numberOfUsers=1] 
   * @param {string} [role="USER"] 
   * @returns 
   */
  build: (numberOfUsers = 1, role = "USER") => {
    dream.customType("role", () => role);
    dream.customType("singleUseToken", () => null);

    const users = dream
      .schema({
        name: "name",
        email: "email",
        password: "password",
        about: "sentence",
        role: "role",
        singleUseToken: "singleUseToken"
      })
      .generateRnd(numberOfUsers)
      .output();

    return users;
  }
};
