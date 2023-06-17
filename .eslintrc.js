module.exports = {
  env: {
    es6: true,
    jest: true
  },
  extends: 'semistandard',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  rules: {
    'keyword-spacing': 2,
    'no-unused-vars': 'off'
  }
};
