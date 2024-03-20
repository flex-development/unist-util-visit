/**
 * @file Configuration - Build
 * @module config/build
 * @see https://github.com/flex-development/mkbuild
 */

import { defineBuildConfig, type Config } from '@flex-development/mkbuild'
import tsconfig from './tsconfig.build.json' assert { type: 'json' }

/**
 * Build configuration options.
 *
 * @const {Config} config
 */
const config: Config = defineBuildConfig({
  charset: 'utf8',
  entries: [
    { pattern: ['color.*', 'index.ts'] },
    { dts: false, ignore: ['color.*', 'index.ts', 'types'] },
    { dts: 'only' }
  ],
  target: ['node18', tsconfig.compilerOptions.target],
  tsconfig: 'tsconfig.build.json'
})

export default config
