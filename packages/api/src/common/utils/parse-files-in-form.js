const multer = require('multer')
const mime = require('mime-types')
const Promise = require('bluebird')

/**
 * Util that parses incoming request, saves and returns any file it may contain.
 *
 * Must only be used with `POST` and for `multipart/form-data` content types
 *
 * TODO: Add multiple file support when needed
 *
 * @param {*} req - Express req object
 * @param {object} options
 * @param {boolean} [options.fileName] - Name of the saved file. Original file's extension is used.
 * @param {boolean} [options.fieldName] - Name of the form field that has the file
 * @param {Array} [options.acceptedMimeTypes] - list of accepted mimeTypes
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

        options.acceptedMimeTypes = options.acceptedMimeTypes || []

        const upload = multer({
            fileFilter(req, file, cb) {
                if (!options.acceptedMimeTypes.length) return cb(null, true)
                cb(null, options.acceptedMimeTypes.includes(file.mimetype))
            },
            storage: multer.diskStorage({
                destination(req, file, cb) {
                    cb(null, process.env.FILE_STORAGE_PATH)
                },
                filename(req, file, cb) {
                    const [fileNameSansExt] = options.fileName.split('.')
                    const ext = mime.extension(file.mimetype)

                    cb(null, `${fileNameSansExt}.${ext}`)
                },
            }),
        })

        upload.single(options.fieldName)(req, {}, function (err) {
            if (err) reject(err)

            const { file } = req

            if (!file) return reject(new Error('Invalid file'))

            // Clean up multer's work on the request object
            delete req.file

            resolve(file)
        })
    })
}
