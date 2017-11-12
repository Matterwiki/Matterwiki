const HttpStatus = require("http-status-codes");

const { apiClient } = require("../testUtils/testUtils");

/**
 * Asserts if provided verbs for api endpoint return a 404
 * @param {string} api
 * @param {string[]} verbs 
 */
module.exports = (api, verbs) => {
  verbs.forEach(httpVerb => {
    describe(`#${httpVerb} /api/auth/register`, () => {
      it(`(404) should not exist`, () => {
        const endpoint = httpVerb.toLowerCase();
        apiClient[endpoint](api).expect(HttpStatus.NOT_FOUND);
      });
    });
  });
};
