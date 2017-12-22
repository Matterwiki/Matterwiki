const { assign } = require("lodash");

/**
 * Middleware that adds or removes meta fields
 * - Add `created_by` and or `modified_by` props to incoming data
 *
 * @param {any} req
 * @param {any} res
 * @param {any} next
 */
module.exports = (req, res, next) => {
  if (req.method === "POST") {
    req.body = assign(req.body, {
      created_by_id: req.user.id,
      modified_by_id: req.user.id
    });
  } else {
    req.body = assign(req.body, {
      modified_by_id: req.user.id
    });
  }
  next();
};
