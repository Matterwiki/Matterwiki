const HttpStatus = require("http-status-codes");

const { apiClient } = require("../testUtils/testUtils");
const { INVALID_TOKEN } = require("../../utils/constants").ERRORS;

module.exports = (apiUrl, methods = ["get", "put", "post", "delete"]) => {
  describe("Unauthenticated tests", () => {
    methods.forEach(verb => {
      test(`#${verb.toUpperCase()} (401) Unauthenticated request`, () =>
        apiClient[verb](apiUrl)
          .expect(HttpStatus.UNAUTHORIZED)
          .then(res => {
            expect(res.body.message).toBe(INVALID_TOKEN.message);
          }));
    });
  });
};
