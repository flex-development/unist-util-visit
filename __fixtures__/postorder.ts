/**
 * @file Fixtures - postorder
 * @module fixtures/postorder
 */

import type { VisitedType } from '#tests/types'
import type { EmptyArray } from '@flex-development/tutils'

/**
 * Object containing node types visited during postorder traversal.
 */
type Postorder = {
  /**
   * Ancestor node types visited during postorder traversal.
   *
   * @see {@linkcode VisitedType}
   */
  ancestors: [...VisitedType[][], EmptyArray]

  /**
   * Parent node types visited during postorder traversal.
   */
  parents: [...VisitedType[], undefined]

  /**
   * All node types visited during postorder traversal.
   *
   * @see {@linkcode VisitedType}
   */
  types: [...Exclude<VisitedType, 'root'>[], 'root']

  /**
   * All node types visited during reverse postorder traversal.
   *
   * @see {@linkcode VisitedType}
   */
  typesReversed: [...Exclude<VisitedType, 'root'>[], 'root']
}

/**
 * All node types visited during postorder traversal.
 *
 * @const {Postorder['types']} types
 */
const types: Postorder['types'] = [
  'text',
  'blockTag',
  'text',
  'blockTag',
  'text',
  'blockTag',
  'comment',
  'text', // siblings skipped
  'inlineCode',
  'text',
  'inlineCode',
  'text',
  'paragraph',
  'description',
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
  'blockTag',
  'comment',
  'text',
  'inlineTag',
  'text',
  'paragraph',
  'description',
  'typeExpression',
  'text',
  'blockTag',
  'comment',
  'root'
]

/**
 * All node types visited during reverse postorder traversal.
 *
 * @const {Postorder['typesReversed']} typesReversed
 */
const typesReversed: Postorder['typesReversed'] = [
  'text',
  'typeExpression',
  'blockTag',
  'text',
  'inlineTag',
  'text',
  'paragraph',
  'description',
  'comment',
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
  'blockTag',
  'text',
  'inlineCode',
  'text',
  'inlineCode',
  'text',
  'paragraph',
  'description',
  'comment',
  'text',
  'blockTag',
  'text',
  'blockTag',
  'text',
  'blockTag',
  'comment',
  'root'
]

/**
 * Parent node types visited during postorder traversal.
 *
 * @const {Postorder['parents']} parents
 */
const parents: Postorder['parents'] = [
  'blockTag',
  'comment',
  'blockTag',
  'comment',
  'blockTag',
  'comment',
  'root',
  'paragraph',
  'paragraph',
  'paragraph',
  'paragraph',
  'paragraph',
  'description',
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
  'comment',
  'root',
  'paragraph',
  'paragraph',
  'paragraph',
  'description',
  'comment',
  'blockTag',
  'blockTag',
  'comment',
  'root',
  undefined
]

/**
 * Ancestor node types visited during postorder traversal.
 *
 * @const {Postorder['ancestors']} ancestors
 */
const ancestors: Postorder['ancestors'] = [
  ['root', 'comment'],
  ['root'],
  ['root', 'comment'],
  ['root'],
  ['root', 'comment'],
  ['root'],
  [],
  ['root', 'comment', 'description'],
  ['root', 'comment', 'description'],
  ['root', 'comment', 'description'],
  ['root', 'comment', 'description'],
  ['root', 'comment', 'description'],
  ['root', 'comment'],
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
  ['root'],
  [],
  ['root', 'comment', 'description'],
  ['root', 'comment', 'description'],
  ['root', 'comment', 'description'],
  ['root', 'comment'],
  ['root'],
  ['root', 'comment'],
  ['root', 'comment'],
  ['root'],
  [],
  []
]

/**
 * Nodes visited during postorder traversal.
 *
 * @const {Readonly<Postorder>} postorder
 */
const postorder: Readonly<Postorder> = Object.freeze({
  ancestors,
  parents,
  types,
  typesReversed
})

export default postorder
