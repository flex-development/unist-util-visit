/**
 * @file Type Definitions - VisitedNode
 * @module unist-util-visit/types/VisitedNode
 */

import type { NIL } from '@flex-development/tutils'
import type {
  MatchInclusiveDescendant,
  Test
} from '@flex-development/unist-util-types'
import type { Node } from 'unist'

/**
 * Collect visited nodes in [`Tree`][tree].
 *
 * [tree]: https://github.com/syntax-tree/unist#tree
 *
 * @see {@linkcode Node}
 * @see {@linkcode Test}
 *
 * @template {Node} Tree - Tree to traverse
 * @template {Test} [Check=NIL] - Visited node test
 */
type VisitedNode<
  Tree extends Node = Node,
  Check extends Test = NIL
> = MatchInclusiveDescendant<Tree, Check>

export type { VisitedNode as default }
