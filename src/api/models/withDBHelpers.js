/**
 * This decorator adds extra helpers to the Models for the sake of brevity
 * Supported methods:
 * 1) get
 * 2) getAll
 * 3) insert
 * 4) insertMany
 * 5) delete
 * 6) deleteAll
 * 7) find
 * 8) filterWith
 */
module.exports = Model => {
  const dbModel = Model;
  return {
    Model: dbModel
  };
};
