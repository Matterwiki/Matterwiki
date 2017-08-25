const dream = require("dreamjs");

module.exports = {
  build: (numberOfUsers = 1, role = "USER") => {
    const users = dream
      .schema({
        name: "name",
        email: "email",
        password: "password",
        about: "sentence",
        role: () => role
      })
      .generateRnd(numberOfUsers)
      .output();

    return users;
  }
};
