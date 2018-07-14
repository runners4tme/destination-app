const hapi = require('hapi')
const routes = require('./api/controllers/index')
const { scheme } = require('./api/helpers/scheme')

const server = new hapi.Server({
  host: 'localhost',
  port: 3000
})

server.route(routes)
server.auth.scheme('token', scheme)
server.auth.strategy('Bearer', 'token')
server.auth.default('Bearer')

module.exports = server
