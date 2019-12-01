const Joi = require('@hapi/joi')

module.exports = {
  gateway: {
    method: 'get',
    path: '/api/heroes/{id}',
    options: {
      validate: {
        params: {
          id: Joi.number().integer().required()
        }
      },
      plugins: {
        'hapi-swagger': {
          payloadType: 'form',
          responses: {
            200: { description: 'Success' },
            404: { description: 'Hero not found' },
            500: { description: 'Internal Server Error' }
          }
        }
      },
      auth: false,
      log: { collect: false },
      tags: ['api', 'Heroes'],
      description: 'Get a hero from his id'
    }
  }
}
