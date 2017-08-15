const { apiClient } = require("../testUtils/testUtils");
const { INVALID_TOKEN } = require("../../utils/constants").ERRORS;

module.exports = (apiUrl, methods = ["get", "put", "post", "delete"]) => {
  describe("Unauthenticated tests", () => {
    methods.forEach(verb => {
      test(`401 ${verb} - INVALID - Unauthenticated request`, () =>
        apiClient[verb](apiUrl).expect(401).then(res => {
          expect(res.body.message).toBe(INVALID_TOKEN.message);
        }));
    });
  });
};
