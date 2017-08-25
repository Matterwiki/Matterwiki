const { NO_ACCESS } = require("../utils/constants").ERRORS;
const { ADMIN } = require("../utils/constants").ROLES;

const checkRole = roleToCheck => (req, res, next) => {
  if (roleToCheck === ADMIN) {
    if (req.user.role === ADMIN) {
      next();
    } else {
      next(NO_ACCESS);
    }
  }
};

// TODO Check other roles as well
module.exports = { checkIfAdmin: checkRole(ADMIN) };
