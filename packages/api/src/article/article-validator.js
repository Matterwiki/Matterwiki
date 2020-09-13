const yup = require('yup')

const { modelValidationWrapper } = require('../common/utils/index')

exports.ArticleCreateValidator = modelValidationWrapper(
    yup.object().shape({
        title: yup.string().min(10).max(80).required(),
        content: yup.string().required(),
        topicId: yup.number().required(),
    }),
)

exports.ArticleUpdateValidator = modelValidationWrapper(
    yup.object().shape({
        title: yup.string().min(10).max(80).required(),
        content: yup.string().required(),
        changeLog: yup.string().min(10).max(50).required(),
        topicId: yup.number().required(),
    }),
)
