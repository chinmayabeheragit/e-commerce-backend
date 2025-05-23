const { createProxyMiddleware } = require('http-proxy-middleware');
const { userService } = require('../config/service.config');

module.exports = (app) => {
  app.use(
    '/api/user',
    createProxyMiddleware({
      target: userService,
      changeOrigin: true,
      pathRewrite: { '^/api/user': '' },
    })
  );
};
