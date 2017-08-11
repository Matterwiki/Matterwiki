const dream = require("dreamjs");

module.exports = {
  build: (numberOfArticles = 1) => {
    const articles = dream
      .schema({
        title: "word",
        content: "paragraph",
        change_log: "sentence"
      })
      .generateRnd(numberOfArticles)
      .output();

    return articles;
  }
};
