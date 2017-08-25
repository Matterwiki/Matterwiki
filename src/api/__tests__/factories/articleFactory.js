const dream = require("dreamjs");

module.exports = {
  build: (numberOfArticles = 1) => {
    const articles = dream
      .schema({
        title: "word",
        // TODO mock out a draft JSON object for this
        content: "paragraph",
        change_log: "sentence"
      })
      .generateRnd(numberOfArticles)
      .output();

    return articles;
  }
};
