const Joi = require('@hapi/joi')

const { modelValidationWrapper } = require('../common/utils/index')

exports.ArticleCreateValidator = modelValidationWrapper(
    Joi.object({
        title: Joi.string()
            .min(10)
            .max(80)
            .required(),
        content: Joi.string().required(),
        topicId: Joi.number().required(),
    }),
)

exports.ArticleUpdateValidator = modelValidationWrapper(
    Joi.object({
        title: Joi.string()
            .min(10)
            .max(80)
            .required(),
        content: Joi.string().required(),
        changeLog: Joi.string()
            .min(10)
            .max(50)
            .required(),
        topicId: Joi.number().required(),
    }),
)
