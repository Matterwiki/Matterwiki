const yup = require('yup')

const { modelValidationWrapper } = require('../common/utils/index')

exports.TopicValidator = modelValidationWrapper(
    yup.object().shape({
        name: yup.string().min(3).max(50).required(),
        description: yup.string().min(10).max(255),
    }),
)
