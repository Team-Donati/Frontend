const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "http://gasrelay-202305-38hlg2-nlb-4deb54783e33031b.elb.ap-northeast-2.amazonaws.com:9876/rpc-sync",
      pathRewrite: {
        "^/api": "",
      },
      changeOrigin: true,
    })
  );
};
