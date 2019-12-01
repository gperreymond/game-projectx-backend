const debug = require('debug')('application:main'.padEnd(25, ' '))

const Configuration = require('./config')
const Moleculer = require('./modules/Moleculer')

debug(`Starting application: ${Configuration.env}`)

const captureException = function (err) {
  debug('Something went wrong', err.name)
  console.log(err)
  setTimeout(() => {
    process.exit(1)
  }, 250)
}
process.on('uncaughtException', captureException)
process.on('exit', (n) => {
  if (n !== 0) { captureException(new Error('Node process has exit...')) }
})

const NATS = {
  url: `nats://${Configuration.nats.hostname}:${Configuration.nats.port}`,
  user: Configuration.nats.username,
  pass: Configuration.nats.password,
  maxReconnectAttempts: Configuration.nats.maxReconnectAttempts,
  reconnect: false
}

const start = async function () {
  try {
    // Moleculer on nats (Services)
    const moleculer = new Moleculer('NATS', NATS)
    moleculer.getInstance().createService(require('./services/System'))
    moleculer.getInstance().createService(require('./services/Metrics'))
    moleculer.getInstance().createService(require('./services/ApiGateway'))
    moleculer.on('error', err => { throw err })
    await moleculer.start()
    debug('Application started')
  } catch (e) {
    console.log('******************** ERROR')
    return Promise.reject(e)
  }
}

start().catch(err => {
  console.log(err)
  process.exit(1)
})
