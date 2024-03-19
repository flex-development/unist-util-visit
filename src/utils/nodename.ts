/**
 * @file Utilities - nodename
 * @module unist-util-visit/nodename
 */

import { isString, type Nullable } from '@flex-development/tutils'
import type { Node } from 'unist'

/**
 * Get a display name for `node`.
 *
 * The following properties will be used as display names if found:
 *
 * - `tagName`
 * - `name`
 *
 * @internal
 *
 * @template {Node} [T=Node] - Node to check
 *
 * @this {void}
 *
 * @param {T} node - Node to check
 * @return {Nullable<string>} Display name or `null`
 */
function nodename<T extends Node = Node>(
  this: void,
  node: T
): Nullable<string> {
  return 'tagName' in node && isString(node.tagName) // hast
    ? node.tagName
    : 'name' in node && isString(node.name) // xast
    ? node.name
    : null
}

export default nodename
