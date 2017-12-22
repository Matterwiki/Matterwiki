const jwt = require("jsonwebtoken");

const { authSecret } = require("../config");
const { INVALID_TOKEN } = require("../utils/constants").ERRORS;

module.exports = (req, res, next) => {
  // get the token
  const token = req.headers["x-access-token"];

  if (!token) {
    return next(INVALID_TOKEN);
  }

  try {
    // verify token
    const decodedToken = jwt.verify(token, authSecret);

    // valid token
    if (decodedToken) {
      // set the decoded user on the `req` obj
      // TODO make sure the decoded user is present and active in DB
      req.user = decodedToken;
      return next();
    }
  } catch (err) {
    // TODO can't we do something with `err` that catch gives us?
    // invalid token, send 401
    return next(INVALID_TOKEN);
  }
};
