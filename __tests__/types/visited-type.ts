/**
 * @file Test Types - VisitedType
 * @module tests/types/VisitedType
 */

import type { Root } from '@flex-development/docast'
import type {
  InclusiveDescendant,
  Type
} from '@flex-development/unist-util-types'

/**
 * Visited node types.
 */
type VisitedNodeType = Type<InclusiveDescendant<Root>>

export type { VisitedNodeType as default }
