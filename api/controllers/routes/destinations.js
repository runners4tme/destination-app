const { newDestination, showDestination, updateDestination, removeDestination, showDestinations } = require('../handlers/destination')
const { rawDestinationSchema, idSchema, destinationSchema } = require('../../validators/destinations')

const createDestination = {
  path: '/destinations',
  method: 'POST',
  handler: newDestination,
  options: {
    auth: false,
    validate: {
      payload: rawDestinationSchema
    }
  }
}

const findDestination = {
  path: '/destinations/{id}',
  method: 'GET',
  handler: showDestination,
  options: {
    auth: false,
    validate: {
      params: idSchema
    }
  }
}

const editDestination = {
  path: '/destinations/{id}',
  method: 'PUT',
  handler: updateDestination,
  options: {
    auth: false,
    validate: {
      payload: destinationSchema,
      params: idSchema
    }
  }
}

const deleteDestination = {
  path: '/destinations/{id}',
  method: 'DELETE',
  handler: removeDestination,
  options: {
    auth: false,
    validate: {
      params: idSchema
    }
  }
}

const findDestinations = {
  path: '/destinations',
  method: 'GET',
  handler: showDestinations,
  options: {
    auth: false,
    validate: {
      query: destinationSchema
    }
  }
}

module.exports = [ createDestination, findDestination, editDestination, findDestinations, deleteDestination ]
