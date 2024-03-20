/**
 * @file Type Definitions - Visitor
 * @module unist-util-visit/types/Visitor
 */

import type { NIL } from '@flex-development/tutils'
import type { Index, Test } from '@flex-development/unist-util-types'
import type { Node } from 'unist'
import type Action from './action'
import type VisitedAncestor from './visited-ancestor'
import type VisitedNode from './visited-node'
import type VisitedParent from './visited-parent'
import type VisitorResult from './visitor-result'

/**
 * Handle a `node`.
 *
 * Visitors are free to transform `node`. They can also transform `parent`, or
 * the grandparent of `node` (the last of `ancestors`).
 *
 * > 👉 **Note**: Replacing `node` itself, if `SKIP` is not returned, still
 * > causes its [*descendants*][descendant] to be walked (which is a bug).
 *
 * When adding or removing previous [*siblings*][sibling] of `node`, the
 * `Visitor` should return a new `Index` to specify the *sibling* to traverse
 * after `node` is traversed. Adding or removing next *siblings* of `node` is
 * handled as expected without needing to return a new `Index`.
 *
 * Removing the [*children*][child] of an [*ancestor*][ancestor] still results
 * in those *child* nodes being traversed.
 *
 * [ancestor]: https://github.com/syntax-tree/unist#ancestor
 * [child]: https://github.com/syntax-tree/unist#child
 * [descendant]: https://github.com/syntax-tree/unist#descendant
 * [sibling]: https://github.com/syntax-tree/unist#sibling
 *
 * @see {@linkcode Action}
 * @see {@linkcode Index}
 * @see {@linkcode Node}
 * @see {@linkcode Test}
 * @see {@linkcode VisitedAncestor}
 * @see {@linkcode VisitedNode}
 * @see {@linkcode VisitedParent}
 * @see {@linkcode VisitorResult}
 *
 * @template {Node} [Tree=Node] - Tree being visited
 * @template {Test} [Check=NIL] - Visited node test
 *
 * @this {void}
 *
 * @param {VisitedNode<Tree, Check>} node - Found node
 * @param {Index | undefined} index - Index of `node` in `parent.children`
 * @param {VisitedParent<Tree, Check> | undefined} parent - Parent of `node`
 * @param {VisitedAncestor<Tree, Check>[]} ancestors - Ancestors of `node`, if
 * any, where the last node is the grandparent of `node`
 * @return {VisitorResult} What to do next
 */
type Visitor<Tree extends Node = Node, Check extends Test = NIL> = (
  this: void,
  node: VisitedNode<Tree, Check>,
  index: Index | undefined,
  parent: VisitedParent<Tree, Check> | undefined,
  ancestors: VisitedAncestor<Tree, Check>[]
) => VisitorResult

export type { Visitor as default }
