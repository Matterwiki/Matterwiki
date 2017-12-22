const { omit, pick } = require("lodash");
const unique = require("objection-unique");

/**
 * Plugin that has some useful fns for all models.
 *
 * All of the following are ideas from existing ObjectionJS mixins by the community.
 */
function withDbHelpers(options = {}) {
  return Model => {
    /**
     * A custom query builder with defaults
     *
     * @class CustomerQueryBuilder
     * @extends {Model.QueryBuilder}
     */
    class CustomerQueryBuilder extends Model.QueryBuilder {
      constructor(...args) {
        super(...args);

        // TODO find a way to conditionally filter active items
        // As a workaround for now, use knex for fetching inactive items

        // All models will only query active items by default
        return this.where({ is_active: true });
      }

      /**
       * Adds an eager load query to the chain, so that relations could be loaded as well.
       * Requires options.eagerRelations to be defined
       * @returns
       * @memberof CustomerQueryBuilder
       */
      withRels() {
        return options.eagerRelations ? this.eager(options.eagerRelations) : this;
      }

      /**
       * Never delete anything, just patch the item to be inactive
       *
       * @returns
       * @memberof CustomerQueryBuilder
       */
      delete() {
        return this.patch({ is_active: false });
      }

      /**
       * Never delete anything, just patch the item to be inactive
       *
       * @returns
       * @memberof CustomerQueryBuilder
       */
      deleteById(id) {
        return this.patch({ is_active: false }).where({ id });
      }
    }

    const uniqueFieldConfig = {
      identifiers: ["id"],
      fields: options.uniqueFields ? options.uniqueFields : ["id"]
    };

    return class extends unique(uniqueFieldConfig)(Model) {
      static get QueryBuilder() {
        return CustomerQueryBuilder;
      }

      /**
       * Setting updated_at property before update correctly
       *
       */
      $beforeUpdate(opt) {
        // patches dont need the following; they are the escape hatch
        if (opt.patch) return;

        if (this.created_at) delete this.created_at;
        this.updated_at = new Date();
      }

      // From: https://github.com/oscaroox/objection-visibility
      $formatJson(json) {
        let superJson = super.$formatJson(json);

        if (!this.constructor.hidden && !this.constructor.visible) return superJson;

        if (this.constructor.visible) {
          superJson = pick(superJson, this.constructor.visible);
        }

        if (this.constructor.hidden) {
          superJson = omit(superJson, this.constructor.hidden);
        }

        return superJson;
      }
    };
  };
}

module.exports = { withDbHelpers };
