/**
 * @file Type Tests - Exit
 * @module unist-util-visit/types/tests/unit-d/Exit
 */

import type TestSubject from '../exit'

describe('unit-d:types/Exit', () => {
  it('should equal false', () => {
    expectTypeOf<TestSubject>().toEqualTypeOf<false>()
  })
})
