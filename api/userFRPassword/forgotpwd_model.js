const joi = require("@hapi/joi");

exports.forgot_password_model = joi.object({
    email: joi.string().email().required()
})

exports.reset_password_model = joi.object({
    user_id: joi.number().integer().required(),
    newPassword: joi.string().min(8).max(12).required(),
    confirmNewPassword: joi.string().min(8).max(12).required()
})