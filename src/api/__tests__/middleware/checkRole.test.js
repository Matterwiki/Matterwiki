const { checkIfAdmin } = require("../../middleware/checkRole");
const { NO_ACCESS } = require("../../utils/constants").ERRORS;
const { ROLES } = require("../../utils/constants");

describe("checkRole middleware tests", () => {
  describe("checkAdmin tests", () => {
    test("(invalid) if user is passed in", done => {
      const req = {
        user: {
          id: 2,
          role: ROLES.USER
        }
      };

      const res = {};

      checkIfAdmin(req, res, err => {
        expect(err.code).toBe(NO_ACCESS.code);
        expect(err.message).toBe(NO_ACCESS.message);
        expect(err.status).toBe(NO_ACCESS.status);

        done();
      });
    });

    test("(valid) if admin is passed in", done => {
      const req = {
        user: {
          id: 1,
          role: ROLES.ADMIN
        }
      };

      const res = {};

      checkIfAdmin(
        req,
        res,
        // the fact that this is called means that the request is being forwarded
        done
      );
    });
  });
});
