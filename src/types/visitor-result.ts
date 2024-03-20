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
 * An `Index` is treated as a tuple of `[CONTINUE, Index]`. An `Action` is
 * treated as a tuple of `[Action]`. Returning a tuple only makes sense if the
 * `Action` is `SKIP`. When the `Action` is `EXIT`, that action can be returned.
 * When the `Action` is `CONTINUE`, `Index` can be returned.
 *
 * @see {@linkcode Action}
 * @see {@linkcode ActionTuple}
 * @see {@linkcode Index}
 */
type VisitorResult = Nilable<Action | ActionTuple | Index | void>

export type { VisitorResult as default }
