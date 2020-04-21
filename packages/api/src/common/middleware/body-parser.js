const bodyParser = require('body-parser')

exports.URLParser = bodyParser.urlencoded({ extended: false })
exports.JSONParser = bodyParser.json()
