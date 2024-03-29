module.exports = {
  root: true,
  env: { browser: true, es6: true, node: true },
  extends: [
    'plugin:vue/recommended',
    '@vue/airbnb',
  ],
  parserOptions: { parser: 'babel-eslint' },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'vue/no-v-html': 'off',
    'no-shadow': 'off',
    'no-param-reassign': 'off',
    'max-len': ['error', 200],
  },
};
