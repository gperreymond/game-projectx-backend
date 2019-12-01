const debug = require('debug')('application:service'.padEnd(25, ' '))

module.exports = {
  name: 'Metrics',
  events: {
    'metrics.trace.span.finish': {
      async handler (data) {
        this.logger.info('This is the metrics to log:', data)
        return true
      }
    }
  },
  async created () {
    debug(`${this.name} is created`)
  },
  async started () {
    debug(`${this.name} has started with ${Object.keys(this.actions).length} actions`)
  }
}
