/**
 * @file Type Tests - Skip
 * @module unist-util-visit/types/tests/unit-d/Skip
 */

import type TestSubject from '../skip'

describe('unit-d:types/Skip', () => {
  it('should equal "skip"', () => {
    expectTypeOf<TestSubject>().toEqualTypeOf<'skip'>()
  })
})
