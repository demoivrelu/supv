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
    "quote-props": 0,
    'vuejs-accessibility/click-events-have-key-events': 'off',
    "global-require": 0,
    "@typescript-eslint/no-var-requires": 0,
    "@typescript-eslint/no-explicit-any": ["off"],
    "function-paren-newline": "off",
    // "vue/setup-compiler-macros": 0,

    "no-param-reassign": [
      2,
      {
        "props": true,
        "ignorePropertyModificationsFor": [
          "config",
          "res", // for Express responses
          "item", // for Express responses
          "options" // for vuex state 解决assignment to property of function parameter ‘state‘
        ]
      }
    ],
    'linebreak-style': ["error", "windows"],
  },
};
