/**
 * @file Utilities - nodelike
 * @module unist-util-visit/nodelike
 */

import { isObjectCurly, isString } from '@flex-development/tutils'
import type { Node } from 'unist'

/**
 * Check if something looks like a {@linkcode Node}.
 *
 * @internal
 *
 * @this {void}
 *
 * @param {unknown} value - Thing to check
 * @return {value is Node} `true` if `value` looks like a node
 */
function nodelike(this: void, value: unknown): value is Node {
  if (!isObjectCurly(value)) return false
  return 'type' in value && isString(value.type) && !!value.type.length
}

export default nodelike
