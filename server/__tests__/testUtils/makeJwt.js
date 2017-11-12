const jwt = require("jsonwebtoken");

const config = require("../../../config");
const constants = require("../../constants");

function makeJwt(user) {
  const token = jwt.sign(
    {
      // TODO maybe this needs more fields! :(
      id: user.id,
      email: user.email,
      role: user.role,
      meta: user.meta
    },
    config.AUTH_SECRET,
    { expiresIn: constants.TOKEN_EXPIRATION }
  );

  return token;
}

module.exports = makeJwt;
