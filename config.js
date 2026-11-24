/*
 * The JWT signing secret must never be a literal in the repository: anyone who
 * can read the source can mint an admin token (admin is user id 1).
 *
 * Set AUTH_SECRET to a strong random value, e.g. `openssl rand -hex 32`.
 * The process refuses to start with a missing or known-insecure secret.
 */
var INSECURE_DEFAULT = 'thisisasecretkeyforjwtauth';

var authSecret = process.env.AUTH_SECRET;

if (!authSecret || authSecret === INSECURE_DEFAULT) {
    throw new Error(
        'AUTH_SECRET must be set to a strong random value ' +
        '(e.g. `openssl rand -hex 32`). Refusing to start with a missing or ' +
        'known-insecure JWT secret.'
    );
}

module.exports = {
    'auth_secret': authSecret
};
