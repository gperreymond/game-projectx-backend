module.exports = {
  gateway: {
    method: 'get',
    path: '/api/heroes',
    options: {
      plugins: {
        'hapi-swagger': {
          responses: {
            200: { description: 'Success' },
            500: { description: 'Internal Server Error' }
          }
        }
      },
      auth: false,
      log: { collect: false },
      tags: ['api', 'Heroes'],
      description: 'Get a paginate list of heroes'
    }
  }
}
