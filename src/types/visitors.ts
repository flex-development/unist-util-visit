/**
 * @file Type Definitions - Visitors
 * @module unist-util-visit/types/Visitors
 */

import type { NIL, Nilable } from '@flex-development/tutils'
import type { Test } from '@flex-development/unist-util-types'
import type { Node } from 'unist'
import type Visitor from './visitor'

/**
 * Handle a node on [*enter*][enter] and/or [*exit*][exit].
 *
 * [enter]: https://github.com/syntax-tree/unist#enter
 * [exit]: https://github.com/syntax-tree/unist#preorder
 *
 * @see {@linkcode Node}
 * @see {@linkcode Test}
 *
 * @template {Node} [Tree=Node] - Tree being visited
 * @template {Test} [Check=NIL] - Visited node test
 */
type Visitors<Tree extends Node = Node, Check extends Test = NIL> = {
  /**
   * Handle a node on [*enter*][enter] ([*preorder*][preorder]).
   *
   * [enter]: https://github.com/syntax-tree/unist#enter
   * [preorder]: https://github.com/syntax-tree/unist#preorder
   *
   * @see {@linkcode Visitor}
   */
  enter?: Nilable<Visitor<Tree, Check>>

  /**
   * Handle a node on [*exit*][exit] ([*postorder*][postorder]).
   *
   * [exit]: https://github.com/syntax-tree/unist#preorder
   * [postorder]: https://github.com/syntax-tree/unist#postorder
   *
   * @see {@linkcode Visitor}
   */
  leave?: Nilable<Visitor<Tree, Check>>
}

export type { Visitors as default }
