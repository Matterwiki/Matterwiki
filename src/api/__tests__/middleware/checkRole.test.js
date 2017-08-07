const { checkIfAdmin } = require("../../middleware/checkRole");
const { NO_ACCESS } = require("../../utils/constants").ERRORS;

describe("checkRole middleware tests", () => {
  describe("checkAdmin tests", () => {
    test("INVALID - if user is passed in", async () => {
      const req = {
        user: {
          id: 2
        }
      };

      const res = {};

      const err = await new Promise(resolve => {
        checkIfAdmin(req, res, nextError => {
          resolve(nextError);
        });
      });

      expect(err.code).toBe(NO_ACCESS.code);
      expect(err.message).toBe(NO_ACCESS.message);
      expect(err.status).toBe(NO_ACCESS.status);
    });

    test("VALID - if admin is passed in", done => {
      const req = {
        user: {
          id: 1
        }
      };

      const res = {};

      checkIfAdmin(req, res, () => {
        // the fact that this is called means that the request has been forwarded
        expect(true).toBe(true);
        done();
      });
    });
  });
});
