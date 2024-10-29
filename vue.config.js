const { extract } = require("query-string");

module.exports = {
  pluginOptions: {
    lintStyleOnBuild: true,
  },
  css: {
    extract: {
      filename: 'css/[name].css',
      chunkFilename: 'css/[name].css',
    },
    loaderOptions: {
      sass: {
        additionalData: '@import "~@/assets/scss/main.scss";',
      },
    },
  },
};
