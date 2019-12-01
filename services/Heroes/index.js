const debug = require('debug')('application:service'.padEnd(25, ' '))

module.exports = {
  name: 'Heroes',
  metadata: {
    GetHeroesPaginateListQuery: require('./GetHeroesPaginateListQuery/metadata')
  },
  actions: {
    GetHeroesPaginateListQuery: {
      handler: require('./GetHeroesPaginateListQuery/handler')
    }
  },
  async created () {
    debug(`${this.name} is created`)
  },
  async started () {
    debug(`${this.name} has started`)
  }
}
