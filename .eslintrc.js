/**
 * Eslint config.
 * @param opts - Rollup config.
 * @returns Eslint config.
 */
function eslint({ next, types } = {}) {
  return {
    env: {
      browser: true,
      es6: true
    },
    ignorePatterns: ['node_modules/', 'dist/'],
    extends: [
      'plugin:react/recommended',
      'airbnb',
      'plugin:@typescript-eslint/eslint-recommended',
      'plugin:@typescript-eslint/recommended',
      'plugin:functional/external-recommended',
      'plugin:functional/recommended'
    ],
    globals: {
      Atomics: 'readonly',
      SharedArrayBuffer: 'readonly',
      expect: true,
      test: true,
      jest: true,
      beforeAll: true,
      afterAll: true,
      jasmine: true,
      context: true,
      before: true,
      beforeEach: true,
      after: true,
      afterEach: true,
      it: true,
      cy: true
    },
    parser: types ? '@typescript-eslint/parser' : undefined,
    parserOptions: {
      ecmaFeatures: {
        jsx: true
      },
      ecmaVersion: 2020,
      sourceType: 'module',
      allowImportExportEverywhere: true
    },
    plugins: [
      ...[
        'react',
        'eslint-plugin-react-hooks',
        // 'jsdoc',
        '@typescript-eslint/eslint-plugin',
        'eslint-plugin-tsdoc',
        'functional'
      ],
      ...(types ? ['@typescript-eslint'] : [])
    ],
    rules: {
      semi: ['error', 'never'],
      'comma-dangle': ['error', 'never'],
      'brace-style': ['error', 'stroustrup', { allowSingleLine: true }],
      'no-plusplus': 'off',
      'space-before-function-paren': ['error', { anonymous: 'always', named: 'never', asyncArrow: 'always' }],
      'object-curly-newline': ['error', { ImportDeclaration: 'never', ExportDeclaration: 'never' }],
      'no-empty': ['error', { allowEmptyCatch: true }],
      'operator-linebreak': ['error', 'after'],
      curly: [2, 'multi-line'],
      'no-use-before-define': 'off',
      'react/jsx-filename-extension': 'off',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'no-eval': 'off',
      'import/first': 'off',
      'import/no-mutable-exports': 'off',
      // 'jsdoc/check-alignment': 1,
      // 'jsdoc/check-examples': 1,
      // 'jsdoc/check-indentation': 1,
      // 'jsdoc/check-param-names': 1,
      // 'jsdoc/check-syntax': 1,
      // 'jsdoc/check-tag-names': 1,
      // 'jsdoc/check-types': 1,
      // 'jsdoc/implements-on-classes': 1,
      // 'jsdoc/match-description': 1,
      // 'jsdoc/newline-after-description': 1,
      // // 'jsdoc/no-types': 1,
      // 'jsdoc/no-undefined-types': 1,
      // 'jsdoc/require-description': 1,
      // 'jsdoc/require-description-complete-sentence': 1,
      // 'jsdoc/require-example': 0,
      // 'jsdoc/require-hyphen-before-param-description': 1,
      // 'jsdoc/require-jsdoc': 1,
      // 'jsdoc/require-param': 0,
      // 'jsdoc/require-param-description': 1,
      // 'jsdoc/require-param-name': 1,
      // 'jsdoc/require-param-type': 1,
      // 'jsdoc/require-returns': 1,
      // 'jsdoc/require-returns-check': 1,
      // 'jsdoc/require-returns-description': 1,
      // 'jsdoc/require-returns-type': 1,
      // 'jsdoc/valid-types': 1,
      'react/react-in-jsx-scope': !next ? 2 : 0,
      'import/no-extraneous-dependencies': 1,
      'import/prefer-default-export': 0,
      'implicit-arrow-linebreak': 0, // supertest
      'react/jsx-props-no-spreading': 0,
      'react/require-default-props': 0,
      'no-shadow': 0,
      'functional/functional-parameters': 0,
      'functional/no-conditional-statement': 0,
      'functional/no-class': 1,
      'functional/no-this-expression': 0,
      'functional/no-let': 0,
      'functional/immutable-data': 1,
      'functional/no-return-void': 0,
      'functional/no-loop-statement': 2,
      'functional/no-expression-statement': 0,
      'functional/no-try-statement': 0,
      'functional/no-throw-statement': 0,
      'import/extensions': [2, 'never', { ts: 'never', tsx: 'never', json: 'never' }],
      'import/no-unresolved': 0,
      'functional/no-mixed-type': 0,
      'react/prop-types': types ? 0 : 2,
      'tsdoc/syntax': 'warn'
    }
  }
}

module.exports = eslint({ types: true, next: true })