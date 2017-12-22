const checkAuth = require("../../middleware/checkAuth");
const { INVALID_TOKEN } = require("../../utils/constants").ERRORS;
const { makeJwt } = require("../testUtils/testUtils");
const { user: userFactory } = require("../factories/factories");

describe("checkAuth middleware tests", () => {
  test("(invalid) errors out when token is invalid", () => {
    const invalidTokens = ["", null, undefined];

    invalidTokens.map(async token => {
      const req = {
        headers: {
          "x-access-token": token
        }
      };

      const res = {};

      const err = await new Promise(resolve => {
        checkAuth(req, res, nextError => {
          resolve(nextError);
        });
      });

      expect(err.code).toBe(INVALID_TOKEN.code);
      expect(err.message).toBe(INVALID_TOKEN.message);
      expect(err.status).toBe(INVALID_TOKEN.status);
    });
  });

  test("(invalid) errors out when token fails verification", done => {
    const req = {
      headers: {
        // invalid token
        "x-access-token": "kjsfhewhoifwnkeiohfehiovnio"
      }
    };

    const res = {};

    checkAuth(req, res, err => {
      expect(err.code).toBe(INVALID_TOKEN.code);
      expect(err.message).toBe(INVALID_TOKEN.message);
      expect(err.status).toBe(INVALID_TOKEN.status);

      done();
    });
  });

  test("(valid) sets the decoded user on the request", done => {
    const expectedUser = userFactory.build();

    const req = {
      headers: {
        "x-access-token": makeJwt(expectedUser)
      }
    };

    const res = {};

    checkAuth(req, res, () => {
      const { name, email, about } = expectedUser;

      expect(req.user).toEqual(
        expect.objectContaining({
          name,
          email,
          about
        })
      );

      done();
    });
  });
});
