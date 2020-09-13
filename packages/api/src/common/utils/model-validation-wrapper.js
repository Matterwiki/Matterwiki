const yup = require('yup')
const { get, set, reduce, first } = require('lodash')

/**
 * Formats errors in a better(ish) way for use in the UI.
 *
 * @param {*} error
 * @returns
 */
function parseValidationError(error) {
    if (error instanceof yup.ValidationError) {
        const { inner } = error
        const formattedError = reduce(
            inner,
            (acc, errorRow) => {
                const existingValue = get(acc, errorRow.path) || []
                const message = first(errorRow.message.split(', but'))
                set(acc, errorRow.path, existingValue.concat(message))

                return acc
            },
            {},
        )

        return { message: formattedError, code: 'VALIDATION_ERR' }
    }

    return error
}

/**
 * Primarily used to reduce boilerplate, this method sets up some convenience options.
 *
 * Ah, such patchwork :)
 *
 * @param {any} yupValidationSchema
 */
module.exports = function modelValidationWrapper(validationSchema) {
    return {
        validator: validationSchema,
        async validate(input) {
            try {
                await validationSchema.validate(input, { abortEarly: false })
                // All good, no errors
                return null
            } catch (error) {
                // Format to a standard friendly structure
                return parseValidationError(error)
            }
        },
    }
}
