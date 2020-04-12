const multer = require('multer')
const Promise = require('bluebird')

/**
 * Util that parses incoming request and returns any file it may contain.
 *
 * Must only be used with `POST` and for `multipart/form-data` content types
 *
 * TODO: Add multiple file support when needed
 *
 * @param {*} req - Express req object
 * @param {object} options
 * @param {boolean} [options.fileName] - Name of the file
 * @param {boolean} [options.fieldName] - Name of the form field that has the file
 */
module.exports = function parseFilesInForm(req, options) {
    return new Promise((resolve, reject) => {
        options = options || {}
        if (!options.fieldName) {
            throw new Error('Missing arg. `fieldName` is required.')
        }
        if (!options.fileName) {
            throw new Error('Missing arg. `fileName` is required.')
        }

        const upload = multer({
            storage: multer.diskStorage({
                destination(req, file, cb) {
                    cb(null, process.env.FILE_STORAGE_PATH)
                },
                filename(req, file, cb) {
                    cb(null, options.fileName)
                },
            }),
        })

        return upload.single(options.fieldName)(req, {}, function (err) {
            if (err) reject(err)

            const { file } = req
            // Clean up multer's work on the request object
            delete req.file

            resolve(file)
        })
    })
}
