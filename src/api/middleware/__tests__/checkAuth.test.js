const checkAuth = require("../checkAuth");
const { INVALID_TOKEN } = require("../../utils/constants").ERRORS;
const { makeJwt, factories } = require("../../testHelpers/testHelpers");

describe("checkAuth middleware tests", () => {
  test("INVALID - Errors out when token is invalid", () => {
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

  test("INVALID - Errors out when token fails verification", async () => {
    const req = {
      headers: {
        // invalid token
        "x-access-token": "kjsfhewhoifwnkeiohfehiovnio"
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

  test("VALID - Sets the decoded user on the request", async () => {
    const expectedUser = factories.user.build();

    const req = {
      headers: {
        "x-access-token": makeJwt(expectedUser)
      }
    };

    const res = {};

    const checkAuthPromise = new Promise((resolve, reject) => {
      checkAuth(req, res, nextError => {
        if (nextError) return reject(nextError);

        resolve(true);
      });
    });

    checkAuthPromise.then(() => {
      const { name, email, about } = expectedUser;

      expect(req.user).toEqual(
        expect.objectContaining({
          name,
          email,
          about
        })
      );
    });
  });
});
