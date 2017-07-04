const { NO_ACCESS } = require("../utils/constants").ERRORS;
const { ADMIN } = require("../utils/constants").ROLES;

const checkRole = roleToCheck => (req, res, next) => {
  if (roleToCheck === ADMIN) {
    // You'd check something else if there were multiple admins in the future
    if (req.user.id === 1) next();
    else {
      const err = {
        status: 403,
        code: NO_ACCESS.code,
        message: NO_ACCESS.message
      };

      next(err);
    }
  }
};

// TODO Check other roles as well
module.exports = { checkIfAdmin: checkRole(ADMIN) };
