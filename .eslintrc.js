module.exports = {
  env: {
    jest: true,
    browser: true,
    commonjs: true,
    browser: true,
    node: true,
  },
  extends: ['airbnb-base', 'eslint:recommended', 'plugin:react/recommended'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react'],
  rules: {
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
  },
}
