/**
 * @file E2E Tests - api
 * @module unist-util-visit/tests/e2e/api
 */

import * as testSubject from '../index'

describe('e2e:unist-util-visit', () => {
  it('should expose public api', () => {
    expect(testSubject).to.have.keys([
      'CONTINUE',
      'EXIT',
      'SKIP',
      'visit'
    ])
  })
})
