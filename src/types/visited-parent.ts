/**
 * @file Type Definitions - VisitedParent
 * @module unist-util-visit/types/VisitedParent
 */

import type { NIL } from '@flex-development/tutils'
import type {
  InclusiveDescendant,
  Parents,
  Test
} from '@flex-development/unist-util-types'
import type { Node, Parent } from 'unist'
import type VisitedNode from './visited-node'

/**
 * Collect [*parents*][parent] of visited nodes in [`Tree`][tree].
 *
 * [parent]: https://github.com/syntax-tree/unist#parent-1
 * [tree]: https://github.com/syntax-tree/unist#tree
 *
 * @see {@linkcode Node}
 * @see {@linkcode Test}
 *
 * @template {Node} [Tree=Node] - Tree to extract parents from
 * @template {Test} [Check=NIL] - Visited node test
 */
type VisitedParent<
  Tree extends Node = Node,
  Check extends Test = NIL
> = // dprint-ignore
  Node extends Tree
    ? Parent
    : Parents<InclusiveDescendant<Tree>, VisitedNode<Tree, Check>>

export type { VisitedParent as default }
