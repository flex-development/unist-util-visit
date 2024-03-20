/**
 * @file Type Definitions - ActionTuple
 * @module unist-util-visit/types/ActionTuple
 */

import type { Nilable } from '@flex-development/tutils'
import type { Index } from '@flex-development/unist-util-types'
import type Action from './action'

/**
 * List with at most two (`2`) values, the first an {@linkcode Action} and the
 * second an {@linkcode Index}.
 */
type ActionTuple = [action?: Nilable<Action> | void, index?: Nilable<Index>]

export type { ActionTuple as default }
