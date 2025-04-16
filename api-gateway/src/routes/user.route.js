const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = (app) => {
  app.use(
    '/api/user',
    createProxyMiddleware({
      target: 'http://localhost:4001', // user-service
      changeOrigin: true,
      pathRewrite: { '^/api/user': '' },
    })
  );
};
