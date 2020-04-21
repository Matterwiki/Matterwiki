exports.ERRORS = {
    DUPLICATE_ADMIN_USER: {
        code: 'ER_DUP_ADMIN',
        message: 'Admin user already exists.',
    },
    DUPLICATE_EMAIL: {
        code: 'ER_DUP_EMAIL',
        message: 'This email is already in use. Please try another email',
    },
    CREDS_WRONG: {
        code: 'CREDS_WRONG',
        message: 'Email or Password is wrong',
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
