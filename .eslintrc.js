module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
  extends: [
    'plugin:vue/recommended',
    'airbnb-base',
  ],
  plugins: [
    'vue',
  ],
  rules: {
    'max-len': 'off',
    camelcase: 'off',
    'no-underscore-dangle': 'off',
    'no-console': 'off',
  },
};
