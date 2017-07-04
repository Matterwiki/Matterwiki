const bodyParser = require("body-parser");

// create application/json parser
const JSONParser = bodyParser.json();
// create URL parser
const URLParser = bodyParser.urlencoded({ extended: false });

module.exports = {
  URLParser,
  JSONParser
};
