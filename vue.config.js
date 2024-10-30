const isProduction = process.env.ENVIRONMENT === 'production';

module.exports = {
  pluginOptions: {
    lintStyleOnBuild: true,
  },
  css: {
    extract: true,
    loaderOptions: {
      sass: {
        additionalData: isProduction ? '' : '@import "~@/assets/scss/main.scss";',
      },
    },
  },
  configureWebpack: {
    output: {
      libraryExport: 'default',
    },
  },
};
