const debug = require('debug')('application:gateway'.padEnd(25, ' '))

const colors = require('colors')
const Hapi = require('@hapi/hapi')
const Inert = require('@hapi/inert')
const Vision = require('@hapi/vision')
const HapiSwagger = require('hapi-swagger')

const Configuration = require('../../config')

module.exports = {
  name: 'ApiGateway',
  async created () {
    debug(`Service ${this.name} started`)
    await this.start()
  },
  methods: {
    async initializeRoutes () {
      /* istanbul ignore next */
      if (this._routes) return
      this._routes = true
      this.broker.services.map(service => {
        Object.keys(service.actions).map(key => {
          const { gateway: metadata } = service.metadata[key] || false
          if (metadata) {
            let selectedColor = 'green'
            if (metadata.options.auth === 'simple') {
              selectedColor = 'yellow'
              metadata.options.plugins['hapi-swagger'].security = [{ BasicAuth: [] }]
            }
            debug(`Route ${colors[selectedColor](metadata.method)} ${colors[selectedColor](metadata.path)} is registered with auth: ${colors[selectedColor](metadata.options.auth)}`)
            this._server.route({
              ...metadata,
              async handler ({ $moleculer, payload, params, query }) {
                try {
                  const data = await $moleculer.call(`${service.name}.${key}`, { ...payload, ...params, ...query })
                  return data
                } catch (e) {
                  /* istanbul ignore next */
                  $moleculer.logger.error(`${service.name}.${key}`, e.message)
                  /* istanbul ignore next */
                  return Promise.reject(e)
                }
              }
            })
          }
        })
      })
    },
    async start () {
      /* istanbul ignore next */
      if (this._server) return
      this._server = new Hapi.Server({
        host: Configuration.gateway.hostname,
        port: Configuration.gateway.port,
        routes: {
          cors: true
        }
      })
      // inert and vision
      await this._server.register([Inert, Vision])
      debug('Plugin Inert, Vision are registered')
      // swagger auto documentation
      const swaggerOptions = {
        info: {
          title: 'API Documentation',
          version: Configuration.version
        },
        consumes: ['application/x-www-form-urlencoded', 'application/json'],
        payloadType: 'form',
        securityDefinitions: {
          BasicAuth: { type: 'basic' },
          ApiKeyAuth: { type: 'apiKey', in: 'header', name: 'Authorization' }
        },
        schemes: ['http', 'https'],
        grouping: 'tags'
      }
      await this._server.register({ plugin: HapiSwagger, options: swaggerOptions })
      debug('Plugin HapiSwagger is registered')
      await this.initializeRoutes()
      this._server.decorate('request', '$moleculer', this.broker) // add moleculer instance to request
      await this._server.start()
      debug('HapiJS server started')
    }
  }
}
