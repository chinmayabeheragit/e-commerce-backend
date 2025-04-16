const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = (app) => {
  app.use(
    '/api/notification',
    createProxyMiddleware({
      target: 'http://localhost:4005', // notification-service
      changeOrigin: true,
      pathRewrite: { '^/api/notification': '' },
    })
  );
};
