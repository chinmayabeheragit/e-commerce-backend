const { createProxyMiddleware } = require('http-proxy-middleware');
const { adminService } = require('../config/service.config');

module.exports = (app) => {
  app.use(
    '/api/admin',
    createProxyMiddleware({
      target: adminService,
      changeOrigin: true,
      pathRewrite: { '^/api/admin': '' },
    })
  );
};
