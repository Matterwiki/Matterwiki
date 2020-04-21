const Joi = require('@hapi/joi')
const { get, set, reduce } = require('lodash')

/**
 * Formats errors in a better(ish) way for use in the UI.
 *
 * @param {*} error
 * @returns
 */
function parseJoiError(error) {
    if (error instanceof Joi.ValidationError) {
        const { details } = error
        const formattedError = reduce(
            details,
            (acc, errorRow) => {
                const existingValue = get(acc, errorRow.path) || []
                set(acc, errorRow.path, existingValue.concat(errorRow.message))

                return acc
            },
            {},
        )

        return { message: formattedError, code: 'JOI_VALIDATION_ERR' }
    }

    return error
}

/**
 * Primarily used to reduce boilerplate, this method sets up some convenience options.
 *
 * Ah, such patchwork :)
 *
 * @param {any} joiValidationSchema
 */
module.exports = function modelValidationWrapper(joiValidationSchema) {
    const schema = joiValidationSchema.options({ abortEarly: false })
    return {
        validator: schema,
        async validate(input) {
            try {
                await schema.validateAsync(input)
                // All good, no errors
                return null
            } catch (error) {
                // Format to a standard friendly structure
                return parseJoiError(error)
            }
        },
    }
}
