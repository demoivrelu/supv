const { defineConfig } = require('@vue/cli-service');
// const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');

module.exports = defineConfig({
  // backend_url: 'http://192.168.1.33:81/main-page',
  transpileDependencies: true,
  publicPath: './',

  devServer: {
    open: false,
    host: '0.0.0.0',
    port: 8081,
    // proxy: {
    //   '/srv/': {
    //     target: 'http://10.99.150.100:8001/',
    //     changeOrigin: true,
    //     pathRewrite: {
    //       '^/srv': '/WebService',
    //     },
    //   },
    // }
    proxy: {
      '/srv/': {
        target: 'http://192.168.1.33:8001/',
        changeOrigin: true,
        pathRewrite: {
          '^/srv': '/WebService',
        },
      },
    },

    client: {
      overlay: {
        warnings: false,
        runtimeErrors: (error) => {
          const ignoreErrors = [
            "ResizeObserver loop limit exceeded",
            "ResizeObserver loop completed with undelivered notifications.",
          ];
          if (ignoreErrors.includes(error.message)) {
            return false;
          }
        },
      },
    },
  },
  // configureWebpack: (config) => {
  //   const plugins = []
  //   plugins.push(new NodePolyfillPlugin())
  // }

  chainWebpack: (config) => {
    config.plugin('define').tap((definitions) => {
      Object.assign(definitions[0], {
        __VUE_OPTIONS_API__: 'true',
        __VUE_PROD_DEVTOOLS__: 'false',
        __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: 'false'
      })
      return definitions
    })
  }
});
