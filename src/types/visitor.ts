/**
 * @file Type Definitions - Visitor
 * @module unist-util-visit/types/Visitor
 */

import type { Optional } from '@flex-development/tutils'
import type {
  Index,
  MatchInclusiveDescendant,
  Test
} from '@flex-development/unist-util-types'
import type { Node } from 'unist'
import type Action from './action'
import type VisitedAncestor from './visited-ancestor'
import type VisitedParent from './visited-parent'
import type VisitorResult from './visitor-result'

/**
 * Handle visiting `node`.
 *
 * Visitors are free to transform `node`. They can also transform [`parent`][1],
 * or the grandparent of `node` (the last of [`ancestors`][2]).
 *
 * > 👉 **Note**: Replacing `node` itself, if `SKIP` is not returned, still
 * > causes its [*descendants*][3] to be walked (which is a bug).
 *
 * When adding or removing previous [*siblings*][4] of `node`, the `Visitor`
 * should return a new `Index` to specify the sibling to traverse after `node`
 * is traversed. Adding or removing next siblings of `node` is handled as
 * expected without needing to return a new `Index`.
 *
 * Removing the [*children*][5] of an [*ancestor*][2] still results in those
 * child nodes being traversed.
 *
 * The `Visitor` should return the next action, or `Index`, as explained above.
 * An `Index` is treated as a tuple of `[CONTINUE, Index]`. An `Action` is
 * treated as a tuple of `[Action]`. Returning a tuple only makes sense if the
 * `Action` is `SKIP`. When the `Action` is `EXIT`, that action can be returned.
 * When the `Action` is `CONTINUE`, `Index` can be returned.
 *
 * [1]: https://github.com/syntax-tree/unist#parent-1
 * [2]: https://github.com/syntax-tree/unist#ancestor
 * [3]: https://github.com/syntax-tree/unist#descendant
 * [4]: https://github.com/syntax-tree/unist#sibling
 * [5]: https://github.com/syntax-tree/unist#child
 *
 * @see {@linkcode Action}
 * @see {@linkcode Index}
 * @see {@linkcode MatchInclusiveDescendant}
 * @see {@linkcode Node}
 * @see {@linkcode Test}
 * @see {@linkcode VisitedAncestor}
 * @see {@linkcode VisitedParent}
 * @see {@linkcode VisitorResult}
 *
 * @template {Node} [Tree=Node] - Tree being visited
 * @template {Test} [Check=Test] - Node test
 *
 * @this {void}
 *
 * @param {MatchInclusiveDescendant<Tree, Check>} node - Found node
 * @param {Optional<Index>} index - Index of `node` in `parent.children`
 * @param {Optional<VisitedParent<Tree, Check>>} parent - Parent of `node`
 * @param {VisitedAncestor<Tree, Check>[]} ancestors - Ancestors of `node`
 * @return {VisitorResult} What to do next
 */
type Visitor<Tree extends Node = Node, Check extends Test = Test> = (
  this: void,
  node: MatchInclusiveDescendant<Tree, Check>,
  index: Optional<Index>,
  parent: Optional<VisitedParent<Tree, Check>>,
  ancestors: VisitedAncestor<Tree, Check>[]
) => VisitorResult

export type { Visitor as default }
