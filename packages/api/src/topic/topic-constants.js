exports.ERRORS = {
    DUPLICATE_TOPIC: {
        code: 'ER_DUP_TOPIC',
        message: 'This topic already exists. Please use another name',
    },
    DELETE_DEFAULT_TOPIC: {
        code: 'DELETE_DEFAULT_TOPIC',
        message: 'Cannot delete default topic',
    },
    READONLY_UNCATEGORISED: {
        code: 'READONLY_UNCATEGORISED',
        message: 'Cannot make changes to "uncategorized" topic.',
    },
}
