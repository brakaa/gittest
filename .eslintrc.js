module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb-base',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
  plugins: [
    'typescript',
    '@typescript-eslint',
  ],
  rules: {
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    'comma-dangle': [2, 'always-multiline'],
    'no-console': 0, // 不禁用console
    'no-irregular-whitespace': 0, // 不规则的空白不允许
    'no-underscore-dangle': 0,
    'array-bracket-spacing': [2, 'never'], // 指定数组的元素之间要以空格隔开(,后面)
  },
};
