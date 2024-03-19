/**
 * @file Unit Tests - nodelike
 * @module unist-util-visit/utils/tests/unit/nodelike
 */

import testSubject from '../nodelike'

describe('unit:utils/nodelike', () => {
  it('should return false if value is not curly-braced object', () => {
    expect(testSubject([])).to.be.false
  })

  it('should return false if value.type is invalid', () => {
    expect(testSubject({ type: '' })).to.be.false
  })

  it('should return true if value is shaped like a node', () => {
    expect(testSubject({ type: 'nothing' })).to.be.true
  })
})
