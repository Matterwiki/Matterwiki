const express = require('express')
const HttpStatus = require('http-status-codes')
const mime = require('mime-types')

const { checkAuth, checkAdminRole } = require('../common/middleware/index')
const {
    parseFilesInForm,
    makeHttpBadRequest,
} = require('../common/utils/index')

const { ERRORS } = require('./settings-constants')

const router = express.Router()

router.use([checkAuth, checkAdminRole])

router.post('/upload-logo', uploadLogo)

async function uploadLogo(req, res, next) {
    try {
        await parseFilesInForm(req, {
            fieldName: 'logo',
            fileName: 'logo',
            acceptedMimeTypes: [mime.lookup('png')],
        })

        res.status(HttpStatus.OK).end()
    } catch (error) {
        next(makeHttpBadRequest(ERRORS.INVALID_FILE_ERR))
    }
}

module.exports = router
