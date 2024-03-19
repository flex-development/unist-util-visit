/**
 * @file Type Tests - actions
 * @module unist-util-visit/tests/unit-d/actions
 */

import type { Continue, Exit, Skip } from '#src/types'
import type * as TestSubject from '../actions'

describe('unit-d:actions', () => {
  describe('CONTINUE', () => {
    it('should match Continue', () => {
      expectTypeOf<typeof TestSubject>()
        .toHaveProperty('CONTINUE')
        .toEqualTypeOf<Continue>()
    })
  })

  describe('EXIT', () => {
    it('should equal false', () => {
      expectTypeOf<typeof TestSubject>()
        .toHaveProperty('EXIT')
        .toEqualTypeOf<Exit>()
    })
  })

  describe('SKIP', () => {
    it('should equal "skip"', () => {
      expectTypeOf<typeof TestSubject>()
        .toHaveProperty('SKIP')
        .toEqualTypeOf<Skip>()
    })
  })
})
