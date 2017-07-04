const jwt = require("jsonwebtoken");

const { authSecret } = require("../utils/config");
const { NO_TOKEN, INVALID_TOKEN } = require("../utils/constants").ERRORS;

module.exports = (req, res, next) => {
  // get the token
  const token = req.headers["x-access-token"];

  if (!token) {
    const err = {
      status: 401,
      code: NO_TOKEN.code,
      message: NO_TOKEN.message
    };

    return next(err);
  }

  try {
    // verify token
    const decodedToken = jwt.verify(token, authSecret);

    // valid token
    if (decodedToken) {
      // set the decoded user on the `req` obj
      req.user = decodedToken;
      return next();
    }
  } catch (err) {
    // TODO can't we do something with `err` that catch gives us?
    // invalid token, send 401
    err = {
      status: 401,
      code: INVALID_TOKEN.code,
      message: INVALID_TOKEN.message
    };

    return next(err);
  }
};
