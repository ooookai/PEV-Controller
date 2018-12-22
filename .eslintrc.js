module.exports = {
  root: true,
  env: {
    node: true,
  },
  plugins: ["prettier"],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',

    'comma-dangle': ['warn', 'only-multiline'],

    'prettier/prettier': [
      'warn',
      {
        trailingComma: 'es5',
        singleQuote: true,
        semi: false,
      },
    ],
  },
  parserOptions: { 
    "ecmaVersion": 6 
 } 
}