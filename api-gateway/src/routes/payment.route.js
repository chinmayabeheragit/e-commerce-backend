const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = (app) => {
  app.use(
    '/api/payment',
    createProxyMiddleware({
      target: 'http://localhost:4006', // payment-gateway
      changeOrigin: true,
      pathRewrite: { '^/api/payment': '' },
    })
  );
};
