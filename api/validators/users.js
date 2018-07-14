const Joi = require('joi')

module.exports.userSchema = Joi.object().keys({
    username: Joi.string().required(),
    password: Joi.string().required(),
    email: Joi.string().optional()
})