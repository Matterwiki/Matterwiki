const { Router } = require('express')

const { checkAdminRole } = require('../common/middleware/index')

const { uploadLogo } = require('./settings-actions')

module.exports = Router().use(checkAdminRole).post('/upload-logo', uploadLogo)
