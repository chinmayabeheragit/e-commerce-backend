const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = (app) => {
  app.use(
    '/api/admin',
    createProxyMiddleware({
      target: 'http://localhost:4003', // admin-service
      changeOrigin: true,
      pathRewrite: { '^/api/admin': '' },
    })
  );
};
