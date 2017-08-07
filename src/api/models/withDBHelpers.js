/**
 * This decorator adds extra helpers to the Models for the sake of brevity
 * Supported methods:
 * - get
 * - getAll
 * - insert
 * - insertMany
 * - update
 * - delete
 * - search
 */
module.exports = Model => ({
  Model,
  get: id => Model.query().findById(id),
  getAll: () => Model.query()
});
