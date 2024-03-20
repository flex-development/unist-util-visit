/**
 * @file Type Definitions - VisitedParent
 * @module unist-util-visit/types/VisitedParent
 */

import type { NIL } from '@flex-development/tutils'
import type {
  InclusiveDescendant,
  MatchInclusiveDescendant,
  Parents,
  Test
} from '@flex-development/unist-util-types'
import type { Node, Parent } from 'unist'

/**
 * Collect [*parents*][1] of nodes in [`Tree`][2] that pass a test.
 *
 * [1]: https://github.com/syntax-tree/unist#parent
 * [2]: https://github.com/syntax-tree/unist#tree
 *
 * @see {@linkcode Node}
 * @see {@linkcode Test}
 *
 * @template {Node} [Tree=Node] - Tree to extract parents from
 * @template {Test} [Check=NIL] - Node test
 */
type VisitedParent<
  Tree extends Node = Node,
  Check extends Test = NIL
> = // dprint-ignore
  Node extends Tree
    ? Parent
    : Parents<
        InclusiveDescendant<Tree>,
        MatchInclusiveDescendant<Tree, Check>
      >

export type { VisitedParent as default }
