const { server } = require('./config')
const app = require('./app')

// TODO use morgan or something for logging

console.info('Starting the Matterwiki server..')

app.listen(server.port, error => {
  if (error) {
    console.error('Unable to listen for connections', error)
    process.exit(10)
  }
  console.info(`Express is listening on http://${server.ip}:${server.port}`)
})
