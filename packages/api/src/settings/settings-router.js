const express = require('express')
const HttpStatus = require('http-status-codes')

const { checkAuth, checkAdminRole } = require('../common/middleware/index')
const { parseFilesInForm } = require('../common/utils/index')

const router = express.Router()

router.use([checkAuth, checkAdminRole])

router.post('/upload-logo', uploadLogo)

async function uploadLogo(req, res, next) {
    try {
        await parseFilesInForm(req, {
            fieldName: 'logo',
            fileName: 'logo.png',
        })

        res.status(HttpStatus.OK).end()
    } catch (error) {
        next(error)
    }
}

module.exports = router
