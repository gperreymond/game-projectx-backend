const debug = require('debug')('application:service'.padEnd(25, ' '))

module.exports = {
  name: 'System',
  metadata: {
    GetStackHealthCheckQuery: require('./GetStackHealthCheckQuery/metadata')
  },
  actions: {
    GetStackHealthCheckQuery: {
      cache: true,
      handler: require('./GetStackHealthCheckQuery/handler')
    }
  },
  async created () {
    debug(`${this.name} is created`)
  },
  async started () {
    debug(`${this.name} has started with ${Object.keys(this.actions).length} actions`)
  }
}
