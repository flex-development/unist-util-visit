/**
 * @file Unit Tests - actions
 * @module unist-util-visit/tests/unit/actions
 */

import * as testSubject from '../actions'

describe('unit:actions', () => {
  describe('CONTINUE', () => {
    it('should equal true', () => {
      expect(testSubject).to.have.property('CONTINUE', true)
    })
  })

  describe('EXIT', () => {
    it('should equal false', () => {
      expect(testSubject).to.have.property('EXIT', false)
    })
  })

  describe('SKIP', () => {
    it('should equal "skip"', () => {
      expect(testSubject).to.have.property('SKIP', 'skip')
    })
  })
})
