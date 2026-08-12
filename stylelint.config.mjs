export default {
  extends: [
    'stylelint-config-standard-scss',
    'stylelint-config-recommended-vue/scss',
  ],
  overrides: [
    {
      files: ['**/*.vue'],
      customSyntax: 'postcss-html',
    },
  ],
  rules: {
    'declaration-no-important': null,
    'no-descending-specificity': null,
    'scss/at-rule-no-unknown': true,
    'selector-class-pattern': null,
    'value-keyword-case': ['lower', { ignoreKeywords: ['currentColor'] }],
  },
};
