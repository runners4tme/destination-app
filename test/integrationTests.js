const server = require('../server')
const Destination = require('../api/models/Destination')
const User = require('../api/models/User')
const sinon = require('sinon')
const { expect } = require('code')
const { describe, it } = global

describe('Users', () => {
  describe('POST /users/signup', () => {
    it('should sign up a user', async () => {
      const expectedData = {
        username: 'latani',
        password: 'rockstar123',
        email: 'latani@gmail.com'
      }
      const options = {
        method: 'POST',
        url: '/users/signup',
        payload: expectedData
      }
      const stub = sinon.stub(User, 'create').resolves({ _id: 1 })
      const response = await server.inject(options)
      expect(response.statusCode).to.equal(201)
      expect(response.result.token).to.exist()
      stub.restore()
    })
  })
  describe('POST /users/signin', () => {
    it('should sign in a user', async () => {
      const expectedData = {
        username: 'latani',
        password: 'rockstar123',
        email: 'latani@gmail.com'
      }
      const options = {
        method: 'POST',
        url: '/users/signin',
        payload: expectedData
      }
      const stub = sinon.stub(User, 'findOne').resolves({
        _id: 1,
        username: 'latani',
        password: 'ee9b9d6c9dd6a8d05c06039b2c708f1868ab281b2306eb6fe8e74b2e085e799b8042a278c5967a65f1332a6b89584c5ee0fa1c0a3fb8336c0893d78e150dc80c',
        salt: '2e13128db8808ffd980009aca73b9b7e',
        email: 'latani@gmail.com'
      })
      const response = await server.inject(options)
      expect(response.statusCode).to.equal(200)
      expect(response.result.token).to.exist()
      stub.restore()
    })
  })
})

describe('Destinations', () => {
  describe('POST /destinations', () => {
    it('should create a destination', async () => {
      const expectedData = {
        name: "Cape Town",
        currency: "Rand",
        languages: ["Xhosa", "Afrikaans", "English"],
        population: 12356000,
        interests: ["Surfing", "Fishing"],
        freeWifi: true
      }
      const options = {
        method: 'POST',
        url: '/destinations',
        payload: expectedData
      }
      const stub = sinon.stub(Destination, 'create').resolves({ _id: 1 })
      const response = await server.inject(options)
      expect(response.statusCode).to.equal(201)
      expect(response.result.id).to.equal(1)
      stub.restore()
    })
  })

  describe('POST /destinations with invalid parameters', () => {
    it('should state that invalid request payload', async () => {
      const expectedData = {
        name: "Cape Town",
        currency: "Rand",
        languages: ["Xhosa", "Afrikaans", "English"],
        population: 12356000,
        interests: ["Surfing", "Fishing"],
        freeWifi: true
      }
      const options = {
        method: 'POST',
        url: '/destinations',
        payload: expectedData
      }
      const response = await server.inject(options)
      expect(response.statusCode).to.equal(400)
      expect(response.result.error).to.equal('Bad Request')
      expect(response.result.message).to.equal('Invalid request payload input')
    })
  })

  describe('GET /destination', () => {
    it('should get a destination', async () => {
      const expectedData = {
        name: "Cape Town",
        currency: "Rand",
        languages: ["Xhosa", "Afrikaans", "English"],
        population: 12356000,
        interests: ["Surfing", "Fishing"],
        freeWifi: true
      }
      const options = {
        method: 'GET',
        url: '/destinations/5a173a2336a04f1a048e8589'
      }
      const stub = sinon.stub(Destination, 'findOne').resolves(expectedData)
      const response = await server.inject(options)
      expect(response.statusCode).to.equal(200)
      expect(response.result).to.equal(expectedData)
      stub.restore()
    })
  })

  describe('GET /destination with invalid id', () => {
    it('should state that the id is invalid', async () => {
      const options = {
        method: 'GET',
        url: '/destinations/12345'
      }
      const response = await server.inject(options)
      expect(response.statusCode).to.equal(400)
      expect(response.result.error).to.equal('Bad Request')
      expect(response.result.message).to.equal('Invalid request params input')
    })
  })

  describe('GET /destinations', () => {
    it('should get all destinations', async () => {
      const expectedData = [{
        name: "Cape Town",
        currency: "Rand",
        languages: ["Xhosa", "Afrikaans", "English"],
        population: 12356000,
        interests: ["Surfing", "Fishing"],
        freeWifi: true
      }]
      const options = {
        method: 'GET',
        url: '/destinations'
      }
      const stub = sinon.stub(Destination, 'find').resolves(expectedData)
      const response = await server.inject(options)
      expect(response.statusCode).to.equal(200)
      expect(response.result.length).equal(1)
      stub.restore()
    })
  })

  describe('UPDATE /destination', () => {
    it('should update a destination', async () => {
      const options = {
        method: 'PUT',
        url: '/destinations/5a173a2336a04f1a048e8589',
        payload: {
          population: 41298265,
          freeWifi: false
        }
      }
      const expectedData = {
        name: "Cape Town",
        currency: "Rand",
        languages: ["Xhosa", "Afrikaans", "English"],
        population: 41298265,
        interests: ["Surfing", "Fishing"],
        freeWifi: false
      }
      const stub = sinon.stub(Destination, 'findOneAndUpdate').resolves(expectedData)
      const response = await server.inject(options)
      expect(response.statusCode).to.equal(200)
      expect(response.result).to.equal(expectedData)
      stub.restore()
    })
  })

  describe('DELETE /destination', () => {
    it('should delete a destination', async () => {
      const options = {
        method: 'DELETE',
        url: '/destinations/5a173a2336a04f1a048e8589'
      }
      const stub = sinon.stub(Destination, 'findOneAndRemove').resolves(null)
      const response = await server.inject(options)
      expect(response.statusCode).to.equal(204)
      expect(response.result).to.equal(null)
      stub.restore()
    })
  })
})
