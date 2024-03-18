/**
 * @file Type Definitions - Visitors
 * @module unist-util-visit/types/Visitors
 */

import type { Nilable } from '@flex-development/tutils'
import type { Test } from '@flex-development/unist-util-types'
import type { Node } from 'unist'
import type Visitor from './visitor'

/**
 * Handle nodes when entering ([*preorder*][1]) and leaving ([*postorder*][2]).
 *
 * [1]: https://github.com/syntax-tree/unist#preorder
 * [2]: https://github.com/syntax-tree/unist#postorder
 *
 * @see {@linkcode Node}
 * @see {@linkcode Test}
 *
 * @template {Node} [Tree=Node] - Tree being visited
 * @template {Test} [Check=Test] - Node test
 */
type Visitors<Tree extends Node = Node, Check extends Test = Test> = {
  /**
   * Handle nodes when entering ([*preorder*][1]).
   *
   * [1]: https://github.com/syntax-tree/unist#preorder
   *
   * @see {@linkcode Visitor}
   */
  enter?: Nilable<Visitor<Tree, Check>>

  /**
   * Handle nodes when leaving ([*postorder*][1]).
   *
   * [1]: https://github.com/syntax-tree/unist#postorder
   *
   * @see {@linkcode Visitor}
   */
  leave?: Nilable<Visitor<Tree, Check>>
}

export type { Visitors as default }
