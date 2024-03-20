/**
 * @file Fixtures - preorder
 * @module fixtures/preorder
 */

import type { VisitedType } from '#tests/types'
import type { EmptyArray } from '@flex-development/tutils'

/**
 * Object containing node types visited during preorder traversal.
 */
type Preorder = {
  /**
   * Ancestor node types visited during preorder traversal.
   *
   * @see {@linkcode VisitedType}
   */
  ancestors: [EmptyArray, ...VisitedType[][]]

  /**
   * Parent node types visited during preorder traversal.
   */
  parents: [undefined, ...VisitedType[]]

  /**
   * All node types visited during preorder traversal.
   *
   * @see {@linkcode VisitedType}
   */
  types: ['root', ...Exclude<VisitedType, 'root'>[]]

  /**
   * All node types visited during reverse preorder traversal.
   *
   * @see {@linkcode VisitedType}
   */
  typesReversed: ['root', ...Exclude<VisitedType, 'root'>[]]
}

/**
 * All node types visited during preorder traversal.
 *
 * @const {Preorder['types']} types
 */
const types: Preorder['types'] = [
  'root',
  'comment',
  'blockTag',
  'text',
  'blockTag',
  'text',
  'blockTag', // children skipped
  'text',
  'comment',
  'description',
  'paragraph',
  'text',
  'inlineCode',
  'text', // sibling skipped
  'inlineCode',
  'text',
  'blockTag',
  'code',
  'blockTag',
  'code',
  'blockTag',
  'typeExpression',
  'text',
  'blockTag',
  'typeExpression',
  'text',
  'inlineCode',
  'text',
  'comment',
  'description',
  'paragraph',
  'text',
  'inlineTag',
  'text',
  'blockTag',
  'typeExpression',
  'text'
]

/**
 * All node types visited during reverse preorder traversal.
 *
 * @const {Preorder['typesReversed']} typesReversed
 */
const typesReversed: Preorder['typesReversed'] = [
  'root',
  'comment',
  'blockTag',
  'text',
  'typeExpression',
  'description',
  'paragraph',
  'text',
  'inlineTag',
  'text',
  'comment',
  'blockTag',
  'text',
  'inlineCode',
  'text',
  'typeExpression',
  'blockTag',
  'text',
  'typeExpression',
  'blockTag',
  'code',
  'blockTag',
  'code',
  'description',
  'paragraph',
  'text',
  'inlineCode',
  'text',
  'inlineCode',
  'text',
  'comment',
  'blockTag',
  'text',
  'blockTag',
  'text',
  'blockTag',
  'text'
]

/**
 * Parent node types visited during preorder traversal.
 *
 * @const {Preorder['parents']} parents
 */
const parents: Preorder['parents'] = [
  undefined,
  'root',
  'comment',
  'blockTag',
  'comment',
  'blockTag',
  'comment',
  'blockTag',
  'root',
  'comment',
  'description',
  'paragraph',
  'paragraph',
  'paragraph',
  'paragraph',
  'paragraph',
  'comment',
  'blockTag',
  'comment',
  'blockTag',
  'comment',
  'blockTag',
  'blockTag',
  'comment',
  'blockTag',
  'blockTag',
  'blockTag',
  'blockTag',
  'root',
  'comment',
  'description',
  'paragraph',
  'paragraph',
  'paragraph',
  'comment',
  'blockTag',
  'blockTag'
]

/**
 * Ancestor node types visited during preorder traversal.
 *
 * @const {Preorder['ancestors']} ancestors
 */
const ancestors: Preorder['ancestors'] = [
  [],
  [],
  ['root'],
  ['root', 'comment'],
  ['root'],
  ['root', 'comment'],
  ['root'],
  ['root', 'comment'],
  [],
  ['root'],
  ['root', 'comment'],
  ['root', 'comment', 'description'],
  ['root', 'comment', 'description'],
  ['root', 'comment', 'description'],
  ['root', 'comment', 'description'],
  ['root', 'comment', 'description'],
  ['root'],
  ['root', 'comment'],
  ['root'],
  ['root', 'comment'],
  ['root'],
  ['root', 'comment'],
  ['root', 'comment'],
  ['root'],
  ['root', 'comment'],
  ['root', 'comment'],
  ['root', 'comment'],
  ['root', 'comment'],
  [],
  ['root'],
  ['root', 'comment'],
  ['root', 'comment', 'description'],
  ['root', 'comment', 'description'],
  ['root', 'comment', 'description'],
  ['root'],
  ['root', 'comment'],
  ['root', 'comment']
]

/**
 * Nodes visited during preorder traversal.
 *
 * @const {Readonly<Preorder>} preorder
 */
const preorder: Readonly<Preorder> = Object.freeze({
  ancestors,
  parents,
  types,
  typesReversed
})

export default preorder
