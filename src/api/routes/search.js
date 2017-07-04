const express = require("express");

const router = express.Router();

const checkAuth = require("../middleware/checkAuth");

const articleModel = require("../models/article");

const searchArticles = async (req, res, next) => {
  const { query } = req.query;

  try {
    // `search` is an override on the articleModel. Check models/article file
    const articles = await articleModel.search(query);
    res.status(200).json(articles);
  } catch (err) {
    next(err);
  }
};

router.get("/", checkAuth, searchArticles);

module.exports = router;
