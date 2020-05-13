module.exports = {
  pluginOptions: {
    lintStyleOnBuild: true,
  },
  css: {
    loaderOptions: {
      scss: {
        // Access config / mixins / variables and functions in .vue files
        prependData:
        `
          @import '~bootstrap/scss/functions';
          @import '~bootstrap/scss/variables';
          @import '~bootstrap/scss/mixins';
          @import "~rfs/scss.scss";
          @import "~@/assets/scss/functions/_colors.scss";
          @import "~@/assets/scss/functions/_get-value-if-key-exists.scss";
          @import "~@/assets/scss/functions/_rem.scss";
          @import "~@/assets/scss/functions/_strip-units.scss";
          @import "~@/assets/scss/mixins/_get-font-size.scss";
          @import "~@/assets/scss/mixins/_gradient.scss";
          @import "~@/assets/scss/mixins/_headings.scss";
          @import "~@/assets/scss/config/_colors.scss";
          @import "~@/assets/scss/config/_base.scss";
          @import "~@/assets/scss/config/_font-sizes.scss";
        `,
      },
    },
  },
};
