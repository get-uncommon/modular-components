module.exports = {
  pluginOptions: {
    lintStyleOnBuild: true,
  },
  css: {
    loaderOptions: {
      sass: {
        additionalData: '@import "~@/assets/scss/main.scss";',
      },
    },
  },
};
