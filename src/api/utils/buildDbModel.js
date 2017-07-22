const orm = {
  init(model) {
    this.model = model;
    return this;
  },
  get(params = {}) {
    return this.model.forge(params).fetch();
  },
  getAll(params = {}) {
    return this.model.forge().where(params).fetchAll();
  },
  post(data) {
    return this.model.forge().save(data);
  },
  put(params = {}, data = {}) {
    return this.model.forge(params).save(data, { patch: true });
  },
  delete(params = {}) {
    return this.model.forge(params).destroy();
  }
  // TODO exists(id)
};

// TODO for lack of a better name
function buildDbModel(model) {
  const withOrm = Object.create(orm);
  return withOrm.init(model);
}

module.exports = buildDbModel;
