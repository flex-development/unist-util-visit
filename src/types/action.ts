/**
 * @file Type Definitions - Action
 * @module unist-util-visit/types/Action
 */

import type Continue from './continue'
import type Exit from './exit'
import type Skip from './skip'

/**
 * Union of action types.
 *
 * @see {@linkcode Continue}
 * @see {@linkcode Exit}
 * @see {@linkcode Skip}
 */
type Action = Continue | Exit | Skip

export type { Action as default }
