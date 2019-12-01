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
  }
}
