module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/vue3-essential',
    '@vue/airbnb',
    '@vue/typescript/recommended',
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    "consistent-return": "off",
    "import/prefer-default-export": "off",
    "no-restricted-syntax": "off",
    "no-await-in-loop": "off",
    "vue/case-in-component-tags": "off",
    "no-undef": 0,
    // "vue/setup-compiler-macros": 0,
    // 'linebreak-style': ["error", "windows"],
  },
};
