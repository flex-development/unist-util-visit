/**
 * @file ESLint Configuration - Root
 * @module config/eslint
 * @see https://eslint.org/docs/user-guide/configuring
 */

/**
 * @type {import('eslint').Linter.Config}
 * @const config - ESLint configuration object
 */
const config = {
  extends: ['./.eslintrc.base.cjs'],
  overrides: [
    ...require('./.eslintrc.base.cjs').overrides,
    {
      files: ['src/__tests__/visit.functional.spec.ts'],
      rules: {
        'jest-formatting/padding-around-expect-groups': 0
      }
    },
    {
      files: ['src/visit.ts'],
      rules: {
        'jsdoc/require-returns-check': 0
      }
    }
  ],
  root: true
}

module.exports = config
