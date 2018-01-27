const express = require("express");
const HttpStatus = require("http-status-codes");

const router = express.Router({ mergeParams: true });

const ArticleHistoryModel = require("../../models/articleHistoryModel");

const { RESULT_LIMITS } = require("../../utils/constants");
const { getCursorQuery } = require("../../utils/queryHelpers");

async function fetchHistoryByArticle(req, res, next) {
  const { id: article_id } = req.params;

  try {
    const articles = await ArticleHistoryModel.query()
      .where({ article_id })
      .andWhere(...getCursorQuery(req.query))
      .withRels()
      .orderBy("updated_at", "desc")
      .limit(req.query.limit || RESULT_LIMITS.ARCHIVES);

    res.status(HttpStatus.OK).json(articles);
  } catch (err) {
    console.log(err);
    next(err);
  }
}

async function fetchHistoryById(req, res, next) {
  const { id: article_id, archiveId: id } = req.params;

  try {
    const archive = await ArticleHistoryModel.query()
      .where({ article_id })
      .findById(id)
      .withRels();

    res.status(HttpStatus.OK).json(archive);
  } catch (err) {
    next(err);
  }
}

router.get("/", fetchHistoryByArticle);
router.get("/:archiveId", fetchHistoryById);

module.exports = router;
