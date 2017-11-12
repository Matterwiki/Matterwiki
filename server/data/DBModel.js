const { merge, isArray } = require("lodash");

const dbHelpers = require("../../db");

/**
 * This is the base model to access the database
 * Resource models would have to extend this class to use shorthand methods
 * 
 * @class DBModel 
 */
class DBModel {
  /**
   * Creates an instance of LokiDBModel.
   * @param {string} collectionName 
   * @memberof DBModel
   */
  constructor(collectionName) {
    // Store this so it need not be passed around
    this.collectionName = collectionName;

    // Set the fields that need to have unique constraints on them
    this.uniqueFields = [];

    // escape hatch to access DB stuff via resource models
    // is not really safe to use
    this.dbHelpers = dbHelpers;
  }

  /**
   * Short hand to get the collection.
   * If collection is not found, it adds it to the DB with constraints.
   * @memberof DBModel
   */
  retrieveCollection() {
    return dbHelpers.loadDb().then(mwDb => {
      let collection = mwDb.getCollection(this.collectionName);

      if (collection === null) {
        // add collection if not found, with constraints
        collection = mwDb.addCollection(this.collectionName, {
          unique: this.uniqueFields
        });
      }

      return collection;
    });
  }

  /**
   * Gets the object with provided ID
   * @param {number} id 
   * @memberof DBModel
   */
  get(id) {
    return this.retrieveCollection().then(collection => collection.get(id));
  }

  /**
   * Fetches an array of items from the collection
   * @param {Object} filters - to be used for further filtering (a mongo-like query object)
   * @memberof DBModel
   */
  getMany(filters = {}) {
    return this.retrieveCollection().then(collection =>
      collection.find(filters)
    );
  }

  /**
   * Inserts provided object into the collection
   * @param {Object|Object[]} data 
   * @memberof DBModel
   */
  insert(data) {
    return this.retrieveCollection().then(collection => {
      // event hook that copies the auto incrementing $loki to an `id` property
      // helps to hide `$loki` as an implementation detail
      function insertCallback(insertData) {
        if (!isArray(insertData)) {
          return merge(insertData, { id: insertData.$loki });
        }

        // For bulk inserts
        insertData.forEach(item => {
          merge(item, { id: item.$loki });
        });
      }

      const eventListenerId = collection.on("insert", insertCallback);

      const insertedData = collection.insert(data);

      // remove eventListener after inserting
      collection.removeListener(eventListenerId);

      return insertedData;
    });
  }

  /**
   * Updates item at ID
   * TODO better way to achieve this.. there is the update(doc) method as well
   * @param {number} id 
   * @param {Object} data 
   */
  update(id, data) {
    return this.retrieveCollection().then(collection => {
      const itemToUpdate = merge(collection.findOne({ $loki: id }), data);

      const updatedItem = collection.update(itemToUpdate);

      return updatedItem;
    });
  }

  updateMany(queryObject, data) {}

  remove(id) {}

  removeMany(queryOptions) {}

  count(queryOptions) {}

  exists(queryOptions) {}
}

module.exports = DBModel;
