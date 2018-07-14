const Boom = require('boom')
const User = require('../../models/User')
const { getSalt, getSaltedPassword, passwordIsInvalid, createToken } = require('../../helpers/userService')

const createUser = async (username, password, email) => {
  try {
    const salt = getSalt(password)
    const enctryptedPassword = getSaltedPassword(password, salt)
    const newUser = { username, salt, password: enctryptedPassword }
    const user = await User.create(newUser)
    return user
  } catch(error) {
    throw error
  }
}

module.exports.createUser

module.exports.signUpUser = async (request, helper) => {
  try {
    const { payload: { username, password, email }} = request
    const salt = getSalt(password)
    const encryptedPassword = getSaltedPassword(password, salt)
    const newUser = { username, salt, password: encryptedPassword }
    const user = await User.create(newUser)
    const token = createToken(user._id, username, email)
    return helper.response({token}).code(201)
  } catch (error) {
    return Boom.badRequest(error)
  }
}

module.exports.signInUser = async (request, helper) => {
  try {
    const { payload: { username, password }} = request
    const user = await User.findOne({ username: username })
    if (!user) {
      return Boom.unauthorized('invalid username')
    } else if (passwordIsInvalid(password, user.password, user.salt)) {
      return Boom.unauthorized('incorrect password')
    } else {
      const token = createToken(user._id, username, user.email)
      return helper.response({token}).code(200)
    }
  } catch (error) {
    return Boom.badRequest(error)
  }
}
