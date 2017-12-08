const express = require("express");

const router = express.Router({ mergeParams: true });

const ArticleHistoryModel = require("../../models/articleHistoryModel");

async function fetchHistoryByArticle(req, res, next) {
  const { id } = req.params;

  try {
    // TODO Orderby Date descending
    const articles = await ArticleHistoryModel.getAll({
      article_id: id
    });

    res.status(200).json(articles);
  } catch (err) {
    next(err);
  }
}

async function fetchHistoryById(req, res, next) {
  const id = req.params.archiveId;
  try {
    let archive = await ArticleHistoryModel.fetchArchive(id);
    // The fetchArchive query returns the archive in an array
    // TODO: Fix this during api refactor round 2
    archive = archive[0];
    res.status(200).json(archive);
  } catch (err) {
    next(err);
  }
}

router.get("/", fetchHistoryByArticle);
router.get("/:archiveId", fetchHistoryById);

module.exports = router;
