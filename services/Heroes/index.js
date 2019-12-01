const debug = require('debug')('application:service'.padEnd(25, ' '))

module.exports = {
  name: 'Heroes',
  metadata: {
    GetHeroesByIdQuery: require('./GetHeroesByIdQuery/metadata'),
    GetHeroesPaginateListQuery: require('./GetHeroesPaginateListQuery/metadata')
  },
  actions: {
    GetHeroesByIdQuery: {
      handler: require('./GetHeroesByIdQuery/handler')
    },
    GetHeroesPaginateListQuery: {
      handler: require('./GetHeroesPaginateListQuery/handler')
    }
  },
  async created () {
    debug(`${this.name} is created`)
  },
  async started () {
    debug(`${this.name} has started with ${Object.keys(this.actions).length} actions`)
  }
}
