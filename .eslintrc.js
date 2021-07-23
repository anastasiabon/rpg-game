module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  rules: {
    "import/no-named-as-default": 0,
    "import/no-named-as-default-member": 0,
    "object-curly-newline": 0,
    "no-unused-expressions": 0,
    "no-plusplus": 0,
    "no-irregular-whitespace": 0,
    "max-len": 0,
    "no-bitwise": 0,
  },
};
