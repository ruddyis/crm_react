const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function (app) {
  app.use(
    // 代理标识
    '/api',
    // 代理配置
    createProxyMiddleware({
      // 目标服务器地址
      target: "http://192.168.1.90:8080",
      changeOrigin: true,
      pathRewrite: { // 去掉接口中的 /api 前缀
        '^/api': ''
      }
    })
  )
}