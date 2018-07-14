const Boom = require('boom')
const Destination = require('../../models/Destination')

module.exports.newDestination = async (request, helper) => {
  try {
    const payload = { ...request.payload }
    const destination = await Destination.create(payload)
    return helper.response({ id: destination._id }).code(201)
  } catch (error) {
    return Boom.badRequest(error)
  }
}

module.exports.showDestination = async (request, helper) => {
  try {
    const id = request.params.id
    const destination = await Destination.findOne({_id: id})
    return helper.response(destination).code(200)
  } catch (error) {
    return Boom.badRequest(error)
  }
}

module.exports.updateDestination = async (request, helper) => {
  try {
    const id = request.params.id
    const payload = { ...request.payload }
    const destination = await Destination.findOneAndUpdate({_id: id}, payload, {new: true})
    return helper.response(destination).code(200)
  } catch (error) {
    return Boom.badRequest(error)
  }
}

module.exports.removeDestination = async (request, helper) => {
  try {
    const id = request.params.id
    const destination = await Destination.findOneAndRemove({_id: id})
    return helper.response(destination).code(204)
  } catch (error) {
    return Boom.badRequest(error)
  }
}

module.exports.showDestinations = async (request, helper) => {
  try {
    const query = { ...request.query }
    const destinations = await Destination.find(query)
    return helper.response(destinations).code(200)
  } catch (error) {
    return Boom.badRequest(error)
  }
}
