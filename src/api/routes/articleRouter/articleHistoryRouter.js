const express = require('express')
const HttpStatus = require('http-status-codes')

const router = express.Router({ mergeParams: true })

const ArticleHistoryModel = require('../../models/articleHistoryModel')

const { RESULT_LIMITS } = require('../../utils/constants')

async function fetchHistoryByArticle (req, res, next) {
  const { id } = req.params

  const limit = parseInt(req.query.limit || RESULT_LIMITS.ARCHIVES, 10)
  const pageNumber = parseInt(req.query.page || 1, 10)
  const pageOffset = (pageNumber - 1) * limit

  try {
    const archives = await ArticleHistoryModel.query()
      .where({ article_id: id })
      .withRels()
      .orderBy('updated_at', 'desc')
      .offset(pageOffset)
      .limit(limit)

    const totalRecords = (await ArticleHistoryModel.query().where({ article_id: id })).length
    const totalPages = Math.ceil(totalRecords / limit)
    const remainingPages = totalPages - pageNumber

    res.status(HttpStatus.OK).json({
      archives,
      meta: {
        totalRecords,
        totalPages,
        remainingPages,
        pageNumber
      }
    })
  } catch (err) {
    console.log(err)
    next(err)
  }
}

async function fetchHistoryById (req, res, next) {
  const { id: articleId, archiveId: id } = req.params

  try {
    const archive = await ArticleHistoryModel.query()
      .where({ article_id: articleId })
      .findById(id)
      .withRels()

    res.status(HttpStatus.OK).json(archive)
  } catch (err) {
    next(err)
  }
}

router.get('/', fetchHistoryByArticle)
router.get('/:archiveId', fetchHistoryById)

module.exports = router
