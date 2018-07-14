const Boom = require('boom')
const jwt = require('jsonwebtoken')

const authStatus = token => {
  return {
    authTokenNotProvided: !!token,
    authTokenLengthIsInvalid: token.split('.').length !== 3,
    authTypeIsInvalid: token.split('.')[0].split(' ')[0] !== 'Bearer'
  }
}

const scheme = (server, options) => {
  return {
    authenticate: (request, helper) => {
      try {
        const { authorization } = request.headers
        const { authTokenNotProvided, authTokenLengthIsInvalid, authTypeIsInvalid } = authStatus(authorization)
        if (authTokenNotProvided) {
          return Boom.unauthorized('missing token', 'Bearer')
        } else {
          if (authTokenLengthIsInvalid) {
            return Boom.unauthorized('invalid token', 'Bearer')
          } else if (authTypeIsInvalid) {
            return Boom.unauthorized('invalid token type', 'Bearer')
          } else {
            const token = authorization.split(' ')[1]
            const payload = jwt.verify(token, 'Hellofromtheotherside')
            return helper.authenticated({ credentials: payload })
          }
        }
      } catch (error) {
        return Boom.unauthorized(error)
      }
    }
  }
}

module.exports.authStatus = authStatus
module.exports.scheme = scheme
