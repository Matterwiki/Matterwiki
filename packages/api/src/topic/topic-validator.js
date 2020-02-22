const Joi = require('@hapi/joi')

const { modelValidationWrapper } = require('../common/utils/index')

exports.TopicValidator = modelValidationWrapper(
    Joi.object({
        name: Joi.string()
            .min(3)
            .max(50)
            .required(),
        description: Joi.string()
            .min(10)
            .max(255),
    }),
)
