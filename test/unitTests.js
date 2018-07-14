const { getSalt, getSaltedPassword, passwordIsInvalid, createToken } = require('../api/helpers/userService')
const { createUser } = require('../api/controllers/handlers/user')
const { authStatus } = require('../api/helpers/scheme')
const { expect } = require('code')
const { describe, it } = global
const sinon = require('sinon')

describe('authStatus', () => {
  describe('status with valid token', () => {
    it('should validate the token', async () => {
      const validToken = 'dasvcjaegv*&^@je.bvaa@#&^*&#hjdakj.fcthh@#%^@%wdfhqcv'
      const result = authStatus(validToken)
      expect(result.authTokenNotProvided).to.be.falsy()
      expect(result.authTokenLengthIsInvalid).to.be.falsy()
      expect(result.authTypeIsInvalid).to.be.falsy()
    })
  })
  describe('status with invalid token', () => {
    it('should invalidate the token', async () => {
      const inValidToken = 'hgdsaugkdwgg@&^36#7VGSDHwgqgdwyka'
      const result = authStatus(inValidToken)
      expect(result.authTokenNotProvided).to.be.truthy()
      expect(result.authTokenLengthIsInvalid).to.be.truthy()
      expect(result.authTypeIsInvalid).to.be.truthy()
    })
  })
})

describe('userService', () => {
  describe('getSalt', () => {
    it('should get salt', async () => {
      const password = 'password'
      const result = getSalt(password)
      expect(result).to.be.typeof('string')
      expect(result.length).to.be.equal(16)
    })
  })
  describe('getSaltedPassword', () => {
    it('should salted password', async () => {
      const salt = '43f716b253be173f9fa75013ea27fa42'
      const result = getSaltedPassword(password, salt)
      expect(result).to.be.typeof('string')
      expect(result.length).to.be.equal(64)
    })
  })
  describe('passwordIsInvalid', () => {
    it('should validate the password', async () => {
      const password = 'password'
      const saltedPassword = 'e876483449e05e9b2754fad90717e92ef4195ad3f7f49f613783613acb9c9844395de4f8f94381cc56f37786d0d70f74077564268871c67caddc8683b206b057'
      const isPasswordInvalid = passwordIsInvalid(password, saltedPassword, salt)
      expect(result).to.be.typeof('boolean')
      expect(result).to.be.truthy()
    })
  })
  describe('createToken', () => {
    it('should create a token', async () => {
      const user = { id: '12345', username: 'les', email: 'les@gmail.com' }
      const result = createToken(user)
      expect(result).to.be.typeof('string')
      expect(result.split('.').length).to.be.equal(3)
    })
  })
})

describe('Users', () => {
  describe('createUser', () => {
    it('should create a user', async () => {
      const expectedData = {
        username: 'latani',
        password: 'rockstar123',
        email: 'latani@gmail.com'
      }
      const stub = sinon.stub(User, 'create').resolves({ _id: 1 })
      const result = await createUser(expectedData)
      expect(result._id).to.be.equal(1)
      stub.restore()
    })
  })
})
