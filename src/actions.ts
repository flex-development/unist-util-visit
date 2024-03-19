/**
 * @file actions
 * @module unist-util-visit/actions
 */

import type { Continue, Exit, Skip } from './types'

/**
 * Continue traversing as normal.
 *
 * @see {@linkcode Continue}
 *
 * @const {Continue} CONTINUE
 */
const CONTINUE: Continue = true

/**
 * Stop traversing immediately.
 *
 * @see {@linkcode Exit}
 *
 * @const {Exit} EXIT
 */
const EXIT: Exit = false

/**
 * Do not traverse the [*children*][1] of this node.
 *
 * [1]: https://github.com/syntax-tree/unist#child
 *
 * @see {@linkcode Skip}
 *
 * @const {Skip} SKIP
 */
const SKIP: Skip = 'skip'

export { CONTINUE, EXIT, SKIP }
