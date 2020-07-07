module.exports = {
  pluginOptions: {
    lintStyleOnBuild: true,
  },
  css: {
    loaderOptions: {
      sass: {
        prependData: '@import "~@/assets/scss/main.scss";',
      },
    },
  },
};
