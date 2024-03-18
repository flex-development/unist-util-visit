/**
 * @file Type Tests - Visitors
 * @module unist-util-visit/types/tests/unit-d/Visitors
 */

import type * as docast from '@flex-development/docast'
import type { Nilable } from '@flex-development/tutils'
import type { Type } from '@flex-development/unist-util-types'
import type Visitor from '../visitor'
import type TestSubject from '../visitors'

describe('unit-d:types/Visitors', () => {
  type Tree = docast.Root
  type Check = Type<docast.Comment>
  type VisitorFn = Visitor<Tree, Check>
  type Subject = TestSubject<Tree, Check>

  it('should match [enter?: Nilable<Visitor<Tree, Check>>]', () => {
    expectTypeOf<Subject>()
      .toHaveProperty('enter')
      .toEqualTypeOf<Nilable<VisitorFn>>()
  })

  it('should match [leave?: Nilable<Visitor<Tree, Check>>]', () => {
    expectTypeOf<Subject>()
      .toHaveProperty('leave')
      .toEqualTypeOf<Nilable<VisitorFn>>()
  })
})
