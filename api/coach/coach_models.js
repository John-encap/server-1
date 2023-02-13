const joi = require("@hapi/joi");

exports.mark_practice_session_attendance = joi.object({
    id: joi.number().integer().required(),
    match_id: joi.number().integer().required(),
    attendance: joi.number().required(),
    session_description: joi.string().allow(""),
    feedback: joi.string().allow("")
})
