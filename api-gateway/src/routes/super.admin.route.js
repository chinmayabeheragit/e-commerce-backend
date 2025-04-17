const { createProxyMiddleware } = require('http-proxy-middleware');
const { superAdminService } = require('../config/service.config');

module.exports = (app) => {
  app.use(
    '/api/superadmin',
    createProxyMiddleware({
      target: superAdminService,
      changeOrigin: true,
      pathRewrite: { '^/api/superadmin': '' },
    })
  );
};
