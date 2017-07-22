const dream = require("dreamjs");

module.exports = {
  build: async (numberOfArticles = 1) => {
    const articles = dream
      .schema({
        title: "word",
        body: "paragraph",
        what_changed: "sentence"
      })
      .generateRnd(numberOfArticles)
      .output();

    return articles;
  }
};
