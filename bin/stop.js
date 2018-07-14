const server = require('../server');

(async () => {
  try {
    await server.stop()
    console.log(`Server stopped running at ${server.info.port}`)
  } catch (err) {
    console.log(err)
  }
})();
