const HttpStatus = require('http-status-codes')
const mime = require('mime-types')

const {
    parseFilesInForm,
    makeHttpBadRequest,
} = require('../common/utils/index')

const { ERRORS } = require('./settings-constants')

exports.uploadLogo = async function uploadLogo(req, res, next) {
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
