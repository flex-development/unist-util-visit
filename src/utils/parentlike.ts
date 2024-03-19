/**
 * @file Utilities - parentlike
 * @module unist-util-visit/parentlike
 */

import { isArray } from '@flex-development/tutils'
import type { Parent } from 'unist'
import nodelike from './nodelike'

/**
 * Check if something looks like a {@linkcode Parent}.
 *
 * @internal
 *
 * @this {void}
 *
 * @param {unknown} value - Thing to check
 * @return {value is Parent} `true` if `value` looks like a parent
 */
function parentlike(this: void, value: unknown): value is Parent {
  return nodelike(value) && 'children' in value && isArray(value.children)
}

export default parentlike
