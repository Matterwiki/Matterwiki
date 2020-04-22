exports.ERRORS = {
    DUPLICATE_TITLE: {
        code: 'ER_DUP_TITLE',
        message: 'The article title must be unique.',
    },
    DELETE_OTHERS_ARTICLES: {
        code: 'DELETE_OTHERS_ARTICLES',
        message: 'Cannot delete articles that were authored by someone else.',
    },
    TOPIC_INVALID: {
        code: 'TOPIC_INVALID',
        message: 'Topic invalid. Maybe it was deleted?',
    },
    INVALID_FILE_ERR: {
        code: 'INVALID_FILE_ERR',
        message: 'Invalid file. Only gif, png and jpg allowed.',
    },
}

exports.DEFAULT_CHANGELOG_MESSAGE = 'Another drop in the ocean of knowledge'
