const { createProxyMiddleware } = require('http-proxy-middleware');
const { paymentService } = require('../config/service.config');

module.exports = (app) => {
  app.use(
    '/api/payment',
    createProxyMiddleware({
      target: paymentService,
      changeOrigin: true,
      pathRewrite: { '^/api/payment': '' },
    })
  );
};
