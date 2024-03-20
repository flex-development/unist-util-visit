/**
 * @file Type Tests - VisitedParent
 * @module unist-util-visit/types/tests/unit-d/VisitedParent
 */

import type * as docast from '@flex-development/docast'
import type { Parent } from 'unist'
import type TestSubject from '../visited-parent'

describe('unit-d:types/VisitedParent', () => {
  it('should equal Parent if Node extends Tree', () => {
    expectTypeOf<TestSubject>().toEqualTypeOf<Parent>()
  })

  it('should unionize parents of nodes in Tree that pass Check', () => {
    // Arrange
    type Check = docast.TypeExpression['type']
    type Expect = docast.BlockTag

    // Expect
    expectTypeOf<TestSubject<docast.Root, Check>>().toEqualTypeOf<Expect>()
  })
})
