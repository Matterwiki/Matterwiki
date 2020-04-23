const express = require('express')

const { checkAuth, checkAdminRole } = require('../common/middleware/index')
const { uploadLogo } = require('./settings-actions')

const router = express.Router()

router.use([checkAuth, checkAdminRole])

router.post('/upload-logo', uploadLogo)

module.exports = router
