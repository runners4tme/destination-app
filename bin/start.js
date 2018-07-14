const server = require('../server');
const mongoose = require('mongoose');
const good = require('good');
mongoose.Promise = global.Promise;

const options = {
  ops: {
    interval: 1000
  },
  reporters: {
    myConsoleReporter: [{
      module: 'good-squeeze',
      name: 'Squeeze',
      args: [{log: '*', error: '*', requests: '*', response: '*'}]
    }, {
      module: 'good-console'
    }, 'stdout']
  }
};

(async () => {
  try {
    await server.register({ plugin: good, options })
    await server.start()
    await mongoose.connect('mongodb://127.0.0.1:27017/destinations', { useMongoClient: true })
    console.log(`Server running at ${server.info.port} and connected to the Db!`)
  } catch (err) {
    console.log(err)
  }
})();
