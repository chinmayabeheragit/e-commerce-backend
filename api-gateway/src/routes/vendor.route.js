const { createProxyMiddleware } = require('http-proxy-middleware');
const { vendorService } = require('../config/service.config');

module.exports = (app) => {
  app.use(
    '/api/vendor',
    createProxyMiddleware({
      target: vendorService,
      changeOrigin: true,
      pathRewrite: { '^/api/vendor': '' },
    })
  );
};
