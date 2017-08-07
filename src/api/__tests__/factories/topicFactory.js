const dream = require("dreamjs");

module.exports = {
  build: (numberOfTopics = 1) => {
    const topics = dream
      .schema({
        name: "word",
        description: "sentence"
      })
      .generateRnd(numberOfTopics)
      .output();

    return topics;
  }
};
