const { signUpUser, signInUser } = require('../handlers/user')
const { userSchema } = require('../../validators/users')

const signUp = {
  path: '/users/signup',
  method: 'POST',
  handler: signUpUser,
  options: {
    auth: false,
    validate: {
      payload: userSchema
    }
  }
}

const signIn = {
  path: '/users/signin',
  method: 'POST',
  handler: signInUser,
  options: {
    auth: false,
    validate: {
      payload: userSchema
    }
  }
}

module.exports = [ signUp, signIn ]
