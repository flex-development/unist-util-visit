/**
 * @file Type Definitions - VisitedAncestor
 * @module unist-util-visit/types/VisitedAncestor
 */

import type { NIL } from '@flex-development/tutils'
import type {
  Ancestor,
  MatchInclusiveDescendant,
  Test
} from '@flex-development/unist-util-types'
import type { Node, Parent } from 'unist'

/**
 * Collect [*ancestors*][1] of nodes in [`Tree`][2] that pass a test.
 *
 * [1]: https://github.com/syntax-tree/unist#ancestor
 * [2]: https://github.com/syntax-tree/unist#tree
 *
 * @see {@linkcode Node}
 * @see {@linkcode Test}
 *
 * @template {Node} [Tree=Node] - Tree to extract ancestors from
 * @template {Test} [Check=NIL] - Node test
 */
type VisitedAncestor<
  Tree extends Node = Node,
  Check extends Test = NIL
> = // dprint-ignore
  Node extends Tree
    ? Parent
    : Exclude<Ancestor<Tree, MatchInclusiveDescendant<Tree, Check>>, never>

export type { VisitedAncestor as default }
