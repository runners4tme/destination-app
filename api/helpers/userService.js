const Crypto = require('crypto')
const webtoken = require('jsonwebtoken')

module.exports.getSalt = password => {
  return Crypto.randomBytes(16).toString('hex')
}

module.exports.getSaltedPassword = (password, salt) => {
  return Crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex')
}

module.exports.passwordIsInvalid = (rawPassword, encryptedPassword, salt) => {
  return encryptedPassword !== Crypto.pbkdf2Sync(rawPassword, salt, 1000, 64, 'sha512').toString('hex')
}

module.exports.createToken = (id, username, email) => {
  let expiryDate = new Date()
  expiryDate.setDate(expiryDate.getDate() + 7)
  return webtoken.sign({
    _id: id,
    username: username,
    email: email,
    exp: parseInt(expiryDate.getTime() / 1000)
  }, 'Hellofromtheotherside')
}