const Promise = require("bluebird");

/**
 * This decorator adds extra helpers to the Models for the sake of brevity
 * These are pretty basic, they could be extended for more flexibility in the models
 * Also mushes in anything extra that this brought it in from the model file (eg. search)
 * 
 * Supported methods:
 * - get
 * - getAll
 * - insert
 * - insertMany
 * - update
 * - delete
 */
module.exports = (Model, extras) =>
  Object.assign(
    {},
    {
      Model,
      get: id => Model.query().findById(id),

      // NOTE: does not get inactive items by default.
      getAll: (params = {}) => {
        // But, if `is_active`: false is passed as a query param, default will be overriden
        const paramsWithActive = Object.assign({}, { is_active: true }, params);
        return Model.query().where(paramsWithActive);
      },

      insert: item => Model.query().insertAndFetch(item),

      // NOTE: not really performant; O(n) for insert
      insertMany: items =>
        Promise.mapSeries(items, item => Model.query().insertAndFetch(item)),

      update: (id, item) => Model.query().updateAndFetchById(id, item),

      // NOTE: doesn't quite delete, just sets item's `is_active` col to false
      delete: id => Model.query().update({ is_active: false }).where("id", id)
    },
    extras
  );
