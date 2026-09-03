const proxy = require('http-proxy-middleware');

module.exports = function expressMiddleware(router) {
  const target = process.env.ROVNA_UI_STORYBOOK_API_URL;

  if (!target) return;

  router.use(
    '/api',
    proxy.createProxyMiddleware({
      target,
      changeOrigin: true,
    }),
  );
};
