/**
 * @file Type Definitions - VisitorResult
 * @module unist-util-visit/types/VisitorResult
 */

import type { Nilable } from '@flex-development/tutils'
import type { Index } from '@flex-development/unist-util-types'
import type Action from './action'
import type ActionTuple from './action-tuple'

/**
 * Union of values that can be returned from a visitor.
 *
 * @see {@linkcode Action}
 * @see {@linkcode ActionTuple}
 * @see {@linkcode Index}
 */
type VisitorResult = Nilable<Action | ActionTuple | Index | void>

export type { VisitorResult as default }
