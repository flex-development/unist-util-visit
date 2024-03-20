/**
 * @file Type Tests - Visitor
 * @module unist-util-visit/types/tests/unit-d/Visitor
 */

import type * as docast from '@flex-development/docast'
import type { Optional } from '@flex-development/tutils'
import type { Index, Type } from '@flex-development/unist-util-types'
import type VisitedAncestor from '../visited-ancestor'
import type VisitedNode from '../visited-node'
import type VisitedParent from '../visited-parent'
import type TestSubject from '../visitor'
import type VisitorResult from '../visitor-result'

describe('unit-d:types/Visitor', () => {
  type Tree = docast.Root
  type Check = Type<docast.InlineTag>
  type Subject = TestSubject<Tree, Check>

  it('should match [this: void]', () => {
    expectTypeOf<Subject>().thisParameter.toBeVoid()
  })

  describe('parameters', () => {
    it('should match [0: VisitedNode<Tree, Check>]', () => {
      // Arrange
      type Expect = VisitedNode<Tree, Check>

      // Expect
      expectTypeOf<Subject>().parameter(0).toEqualTypeOf<Expect>()
    })

    it('should match [1: Optional<Index>]', () => {
      expectTypeOf<Subject>().parameter(1).toEqualTypeOf<Optional<Index>>()
    })

    it('should match [2: Optional<VisitedParent<Tree, Check>>]', () => {
      // Arrange
      type Expect = Optional<VisitedParent<Tree, Check>>

      // Expect
      expectTypeOf<Subject>().parameter(2).toEqualTypeOf<Expect>()
    })

    it('should match [3: VisitedAncestor<Tree, Check>[]]', () => {
      // Arrange
      type Expect = VisitedAncestor<Tree, Check>[]

      // Expect
      expectTypeOf<Subject>().parameter(3).toEqualTypeOf<Expect>()
    })
  })

  describe('returns', () => {
    it('should return VisitorResult', () => {
      expectTypeOf<Subject>().returns.toEqualTypeOf<VisitorResult>()
    })
  })
})
