/**
 * @file visit
 * @module unist-util-visit/visit
 */

import {
  define,
  isArray,
  isBoolean,
  isFalsy,
  isFunction,
  isNIL,
  isNumber,
  sift,
  type EmptyArray,
  type Fn,
  type Nullable,
  type Optional
} from '@flex-development/tutils'
import type { Index, Test } from '@flex-development/unist-util-types'
import color from '@flex-development/unist-util-visit/color'
import type { Node, Parent } from 'unist'
import { convert, type Check } from 'unist-util-is'
import { CONTINUE, EXIT, SKIP } from './actions'
import type { ActionTuple, Visitor, VisitorResult, Visitors } from './types'
import { nodelike, nodename, parentlike } from './utils'

/**
 * Visit nodes, with ancestral information.
 *
 * This algorithm performs [*depth-first tree traversal*][dft] in
 * [*preorder*][preorder] (**NLR**) and/or [*postorder*][postorder] (**LRN**),
 * or if `reverse` is given, *reverse preorder* (**NRL**) and/or *reverse
 * postorder* (**RLN**). Nodes are handled on [*enter*][enter] during *preorder*
 * traversals and on [*exit*][exit] during *postorder* traversals.
 *
 * Walking the `tree` is an intensive task. Make use of `visitor` return values
 * whenever possible. Instead of walking `tree` multiple times, walk it once,
 * use [`unist-util-is`][unist-util-is] to check if a node matches, and then
 * perform different operations.
 *
 * You can change `tree`. See {@linkcode Visitor} for more info.
 *
 * [dft]: https://github.com/syntax-tree/unist#depth-first-traversal
 * [enter]: https://github.com/syntax-tree/unist#enter
 * [exit]: https://github.com/syntax-tree/unist#exit
 * [postorder]: https://github.com/syntax-tree/unist#postorder
 * [preorder]: https://github.com/syntax-tree/unist#preorder
 * [unist-util-is]: https://github.com/syntax-tree/unist-util-is
 *
 * @see {@linkcode Node}
 * @see {@linkcode Visitors}
 *
 * @template {Node} [Tree=Node] - Tree to traverse
 *
 * @param {Tree} tree - Tree to traverse
 * @param {Visitor<Tree> | Visitors<Tree>} visitor - A function to handle nodes
 * when entering (*preorder*), or an object to handle nodes when entering and
 * leaving (*preorder* and *postorder*)
 * @param {(boolean | null)?} [reverse] - Traverse in reverse preorder (NRL)
 * and/or postorder (RLN) instead of default traversal order(s)
 * @return {void} Nothing
 */
function visit<Tree extends Node = Node>(
  this: void,
  tree: Tree,
  visitor: Visitor<Tree> | Visitors<Tree>,
  reverse?: boolean | null | undefined
): void

/**
 * Visit nodes, with ancestral information.
 *
 * This algorithm performs [*depth-first tree traversal*][dft] in
 * [*preorder*][preorder] (**NLR**) and/or [*postorder*][postorder] (**LRN**),
 * or if `reverse` is given, *reverse preorder* (**NRL**) and/or *reverse
 * postorder* (**RLN**). Nodes are handled on [*enter*][enter] during *preorder*
 * traversals and on [*exit*][exit] during *postorder* traversals.
 *
 * You can choose which nodes visitor functions handle by passing a
 * [`test`][test]. For complex tests, you should test yourself in `visitor`
 * instead, as it will be faster and also have improved type information.
 *
 * Walking the `tree` is an intensive task. Make use of visitor return values
 * whenever possible. Instead of walking the `tree` multiple times, walk it
 * once, use [`unist-util-is`][unist-util-is] to check if a node matches, and
 * then perform different operations.
 *
 * You can change `tree`. See {@linkcode Visitor} for more info.
 *
 * [dft]: https://github.com/syntax-tree/unist#depth-first-traversal
 * [enter]: https://github.com/syntax-tree/unist#enter
 * [exit]: https://github.com/syntax-tree/unist#exit
 * [postorder]: https://github.com/syntax-tree/unist#postorder
 * [preorder]: https://github.com/syntax-tree/unist#preorder
 * [test]: https://github.com/syntax-tree/unist-util-is#test
 * [unist-util-is]: https://github.com/syntax-tree/unist-util-is
 *
 * @see {@linkcode Node}
 * @see {@linkcode Test}
 * @see {@linkcode Visitors}
 *
 * @template {Node} [Tree=Node] - Tree to traverse
 * @template {Test} [Check=Test] - Visited node test
 *
 * @param {Tree} tree - Tree to traverse
 * @param {Check} test - [`unist-util-is`][unist-util-is]-compatible test
 * @param {Visitor<Tree, Check> | Visitors<Tree, Check>} visitor - A function to
 * handle nodes passing `test` when entering (*preorder*), or an object to
 * handle passing nodes when entering and leaving (*preorder* and *postorder*)
 * @param {(boolean | null)?} [reverse] - Traverse in reverse preorder (NRL)
 * and/or postorder (RLN) instead of default traversal order(s)
 * @return {void} Nothing
 */
function visit<Tree extends Node = Node, Check extends Test = Test>(
  this: void,
  tree: Tree,
  test: Check,
  visitor: Visitor<Tree, Check> | Visitors<Tree, Check>,
  reverse?: boolean | null
): void

/**
 * Visit nodes, with ancestral information.
 *
 * @see {@linkcode Node}
 * @see {@linkcode Test}
 * @see {@linkcode Visitor}
 * @see {@linkcode Visitors}
 *
 * @param {Node} tree - Tree to traverse
 * @param {Test | Visitor | Visitors} test - Visited node test or `visitor`
 * @param {(Visitor | Visitors | boolean | null)?} [visitor] - A function to
 * handle entering nodes, an object containing functions to handle entering and
 * leaving nodes, or `reverse`
 * @param {(boolean | null)?} [reverse] - Traverse in reverse order
 * @return {void} Nothing
 */
function visit(
  tree: Node,
  test: Test | Visitor | Visitors,
  visitor?: Visitor | Visitors | boolean | null,
  reverse?: boolean | null
): void {
  if (isBoolean(visitor) || isNIL(visitor)) {
    reverse = visitor
    visitor = <Visitor | Visitors>test
    if (isFunction(visitor)) visitor = { enter: visitor }
    test = null
  } else {
    if (isFunction(visitor)) visitor = { enter: visitor }
    test = <Test>test
  }

  /**
   * Node checker.
   *
   * @const {Check} check
   */
  const check: Check = convert(<Test>test)

  /**
   * Default value used to move between child nodes.
   *
   * @const {number} step
   */
  const step: number = reverse ? -1 : 1

  /**
   * Convert a visitor `result` to an {@linkcode ActionTuple}.
   *
   * @this {void}
   *
   * @param {VisitorResult} result - Result returned from visitor function
   * @return {ActionTuple} Visitor result as action tuple
   */
  function cleanResult(this: void, result: VisitorResult): ActionTuple {
    switch (true) {
      case isArray(result):
        return result
      case isNIL(result):
        return []
      case isNumber(result):
        return [CONTINUE, result]
      default:
        return [result]
    }
  }

  /**
   * Build a function to visit a node.
   *
   * @see {@linkcode ActionTuple}
   * @see {@linkcode Index}
   * @see {@linkcode Node}
   * @see {@linkcode Parent}
   *
   * @this {void}
   *
   * @param {Node} node - Found node
   * @param {Optional<Index>} index - Index of `node` in `parent.children`
   * @param {Optional<Parent>} parent - Parent of `node`
   * @param {Parent[]} ancestors - Ancestors of node
   * @return {Fn<EmptyArray, Readonly<ActionTuple>>} Visitor function
   */
  function factory(
    this: void,
    node: Node,
    index: Optional<Index>,
    parent: Optional<Parent>,
    ancestors: Parent[]
  ): Fn<EmptyArray, Readonly<ActionTuple>> {
    if (nodelike(node)) {
      /**
       * Node name.
       *
       * @const {Nullable<string>} name
       */
      const name: Nullable<string> = nodename(node)

      // set name of factory visit function to display name for node
      define(visit, 'name', {
        value: `node(${color(`${node.type}${name ? `<${name}>` : ''}`)})`
      })
    }

    return visit

    /**
     * Visit `node`.
     *
     * @see {@linkcode ActionTuple}
     *
     * @return {Readonly<ActionTuple>} Clean visitor result
     */
    function visit(): Readonly<ActionTuple> {
      const { enter, leave } = <Visitors>visitor

      /**
       * Index of current child node.
       *
       * @var {number} offset
       */
      let offset: number = 0

      /**
       * Clean visitor result.
       *
       * @var {Readonly<ActionTuple>} result
       */
      let result: Readonly<ActionTuple> = cleanResult(null)

      // visit node on enter
      if (isFalsy(test) || check(node, index, parent)) {
        result = cleanResult(enter?.(node, index, parent, ancestors))
        if (result[0] === EXIT) return result
      }

      // visit each child in node.children
      if (parentlike(node) && result[0] !== SKIP) {
        offset = (reverse ? node.children.length : -1) + step
        while (offset > -1 && offset < node.children.length) {
          /**
           * Child node.
           *
           * @const {Node} child
           */
          const child: Node = node.children[offset]!

          /**
           * Clean visitor result for {@linkcode child}.
           *
           * @const {Readonly<ActionTuple>} subresult
           */
          const subresult: Readonly<ActionTuple> = factory(
            child,
            offset,
            node,
            sift([...ancestors, parent])
          )()

          if (subresult[0] === EXIT) return subresult
          offset = isNumber(subresult[1]) ? subresult[1] : offset + step
        }
      }

      // visit node on leave
      if (leave && (isFalsy(test) || check(node, index, parent))) {
        result = cleanResult(leave(node, index, parent, ancestors))
      }

      return result
    }
  }

  return void factory(tree, undefined, undefined, [])()
}

export default visit
