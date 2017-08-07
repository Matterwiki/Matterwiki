const dream = require("dreamjs");

module.exports = {
  build: (numberOfUsers = 1) => {
    const users = dream
      .schema({
        name: "name",
        email: "email",
        password: "password",
        about: "sentence"
      })
      .generateRnd(numberOfUsers)
      .output();

    return users.map(user => Object.assign({}, user, { role: "USER" }));
  }
};
