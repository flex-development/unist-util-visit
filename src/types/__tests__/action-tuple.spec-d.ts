/**
 * @file Type Tests - ActionTuple
 * @module unist-util-visit/types/tests/unit-d/ActionTuple
 */

import type { Nilable } from '@flex-development/tutils'
import type { Index } from '@flex-development/unist-util-types'
import type Action from '../action'
import type TestSubject from '../action-tuple'

describe('unit-d:types/ActionTuple', () => {
  it('should equal [(Nilable<Action> | void)?, Nilable<Index>?]', () => {
    // Arrange
    type Expect = [(Nilable<Action> | void)?, Nilable<Index>?]

    // Expect
    expectTypeOf<TestSubject>().toEqualTypeOf<Expect>()
  })
})
