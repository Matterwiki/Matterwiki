const { assign } = require("lodash");
const filterMetadata = require("../../middleware/filterMetadata");

const articleFactory = require("../factories/articleFactory");

describe("metadata middleware tests", () => {
  test("#POST should add `created_by` and `modified_by` props to req.body", done => {
    const req = {
      method: "POST",
      user: {
        id: 1
      },
      body: articleFactory.build(1)
    };

    const res = {};

    filterMetadata(req, res, () => {
      expect(req.body.modified_by_id).toEqual(1);
      expect(req.body.created_by_id).toEqual(1);
      done();
    });
  });
  test("#PUT should add `modified_by` prop to req.body", done => {
    const req = {
      method: "PUT",
      user: {
        id: 2
      },
      body: assign({}, articleFactory.build(1), { created_by_id: 1 })
    };

    const res = {};

    filterMetadata(req, res, () => {
      expect(req.body.modified_by_id).toEqual(2);
      expect(req.body.created_by_id).toEqual(1);
      done();
    });
  });
});
