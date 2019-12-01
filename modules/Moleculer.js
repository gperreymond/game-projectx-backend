const debug = require('debug')('application:moleculer'.padEnd(25, ' '))

const EventEmitter = require('events')
const { inherits } = require('util')
const { ServiceBroker } = require('moleculer')

const Configuration = require('../config')

class Moleculer {
  constructor (type, options) {
    debug(`Initializing broker: ${type}`)
    this._type = type
    this._transporter = null
    /* istanbul ignore if */
    if (type) {
      this._transporter = {
        type,
        options
      }
    }
    this._instance = new ServiceBroker({
      transporter: this._transporter,
      logLevel: {
        CACHER: false,
        TRANSIT: false,
        REGISTRY: false,
        BROKER: 'warn',
        TRANSPORTER: 'error',
        '**': 'info'
      },
      cacher: 'Memory',
      logger: Configuration.moleculer.logger,
      metrics: true,
      middlewares: [{
        stopped: () => {
          this.emit('error', new Error('Moleculer has stopped'))
        },
        started: () => {
          debug('Moleculer started')
          this.emit('started')
        }
      }]
    })
    EventEmitter.call(this)
  }

  getInstance () {
    return this._instance
  }

  async start () {
    try {
      await this.getInstance().start()
      return true
    } catch (e) {
      /* istanbul ignore next */
      this.emit('error', e)
      /* istanbul ignore next */
      return Promise.reject(e)
    }
  }
}

inherits(Moleculer, EventEmitter)
module.exports = Moleculer
