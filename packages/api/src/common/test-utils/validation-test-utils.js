const { JOI_VALIDATION_ERR_CODE } = require('../constants')

/**
 * Shorthands for making validation testing easier
 */
exports.validationTestRunner = (payloadBuilder, validator) => async (
    t,
    input,
    expected,
) => {
    const payload = Object.assign(payloadBuilder(), input)
    const error = await validator.validate(payload)
    t.deepEqual(
        {
            code: JOI_VALIDATION_ERR_CODE,
            message: expected,
        },
        error,
    )
}
