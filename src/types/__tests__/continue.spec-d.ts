/**
 * @file Type Tests - Continue
 * @module unist-util-visit/types/tests/unit-d/Continue
 */

import type TestSubject from '../continue'

describe('unit-d:types/Continue', () => {
  it('should equal true', () => {
    expectTypeOf<TestSubject>().toEqualTypeOf<true>()
  })
})
