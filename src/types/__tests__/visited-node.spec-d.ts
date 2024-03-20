/**
 * @file Type Tests - VisitedNode
 * @module unist-util-visit/types/tests/unit-d/VisitedNode
 */

import type * as docast from '@flex-development/docast'
import type {
  MatchInclusiveDescendant
} from '@flex-development/unist-util-types'
import type TestSubject from '../visited-node'

describe('unit-d:types/VisitedNode', () => {
  it('should equal MatchInclusiveDescendant<Tree, Check>', () => {
    // Arrange
    type Check = [docast.InlineTag['type']]
    type Expect = MatchInclusiveDescendant<docast.Root, Check>

    // Expect
    expectTypeOf<TestSubject<docast.Root, Check>>().toEqualTypeOf<Expect>()
  })
})
