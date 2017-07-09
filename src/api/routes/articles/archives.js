const express = require("express");

const router = express.Router();

const { NOT_FOUND } = require("../../utils/constants").ERRORS;

const archiveModel = require("../../models/archive");
const userModel = require("../../models/user");

const fetchArchivesByArticle = async (req, res, next) => {
  const { id } = req.params;

  try {
    const articles = await archiveModel.getAll({ article_id: id });

    if (!articles) {
      return next(NOT_FOUND);
    }

    res.status(200).json(articles);
  } catch (err) {
    next(err);
  }
};

const fetchArchiveById = async (req, res, next) => {
  const { id, archiveId } = req.params;
  try {
    let archive = await archiveModel.get({ id: archiveId, article_id: id });

    if (!archive) {
      return next(NOT_FOUND);
    }

    archive = archive.toJSON();

    // NOTE This is not RESTful. Generally, articles endpoints should ONLY return articles.
    // TODO Make the client request for these resources
    archive.user = await userModel.get({ id: archive.user_id });

    res.status(200).json(archive);
  } catch (err) {
    next(err);
  }
};

router.get("/", fetchArchivesByArticle);
router.get("/:archiveId", fetchArchiveById);

module.exports = router;
