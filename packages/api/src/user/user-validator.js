const yup = require('yup')

const { modelValidationWrapper } = require('../common/utils/index')

exports.UserValidator = modelValidationWrapper(
    yup.object().shape({
        name: yup.string().min(3).max(50).required(),
        email: yup.string().email().required(),
        // TODO: Password limitations
        password: yup.string().required(),
        about: yup
            .string()
            .transform(v => v || null)
            .min(10)
            .max(255)
            .optional()
            .nullable(),
    }),
)

exports.UserUpdateValidator = modelValidationWrapper(
    yup.object().shape({
        name: yup.string().min(3).max(50).required(),
        email: yup.string().email().required(),
        // TODO: Password limitations
        password: yup.string(),
        about: yup
            .string()
            .transform(v => v || null)
            .min(10)
            .max(255)
            .optional()
            .nullable(),
    }),
)

exports.LoginValidator = modelValidationWrapper(
    yup.object().shape({
        email: yup.string().email().required(),
        password: yup.string().required(),
    }),
)
