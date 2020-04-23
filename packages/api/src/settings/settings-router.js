const { Router } = require('express')

const { uploadLogo } = require('./settings-actions')

module.exports = Router().post('/upload-logo', uploadLogo)
