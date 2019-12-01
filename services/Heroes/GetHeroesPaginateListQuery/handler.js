const db = require('../../../data/db')

const handler = async function (ctx) {
  try {
    this.logger.info(ctx.action.name, ctx.params)
    return db('heroes')
  } catch (e) {
    /* istanbul ignore next */
    this.logger.error('Heroes.GetHeroesPaginateListQuery', e.message)
    /* istanbul ignore next */
    return Promise.reject(e)
  }
}

module.exports = handler
