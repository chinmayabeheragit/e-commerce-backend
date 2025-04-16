const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = (app) => {
  app.use(
    '/api/vendor',
    createProxyMiddleware({
      target: 'http://localhost:4002', // vendor-service
      changeOrigin: true,
      pathRewrite: { '^/api/vendor': '' },
    })
  );
};
