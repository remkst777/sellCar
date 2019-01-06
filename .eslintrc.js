module.exports = {
  env: {
    es6: true,
    browser: true,
    node: true,
  },
  extends: ['airbnb', 'plugin:jest/recommended', 'jest-enzyme'],
  plugins: ['babel', 'import', 'jsx-a11y', 'react', 'prettier'],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    'linebreak-style': 'off', // Неправильно работает в Windows.
    'operator-linebreak': 'off',
    'max-len': 'off',
    'implicit-arrow-linebreak': 'off',
    'no-confusing-arrow': 'off',

    'arrow-parens': 'off', // Несовместимо с prettier
    'object-curly-newline': 'off', // Несовместимо с prettier
    'no-mixed-operators': 'off', // Несовместимо с prettier
    'arrow-body-style': 'off', // Это - не наш стиль?
    'function-paren-newline': 'off', // Несовместимо с prettier
    'no-plusplus': 'off',
    'space-before-function-paren': 0, // Несовместимо с prettier

    'import/prefer-default-export': 'off',
    'import/no-unresolved': 'off',

    'no-console': 'error', // airbnb использует предупреждение
    'no-alert': 'error', // airbnb использует предупреждение

    'no-param-reassign': 'off',
    radix: 'off',
    'react/require-default-props': 'off',
    'react/forbid-prop-types': 'off',
    'react/button-has-type': 'off',
    'react/jsx-filename-extension': ['error', { extensions: ['.js'] }],

    'prefer-destructuring': 'off',
    'global-require': 'off',
    'import/no-dynamic-require': 'off',

    'react/no-find-dom-node': 'off',
    'react/no-did-mount-set-state': 'off',
    'react/no-unused-prop-types': 'off',
    'react/jsx-one-expression-per-line': 'off',
    'react/destructuring-assignment': 'off',
    'react/no-access-state-in-setstate': 'off',

    'jsx-a11y/anchor-is-valid': [
      'error',
      { components: ['Link'], specialLink: ['to'] },
    ],
    'jsx-a11y/no-noninteractive-element-interactions': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/label-has-for': [
      2,
      {
        required: {
          every: ['id'],
        },
      },
    ], // для ошибки вложенных свойств htmlFor элементов label

    'prettier/prettier': ['error'],
  },
};
