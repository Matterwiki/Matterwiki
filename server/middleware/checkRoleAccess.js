const { FORBIDDEN_ACCESS } = require("../apiErrors");

const checkRoleAccess = (rolesToCheck = []) => (req, res, next) => {
  if (rolesToCheck.indexOf(req.user.role) === -1) {
    return next(FORBIDDEN_ACCESS);
  }

  return next();
};

module.exports = checkRoleAccess;
