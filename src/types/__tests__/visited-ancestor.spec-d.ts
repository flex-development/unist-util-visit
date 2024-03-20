/**
 * @file Type Tests - VisitedAncestor
 * @module unist-util-visit/types/tests/unit-d/VisitedAncestor
 */

import type * as docast from '@flex-development/docast'
import type { Node, Parent } from 'unist'
import type TestSubject from '../visited-ancestor'

describe('unit-d:types/VisitedAncestor', () => {
  it('should equal Parent if Node extends Tree', () => {
    expectTypeOf<TestSubject>().toEqualTypeOf<Parent>()
  })

  it('should unionize ancestors of nodes in Tree that pass Check', () => {
    // Arrange
    type Tree = docast.Root
    type Check = (value: Node) => value is docast.TypeExpression
    type Expect = docast.BlockTag | docast.Comment | Tree

    // Expect
    expectTypeOf<TestSubject<Tree, Check>>().toEqualTypeOf<Expect>()
  })
})
