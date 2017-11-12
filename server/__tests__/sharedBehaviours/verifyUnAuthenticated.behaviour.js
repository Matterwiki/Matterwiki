const { apiClient } = require("../testUtils/testUtils");
const { INVALID_TOKEN } = require("../../apiErrors");

/**
 * Shared behavour tests that verify a tokenless user does not have access to provided API route
 * @param {any} apiUrl 
 * @param {string} [methods=["get", "put", "post", "delete"]] 
 */
function verifyUnAuthenticatedBehaviour(
  apiUrl,
  methods = ["get", "put", "post", "delete"]
) {
  describe("Unauthenticated tests", () => {
    methods.forEach(verb => {
      test(`401 ${verb} - INVALID - Unauthenticated request`, () =>
        apiClient[verb](apiUrl)
          .expect(401)
          .then(res => {
            expect(res.body.message).toBe(INVALID_TOKEN.message);
          }));
    });
  });
}

module.exports = verifyUnAuthenticatedBehaviour;
