const Promise = require("bluebird");
const { assign } = require("lodash");

const objection = require("objection");

/**
 * Extends the base model with additions
 * Defines global hooks and triggers that affects all MODELS!
 */
class BaseModel extends objection.Model {
  /**
   * Runs before update for all models 
   * - removes `created_at` and updates `modified_at`
   */
  $beforeUpdate() {
    if (this.created_at) delete this.created_at;
    this.updated_at = new Date();
  }
}

/**
 * This decorator adds extra helpers to the Models for the sake of brevity.
 * These are pretty basic, they could be extended for more flexibility in the models.
 * Also mushes in anything extra that this brought it in from the model file (eg. search)
 * 
 * TODO in the future, when we need sorting and stuff like that, we could make implement all this INSIDE the BaseModel
 * 
 * 
 * Supported methods:
 * - get
 * - getAll
 * - insert
 * - insertMany
 * - update
 * - TODO updateMany
 * - delete
 * - TODO search
 * - TODO find
 * 
 * Methods with relations `withRels`
 * - get
 * - getAll
 * 
 * @param {any} Model 
 * @param {any} extras 
 * @param {string} [options={ relations: "" }] 
 * @returns 
 */
function withDbHelpers(Model, extras, options = { relations: "" }) {
  const { relations } = options;

  /**
   * GENERAL QUERIES
   */
  const queryMethods = {
    get: id => Model.query().findById(id),

    // NOTE: does not get inactive items by default.
    getAll: (params = {}) => {
      // But, if `is_active`: false is passed as a query param, default will be overriden
      const paramsWithActive = assign({}, { is_active: true }, params);

      return Model.query().where(paramsWithActive);
    },

    insert: item => Model.query().insertAndFetch(item),

    // NOTE: not really performant; O(n) for insert
    insertMany: items =>
      Promise.mapSeries(items, item => Model.query().insertAndFetch(item)),

    update: (id, item) => Model.query().updateAndFetchById(id, item),

    // NOTE: doesn't quite delete, just sets item's `is_active` value to false
    delete: id => Model.query().update({ is_active: false }).where("id", id)
  };

  /**
   * QUERIES THAT INCLUDE RELATIONS - Uses the relations provided as options
   */
  const queryMethodsWithRels = {
    getWithRels: id => Model.query().findById(id).eager(relations),
    getAllWithRels: () => Model.query().eager(relations)
  };

  // Mush em all together cos we like to over-use `assign` ;)
  return assign({ Model }, queryMethods, queryMethodsWithRels, extras);
}

module.exports = { withDbHelpers, BaseModel };
