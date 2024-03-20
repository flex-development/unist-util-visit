/**
 * @file Fixtures - tree
 * @module fixtures/tree
 */

import type { Root } from '@flex-development/docast'
import { fromDocs } from '@flex-development/docast-util-from-docs'
import { read } from 'to-vfile'

/**
 * Docblock syntax tree.
 *
 * @type {Root}
 */
export default fromDocs(await read('__fixtures__/digitize.ts'))
