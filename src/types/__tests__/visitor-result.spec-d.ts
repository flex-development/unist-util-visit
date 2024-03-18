/**
 * @file Type Tests - VisitorResult
 * @module unist-util-visit/types/tests/unit-d/VisitorResult
 */

import type { Index } from '@flex-development/unist-util-types'
import type Action from '../action'
import type ActionTuple from '../action-tuple'
import type TestSubject from '../visitor-result'

describe('unit-d:types/VisitorResult', () => {
  it('should extract Action', () => {
    expectTypeOf<TestSubject>().extract<Action>().not.toBeNever()
  })

  it('should extract ActionTuple', () => {
    expectTypeOf<TestSubject>().extract<ActionTuple>().not.toBeNever()
  })

  it('should extract Index', () => {
    expectTypeOf<TestSubject>().extract<Index>().not.toBeNever()
  })

  it('should extract null', () => {
    expectTypeOf<TestSubject>().extract<null>().not.toBeNever()
  })

  it('should extract undefined', () => {
    expectTypeOf<TestSubject>().extract<undefined>().not.toBeNever()
  })

  it('should extract void', () => {
    expectTypeOf<TestSubject>().extract<void>().not.toBeNever()
  })
})
