/**
 * @file Type Definitions - VisitedAncestor
 * @module unist-util-visit/types/VisitedAncestor
 */

import type { NIL } from '@flex-development/tutils'
import type { Ancestor, Test } from '@flex-development/unist-util-types'
import type { Node, Parent } from 'unist'
import type VisitedNode from './visited-node'

/**
 * Collect [*ancestors*][ancestor] of visited nodes in [`Tree`][tree].
 *
 * [ancestor]: https://github.com/syntax-tree/unist#ancestor
 * [tree]: https://github.com/syntax-tree/unist#tree
 *
 * @see {@linkcode Node}
 * @see {@linkcode Test}
 *
 * @template {Node} [Tree=Node] - Tree to extract ancestors from
 * @template {Test} [Check=NIL] - Visited node test
 */
type VisitedAncestor<
  Tree extends Node = Node,
  Check extends Test = NIL
> = // dprint-ignore
  Node extends Tree
    ? Parent
    : Exclude<Ancestor<Tree, VisitedNode<Tree, Check>>, never>

export type { VisitedAncestor as default }
