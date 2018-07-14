const Joi = require('joi')

module.exports.rawDestinationSchema = Joi.object().keys({
  currency: Joi.string().required(),
  url: Joi.string().required(),
  capitalCity: Joi.string().required(),
  population: Joi.number().required(),
  languages: Joi.array().required(),
  activities: Joi.array().required()
})

module.exports.idSchema = Joi.object().keys({
  id: Joi.string().length(24).required()
})

module.exports.destinationSchema = Joi.object().keys({
  currency: Joi.string().optional(),
  url: Joi.string().optional(),
  capitalCity: Joi.string().optional(),
  population: Joi.number().optional()
})
