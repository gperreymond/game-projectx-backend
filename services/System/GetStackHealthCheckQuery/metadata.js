module.exports = {
  gateway: {
    method: 'get',
    path: '/hc',
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
      tags: ['api', 'System'],
      description: 'Get the healthcheck of the gateway'
    }
  }
}
