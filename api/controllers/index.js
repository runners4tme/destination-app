const destinations = require('./routes/destinations')
const users = require('./routes/users')

module.exports = [...destinations, ...users]
