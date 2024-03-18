/**
 * @file Type Tests - Action
 * @module unist-util-visit/types/tests/unit-d/Action
 */

import type TestSubject from '../action'
import type Continue from '../continue'
import type Exit from '../exit'
import type Skip from '../skip'

describe('unit-d:types/Action', () => {
  it('should extract Continue', () => {
    expectTypeOf<TestSubject>().extract<Continue>().not.toBeNever()
  })

  it('should extract Exit', () => {
    expectTypeOf<TestSubject>().extract<Exit>().not.toBeNever()
  })

  it('should extract Skip', () => {
    expectTypeOf<TestSubject>().extract<Skip>().not.toBeNever()
  })
})
