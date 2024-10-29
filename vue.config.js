const { extract } = require("query-string");

module.exports = {
  pluginOptions: {
    lintStyleOnBuild: true,
  },
  css: {
    extract: true,
    // loaderOptions: {
    //   sass: {
    //     additionalData: '@import "~@/assets/scss/main.scss";',
    //   },
    // },
  },
  configureWebpack: {
    output: {
      libraryExport: 'default',
    },
  },
};
