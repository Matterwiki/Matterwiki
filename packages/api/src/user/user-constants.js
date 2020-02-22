exports.ERRORS = {
    DUPLICATE_ADMIN_USER: {
        code: 'ER_DUP_ADMIN',
        message:
            "There was an error creating the admin user. Chances are you're already set up",
    },
    DUPLICATE_EMAIL: {
        code: 'ER_DUP_EMAIL',
        message: 'This email is already in use. Please try another email',
    },
    CREDS_WRONG: {
        code: 'CREDS_WRONG',
        message: 'Email or Password is wrong',
    },
    BAD_PASSWORD: {
        code: 'BAD_PASSWORD',
        message: 'Password is not accurate.',
    },
    INVALID_TOKEN: {
        code: 'INVALID_TOKEN',
        message: 'Failed to authenticate token',
    },
    NO_ACCESS: {
        code: 'NO_ACCESS',
        message: 'You are not authorized to perform this action',
    },
    DELETE_DEFAULT_ADMIN: {
        code: 'DELETE_DEFAULT_ADMIN',
        message: 'Cannot delete admin user',
    },
}

exports.USER_ROLES = {
    ADMIN: 'ADMIN',
    USER: 'USER',
}

exports.SALT_ROUNDS = 10

exports.TOKEN_EXPIRATION = 86400
